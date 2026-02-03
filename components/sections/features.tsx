import { SectionWrapper } from "@/components/decorative/section-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Eye, Cpu, Code2, Megaphone, Heart } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Mentoría",
    description:
      "Conecta con builders experimentadas que te guían de la idea al lanzamiento. A tu ritmo, en tus términos.",
  },
  {
    icon: Users,
    title: "Comunidad",
    description:
      "Una red global de mujeres que construyen juntas, comparten logros, resuelven problemas y celebran cada ship.",
  },
  {
    icon: Eye,
    title: "Visibilidad",
    description:
      "Muestra tu trabajo a una audiencia que le importa. Destácate, hazte notar, pon tu producto frente a la gente.",
  },
  {
    icon: Cpu,
    title: "Herramientas AI",
    description:
      "Accede a plataformas AI-native para construir productos reales, desde UI hasta backend, sin escribir código.",
  },
  {
    icon: Code2,
    title: "Sin Código",
    description:
      "No necesitas ser developer. Nuestras herramientas y comunidad te encuentran donde estás. Cero prerrequisitos.",
  },
  {
    icon: Megaphone,
    title: "Ship in Public",
    description:
      "Construye en abierto. Comparte tu progreso, recibe feedback temprano e inspira a otras mientras creas.",
  },
]

export function Features() {
  return (
    <SectionWrapper variant="beige" id="features">
      <div className="text-center mb-16">
        <span className="data-label mb-4 block">Lo Que Obtienes</span>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          Todo lo que necesitas para hacer{" "}
          <span className="text-rose-coral">ship.</span>
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="border-t-4 border-t-rose-coral border-x-warm-beige/50 border-b-warm-beige/50 bg-off-white shadow-sm"
          >
            <CardContent className="pt-6">
              <feature.icon className="mb-4 size-7 text-rose-coral" />
              <h3 className="mb-2 text-lg font-semibold text-charcoal">
                {feature.title}
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  )
}
