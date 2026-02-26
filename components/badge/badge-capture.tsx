"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  generateCardTexture,
  defaultDebugOffsets,
  pickAccentColor,
} from "@/lib/badge/texture-generator";
import type { ParticleConfig } from "@/lib/badge/particle-config";

const BadgeScene = dynamic(
  () => import("@/components/badge/badge-scene"),
  { ssr: false }
);

declare global {
  interface Window {
    __BADGE_READY__?: boolean;
  }
}

interface BadgeCaptureProps {
  name: string;
  role: string;
  organization: string | null;
  particleConfig: ParticleConfig;
  badgeNumber: string;
}

export default function BadgeCapture({
  name,
  role,
  organization,
  particleConfig,
  badgeNumber,
}: BadgeCaptureProps) {
  const [cardTextureUrl, setCardTextureUrl] = useState<string | undefined>();
  const [textureKey, setTextureKey] = useState(0);
  const initialized = useRef(false);

  const colors = particleConfig.groups.map((g) => g.color);
  const accentColor = pickAccentColor(colors);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const cardData = { name, role, organization };

    generateCardTexture(cardData, colors, defaultDebugOffsets, badgeNumber).then(
      (url) => {
        setCardTextureUrl(url);
        setTextureKey(1);
      }
    );

    // Signal ready after 3s for physics to settle
    setTimeout(() => {
      window.__BADGE_READY__ = true;
    }, 3000);
  }, []);

  return (
    <div className="w-[1600px] h-[900px] bg-primary-black relative overflow-hidden">
      {/* 3D scene — full bleed background */}
      {cardTextureUrl && (
        <div className="absolute inset-0 z-0">
          <BadgeScene
            key={textureKey}
            cardTextureUrl={cardTextureUrl}
            particleConfig={particleConfig}
          />
        </div>
      )}

      {/* Left text overlay — mirrors badge-view desktop layout */}
      <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
        <div className="pl-20 w-[45%] flex flex-col gap-6">
          {/* Label */}
          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: accentColor }}
          >
            She Ships 2026
          </p>

          {/* Headline */}
          <h1 className="text-5xl font-bold font-[family-name:var(--font-title)] uppercase tracking-tight text-white leading-[1.1]">
            I&apos;m hacking at She Ships
          </h1>

          {/* Date */}
          <p className="text-white/60 text-sm font-[family-name:var(--font-title)]">
            March 6-8, 2026 — 48h Global Hackathon
          </p>

          {/* Divider */}
          <div
            className="h-px w-full"
            style={{ backgroundColor: `${accentColor}33` }}
          />

          {/* Name + role */}
          <div>
            <p
              className="text-2xl font-bold uppercase tracking-wide"
              style={{ color: accentColor }}
            >
              {name}
            </p>
            <p className="text-white/80 text-sm uppercase tracking-wider mt-1">
              {role}
            </p>
            {organization && (
              <p className="text-white/40 text-sm mt-0.5">{organization}</p>
            )}
          </div>

          {/* Number */}
          <p className="text-white/20 text-xs font-mono tracking-widest">
            #{badgeNumber}
          </p>

          {/* Footer branding */}
          <p className="text-white/30 text-xs tracking-wider">
            sheships.org
          </p>
        </div>
      </div>
    </div>
  );
}
