"use client";

import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const TERMINAL_LINES = [
  "> Initializing she.ships hackathon...",
  "> Region: LATAM + USA + India",
  "> Participants: 200 builders worldwide",
  "> Format: 100% remote",
  "> Duration: 48 hours",
  "> Start date: March 6, 2026",
  "> End date: March 8, 2026",
  "> Requirement: ship something real",
  "> Status: OPEN FOR REGISTRATION ✓",
];

const CHAR_DELAY = 22;
const LINE_GAP = 350;
const LOOP_PAUSE = 1800; // pause before restarting

function TerminalAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentTyping, setCurrentTyping] = useState<string>("");
  const cancelRef = useRef(false);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    function runLoop() {
      let li = 0;
      let ci = 0;
      let typing = "";
      let visible: string[] = [];

      setVisibleLines([]);
      setCurrentTyping("");

      function typeNext() {
        if (cancelRef.current) return;

        if (li >= TERMINAL_LINES.length) {
          // Loop complete — pause then restart
          setTimeout(() => {
            if (!cancelRef.current) runLoop();
          }, LOOP_PAUSE);
          return;
        }

        const line = TERMINAL_LINES[li];

        if (ci < line.length) {
          typing += line[ci];
          ci++;
          setCurrentTyping(typing);
          setTimeout(typeNext, CHAR_DELAY);
        } else {
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
    }

    runLoop();

    return () => {
      cancelRef.current = true;
    };
  }, [isInView]);

  return (
    <div ref={ref} className="border-3 border-primary-black bg-[#0a0a0a] overflow-hidden w-full">
      {/* Title bar — referencia style */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#111] border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#e9a1c9] border border-white/20" />
          <span className="w-3 h-3 bg-[#222] border border-white/20" />
          <span className="w-3 h-3 bg-[#222] border border-white/20" />
        </div>
        <span className="text-[10px] text-[#e9a1c9] font-mono tracking-widest uppercase">TERMINAL.SYS</span>
      </div>

      {/* Terminal body */}
      <div className="p-6 font-mono text-sm leading-7 min-h-[300px]">
        {visibleLines.map((line, i) => {
          const isHighlight = line.includes("✓") || line.includes("OPEN");
          return (
            <div key={`${i}-${line}`} className={isHighlight ? "text-[#e9a1c9] font-bold" : "text-white/80"}>
              {line}
            </div>
          );
        })}

        {/* Currently typing line */}
        {currentTyping && (
          <div className="text-white/80">
            {currentTyping}
            <span className="animate-pulse text-[#e9a1c9]">_</span>
          </div>
        )}

        {!currentTyping && visibleLines.length < TERMINAL_LINES.length && (
          <div>
            <span className="animate-pulse text-[#e9a1c9]">_</span>
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
    <SectionWrapper variant="dark" id="what-is-sheships" className="min-h-fit overflow-hidden">
      <div className="grid min-w-0 max-w-full md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Left — headline + content */}
        <div className="min-w-0">
          <div className="inline-block brutalist-card bg-primary-green px-4 py-2 mb-6">
            <span className="font-[family-name:var(--font-title)] text-sm font-black text-primary-black uppercase tracking-wide">
              {t.hero.date}
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-title)] text-3xl font-black text-white mb-6 leading-tight md:text-4xl lg:text-5xl">
            {t.eventInfo.headline}
            <br />
            <span className="text-primary-pink">{t.eventInfo.headlineAccent}</span>
          </h2>

        </div>

        {/* Right — terminal */}
        <TerminalAnimation />
      </div>
    </SectionWrapper>
  );
}
