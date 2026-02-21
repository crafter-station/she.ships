"use client";

import { CrafterStationLogo } from "@/components/logos/crafter-station";
import { useTranslation } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    [t.footer.event]: [
      { label: t.footer.eventLinks.agenda, href: "#agenda" },
      { label: t.footer.eventLinks.categories, href: "#categories" },
      { label: t.footer.eventLinks.faq, href: "#faq" },
    ],
    [t.footer.resources]: [
      { label: t.footer.resourceLinks.blog, href: "#" },
      { label: t.footer.resourceLinks.mentors, href: "#" },
      { label: t.footer.resourceLinks.showcase, href: "#" },
    ],
    [t.footer.social]: [
      { label: t.footer.socialLinks.twitter, href: "#" },
      { label: t.footer.socialLinks.instagram, href: "#" },
      { label: t.footer.socialLinks.linkedin, href: "#" },
      { label: t.footer.socialLinks.discord, href: "#" },
    ],
  };

  return (
    <footer className="relative w-full border-t-4 border-primary-black bg-primary-black text-white">
      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12 md:py-16 lg:py-20">
        {/* Mobile: brand arriba centrado, luego bloques de enlaces en 2 columnas */}
        <div className="grid gap-10 md:grid-cols-[minmax(0,auto)_1fr_1fr_1fr] md:gap-10 md:items-start">
          {/* Brand: en mobile centrado y con borde abajo; en desktop columna con borde izquierdo */}
          <div className="text-center md:text-left border-b-2 border-white/10 pb-8 md:border-b-0 md:border-l-4 md:border-primary-pink md:pl-6 md:pr-4 md:pb-0 md:max-w-[280px]">
            <p className="mb-3 font-[family-name:var(--font-title)] text-2xl font-black tracking-tight text-white md:text-3xl">
              She<span className="text-primary-pink">Ships</span>
            </p>
            <p className="text-sm leading-relaxed text-white/80 max-w-sm mx-auto md:mx-0">
              {t.footer.brandDescription}
            </p>
          </div>

          {/* Link columns: en mobile grid 2 cols centrado; en desktop columnas normales */}
          <div className="grid grid-cols-2 gap-8 sm:gap-10 justify-items-center md:justify-items-stretch md:contents">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div
                key={heading}
                className="border-l-0 pl-0 text-center md:text-left md:border-l-4 md:border-primary-black md:pl-8"
              >
                <p className="mb-3 md:mb-4 font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-pink">
                  {heading}
                </p>
                <ul className="space-y-2 md:space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm font-bold uppercase tracking-wide text-white/90 transition-colors hover:text-primary-pink py-1 -my-1 block touch-manipulation"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar - mismo negro que el footer, sin romper con el header */}
      <div className="border-t-2 border-white/10 bg-primary-black px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="text-xs font-bold uppercase tracking-wide text-white/60">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <a
            href="https://www.crafterstation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/70 transition-colors hover:text-primary-pink"
          >
            <CrafterStationLogo className="size-4" />
            Crafter Station
          </a>
        </div>
      </div>
    </footer>
  );
}
