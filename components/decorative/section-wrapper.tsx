"use client";

import { cn } from "@/lib/utils";
import { GridOverlay } from "./grid-overlay";
import { useStickyOffset } from "@/components/hooks/use-sticky-offset";

const variantStyles = {
  cream: "bg-primary-cream text-primary-black",
  pink: "bg-primary-pink text-primary-black",
  green: "bg-primary-green text-primary-black",
  purple: "bg-primary-green text-primary-black",
  lightPink: "bg-primary-pink text-primary-black",
  red: "bg-primary-pink text-primary-black",
  dark: "bg-primary-black text-primary-cream",
  light: "bg-neutral-light text-primary-black",
  // Legacy
  beige: "bg-primary-cream text-primary-black",
  yellow: "bg-primary-green text-primary-black",
} as const;

export function SectionWrapper({
  variant = "cream",
  grid = false,
  bordered = false,
  className,
  innerClassName,
  children,
  id,
}: {
  variant?: keyof typeof variantStyles;
  grid?: boolean;
  bordered?: boolean;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  id?: string;
}) {
  const { ref, topOffset } = useStickyOffset();

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "sticky w-full min-h-screen",
        variantStyles[variant],
        bordered && "border-t-4 border-b-4 border-primary-black",
        className,
      )}
      style={{ top: topOffset }}
    >
      {grid && <GridOverlay />}
      <div className={cn("relative mx-auto max-w-7xl px-6 py-20 md:py-28 lg:py-32", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
