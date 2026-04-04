import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Quiénes Somos | She Ships",
  description: "Conoce la historia detrás de She Ships y a Shiara, su fundadora.",
};

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
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Placeholder photo */}
            <div className="brutalist-card bg-primary-pink/10 border-3 border-primary-pink/30 aspect-square flex items-center justify-center">
              <span className="text-primary-pink/40 font-[family-name:var(--font-title)] text-xl font-black uppercase tracking-widest">
                Foto de Shiara
              </span>
            </div>

            <div>
              <div className="inline-block brutalist-card bg-primary-green px-4 py-2 mb-4">
                <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-black">
                  La fundadora
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-title)] text-3xl md:text-4xl font-black uppercase text-white mb-4">
                Shiara
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Shiara es la fundadora de She Ships. Vio el problema, decidio actuar, y creo el espacio que queria ver existir.
                </p>
                <p>
                  Su vision es simple: que mas mujeres en LATAM no solo consuman tecnologia, sino que la construyan. Que participen, que hablen, que lancen.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-8">
                {[
                  { val: "200+", label: "Builders" },
                  { val: "56", label: "Proyectos" },
                  { val: "300+", label: "Comunidad" },
                ].map((s) => (
                  <div key={s.label} className="border border-white/10 p-4 text-center">
                    <div className="font-[family-name:var(--font-title)] text-2xl font-black text-primary-pink">{s.val}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{s.label}</div>
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
              Crear los espacios que necesitamos para que mas mujeres en LATAM construyan, lancen, y sean visibles en el mundo tech.
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
