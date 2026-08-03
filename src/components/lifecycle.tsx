"use client";

import Link from "next/link";
import { ArrowRight, Check, CreditCard, Scale, UserRoundCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AuroraCard } from "@/components/ui/aurora-card";
import { SectionHeading } from "@/components/section-heading";
import { useInView, useSequence } from "@/lib/visual-motion";
import { cn } from "@/lib/utils";

/**
 * The lifecycle — one transaction travelling the whole path we own.
 *
 * The claim is that the three products are one continuous record rather than
 * three tools you stitch together, so the section is built as a rail instead of
 * three cards in a row. A rail cannot be read as separate pieces: it has a
 * direction, the stations sit on it, and the record at the bottom collects a
 * stamp at each one. By the time it reaches the end it is carrying all three,
 * which is the argument stated as geometry rather than as adjectives.
 *
 * Motion is the site's "live instrument" treatment (see lib/visual-motion.ts):
 * the rail clears once as the section scrolls in, station by station, at a
 * cadence slow enough to read as travel. The leading edge of the progress line
 * IS the packet, so nothing decorative is moving that the argument does not
 * need. Once it has arrived, a single ambient packet keeps clearing the rail,
 * because transactions keep flowing. Under reduced motion the sequence resolves
 * instantly to its finished state and the ambient loop never starts.
 */

/** Neumorphic soft-shadow helpers, driven by the theme's --neu-* variables. */
const inset =
  "shadow-[inset_5px_5px_10px_var(--neu-dark),inset_-5px_-5px_10px_var(--neu-light)]";
const insetIcon =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";
const insetXs =
  "shadow-[inset_3px_3px_6px_var(--neu-dark),inset_-3px_-3px_6px_var(--neu-light)]";

/** Shared enter transition for anything that lands as its stage completes. */
const enter =
  "transition-all duration-700 ease-out motion-reduce:transition-none";

type Station = {
  /** Stage number, shown as the mono kicker. */
  n: string;
  icon: LucideIcon;
  verb: string;
  copy: string;
  product: string;
  href: string;
  /** What this stage writes onto the record as the transaction clears it. */
  stamp: { label: string; value: string };
};

const stations: Station[] = [
  {
    n: "01",
    icon: UserRoundCheck,
    verb: "Onboard",
    copy: "Get compliant merchants transacting the same day.",
    product: "Merchant Onboarding",
    href: "/products/merchant-onboarding",
    stamp: { label: "KYC/KYB cleared", value: "same day" },
  },
  {
    n: "02",
    icon: CreditCard,
    verb: "Accept",
    copy: "Take payments at scale with intelligent routing and fast settlement.",
    product: "Payment Gateway",
    href: "/products/payment-gateway",
    stamp: { label: "Authorised", value: "routed, settled" },
  },
  {
    n: "03",
    icon: Scale,
    verb: "Reconcile",
    copy: "Match every rupee across gateways, banks, and ledgers, and hand auditors a ready package.",
    product: "Cimmetri",
    href: "/products/cimmetri",
    stamp: { label: "Matched to the cent", value: "audit pack ready" },
  },
];

/** Node centres of a three-column grid, as percentages across the row. */
const NODE_LEFT = ["16.666%", "50%", "83.333%"];
/** How far the progress line has cleared once each stage lands. */
const PROGRESS = ["0%", "50%", "100%"];

export function Lifecycle() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const step = useSequence(stations.length, inView, 620);
  const arrived = step >= stations.length - 1;

  return (
    <section className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="One transaction, end to end"
          /* Markup rather than a plain string, so shineFocusWord leaves it
             alone and all three stages carry the highlight, not just the last
             word. Delays stagger the gleam into reading order, the same way the
             hero staggers its two highlights. */
          title={
            <>
              <span className="shine-text">Onboard.</span>{" "}
              <span className="shine-text" style={{ animationDelay: "0.35s" }}>
                Accept.
              </span>{" "}
              <span className="shine-text" style={{ animationDelay: "0.7s" }}>
                Reconcile.
              </span>{" "}
              We own all{" "}
              <span className="shine-text" style={{ animationDelay: "1.05s" }}>
                three.
              </span>
            </>
          }
          subtitle="Most vendors sell you one slice and leave the seams for you to stitch. We built the whole path a transaction travels, so the merchant you onboarded, the payment you accepted, and the settlement you reconciled are one continuous, auditable record."
          className="mb-16"
        />

        <div ref={ref}>
          {/* ---- the rail, from md up: the transaction clears it station by
                  station, and the leading edge of the line is the packet ---- */}
          <div className="relative mb-8 hidden h-14 md:block" aria-hidden>
            {/* the unlit rail, spanning first node to last */}
            <span className="absolute inset-x-[16.666%] top-1/2 h-px -translate-y-1/2 bg-[rgb(var(--particle-rgb)/0.18)]">
              {/* the part that has cleared */}
              <span
                className={cn(
                  "absolute inset-y-0 left-0 bg-[linear-gradient(90deg,rgb(var(--particle-rgb)/0.35),rgb(var(--particle-rgb)/0.85))] transition-[width] duration-[600ms] ease-out motion-reduce:transition-none",
                )}
                style={{ width: PROGRESS[Math.max(0, step)] ?? "0%" }}
              >
                {/* the packet: the leading edge itself, not a separate sprite */}
                <span
                  className={cn(
                    "absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-[rgb(var(--particle-rgb))] shadow-[0_0_12px_rgb(var(--particle-rgb)/0.9)]",
                    enter,
                    step >= 0 && !arrived ? "opacity-100" : "opacity-0",
                  )}
                />
              </span>

              {/* once it has arrived, traffic keeps clearing the same rail */}
              {arrived && (
                <span className="rail-travel absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[rgb(var(--particle-rgb))] shadow-[0_0_10px_rgb(var(--particle-rgb)/0.85)] motion-reduce:hidden" />
              )}
            </span>

            {/* the stations themselves, in the hero's switch-node idiom, each
                dropping a tap into the card below so the rail visibly feeds the
                stations instead of floating above them */}
            {stations.map((s, i) => (
              <span key={s.n}>
                <span
                  className={cn(
                    "absolute top-1/2 h-[3.75rem] w-px -translate-x-1/2 bg-[linear-gradient(rgb(var(--particle-rgb)/0.45),transparent)]",
                    enter,
                    step >= i ? "opacity-100" : "opacity-0",
                  )}
                  style={{ left: NODE_LEFT[i] }}
                />
                <span
                  className={cn(
                    "absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border bg-background",
                    enter,
                    step >= i
                      ? "border-[rgb(var(--particle-rgb))] bg-[rgb(var(--particle-rgb))]"
                      : "border-[rgb(var(--particle-rgb)/0.35)]",
                    // Only the stage that just landed pulses, so the halo marks
                    // arrival rather than decorating all three at once.
                    step === i && !arrived && "step-halo",
                  )}
                  style={{ left: NODE_LEFT[i] }}
                />
              </span>
            ))}
          </div>

          {/* ---- the three stations ---- */}
          <ol className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {stations.map((s, i) => {
              const { icon: Icon } = s;
              const live = step >= i;
              return (
                /* The assemble transition lives on the li and the hover
                   treatment inside AuroraCard, so the 700ms arrival and the
                   300ms lift never have to share one transition declaration. */
                <li
                  key={s.n}
                  className={cn(
                    "relative",
                    enter,
                    live ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                  )}
                >
                  {/* stacked, the rail collapses to a spine between cards */}
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="absolute -top-6 left-1/2 h-6 w-px -translate-x-1/2 bg-[rgb(var(--particle-rgb)/0.3)] md:hidden"
                    />
                  )}

                  <AuroraCard className="p-7 sm:p-8">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background text-indigo-500 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400",
                          insetIcon,
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        Stage {s.n}
                      </span>
                    </div>

                    <h3 className="mt-6 flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground">
                      <span className="shine-text">{s.verb}</span>
                      {/* The stage arrow advances on hover: the card is a leg of
                          the journey, so hovering it should move you along. */}
                      <ArrowRight
                        className="h-5 w-5 text-indigo-500/70 transition-transform duration-300 group-hover:translate-x-1 dark:text-indigo-400/70"
                        aria-hidden
                      />
                    </h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                      {s.copy}
                    </p>

                    <Link
                      href={s.href}
                      className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-indigo-600 underline-offset-4 transition-colors hover:underline dark:text-indigo-400"
                    >
                      {s.product}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </AuroraCard>
                </li>
              );
            })}
          </ol>

          {/* ---- the payoff: the single record all three stages wrote to ---- */}
          <div className={cn("mt-8 rounded-3xl bg-background p-6 sm:p-8", inset)}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                One record, carried end to end
              </span>
              <span className="font-mono text-[11px] tracking-tight text-muted-foreground tabular-nums">
                TXN&middot;SG-90412
              </span>
            </div>

            <ol className="mt-5 grid gap-2 sm:grid-cols-3">
              {stations.map((s, i) => (
                <li
                  key={s.n}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2.5 font-mono text-[11px] leading-tight",
                    insetXs,
                    enter,
                    step >= i
                      ? "translate-y-0 bg-indigo-500/10 text-indigo-600 opacity-100 dark:bg-indigo-400/10 dark:text-indigo-300"
                      : "translate-y-1 bg-background text-muted-foreground opacity-0",
                  )}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <Check className="h-3 w-3 shrink-0" strokeWidth={3} />
                  <span className="min-w-0 truncate">
                    {s.stamp.label}
                    <span className="text-muted-foreground"> · {s.stamp.value}</span>
                  </span>
                </li>
              ))}
            </ol>

            <p
              className={cn(
                "mt-6 text-center text-base leading-relaxed text-muted-foreground sm:text-lg",
                enter,
                arrived ? "opacity-100" : "opacity-0",
              )}
              style={{ transitionDelay: "200ms" }}
            >
              Take one. Take all three.{" "}
              <span className="font-medium text-foreground">
                They&apos;re built to work alone or as one system.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
