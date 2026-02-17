"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";

export function Agenda() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="purple" bordered id="agenda">
      <div className="mb-16">
        <h2 className="font-[family-name:var(--font-title)] text-5xl font-black tracking-tight text-white md:text-6xl lg:text-7xl uppercase">
          {t.agenda.headline}{" "}
          <span className="text-secondary-light-pink">
            {t.agenda.headlineAccent}
          </span>
        </h2>
      </div>

      <div className="space-y-0">
        {t.agenda.slots.map((slot, i) => (
          <div
            key={i}
            className="grid grid-cols-[120px_1fr] gap-6 border-t-3 border-white/20 py-8 md:grid-cols-[160px_1fr] md:gap-10"
          >
            <div className="brutalist-card bg-white px-4 py-3 self-start">
              <p className="font-[family-name:var(--font-title)] text-lg font-black text-primary-black text-center">
                {slot.time}
              </p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-title)] text-2xl font-black text-white md:text-3xl uppercase mb-2">
                {slot.title}
              </h3>
              <p className="text-white/80 text-lg font-medium">
                {slot.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
