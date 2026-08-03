import Link from "next/link";
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { alignedTo, held } from "@/lib/compliance";
import { cn } from "@/lib/utils";

/**
 * Compliance bar — the credential strip directly under the hero.
 *
 * Two tiers, and keeping them apart is the entire point of the component. A
 * fintech buyer checks these claims, and one overstated badge costs more trust
 * than the whole strip earns:
 *
 *   • held      standards we have actually been audited or reviewed against
 *   • alignedTo frameworks we design and operate to, but hold no certificate
 *               for. Grouped under one visible "Aligned to" label rather than
 *               hedged badge by badge, so the qualifier cannot be skim-read.
 *
 * The tiers are also separated visually in the theme's own vocabulary: held
 * badges are raised and carry a tick, aligned ones are recessed and muted. If a
 * certification completes, move the string from `alignedTo` to `held` and it
 * changes tier on its own.
 *
 * Distinct from trust-strip.tsx, which is the track-record numbers.
 */

/** Neumorphic soft-shadow helpers, driven by the theme's --neu-* variables. */
const raisedSm =
  "shadow-[4px_4px_8px_var(--neu-dark),-4px_-4px_8px_var(--neu-light)]";
const insetXs =
  "shadow-[inset_3px_3px_6px_var(--neu-dark),inset_-3px_-3px_6px_var(--neu-light)]";

/* The two tiers come from lib/compliance.ts, shared with the proof band below
   the services so the page cannot state two different things about ISO 27001. */

export function ComplianceBar() {
  return (
    <section
      aria-label="Compliance and security posture"
      className="border-t border-border/60 bg-background"
    >
      <Reveal className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        {/* kicker */}
        <div className="flex items-center justify-center gap-2.5 lg:justify-start">
          <ShieldCheck className="h-4 w-4 shrink-0 text-indigo-500 dark:text-indigo-400" />
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Built to clear the reviews that stop most vendors
          </p>
        </div>

        {/* the strip: held first, then the aligned-to group behind its label */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:justify-start">
          <ul className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {held.map((name) => (
              <li
                key={name}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full bg-background px-3.5 py-2 text-xs font-medium text-foreground",
                  raisedSm,
                )}
              >
                <Check
                  className="h-3 w-3 shrink-0 text-indigo-500 dark:text-indigo-400"
                  strokeWidth={3}
                />
                {name}
              </li>
            ))}
          </ul>

          {/* One label governs the whole group: seven repeated hedges would read
              as apology, one qualifier reads as precision. */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 lg:justify-start">
            <span className="hidden h-6 w-px bg-border/70 sm:block" aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Aligned to
            </span>
            <ul className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              {alignedTo.map((name) => (
                <li
                  key={name}
                  className={cn(
                    "inline-flex items-center rounded-full bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground",
                    insetXs,
                  )}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* the invitation to verify, which is what the strip is really for */}
        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground lg:text-left">
          &ldquo;Aligned to&rdquo; means designed, built, and operated against
          the framework: we hold no certificate for it.{" "}
          <Link
            href="/contact"
            className="inline-flex items-center gap-0.5 font-medium text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
          >
            Ask us for the evidence
            <ArrowUpRight className="h-3 w-3" />
          </Link>
          .
        </p>
      </Reveal>
    </section>
  );
}
