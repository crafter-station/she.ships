"use client";

import { useEffect, useRef, useCallback } from "react";
import { renderPoster } from "@/lib/poster/canvas-renderer";
import type {
  SpeakerData,
  FaceDetectionResult,
  TemplateType,
  FilterSettings,
} from "@/lib/poster/types";

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
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    if (!image || !detection) return;

    const exportCanvas = exportCanvasRef.current;
    if (exportCanvas) {
      renderPoster(exportCanvas, {
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
    if (displayCanvas && exportCanvas) {
      const dpr = window.devicePixelRatio || 1;
      const displayW = displayCanvas.clientWidth;
      const displayH = displayCanvas.clientHeight;
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
      <div className="flex items-center justify-center h-full w-full max-h-full">
        <div className="aspect-[4/5] h-full max-h-full border border-dashed border-[#333] bg-[#0e0e0e] flex items-center justify-center">
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
    <div className="flex items-center justify-center h-full w-full max-h-full">
      <canvas
        ref={displayCanvasRef}
        className="h-full max-h-full aspect-[4/5]"
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
}
