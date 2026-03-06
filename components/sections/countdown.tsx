"use client";

import { useEffect, useState } from "react";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { useTranslation } from "@/lib/i18n/context";

const TARGET_DATE = new Date("2026-03-06T18:45:00-05:00").getTime();
const GOOGLE_MEET_URL = "https://meet.google.com/vuz-mvxo-gdo";

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
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTime(getTimeLeft());
    setMounted(true);
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
    <SectionWrapper variant="dark" id="countdown" innerClassName="flex flex-col items-center justify-center min-h-screen py-20">
      <div className="text-center w-full">
        <h2 className="mb-4 font-[family-name:var(--font-title)] text-3xl font-black tracking-tight text-primary-cream md:text-4xl lg:text-5xl uppercase">
          {t.countdown.headline}{" "}
          <span className="text-primary-pink">
            {t.countdown.headlineAccent}
          </span>
        </h2>

        <div className={`mx-auto mt-12 flex max-w-5xl flex-wrap justify-center items-end gap-4 md:gap-8 ${mounted ? "opacity-100" : "opacity-0"}`}>
          {blocks.map((block, i) => (
            <div key={block.label} className="flex flex-col items-center">
              <div className="flex items-center gap-4 md:gap-8">
                <p className="font-[family-name:var(--font-title)] text-4xl font-black text-primary-cream sm:text-5xl md:text-6xl lg:text-8xl leading-none">
                  {String(block.value).padStart(2, "0")}
                </p>
                {i < blocks.length - 1 && (
                  <span className="font-[family-name:var(--font-title)] text-4xl font-black text-primary-cream sm:text-5xl md:text-6xl lg:text-8xl leading-none self-start mt-1">
                    :
                  </span>
                )}
              </div>
              <p className="mt-3 font-bold uppercase tracking-widest text-primary-cream text-xs md:text-sm">
                {block.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-lg font-normal text-primary-cream md:text-xl">
          {t.countdown.tagline}
        </p>

        <a
          href={GOOGLE_MEET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary-pink px-8 py-4 text-lg font-bold text-primary-cream transition-transform hover:scale-105 md:text-xl"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
          </svg>
          {t.countdown.joinMeet}
        </a>
      </div>
    </SectionWrapper>
  );
}
