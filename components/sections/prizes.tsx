"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";

export function Prizes() {
  const { t } = useTranslation();

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

      {/* ── MAIN CATEGORIES (Sezzle / Platinum) ── */}
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
              <p className="font-[family-name:var(--font-title)] text-base font-black text-primary-cream uppercase leading-tight">
                {cat.title}
              </p>
              <p className="font-[family-name:var(--font-title)] text-3xl font-black text-primary-green">
                {cat.prize}
              </p>
              <p className="text-sm text-primary-cream/60 leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── TECH AWARDS ── */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-black bg-primary-pink px-2 py-1">
            {t.prizes.techLabel}
          </span>
          <span className="data-label text-neutral-gray">{t.prizes.techNote}</span>
        </div>

        <div className="grid gap-0 sm:grid-cols-3 border border-white/15">
          {t.prizes.techAwards.map((award, i) => (
            <div
              key={i}
              className="border border-white/15 p-6 flex flex-col gap-2"
            >
              <span className="data-label text-neutral-gray">{award.sponsor}</span>
              <p className="font-[family-name:var(--font-title)] text-sm font-bold text-primary-cream uppercase leading-tight">
                {award.title}
              </p>
              <p className="font-[family-name:var(--font-title)] text-xl font-black text-primary-pink mt-1">
                {award.prize}
              </p>
              <p className="text-xs text-primary-cream/50">{award.value}</p>
              {award.requirement && (
                <p className="text-xs text-neutral-gray mt-1 border-t border-white/10 pt-2">
                  {award.requirement}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
