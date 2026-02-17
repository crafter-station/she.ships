import { cn } from "@/lib/utils";
import { GridOverlay } from "./grid-overlay";

const variantStyles = {
  cream: "bg-primary-cream text-primary-black",
  pink: "bg-primary-pink text-primary-black",
  purple: "bg-secondary-purple text-white",
  lightPink: "bg-secondary-light-pink text-primary-black",
  red: "bg-secondary-red text-white",
  dark: "bg-primary-black text-white",
  light: "bg-neutral-light text-primary-black",
  // Legacy
  beige: "bg-primary-cream text-primary-black",
  yellow: "bg-sunny-yellow text-charcoal",
} as const;

export function SectionWrapper({
  variant = "cream",
  grid = false,
  bordered = false,
  className,
  children,
  id,
}: {
  variant?: keyof typeof variantStyles;
  grid?: boolean;
  bordered?: boolean;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        variantStyles[variant],
        bordered && "border-t-4 border-b-4 border-primary-black",
        className,
      )}
    >
      {grid && <GridOverlay />}
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 lg:py-32">
        {children}
      </div>
    </section>
  );
}
