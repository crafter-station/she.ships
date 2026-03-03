"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Eye } from "lucide-react";
import BadgeResult from "@/components/badge/badge-result";
import ParticleInput from "@/components/badge/particle-input";
import {
  generateCardTexture,
  defaultDebugOffsets,
  pickAccentColor,
  type DebugOffsets,
} from "@/lib/badge/texture-generator";
import {
  capConfigForMobile,
  type ParticleConfig,
} from "@/lib/badge/particle-config";
import { useUpdateBadge } from "@/lib/badge/mutations";
import type { Badge } from "@/lib/db/schema";

const BadgeScene = dynamic(
  () => import("@/components/badge/badge-scene"),
  { ssr: false }
);

interface BadgeViewProps {
  badge: Badge;
}

export default function BadgeView({ badge }: BadgeViewProps) {
  const [cardTextureUrl, setCardTextureUrl] = useState<string | undefined>();
  const [textureKey, setTextureKey] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  const [particleConfig, setParticleConfig] = useState<ParticleConfig>(
    () => {
      const config = badge.particleConfig;
      return typeof window !== "undefined" && window.innerWidth < 768
        ? capConfigForMobile(config)
        : config;
    }
  );
  const [particleLoading, setParticleLoading] = useState(false);
  const [debugOffsets] = useState<DebugOffsets>(defaultDebugOffsets);

  const updateBadge = useUpdateBadge(badge.id);
  const badgeNumber = String(badge.number).padStart(7, "0");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initial texture generation
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const cardData = { name: badge.name, role: badge.role, organization: badge.organization };
    const colors = particleConfig.groups.map((g) => g.color);
    generateCardTexture(cardData, colors, debugOffsets, badgeNumber).then((url) => {
      setCardTextureUrl(url);
      setTextureKey(1);
    });
  }, []);

  // Regenerate texture when particle colors change
  useEffect(() => {
    if (!initialized.current) return;
    const cardData = { name: badge.name, role: badge.role, organization: badge.organization };
    const colors = particleConfig.groups.map((g) => g.color);
    generateCardTexture(cardData, colors, debugOffsets, badgeNumber).then((url) => {
      setCardTextureUrl(url);
      setTextureKey((prev) => prev + 1);
    });
  }, [particleConfig, debugOffsets, badge.name, badge.role, badge.organization, badgeNumber]);

  const accentColor = useMemo(
    () => pickAccentColor(particleConfig.groups.map((g) => g.color)),
    [particleConfig]
  );

  const handleParticleConfigChange = useCallback((config: ParticleConfig) => {
    setParticleConfig(config);
    updateBadge.mutate({ particleConfig: config });
  }, [updateBadge]);

  const handleGenerateParticles = useCallback(async (prompt: string) => {
    setParticleLoading(true);
    try {
      const mobile = typeof window !== "undefined" && window.innerWidth < 768;
      const res = await fetch("/api/particles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, isMobile: mobile }),
      });
      if (!res.ok) throw new Error("Failed to generate particles");
      const config: ParticleConfig = await res.json();
      const finalConfig = mobile ? capConfigForMobile(config) : config;
      setParticleConfig(finalConfig);
      updateBadge.mutate({ particleConfig: finalConfig });
    } finally {
      setParticleLoading(false);
    }
  }, [updateBadge]);

  const cardData = { name: badge.name, role: badge.role, organization: badge.organization };

  return (
    <section className="h-dvh relative overflow-hidden bg-primary-black select-none touch-manipulation overscroll-none">
      {/* Back: 3D badge canvas */}
      {cardTextureUrl && (
        <div className="absolute inset-0 z-0">
          <BadgeScene
            key={textureKey}
            cardTextureUrl={cardTextureUrl}
            particleConfig={particleConfig}
          />
        </div>
      )}

      {/* Mobile gradient overlay for text readability */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none md:hidden" />

      {/* Front: text content — transparent, click-through except buttons */}
      <div className="absolute inset-0 z-10 flex items-end md:items-center pointer-events-none overflow-hidden">
        <div className="px-4 pb-6 md:pb-0 md:px-8 lg:px-12 lg:pl-72 w-full lg:w-1/2 pointer-events-auto">
          <BadgeResult
            cardData={cardData}
            badgeId={badge.id}
            badgeNumber={badgeNumber}
            accentColor={accentColor}
          />
          <div className="mt-2 md:mt-4 flex items-center gap-3">
            <div className="flex-1">
              <ParticleInput
                onGenerate={handleGenerateParticles}
                onPreset={handleParticleConfigChange}
                isLoading={particleLoading}
                isMobile={isMobile}
                accentColor={accentColor}
              />
            </div>
          </div>
          <Link
            href={`/badge/${badge.id}`}
            className="mt-2 md:mt-3 inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            View Badge
          </Link>
        </div>
      </div>
    </section>
  );
}
