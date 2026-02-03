import { SectionWrapper } from "@/components/decorative/section-wrapper"
import { Globe } from "@/components/ui/globe"

export function GlobalEvent() {
  return (
    <SectionWrapper variant="dark" grid>
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* Text */}
        <div>
          <span className="data-label mb-4 block text-warm-gray">
            8 de Marzo · Evento Global Online
          </span>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Desde cualquier lugar.{" "}
            <span className="text-rose-coral">Para todas.</span>
          </h2>
          <p className="text-lg leading-relaxed text-warm-gray">
            She Ships es un evento 100% online el 8 de marzo, Día Internacional
            de la Mujer. No importa dónde estés, si tienes una idea y ganas de
            construir, este es tu espacio. Builders de toda Latinoamérica y el
            mundo, conectadas para hacer ship juntas.
          </p>
        </div>

        {/* Globe */}
        <div className="relative mx-auto h-[350px] w-full max-w-[350px] md:h-[400px] md:max-w-[400px]">
          <Globe className="top-0" />
        </div>
      </div>
    </SectionWrapper>
  )
}
