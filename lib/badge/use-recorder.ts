"use client";

import { useState, useRef, useCallback } from "react";
import { drawOverlay, type BadgeOverlayInfo } from "./canvas-overlay";

export type RecorderBadgeInfo = BadgeOverlayInfo;

function pickMimeType(): string {
  // Prefer MP4 (Chrome 124+, Safari)
  if (MediaRecorder.isTypeSupported("video/mp4;codecs=avc1.42E01E")) {
    return "video/mp4;codecs=avc1.42E01E";
  }
  if (MediaRecorder.isTypeSupported("video/mp4")) {
    return "video/mp4";
  }
  // Fallback to WebM
  if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) {
    return "video/webm;codecs=vp9";
  }
  return "video/webm";
}

function fileExtension(mimeType: string): string {
  return mimeType.startsWith("video/mp4") ? "mp4" : "webm";
}

const MAX_DURATION = 8_000;

export function useRecorder(badgeInfo: RecorderBadgeInfo) {
  const [recording, setRecording] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef = useRef<number | null>(null);
  const compositeRef = useRef<HTMLCanvasElement | null>(null);

  const start = useCallback(() => {
    const threeCanvas = document.querySelector("canvas");
    if (!threeCanvas) return;

    setCountdown(3);
    let count = 3;
    const tick = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(tick);
        setCountdown(null);
        beginRecording(threeCanvas);
      }
    }, 1000);
  }, [badgeInfo]);

  const beginRecording = useCallback(
    (threeCanvas: HTMLCanvasElement) => {
      // Create offscreen composite canvas
      const w = threeCanvas.width;
      const h = threeCanvas.height;
      const composite = document.createElement("canvas");
      composite.width = w;
      composite.height = h;
      compositeRef.current = composite;
      const ctx = composite.getContext("2d")!;

      // Frame loop: composite Three.js + overlay
      const drawFrame = () => {
        // Clear previous frame to prevent ghosting
        ctx.clearRect(0, 0, w, h);
        // Draw 3D scene
        ctx.drawImage(threeCanvas, 0, 0, w, h);
        // Draw text overlay on top
        drawOverlay(ctx, badgeInfo, w, h);
        rafRef.current = requestAnimationFrame(drawFrame);
      };
      drawFrame();

      // Record composite canvas
      const stream = composite.captureStream(30);
      const mimeType = pickMimeType();

      const recorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 8_000_000,
      });

      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        // Stop frame loop
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }

        const ext = fileExtension(mimeType);
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `sheships.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        chunksRef.current = [];
        compositeRef.current = null;
      };

      recorderRef.current = recorder;
      recorder.start();
      setRecording(true);

      // Show drag hint briefly
      setHint("Drag the badge to interact!");
      setTimeout(() => setHint(null), 2500);

      // Remaining time countdown
      const secs = Math.round(MAX_DURATION / 1000);
      setRemaining(secs);
      countdownIntervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev === null || prev <= 1) return null;
          return prev - 1;
        });
      }, 1000);

      // Auto-stop
      timerRef.current = setTimeout(() => {
        stop();
      }, MAX_DURATION);
    },
    [badgeInfo]
  );

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (recorderRef.current && recorderRef.current.state === "recording") {
      recorderRef.current.stop();
    }
    setRecording(false);
    setRemaining(null);
    setHint(null);
  }, []);

  return { recording, countdown, hint, remaining, start, stop };
}
