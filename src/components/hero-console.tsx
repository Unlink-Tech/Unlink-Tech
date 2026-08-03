"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CreditCard,
  Scale,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * The hero's right-hand figure: a console panel that cycles through each
 * product's headline number, with a sparkline that redraws on every change.
 *
 * The rotation pauses while the pointer is over the panel or focus is inside
 * it, so a reader can finish the number they are looking at, and the tabs are
 * a real tablist rather than decorative chips.
 */

const raised =
  "shadow-[6px_6px_14px_var(--neu-dark),-6px_-6px_14px_var(--neu-light)]";
const raisedSm =
  "shadow-[4px_4px_9px_var(--neu-dark),-4px_-4px_9px_var(--neu-light)]";
const inset =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";
const insetSm =
  "shadow-[inset_3px_3px_6px_var(--neu-dark),inset_-3px_-3px_6px_var(--neu-light)]";

type Product = {
  slug: string;
  name: string;
  icon: LucideIcon;
  metric: string;
  caption: string;
  /** Sparkline path, drawn in a 234 × 56 box. */
  spark: string;
};

const PRODUCTS: Product[] = [
  {
    slug: "merchant-onboarding",
    name: "Merchant Onboarding",
    icon: UserRoundCheck,
    metric: "−70%",
    caption: "Onboarding time",
    spark:
      "M0,46 L26,42 L52,44 L78,30 L104,34 L130,20 L156,24 L182,10 L208,14 L234,6",
  },
  {
    slug: "payment-gateway",
    name: "Payment Gateway",
    icon: CreditCard,
    metric: "10,000+",
    caption: "TPS at peak",
    spark:
      "M0,50 L26,36 L52,40 L78,22 L104,28 L130,26 L156,14 L182,18 L208,8 L234,4",
  },
  {
    slug: "cimmetri",
    name: "Cimmetri",
    icon: Scale,
    metric: "15 → 3",
    caption: "Days to month-end close",
    spark:
      "M0,40 L26,44 L52,30 L78,34 L104,18 L130,24 L156,12 L182,16 L208,10 L234,2",
  },
  // Enclave hidden for now.
  // {
  //   slug: "enclave",
  //   name: "Enclave",
  //   icon: BrainCircuit,
  //   metric: "100%",
  //   caption: "Claims cited to source",
  //   spark:
  //     "M0,52 L26,44 L52,46 L78,32 L104,36 L130,22 L156,26 L182,12 L208,16 L234,8",
  // },
];

const ROTATE_MS = 3600;

export function HeroConsole() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (held) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % PRODUCTS.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(id);
  }, [held]);

  const current = PRODUCTS[active];

  return (
    <div
      ref={rootRef}
      className="relative mx-auto w-full max-w-[460px]"
      // Hold the rotation while the panel is being read or operated.
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setHeld(false);
      }}
    >
      {/* soft brand halo behind the panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(99,102,241,0.18),transparent_70%)] blur-2xl dark:bg-[radial-gradient(60%_60%_at_50%_40%,rgba(129,140,248,0.2),transparent_70%)]"
      />

      <div
        className={`relative flex flex-col overflow-hidden rounded-3xl bg-background p-5 sm:p-6 ${raised}`}
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <Activity className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
            In production
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" />
            PCI-DSS L1
          </span>
        </div>

        {/* headline metric for the active product */}
        <div
          id={`console-panel-${current.slug}`}
          role="tabpanel"
          aria-labelledby={`console-tab-${current.slug}`}
          className={`mt-5 rounded-2xl bg-background px-5 py-5 sm:px-6 ${inset}`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {current.name}
          </p>
          <p className="mt-2 text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">
            <span className="shine-text">{current.metric}</span>
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
            {current.caption}
          </p>

          <svg
            viewBox="0 0 234 56"
            preserveAspectRatio="none"
            className="mt-5 h-14 w-full sm:h-16"
            aria-hidden
          >
            <defs>
              <linearGradient
                id="hero-console-fade"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  className="text-indigo-500 dark:text-indigo-400"
                  stopColor="currentColor"
                  stopOpacity="0.28"
                />
                <stop
                  offset="100%"
                  className="text-indigo-500 dark:text-indigo-400"
                  stopColor="currentColor"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
            {/* `key` remounts both nodes on change, replaying the draw */}
            <path
              key={`fill-${current.slug}`}
              d={`${current.spark} L234,56 L0,56 Z`}
              fill="url(#hero-console-fade)"
              className="animate-[fade-in_1.2s_ease-out] motion-reduce:animate-none"
            />
            <path
              key={`line-${current.slug}`}
              d={current.spark}
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              className="spark-draw stroke-indigo-500 dark:stroke-indigo-400"
            />
          </svg>
        </div>

        {/*
          A plain <div>, not a <ul>. ARIA requires a tablist's children to be
          tabs: wrapping each button in an <li> puts a listitem between them,
          which breaks both aria-required-children and aria-required-parent,
          and leaves the <li>s orphaned once role="tablist" overrides the list
          semantics of the <ul>.
        */}
        <div
          role="tablist"
          aria-label="Products"
          className="mt-4 grid grid-cols-2 gap-2"
        >
          {PRODUCTS.map((p, i) => {
            const Icon = p.icon;
            const on = i === active;
            return (
              <button
                key={p.slug}
                type="button"
                role="tab"
                id={`console-tab-${p.slug}`}
                aria-selected={on}
                aria-controls={`console-panel-${p.slug}`}
                onClick={() => setActive(i)}
                className={`flex h-full w-full cursor-pointer items-center gap-2 rounded-xl bg-background px-2.5 py-2.5 text-left transition-all ${
                  on ? insetSm : raisedSm
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${
                    on
                      ? "text-indigo-500 dark:text-indigo-400"
                      : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`truncate text-[11px] font-semibold leading-tight sm:text-xs ${
                    on ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {p.name}
                </span>
              </button>
            );
          })}
        </div>

        <Link
          href={`/products/${current.slug}`}
          className="group mt-4 inline-flex min-h-6 items-center gap-1.5 self-start text-[11px] font-semibold text-muted-foreground transition-colors hover:text-indigo-600 sm:text-xs dark:hover:text-indigo-400"
        >
          Explore {current.name}
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
