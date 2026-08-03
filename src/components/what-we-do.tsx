"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Boxes, Check, ShieldCheck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AuroraCard } from "@/components/ui/aurora-card";
import { SectionHeading } from "@/components/section-heading";
import { useCountUp, useInView } from "@/lib/visual-motion";
import { cn } from "@/lib/utils";

/**
 * "Two ways in, held to one standard."
 *
 * The geometry is the argument. The headline promises two routes measured
 * against a single standard, so the two routes sit side by side and their
 * traces run down and merge into one gate beneath them. A row of three equal
 * cards is the one shape that cannot say this, which is what this replaced.
 *
 * The merge is routed as a trace rather than drawn as a curve: at this aspect
 * ratio a stretched SVG viewBox flattens a bezier into a shallow swoosh, where
 * square elbows stay crisp at any width. Below md the cards stack and the
 * elbows collapse to a single spine, since there is nothing left to converge.
 */

/** Neumorphic soft-shadow helpers, driven by the theme's --neu-* variables. */
const insetIcon =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";
const insetSm =
  "shadow-[inset_3px_3px_6px_var(--neu-dark),inset_-3px_-3px_6px_var(--neu-light)]";
const raised =
  "shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)]";

/** Inline emphasis for product names / standards inside the body copy. */
function Em({ children }: { children: ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>;
}

type Way = {
  icon: LucideIcon;
  /** Mono kicker naming the route itself. */
  kicker: string;
  /** Accent-coloured subject of the heading, then the remainder. */
  lead: string;
  rest: string;
  body: ReactNode;
  /** Where this route actually goes, so each card ends in a way in. */
  cta: { label: string; href: string };
};

const ways: Way[] = [
  {
    icon: Boxes,
    kicker: "Take what is built",
    lead: "Products",
    rest: " that deploy in weeks, not quarters.",
    body: (
      <>
        {/* Enclave hidden for now: restore it to this list when it returns. */}
        <Em>Merchant Onboarding</Em>, <Em>Payment Gateway</Em>, and{" "}
        <Em>Cimmetri</Em>{" "}
        (reconciliation &amp; exception management): proven
        infrastructure you deploy instead of building from scratch. Merchants
        live the same day. Payments accepted at scale. First reconciled run in
        days.
      </>
    ),
    cta: { label: "Explore the products", href: "/products" },
  },
  {
    icon: Wrench,
    kicker: "Or have it built",
    lead: "Engineering",
    rest: " for when no product fits.",
    body: (
      <>
        Payment and settlement platforms, AI/ML fraud and risk systems, KYC/KYB
        automation, MAS TRM and compliance technology, offline-first mobile
        commerce. Designed and shipped end to end, inside your regulatory
        environment, by{" "}
        <Em>the same team that built the products</Em>.
      </>
    ),
    cta: { label: "Scope a custom build", href: "/custom-engineering" },
  },
];

/**
 * The standards both routes are measured against.
 *
 * Kept as badges rather than run into the prose above: a reader scanning the
 * gate is looking for whether their own regime is on the list, and a list is
 * scannable where a sentence is not.
 */
const standards = ["PCI-DSS", "MAS TRM", "FEAT", "Regulator-grade audit trail"];

export function WhatWeDo() {
  const [ref, inView] = useInView<HTMLDivElement>();
  // Held back until the gate itself has opened, so the figure is the last thing
  // to move rather than one more element arriving with everything else.
  const accuracy = useCountUp(100, inView, 1400);
  const trace = "border-[rgb(var(--particle-rgb)/0.3)]";

  return (
    <section className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="How we work with you"
          title="Two ways in. One standard for both."
          className="mb-14"
        />

        <div ref={ref}>
          {/* ---- the two ways in ---- */}
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {ways.map(({ icon: Icon, kicker, lead, rest, body, cta }) => (
              <AuroraCard key={lead}>
                <div className="mb-6 flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background text-indigo-500 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400",
                      insetIcon,
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {kicker}
                  </span>
                </div>
                <h3 className="text-2xl font-bold leading-snug tracking-tight text-foreground">
                  <span className="shine-text">{lead}</span>
                  {rest}
                </h3>
                {/* flex-1 pushes both CTAs onto the same baseline, whichever
                    card's copy runs longer. */}
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                  {body}
                </p>
                <Link
                  href={cta.href}
                  className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
                >
                  {cta.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </AuroraCard>
            ))}
          </div>

          {/* ---- the merge, drawn top-down as one movement ---- */}
          <div className="relative hidden h-28 md:block" aria-hidden>
            <div
              className="absolute inset-0 transition-[clip-path] duration-[1100ms] ease-out motion-reduce:transition-none"
              style={{
                clipPath: inView ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
              }}
            >
              {/* Each route drops, then turns in toward the centre, and each
                  carries its own packet down to the junction. The two arrive
                  together, the spine packet below leaves half a cycle later, so
                  the merge is something you watch happen rather than infer. */}
              <span
                className={cn(
                  "absolute left-1/4 top-0 h-11 w-1/4 rounded-bl-2xl border-b border-l",
                  trace,
                )}
              >
                {inView && (
                  <span className="branch-clear-left absolute bottom-0 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-[rgb(var(--particle-rgb))] shadow-[0_0_10px_rgb(var(--particle-rgb)/0.85)] motion-reduce:hidden" />
                )}
              </span>
              <span
                className={cn(
                  "absolute left-1/2 top-0 h-11 w-1/4 rounded-br-2xl border-b border-r",
                  trace,
                )}
              >
                {inView && (
                  <span className="branch-clear-right absolute bottom-0 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-[rgb(var(--particle-rgb))] shadow-[0_0_10px_rgb(var(--particle-rgb)/0.85)] motion-reduce:hidden" />
                )}
              </span>

              {/* the junction, in the same idiom as the hero's switch nodes */}
              <span className="absolute left-1/2 top-11 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[rgb(var(--particle-rgb)/0.6)] bg-background" />

              {/* one shared spine into the gate, with a packet clearing down it */}
              <span className="absolute bottom-0 left-1/2 top-11 w-px -translate-x-1/2 bg-[linear-gradient(rgb(var(--particle-rgb)/0.3),rgb(var(--particle-rgb)/0.55))]">
                {inView && (
                  <span className="rail-spine-packet absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[rgb(var(--particle-rgb))] shadow-[0_0_10px_rgb(var(--particle-rgb)/0.85)] [animation-delay:1.2s] motion-reduce:hidden" />
                )}
              </span>
            </div>
          </div>

          {/* stacked, there is nothing to converge: just the spine */}
          <div className="relative h-12 md:hidden" aria-hidden>
            <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(rgb(var(--particle-rgb)/0.15),rgb(var(--particle-rgb)/0.5))]" />
          </div>

          {/* ---- the gate both routes pass through ---- */}
          <div
            className={cn(
              "relative overflow-hidden rounded-[1.75rem] bg-background p-8 sm:p-10",
              insetSm,
              "transition-all duration-700 ease-out motion-reduce:transition-none",
              inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: "700ms" }}
          >
            {/* the lit edge, sweeping to full width as the gate opens */}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-0 top-0 h-px origin-left bg-[linear-gradient(90deg,transparent,rgb(var(--particle-rgb)/0.7),transparent)] transition-transform duration-[1200ms] ease-out motion-reduce:transition-none",
                inView ? "scale-x-100" : "scale-x-0",
              )}
              style={{ transitionDelay: "900ms" }}
            />

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-14">
              <div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    One standard, either way
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-bold leading-snug tracking-tight text-foreground">
                  The standard that <span className="shine-text">doesn&apos;t move.</span>
                </h3>
                <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Every system we ship has to pass the audit, not just the demo.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {standards.map((s, i) => (
                    <li
                      key={s}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 text-xs font-medium text-foreground/80",
                        raised,
                        "transition-all duration-500 ease-out motion-reduce:transition-none",
                        inView
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-0",
                      )}
                      style={{ transitionDelay: `${1050 + i * 110}ms` }}
                    >
                      <Check
                        className="h-3 w-3 text-indigo-500 dark:text-indigo-400"
                        strokeWidth={3}
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:border-l lg:border-border/60 lg:pl-14">
                {/* Counts up on arrival: the figure is the claim, so it lands
                    last and under its own power rather than fading in with the
                    panel around it. */}
                <div className="shine-text text-5xl font-bold tracking-tight tabular-nums">
                  {accuracy.toFixed(0)}%
                </div>
                <p className="mt-2 max-w-[13rem] text-sm leading-relaxed text-muted-foreground">
                  Reconciliation you can defend to the cent, on $50M+ daily
                  volume.
                </p>
              </div>
            </div>

            {/* the closing beat: whichever route you took, the bar is the same */}
            <div
              className={cn(
                "mt-8 border-t border-border/60 pt-6 text-center",
                "transition-all duration-700 ease-out motion-reduce:transition-none",
                inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              )}
              style={{ transitionDelay: "1500ms" }}
            >
              <p className="text-lg font-medium tracking-tight text-foreground sm:text-xl">
                Buy or build.{" "}
                <span className="shine-text">Same bar.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
