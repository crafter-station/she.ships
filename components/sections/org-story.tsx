"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";

export function OrgStory() {
  return (
    <SectionWrapper variant="dark" id="story" className="min-h-fit">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Left — text */}
        <div>
          <div className="inline-block brutalist-card bg-primary-pink px-4 py-2 mb-6">
            <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-black">
              Por qué existimos
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight text-white mb-6">
            El problema existía.<br />
            <span className="text-primary-pink">She Ships es la respuesta.</span>
          </h2>

          <div className="space-y-5 text-white/70 leading-relaxed">
            <p>
              En los eventos tech de LATAM, las mujeres eran pocas. Pero no solo pocas: la mayoría de los hombres participaban activamente, hablaban, compartían ideas. Las pocas mujeres presentes casi no tenían participación.
            </p>
            <p>
              She Ships nació de esa observación. Es un espacio donde las mujeres no son la minoría silenciosa, sino las que construyen, presentan y lanzan.
            </p>
            <p>
              Hoy es una comunidad de <span className="text-primary-green font-bold">300+ mujeres</span> con base en LATAM, con hackathons, workshops, mentorías y más.
            </p>
          </div>

          {/* Quote */}
          <div className="border-l-4 border-primary-pink pl-6 mt-8">
            <p className="font-[family-name:var(--font-title)] text-xl font-black uppercase text-white">
              "Quería ver más mujeres no solo en el público,{" "}
              <span className="text-primary-pink">sino en el escenario."</span>
            </p>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mt-3">
              Shiara, fundadora de she.ships
            </p>
          </div>
        </div>

        {/* Right — visual */}
        <div className="brutalist-card bg-primary-cream flex flex-col gap-0 overflow-hidden">
          {/* Stat blocks */}
          {[
            { num: "2026", label: "Año de fundación", color: "bg-primary-pink" },
            { num: "300+", label: "Mujeres en comunidad", color: "bg-primary-black" },
            { num: "LATAM", label: "Y más allá", color: "bg-primary-green" },
          ].map((item, i) => (
            <div
              key={i}
              className={`${item.color} border-b-3 border-primary-black last:border-b-0 px-8 py-6 flex items-center justify-between`}
            >
              <span className={`font-[family-name:var(--font-title)] text-4xl font-black uppercase ${item.color === "bg-primary-black" ? "text-white" : "text-primary-black"}`}>
                {item.num}
              </span>
              <span className={`text-xs font-bold uppercase tracking-widest ${item.color === "bg-primary-black" ? "text-white/60" : "text-primary-black/60"}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
