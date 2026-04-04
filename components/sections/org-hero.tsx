"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "200", label: "Builders" },
  { value: "56", label: "Proyectos lanzados" },
  { value: "300+", label: "En comunidad" },
];

export function OrgHero() {
  return (
    <section id="hero" className="sticky top-0 min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <Image
        src="https://res.cloudinary.com/dzohocmtc/image/upload/f_auto,q_auto,w_1920/v1771977266/hero_raw_4_iagzd2.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-primary-black z-10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto px-6">
        {/* Label */}
        <div className="inline-block border-2 border-primary-green px-4 py-1 mb-6">
          <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase tracking-widest text-primary-green">
            Una organización para mujeres que construyen
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-[family-name:var(--font-title)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tight text-white mb-6">
          El lugar donde las<br />
          <span className="text-primary-pink">mujeres construyen</span>
        </h1>

        <p className="text-white/70 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          She Ships nació para que más mujeres no solo asistan a los eventos tech — sino que sean las protagonistas.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button asChild variant="pink" size="lg">
            <a href="https://discord.gg/n6nNAqMu" target="_blank" rel="noopener noreferrer">
              Únete a la comunidad
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-black">
            <a href="#workshops">
              Ver Workshops
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center gap-0 border-2 border-white/20">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center px-8 py-5 ${i < stats.length - 1 ? "border-b-2 sm:border-b-0 sm:border-r-2 border-white/20" : ""}`}
            >
              <span className="font-[family-name:var(--font-title)] text-4xl font-black text-primary-pink">
                {stat.value}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-white/60 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
