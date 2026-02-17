"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";

export function Agenda() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="pink" id="agenda">
      <div className="mb-16">
        <span className="data-label mb-4 block text-charcoal/50">
          {t.agenda.label}
        </span>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {t.agenda.headline}{" "}
          <span className="text-white">{t.agenda.headlineAccent}</span>
        </h2>
      </div>

      <div className="space-y-0">
        {t.agenda.slots.map((slot, i) => (
          <div
            key={i}
            className="group grid grid-cols-[100px_1fr] gap-6 border-t border-charcoal/15 py-6 md:grid-cols-[140px_1fr] md:gap-10 md:py-8"
          >
            <p className="font-mono text-sm font-bold text-charcoal/60 md:text-base">
              {slot.time}
            </p>
            <div>
              <h3 className="text-xl font-bold text-charcoal md:text-2xl">
                {slot.title}
              </h3>
              <p className="mt-1 text-charcoal/70">{slot.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
