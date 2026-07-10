import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Neumorphic (soft UI) button — the project-wide button.
 * Shadows are driven by the --neu-dark / --neu-light CSS variables, so the same
 * component adapts to light and dark automatically.
 *
 * variant: primary | neutral | ghost | icon
 * size:    sm | md | lg | icon
 * active:  render permanently pressed-in (e.g. the current page's nav item)
 */

// Paired soft shadows, resolved from theme variables.
const RAISED =
  "shadow-[5px_5px_10px_var(--neu-dark),-5px_-5px_10px_var(--neu-light)]";
const PRESSED =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";
const PRESS_ON_CLICK =
  "active:shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";

const neuButtonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-semibold whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-br from-indigo-500 to-violet-600 text-white hover:brightness-105 active:brightness-95",
        neutral:
          "bg-background text-foreground hover:text-indigo-600 dark:hover:text-indigo-400",
        ghost:
          "bg-transparent text-foreground/80 hover:text-foreground",
        icon: "bg-background text-foreground/80 hover:text-foreground",
      },
      size: {
        sm: "h-9 rounded-xl px-4 text-sm",
        md: "h-11 rounded-2xl px-6 text-sm",
        lg: "h-14 rounded-2xl px-7 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: { variant: "neutral", size: "md" },
  },
);

type NeuButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof neuButtonVariants> & {
    asChild?: boolean;
    /** Render in the pressed-in state (e.g. active nav item). */
    active?: boolean;
  };

function neuShadow(variant: NeuButtonProps["variant"], active: boolean) {
  if (active) {
    // Pressed-in pocket. Ghost gets a surface fill + accent text to read as "here".
    return variant === "ghost"
      ? cn(PRESSED, "bg-background text-indigo-600 dark:text-indigo-400")
      : PRESSED;
  }
  // Ghost is flat until clicked; solid variants sit raised and press on click.
  return variant === "ghost" ? PRESS_ON_CLICK : cn(RAISED, PRESS_ON_CLICK);
}

function NeuButton({
  className,
  variant = "neutral",
  size = "md",
  asChild = false,
  active = false,
  ...props
}: NeuButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="neu-button"
      data-variant={variant}
      data-active={active || undefined}
      className={cn(
        neuButtonVariants({ variant, size }),
        neuShadow(variant, active),
        className,
      )}
      {...props}
    />
  );
}

export { NeuButton, neuButtonVariants };
