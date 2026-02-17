import { cn } from "@/lib/utils";
import { GridOverlay } from "./grid-overlay";

const variantStyles = {
  light: "bg-off-white text-charcoal",
  dark: "bg-charcoal text-off-white",
  beige: "bg-warm-beige text-charcoal",
  pink: "bg-hot-pink text-charcoal",
  yellow: "bg-sunny-yellow text-charcoal",
} as const;

export function SectionWrapper({
  variant = "light",
  grid = false,
  className,
  children,
  id,
}: {
  variant?: keyof typeof variantStyles;
  grid?: boolean;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative w-full", variantStyles[variant], className)}
    >
      {grid && <GridOverlay />}
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 lg:py-32">
        {children}
      </div>
    </section>
  );
}
