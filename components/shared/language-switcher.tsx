"use client";

import { useTranslation } from "@/lib/i18n/context";

export function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const { locale, toggleLocale } = useTranslation();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={`font-[family-name:var(--font-title)] text-sm font-bold tracking-wide transition-colors duration-300 px-2 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        light
          ? "text-white/80 hover:text-white focus-visible:ring-white"
          : "text-primary-black/70 hover:text-primary-black focus-visible:ring-primary-black"
      }`}
      aria-label={locale === "en" ? "Cambiar a español" : "Switch to English"}
    >
      {locale === "en" ? "ES" : "EN"}
    </button>
  );
}
