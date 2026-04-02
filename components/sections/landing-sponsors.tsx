"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";
import { Wrench, DollarSign, Megaphone } from "lucide-react";
import Image from "next/image";

const PREVIOUS_SPONSORS = [
  { name: "Sezzle", logo: "/sponsors/Sezzle.svg" },
  { name: "ElevenLabs", logo: "/sponsors/elevenlabs-logo-white.svg" },
  { name: "v0", logo: "/sponsors/v0-logo-dark.png" },
  { name: "Featherless AI", logo: "/sponsors/featherless-full-dark.svg" },
  { name: "Make", logo: "/sponsors/make.png" },
];

export function LandingSponsors() {
  const { t } = useTranslation();

  const tiers = [
    {
      icon: Wrench,
      title: t.landing.tierTechTitle,
      description: t.landing.tierTechDesc,
      color: "text-primary-green",
      bgColor: "bg-primary-green/10",
      borderColor: "border-primary-green/30",
    },
    {
      icon: DollarSign,
      title: t.landing.tierGoldTitle,
      description: t.landing.tierGoldDesc,
      color: "text-primary-pink",
      bgColor: "bg-primary-pink/10",
      borderColor: "border-primary-pink/30",
    },
    {
      icon: Megaphone,
      title: t.landing.tierCommunityTitle,
      description: t.landing.tierCommunityDesc,
      color: "text-primary-cream",
      bgColor: "bg-primary-cream/10",
      borderColor: "border-primary-cream/30",
    },
  ];

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
            <div key={sponsor.name} className="h-8 relative">
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={120}
                height={32}
                className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sponsorship Tiers */}
      <div className="mb-12">
        <p className="text-center font-[family-name:var(--font-title)] text-lg font-bold text-primary-cream uppercase tracking-wider mb-8">
          {t.landing.sponsorTiersTitle}
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <div
                key={i}
                className={`brutalist-card bg-primary-black p-6 border-2 ${tier.borderColor}`}
              >
                <div className={`w-12 h-12 flex items-center justify-center ${tier.bgColor} border ${tier.borderColor} mb-4`}>
                  <Icon className={tier.color} size={24} />
                </div>
                <h3 className={`font-[family-name:var(--font-title)] text-lg font-bold ${tier.color} mb-2`}>
                  {tier.title}
                </h3>
                <p className="text-neutral-gray text-sm leading-relaxed">
                  {tier.description}
                </p>
              </div>
            );
          })}
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
