"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EncryptedText } from "@/components/ui/encrypted-text";
import Image from "next/image";

const MESSAGES = [
  "WOMEN IN TECH,",
  "DESIGN, ART, AND CULTURE_",
  "BUILD AND SHIP REAL PROJECTS_",
];

const REVEAL_MS_PER_CHAR = 40;
const PAUSE_BETWEEN = 300;

// Cumulative delay: each line waits for all previous lines to finish + pause
// Lines 0-1 are one phrase, so no pause between them
const MESSAGE_DELAYS = MESSAGES.reduce<number[]>((acc, msg, i) => {
  if (i === 0) {
    acc.push(0);
  } else {
    const prevStart = acc[i - 1];
    const prevDuration = MESSAGES[i - 1].length * REVEAL_MS_PER_CHAR;
    const pause = i === 1 ? 0 : PAUSE_BETWEEN;
    acc.push(prevStart + prevDuration + pause);
  }
  return acc;
}, []);

export function Hero() {
  // Button
  const [btnX, setBtnX] = useState(8);
  const [btnY, setBtnY] = useState(84);
  const [btnScale, setBtnScale] = useState(0.96);
  // Layout
  const [btnGap, setBtnGap] = useState(32);
  const [overlay, setOverlay] = useState(0);
  // Text (encrypted)
  const [txtX, setTxtX] = useState(232);
  const [txtY, setTxtY] = useState(-131);
  // Green text
  const [greenX, setGreenX] = useState(0);
  const [greenY, setGreenY] = useState(-109);
  const [greenGap, setGreenGap] = useState(218);
  const [greenML, setGreenML] = useState(64);

  const [panelOpen, setPanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"btn" | "layout" | "text" | "green">("btn");
  const [copied, setCopied] = useState<string | null>(null);

  const flash = (key: string) => {
    setCopied(key);
    setTimeout(() => setCopied(null), 1200);
  };

  const copy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    flash(key);
  };

  const cssProp = (prop: string, val: string) => `${prop}: ${val};`;

  const btnCss = `transform: translate(${btnX}px, ${btnY}px) scale(${btnScale});`;
  const layoutCss = [
    cssProp("--btn-gap", `${btnGap}px`),
    cssProp("--overlay", `${overlay}%`),
  ].join("\n");
  const txtCss = `transform: translate(${txtX}px, ${txtY}px);`;
  const greenCss = `transform: translate(${greenX}px, ${greenY}px);\nmargin-left: ${greenML}px;\ngap-spacer: ${greenGap}px;`;

  const allJson = JSON.stringify(
    {
      button: { x: btnX, y: btnY, scale: btnScale },
      layout: { btnGap, overlay },
      text: { x: txtX, y: txtY },
      green: { x: greenX, y: greenY, gap: greenGap, ml: greenML },
    },
    null,
    2,
  );

  const resetAll = () => {
    setBtnX(8); setBtnY(84); setBtnScale(0.96);
    setBtnGap(32); setOverlay(0);
    setTxtX(232); setTxtY(-131);
    setGreenX(0); setGreenY(-109); setGreenGap(218); setGreenML(64);
  };

  const tabs: { id: typeof activeTab; label: string; color: string }[] = [
    { id: "btn", label: "Button", color: "text-primary-cream" },
    { id: "layout", label: "Layout", color: "text-primary-green" },
    { id: "text", label: "Text", color: "text-primary-pink" },
    { id: "green", label: "Green", color: "text-primary-green" },
  ];

  const tabCssMap: Record<string, string> = {
    btn: btnCss,
    green: greenCss,
    layout: layoutCss,
    text: txtCss,
  };

  return (
    <section id="hero" className="sticky top-0 min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <Image
        src="https://res.cloudinary.com/dzohocmtc/image/upload/f_auto,q_auto,w_1920/v1771977266/hero_raw_4_iagzd2.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${overlay / 100})` }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl mx-auto px-4 sm:px-6">
        {/* Encrypted text messages */}
        <div
          style={{ transform: `translate(${txtX}px, ${txtY}px)` }}
          className="hidden md:flex flex-col items-start gap-1.5 sm:gap-2 mb-8 sm:mb-12"
        >
          {MESSAGES.map((msg, i) => (
            <p
              key={i}
              className="font-[family-name:var(--font-monoblock)] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-light tracking-wide uppercase"
            >
              <EncryptedText
                text={msg}
                encryptedClassName="text-white/40"
                revealedClassName="text-white"
                revealDelayMs={REVEAL_MS_PER_CHAR}
                parentRevealDelayMs={MESSAGE_DELAYS[i]}
              />
            </p>
          ))}
        </div>

        {/* Mobile: green labels at top, encrypted text near button */}
        <div className="flex flex-col items-center md:hidden w-full -mt-32">
          <div className="flex flex-col items-center gap-1 mb-auto">
            <span className="font-[family-name:var(--font-title)] text-base font-black uppercase tracking-wider text-primary-green">
              Global Hackathon
            </span>
            <span className="font-[family-name:var(--font-title)] text-base font-black uppercase tracking-wider text-primary-green">
              7-8 March // Online
            </span>
          </div>
        </div>

        {/* Mobile: encrypted light text — placed right before the button */}
        <div className="flex flex-col items-center gap-1 mb-4 mt-80 md:hidden">
          {MESSAGES.map((msg, i) => (
            <p
              key={i}
              className="font-[family-name:var(--font-monoblock)] text-[8px] font-light tracking-wide uppercase text-center"
            >
              <EncryptedText
                text={msg}
                encryptedClassName="text-white/40"
                revealedClassName="text-white"
                revealDelayMs={REVEAL_MS_PER_CHAR}
                parentRevealDelayMs={MESSAGE_DELAYS[i]}
              />
            </p>
          ))}
        </div>

        {/* Desktop: green text row — flanking center */}
        <div
          className="hidden md:flex items-center justify-center w-full mb-0"
          style={{
            transform: `translate(${greenX}px, ${greenY}px)`,
            marginLeft: `${greenML}px`,
          }}
        >
          <span className="font-[family-name:var(--font-title)] text-sm sm:text-lg md:text-2xl lg:text-3xl font-black uppercase tracking-wider text-primary-green">
            Global Hackathon
          </span>
          {/* Spacer for the sheep in the center of the image */}
          <div className="shrink-0" style={{ width: `${greenGap}px` }} />
          <span className="font-[family-name:var(--font-title)] text-sm sm:text-lg md:text-2xl lg:text-3xl font-black uppercase tracking-wider text-primary-green">
            7-8 March // Online
          </span>
        </div>

        <div style={{ height: `${btnGap}px` }} />

        {/* CTA */}
        <div
          style={{
            transform: `translate(${btnX}px, ${btnY}px) scale(${btnScale})`,
          }}
        >
          <Button
            asChild
            size="lg"
            variant="pink"
            className=""
          >
            <a
              href="https://luma.com/ytl522gp"
              target="_blank"
              rel="noopener noreferrer"
            >
              {"<Join Here>"}
            </a>
          </Button>
        </div>
      </div>

      {/* Bottom gradient fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-primary-black/60 z-10" />

      {/* ── Control Panel (disabled) ── */}
      {false && <div className="fixed bottom-4 right-4 z-[9999]">
        <button
          onClick={() => setPanelOpen(!panelOpen)}
          className="mb-2 ml-auto block bg-primary-black text-primary-cream text-xs font-bold uppercase tracking-wide px-3 py-2 border-2 border-primary-cream/20"
        >
          {panelOpen ? "Hide" : "Controls"}
        </button>

        {panelOpen && (
          <div className="bg-primary-black/95 backdrop-blur-sm border-2 border-primary-cream/20 w-[320px] max-h-[80vh] overflow-y-auto text-primary-cream text-xs font-mono">
            <div className="flex border-b border-primary-cream/10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 px-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    activeTab === tab.id
                      ? `${tab.color} bg-primary-cream/10`
                      : "text-primary-cream/40 hover:text-primary-cream/70"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-4 space-y-3">
              {activeTab === "btn" && (
                <fieldset className="space-y-2">
                  <legend className="text-primary-cream font-bold uppercase text-[11px] tracking-wider mb-1">
                    Button Position & Size
                  </legend>
                  <Slider label="X" value={btnX} min={-400} max={400} unit="px" onChange={setBtnX} />
                  <Slider label="Y" value={btnY} min={-300} max={300} unit="px" onChange={setBtnY} />
                  <Slider label="Scale" value={btnScale} min={0.5} max={2.5} step={0.01} onChange={setBtnScale} fmt={(v) => v.toFixed(2)} />
                </fieldset>
              )}

              {activeTab === "layout" && (
                <fieldset className="space-y-2">
                  <legend className="text-primary-green font-bold uppercase text-[11px] tracking-wider mb-1">
                    Spacing & Overlay
                  </legend>
                  <Slider label="Btn Gap" value={btnGap} min={0} max={120} unit="px" onChange={setBtnGap} accent="accent-primary-green" />
                  <Slider label="Overlay" value={overlay} min={0} max={80} unit="%" onChange={setOverlay} accent="accent-primary-green" />
                </fieldset>
              )}

              {activeTab === "text" && (
                <fieldset className="space-y-2">
                  <legend className="text-primary-pink font-bold uppercase text-[11px] tracking-wider mb-1">
                    Text Position
                  </legend>
                  <Slider label="X" value={txtX} min={-400} max={400} unit="px" onChange={setTxtX} accent="accent-primary-pink" />
                  <Slider label="Y" value={txtY} min={-300} max={300} unit="px" onChange={setTxtY} accent="accent-primary-pink" />
                </fieldset>
              )}

              {activeTab === "green" && (
                <fieldset className="space-y-2">
                  <legend className="text-primary-green font-bold uppercase text-[11px] tracking-wider mb-1">
                    Green Text Position
                  </legend>
                  <Slider label="X" value={greenX} min={-400} max={400} unit="px" onChange={setGreenX} accent="accent-primary-green" />
                  <Slider label="Y" value={greenY} min={-300} max={300} unit="px" onChange={setGreenY} accent="accent-primary-green" />
                  <Slider label="Gap" value={greenGap} min={0} max={400} unit="px" onChange={setGreenGap} accent="accent-primary-green" />
                  <Slider label="ML" value={greenML} min={-200} max={200} unit="px" onChange={setGreenML} accent="accent-primary-green" />
                </fieldset>
              )}

              <div className="mt-2 bg-primary-cream/5 border border-primary-cream/10 p-2 relative group">
                <button
                  onClick={() => copy(`tab-${activeTab}`, tabCssMap[activeTab])}
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-primary-cream/10 hover:bg-primary-cream/20 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 text-primary-cream"
                >
                  {copied === `tab-${activeTab}` ? "Copied!" : "Copy CSS"}
                </button>
                <pre className="text-[10px] text-primary-cream/60 whitespace-pre-wrap leading-relaxed select-all">
                  {tabCssMap[activeTab]}
                </pre>
              </div>
            </div>

            <div className="flex flex-col gap-2 p-4 pt-0">
              <div className="flex gap-2">
                <button
                  onClick={() => copy("all-json", allJson)}
                  className="flex-1 bg-primary-green text-primary-black font-bold uppercase text-[10px] tracking-wider py-2 px-3 hover:opacity-90"
                >
                  {copied === "all-json" ? "Copied!" : "Copy All JSON"}
                </button>
                <button
                  onClick={() => {
                    const allCss = [
                      `/* Button */\n${btnCss}`,
                      `/* Layout */\n${layoutCss}`,
                      `/* Text */\n${txtCss}`,
                    ].join("\n\n");
                    copy("all-css", allCss);
                  }}
                  className="flex-1 bg-primary-pink text-primary-black font-bold uppercase text-[10px] tracking-wider py-2 px-3 hover:opacity-90"
                >
                  {copied === "all-css" ? "Copied!" : "Copy All CSS"}
                </button>
              </div>
              <button
                onClick={resetAll}
                className="w-full bg-primary-cream/10 text-primary-cream font-bold uppercase text-[10px] tracking-wider py-2 px-3 hover:bg-primary-cream/20"
              >
                Reset All
              </button>
            </div>
          </div>
        )}
      </div>}
    </section>
  );
}

/* ── Reusable slider row ── */
function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  accent = "accent-primary-cream",
  fmt,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
  accent?: string;
  fmt?: (v: number) => string;
}) {
  const display = fmt ? fmt(value) : `${value}`;
  const isFloat = step !== undefined && step < 1;
  const inputMin = isFloat ? Math.round(min * 100) : min;
  const inputMax = isFloat ? Math.round(max * 100) : max;
  const inputValue = isFloat ? Math.round(value * 100) : value;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Number(e.target.value);
    onChange(isFloat ? raw / 100 : raw);
  };

  return (
    <label className="flex items-center justify-between gap-2">
      <span className="w-[80px] shrink-0 truncate">
        {label}: {display}{unit ?? ""}
      </span>
      <input
        type="range"
        min={inputMin}
        max={inputMax}
        value={inputValue}
        onChange={handleChange}
        className={`w-[160px] ${accent}`}
      />
    </label>
  );
}
