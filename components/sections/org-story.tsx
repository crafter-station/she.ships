"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";

export function OrgStory() {
  const { t } = useTranslation();
  const s = t.org.story;

  const statBlocks = [
    { num: "2026", label: s.stat1Label, color: "bg-primary-pink" },
    { num: "300+", label: s.stat2Label, color: "bg-primary-black" },
    { num: "LATAM", label: s.stat3Label, color: "bg-primary-green" },
  ];

  return (
    <SectionWrapper variant="dark" id="story" className="min-h-fit">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Left — text */}
        <div>
          <div className="inline-block brutalist-card bg-primary-pink px-4 py-2 mb-6">
            <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-black">
              {s.label}
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight text-white mb-6">
            {s.headline1}<br />
            <span className="text-primary-pink">{s.headline2}</span>
          </h2>

          <div className="space-y-5 text-white/70 leading-relaxed">
            <p>{s.body1}</p>
            <p>
              {s.body2Start} <span className="text-primary-green font-bold">{s.body2Community}</span> {s.body2End}
            </p>
          </div>

          {/* Quote */}
          <div className="border-l-4 border-primary-pink pl-6 mt-8">
            <p className="font-[family-name:var(--font-title)] text-xl font-black uppercase text-white">
              &ldquo;{s.quote}{" "}
              <span className="text-primary-pink">{s.quoteAccent}&rdquo;</span>
            </p>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mt-3">
              {s.quoteAuthor}
            </p>
          </div>
        </div>

        {/* Right — visual */}
        <div className="brutalist-card bg-primary-cream flex flex-col gap-0 overflow-hidden">
          {statBlocks.map((item, i) => (
            <div
              key={i}
              className={`${item.color} border-b-3 border-primary-black last:border-b-0 px-8 py-6 flex items-center justify-between`}
            >
              <span className={`font-[family-name:var(--font-title)] text-4xl font-black uppercase ${item.color === "bg-primary-black" ? "text-white" : "text-primary-black"}`}>
                {item.num}
              </span>
              <span className={`text-xs font-bold uppercase tracking-widest ${item.color === "bg-primary-black" ? "text-white/60" : "text-primary-black/60"}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
