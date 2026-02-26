"use client";

import { useTranslation } from "@/lib/i18n/context";
import { WhatsappIcon } from "@/components/logos/whatsapp";

export function WhatsappBadge({ light = false }: { light?: boolean }) {
  const { t } = useTranslation();

  return (
    <a
      href="/wpp"
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-1.5 px-2 py-1.5 transition-colors duration-300 ${
        light
          ? "text-white/80 hover:text-white"
          : "text-primary-black/70 hover:text-primary-black"
      }`}
      aria-label={t.whatsappCommunity.navAriaLabel}
    >
      <WhatsappIcon width={18} height={18} className="shrink-0" aria-hidden="true" />
      <span className="sr-only">{t.whatsappCommunity.navAriaLabel}</span>
    </a>
  );
}
