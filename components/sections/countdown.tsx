"use client";

import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
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

function isTimeUp(time: { days: number; hours: number; minutes: number; seconds: number }) {
  return time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0;
}

export function Countdown() {
  const { t } = useTranslation();
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const hasCelebratedRef = useRef(false);

  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 110 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 0.9,
        duration: 2.3 + Math.random() * 2.2,
        drift: (Math.random() - 0.5) * 150,
        rotate: 360 + Math.random() * 520,
        size: 6 + Math.random() * 8,
        color: ["#ff4fa3", "#ffde59", "#59ffd0", "#6e6bff", "#ff6d5a"][Math.floor(Math.random() * 5)],
      })),
    []
  );

  useEffect(() => {
    setTime(getTimeLeft());
    setMounted(true);
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mounted || hasCelebratedRef.current || !isTimeUp(time)) {
      return;
    }

    hasCelebratedRef.current = true;
    setShowConfetti(true);

    const timeout = setTimeout(() => setShowConfetti(false), 6500);
    return () => clearTimeout(timeout);
  }, [mounted, time]);

  const blocks = [
    { value: time.days, label: t.countdown.days },
    { value: time.hours, label: t.countdown.hours },
    { value: time.minutes, label: t.countdown.minutes },
    { value: time.seconds, label: t.countdown.seconds },
  ];

  return (
    <SectionWrapper variant="dark" id="countdown" innerClassName="flex flex-col items-center justify-center min-h-screen py-20">
      <div className="relative w-full text-center overflow-hidden">
        {showConfetti && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
            {confettiPieces.map((piece) => (
              <span
                key={piece.id}
                className="absolute top-[-10%] block"
                style={
                  {
                    left: `${piece.left}%`,
                    width: `${piece.size}px`,
                    height: `${piece.size * 0.55}px`,
                    backgroundColor: piece.color,
                    animationName: "countdown-confetti-fall",
                    animationDuration: `${piece.duration}s`,
                    animationDelay: `${piece.delay}s`,
                    animationTimingFunction: "cubic-bezier(0.18, 0.9, 0.25, 1)",
                    animationFillMode: "forwards",
                    transform: "translateX(0px) rotate(0deg)",
                    "--confetti-drift": `${piece.drift}px`,
                    "--confetti-rotate": `${piece.rotate}deg`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        )}

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

      <style jsx>{`
        @keyframes countdown-confetti-fall {
          0% {
            transform: translate3d(0, -8vh, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--confetti-drift), 115vh, 0) rotate(var(--confetti-rotate));
            opacity: 0.95;
          }
        }
      `}</style>
    </SectionWrapper>
  );
}
