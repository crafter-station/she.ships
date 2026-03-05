"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";
import { track } from "@vercel/analytics";
import Image from "next/image";

const sponsors = [
  {
    name: "Sezzle",
    logo: "/sponsors/Sezzle.svg",
    url: "https://sezzle.com",
    width: 798,
    height: 200,
    className: "h-auto w-auto max-w-[220px] md:max-w-[300px]",
  },
  {
    name: "Featherless AI",
    logo: "/sponsors/featherless-full-dark.svg",
    url: "https://featherless.ai/",
    width: 240,
    height: 60,
  },
  {
    name: "ElevenLabs",
    logo: "/sponsors/elevenlabs-logo-white.svg",
    url: "https://elevenlabs.io/",
    width: 200,
    height: 60,
  },
  {
    name: "v0",
    logo: "/sponsors/v0-logo-dark.png",
    url: "https://v0.app/",
    width: 160,
    height: 76,
    className: "max-w-[60px] md:max-w-[70px]",
  },
  {
    name: "IEEE",
    logo: "/sponsors/ieee_logo_modular (1).png",
    url: "https://www.ieee.org/",
    width: 340,
    height: 100,
    className: "h-auto w-auto max-w-[360px] md:max-w-[440px]",
  },
  {
    name: "Topicalia",
    logo: "/sponsors/topicalia_white.png",
    url: "https://www.tropicalia.dev/",
    width: 240,
    height: 60,
  },
  {
    name: "PDS",
    logo: "/sponsors/LOGO PDS horizantal.png",
    url: "https://www.purasduras.com/",
    width: 240,
    height: 60,
  },
  {
    name: "Pull Request",
    logo: "/sponsors/PULL_REQUEST_LOGO_2024_-_1-removebg-preview.png",
    url: "https://www.linkedin.com/in/ignacior97/?locale=en",
    width: 240,
    height: 240,
    className: "h-auto w-auto max-w-[80px] md:max-w-[100px]",
  },
  {
    name: "Ignacio Rueda",
    logo: "/sponsors/Ignacio Rueda.png",
    url: "https://www.linkedin.com/in/ignacior97/?locale=en",
    width: 120,
    height: 120,
    className: "h-auto w-auto max-w-[100px] md:max-w-[120px]",
  },
  {
    name: "Kebo",
    logo: "/sponsors/Kebo-Brand-WhitePurple.svg",
    url: "https://kebo.app",
    width: 240,
    height: 60,
    className: "h-auto w-auto max-w-[140px] md:max-w-[170px]",
  },
  {
    name: "Moraleja",
    logo: "/sponsors/moraleja.svg",
    url: "https://moraleja.co",
    width: 240,
    height: 60,
    className: "h-auto w-auto max-w-[140px] md:max-w-[170px]",
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

      <div className="flex w-full flex-col items-center gap-8 md:gap-10">
        {/* Featured sponsor */}
        <a
          href={sponsors[0].url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("sponsor_click", { name: sponsors[0].name })}
          className="transition-opacity hover:opacity-80 inline-flex items-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sponsors[0].logo}
            alt={sponsors[0].name}
            className="h-20 w-auto md:h-28"
          />
        </a>
        {/* Rest of sponsors */}
        <div className="grid w-full grid-cols-5 gap-6 md:gap-8">
          {sponsors.slice(1).map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("sponsor_click", { name: sponsor.name })}
              className="transition-opacity hover:opacity-80 flex items-center justify-center"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={sponsor.width}
                height={sponsor.height}
                className={sponsor.className ?? "h-auto w-auto max-w-[160px] md:max-w-[220px]"}
              />
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
