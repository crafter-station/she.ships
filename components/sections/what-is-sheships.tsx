"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";

export function WhatIsSheShips() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="dark" id="what-is-sheships">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left - Decorative graphic */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Pink circles with SS letters */}
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 bg-secondary-light-pink border-4 border-primary-black flex items-center justify-center transform -rotate-12">
                <span className="font-[family-name:var(--font-title)] text-5xl font-black text-primary-black">
                  S
                </span>
              </div>
              <div className="w-40 h-40 bg-secondary-light-pink border-4 border-primary-black flex items-center justify-center transform rotate-6">
                <span className="font-[family-name:var(--font-title)] text-6xl font-black text-primary-black">
                  S
                </span>
              </div>
              <div className="w-36 h-36 bg-sunny-yellow border-4 border-primary-black flex items-center justify-center transform -rotate-6">
                <span className="font-[family-name:var(--font-title)] text-5xl font-black text-primary-black">
                  ●
                </span>
              </div>
            </div>
            {/* Decorative star */}
            <div className="absolute -top-4 -right-4 text-sunny-yellow text-4xl">
              ✦
            </div>
          </div>
        </div>

        {/* Right - Content */}
        <div>
          <div className="mb-6">
            <div className="inline-block brutalist-card bg-secondary-light-pink px-4 py-2 mb-4">
              <span className="font-[family-name:var(--font-title)] text-sm font-black text-primary-black uppercase tracking-wide">
                March 6-8, 2026
              </span>
            </div>
          </div>

          <h2 className="font-[family-name:var(--font-title)] text-5xl font-black text-white mb-6 leading-tight md:text-6xl">
            This is not just a hackathon.
            <br />
            <span className="text-primary-pink">This is a space to ship.</span>
          </h2>

          <div className="space-y-4 text-lg text-white/80 leading-relaxed">
            <p>
              She Ships is a 48-hour Global Hackathon where women and multidisciplinary creators come together to build and publish something real.
            </p>
            <p>
              From March 6-8, we celebrate International Women's Day by creating. This is not just tech — we welcome developers, designers, artists, product builders, researchers, and all types of creators.
            </p>
            <p className="text-white font-bold">
              There's only one requirement: 👉 Ship something.
            </p>
            <p>
              A public link. A real output. Something that exists.
            </p>
          </div>

          <p className="mt-8 text-sm text-neutral-gray font-medium">
            Limited to 200 participants worldwide
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
