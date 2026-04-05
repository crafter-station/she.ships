"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";

export function OrgHero() {
  const { t } = useTranslation();
  const h = t.org.hero;

  const stats = [
    { value: "200", label: h.stat1Label },
    { value: "56", label: h.stat2Label },
    { value: "300+", label: h.stat3Label },
  ];

  return (
    <section id="hero" className="sticky top-0 min-h-screen w-full flex flex-col overflow-hidden">
      {/* Background */}
      <Image
        src="/brand/hero_image_sheep.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-primary-black z-10" />

      {/* Content — offset below nav (64px) */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto px-6 pt-28 pb-16 flex-1 justify-center">

        {/* Label */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-2 h-2 bg-primary-green" />
          <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-green">
            {h.latamLabel}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-[family-name:var(--font-title)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-tight tracking-tight text-white mb-6">
          {h.headline1}<br />
          <span className="text-primary-pink">{h.headline2}</span>
        </h1>

        <p className="text-white/70 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
          {h.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button asChild variant="pink" size="lg">
            <a href="https://discord.gg/n6nNAqMu" target="_blank" rel="noopener noreferrer">
              {h.ctaCommunity}
            </a>
          </Button>
          <Button asChild variant="green" size="lg">
            <a href="#workshops">
              {h.ctaWorkshops}
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center gap-0 border-2 border-white/20">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center px-8 py-5 ${i < stats.length - 1 ? "border-b-2 sm:border-b-0 sm:border-r-2 border-white/20" : ""}`}
            >
              <span className={`font-[family-name:var(--font-title)] text-4xl font-black ${i === 1 ? "text-primary-green" : "text-primary-pink"}`}>
                {stat.value}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-white/60 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
