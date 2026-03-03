"use client";

import { useEffect, useRef } from "react";
import { renderPoster } from "@/lib/poster/canvas-renderer";
import type {
  FilterSettings,
  FaceDetectionResult,
  TemplateType,
} from "@/lib/poster/types";

interface RenderCanvasProps {
  photoUrl: string;
  name: string;
  role: string;
  template: TemplateType;
  filter: FilterSettings;
  detection: FaceDetectionResult;
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

export function RenderCanvas({
  photoUrl,
  name,
  role,
  template,
  filter,
  detection,
}: RenderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    async function render() {
      const [image, bgImage] = await Promise.all([
        loadImage(photoUrl),
        loadImage("/poster/bg.png"),
      ]);

      await renderPoster(canvas!, {
        speaker: { name, role },
        image,
        bgImage,
        detection,
        template,
        filter,
        width: 1080,
        height: 1350,
      });

      // Signal Puppeteer that the canvas is ready to screenshot
      canvas!.dataset.ready = "true";
    }

    render().catch((err) => {
      console.error("[render-canvas] failed:", err);
      // Signal Puppeteer so it can fail fast instead of timing out
      if (canvas) canvas.dataset.error = String(err);
    });
  // Props are stable (passed from server, never change)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      id="poster-canvas"
      ref={canvasRef}
      width={1080}
      height={1350}
      style={{ display: "block", margin: 0, padding: 0 }}
    />
  );
}
