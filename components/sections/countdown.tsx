"use client";

import { useEffect, useState } from "react";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";

const TARGET_DATE = new Date("2026-03-08T00:00:00Z").getTime();

function getTimeLeft() {
  const now = Date.now();
  const diff = Math.max(0, TARGET_DATE - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const { t } = useTranslation();
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const blocks = [
    { value: time.days, label: t.countdown.days },
    { value: time.hours, label: t.countdown.hours },
    { value: time.minutes, label: t.countdown.minutes },
    { value: time.seconds, label: t.countdown.seconds },
  ];

  return (
    <SectionWrapper variant="dark" grid id="countdown">
      <div className="text-center">
        <span className="data-label mb-4 block text-warm-gray">
          {t.countdown.label}
        </span>
        <h2 className="mb-12 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          {t.countdown.headline}{" "}
          <span className="text-rose-coral">{t.countdown.headlineAccent}</span>
        </h2>

        <div className="mx-auto flex max-w-3xl justify-center gap-4 md:gap-8">
          {blocks.map((block) => (
            <div key={block.label} className="flex-1">
              <div className="border border-grid-gray bg-charcoal/80 px-4 py-6 md:px-8 md:py-10">
                <p className="font-mono text-5xl font-black text-white md:text-7xl lg:text-8xl">
                  {String(block.value).padStart(2, "0")}
                </p>
              </div>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-warm-gray">
                {block.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 font-script text-xl text-rose-coral md:text-2xl">
          {t.countdown.tagline}
        </p>
      </div>
    </SectionWrapper>
  );
}
