import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Quiénes Somos | She Ships",
  description: "Conoce la historia detrás de She Ships y a Shiara, su fundadora. Software engineer, product designer y builder de comunidades en LATAM.",
};

const projects = [
  {
    name: "She Ships",
    role: "Fundadora",
    description: "Organización para mujeres builders en LATAM. Hackathons, workshops, mentorías y comunidad.",
    stat: "300+ mujeres",
    color: "bg-primary-pink",
  },
  {
    name: "Crafter Station",
    role: "Cofundadora",
    description: "Comunidad de builders en LATAM donde se construye, aprende y conecta en público.",
    stat: "500+ builders",
    color: "bg-primary-green",
  },
  {
    name: "Glitch Girls",
    role: "Cofundadora",
    description: "Indie game dev studio. Juegos creados por mujeres, para todos.",
    stat: "5+ juegos publicados",
    color: "bg-primary-cream",
  },
];

export default function QuienesSomosPage() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip min-w-0">
        {/* Hero */}
        <section className="bg-primary-black pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block brutalist-card bg-primary-pink px-4 py-2 mb-6">
              <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-black">
                Quiénes somos
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-title)] text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none text-white mb-6">
              She Ships es un espacio para{" "}
              <span className="text-primary-pink">mujeres que construyen.</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
              Una organización con base en LATAM que existe porque el problema era real y la solución era necesaria.
            </p>
          </div>
        </section>

        {/* Story */}
        <SectionWrapper variant="cream" className="min-h-fit">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-title)] text-3xl md:text-4xl font-black uppercase text-primary-black mb-8">
              Por qué existe She Ships
            </h2>
            <div className="space-y-6 text-primary-black/70 leading-relaxed text-lg">
              <p>
                En los eventos tech de LATAM, las mujeres eran pocas. Pero no solo pocas: la mayoría de los hombres participaban activamente, hablaban, compartían ideas. Las pocas mujeres presentes casi no tenían participación.
              </p>
              <p>
                She Ships nació de esa observación. Es un espacio donde las mujeres no son la minoría silenciosa, sino las que construyen, presentan y lanzan.
              </p>
              <p>
                El primer gran evento fue una hackathon el 8 de marzo de 2026, el Día Internacional de la Mujer. 200 builders, 56 proyectos lanzados en 72 horas. Todo remoto, todo real.
              </p>
              <p>
                Desde entonces, She Ships creció hasta ser una comunidad de 300+ mujeres con programas de workshops, mentorías y más en camino.
              </p>
            </div>

            {/* Quote */}
            <div className="border-l-4 border-primary-pink pl-6 my-10">
              <p className="font-[family-name:var(--font-title)] text-2xl font-black uppercase text-primary-black">
                "Quería ver más mujeres no solo en el público,{" "}
                <span className="text-primary-pink">sino en el escenario."</span>
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-primary-black/40 mt-3">
                Shiara, fundadora de she.ships
              </p>
            </div>
          </div>
        </SectionWrapper>

        {/* Founder */}
        <SectionWrapper variant="dark" className="min-h-fit">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
              <div className="brutalist-card overflow-hidden aspect-square relative">
                <Image
                  src="/shiara.jpeg"
                  alt="Shiara, fundadora de She Ships"
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div>
                <div className="inline-block brutalist-card bg-primary-green px-4 py-2 mb-4">
                  <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-black">
                    La fundadora
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-title)] text-4xl md:text-5xl font-black uppercase text-white mb-2">
                  Shiara
                </h2>

                {/* Roles */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Software Engineer", "Product Designer", "Tech Builder"].map((role) => (
                    <span key={role} className="border border-white/20 text-white/60 text-xs font-bold uppercase tracking-wide px-3 py-1">
                      {role}
                    </span>
                  ))}
                </div>

                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    Shiara es software engineer, product designer y builder. Ha dedicado su carrera a crear cosas: productos, comunidades y espacios donde otros pueden hacer lo mismo.
                  </p>
                  <p>
                    Lo que la mueve es la comunidad. Crear los espacios que no existían, especialmente para mujeres en LATAM que quieren entrar al mundo tech pero no encuentran donde empezar.
                  </p>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-6">Lo que ha construido</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-3 border-white/10">
                {projects.map((p, i) => (
                  <div
                    key={p.name}
                    className={`p-6 flex flex-col gap-3 ${i < projects.length - 1 ? "border-b-3 md:border-b-0 md:border-r-3 border-white/10" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`${p.color} text-primary-black text-[10px] font-black uppercase tracking-widest px-2 py-1`}>
                        {p.role}
                      </span>
                    </div>
                    <h3 className="font-[family-name:var(--font-title)] text-xl font-black uppercase text-white">
                      {p.name}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed flex-1">
                      {p.description}
                    </p>
                    <span className={`font-[family-name:var(--font-title)] text-lg font-black ${p.color === "bg-primary-pink" ? "text-primary-pink" : p.color === "bg-primary-green" ? "text-primary-green" : "text-primary-cream"}`}>
                      {p.stat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Mission */}
        <SectionWrapper variant="pink" className="min-h-fit">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-[family-name:var(--font-title)] text-4xl md:text-5xl font-black uppercase text-primary-black mb-6">
              Nuestra misión
            </h2>
            <p className="text-primary-black/80 text-xl leading-relaxed mb-10">
              Crear los espacios que necesitamos para que más mujeres en LATAM construyan, lancen y sean visibles en el mundo tech.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="default" size="lg">
                <Link href="/#community">Unirse a la comunidad</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary-black text-primary-black hover:bg-primary-black hover:text-white">
                <Link href="/#programs">Ver programas</Link>
              </Button>
            </div>
          </div>
        </SectionWrapper>

        <Footer />
      </main>
    </>
  );
}
