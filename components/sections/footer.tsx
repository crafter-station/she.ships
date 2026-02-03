import { SectionWrapper } from "@/components/decorative/section-wrapper"
import { CrafterStationLogo } from "@/components/logos/crafter-station"

const footerLinks = {
  Comunidad: [
    { label: "Nosotras", href: "#about" },
    { label: "Cómo Funciona", href: "#how-it-works" },
    { label: "Beneficios", href: "#features" },
    { label: "Lista de Espera", href: "#cta" },
  ],
  Recursos: [
    { label: "Blog", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Mentoras", href: "#" },
    { label: "Showcase", href: "#" },
  ],
  Social: [
    { label: "Twitter / X", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Discord", href: "#" },
  ],
}

export function Footer() {
  return (
    <SectionWrapper variant="dark" grid className="!py-0">
      <div className="py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand column */}
          <div>
            <p className="mb-3 text-lg font-bold tracking-tight text-white">
              She<span className="text-rose-coral">Ships</span>
            </p>
            <p className="text-sm leading-relaxed text-warm-gray">
              Una comunidad global de mujeres que convierten ideas en productos reales.
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
            &copy; {new Date().getFullYear()} She Ships. Todos los derechos reservados.
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
  )
}
