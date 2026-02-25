"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const TERMINAL_LINES = [
  "> Initializing hackathon...",
  "> Loading 200 builders worldwide...",
  "> Connecting communities...",
  "> 48h countdown started",
  "> Ship something real. ✓",
];

const CHAR_DELAY = 28; // ms per character
const LINE_GAP = 420;  // ms between lines starting

function TerminalAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentTyping, setCurrentTyping] = useState<string>("");
  const [done, setDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    let li = 0;
    let ci = 0;
    let typing = "";
    let visible: string[] = [];

    function typeNext() {
      if (li >= TERMINAL_LINES.length) {
        setDone(true);
        return;
      }

      const line = TERMINAL_LINES[li];

      if (ci < line.length) {
        typing += line[ci];
        ci++;
        setCurrentTyping(typing);
        setTimeout(typeNext, CHAR_DELAY);
      } else {
        // Line complete — move to next
        visible = [...visible, typing];
        setVisibleLines([...visible]);
        setCurrentTyping("");
        typing = "";
        ci = 0;
        li++;
        setTimeout(typeNext, LINE_GAP);
      }
    }

    setTimeout(typeNext, 300);
  }, [isInView]);

  return (
    <div ref={ref} className="brutalist-card bg-primary-black border-primary-green overflow-hidden w-full">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-neutral-dark border-b-2 border-primary-green">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-black" />
        <span className="ml-3 text-xs text-neutral-gray font-mono">she.ships — bash</span>
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-sm leading-7 min-h-[220px]">
        {visibleLines.map((line, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-primary-green select-none">&gt;</span>
            <span className="text-primary-cream/80">{line.replace(/^> /, "")}</span>
          </div>
        ))}

        {/* Currently typing line */}
        {!done && (
          <div className="flex gap-2">
            <span className="text-primary-green select-none">&gt;</span>
            <span className="text-primary-cream/80">
              {currentTyping.replace(/^> /, "")}
              <span className="animate-pulse text-primary-green">▋</span>
            </span>
          </div>
        )}

        {done && (
          <div className="flex gap-2 mt-1">
            <span className="text-primary-green select-none">&gt;</span>
            <span className="animate-pulse text-primary-green">▋</span>
          </div>
        )}
      </div>
    </div>
  );
}

function HalftoneIllustration() {
  return (
    <div className="brutalist-card bg-primary-cream flex items-center justify-center w-full overflow-hidden">
      <svg
        viewBox="0 0 400 480"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-hidden
      >
        <defs>
          {/* Halftone dot pattern */}
          <pattern id="halftone-sm" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="2.2" fill="#131414" />
          </pattern>
          <pattern id="halftone-md" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="7" cy="7" r="4" fill="#131414" />
          </pattern>
          <pattern id="halftone-lg" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="9" cy="9" r="6.5" fill="#131414" />
          </pattern>

          {/* Woman silhouette clip path */}
          <clipPath id="woman-clip">
            {/* Head */}
            <ellipse cx="200" cy="82" rx="48" ry="56" />
            {/* Neck */}
            <rect x="185" y="130" width="30" height="24" />
            {/* Shoulders and torso */}
            <path d="M120,154 Q155,138 185,145 L215,145 Q245,138 280,154 L295,240 Q260,255 200,258 Q140,255 105,240 Z" />
            {/* Body */}
            <path d="M120,230 Q105,270 100,310 L150,320 Q160,290 175,265 L200,258 L225,265 Q240,290 250,320 L300,310 Q295,270 280,230 Q260,255 200,258 Q140,255 120,230 Z" />
            {/* Left arm */}
            <path d="M118,158 Q88,180 72,220 Q64,245 70,260 Q82,265 94,258 Q98,240 108,218 Q120,195 130,175 Z" />
            {/* Right arm */}
            <path d="M282,158 Q312,180 328,220 Q336,245 330,260 Q318,265 306,258 Q302,240 292,218 Q280,195 270,175 Z" />
            {/* Skirt / lower body flare */}
            <path d="M148,310 Q130,360 118,420 Q145,430 175,428 Q185,390 200,368 Q215,390 225,428 Q255,430 282,420 Q270,360 252,310 Z" />
          </clipPath>

          {/* Background halftone mask — lighter dots outside */}
          <clipPath id="bg-clip">
            <rect x="0" y="0" width="400" height="480" />
          </clipPath>
        </defs>

        {/* Background with small halftone dots */}
        <rect x="0" y="0" width="400" height="480" fill="url(#halftone-sm)" opacity="0.18" />

        {/* Dense dots in medium zones (shoulder area) */}
        <ellipse cx="200" cy="200" rx="130" ry="140" fill="url(#halftone-md)" opacity="0.35" clipPath="url(#bg-clip)" />

        {/* Woman silhouette — solid black fill with halftone overlay */}
        <g clipPath="url(#woman-clip)">
          {/* Base fill */}
          <rect x="0" y="0" width="400" height="480" fill="#131414" />
          {/* Halftone texture over silhouette — lighter in center */}
          <rect x="0" y="0" width="400" height="480" fill="url(#halftone-lg)" opacity="0.12" />
        </g>

        {/* Pink accent star */}
        <text x="48" y="72" fontSize="28" fill="#e9a1c9" fontWeight="bold">✦</text>
        <text x="338" y="380" fontSize="20" fill="#e9a1c9" fontWeight="bold">✦</text>
        <text x="320" y="60" fontSize="14" fill="#7fe179" fontWeight="bold">●</text>
        <text x="58" y="400" fontSize="14" fill="#7fe179" fontWeight="bold">●</text>
      </svg>
    </div>
  );
}

export function WhatIsSheShips() {
  const { t } = useTranslation();

  return (
    <SectionWrapper variant="dark" id="what-is-sheships" className="overflow-hidden">
      {/* Full-width header */}
      <div className="mb-12">
        <div className="mb-6">
          <div className="inline-block brutalist-card bg-primary-green px-4 py-2 mb-4">
            <span className="font-[family-name:var(--font-title)] text-sm font-black text-primary-black uppercase tracking-wide">
              {t.hero.date}
            </span>
          </div>
        </div>

        <h2 className="font-[family-name:var(--font-title)] text-3xl font-black text-white mb-4 leading-tight md:text-4xl">
          {t.eventInfo.headline}
          <br />
          <span className="text-primary-pink">{t.eventInfo.headlineAccent}</span>
        </h2>

        <div className="max-w-2xl space-y-3 text-base text-white/70 leading-relaxed">
          <p>{t.eventInfo.paragraph1}</p>
          <p className="text-white font-bold">{t.eventInfo.requirementLine}</p>
        </div>

        <p className="mt-6 text-sm text-neutral-gray font-medium">
          {t.eventInfo.limited}
        </p>
      </div>

      {/* Two-column: terminal | illustration */}
      <div className="grid min-w-0 max-w-full md:grid-cols-2 gap-8 md:gap-12 items-stretch">
        <TerminalAnimation />
        <HalftoneIllustration />
      </div>
    </SectionWrapper>
  );
}
