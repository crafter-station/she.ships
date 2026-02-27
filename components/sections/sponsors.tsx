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
    className: "h-auto w-auto max-w-[360px] md:max-w-[440px]",
  },
  {
    name: "IEEE Modular",
    logo: "/sponsors/ieee_logo_modular (1).png",
    width: 340,
    height: 100,
    className: "h-auto w-auto max-w-[360px] md:max-w-[440px]",
  },
  {
    name: "Topicalia",
    logo: "/sponsors/topicalia_white.png",
    width: 240,
    height: 60,
  },
  {
    name: "PDS",
    logo: "/sponsors/LOGO PDS horizantal.png",
    width: 240,
    height: 60,
  },
  {
    name: "Pull Request",
    logo: "/sponsors/PULL_REQUEST_LOGO_2024_-_1-removebg-preview.png",
    width: 240,
    height: 240,
    className: "h-auto w-auto max-w-[80px] md:max-w-[100px]",
  },
  {
    name: "Ignacio Rueda",
    logo: "/sponsors/Ignacio Rueda.png",
    width: 120,
    height: 120,
    className: "h-auto w-auto max-w-[100px] md:max-w-[120px]",
  },
  {
    name: "Kebo",
    logo: "/sponsors/Kebo-Brand-BlackPurple.svg",
    width: 240,
    height: 60,
  },
];

export function Sponsors() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="dark" bordered id="sponsors" className="min-h-0" innerClassName="py-10 md:py-14">
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
