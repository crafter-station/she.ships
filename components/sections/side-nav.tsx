"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "hero", label: "Ship" },
  { id: "countdown", label: "Countdown" },
  { id: "what-is-sheships", label: "About" },
  { id: "agenda", label: "Agenda" },
  { id: "categories", label: "Categories" },
  { id: "faq", label: "FAQ" },
  { id: "organizers", label: "Organizers" },
] as const;

/**
 * Computes the scroll-position boundaries for each section.
 * Each section "starts" at the cumulative height of all preceding sections.
 */
function getSectionBoundaries() {
  const boundaries: { id: string; start: number }[] = [];
  let cumulative = 0;

  for (const section of SECTIONS) {
    boundaries.push({ id: section.id, start: cumulative });
    const el = document.getElementById(section.id);
    if (el) cumulative += el.offsetHeight;
  }

  return boundaries;
}

export function SideNav() {
  const [activeId, setActiveId] = useState<string>("hero");
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();
  const boundariesRef = useRef<{ id: string; start: number }[]>([]);

  // Recompute boundaries when sections resize (accordion, window resize)
  useEffect(() => {
    const recompute = () => {
      boundariesRef.current = getSectionBoundaries();
    };

    recompute();

    // Observe all section elements for size changes
    const observer = new ResizeObserver(recompute);
    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    window.addEventListener("resize", recompute);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, []);

  // Determine active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setVisible(scrollY > window.innerHeight * 0.3);

      // Find the last section whose start position is <= viewportMiddle
      const viewportMiddle = scrollY + window.innerHeight * 0.4;
      const boundaries = boundariesRef.current;
      let active = boundaries[0]?.id ?? "hero";
      for (const b of boundaries) {
        if (b.start <= viewportMiddle) {
          active = b.id;
        } else {
          break;
        }
      }
      setActiveId(active);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback(
    (id: string) => {
      // Sum heights of all preceding sections to get the scroll target
      let position = 0;
      for (const section of SECTIONS) {
        if (section.id === id) break;
        const el = document.getElementById(section.id);
        if (el) position += el.offsetHeight;
      }
      if (lenis) {
        lenis.scrollTo(position);
      } else {
        window.scrollTo({ top: position, behavior: "smooth" });
      }
    },
    [lenis],
  );

  return (
    <nav
      className={cn(
        "fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-start gap-0 transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      {SECTIONS.map((section, i) => {
        const isActive = activeId === section.id;
        const isLast = i === SECTIONS.length - 1;

        return (
          <div key={section.id} className="flex flex-col items-start">
            {/* Dot row */}
            <button
              type="button"
              onClick={() => scrollTo(section.id)}
              className="group flex items-center gap-3 py-1.5"
            >
              {/* Dot */}
              <span
                className={cn(
                  "block rounded-full transition-all duration-300",
                  isActive
                    ? "size-3 bg-primary-pink shadow-[0_0_8px_var(--primary-pink)]"
                    : "size-2 bg-white/30 group-hover:bg-white/60",
                )}
              />
              {/* Label */}
              <span
                className={cn(
                  "font-[family-name:var(--font-title)] text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
                  isActive
                    ? "text-primary-pink opacity-100 translate-x-0"
                    : "text-white/40 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0",
                )}
              >
                {section.label}
              </span>
            </button>

            {/* Connecting line */}
            {!isLast && (
              <div className="ml-[5px] w-px h-3 bg-white/15" />
            )}
          </div>
        );
      })}
    </nav>
  );
}
