"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";
import Image from "next/image";

const sponsors = [
  {
    name: "Featherless AI",
    logo: "/sponsors/featherless-full-dark.svg",
    width: 240,
    height: 60,
  },
];

export function Sponsors() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="cream" bordered id="sponsors">
      <div className="text-center mb-12">
        <span className="data-label mb-4 block text-neutral-gray uppercase">
          {t.sponsors.label}
        </span>
        <h2 className="font-[family-name:var(--font-title)] text-3xl md:text-4xl font-black uppercase tracking-tight">
          {t.sponsors.headline}
          <span className="text-primary-pink"> {t.sponsors.headlineAccent}</span>
        </h2>
      </div>

      <div className="flex w-full flex-wrap items-center justify-center gap-12 md:gap-16 lg:gap-20">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.name}
            className="brutalist-card bg-white p-8 flex items-center justify-center min-w-[200px]"
          >
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              width={sponsor.width}
              height={sponsor.height}
              className="h-auto w-auto max-w-[200px] md:max-w-[240px]"
            />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
