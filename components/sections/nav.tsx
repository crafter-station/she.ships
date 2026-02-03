import { Button } from "@/components/ui/button"
import { GithubBadge } from "@/components/shared/github-badge"

const links = [
  { label: "Nosotras", href: "#about" },
  { label: "Cómo Funciona", href: "#how-it-works" },
  { label: "Beneficios", href: "#features" },
]

export function Nav() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-charcoal/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="#" className="text-lg font-bold tracking-tight text-white">
          She<span className="text-rose-coral">Ships</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-warm-gray transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <GithubBadge />
          <Button
            asChild
            className="bg-rose-coral text-white hover:bg-deep-rose"
            size="sm"
          >
            <a href="#cta">Únete</a>
          </Button>
        </div>
      </div>
    </nav>
  )
}
