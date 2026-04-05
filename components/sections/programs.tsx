"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";

const programs = [
  {
    icon: "⚡",
    title: "Hackathons",
    description: "Eventos intensivos de 48-72hs donde mujeres construyen productos reales desde cero. El más grande hasta ahora: 200 builders, 56 proyectos, en el 8M.",
    status: "activo",
    href: "/hackathons/2026",
  },
  {
    icon: "🛠",
    title: "Workshops",
    description: "Sesiones prácticas donde aprendes a construir con herramientas reales. Sales con un proyecto funcional en 2 horas. El primero fue con v0.",
    status: "activo",
    href: "#workshops",
  },
  {
    icon: "🧭",
    title: "Mentorías",
    description: "Sesiones 1:1 y grupales con personas del mundo tech. Para orientarte, crecer, y tomar decisiones con más claridad.",
    status: "activo",
    href: "#community",
  },
  {
    icon: "🎤",
    title: "Speaker Notes",
    description: "Aprende a dar charlas, preparar tu pitch, y presentar tu trabajo con confianza. Porque tu voz importa.",
    status: "próximo",
    href: "#",
  },
  {
    icon: "✨",
    title: "Showcases",
    description: "Espacios donde las builders muestran lo que construyeron. Visibilidad real para proyectos reales.",
    status: "próximo",
    href: "#",
  },
];

export function Programs() {
  return (
    <SectionWrapper variant="cream" id="programs" className="min-h-fit" grid>
      <div className="text-center mb-12">
        <div className="inline-block brutalist-card bg-primary-black px-4 py-2 mb-4">
          <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-cream">
            Lo que hacemos
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-title)] text-4xl md:text-5xl font-black uppercase leading-tight text-primary-black">
          Nuestros <span className="text-primary-pink">programas</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-3 border-primary-black">
        {programs.map((p, i) => (
          <a
            key={p.title}
            href={p.href}
            className={`group border-3 border-primary-black p-6 flex flex-col gap-4 transition-colors duration-200 ${p.status === "próximo" ? "bg-white opacity-70 cursor-default" : "bg-white hover:bg-primary-pink"}`}
            aria-disabled={p.status === "próximo"}
            onClick={p.status === "próximo" ? (e) => e.preventDefault() : undefined}
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl">{p.icon}</span>
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 ${p.status === "activo" ? "bg-primary-green text-primary-black" : "bg-primary-black/10 text-primary-black/50"}`}>
                {p.status}
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-title)] text-xl font-black uppercase text-primary-black">
              {p.title}
            </h3>
            <p className="text-sm text-primary-black/70 leading-relaxed flex-1">
              {p.description}
            </p>
            {p.status === "activo" && (
              <span className="text-xs font-black uppercase tracking-wide text-primary-black group-hover:underline">
                Ver más →
              </span>
            )}
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}
