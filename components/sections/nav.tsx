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
    { id: "sponsor", label: t.nav.ctaSponsor, href: "https://luma.com/ytl522gp" },
    { id: "community", label: t.nav.ctaCommunityPartner, href: "https://luma.com/ytl522gp" },
    { id: "judge", label: t.nav.ctaJudge, href: "https://luma.com/ytl522gp" },
    { id: "mentor", label: t.nav.ctaMentor, href: "https://luma.com/ytl522gp" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 w-full max-w-[100vw] border-b-4 border-primary-black bg-white flex flex-col">
        <div className="flex flex-wrap items-center min-w-0 shrink-0 min-h-[60px] sm:min-h-[68px] py-0">
          {/* Left side - Logo and Links with container */}
          <div className="flex-1 flex items-center justify-between min-w-0 px-4 sm:px-6 h-full min-h-[60px] sm:min-h-[68px] border-r-4 border-primary-black">
            <a
              href="#"
              className="font-[family-name:var(--font-title)] text-xl sm:text-3xl font-black tracking-tight text-primary-black hover:text-primary-pink transition-colors truncate leading-none"
            >
              SheShips
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-bold text-sm uppercase tracking-wide text-primary-black hover:text-primary-pink transition-colors leading-none"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 shrink-0">
            <GithubBadge />
            <LanguageSwitcher />
          </div>

          {/* Join button - Black background extends to edge, centrado con el resto */}
          <div className="bg-primary-black shrink-0 self-stretch flex items-center">
            <Button
              asChild
              variant="pink"
              size="sm"
              className="!shadow-none border-0 bg-primary-black hover:bg-primary-black/90 h-full rounded-none"
            >
              <a
                href="https://luma.com/ytl522gp"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-8 h-[60px] sm:h-[68px] text-xs sm:text-sm flex items-center justify-center"
              >
                {t.nav.join}
              </a>
            </Button>
          </div>
        </div>

        {/* Action buttons row: en mobile scroll horizontal (una sola línea, altura fija); en desktop centrado */}
        <div className="border-t-4 border-primary-black bg-primary-cream shrink-0 -mt-px">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-nowrap items-center justify-start gap-3 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:pb-0 sm:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {actionButtons.map((button) => (
                <Button key={button.id} asChild variant="outline" size="sm" className="shrink-0">
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

      {/* Spacer: en mobile una sola fila de CTAs = altura fija; en desktop idem */}
      <div className="h-[120px] sm:h-[136px] md:h-[131px]" />
    </>
  );
}
