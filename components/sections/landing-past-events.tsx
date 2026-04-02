"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function LandingPastEvents() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="dark" id="past-events" className="min-h-fit">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block brutalist-card bg-primary-cream px-4 py-2 mb-6">
          <span className="font-[family-name:var(--font-title)] text-sm font-black text-primary-black uppercase tracking-wide">
            {t.landing.pastLabel}
          </span>
        </div>

        <h2 className="font-[family-name:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
          {t.landing.pastHeadline}{" "}
          <span className="text-primary-pink">{t.landing.pastHeadlineAccent}</span>
        </h2>
      </div>

      {/* Hackathons Tab */}
      <div className="max-w-2xl mx-auto">
        {/* Tab header */}
        <div className="flex border-b border-white/10 mb-6">
          <button className="px-6 py-3 font-[family-name:var(--font-title)] text-sm font-bold text-primary-pink border-b-2 border-primary-pink uppercase tracking-wider">
            {t.landing.hackathonsTab}
          </button>
        </div>

        {/* Hackathon 2026 Card */}
        <div className="brutalist-card bg-white/5 border border-white/10 p-6 relative overflow-hidden group hover:bg-white/10 transition-colors">
          {/* Past badge */}
          <div className="inline-flex items-center gap-2 bg-neutral-gray/20 border border-neutral-gray/40 px-3 py-1 mb-4">
            <span className="w-2 h-2 bg-neutral-gray rounded-full" />
            <span className="font-[family-name:var(--font-title)] text-xs font-bold text-neutral-gray uppercase tracking-wider">
              Completed
            </span>
          </div>

          <h3 className="font-[family-name:var(--font-title)] text-xl md:text-2xl font-black text-white mb-2">
            {t.landing.hackathon2026Title}
          </h3>

          <p className="font-[family-name:var(--font-title)] text-base font-bold text-primary-pink mb-3">
            {t.landing.hackathon2026Date}
          </p>

          <p className="text-neutral-gray leading-relaxed mb-6">
            {t.landing.hackathon2026Desc}
          </p>

          <Button asChild variant="outline" size="default" className="group">
            <Link href="/hackathons/2026" className="inline-flex items-center gap-2">
              {t.landing.viewEvent}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
