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
    <nav className="fixed top-0 z-50 w-full border-b border-charcoal/10 bg-off-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-[family-name:var(--font-title)] text-2xl font-black tracking-tight text-charcoal"
        >
          SheShips
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal/70 transition-colors hover:text-charcoal"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <GithubBadge />
          <LanguageSwitcher />
          <Button
            asChild
            className="bg-charcoal text-white hover:bg-charcoal/85"
            size="sm"
          >
            <a href="#countdown">{t.nav.join}</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
