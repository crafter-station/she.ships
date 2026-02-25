"use client";

import { useRef, useState, useEffect, useCallback } from "react";

/**
 * Computes a negative sticky offset for sections taller than the viewport.
 *
 * For a section of height H and viewport height V:
 * - If H <= V: top = 0 (normal sticky behavior)
 * - If H > V:  top = -(H - V)
 *
 * This makes the section scroll through its full content while stuck,
 * showing the bottom edge aligned to the viewport bottom by the time
 * the next section arrives.
 *
 * Recalculates on:
 * - Element resize (ResizeObserver — covers accordion, dynamic content)
 * - Window resize (viewport height change)
 */
export function useStickyOffset() {
  const ref = useRef<HTMLElement>(null);
  const [topOffset, setTopOffset] = useState(0);

  const recalculate = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const sectionHeight = el.offsetHeight;
    const viewportHeight = window.innerHeight;

    if (sectionHeight > viewportHeight) {
      setTopOffset(-(sectionHeight - viewportHeight));
    } else {
      setTopOffset(0);
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initial calculation
    recalculate();

    // Watch element size changes (accordion open/close, dynamic content)
    const resizeObserver = new ResizeObserver(() => {
      recalculate();
    });
    resizeObserver.observe(el);

    // Watch viewport size changes
    window.addEventListener("resize", recalculate);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", recalculate);
    };
  }, [recalculate]);

  return { ref, topOffset };
}
