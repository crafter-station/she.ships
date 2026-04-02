"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";
import { ArrowRight, Calendar } from "lucide-react";

export function LandingUpcomingEvents() {
  const { t } = useTranslation();

  const events = [
    {
      title: t.landing.event1Title,
      date: t.landing.event1Date,
      description: t.landing.event1Desc,
      lumaUrl: "https://luma.com/9vdfez99",
      accent: "primary-pink",
    },
    {
      title: t.landing.event2Title,
      date: t.landing.event2Date,
      description: t.landing.event2Desc,
      lumaUrl: "https://luma.com/811aag0n",
      accent: "primary-green",
    },
  ];

  return (
    <SectionWrapper variant="light" id="upcoming-events" className="min-h-fit">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block brutalist-card bg-primary-pink px-4 py-2 mb-6">
          <span className="font-[family-name:var(--font-title)] text-sm font-black text-primary-black uppercase tracking-wide">
            {t.landing.upcomingLabel}
          </span>
        </div>

        <h2 className="font-[family-name:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-black text-primary-black leading-tight">
          {t.landing.upcomingHeadline}{" "}
          <span className="text-primary-pink">{t.landing.upcomingHeadlineAccent}</span>
        </h2>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {events.map((event, i) => (
          <div
            key={i}
            className="brutalist-card bg-primary-black p-6 relative overflow-hidden group"
          >
            {/* Status badge */}
            <div className={`inline-flex items-center gap-2 bg-${event.accent}/20 border border-${event.accent}/40 px-3 py-1 mb-4`}>
              <span className={`w-2 h-2 bg-${event.accent} rounded-full animate-pulse`} />
              <Calendar size={14} className={`text-${event.accent}`} />
            </div>

            <h3 className="font-[family-name:var(--font-title)] text-xl md:text-2xl font-black text-white mb-2">
              {event.title}
            </h3>

            <p className={`font-[family-name:var(--font-title)] text-base font-bold text-${event.accent} mb-3`}>
              {event.date}
            </p>

            <p className="text-neutral-gray leading-relaxed mb-6">
              {event.description}
            </p>

            <Button asChild variant={i === 0 ? "pink" : "green"} size="default" className="group">
              <a
                href={event.lumaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                {t.landing.registerNow}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
