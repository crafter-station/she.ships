"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";

export function Prizes() {
  const { t } = useTranslation();
  const { places, specialAward } = t.prizes;

  return (
    <SectionWrapper variant="dark" id="prizes" className="min-h-fit">
      {/* Header */}
      <div className="mb-10">
        <span className="data-label mb-4 block text-neutral-gray uppercase">
          {t.prizes.label}
        </span>
        <h2 className="font-[family-name:var(--font-title)] text-3xl font-black tracking-tight text-white md:text-4xl lg:text-5xl uppercase">
          {t.prizes.headline}{" "}
          <span className="text-primary-pink">{t.prizes.headlineAccent}</span>
        </h2>
        <p className="mt-3 text-neutral-gray text-sm">{t.prizes.stackNote}</p>
      </div>

      {/* ── MAIN CATEGORIES ── */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-black bg-primary-green px-2 py-1">
            {t.prizes.mainLabel}
          </span>
          <span className="data-label text-neutral-gray">{t.prizes.mainSponsor}</span>
        </div>

        <div className="grid gap-0 sm:grid-cols-2 border border-primary-green/40">
          {t.prizes.mainCategories.map((cat, i) => (
            <div
              key={i}
              className="border border-primary-green/40 p-6 flex flex-col gap-3"
            >
              <p className="font-[family-name:var(--font-title)] text-base font-black text-primary-green uppercase leading-tight">
                {cat.title}
              </p>
              <p className="text-sm text-primary-cream/80 leading-relaxed font-medium">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRIZE POOL ── */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-black bg-primary-green px-2 py-1">
            {t.prizes.poolLabel}
          </span>
        </div>

        {/* 1st place — full width */}
        <div className="border border-primary-green/40 p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">{places[0].emoji}</span>
            <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-green">
              {places[0].label}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {places[0].prizes.map((p, i) => (
              <div key={i} className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-title)] text-2xl font-black text-primary-green">
                  {p.amount}
                </span>
                {p.sponsor && (
                  <span className="text-xs text-primary-cream/40 uppercase tracking-wide">
                    {p.sponsor}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2nd and 3rd — side by side */}
        <div className="grid sm:grid-cols-2 border-x border-b border-primary-green/40">
          {places.slice(1).map((place, i) => (
            <div
              key={i}
              className="border-r border-primary-green/40 last:border-r-0 p-6 flex flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{place.emoji}</span>
                <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-cream/60">
                  {place.label}
                </span>
              </div>
              {place.prizes.map((p, j) => (
                <div key={j} className="flex items-baseline gap-2">
                  <span className="font-[family-name:var(--font-title)] text-xl font-black text-primary-green">
                    {p.amount}
                  </span>
                  {p.sponsor && (
                    <span className="text-xs text-primary-cream/40 uppercase tracking-wide">
                      {p.sponsor}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── SPECIAL AWARD ── */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-black bg-primary-pink px-2 py-1">
            {t.prizes.specialLabel}
          </span>
          <span className="data-label text-neutral-gray">{t.prizes.specialNote}</span>
        </div>

        <div className="border border-white/15 p-6 flex flex-col gap-2">
          <span className="data-label text-neutral-gray">{specialAward.sponsor}</span>
          <p className="font-[family-name:var(--font-title)] text-base font-black text-primary-cream uppercase leading-tight">
            {specialAward.title}
          </p>
          <p className="font-[family-name:var(--font-title)] text-xl font-black text-primary-pink mt-1">
            {specialAward.prize}
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-primary-pink/70">{specialAward.value}</p>
          <p className="text-xs font-medium text-neutral-gray mt-1 border-t border-white/10 pt-2">
            {specialAward.requirement}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
