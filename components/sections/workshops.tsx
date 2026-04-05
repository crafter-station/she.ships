"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";

export function Workshops() {
  const { t } = useTranslation();
  const w = t.org.workshops;

  const stats = [
    { val: "2h", label: w.durationLabel },
    { val: "v0", label: w.toolLabel },
    { val: "1 app", label: w.takeawayLabel },
  ];

  return (
    <SectionWrapper variant="dark" id="workshops" className="min-h-fit">
      <div className="text-center mb-12">
        <div className="inline-block brutalist-card bg-primary-green px-4 py-2 mb-4">
          <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-black">
            {w.label}
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-title)] text-4xl md:text-5xl font-black uppercase leading-tight text-white">
          {w.headline1} <span className="text-primary-green">{w.headline2}</span>
        </h2>
        <p className="text-white/60 mt-4 max-w-xl mx-auto">
          {w.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-0 border-3 border-white/20">
        {/* Free workshop — upcoming April 11 */}
        <div className="border-3 border-primary-green/40 p-8 flex flex-col gap-5 bg-primary-green/5">
          <div className="flex items-center justify-between">
            <span className="brutalist-card bg-primary-green text-primary-black text-[10px] font-black uppercase tracking-widest px-3 py-1">
              {w.freeBadge}
            </span>
            <span className="text-white/30 text-xs font-mono uppercase tracking-widest">Vol. 01</span>
          </div>

          <h3 className="font-[family-name:var(--font-title)] text-2xl font-black uppercase text-white">
            {w.workshop1Title}
          </h3>

          <p className="text-white/60 leading-relaxed text-sm">
            {w.workshop1Desc}
          </p>

          <div className="grid grid-cols-3 gap-3 mt-2">
            {stats.map((s) => (
              <div key={s.label} className="border border-white/10 p-3 text-center">
                <div className="font-[family-name:var(--font-title)] text-xl font-black text-primary-green">{s.val}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <Button asChild variant="green" className="mt-auto">
            <a href="https://luma.com/9vdfez99" target="_blank" rel="noopener noreferrer">
              {w.registerCta}
            </a>
          </Button>
        </div>

        {/* Paid workshop coming */}
        <div className="border-3 border-primary-pink/40 p-8 flex flex-col gap-5 bg-primary-pink/5">
          <div className="flex items-center justify-between">
            <span className="brutalist-card bg-primary-pink text-primary-black text-[10px] font-black uppercase tracking-widest px-3 py-1">
              {w.paidBadge}
            </span>
            <span className="text-white/30 text-xs font-mono uppercase tracking-widest">Vol. 02</span>
          </div>

          <h3 className="font-[family-name:var(--font-title)] text-2xl font-black uppercase text-white">
            {w.workshop2Title} <span className="text-primary-pink">{w.workshop2Accent}</span>
          </h3>

          <p className="text-white/60 leading-relaxed text-sm">
            {w.workshop2Desc}
          </p>

          {/* Waitlist form */}
          <form
            className="flex gap-0 mt-auto"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const email = (form.elements.namedItem("email") as HTMLInputElement).value;
              window.open(`mailto:she.ships.community@gmail.com?subject=Waitlist Workshop Vol.02&body=Email: ${email}`, "_blank");
            }}
          >
            <input
              name="email"
              type="email"
              required
              placeholder="tu@email.com"
              className="flex-1 bg-white/5 border-2 border-primary-pink/40 text-white placeholder:text-white/30 px-4 py-3 text-sm font-mono outline-none focus:border-primary-pink transition-colors"
            />
            <button
              type="submit"
              className="bg-primary-pink text-primary-black font-black text-xs uppercase tracking-widest px-5 py-3 hover:bg-primary-cream transition-colors"
            >
              {w.waitlistCta}
            </button>
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
}
