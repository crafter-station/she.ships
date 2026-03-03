"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Download, Eye, Twitter, Linkedin } from "lucide-react";
import { exportPoster } from "@/lib/poster/canvas-renderer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { useTranslation } from "@/lib/i18n/context";
import { PosterUpload } from "@/components/poster/poster-upload";
import { PosterPreview } from "@/components/poster/poster-preview";
import { PosterControls } from "@/components/poster/poster-controls";
import { detectFace } from "@/lib/poster/face-detection";
import { DEFAULT_FILTER } from "@/lib/poster/defaults";
import { convertToPng } from "@/lib/poster/image-utils";
import type {
  SpeakerData,
  FaceDetectionResult,
  TemplateType,
  FilterSettings,
} from "@/lib/poster/types";
import type { Badge } from "@/lib/db/schema";
import { usePosterAutosave } from "@/lib/poster/use-poster-autosave";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

interface PosterEditorProps {
  badge: Badge;
}

export default function PosterEditor({ badge }: PosterEditorProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const [speaker, setSpeaker] = useState<SpeakerData>({
    name: badge.name,
    role: badge.organization
      ? `${badge.role} @ ${badge.organization}`
      : badge.role,
  });
  const [filter, setFilter] = useState<FilterSettings>(
    () => badge.posterConfig?.filter ?? DEFAULT_FILTER
  );
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);
  const [detection, setDetection] = useState<FaceDetectionResult | null>(
    () => badge.posterConfig?.faceDetection ?? null
  );
  const [template, setTemplate] = useState<TemplateType>(
    () => badge.posterConfig?.template ?? "eyes"
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const [modelStatus, setModelStatus] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");

  const exportCanvasRef = useRef<HTMLCanvasElement>(null);

  const { saveStatus, posterImageUrl, waitForSave } = usePosterAutosave({
    badgeId: badge.id,
    speaker,
    template,
    filter,
    detection,
    image,
    exportCanvasRef,
    enabled: !!image && !!detection && !isProcessing,
    initialPosterImageUrl: badge.posterImageUrl ?? null,
  });

  // Load frame overlay on mount
  useEffect(() => {
    loadImage("/poster/frame.png")
      .then(setBgImage)
      .catch(() => {
        /* frame overlay is optional */
      });
  }, []);

  // If badge already has a photo, load it and detect face
  useEffect(() => {
    if (!badge.photoUrl) return;
    let cancelled = false;

    async function loadExistingPhoto() {
      setIsProcessing(true);
      setModelStatus("loading");
      try {
        const img = await loadImage(badge.photoUrl!);
        if (cancelled) return;
        setImage(img);

        // Always re-detect on the loaded image to ensure coordinates
        // match the actual image dimensions (the stored photo may have
        // been scaled down from the original during upload).
        const result = await detectFace(img);
        if (cancelled) return;
        if (result) {
          setDetection(result);
          setModelStatus("ready");
        } else {
          setModelStatus("error");
        }
      } catch {
        if (!cancelled) setModelStatus("error");
      } finally {
        if (!cancelled) setIsProcessing(false);
      }
    }

    loadExistingPhoto();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageUpload = useCallback(
    async (file: File) => {
      setIsProcessing(true);
      setModelStatus("loading");

      try {
        // Convert to PNG and compress client-side before anything else
        const { blob: pngBlob, image: img } = await convertToPng(file);
        setImage(img);

        const result = await detectFace(img);
        if (result) {
          setDetection(result);
          setModelStatus("ready");

          // Upload compressed PNG to server
          const formData = new FormData();
          const pngFile = new File([pngBlob], "photo.png", {
            type: "image/png",
          });
          formData.append("photo", pngFile);
          try {
            const res = await fetch(`/api/badges/${badge.id}/poster`, {
              method: "POST",
              body: formData,
            });
            if (res.ok) {
              const data = await res.json();
              // Save poster config with face detection
              await fetch(`/api/badges/${badge.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  photoUrl: data.photoUrl,
                  posterConfig: {
                    template,
                    filter,
                    faceDetection: result,
                  },
                }),
              });
            }
          } catch {
            // Photo upload is non-blocking
          }
        } else {
          setModelStatus("error");
        }
      } catch {
        setModelStatus("error");
      } finally {
        setIsProcessing(false);
      }
    },
    [badge.id, template, filter]
  );

  const handleDownload = useCallback(async () => {
    // If a save is in progress or pending, wait for it to finish
    await waitForSave();

    let blob: Blob | null = null;

    // Prefer server URL; fall back to local canvas export
    if (posterImageUrl) {
      try {
        const res = await fetch(posterImageUrl);
        blob = await res.blob();
      } catch {
        // Fall through to canvas fallback
      }
    }

    if (!blob) {
      const canvas = exportCanvasRef.current;
      if (canvas) {
        try {
          blob = await exportPoster(canvas);
        } catch {
          // Nothing to export
        }
      }
    }

    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${speaker.name.toLowerCase().replace(/\s+/g, "-")}-sheships.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [posterImageUrl, speaker.name, exportCanvasRef, waitForSave]);

  const handleView = useCallback(async () => {
    await waitForSave();
    router.push(`/badge/${badge.id}`);
  }, [waitForSave, router, badge.id]);

  const shareUrl = `https://sheships.org/badge/${badge.id}`;

  const shareOnTwitter = () => {
    const text = encodeURIComponent(t.badge.shareText);
    const url = encodeURIComponent(shareUrl);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=SheShips,WomenInTech`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
  };

  const canDownload = !!posterImageUrl || (!!image && !!detection);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#0e0e0e]">
      {/* Header */}
      <header className="shrink-0 border-b border-[#222] px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="shrink-0">
              <NextImage
                src="/brand/she-ships-one-line-logo.svg"
                alt="She Ships"
                width={140}
                height={20}
                className="h-5 w-auto"
              />
            </Link>
            {(() => {
              if (modelStatus === "loading")
                return (
                  <span className="text-[10px] font-mono text-[#E49BC2] flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-[#E49BC2] animate-pulse" />
                    {t.badge.poster.processing}
                  </span>
                );
              if (modelStatus === "error")
                return (
                  <span className="text-[10px] font-mono text-[#ff6b6b] flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-[#ff6b6b]" />
                    {t.badge.poster.noFaceDetected}
                  </span>
                );
              if (saveStatus === "saving")
                return (
                  <span className="text-[10px] font-mono text-[#666] flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-[#666] animate-pulse" />
                    {t.badge.poster.saving}
                  </span>
                );
              if (saveStatus === "saved")
                return (
                  <span className="text-[10px] font-mono text-[#4ade80] flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-[#4ade80]" />
                    {t.badge.poster.autoSaved}
                  </span>
                );
              if (modelStatus === "ready")
                return (
                  <span className="text-[10px] font-mono text-[#4ade80] flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-[#4ade80]" />
                    {t.badge.poster.ready}
                  </span>
                );
              return null;
            })()}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleView}
              className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#777] hover:text-[#E49BC2] transition-colors cursor-pointer"
            >
              <Eye className="h-3 w-3" />
              View
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={!canDownload}
              className="flex items-center gap-2 bg-[#E49BC2] px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-[#1a1a1a] transition-all hover:bg-[#d488b3] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              {t.badge.poster.downloadPng}
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 min-h-0 gap-0 flex-col md:flex-row">
        {/* Left panel: form + controls */}
        <div className="w-full md:w-[340px] shrink-0 border-b md:border-b-0 md:border-r border-[#222] flex flex-col min-h-0 max-h-[50dvh] md:max-h-none">
          <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-5">
            <PosterUpload
              speaker={speaker}
              onSpeakerChange={setSpeaker}
              onImageUpload={handleImageUpload}
              hasImage={!!image}
            />
            {detection && (
              <div className="border-t border-[#222] pt-5">
                <PosterControls
                  template={template}
                  onTemplateChange={setTemplate}
                  filter={filter}
                  onFilterChange={setFilter}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right panel: preview */}
        <div className="flex-1 flex items-center justify-center min-h-0 p-4 md:p-6">
          <PosterPreview
            speaker={speaker}
            image={image}
            bgImage={bgImage}
            detection={detection}
            template={template}
            filter={filter}
            exportCanvasRef={exportCanvasRef}
          />
        </div>
      </main>

      {/* Share buttons bar (bottom on mobile) */}
      <div className="shrink-0 border-t border-[#222] px-5 py-3 flex items-center gap-2 md:hidden">
        <button
          type="button"
          onClick={shareOnTwitter}
          className="brutalist-button flex-1 py-2 px-3 bg-white text-primary-black font-bold uppercase text-[10px] flex items-center justify-center gap-1.5"
        >
          <Twitter className="w-3.5 h-3.5" />
          Twitter / X
        </button>
        <button
          type="button"
          onClick={shareOnLinkedIn}
          className="brutalist-button flex-1 py-2 px-3 bg-white text-primary-black font-bold uppercase text-[10px] flex items-center justify-center gap-1.5"
        >
          <Linkedin className="w-3.5 h-3.5" />
          LinkedIn
        </button>
      </div>

      {/* Off-screen export canvas */}
      <canvas
        ref={exportCanvasRef}
        width={1080}
        height={1350}
        className="fixed -left-[9999px] top-0 pointer-events-none"
      />
    </div>
  );
}
