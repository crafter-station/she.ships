"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen w-full bg-primary-cream">
      <div className="grid min-h-screen md:grid-cols-2">
        {/* Left — Pink block */}
        <div className="relative flex flex-col justify-center bg-primary-pink border-4 border-primary-black px-12 py-20 md:px-20 lg:px-28">
          {/* Decorative squiggle */}
          <div className="absolute bottom-12 right-12 text-6xl font-bold opacity-20 select-none">
            ~
          </div>

          <h1 className="mb-6 font-[family-name:var(--font-title)] text-7xl font-black leading-[0.9] tracking-tight text-primary-black md:text-8xl lg:text-9xl">
            {t.hero.headline}
            <br />
            <span className="text-white">{t.hero.headlineAccent}</span>
          </h1>

          <p className="mb-10 max-w-lg text-xl leading-relaxed text-primary-black/90 md:text-2xl font-medium">
            {t.hero.description}
          </p>

          <div>
            <Button asChild size="lg" variant="default">
              <a href="#countdown">{t.nav.join}</a>
            </Button>
          </div>
        </div>

        {/* Right — Multiple colored blocks stacked */}
        <div className="grid grid-rows-2">
          {/* Top block - Purple */}
          <div className="relative bg-secondary-purple border-4 border-primary-black flex items-center justify-center p-12">
            <div className="brutalist-card bg-white p-8 max-w-sm">
              <div className="text-center">
                <div className="mb-4 font-[family-name:var(--font-title)] text-6xl font-black text-primary-pink">
                  8
                </div>
                <div className="font-[family-name:var(--font-title)] text-2xl font-bold text-primary-black">
                  MARCH 2026
                </div>
                <div className="mt-2 text-sm font-medium text-neutral-gray uppercase tracking-wide">
                  Global Hackathon
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute top-8 right-8 text-4xl opacity-20 select-none">
              ✦
            </div>
          </div>

          {/* Bottom block - Light Pink */}
          <div className="relative bg-secondary-light-pink border-4 border-l-4 border-primary-black flex items-center justify-center p-12">
            <div className="text-center max-w-md">
              <div className="mb-6 inline-block brutalist-card bg-white px-6 py-3">
                <span className="font-[family-name:var(--font-title)] text-xl font-black text-primary-black">
                  100% ONLINE
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-title)] text-4xl font-black text-primary-black mb-4">
                Build. Ship. Win.
              </h2>
              <p className="text-lg text-primary-black/80 font-medium">
                24 hours to turn your idea into reality
              </p>
            </div>
            {/* Decorative squiggle */}
            <div className="absolute bottom-8 left-8 text-5xl font-bold opacity-20 select-none rotate-180">
              ~
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
