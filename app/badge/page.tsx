"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Footer } from "@/components/sections/footer";
import BadgeForm from "@/components/badge/badge-form";
import BadgeResult from "@/components/badge/badge-result";
import ParticleInput from "@/components/badge/particle-input";
import ParticlePanel from "@/components/badge/particle-panel";
import type { CardData } from "@/lib/badge/types";
import {
  generateCardTexture,
  defaultDebugOffsets,
  type DebugOffsets,
} from "@/lib/badge/texture-generator";
import {
  defaultParticleConfig,
  capConfigForMobile,
  type ParticleConfig,
} from "@/lib/badge/particle-config";

const BadgeScene = dynamic(
  () => import("@/components/badge/badge-scene"),
  { ssr: false }
);

export default function BadgePage() {
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [cardTextureUrl, setCardTextureUrl] = useState<string | undefined>();
  const [textureKey, setTextureKey] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  const [particleConfig, setParticleConfig] = useState<ParticleConfig>(() =>
    typeof window !== "undefined" && window.innerWidth < 768
      ? capConfigForMobile(defaultParticleConfig)
      : defaultParticleConfig
  );
  const [particleLoading, setParticleLoading] = useState(false);
  const [debugOffsets, setDebugOffsets] = useState<DebugOffsets>(defaultDebugOffsets);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // TODO: remove debug auto-submit
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const debug = { name: "Cris", role: "Hacker" };
    const colors = defaultParticleConfig.groups.map((g) => g.color);
    generateCardTexture(debug, colors, debugOffsets).then((url) => {
      setCardTextureUrl(url);
      setTextureKey(1);
      setCardData(debug);
    });
  }, []);

  const handleSubmit = useCallback(async (data: CardData) => {
    const colors = particleConfig.groups.map((g) => g.color);
    const textureUrl = await generateCardTexture(data, colors, debugOffsets);
    setCardTextureUrl(textureUrl);
    setTextureKey((prev) => prev + 1);
    setCardData(data);
  }, [particleConfig]);

  // Regenerate texture when particle colors change
  useEffect(() => {
    if (!cardData) return;
    const colors = particleConfig.groups.map((g) => g.color);
    generateCardTexture(cardData, colors, debugOffsets).then((url) => {
      setCardTextureUrl(url);
      setTextureKey((prev) => prev + 1);
    });
  }, [particleConfig, cardData, debugOffsets]);

  const handleEdit = useCallback(() => {
    setCardData(null);
    setCardTextureUrl(undefined);
    setParticleConfig(
      isMobile ? capConfigForMobile(defaultParticleConfig) : defaultParticleConfig
    );
  }, [isMobile]);

  const handleGenerateParticles = useCallback(async (prompt: string) => {
    setParticleLoading(true);
    try {
      const isMobile =
        typeof window !== "undefined" && window.innerWidth < 768;
      const res = await fetch("/api/particles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, isMobile }),
      });
      if (!res.ok) throw new Error("Failed to generate particles");
      const config: ParticleConfig = await res.json();
      setParticleConfig(isMobile ? capConfigForMobile(config) : config);
    } finally {
      setParticleLoading(false);
    }
  }, []);

  return (
    <>
      {!cardData ? (
        <div className="min-h-screen flex flex-col bg-primary-black">
          <main className="flex-1 flex items-center justify-center px-6 py-24">
            <BadgeForm onSubmit={handleSubmit} />
          </main>
          <Footer />
        </div>
      ) : (
        <section className="h-dvh relative overflow-hidden bg-primary-black select-none touch-manipulation overscroll-none">
          {/* <ParticlePanel config={particleConfig} onChange={setParticleConfig} isMobile={isMobile} /> */}

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
                onEdit={handleEdit}
              />
              <div className="mt-2 md:mt-6">
                <ParticleInput
                  onGenerate={handleGenerateParticles}
                  isLoading={particleLoading}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
