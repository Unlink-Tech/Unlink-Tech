"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { alignedTo, held } from "@/lib/compliance";
import { useCountUp, useInView, useSequence } from "@/lib/visual-motion";
import { cn } from "@/lib/utils";

/**
 * Proof band — the four figures the business is actually held to.
 *
 * Deliberately only four. The /proof page carries the full fourteen-figure
 * statement; repeating that here would give every number equal weight and so
 * give none of them any. These are the four a buyer repeats to their own boss.
 *
 * The figures count up as the band opens, which is the one piece of motion the
 * section earns: a number that arrives at its value reads as measured, where a
 * number that fades in reads as typed. Everything else holds still.
 *
 * Certifications come from lib/compliance.ts, shared with the compliance bar
 * under the hero, and keep the same two tiers: cleared versus aligned to. See
 * the note in that file for why the distinction is load-bearing rather than
 * decorative.
 */

/** Neumorphic soft-shadow helpers, driven by the theme's --neu-* variables. */
const raised =
  "shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)]";
const raisedSm =
  "shadow-[4px_4px_8px_var(--neu-dark),-4px_-4px_8px_var(--neu-light)]";
const insetXs =
  "shadow-[inset_3px_3px_6px_var(--neu-dark),inset_-3px_-3px_6px_var(--neu-light)]";

const enter =
  "transition-all duration-500 ease-out motion-reduce:transition-none";

/**
 * Split from its formatting so the number itself can be counted to, the same
 * shape stats-ledger.tsx uses on /proof.
 */
type Figure = {
  num: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  metric: string;
};

const figures: Figure[] = [
  { num: 50, prefix: "$", suffix: "M+", metric: "Settled and reconciled, every day" },
  { num: 99.99, suffix: "%", decimals: 2, metric: "Uptime under real load" },
  { num: 10000, suffix: "+", metric: "TPS at peak throughput" },
  { num: 5, suffix: "+", metric: "Years in production under real regulators" },
];

/**
 * Named client references.
 *
 * INTENTIONALLY EMPTY, and the rail below renders nothing until it is filled.
 * A quote attributed to a real person at a real company is not something that
 * can be drafted on their behalf: it has to come from them, or from an approved
 * anonymised form they have signed off ("a licensed PSP in the UAE…").
 *
 * This is the highest-impact thing missing from the page. One real reference
 * beats every figure above it, because the figures are our claims and a
 * reference is somebody else's. Add two or three here and the rail appears.
 */
type Reference = {
  /** Named client, or an approved anonymised-but-specific descriptor. */
  attribution: string;
  /** Their words, not ours. */
  quote: string;
  /** Optional logo, as a path under /public. */
  logo?: string;
};

const references: Reference[] = [];

/** One figure, counted up once the band is live. */
function Counter({ figure, live }: { figure: Figure; live: boolean }) {
  const n = useCountUp(figure.num, live, 1300);
  const shown = live
    ? n.toLocaleString("en-US", {
        minimumFractionDigits: figure.decimals ?? 0,
        maximumFractionDigits: figure.decimals ?? 0,
      })
    : "0";
  return (
    <>
      {figure.prefix}
      {shown}
      {figure.suffix}
    </>
  );
}

export function ProofBand() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const step = useSequence(figures.length, inView, 140);

  return (
    <section className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Proof, not promises"
          title={
            <>
              Measurable Results from{" "}
              <span className="shine-text">Real-World Deployments</span>
            </>
          }
          className="mb-14"
        />

        <div ref={ref}>
          {/* ---- the four figures ---- */}
          <dl
            className={cn(
              "grid grid-cols-1 gap-y-10 rounded-3xl bg-background p-8 sm:grid-cols-2 sm:p-10 lg:grid-cols-4 lg:gap-y-0",
              raised,
            )}
          >
            {figures.map((f, i) => (
              <div
                key={f.metric}
                className={cn(
                  "text-center",
                  // Hairlines only where the columns actually sit side by side,
                  // or a stacked layout gets a rule hanging off its left edge.
                  i % 2 === 1 && "sm:border-l sm:border-border/60 sm:pl-8",
                  i === 2 && "lg:border-l lg:border-border/60 lg:pl-8",
                  i === 1 && "lg:pl-8",
                  enter,
                  step >= i ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
              >
                <dt className="shine-text text-4xl font-bold tracking-tight tabular-nums sm:text-[2.75rem]">
                  <Counter figure={f} live={step >= i} />
                </dt>
                <dd className="mx-auto mt-2.5 max-w-[14rem] text-sm leading-snug text-muted-foreground">
                  {f.metric}
                </dd>
              </div>
            ))}
          </dl>

          {/* ---- what has been cleared, and what has only been built to ---- */}
          <div
            className={cn(
              "mt-6 rounded-3xl bg-background p-6 sm:p-8",
              insetXs,
              enter,
              inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            )}
            style={{ transitionDelay: "700ms" }}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Cleared
              </span>
              <ul className="flex flex-wrap items-center justify-center gap-2">
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

              <span className="hidden h-6 w-px bg-border/70 sm:block" aria-hidden />

              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Aligned to
              </span>
              <ul className="flex flex-wrap items-center justify-center gap-2">
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

          {/* ---- client references, once there are any to show ---- */}
          {references.length > 0 && (
            <ul className="mt-6 grid gap-6 md:grid-cols-3">
              {references.map((r) => (
                <li
                  key={r.attribution}
                  className={cn(
                    "flex h-full flex-col rounded-3xl bg-background p-7",
                    raised,
                  )}
                >
                  <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <p className="mt-5 text-xs text-muted-foreground">
                    {r.attribution}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <p
            className={cn(
              "mt-8 text-center text-sm text-muted-foreground",
              enter,
              inView ? "opacity-100" : "opacity-0",
            )}
            style={{ transitionDelay: "900ms" }}
          >
            Every figure above is measured in production, not modelled.{" "}
            <Link
              href="/proof"
              className="inline-flex items-center gap-0.5 font-medium text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
            >
              See how each one was earned
              <ArrowUpRight className="h-3 w-3" />
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
