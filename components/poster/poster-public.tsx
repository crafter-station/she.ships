"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Twitter, Linkedin, Download, Pencil } from "lucide-react";
import { renderPoster, exportPoster } from "@/lib/poster/canvas-renderer";
import { downloadPosterBlob } from "@/lib/poster/download";
import { detectFace } from "@/lib/poster/face-detection";
import { DEFAULT_FILTER } from "@/lib/poster/types";
import type {
  SpeakerData,
  TemplateType,
  FilterSettings,
} from "@/lib/poster/types";
import type { Poster } from "@/lib/db/schema";

interface PosterPublicProps {
  poster: Poster;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export default function PosterPublic({ poster }: PosterPublicProps) {
  const hasRendered = !!poster.renderedUrl;
  const [canvasRendered, setCanvasRendered] = useState(false);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const exportCanvasRef = useRef<HTMLCanvasElement>(null);

  const template = (poster.template as TemplateType) || "half-face";
  const filter: FilterSettings = (poster.filterSettings as FilterSettings | null) || DEFAULT_FILTER;
  const speaker: SpeakerData = { name: poster.name, role: poster.role };

  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("poster_id");
    if (stored === poster.id) {
      setIsOwner(true);
    }
  }, [poster.id]);

  // Canvas fallback: only runs if no renderedUrl
  useEffect(() => {
    if (hasRendered || !poster.photoUrl) return;
    let cancelled = false;

    async function render() {
      try {
        const [img, bgImg] = await Promise.all([
          loadImage(poster.photoUrl!),
          loadImage("/poster/bg.png"),
        ]);
        if (cancelled) return;

        const detection = await detectFace(img);
        if (cancelled || !detection) return;

        const exportCanvas = exportCanvasRef.current;
        if (!exportCanvas) return;

        await renderPoster(exportCanvas, {
          speaker,
          image: img,
          bgImage: bgImg,
          detection,
          template,
          filter,
          width: 1080,
          height: 1350,
        });

        // Draw to display canvas
        const displayCanvas = displayCanvasRef.current;
        if (displayCanvas) {
          const dpr = window.devicePixelRatio || 1;
          const displayW = displayCanvas.clientWidth;
          const displayH = displayCanvas.clientHeight;
          displayCanvas.width = displayW * dpr;
          displayCanvas.height = displayH * dpr;
          const ctx = displayCanvas.getContext("2d")!;
          ctx.scale(dpr, dpr);
          ctx.drawImage(exportCanvas, 0, 0, displayW, displayH);
        }

        setCanvasRendered(true);
      } catch (err) {
        console.error("Failed to render poster:", err);
      }
    }

    render();
    return () => { cancelled = true; };
  }, [poster.photoUrl, hasRendered]);

  const shareUrl = `https://sheships.org/p/${poster.id}`;

  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      `I'll be participating in the She Ships global hackathon, representing my country in a 48h building marathon!`
    );
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

  const handleDownload = useCallback(async () => {
    const filename = `${poster.name.toLowerCase().replace(/\s+/g, "-")}-poster.png`;
    try {
      if (poster.renderedUrl) {
        const res = await fetch(poster.renderedUrl);
        const blob = await res.blob();
        await downloadPosterBlob(blob, filename);
      } else {
        const canvas = exportCanvasRef.current;
        if (!canvas) return;
        const blob = await exportPoster(canvas);
        await downloadPosterBlob(blob, filename);
      }
    } catch (err) {
      console.error("Download failed:", err);
    }
  }, [poster.name, poster.renderedUrl]);

  const canDownload = hasRendered || canvasRendered;

  return (
    <section className="h-dvh flex flex-col overflow-hidden bg-black select-none">
      {/* Poster — fills available space */}
      <div className="flex flex-1 min-h-0 items-center justify-center p-4 md:p-8">
        {hasRendered ? (
          /* Pre-rendered image — no canvas, no face detection, instant load */
          <img
            src={poster.renderedUrl!}
            alt={`${poster.name} – She Ships poster`}
            className="h-full max-h-full aspect-[4/5] object-contain"
          />
        ) : (
          <>
            {poster.photoUrl && (
              <canvas
                ref={displayCanvasRef}
                className="h-full max-h-full aspect-[4/5]"
                style={{ imageRendering: "auto" }}
              />
            )}
            <canvas
              ref={exportCanvasRef}
              width={1080}
              height={1350}
              className="fixed -left-[9999px] top-0 pointer-events-none"
            />
          </>
        )}
      </div>

      {/* Bottom action bar */}
      <div className="shrink-0 border-t border-[#222] bg-[#0a0a0a] px-4 py-3 md:px-8 md:py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {/* Left: edit link for owner */}
          <div className="w-20">
            {isOwner && (
              <Link
                href={`/p/${poster.id}/edit`}
                className="inline-flex items-center gap-1.5 text-[#666] hover:text-[#999] text-xs font-mono font-bold uppercase tracking-wider transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </Link>
            )}
          </div>

          {/* Center: share buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={shareOnTwitter}
              className="flex items-center gap-1.5 rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider text-[#999] transition-all hover:border-[#555] hover:text-white cursor-pointer"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Twitter / X</span>
            </button>
            <button
              onClick={shareOnLinkedIn}
              className="flex items-center gap-1.5 rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider text-[#999] transition-all hover:border-[#555] hover:text-white cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span className="hidden md:inline">LinkedIn</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={!canDownload}
              className="flex items-center gap-1.5 rounded-lg bg-[#E49BC2] px-3 py-2 text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider text-[#1a1a1a] transition-all hover:bg-[#d488b3] disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Download</span>
            </button>
          </div>

          {/* Right: branding */}
          <div className="w-20 text-right">
            <span className="text-[#333] text-[10px] font-mono tracking-widest uppercase">
              sheships.org
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
