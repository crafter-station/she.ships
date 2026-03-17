import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";

const CONTACT_EMAIL = "hola@sheships.dev";

const stats = [
  { value: "200+", label: "Builders por edición" },
  { value: "15+", label: "Países representados" },
  { value: "48h", label: "De construcción intensiva" },
  { value: "100%", label: "Mujeres y creadoras" },
];

const pillars = [
  {
    icon: "🎯",
    title: "Audiencia altamente cualificada",
    description:
      "Llegas directo a una comunidad de mujeres builders — desarrolladoras, diseñadoras, product managers y fundadoras — que están construyendo activamente.",
  },
  {
    icon: "🌎",
    title: "Alcance global con raíces en LATAM",
    description:
      "She Ships opera desde Lima, Bogotá y Guatemala con participantes remotas de todo el mundo. Tu marca aparece en todos los formatos: landing, redes, livestream y materiales.",
  },
  {
    icon: "💜",
    title: "Impacto que se recuerda",
    description:
      "Las participantes recuerdan las marcas que las apoyaron cuando estaban construyendo. Ser sponsor de She Ships es posicionarte como aliado real de la diversidad en tech.",
  },
  {
    icon: "🚀",
    title: "Pipeline de talento diverso",
    description:
      "Conoce a las mujeres más motivadas del ecosistema tech latinoamericano antes que nadie. She Ships es el lugar donde las builders que verás en los titulares están aprendiendo hoy.",
  },
];

const whatYouFund = [
  {
    emoji: "🎤",
    title: "Eventos presenciales",
    description:
      "Sedes en Lima, Bogotá y Guatemala con infraestructura, comida y espacio para que las participantes construyan sin distracciones.",
  },
  {
    emoji: "🧠",
    title: "Mentoría especializada",
    description:
      "Mentoras de producto, diseño, ingeniería e IA que guían a las builders durante el hackathon y más allá.",
  },
  {
    emoji: "🛠️",
    title: "Herramientas y créditos",
    description:
      "Acceso a herramientas reales para que las participantes puedan lanzar sin barreras económicas — desde APIs hasta créditos en la nube.",
  },
  {
    emoji: "📣",
    title: "Amplificación de proyectos",
    description:
      "Cada proyecto que se lanza en She Ships se amplifica en redes. Más visibilidad = más motivación para seguir construyendo.",
  },
];

const tiers = [
  {
    icon: "💎",
    name: "Platinum",
    color: "bg-primary-green",
    tag: "Máxima visibilidad",
    benefits: [
      'Naming del evento: "She Ships powered by [Tu Marca]"',
      "Logo principal en toda la identidad visual (landing, livestream, merch, redes)",
      "Keynote de apertura (10 min) — tu equipo habla directo a las builders",
      "Categoría de premio con tu nombre y criterio",
      "Acceso a la base de participantes (con consentimiento)",
      "4 posts dedicados en redes sociales",
      "Mención en todas las comunicaciones del evento",
      "Logo en certificados y materiales digitales",
    ],
  },
  {
    icon: "🥇",
    name: "Gold",
    color: "bg-sunny-yellow",
    tag: "Alta visibilidad",
    benefits: [
      "Logo destacado en landing page, livestream y redes sociales",
      "Talk o workshop de 40 min en el agenda oficial",
      "Acceso a la base de participantes (con consentimiento)",
      "2 posts dedicados en redes sociales",
      "Mención en apertura y cierre del evento",
      "Logo en materiales digitales y certificados",
    ],
  },
  {
    icon: "🥈",
    name: "Silver",
    color: "bg-neutral-light",
    tag: "Presencia de marca",
    benefits: [
      "Logo en landing page y materiales del evento",
      "1 post de agradecimiento en redes sociales",
      "Mención durante el evento",
      "Logo en comunicaciones digitales",
    ],
  },
];

const perks = [
  {
    icon: "🎁",
    title: "Perks para participantes",
    description:
      "¿Tienes una herramienta, plataforma o servicio? Ofrece créditos o acceso gratuito a las 200 builders. Es la forma más directa de que conozcan y adopten tu producto.",
  },
  {
    icon: "🤝",
    title: "Community Partner",
    description:
      "¿Eres una comunidad, bootcamp o empresa que quiere co-crear con She Ships? Podemos diseñar una alianza personalizada que funcione para ambos.",
  },
];

export default function SponsorsPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <SectionWrapper variant="pink" className="min-h-[70vh] flex items-center">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-primary-black/60 mb-6 border border-primary-black/20 px-3 py-1">
              Conviértete en Sponsor
            </span>
            <h1 className="font-[family-name:var(--font-title)] text-5xl font-black tracking-tight text-primary-black md:text-7xl lg:text-8xl uppercase mb-6 leading-none">
              Financia a las mujeres que{" "}
              <span className="text-white">construyen.</span>
            </h1>
            <p className="text-xl text-primary-black/80 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              She Ships es el espacio donde mujeres builders diseñan, lanzan y
              aprenden juntas. Apóyanos y lleva tu marca al corazón del
              movimiento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="default" size="lg">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Quiero ser sponsor de She Ships`}
                >
                  Habla con nosotras
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#tiers">Ver paquetes</a>
              </Button>
            </div>
          </div>
        </SectionWrapper>

        {/* Stats */}
        <SectionWrapper
          variant="dark"
          bordered
          className="min-h-0"
          innerClassName="py-12 md:py-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-[family-name:var(--font-title)] text-4xl md:text-5xl font-black text-primary-pink mb-2">
                  {stat.value}
                </p>
                <p className="text-primary-cream/70 text-sm uppercase tracking-wider font-[family-name:var(--font-mono)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Why sponsor */}
        <SectionWrapper variant="cream" bordered>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="data-label mb-4 block text-primary-black/50 uppercase text-xs tracking-widest font-[family-name:var(--font-mono)]">
                ¿Por qué hacer sponsor?
              </span>
              <h2 className="font-[family-name:var(--font-title)] text-4xl md:text-6xl font-black uppercase tracking-tight text-primary-black">
                Donde tu marca encuentra a{" "}
                <span className="text-primary-pink">quienes construyen</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="border-4 border-primary-black p-8 bg-white"
                >
                  <span className="text-4xl mb-4 block">{pillar.icon}</span>
                  <h3 className="font-[family-name:var(--font-title)] text-xl font-black text-primary-black uppercase mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-primary-black/70 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* What you fund */}
        <SectionWrapper variant="dark" bordered>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="data-label mb-4 block text-neutral-gray uppercase text-xs tracking-widest font-[family-name:var(--font-mono)]">
                Tu inversión en acción
              </span>
              <h2 className="font-[family-name:var(--font-title)] text-4xl md:text-6xl font-black uppercase tracking-tight text-primary-cream">
                Tu sponsorship{" "}
                <span className="text-primary-pink">lo hace posible</span>
              </h2>
              <p className="text-primary-cream/60 mt-4 max-w-xl mx-auto">
                Cada dólar que pones en She Ships se traduce en oportunidades
                reales para mujeres builders en LATAM y el mundo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whatYouFund.map((item) => (
                <div
                  key={item.title}
                  className="border-2 border-primary-cream/20 p-8 hover:border-primary-pink transition-colors duration-200"
                >
                  <span className="text-3xl mb-4 block">{item.emoji}</span>
                  <h3 className="font-[family-name:var(--font-title)] text-lg font-black text-primary-cream uppercase mb-2">
                    {item.title}
                  </h3>
                  <p className="text-primary-cream/60 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Tiers */}
        <SectionWrapper variant="cream" bordered id="tiers">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="data-label mb-4 block text-primary-black/50 uppercase text-xs tracking-widest font-[family-name:var(--font-mono)]">
                Paquetes de sponsorship
              </span>
              <h2 className="font-[family-name:var(--font-title)] text-4xl md:text-6xl font-black uppercase tracking-tight text-primary-black">
                Elige tu{" "}
                <span className="text-primary-pink">nivel de impacto</span>
              </h2>
            </div>

            <div className="space-y-6">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`${tier.color} border-4 border-primary-black p-8 md:p-10`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-4xl">{tier.icon}</span>
                    <h3 className="font-[family-name:var(--font-title)] text-4xl font-black text-primary-black uppercase">
                      {tier.name}
                    </h3>
                  </div>
                  <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-primary-black/50 mb-8 block">
                    {tier.tag}
                  </span>

                  <ul className="space-y-3 mb-8">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-2 h-2 bg-primary-black mt-2" />
                        <span className="text-base text-primary-black font-medium">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild variant="default" size="sm">
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=Quiero ser sponsor ${tier.name} de She Ships`}
                    >
                      Quiero ser {tier.name} →
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Other ways to support */}
        <SectionWrapper variant="light" bordered className="min-h-0">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-title)] text-3xl md:text-4xl font-black uppercase tracking-tight text-primary-black">
                Otras formas de{" "}
                <span className="text-primary-pink">sumarte</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {perks.map((perk) => (
                <div
                  key={perk.title}
                  className="bg-white border-4 border-primary-black p-8"
                >
                  <span className="text-3xl mb-4 block">{perk.icon}</span>
                  <h3 className="font-[family-name:var(--font-title)] text-xl font-black text-primary-black uppercase mb-3">
                    {perk.title}
                  </h3>
                  <p className="text-primary-black/70 leading-relaxed text-sm">
                    {perk.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Final CTA */}
        <SectionWrapper
          variant="green"
          className="min-h-0"
          innerClassName="py-20 md:py-28"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-[family-name:var(--font-title)] text-4xl md:text-6xl font-black uppercase tracking-tight text-primary-black mb-6">
              ¿Lista para sumarte?
            </h2>
            <p className="text-primary-black/80 text-xl mb-10 leading-relaxed">
              Escríbenos y diseñamos juntas un paquete que tenga sentido para tu
              marca y tus objetivos. Sin formalidades — solo builders y aliados.
            </p>
            <Button asChild variant="default" size="lg">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Quiero ser sponsor de She Ships`}
              >
                Escríbenos a {CONTACT_EMAIL}
              </a>
            </Button>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
