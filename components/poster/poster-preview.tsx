"use client";

import { useEffect, useRef, useCallback } from "react";
import type {
  SpeakerData,
  FaceDetectionResult,
  TemplateType,
  FilterSettings,
} from "@/lib/poster/types";
import { renderPoster } from "@/lib/poster/canvas-renderer";

interface PosterPreviewProps {
  speaker: SpeakerData;
  image: HTMLImageElement | null;
  bgImage: HTMLImageElement | null;
  detection: FaceDetectionResult | null;
  template: TemplateType;
  filter: FilterSettings;
  exportCanvasRef: React.RefObject<HTMLCanvasElement | null>;
}

const POSTER_W = 1080;
const POSTER_H = 1350;

export function PosterPreview({
  speaker,
  image,
  bgImage,
  detection,
  template,
  filter,
  exportCanvasRef,
}: PosterPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(async () => {
    if (!image || !detection) return;

    const exportCanvas = exportCanvasRef.current;
    if (exportCanvas) {
      await renderPoster(exportCanvas, {
        speaker,
        image,
        bgImage,
        detection,
        template,
        filter,
        width: POSTER_W,
        height: POSTER_H,
      });
    }

    const displayCanvas = displayCanvasRef.current;
    const container = containerRef.current;
    if (displayCanvas && exportCanvas && container) {
      const dpr = window.devicePixelRatio || 1;

      // Fit the poster within the container while keeping 4:5 ratio
      const containerW = container.clientWidth;
      const containerH = container.clientHeight;
      const scale = Math.min(containerW / POSTER_W, containerH / POSTER_H);
      const displayW = Math.floor(POSTER_W * scale);
      const displayH = Math.floor(POSTER_H * scale);

      displayCanvas.style.width = `${displayW}px`;
      displayCanvas.style.height = `${displayH}px`;
      displayCanvas.width = displayW * dpr;
      displayCanvas.height = displayH * dpr;

      const ctx = displayCanvas.getContext("2d")!;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, displayW, displayH);
      ctx.drawImage(exportCanvas, 0, 0, displayW, displayH);
    }
  }, [speaker, image, bgImage, detection, template, filter, exportCanvasRef]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  if (!image || !detection) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="aspect-[4/5] max-h-full rounded border border-dashed border-[#333] bg-[#0e0e0e] flex items-center justify-center">
          <div className="text-center px-6">
            <div className="text-[#555] font-mono text-sm mb-2">
              No preview yet
            </div>
            <div className="text-[#444] font-mono text-xs">
              Upload a photo to generate the poster
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center h-full w-full"
    >
      <canvas
        ref={displayCanvasRef}
        className="rounded"
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
}
