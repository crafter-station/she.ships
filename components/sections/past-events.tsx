"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";

const sponsors = ["v0", "ElevenLabs", "Featherless AI", "Sezzle"];

export function PastEvents() {
  const { t } = useTranslation();
  const pe = t.org.pastEvents;

  const stats = [
    { val: "200", label: pe.stat1Label },
    { val: "56", label: pe.stat2Label },
    { val: "72hs", label: pe.stat3Label },
    { val: "Global", label: pe.stat4Label },
  ];

  return (
    <SectionWrapper variant="cream" id="events" className="min-h-fit" bordered>
      <div className="mb-12">
        <div className="inline-block brutalist-card bg-primary-pink px-4 py-2 mb-4">
          <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-black">
            {pe.label}
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-title)] text-4xl md:text-5xl font-black uppercase leading-tight text-primary-black">
          {pe.headline1} <span className="text-primary-pink">{pe.headline2}</span>
        </h2>
      </div>

      <div className="flex flex-col gap-0">
        <div className="brutalist-card bg-white overflow-hidden">
          {/* Header */}
          <div className="bg-primary-black px-8 py-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-primary-green text-xs font-black uppercase tracking-widest">
                {pe.eventDate}
              </span>
              <h3 className="font-[family-name:var(--font-title)] text-2xl md:text-3xl font-black uppercase text-white mt-1">
                {pe.eventName}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {pe.tags.map((tag) => (
                <span key={tag} className="border border-white/20 text-white/60 text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-b-3 border-primary-black">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`p-6 text-center border-primary-black ${i < stats.length - 1 ? "border-r-3" : ""}`}
              >
                <div className="font-[family-name:var(--font-title)] text-4xl font-black text-primary-pink">
                  {s.val}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-primary-black/50 mt-1 font-bold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Theme + sponsors */}
          <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary-black/40 mb-1">{pe.themeLabel}</p>
              <p className="font-[family-name:var(--font-title)] text-lg font-black uppercase text-primary-black">
                {pe.eventTheme}
              </p>
              <div className="mt-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary-black/40 mb-2">{pe.sponsorsLabel}</p>
                <div className="flex flex-wrap gap-2">
                  {sponsors.map((s) => (
                    <span key={s} className="bg-primary-black/5 border border-primary-black/10 text-primary-black text-xs font-bold uppercase tracking-wide px-3 py-1">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <Button asChild variant="pink">
              <a href="/hackathons/2026">{pe.viewEvent}</a>
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
