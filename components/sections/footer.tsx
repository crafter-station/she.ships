"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
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
    <SectionWrapper variant="dark" grid className="!py-0">
      <div className="py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand column */}
          <div>
            <p className="mb-3 text-2xl font-black tracking-tight text-white">
              She<span className="text-hot-pink">Ships</span>
            </p>
            <p className="text-sm leading-relaxed text-warm-gray">
              {t.footer.brandDescription}
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-warm-gray">
                {heading}
              </p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-warm-gray">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <a
            href="https://www.crafterstation.com"
            className="flex items-center gap-2 text-xs text-warm-gray transition-colors hover:text-white"
          >
            <CrafterStationLogo className="size-4" />
            Crafter Station
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
