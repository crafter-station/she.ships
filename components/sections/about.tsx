import { SectionWrapper } from "@/components/decorative/section-wrapper"

export function About() {
  return (
    <SectionWrapper variant="beige" id="about">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
        {/* Mission text */}
        <div>
          <span className="data-label mb-4 block">Sobre el Movimiento</span>
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Creemos que toda mujer tiene un producto{" "}
            <span className="text-rose-coral">listo para ship.</span>
          </h2>
          <p className="text-lg leading-relaxed text-charcoal/80">
            She Ships es una comunidad global que le da a las mujeres las
            herramientas, la mentoría y el escenario para ir de la idea al
            producto lanzado. Sin gatekeeping. Sin prerrequisitos. Solo builders
            construyendo.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-charcoal/80">
            Ya seas fundadora por primera vez, diseñadora que programa, o
            alguien que nunca ha tocado una terminal, este es tu lugar.
          </p>
        </div>

        {/* Pull quote */}
        <div className="border-l-4 border-rose-coral pl-8">
          <blockquote className="font-script text-2xl leading-relaxed text-charcoal/90 md:text-3xl">
            &ldquo;El futuro no solo lo construyen mujeres. Las mujeres lo hacen ship.&rdquo;
          </blockquote>
          <p className="mt-4 font-mono text-sm uppercase tracking-widest text-warm-gray">
            Manifiesto She Ships
          </p>
        </div>
      </div>
    </SectionWrapper>
  )
}
