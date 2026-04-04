"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";
import Image from "next/image";

const PREVIOUS_SPONSORS = [
  { name: "Sezzle", logo: "/sponsors/Sezzle.svg", className: "h-8 w-auto" },
  { name: "ElevenLabs", logo: "/sponsors/elevenlabs-logo-white.svg", className: "h-8 w-auto" },
  { name: "v0", logo: "/sponsors/v0-logo-dark.png", className: "h-8 w-auto" },
  { name: "Featherless AI", logo: "/sponsors/featherless-full-dark.svg", className: "h-8 w-auto" },
  { name: "Make", logo: "/sponsors/make.png", className: "h-14 w-auto" },
];

export function LandingSponsors() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="dark" id="sponsors" className="min-h-fit">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block brutalist-card bg-primary-green px-4 py-2 mb-6">
          <span className="font-[family-name:var(--font-title)] text-sm font-black text-primary-black uppercase tracking-wide">
            {t.landing.sponsorsLabel}
          </span>
        </div>

        <h2 className="font-[family-name:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-black text-primary-cream leading-tight mb-4">
          {t.landing.sponsorsHeadline}{" "}
          <span className="text-primary-pink">{t.landing.sponsorsHeadlineAccent}</span>
        </h2>

        <p className="text-neutral-gray text-lg max-w-xl mx-auto">
          {t.landing.sponsorsDescription}
        </p>
      </div>

      {/* Previous Sponsors */}
      <div className="mb-16">
        <p className="text-center font-[family-name:var(--font-title)] text-sm font-bold text-neutral-gray uppercase tracking-wider mb-6">
          {t.landing.previousSponsors}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
          {PREVIOUS_SPONSORS.map((sponsor) => (
            <div key={sponsor.name} className="relative">
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={120}
                height={56}
                className={`${sponsor.className} object-contain grayscale hover:grayscale-0 transition-all`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Button asChild variant="pink" size="lg">
          <a href="/sponsor">{t.landing.becomeSponsor}</a>
        </Button>
      </div>
    </SectionWrapper>
  );
}
