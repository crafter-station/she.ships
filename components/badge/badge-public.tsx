"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Twitter, Linkedin, Download, Video, Square, Pencil } from "lucide-react";
import {
  generateCardTexture,
  defaultDebugOffsets,
  pickAccentColor,
} from "@/lib/badge/texture-generator";
import { capConfigForMobile, type ParticleConfig } from "@/lib/badge/particle-config";
import { useRecorder, type RecorderBadgeInfo } from "@/lib/badge/use-recorder";
import { takeScreenshot } from "@/lib/badge/canvas-overlay";
import type { Badge } from "@/lib/db/schema";

const BadgeScene = dynamic(
  () => import("@/components/badge/badge-scene"),
  { ssr: false }
);

interface BadgePublicProps {
  badge: Badge;
}

export default function BadgePublic({ badge }: BadgePublicProps) {
  const [cardTextureUrl, setCardTextureUrl] = useState<string | undefined>();
  const [textureKey, setTextureKey] = useState(0);
  const [particleConfig] = useState<ParticleConfig>(() => {
    const config = badge.particleConfig;
    return typeof window !== "undefined" && window.innerWidth < 768
      ? capConfigForMobile(config)
      : config;
  });

  const badgeNumber = String(badge.number).padStart(7, "0");

  const accentColor = useMemo(
    () => pickAccentColor(particleConfig.groups.map((g) => g.color)),
    [particleConfig]
  );

  const recorderInfo = useMemo<RecorderBadgeInfo>(
    () => ({
      name: badge.name,
      role: badge.role,
      organization: badge.organization ?? null,
      badgeNumber,
      accentColor,
    }),
    [badge.name, badge.role, badge.organization, badgeNumber, accentColor]
  );

  const { recording, countdown, hint, remaining, start, stop } = useRecorder(recorderInfo);

  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("badge_id");
    if (stored === badge.id) {
      setIsOwner(true);
    }
  }, [badge.id]);

  // Generate texture once
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const colors = particleConfig.groups.map((g) => g.color);
    generateCardTexture(
      { name: badge.name, role: badge.role, organization: badge.organization },
      colors,
      defaultDebugOffsets,
      badgeNumber
    ).then((url) => {
      setCardTextureUrl(url);
      setTextureKey(1);
    });
  }, []);

  const shareUrl = `https://sheships.org/badge/${badge.id}`;

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

  const handleDownload = () => {
    takeScreenshot(recorderInfo);
  };

  return (
    <section className="h-dvh relative overflow-hidden bg-primary-black select-none touch-manipulation overscroll-none">
      {/* 3D badge canvas */}
      {cardTextureUrl && (
        <div className="absolute inset-0 z-0">
          <BadgeScene
            key={textureKey}
            cardTextureUrl={cardTextureUrl}
            particleConfig={particleConfig}
          />
        </div>
      )}

      {/* Mobile gradient overlay */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none md:hidden" />

      {/* Countdown overlay */}
      {countdown !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <span className="text-[120px] font-bold text-white/80 font-[family-name:var(--font-title)] animate-pulse">
            {countdown}
          </span>
        </div>
      )}

      {/* Recording indicator */}
      {recording && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-red-500/90 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full animate-pulse">
          <span className="w-2 h-2 bg-white rounded-full" />
          Rec {remaining !== null && `${remaining}s`}
        </div>
      )}

      {/* Drag hint */}
      {hint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <span className="text-lg md:text-2xl font-bold text-white/70 font-[family-name:var(--font-title)] uppercase tracking-wider animate-pulse">
            {hint}
          </span>
        </div>
      )}

      {/* Text content overlay */}
      <div className="absolute inset-0 z-10 flex items-end md:items-center pointer-events-none overflow-hidden">
        <div className="px-4 pb-6 md:pb-0 md:px-8 lg:px-12 lg:pl-72 w-full lg:w-1/2 pointer-events-auto">
          <div className="flex flex-col gap-3 md:gap-8 w-full max-w-md">
            {/* Header info */}
            <div className="hidden md:block">
              <p
                className="data-label mb-2"
                style={{ color: accentColor }}
              >
                SHE SHIPS 2026
              </p>
              <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-title)] uppercase tracking-tight text-white">
                I&apos;m hacking at She Ships
              </h1>
              <p className="mt-2 text-white/60 text-sm font-[family-name:var(--font-title)]">
                March 6-8, 2026 — 48h Global Hackathon
              </p>
            </div>

            {/* Divider */}
            <div
              className="hidden md:block h-px"
              style={{ backgroundColor: `${accentColor}33` }}
            />

            {/* Badge holder info */}
            <div>
              <h2
                className="text-xl md:text-2xl font-bold font-[family-name:var(--font-title)] uppercase tracking-tight"
                style={{ color: accentColor }}
              >
                {badge.name}
              </h2>
              <p className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-wider mt-1">
                {badge.role}
              </p>
              {badge.organization && (
                <p className="text-white/40 text-xs md:text-sm mt-0.5">
                  {badge.organization}
                </p>
              )}
              <p className="text-white/20 text-[10px] md:text-xs font-mono tracking-widest mt-2">
                #{badgeNumber}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 md:flex-col md:items-stretch md:gap-3">
              <p className="hidden md:block text-sm font-bold uppercase tracking-wider text-white/60">
                Share
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

            {/* Edit link for badge owner */}
            {isOwner && (
              <Link
                href={`/badge/${badge.id}/edit`}
                className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit Badge
              </Link>
            )}

            {/* Branding */}
            <p className="text-white/20 text-[10px] md:text-xs tracking-widest uppercase">
              sheships.org
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
