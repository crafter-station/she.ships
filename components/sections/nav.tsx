"use client";

import { Button } from "@/components/ui/button";
import { GithubBadge } from "@/components/shared/github-badge";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { useTranslation } from "@/lib/i18n/context";

export function Nav() {
  const { t } = useTranslation();

  const links = [
    { label: t.nav.event, href: "#event-info" },
    { label: t.nav.agenda, href: "#agenda" },
    { label: t.nav.categories, href: "#categories" },
    { label: t.nav.faq, href: "#faq" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b-4 border-primary-black bg-white shadow-[0_4px_0_0_#1A1A1A]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-[family-name:var(--font-title)] text-3xl font-black tracking-tight text-primary-black hover:text-primary-pink transition-colors"
        >
          SheShips
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-bold text-sm uppercase tracking-wide text-primary-black hover:text-primary-pink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <GithubBadge />
          <LanguageSwitcher />
          <Button asChild variant="pink" size="sm">
            <a href="#countdown">{t.nav.join}</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
