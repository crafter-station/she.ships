import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-bold uppercase tracking-wide transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 brutalist-button",
  {
    variants: {
      variant: {
        default: "bg-primary-black text-primary-cream hover:bg-primary-black/90",
        pink: "bg-primary-pink text-primary-black hover:bg-primary-pink/90",
        green: "bg-primary-green text-primary-black hover:bg-primary-green/90",
        purple: "bg-primary-green text-primary-black hover:bg-primary-green/90",
        red: "bg-primary-pink text-primary-black hover:bg-primary-pink/90",
        outline: "bg-primary-cream text-primary-black hover:bg-neutral-light",
        ghost: "border-0 shadow-none hover:bg-neutral-light",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-11 px-8 py-2 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
