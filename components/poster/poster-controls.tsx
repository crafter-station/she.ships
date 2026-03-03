"use client";

import { useRef, useCallback, useState } from "react";
import {
  TriangleAlert,
  RotateCcw,
  Minus,
  Plus,
  Crosshair,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";
import type { TemplateType, FilterSettings } from "@/lib/poster/types";

interface PosterControlsProps {
  template: TemplateType;
  onTemplateChange: (t: TemplateType) => void;
  filter: FilterSettings;
  onFilterChange: (f: FilterSettings) => void;
}

// ── 2D Drag Pad ─────────────────────────────────────────────────────
function DragPad({
  panX,
  panY,
  onChange,
}: {
  panX: number;
  panY: number;
  onChange: (x: number, y: number) => void;
}) {
  const padRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const posFromEvent = useCallback(
    (clientX: number, clientY: number) => {
      const pad = padRef.current;
      if (!pad) return;
      const rect = pad.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 200 - 100;
      const y = ((clientY - rect.top) / rect.height) * 200 - 100;
      onChange(
        Math.round(Math.max(-100, Math.min(100, x))),
        Math.round(Math.max(-100, Math.min(100, y)))
      );
    },
    [onChange]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      posFromEvent(e.clientX, e.clientY);
    },
    [posFromEvent]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      posFromEvent(e.clientX, e.clientY);
    },
    [isDragging, posFromEvent]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const step = e.shiftKey ? 10 : 2;
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          onChange(Math.max(-100, panX - step), panY);
          break;
        case "ArrowRight":
          e.preventDefault();
          onChange(Math.min(100, panX + step), panY);
          break;
        case "ArrowUp":
          e.preventDefault();
          onChange(panX, Math.max(-100, panY - step));
          break;
        case "ArrowDown":
          e.preventDefault();
          onChange(panX, Math.min(100, panY + step));
          break;
      }
    },
    [panX, panY, onChange]
  );

  const dotLeft = ((panX + 100) / 200) * 100;
  const dotTop = ((panY + 100) / 200) * 100;

  return (
    <div
      ref={padRef}
      role="application"
      tabIndex={0}
      aria-label={`Image position control. Pan X: ${panX}, Pan Y: ${panY}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      className={`
        relative w-full aspect-square max-w-[180px] mx-auto
        border bg-[#111] select-none
        focus:outline-none focus:ring-1 focus:ring-[#E49BC2]/50
        transition-colors
        ${isDragging ? "border-[#E49BC2] cursor-grabbing" : "border-[#333] cursor-crosshair hover:border-[#555]"}
      `}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#282828]" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#282828]" />
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-[#1a1a1a]" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-[#1a1a1a]" />
        <div className="absolute top-1/4 left-0 right-0 h-px bg-[#1a1a1a]" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-[#1a1a1a]" />
      </div>

      {/* Active crosshair lines */}
      <div
        className="absolute top-0 bottom-0 w-px bg-[#E49BC2]/20 pointer-events-none transition-[left] duration-75"
        style={{ left: `${dotLeft}%` }}
      />
      <div
        className="absolute left-0 right-0 h-px bg-[#E49BC2]/20 pointer-events-none transition-[top] duration-75"
        style={{ top: `${dotTop}%` }}
      />

      {/* Dot indicator */}
      <div
        className="absolute w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-[left,top] duration-75"
        style={{ left: `${dotLeft}%`, top: `${dotTop}%` }}
      >
        <div
          className={`
            w-full h-full border-2
            ${isDragging ? "border-[#E49BC2] bg-[#E49BC2]/30 scale-110" : "border-[#E49BC2]/70 bg-[#E49BC2]/15"}
            transition-all
          `}
        />
      </div>

      {/* Corner labels */}
      <span className="absolute top-1.5 left-2 text-[8px] font-mono text-[#444] pointer-events-none">
        L
      </span>
      <span className="absolute top-1.5 right-2 text-[8px] font-mono text-[#444] pointer-events-none">
        R
      </span>
    </div>
  );
}

// ── Zoom Strip ──────────────────────────────────────────────────────
function ZoomStrip({
  zoom,
  onChange,
}: {
  zoom: number;
  onChange: (z: number) => void;
}) {
  const step = 0.05;
  const min = 0.5;
  const max = 2.0;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, zoom - step))}
        className="flex items-center justify-center w-7 h-7 border border-[#333] bg-[#1a1a1a] text-[#a0a0a0] hover:border-[#555] hover:text-[#f0f0f0] transition-colors cursor-pointer"
        aria-label="Zoom out"
      >
        <Minus className="h-3 w-3" />
      </button>

      <div className="flex-1 relative h-7 flex items-center">
        <div className="w-full h-1 bg-[#222] relative">
          <div
            className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-[#444]"
            style={{ left: `${((1.0 - min) / (max - min)) * 100}%` }}
          />
          <div
            className="absolute top-0 left-0 h-full bg-[#E49BC2]/40 transition-[width] duration-75"
            style={{ width: `${((zoom - min) / (max - min)) * 100}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 border-2 border-[#E49BC2] bg-[#1a1a1a] transition-[left] duration-75"
            style={{ left: `${((zoom - min) / (max - min)) * 100}%` }}
          />
        </div>
        <input
          type="range"
          min={min * 100}
          max={max * 100}
          step={step * 100}
          value={Math.round(zoom * 100)}
          onChange={(e) => onChange(Number(e.target.value) / 100)}
          className="absolute inset-0 opacity-0 cursor-pointer"
          aria-label="Zoom level"
        />
      </div>

      <button
        type="button"
        onClick={() => onChange(Math.min(max, zoom + step))}
        className="flex items-center justify-center w-7 h-7 border border-[#333] bg-[#1a1a1a] text-[#a0a0a0] hover:border-[#555] hover:text-[#f0f0f0] transition-colors cursor-pointer"
        aria-label="Zoom in"
      >
        <Plus className="h-3 w-3" />
      </button>

      <span className="text-xs font-mono text-[#666] w-12 text-right tabular-nums">
        {zoom.toFixed(2)}x
      </span>
    </div>
  );
}

// ── Main Controls ───────────────────────────────────────────────────
export function PosterControls({
  template,
  onTemplateChange,
  filter,
  onFilterChange,
}: PosterControlsProps) {
  const { t } = useTranslation();

  const handlePanChange = useCallback(
    (x: number, y: number) => {
      onFilterChange({ ...filter, panX: x, panY: y });
    },
    [filter, onFilterChange]
  );

  const handleZoomChange = useCallback(
    (z: number) => {
      onFilterChange({ ...filter, zoom: z });
    },
    [filter, onFilterChange]
  );

  const resetPosition = () => {
    onFilterChange({ ...filter, panX: 0, panY: 0, zoom: 1.0 });
  };

  const isDefaultPos =
    filter.panX === 0 && filter.panY === 0 && filter.zoom === 1.0;

  const isSafariLike = typeof navigator !== "undefined"
    ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || /iPad|iPhone|iPod/.test(navigator.userAgent)
    : false;

  return (
    <div className="flex flex-col gap-5">
      {/* Crop style */}
      <div>
        <h2 className="text-[10px] font-mono uppercase tracking-widest text-[#666] mb-2">
          {t.badge.poster.cropStyle}
        </h2>
        <div className="grid grid-cols-3 gap-1.5">
          {(["half-face", "eyes", "smile"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onTemplateChange(t)}
              className={`border px-2 py-2 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                template === t
                  ? "border-[#E49BC2] bg-[#E49BC2]/10 text-[#E49BC2]"
                  : "border-[#2a2a2a] bg-[#141414] text-[#777] hover:border-[#444] hover:text-[#aaa]"
              }`}
            >
              {t === "half-face"
                ? "Half Face"
                : t === "eyes"
                  ? "Eyes"
                  : "Smile"}
            </button>
          ))}
        </div>
      </div>

      {/* Position & Zoom */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[10px] font-mono uppercase tracking-widest text-[#666] flex items-center gap-1.5">
            <Crosshair className="h-3 w-3" />
            {t.badge.poster.positionZoom}
          </h2>
          {!isDefaultPos && (
            <button
              type="button"
              onClick={resetPosition}
              className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-[#E49BC2]/60 hover:text-[#E49BC2] transition-colors cursor-pointer"
            >
              <RotateCcw className="h-2.5 w-2.5" />
              {t.badge.poster.resetPosition}
            </button>
          )}
        </div>

        <DragPad
          panX={filter.panX}
          panY={filter.panY}
          onChange={handlePanChange}
        />

        <div className="flex justify-center gap-4 mt-2 mb-3">
          <span className="text-[9px] font-mono text-[#555] tabular-nums">
            X: {filter.panX > 0 ? "+" : ""}
            {filter.panX}
          </span>
          <span className="text-[9px] font-mono text-[#555] tabular-nums">
            Y: {filter.panY > 0 ? "+" : ""}
            {filter.panY}
          </span>
        </div>

        <ZoomStrip zoom={filter.zoom} onChange={handleZoomChange} />

        <p className="text-[9px] font-mono text-[#444] mt-2 leading-relaxed text-center">
          {t.badge.poster.dragHint}
        </p>
      </div>

      {/* Safari warning */}
      {isSafariLike && (
        <div className="flex items-start gap-2.5 border border-[#3a3020] bg-[#141414] px-3 py-2.5">
          <TriangleAlert className="h-3.5 w-3.5 text-[#f0c040] shrink-0 mt-0.5" />
          <p className="text-[9px] font-mono text-[#888] leading-relaxed">
            {t.badge.poster.safariWarning}
          </p>
        </div>
      )}
    </div>
  );
}
