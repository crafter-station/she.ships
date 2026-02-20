"use client";

import { useTranslation } from "@/lib/i18n/context";

export function LanguageSwitcher() {
  const { locale, toggleLocale } = useTranslation();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="font-mono text-xs font-bold uppercase tracking-widest text-primary-black hover:text-primary-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-black focus-visible:ring-offset-2 transition-colors px-2 py-1.5 rounded-none"
      aria-label={locale === "en" ? "Cambiar a español" : "Switch to English"}
    >
      {locale === "en" ? "ES" : "EN"}
    </button>
  );
}
