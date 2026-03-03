"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { exportPoster } from "@/lib/poster/canvas-renderer";
import type {
  SpeakerData,
  FaceDetectionResult,
  TemplateType,
  FilterSettings,
} from "@/lib/poster/types";

interface UsePosterAutosaveOptions {
  badgeId: string;
  speaker: SpeakerData;
  template: TemplateType;
  filter: FilterSettings;
  detection: FaceDetectionResult | null;
  image: HTMLImageElement | null;
  exportCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  initialPosterImageUrl: string | null;
}

type SaveStatus = "idle" | "saving" | "saved";

function serializeSnapshot(
  speaker: SpeakerData,
  template: TemplateType,
  filter: FilterSettings
): string {
  return JSON.stringify({ name: speaker.name, role: speaker.role, template, filter });
}

/**
 * Parse the combined "role @ organization" string back into separate fields.
 * Matches the construction in poster-editor.tsx:
 *   `${badge.role} @ ${badge.organization}`
 */
function parseRoleAndOrg(combined: string): {
  role: string;
  organization: string | null;
} {
  const atIndex = combined.lastIndexOf(" @ ");
  if (atIndex >= 0) {
    return {
      role: combined.slice(0, atIndex),
      organization: combined.slice(atIndex + 3) || null,
    };
  }
  return { role: combined, organization: null };
}

export function usePosterAutosave({
  badgeId,
  speaker,
  template,
  filter,
  detection,
  image,
  exportCanvasRef,
  enabled,
  initialPosterImageUrl,
}: UsePosterAutosaveOptions): {
  saveStatus: SaveStatus;
  posterImageUrl: string | null;
  waitForSave: () => Promise<void>;
} {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [posterImageUrl, setPosterImageUrl] = useState<string | null>(initialPosterImageUrl);

  // Promise that resolves when the current save (including any pending debounce) completes
  const savePromiseRef = useRef<Promise<void>>(Promise.resolve());
  const saveResolveRef = useRef<(() => void) | null>(null);

  // Refs for latest values so the async save always reads fresh state
  const speakerRef = useRef(speaker);
  const templateRef = useRef(template);
  const filterRef = useRef(filter);
  const detectionRef = useRef(detection);

  speakerRef.current = speaker;
  templateRef.current = template;
  filterRef.current = filter;
  detectionRef.current = detection;

  // Snapshot of last-saved values to skip no-op saves (including on mount)
  const initialSnapshotRef = useRef<string>(
    serializeSnapshot(speaker, template, filter)
  );

  // Race condition handling
  const saveVersionRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Debounce timer
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // "Saved" fade-out timer
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const executeSave = useCallback(async () => {
    saveVersionRef.current += 1;
    const thisVersion = saveVersionRef.current;

    // Abort any previous in-flight request
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const { signal } = controller;

    // Clear any pending "Saved" fade timer
    if (savedTimerRef.current) {
      clearTimeout(savedTimerRef.current);
      savedTimerRef.current = null;
    }

    // Resolve any previous save promise before starting a new cycle
    const prevResolve = saveResolveRef.current;
    saveResolveRef.current = null;
    prevResolve?.();
    // Create a new promise for this save cycle
    savePromiseRef.current = new Promise<void>((resolve) => {
      saveResolveRef.current = resolve;
    });

    setSaveStatus("saving");

    // Read latest values from refs
    const currentSpeaker = speakerRef.current;
    const currentTemplate = templateRef.current;
    const currentFilter = filterRef.current;
    const currentDetection = detectionRef.current;

    const { role, organization } = parseRoleAndOrg(currentSpeaker.role);

    try {
      // Step 1: Save metadata + poster config
      await fetch(`/api/badges/${badgeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: currentSpeaker.name,
          role,
          organization,
          posterConfig: {
            template: currentTemplate,
            filter: currentFilter,
            faceDetection: currentDetection,
          },
        }),
        signal,
      });

      if (signal.aborted) return;

      // Step 2: Re-render and upload poster image
      const canvas = exportCanvasRef.current;
      if (canvas && currentDetection) {
        const blob = await exportPoster(canvas);
        if (signal.aborted) return;

        const formData = new FormData();
        formData.append("poster", blob, "poster.png");

        const uploadRes = await fetch(`/api/badges/${badgeId}/poster`, {
          method: "POST",
          body: formData,
          signal,
        });

        if (signal.aborted) return;

        if (uploadRes.ok) {
          const data = await uploadRes.json();
          const newPosterUrl = data.posterImageUrl ?? data.photoUrl;
          if (newPosterUrl) {
            await fetch(`/api/badges/${badgeId}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ posterImageUrl: newPosterUrl }),
              signal,
            });
            if (!signal.aborted) {
              setPosterImageUrl(newPosterUrl);
            }
          }
        }
      }

      if (signal.aborted) return;

      // Only update status if this is still the latest save
      if (thisVersion === saveVersionRef.current) {
        // Update snapshot so subsequent no-op checks work
        initialSnapshotRef.current = serializeSnapshot(
          currentSpeaker,
          currentTemplate,
          currentFilter
        );

        setSaveStatus("saved");
        savedTimerRef.current = setTimeout(() => {
          setSaveStatus("idle");
          savedTimerRef.current = null;
        }, 2000);
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        // Request was aborted by a newer save — silently ignore
        return;
      }
      console.error("Autosave failed:", err);
      if (thisVersion === saveVersionRef.current) {
        setSaveStatus("idle");
      }
    } finally {
      // Resolve the save promise so waitForSave() callers proceed
      (saveResolveRef.current as (() => void) | null)?.();
      saveResolveRef.current = null;
    }
  }, [badgeId, exportCanvasRef]);

  // Trigger effect: debounce on any change to saveable state
  useEffect(() => {
    if (!enabled) return;

    const currentSnapshot = serializeSnapshot(speaker, template, filter);
    if (currentSnapshot === initialSnapshotRef.current) return;

    // Clear previous debounce timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Create a promise so waitForSave() can await the pending debounce + save
    if (saveResolveRef.current === null) {
      savePromiseRef.current = new Promise<void>((resolve) => {
        saveResolveRef.current = resolve;
      });
    }

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      executeSave();
    }, 500);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [speaker.name, speaker.role, template, filter, enabled, executeSave]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      abortControllerRef.current?.abort();
    };
  }, []);

  const waitForSave = useCallback(() => savePromiseRef.current, []);

  return { saveStatus, posterImageUrl, waitForSave };
}
