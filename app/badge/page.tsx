"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Footer } from "@/components/sections/footer";
import BadgeForm from "@/components/badge/badge-form";
import BadgeResult from "@/components/badge/badge-result";
import type { CardData } from "@/lib/badge/types";
import { generateCardTexture } from "@/lib/badge/texture-generator";

const BadgeScene = dynamic(
  () => import("@/components/badge/badge-scene"),
  { ssr: false }
);

export default function BadgePage() {
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [cardTextureUrl, setCardTextureUrl] = useState<string | undefined>();
  const [textureKey, setTextureKey] = useState(0);

  // TODO: remove debug auto-submit
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const debug = { name: "Cris", role: "Participant" };
    generateCardTexture(debug).then((url) => {
      setCardTextureUrl(url);
      setTextureKey(1);
      setCardData(debug);
    });
  }, []);

  const handleSubmit = useCallback(async (data: CardData) => {
    const textureUrl = await generateCardTexture(data);
    setCardTextureUrl(textureUrl);
    setTextureKey((prev) => prev + 1);
    setCardData(data);
  }, []);

  const handleEdit = useCallback(() => {
    setCardData(null);
    setCardTextureUrl(undefined);
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
        <section className="h-screen relative overflow-hidden bg-primary-black">
          {/* Back: 3D badge canvas */}
          {cardTextureUrl && (
            <div className="absolute inset-0 z-0 hidden md:block">
              <BadgeScene
                key={textureKey}
                cardTextureUrl={cardTextureUrl}
              />
            </div>
          )}

          {/* Front: text content — transparent, click-through except buttons */}
          <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
            <div className="px-8 lg:px-12 lg:pl-72 w-full lg:w-1/2 pointer-events-auto">
              <BadgeResult
                cardData={cardData}
                onEdit={handleEdit}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
