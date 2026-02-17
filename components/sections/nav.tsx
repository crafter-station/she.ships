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

  const actionButtons = [
    { label: "Be a Sponsor", href: "https://luma.com/ytl522gp" },
    { label: "Be a Community Partner", href: "https://luma.com/ytl522gp" },
    { label: "Be a Judge", href: "https://luma.com/ytl522gp" },
    { label: "Be a Mentor", href: "https://luma.com/ytl522gp" },
  ];

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b-4 border-primary-black bg-white">
        <div className="flex items-center">
          {/* Left side - Logo and Links with container */}
          <div className="flex-1 flex items-center justify-between px-6 py-4 border-r-4 border-primary-black">
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
          </div>

          {/* Right side - Actions (no max-width, extends to edge) */}
          <div className="flex items-center gap-3 px-6 py-4">
            <GithubBadge />
            <LanguageSwitcher />
          </div>

          {/* Join button - Black background extends to edge */}
          <div className="bg-primary-black">
            <Button
              asChild
              variant="pink"
              size="sm"
              className="!shadow-none border-0 bg-primary-black hover:bg-primary-black/90"
            >
              <a
                href="https://luma.com/ytl522gp"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-6 h-[68px]"
              >
                {t.nav.join}
              </a>
            </Button>
          </div>
        </div>

        {/* Action buttons row below header */}
        <div className="border-t-4 border-primary-black bg-primary-cream">
          <div className="mx-auto max-w-7xl px-6 py-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {actionButtons.map((button) => (
                <Button key={button.label} asChild variant="outline" size="sm">
                  <a
                    href={button.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {button.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed nav */}
      <div className="h-[140px]" />
    </>
  );
}
