"use client";

import { useTranslation } from "@/lib/i18n/context";

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "es" : "en")}
      className="font-mono text-xs uppercase tracking-widest text-warm-gray transition-colors hover:text-white"
      aria-label={locale === "en" ? "Cambiar a español" : "Switch to English"}
    >
      {locale === "en" ? "ES" : "EN"}
    </button>
  );
}
