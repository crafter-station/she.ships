"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";
import Image from "next/image";

export function LandingHero() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background - same sheep image */}
      <Image
        src="https://res.cloudinary.com/dzohocmtc/image/upload/f_auto,q_auto,w_1920/v1771977266/hero_raw_4_iagzd2.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Tag */}
        <div className="inline-block brutalist-card bg-primary-pink px-4 py-2 mb-8">
          <span className="font-[family-name:var(--font-title)] text-xs sm:text-sm font-black text-primary-black uppercase tracking-wider">
            {t.landing.heroTagline}
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-[family-name:var(--font-title)] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none mb-6">
          <span className="text-white drop-shadow-lg">{t.landing.heroHeadline}</span>
          <span className="text-primary-pink drop-shadow-lg">{t.landing.heroHeadlineAccent}</span>
        </h1>

        {/* Description */}
        <p className="text-white text-lg sm:text-xl max-w-2xl leading-relaxed mb-10 drop-shadow-md">
          {t.landing.heroDescription}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button asChild variant="pink" size="lg">
            <a href="#upcoming-events">{t.landing.ctaEvents}</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#sponsors">{t.landing.ctaSponsor}</a>
          </Button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-black to-transparent" />
    </section>
  );
}
