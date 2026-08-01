"use client";

import { Check, FileText, Lock, ShieldCheck, Zap } from "lucide-react";
import { useCountUp, useInView, useSequence } from "@/lib/visual-motion";
import { cn } from "@/lib/utils";

/**
 * Product visuals — a small, honest mock of each product's actual working
 * surface, drawn in markup rather than shipped as a screenshot.
 *
 * Drawn rather than photographed for three reasons: they stay sharp at any
 * size, they re-theme with the rest of the site instead of baking a light or
 * dark background into a PNG, and they cost nothing to keep truthful when a
 * number changes. Each fills its container, so any showcase layout can drop one
 * into its visual slot — and a real screenshot can replace one later without
 * touching the layout around it.
 *
 * Motion is the "live instrument" treatment: the panel assembles once as it
 * scrolls into view, working through its rows in the order the real system
 * would, then a single ambient loop keeps running on whatever is genuinely
 * still in flight. See lib/visual-motion.ts.
 */

/** Neumorphic helpers, matching the rest of the site's soft-UI surfaces. */
const raised =
  "shadow-[4px_4px_8px_var(--neu-dark),-4px_-4px_8px_var(--neu-light)]";
const inset =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";
const insetXs =
  "shadow-[inset_3px_3px_6px_var(--neu-dark),inset_-3px_-3px_6px_var(--neu-light)]";

/** Shared enter transition for a row that lands as its step completes. */
const enter =
  "transition-all duration-500 ease-out motion-reduce:transition-none";

export type VisualProps = { className?: string };

/** Shared frame: every visual sits in the same padded, inset well. */
function Well({
  children,
  label,
  meta,
  className,
}: VisualProps & {
  children: React.ReactNode;
  label: string;
  meta?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "w-full rounded-3xl bg-background p-5 sm:p-6",
        inset,
        className,
      )}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
        {meta}
      </div>
      {children}
    </div>
  );
}

/** A small pill of monospaced record text. */
function Row({
  children,
  tone = "plain",
  className,
}: {
  children: React.ReactNode;
  tone?: "plain" | "matched" | "exception";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-11 items-center gap-2 rounded-lg px-2.5 font-mono text-[10px] leading-tight sm:h-9 sm:px-3 sm:text-[11px] sm:whitespace-nowrap",
        tone === "plain" && `bg-background text-muted-foreground ${insetXs}`,
        tone === "matched" &&
          "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300",
        tone === "exception" &&
          "bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * One ledger entry: reference and amount on one line from sm up, stacked
 * below it. `min-w-0` is what lets either half actually shrink; without it a
 * flex item keeps min-width:auto and pushes the whole card wider than itself.
 */
function Cell({ reference, amount }: { reference: string; amount: string }) {
  return (
    <span className="flex min-w-0 flex-col sm:flex-row sm:items-center sm:gap-1">
      <span className="min-w-0 truncate">{reference}</span>
      <span aria-hidden className="hidden sm:inline">
        ·
      </span>
      <span className="min-w-0 truncate tabular-nums">{amount}</span>
    </span>
  );
}

/* ---------------------------------------------------------------------------
   Cimmetri — two ledgers matching each other.

   The crossed connectors are the whole point: statement lines rarely arrive in
   the same order as the ledger, and matching them is the work. One line is left
   dashed and unmatched, because a reconciliation view that never shows an
   exception is not showing the job.

   Motion: the matches are made one at a time, top to bottom, and the one that
   never matches keeps its dashes marching afterwards.
   ------------------------------------------------------------------------- */

/**
 * Split into reference and amount so a phone can stack them.
 *
 * Side by side these are ~20 monospace characters in a column that is only
 * ~114px wide on a 393px screen, which truncates the amounts: exactly the
 * figures a reconciliation readout exists to show. Two lines below sm keeps
 * every figure at any width, instead of tuning font size against a column
 * width that was always going to lose.
 */
const BANK: [string, string][] = [
  ["ACH 4471", "12,480.00"],
  ["WIRE 88", "4,215.60"],
  ["CARD 2210", "986.40"],
  ["ACH 4472", "7,310.00"],
];
const LEDGER: [string, string][] = [
  ["INV-2041", "12,480.00"],
  ["INV-2038", "986.40"],
  ["INV-2044", "4,215.60"],
  ["unmatched", "7,310.00"],
];
/** Which ledger row each bank row settles against; the last one has no pair. */
const PAIRS = [0, 2, 1];

/** Row pitch: 36px row + 8px gap, so the connectors line up with the rows. */
const PITCH = 44;
const ROW_MID = 18;

export function CimmetriVisual({ className }: VisualProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  // four rows to land, then the three matches are drawn against the same clock
  const step = useSequence(BANK.length, inView, 260);
  const matched = useCountUp(99.4, inView, 1400);

  return (
    <div ref={ref} className={className}>
      <Well
        label="Month-end close"
        meta={
          <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300">
            Day 3 of 3
          </span>
        }
      >
        <div className="grid grid-cols-[minmax(0,1fr)_26px_minmax(0,1fr)] gap-x-1.5 sm:grid-cols-[minmax(0,1fr)_44px_minmax(0,1fr)] sm:gap-x-2">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Bank statement
          </div>
          <div />
          <div className="mb-2 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Ledger
          </div>

          <div className="space-y-2">
            {BANK.map(([ref, amt], i) => (
              <Row
                key={ref}
                tone={i === 3 ? "exception" : "matched"}
                className={cn(
                  enter,
                  step >= i
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-2 opacity-0",
                )}
              >
                <Cell reference={ref} amount={amt} />
              </Row>
            ))}
          </div>

          {/* connectors */}
          <svg
            viewBox={`0 0 44 ${PITCH * 4}`}
            className="h-full w-full overflow-visible"
            // The rows are taller on a phone (two lines), so the curve has to
            // stretch with them rather than scale uniformly and drift off the
            // row centres.
            preserveAspectRatio="none"
            aria-hidden
          >
            {PAIRS.map((to, from) => (
              <path
                key={from}
                d={`M0 ${ROW_MID + from * PITCH} C 22 ${ROW_MID + from * PITCH}, 22 ${
                  ROW_MID + to * PITCH
                }, 44 ${ROW_MID + to * PITCH}`}
                fill="none"
                className="stroke-indigo-500 transition-[stroke-dashoffset] duration-500 ease-out motion-reduce:transition-none dark:stroke-indigo-400"
                strokeWidth="1.5"
                opacity="0.75"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={step >= from ? 0 : 1}
              />
            ))}
            {/* the one that never matches: still marching, still queued */}
            <path
              d={`M0 ${ROW_MID + 3 * PITCH} L 44 ${ROW_MID + 3 * PITCH}`}
              fill="none"
              className={cn(
                "stroke-amber-500 transition-opacity duration-500 dark:stroke-amber-400",
                step >= 3 ? "opacity-80 dash-march" : "opacity-0",
              )}
              strokeWidth="1.5"
              strokeDasharray="3 4"
            />
          </svg>

          <div className="space-y-2">
            {LEDGER.map(([ref, amt], i) => (
              <Row
                key={ref}
                tone={i === 3 ? "exception" : "matched"}
                className={cn(
                  enter,
                  step >= i
                    ? "translate-x-0 opacity-100"
                    : "translate-x-2 opacity-0",
                )}
              >
                <Cell reference={ref} amount={amt} />
              </Row>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "mt-5 flex items-center justify-between gap-3 rounded-xl bg-background px-4 py-3 text-xs",
            enter,
            step >= BANK.length - 1 ? "opacity-100" : "opacity-0",
          )}
        >
          <span className="flex items-center gap-2 text-muted-foreground">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-300">
              <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
            </span>
            <span className="tabular-nums">{matched.toFixed(1)}%</span>{" "}
            auto-matched
          </span>
          <span className="breathe text-amber-600 dark:text-amber-400">
            1 exception queued
          </span>
        </div>
      </Well>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Enclave — an answer that carries its sources.

   Motion: the answer arrives, then its sources are produced one at a time,
   which is the claim: nothing is asserted before it can be cited.
   ------------------------------------------------------------------------- */

const SOURCES = [
  { n: 1, doc: "Q3 Exposure Register.xlsx", loc: "tab 3, rows 41–58" },
  { n: 2, doc: "Counterparty Risk Policy v4.pdf", loc: "p. 12, §4.2" },
];

export function EnclaveVisual({ className }: VisualProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const step = useSequence(SOURCES.length + 2, inView, 420);

  return (
    <div ref={ref} className={className}>
      <Well
        label="Enclave"
        meta={
          <span className="flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-2.5 py-1 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300">
            <Lock className="h-3 w-3" />
            In your VPC
          </span>
        }
      >
        <div
          className={`rounded-xl bg-background px-4 py-3 text-xs ${insetXs}`}
        >
          <span className="text-muted-foreground">
            Which counterparties breach the 2% exposure cap this quarter?
          </span>
        </div>

        <div
          className={cn(
            "mt-4 text-sm leading-relaxed text-foreground/90",
            enter,
            step >= 0 ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
          )}
        >
          Three counterparties exceed the cap: Meridian (2.8%), Halberd (2.4%)
          and Corvus (2.1%)
          <Cite n={1} />. All three were flagged before quarter close and carry
          an approved exception memo
          <Cite n={2} />.
          {/* the answer stays open, the way a console prompt does */}
          <span
            aria-hidden
            className="caret-blink ml-0.5 inline-block h-3.5 w-px translate-y-0.5 bg-indigo-500 dark:bg-indigo-400"
          />
        </div>

        <div className="mt-5 space-y-2">
          {SOURCES.map((s, i) => (
            <div
              key={s.n}
              className={cn(
                "flex items-center gap-3 rounded-lg bg-background px-3 py-2.5",
                insetXs,
                enter,
                step >= i + 1
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0",
              )}
            >
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-indigo-500/15 text-[10px] font-bold text-indigo-600 dark:text-indigo-300">
                {s.n}
              </span>
              <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="min-w-0 truncate text-[11px] text-foreground/80">
                {s.doc}
              </span>
              <span className="ml-auto shrink-0 font-mono text-[10px] text-muted-foreground">
                {s.loc}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {["Every claim cited", "No data egress", "Answer in 1.4s"].map(
            (b, i) => (
              <span
                key={b}
                className={cn(
                  "rounded-full bg-background px-3 py-1.5 text-[10px] font-medium text-muted-foreground",
                  raised,
                  enter,
                  step >= SOURCES.length + 1
                    ? "translate-y-0 opacity-100"
                    : "translate-y-1 opacity-0",
                )}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                {b}
              </span>
            ),
          )}
        </div>
      </Well>
    </div>
  );
}

/** Inline superscript citation marker. */
function Cite({ n }: { n: number }) {
  return (
    <sup className="ml-0.5 rounded bg-indigo-500/15 px-1 py-0.5 text-[9px] font-bold text-indigo-600 dark:text-indigo-300">
      {n}
    </sup>
  );
}

/* ---------------------------------------------------------------------------
   Payment Gateway — throughput, and where it is being routed.

   Motion: the day plots itself left to right and the counter runs up to the
   live figure; afterwards the peak of the day keeps breathing, because that
   is the part still moving.
   ------------------------------------------------------------------------- */

/** A day of throughput, normalised 0–1. Shaped, not random, so it reads real. */
const TPS_BARS = [
  0.28, 0.34, 0.31, 0.42, 0.55, 0.49, 0.61, 0.72, 0.68, 0.81, 0.93, 1, 0.88,
  0.76, 0.83, 0.71, 0.64, 0.58, 0.66, 0.52, 0.45, 0.39, 0.33, 0.3,
];

const ROUTES = [
  { name: "Acquirer A", rate: 99.98, tag: "primary" },
  { name: "Acquirer B", rate: 99.71, tag: "failover" },
  { name: "Local rail", rate: 99.4, tag: "domestic" },
];

/** Per-bar delay, and so how long the whole day takes to plot. */
const BAR_STEP_MS = 34;
const PLOT_MS = TPS_BARS.length * BAR_STEP_MS;

export function GatewayVisual({ className }: VisualProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const tps = useCountUp(10240, inView, 1300);

  return (
    <div ref={ref} className={className}>
      <Well
        label="Live throughput"
        meta={
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="breathe h-1.5 w-1.5 rounded-full bg-emerald-500" />
            All rails healthy
          </span>
        }
      >
        <div className="flex items-baseline gap-2">
          <span className="shine-text text-3xl font-bold tracking-tight tabular-nums">
            {Math.round(tps).toLocaleString("en-US")}
          </span>
          <span className="text-xs text-muted-foreground">TPS now</span>
          <span className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground">
            <Zap className="h-3 w-3" />
            peak 10,000+
          </span>
        </div>

        {/* 24h throughput. Heights animate rather than transforms, so the
            rounded caps stay round instead of squashing on the way up. */}
        <div className="mt-4 flex h-24 items-end gap-[3px]">
          {TPS_BARS.map((v, i) => {
            const peak = v > 0.85;
            return (
              <span
                key={i}
                style={{
                  height: inView ? `${Math.round(v * 100)}%` : "0%",
                  transitionDelay: `${i * BAR_STEP_MS}ms`,
                }}
                className={cn(
                  "flex-1 rounded-sm transition-[height] duration-500 ease-out motion-reduce:transition-none",
                  peak
                    ? "bg-gradient-to-t from-indigo-500 to-violet-500"
                    : "bg-indigo-500/25 dark:bg-indigo-400/25",
                  peak && "breathe",
                )}
              />
            );
          })}
        </div>
        <div className="mt-1.5 flex justify-between font-mono text-[9px] text-muted-foreground">
          <span>00:00</span>
          <span>12:00</span>
          <span>23:59</span>
        </div>

        {/* routing table */}
        <div className="mt-5 space-y-2">
          {ROUTES.map((r, i) => (
            <div
              key={r.name}
              className={cn(
                "flex items-center gap-3 rounded-lg bg-background px-3 py-2.5",
                insetXs,
                enter,
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-1 opacity-0",
              )}
              style={{ transitionDelay: `${PLOT_MS + i * 90}ms` }}
            >
              <span className="w-24 shrink-0 text-[11px] text-foreground/80">
                {r.name}
              </span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted-foreground/15">
                <span
                  style={{
                    width: inView ? `${(r.rate - 99) * 100}%` : "0%",
                    transitionDelay: `${PLOT_MS + 180 + i * 90}ms`,
                  }}
                  className="block h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-700 ease-out motion-reduce:transition-none"
                />
              </span>
              <span className="shrink-0 font-mono text-[10px] tabular-nums text-foreground/70">
                {r.rate}%
              </span>
              <span className="w-16 shrink-0 text-right text-[9px] uppercase tracking-wider text-muted-foreground">
                {r.tag}
              </span>
            </div>
          ))}
        </div>
      </Well>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Merchant Onboarding — weeks of queueing, collapsed into one day.

   Motion: the pipeline actually runs, one stage at a time, and the approval
   keeps its halo afterwards.
   ------------------------------------------------------------------------- */

const STEPS = [
  { name: "Application", at: "09:12" },
  { name: "KYB checks", at: "09:14" },
  { name: "Risk scoring", at: "09:20" },
  { name: "Approved", at: "09:41" },
];

export function OnboardingVisual({ className }: VisualProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const step = useSequence(STEPS.length, inView, 440);
  const minutes = useCountUp(29, inView, 1200);
  const reviews = useCountUp(4, inView, 1200);
  const score = useCountUp(12, inView, 1400);
  const approved = step >= STEPS.length - 1;

  /** How far along the rail the pipeline has actually got. */
  const progress = Math.max(0, step) / (STEPS.length - 1);

  return (
    <div ref={ref} className={className}>
      <Well
        label="Merchant #48213"
        meta={
          <span
            className={cn(
              "rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400",
              enter,
              approved ? "scale-100 opacity-100" : "scale-95 opacity-0",
            )}
          >
            Same-day approval
          </span>
        }
      >
        {/* pipeline */}
        <div className="relative">
          <span className="absolute left-0 right-0 top-3 h-px bg-muted-foreground/15" />
          <span
            className="absolute left-0 top-3 h-px bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${progress * 100}%` }}
          />
          <div className="relative grid grid-cols-4 gap-2">
            {STEPS.map((s, i) => {
              const last = i === STEPS.length - 1;
              const done = step >= i;
              return (
                <div
                  key={s.name}
                  className="flex flex-col items-center text-center"
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full transition-all duration-400 ease-out motion-reduce:transition-none",
                      done
                        ? cn(
                            "scale-100 text-white",
                            last
                              ? "bg-gradient-to-br from-indigo-500 to-violet-600 step-halo"
                              : "bg-indigo-500/85 dark:bg-indigo-400/85",
                          )
                        : "scale-90 border border-dashed border-muted-foreground/30 bg-background text-transparent",
                    )}
                  >
                    <Check
                      className={cn(
                        "h-3 w-3 transition-opacity duration-300 motion-reduce:transition-none",
                        done ? "opacity-100" : "opacity-0",
                      )}
                      strokeWidth={3.5}
                    />
                  </span>
                  <span
                    className={cn(
                      "mt-2 text-[10px] font-medium leading-tight transition-colors duration-300 motion-reduce:transition-none",
                      // Pending steps stay at full muted-foreground rather
                      // than half: at 50% this drops under the contrast
                      // minimum, and the state is already carried by the
                      // hollow node and the absent timestamp.
                      done ? "text-foreground/80" : "text-muted-foreground",
                    )}
                  >
                    {s.name}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 font-mono text-[9px] text-muted-foreground transition-opacity duration-300 motion-reduce:transition-none",
                      done ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {s.at}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* risk readout */}
        <div className={`mt-6 rounded-xl bg-background px-4 py-4 ${insetXs}`}>
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              Composite risk score
            </span>
            <span className="font-mono font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
              {Math.round(score)} · low
            </span>
          </div>
          <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-muted-foreground/15">
            <span
              style={{ width: inView ? "12%" : "0%" }}
              className="block h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-[width] duration-[1400ms] ease-out motion-reduce:transition-none"
            />
          </span>
          <div className="mt-3 flex justify-between font-mono text-[9px] text-muted-foreground">
            <span>0 low</span>
            <span>60 review</span>
            <span>100 decline</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            { k: `${Math.round(minutes)} min`, v: "Application to approval" },
            { k: `${Math.round(reviews)} / day`, v: "Manual reviews, was 40" },
          ].map((s, i) => (
            <div
              key={s.v}
              className={cn(
                "rounded-xl bg-background px-3 py-3",
                raised,
                enter,
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0",
              )}
              style={{ transitionDelay: `${600 + i * 120}ms` }}
            >
              <div className="text-sm font-bold tabular-nums text-foreground">
                {s.k}
              </div>
              <div className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </Well>
    </div>
  );
}
