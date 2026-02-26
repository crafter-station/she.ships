"use client";

import { useMemo } from "react";
import { useTranslation } from "@/lib/i18n/context";
import { Twitter, Linkedin, Download, Video, Square } from "lucide-react";
import { useRecorder, type RecorderBadgeInfo } from "@/lib/badge/use-recorder";
import { takeScreenshot } from "@/lib/badge/canvas-overlay";
import type { CardData } from "@/lib/badge/types";

interface BadgeResultProps {
  cardData: CardData;
  badgeId: string;
  badgeNumber: string;
  accentColor?: string;
}

export default function BadgeResult({ cardData, badgeId, badgeNumber, accentColor }: BadgeResultProps) {
  const { t } = useTranslation();

  const recorderInfo = useMemo<RecorderBadgeInfo>(
    () => ({
      name: cardData.name,
      role: cardData.role,
      organization: cardData.organization ?? null,
      badgeNumber,
      accentColor: accentColor || "#ff2d78",
    }),
    [cardData, badgeNumber, accentColor]
  );

  const { recording, countdown, hint, remaining, start, stop } = useRecorder(recorderInfo);

  const shareUrl = `https://sheships.org/badge/${badgeId}`;

  const shareOnTwitter = () => {
    const text = encodeURIComponent(t.badge.shareText);
    const url = encodeURIComponent(shareUrl);
    const hashtags = "SheShips,WomenInTech";
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`,
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

  const handleDownload = () => {
    takeScreenshot(recorderInfo);
  };

  return (
    <div className="flex flex-col gap-3 md:gap-8 w-full max-w-md">
      {/* Countdown overlay */}
      {countdown !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <span className="text-[120px] font-bold text-white/80 font-[family-name:var(--font-title)] animate-pulse">
            {countdown}
          </span>
        </div>
      )}

      {/* Recording indicator + timer */}
      {recording && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-red-500/90 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full animate-pulse">
          <span className="w-2 h-2 bg-white rounded-full" />
          Rec {remaining !== null && `${remaining}s`}
        </div>
      )}

      {/* Drag hint after countdown */}
      {hint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <span className="text-lg md:text-2xl font-bold text-white/70 font-[family-name:var(--font-title)] uppercase tracking-wider animate-pulse">
            {hint}
          </span>
        </div>
      )}

      {/* Headline — hidden on mobile to keep badge visible */}
      <div className="hidden md:block">
        <p className="data-label mb-2" style={{ color: accentColor || "#ff2d78" }}>{t.badge.label}</p>
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-title)] uppercase tracking-tight text-white">
          {t.badge.resultHeadline}
        </h1>
        <p className="mt-2 text-white/60 text-sm font-[family-name:var(--font-title)]">
          {t.badge.resultDate}
        </p>
      </div>

      {/* Description — hidden on mobile */}
      <p className="hidden md:block text-neutral-gray text-sm leading-relaxed">
        {t.badge.resultDescription}
      </p>

      <div className="hidden md:block h-px" style={{ backgroundColor: accentColor ? `${accentColor}33` : "rgba(255,255,255,0.1)" }} />

      {/* Share buttons — compact on mobile */}
      <div className="flex items-center gap-2 md:flex-col md:items-stretch md:gap-3">
        <p className="hidden md:block text-sm font-bold uppercase tracking-wider" style={{ color: accentColor || "#ffffff" }}>
          {t.badge.shareLabel}
        </p>
        <div className="flex gap-2 md:gap-3 flex-1">
          <button
            onClick={shareOnTwitter}
            className="brutalist-button flex-1 py-2 px-3 md:py-3 md:px-4 bg-white text-primary-black font-bold uppercase text-[10px] md:text-sm flex items-center justify-center gap-1.5 md:gap-2"
          >
            <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Twitter / X
          </button>
          <button
            onClick={shareOnLinkedIn}
            className="brutalist-button flex-1 py-2 px-3 md:py-3 md:px-4 bg-white text-primary-black font-bold uppercase text-[10px] md:text-sm flex items-center justify-center gap-1.5 md:gap-2"
          >
            <Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4" />
            LinkedIn
          </button>
        </div>
        <div className="flex gap-2 md:gap-3">
          <button
            onClick={handleDownload}
            disabled={recording}
            className="brutalist-button flex-1 py-2 px-3 md:py-3 md:px-4 bg-white text-primary-black font-bold uppercase text-[10px] md:text-sm flex items-center justify-center gap-1.5 md:gap-2 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden md:inline">Image</span>
          </button>
          <button
            onClick={recording ? stop : start}
            disabled={countdown !== null}
            className={`brutalist-button flex-1 py-2 px-3 md:py-3 md:px-4 font-bold uppercase text-[10px] md:text-sm flex items-center justify-center gap-1.5 md:gap-2 disabled:opacity-50 ${
              recording
                ? "bg-red-500 text-white"
                : "bg-white text-primary-black"
            }`}
          >
            {recording ? (
              <Square className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" />
            ) : (
              <Video className="w-3.5 h-3.5 md:w-4 md:h-4" />
            )}
            <span className="hidden md:inline">{recording ? "Stop" : "Video"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
