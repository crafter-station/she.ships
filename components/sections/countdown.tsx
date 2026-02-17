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
    { value: time.days, label: t.countdown.days, color: "bg-primary-pink" },
    {
      value: time.hours,
      label: t.countdown.hours,
      color: "bg-secondary-purple",
    },
    {
      value: time.minutes,
      label: t.countdown.minutes,
      color: "bg-secondary-red",
    },
    {
      value: time.seconds,
      label: t.countdown.seconds,
      color: "bg-secondary-light-pink",
    },
  ];

  return (
    <SectionWrapper variant="cream" bordered id="countdown">
      <div className="text-center">
        <h2 className="mb-4 font-[family-name:var(--font-title)] text-5xl font-black tracking-tight text-primary-black md:text-6xl lg:text-7xl uppercase">
          {t.countdown.headline}{" "}
          <span className="text-primary-pink">
            {t.countdown.headlineAccent}
          </span>
        </h2>

        <div className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-6">
          {blocks.map((block, i) => (
            <div key={block.label} className="flex-1 min-w-[140px]">
              <div className={`brutalist-card ${block.color} p-8`}>
                <p className="font-[family-name:var(--font-title)] text-6xl font-black text-white md:text-7xl lg:text-8xl">
                  {String(block.value).padStart(2, "0")}
                </p>
              </div>
              <p className="mt-4 font-bold uppercase tracking-widest text-primary-black text-sm">
                {block.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 font-[family-name:var(--font-title)] text-2xl font-bold text-primary-pink md:text-3xl">
          {t.countdown.tagline}
        </p>
      </div>
    </SectionWrapper>
  );
}
