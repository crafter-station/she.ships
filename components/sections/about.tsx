"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { CrafterStationLogo } from "@/components/logos/crafter-station";
import { useTranslation } from "@/lib/i18n/context";

export function About() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="beige" id="about">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
        {/* Mission text */}
        <div>
          <span className="data-label mb-4 block">{t.about.label}</span>
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t.about.headline}{" "}
            <span className="text-rose-coral">{t.about.headlineAccent}</span>
          </h2>
          <p className="text-lg leading-relaxed text-charcoal/80">
            She Ships{" "}
            <a
              href="https://www.crafterstation.com"
              className="inline-flex items-center gap-1 font-medium text-charcoal hover:text-rose-coral transition-colors"
            >
              <CrafterStationLogo className="size-4 inline" />
              Crafter Station
            </a>{" "}
            {t.about.description}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-charcoal/80">
            {t.about.descriptionAlt}
          </p>
        </div>

        {/* Pull quote */}
        <div className="border-l-4 border-rose-coral pl-8">
          <blockquote className="font-script text-2xl leading-relaxed text-charcoal/90 md:text-3xl">
            {t.about.quote}
          </blockquote>
          <p className="mt-4 font-mono text-sm uppercase tracking-widest text-warm-gray">
            {t.about.quoteAttribution}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
