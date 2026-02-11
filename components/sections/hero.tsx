"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { CrafterStationLogo } from "@/components/logos/crafter-station";
import { useTranslation } from "@/lib/i18n/context";

export function Hero() {
  const { t } = useTranslation();

  return (
    <SectionWrapper
      variant="dark"
      grid
      className="min-h-screen flex items-center"
    >
      {/* Coordinate cross decorations */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-12 top-32 text-grid-gray text-2xl select-none hidden lg:block"
      >
        +
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-16 top-48 text-grid-gray text-2xl select-none hidden lg:block"
      >
        +
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-24 bottom-32 text-grid-gray text-2xl select-none hidden lg:block"
      >
        +
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-32 bottom-48 text-grid-gray text-2xl select-none hidden lg:block"
      >
        +
      </div>

      <div className="relative flex flex-col items-center text-center">
        {/* Mono badges */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <Badge className="bg-rose-coral/15 text-rose-coral border-rose-coral/30 font-mono text-xs uppercase tracking-widest">
            {t.hero.badgeMarch}
          </Badge>
          <Badge className="bg-grid-gray text-warm-gray border-warm-gray/20 font-mono text-xs uppercase tracking-widest">
            {t.hero.badgeAI}
          </Badge>
          <Badge className="bg-grid-gray text-warm-gray border-warm-gray/20 font-mono text-xs uppercase tracking-widest">
            {t.hero.badgeNoCode}
          </Badge>
          <Badge className="bg-grid-gray text-warm-gray border-warm-gray/20 font-mono text-xs uppercase tracking-widest">
            {t.hero.badgeShip}
          </Badge>
        </div>

        {/* Script tagline */}
        <p className="mb-4 font-script text-xl text-rose-coral md:text-2xl">
          {t.hero.tagline}
        </p>

        {/* Main headline */}
        <h1 className="mb-6 max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl">
          {t.hero.headline}{" "}
          <span className="text-rose-coral">{t.hero.headlineAccent}</span>
        </h1>

        <p className="mb-10 max-w-2xl text-lg text-warm-gray md:text-xl">
          {t.hero.description}{" "}
          <span className="text-white font-medium">
            {t.hero.descriptionDate}
          </span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-rose-coral text-white hover:bg-deep-rose px-8 py-6 text-base"
          >
            <a href="#cta">{t.hero.ctaPrimary}</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-warm-gray/30 text-white hover:bg-white/5 px-8 py-6 text-base"
          >
            <a href="#how-it-works">{t.hero.ctaSecondary}</a>
          </Button>
        </div>

        {/* By Crafter Station */}
        <a
          href="https://www.crafterstation.com"
          className="mt-10 flex items-center gap-2 text-sm text-warm-gray transition-colors hover:text-white"
        >
          <span>{t.hero.by}</span>
          <CrafterStationLogo className="size-4" />
          <span className="font-medium">Crafter Station</span>
        </a>
      </div>
    </SectionWrapper>
  );
}
