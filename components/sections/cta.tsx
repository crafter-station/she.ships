import { SectionWrapper } from "@/components/decorative/section-wrapper"
import { Waitlist } from "@clerk/nextjs"

export function CTA() {
  return (
    <SectionWrapper variant="beige" id="cta">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 font-script text-xl text-rose-coral md:text-2xl">
          8 de marzo, 2026
        </p>
        <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          ¿Lista para hacer <span className="text-rose-coral">ship?</span>
        </h2>
        <p className="mb-10 text-lg text-charcoal/70">
          Regístrate y asegura tu lugar en el evento. Sin spam, solo energía
          para construir.
        </p>

        <div className="mx-auto max-w-md">
          <Waitlist />
        </div>

        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-warm-gray">
          Sé de las primeras en unirte
        </p>
      </div>
    </SectionWrapper>
  )
}
