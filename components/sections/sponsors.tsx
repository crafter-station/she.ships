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
  {
    name: "ElevenLabs",
    logo: "/sponsors/elevenlabs-logo-white.svg",
    width: 200,
    height: 60,
  },
  {
    name: "v0",
    logo: "/sponsors/v0-logo-dark.png",
    width: 160,
    height: 76,
    className: "max-w-[60px] md:max-w-[70px]",
  },
  {
    name: "IEEE",
    logo: "/sponsors/ieee.png",
    width: 340,
    height: 100,
    className: "h-auto w-auto max-w-[280px] md:max-w-[340px]",
  },
];

export function Sponsors() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="dark" bordered id="sponsors">
      <div className="text-center mb-12">
        <span className="data-label mb-4 block text-neutral-gray uppercase">
          {t.sponsors.label}
        </span>
        <h2 className="font-[family-name:var(--font-title)] text-3xl md:text-4xl font-black uppercase tracking-tight text-primary-cream">
          {t.sponsors.headline}
          <span className="text-primary-pink"> {t.sponsors.headlineAccent}</span>
        </h2>
      </div>

      <div className="flex w-full flex-wrap items-center justify-center gap-16 md:gap-20 lg:gap-24">
        {sponsors.map((sponsor) => (
          <Image
            key={sponsor.name}
            src={sponsor.logo}
            alt={sponsor.name}
            width={sponsor.width}
            height={sponsor.height}
            className={sponsor.className ?? "h-auto w-auto max-w-[200px] md:max-w-[240px]"}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
