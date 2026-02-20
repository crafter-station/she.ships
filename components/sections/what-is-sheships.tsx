"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";

export function WhatIsSheShips() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="dark" id="what-is-sheships" className="overflow-hidden">
      <div className="grid min-w-0 max-w-full md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Left - Decorative graphic: tamaños responsive para no desbordar en mobile */}
        <div className="flex justify-center min-w-0">
          <div className="relative">
            {/* Pink circles with SS letters */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-20 h-20 sm:w-32 sm:h-32 bg-secondary-light-pink border-4 border-primary-black flex items-center justify-center transform -rotate-12 shrink-0">
                <span className="font-[family-name:var(--font-title)] text-3xl sm:text-5xl font-black text-primary-black">
                  S
                </span>
              </div>
              <div className="w-24 h-24 sm:w-40 sm:h-40 bg-secondary-light-pink border-4 border-primary-black flex items-center justify-center transform rotate-6 shrink-0">
                <span className="font-[family-name:var(--font-title)] text-4xl sm:text-6xl font-black text-primary-black">
                  S
                </span>
              </div>
              <div className="w-[5.5rem] h-[5.5rem] sm:w-36 sm:h-36 bg-sunny-yellow border-4 border-primary-black flex items-center justify-center transform -rotate-6 shrink-0">
                <span className="font-[family-name:var(--font-title)] text-3xl sm:text-5xl font-black text-primary-black">
                  ●
                </span>
              </div>
            </div>
            {/* Decorative star */}
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 text-sunny-yellow text-2xl sm:text-4xl" aria-hidden>
              ✦
            </div>
          </div>
        </div>

        {/* Right - Content */}
        <div className="min-w-0">
          <div className="mb-6">
            <div className="inline-block brutalist-card bg-secondary-light-pink px-4 py-2 mb-4">
              <span className="font-[family-name:var(--font-title)] text-sm font-black text-primary-black uppercase tracking-wide">
                {t.hero.date}
              </span>
            </div>
          </div>

          <h2 className="font-[family-name:var(--font-title)] text-5xl font-black text-white mb-6 leading-tight md:text-6xl">
            {t.eventInfo.headline}
            <br />
            <span className="text-primary-pink">{t.eventInfo.headlineAccent}</span>
          </h2>

          <div className="space-y-4 text-lg text-white/80 leading-relaxed">
            <p>{t.eventInfo.paragraph1}</p>
            <p>{t.eventInfo.paragraph2}</p>
            <p className="text-white font-bold">
              {t.eventInfo.requirementLine}
            </p>
            <p>{t.eventInfo.requirementSub}</p>
          </div>

          <p className="mt-8 text-sm text-neutral-gray font-medium">
            {t.eventInfo.limited}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
