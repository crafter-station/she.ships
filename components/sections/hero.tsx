"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen w-full pt-0">
      <div className="grid min-h-screen md:grid-cols-2">
        {/* Left — Pink block */}
        <div className="flex flex-col justify-center bg-hot-pink px-12 py-20 md:px-20 lg:px-28">
          <h1 className="mb-6 font-[family-name:var(--font-title)] text-7xl font-bold leading-[0.95] tracking-tight text-charcoal md:text-8xl lg:text-9xl">
            {t.hero.headline}
            <br />
            {t.hero.headlineAccent}
          </h1>

          <p className="mb-10 max-w-lg text-xl leading-relaxed text-charcoal md:text-2xl">
            {t.hero.description}
          </p>

          <div>
            <Button
              asChild
              size="lg"
              className="bg-charcoal text-white hover:bg-charcoal/85 px-8 py-7 text-lg font-medium"
            >
              <a href="#countdown">{t.nav.join}</a>
            </Button>
          </div>
        </div>

        {/* Right — Yellow block */}
        <div className="relative flex flex-col items-center justify-center bg-sunny-yellow px-8 py-16">
          {/* Placeholder for illustration/photo */}
          <div className="relative">
            {/* Large decorative branding */}
            <div className="text-center">
              <p className="mb-4 text-9xl font-black leading-none text-hot-pink font-[family-name:var(--font-title)] md:text-[12rem] lg:text-[14rem]">
                SS
              </p>
              <p className="font-[family-name:var(--font-title)] text-4xl font-bold text-charcoal">
                SheShips
              </p>
              <p className="mt-2 text-lg text-charcoal/70">March 8, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
