"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";
import { WhatsappIcon } from "@/components/logos/whatsapp";

export function LandingCommunity() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="dark" id="community" className="min-h-fit">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <div className="inline-block brutalist-card bg-primary-pink px-4 py-2 mb-6">
          <span className="font-[family-name:var(--font-title)] text-sm font-black text-primary-black uppercase tracking-wide">
            {t.landing.communityLabel}
          </span>
        </div>

        <h2 className="font-[family-name:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
          {t.landing.communityHeadline}{" "}
          <span className="text-primary-pink">{t.landing.communityHeadlineAccent}</span>
        </h2>

        <p className="text-neutral-gray text-lg leading-relaxed mb-8">
          {t.landing.communityDescription}
        </p>

        {/* CTA */}
        <Button asChild variant="green" size="lg" className="gap-3">
          <a
            href="https://chat.whatsapp.com/YOUR_LINK"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsappIcon className="w-5 h-5" />
            {t.landing.joinWhatsApp}
          </a>
        </Button>
      </div>
    </SectionWrapper>
  );
}
