"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Waitlist } from "@clerk/nextjs";
import { useTranslation } from "@/lib/i18n/context";

export function CTA() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="beige" id="cta">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 font-script text-xl text-rose-coral md:text-2xl">
          {t.cta.date}
        </p>
        <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {t.cta.headline}{" "}
          <span className="text-rose-coral">{t.cta.headlineAccent}</span>
        </h2>
        <p className="mb-10 text-lg text-charcoal/70">{t.cta.description}</p>

        <div className="mx-auto max-w-md">
          <Waitlist />
        </div>

        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-warm-gray">
          {t.cta.footer}
        </p>
      </div>
    </SectionWrapper>
  );
}
