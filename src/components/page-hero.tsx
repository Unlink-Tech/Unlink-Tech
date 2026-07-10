import type { ReactNode } from "react";
import { HeroBackground } from "@/components/hero-background";
import { Breadcrumb } from "@/components/breadcrumb";

/**
 * Reusable inner-page header — a dynamic breadcrumb, eyebrow, title and
 * optional subtitle over the same aurora + grid background as the home hero.
 * Drop this at the top of any inner page.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background">
      <HeroBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
        <Breadcrumb />

        {eyebrow && (
          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-balance text-foreground sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
