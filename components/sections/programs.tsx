"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";

export function Programs() {
  const { t } = useTranslation();
  const p = t.org.programs;

  const programs = [
    {
      icon: "⚡",
      title: "Hackathons",
      description: p.hackathonsDesc,
      status: p.statusActive,
      href: "/hackathons/2026",
    },
    {
      icon: "🛠",
      title: "Workshops",
      description: p.workshopsDesc,
      status: p.statusActive,
      href: "#workshops",
    },
    {
      icon: "🧭",
      title: p.mentoriasTitle,
      description: p.mentoriasDesc,
      status: p.statusActive,
      href: "#community",
    },
    {
      icon: "🎤",
      title: p.speakerTitle,
      description: p.speakerDesc,
      status: p.statusComing,
      href: "#",
    },
    {
      icon: "✨",
      title: p.showcasesTitle,
      description: p.showcasesDesc,
      status: p.statusComing,
      href: "#",
    },
  ];

  return (
    <SectionWrapper variant="cream" id="programs" className="min-h-fit" grid>
      <div className="text-center mb-12">
        <div className="inline-block brutalist-card bg-primary-black px-4 py-2 mb-4">
          <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-cream">
            {p.label}
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-title)] text-4xl md:text-5xl font-black uppercase leading-tight text-primary-black">
          {p.headline1} <span className="text-primary-pink">{p.headline2}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-3 border-primary-black">
        {programs.map((prog) => (
          <a
            key={prog.title}
            href={prog.href}
            className={`group border-3 border-primary-black p-6 flex flex-col gap-4 transition-colors duration-200 ${prog.status === p.statusComing ? "bg-white opacity-70 cursor-default" : "bg-white hover:bg-primary-pink"}`}
            aria-disabled={prog.status === p.statusComing}
            onClick={prog.status === p.statusComing ? (e) => e.preventDefault() : undefined}
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl">{prog.icon}</span>
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 ${prog.status === p.statusActive ? "bg-primary-green text-primary-black" : "bg-primary-black/10 text-primary-black/50"}`}>
                {prog.status}
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-title)] text-xl font-black uppercase text-primary-black">
              {prog.title}
            </h3>
            <p className="text-sm text-primary-black/70 leading-relaxed flex-1">
              {prog.description}
            </p>
            {prog.status === p.statusActive && (
              <span className="text-xs font-black uppercase tracking-wide text-primary-black group-hover:underline">
                {p.viewMore}
              </span>
            )}
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}
