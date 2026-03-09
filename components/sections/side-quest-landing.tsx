"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";

const HOW_ICONS = [
  // video
  <svg key="video" className="size-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="0" /></svg>,
  // link
  <svg key="link" className="size-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
  // tag
  <svg key="tag1" className="size-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>,
  // tag
  <svg key="tag2" className="size-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>,
  // hashtag
  <svg key="hash" className="size-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" /></svg>,
];

export function SideQuestLanding() {
  const { t } = useTranslation();

  return (
    <>
      {/* ── HERO ── */}
      <SectionWrapper variant="dark" grid className="min-h-[70vh] flex items-center">
        <div className="text-center max-w-4xl mx-auto">
          <span className="data-label text-primary-pink mb-6 block">
            {t.apply.heroTag}
          </span>
          <h1 className="font-[family-name:var(--font-title)] text-5xl font-black tracking-tight text-primary-cream md:text-6xl lg:text-8xl uppercase mb-6">
            {t.apply.heroHeadline}{" "}
            <span className="text-primary-pink">{t.apply.heroHeadlineAccent}</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-cream/80 max-w-2xl mx-auto font-medium">
            {t.apply.heroDescription}
          </p>
        </div>
      </SectionWrapper>

      {/* ── SECTION 1: THE CHALLENGE ── */}
      <SectionWrapper variant="cream" bordered className="min-h-fit">
        <div className="max-w-3xl mx-auto">
          <span className="data-label text-primary-pink mb-4 block">
            {t.apply.challengeLabel}
          </span>
          <h2 className="font-[family-name:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-black uppercase text-primary-black mb-6">
            {t.apply.challengeHeadline}{" "}
            <span className="text-primary-pink">{t.apply.challengeHeadlineAccent}</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-gray leading-relaxed font-medium">
            {t.apply.challengeText}
          </p>
        </div>
      </SectionWrapper>

      {/* ── SECTION 2: HOW TO PARTICIPATE ── */}
      <SectionWrapper variant="dark" className="min-h-fit">
        <div className="max-w-3xl mx-auto">
          <span className="data-label text-neutral-gray mb-4 block">
            {t.apply.howLabel}
          </span>
          <h2 className="font-[family-name:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-black uppercase text-primary-cream mb-4">
            {t.apply.howHeadline}{" "}
            <span className="text-primary-green">{t.apply.howHeadlineAccent}</span>
          </h2>
          <p className="text-lg text-primary-cream/70 mb-8 font-medium">
            {t.apply.howIntro}
          </p>

          <div className="space-y-0 border border-primary-green/30">
            {t.apply.howItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 border-b border-primary-green/30 last:border-b-0"
              >
                <span className="text-primary-green mt-0.5">
                  {HOW_ICONS[i]}
                </span>
                <p className="text-base text-primary-cream/90 font-medium leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── SECTION 3: PRIZES ── */}
      <SectionWrapper variant="cream" bordered className="min-h-fit">
        <div className="max-w-3xl mx-auto">
          <span className="data-label text-primary-pink mb-4 block">
            {t.apply.prizesLabel}
          </span>
          <h2 className="font-[family-name:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-black uppercase text-primary-black mb-2">
            {t.apply.prizesHeadline}{" "}
            <span className="text-primary-pink">{t.apply.prizesHeadlineAccent}</span>
          </h2>
          <p className="text-lg text-neutral-gray mb-8 font-medium">
            {t.apply.prizesDescription}
          </p>

          <div className="space-y-4">
            {/* Main prizes */}
            {t.apply.prizesItems.map((prize, i) => (
              <div key={i} className="brutalist-card bg-white p-6 flex items-baseline gap-4">
                <span className="font-[family-name:var(--font-title)] text-3xl md:text-4xl font-black text-primary-pink">
                  {prize.amount}
                </span>
                <span className="text-base text-neutral-gray font-medium">
                  {prize.detail}
                </span>
              </div>
            ))}

            {/* Bonus */}
            <div className="brutalist-card bg-white p-6">
              <div className="flex items-baseline gap-4">
                <span className="font-[family-name:var(--font-title)] text-2xl md:text-3xl font-black text-primary-green">
                  {t.apply.prizesBonus}
                </span>
                <span className="text-base text-neutral-gray font-medium">
                  {t.apply.prizesBonusDetail}
                </span>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── SECTION 4: DATES + CTA ── */}
      <SectionWrapper variant="dark" grid className="min-h-fit">
        <div className="max-w-3xl mx-auto">
          <span className="data-label text-neutral-gray mb-4 block">
            {t.apply.datesLabel}
          </span>
          <h2 className="font-[family-name:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-black uppercase text-primary-cream mb-10">
            {t.apply.datesHeadline}{" "}
            <span className="text-primary-pink">{t.apply.datesHeadlineAccent}</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-0 border border-primary-pink/30 mb-12">
            {/* Registration deadline */}
            <div className="p-6 border-b sm:border-b-0 sm:border-r border-primary-pink/30">
              <span className="data-label text-neutral-gray block mb-2">
                {t.apply.datesRegistration}
              </span>
              <p className="font-[family-name:var(--font-title)] text-2xl md:text-3xl font-black text-primary-pink uppercase">
                {t.apply.datesRegistrationDate}
              </p>
            </div>

            {/* Winners */}
            <div className="p-6">
              <span className="data-label text-neutral-gray block mb-2">
                {t.apply.datesWinners}
              </span>
              <p className="font-[family-name:var(--font-title)] text-2xl md:text-3xl font-black text-primary-green uppercase">
                {t.apply.datesWinnersDate}
              </p>
            </div>
          </div>

        </div>
      </SectionWrapper>
    </>
  );
}
