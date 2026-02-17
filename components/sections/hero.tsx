"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/context";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen w-full bg-primary-cream overflow-hidden">
      <div className="grid min-h-screen md:grid-cols-2">
        {/* Left — Pink block with manifesto */}
        <div className="relative flex flex-col justify-center bg-primary-pink border-4 border-primary-black px-12 py-20 md:px-20 lg:px-28">
          {/* Floating sticker badges */}
          <div className="absolute top-12 right-8 bg-white border-4 border-primary-black px-4 py-2 transform rotate-6 shadow-[4px_4px_0_0_#1A1A1A]">
            <span className="font-[family-name:var(--font-title)] text-sm font-black uppercase">
              48H
            </span>
          </div>

          <div className="absolute bottom-32 right-16 bg-secondary-red border-4 border-primary-black px-4 py-2 transform -rotate-3 shadow-[6px_6px_0_0_#1A1A1A]">
            <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase text-white">
              No Permission Needed
            </span>
          </div>

          {/* Tape strip decoration */}
          <div className="absolute top-0 right-1/4 w-24 h-8 bg-sunny-yellow opacity-60 transform -rotate-12"></div>

          {/* Motion lines */}
          <div className="absolute top-1/3 left-0 w-20 h-1 bg-primary-black opacity-30"></div>
          <div className="absolute top-1/3 left-0 w-16 h-1 bg-primary-black opacity-20 mt-3"></div>

          <h1 className="relative z-10 mb-6 font-[family-name:var(--font-title)] text-7xl font-black leading-[0.85] tracking-tight text-primary-black md:text-8xl lg:text-9xl">
            JUST
            <br />
            <span className="text-white">SHIP</span>
            <br />
            <span className="text-white">IT.</span>
          </h1>

          <p className="relative z-10 mb-10 max-w-lg text-xl leading-tight text-primary-black/90 md:text-2xl font-bold uppercase tracking-wide">
            {t.hero.description}
          </p>

          {/* Abstract code snippet decoration */}
          <div className="absolute bottom-8 left-8 opacity-20">
            <div className="font-mono text-xs text-primary-black space-y-1">
              <div>{"<build />"}</div>
              <div>{"<ship />"}</div>
              <div>{"<win />"}</div>
            </div>
          </div>

          <div className="relative z-10">
            <Button
              asChild
              size="lg"
              variant="default"
              className="shadow-[6px_6px_0_0_#1A1A1A] hover:shadow-[4px_4px_0_0_#1A1A1A]"
            >
              <a
                href="https://luma.com/ytl522gp"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.nav.join}
              </a>
            </Button>
          </div>
        </div>

        {/* Right — Split sections */}
        <div className="grid grid-rows-2 relative">
          {/* Rocket flying diagonally across */}
          <div className="absolute top-1/3 left-1/4 z-20 transform -rotate-45">
            <svg
              width="80"
              height="80"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 10L60 40L90 50L60 60L50 90L40 60L10 50L40 40L50 10Z"
                fill="#FF2D78"
                stroke="#1A1A1A"
                strokeWidth="3"
              />
              <circle cx="50" cy="50" r="8" fill="#1A1A1A" />
            </svg>
            {/* Motion trail */}
            <div className="absolute top-1/2 right-full w-12 h-1 bg-primary-pink opacity-40"></div>
            <div className="absolute top-1/2 right-full w-8 h-1 bg-primary-pink opacity-20 mt-2"></div>
          </div>

          {/* Top block - Event card with green accent */}
          <div className="relative bg-[#5B9A8B] border-4 border-primary-black flex items-center justify-center p-12">
            {/* 100% Online badge */}
            <div className="absolute top-8 right-8 bg-sunny-yellow border-4 border-primary-black px-4 py-2 transform rotate-3 shadow-[4px_4px_0_0_#1A1A1A]">
              <span className="font-[family-name:var(--font-title)] text-xs font-black uppercase">
                100% Online
              </span>
            </div>

            <div className="brutalist-card bg-white p-10 max-w-sm transform -rotate-2">
              <div className="text-center">
                <div className="mb-4 font-[family-name:var(--font-title)] text-7xl font-black text-primary-pink leading-none">
                  8
                </div>
                <div className="font-[family-name:var(--font-title)] text-3xl font-black text-primary-black uppercase leading-tight">
                  March
                  <br />
                  2026
                </div>
                <div className="mt-4 h-1 w-16 bg-primary-black mx-auto"></div>
                <div className="mt-3 text-sm font-bold text-primary-black uppercase tracking-wider">
                  Global Hackathon
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute bottom-8 left-8 text-6xl opacity-20 select-none">
              ✦
            </div>
          </div>

          {/* Bottom block - Coral with Build.Ship.Win */}
          <div className="relative bg-secondary-red border-4 border-l-4 border-primary-black flex items-center justify-center p-12">
            {/* Laptop silhouette abstract */}
            <div className="absolute top-1/4 left-12 opacity-10">
              <div className="w-20 h-12 border-4 border-primary-black"></div>
              <div className="w-24 h-1 bg-primary-black -ml-2"></div>
            </div>

            <div className="text-center max-w-md relative z-10">
              <div className="mb-6 inline-flex gap-2">
                <div className="bg-white border-3 border-primary-black px-3 py-1 transform -rotate-2">
                  <span className="font-[family-name:var(--font-title)] text-lg font-black text-primary-black">
                    BUILD
                  </span>
                </div>
                <div className="bg-white border-3 border-primary-black px-3 py-1 transform rotate-1">
                  <span className="font-[family-name:var(--font-title)] text-lg font-black text-primary-black">
                    SHIP
                  </span>
                </div>
                <div className="bg-white border-3 border-primary-black px-3 py-1 transform -rotate-1">
                  <span className="font-[family-name:var(--font-title)] text-lg font-black text-primary-black">
                    WIN
                  </span>
                </div>
              </div>

              <h2 className="font-[family-name:var(--font-title)] text-4xl font-black text-white mb-4 uppercase leading-tight">
                200 Builders
                <br />
                Worldwide
              </h2>

              <p className="text-lg text-white/90 font-bold uppercase tracking-wide">
                48 Hours to Ship
              </p>
            </div>

            {/* Decorative tape strip */}
            <div className="absolute bottom-0 right-1/3 w-32 h-6 bg-sunny-yellow opacity-50 transform rotate-6"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
