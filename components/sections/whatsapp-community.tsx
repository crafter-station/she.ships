"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/logos/whatsapp";
import { useTranslation } from "@/lib/i18n/context";

export function WhatsappCommunity() {
  const { t } = useTranslation();

  return (
    <SectionWrapper
      variant="green"
      id="whatsapp-community"
      className="min-h-fit"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="data-label mb-4 block uppercase">
          {t.whatsappCommunity.label}
        </span>

        <h2 className="font-[family-name:var(--font-title)] text-4xl font-black tracking-tight md:text-5xl lg:text-6xl mb-6">
          {t.whatsappCommunity.headline}{" "}
          <span className="text-primary-pink">
            {t.whatsappCommunity.headlineAccent}
          </span>
        </h2>

        <p className="text-lg md:text-xl text-primary-black/80 mb-10 leading-relaxed max-w-2xl mx-auto">
          {t.whatsappCommunity.description}
        </p>

        <Button asChild variant="default" size="lg">
          <a href="/wpp" target="_blank" rel="noopener noreferrer">
            <WhatsappIcon width={20} height={20} aria-hidden="true" />
            {t.whatsappCommunity.cta}
          </a>
        </Button>
      </div>
    </SectionWrapper>
  );
}
