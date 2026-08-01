"use client";

import { useCountUp, useInView, useSequence } from "@/lib/visual-motion";
import { cn } from "@/lib/utils";

/**
 * Platform statistics, set like a statement of record.
 *
 * The figures are grouped by domain and each band is opened by a rule that
 * draws in, with the numbers counting up band by band. This replaced a grid of
 * fourteen identical tiles: equal weight on every figure meant nothing led and
 * nothing grouped, leaving the reader to do the sorting. For a page whose whole
 * argument is that every claim carries a number, reading like an audited
 * statement is the point rather than a decorative choice.
 */

/**
 * The figure is split from its formatting so it can be counted to. `raw` is
 * printed verbatim for the handful that are not a single number: a bound, a
 * before-and-after pair, a rating alongside a count.
 */
type Stat = {
  raw?: string;
  num?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  metric: string;
};

type Band = { name: string; stats: Stat[] };

const BANDS: Band[] = [
  {
    name: "Scale in production",
    stats: [
      { num: 10000, suffix: "+ TPS", metric: "Peak transaction throughput" },
      {
        num: 99.99,
        suffix: "%",
        decimals: 2,
        metric: "Gateway uptime SLA achieved",
      },
      { num: 50, prefix: "$", suffix: "M+", metric: "Daily settlement volume" },
      { num: 40, suffix: "+", metric: "Currencies live in production" },
    ],
  },
  {
    name: "Accuracy and risk",
    stats: [
      { num: 100, suffix: "%", metric: "Settlement reconciliation accuracy" },
      {
        num: 98.7,
        suffix: "%",
        decimals: 1,
        metric: "Fraud detection rate, production ML",
      },
      { num: 60, prefix: "−", suffix: "%", metric: "False positives vs rule-based" },
      { raw: "<50ms", metric: "ML scoring latency in production" },
    ],
  },
  {
    name: "Onboarding and compliance",
    stats: [
      { raw: "40 → 4", metric: "Manual decisions per day" },
      { num: 70, prefix: "−", suffix: "%", metric: "Onboarding time" },
      { num: 85, prefix: "−", suffix: "%", metric: "MAS TRM findings post-engagement" },
    ],
  },
  {
    name: "Reach and delivery",
    stats: [
      { raw: "4.8★ / 1M+", metric: "Mobile rating / transactions" },
      { num: 5, suffix: "+", metric: "Years shipping regulated fintech" },
      { num: 60, prefix: "−", suffix: "%", metric: "Time to market vs in-house build" },
    ],
  },
];

/** One figure, counted up once its band is live. */
function Figure({ stat, live }: { stat: Stat; live: boolean }) {
  const n = useCountUp(stat.num ?? 0, live && stat.num !== undefined, 1300);
  if (stat.raw) return <>{stat.raw}</>;
  const shown = live
    ? n.toLocaleString("en-US", {
        minimumFractionDigits: stat.decimals ?? 0,
        maximumFractionDigits: stat.decimals ?? 0,
      })
    : "0";
  return (
    <>
      {stat.prefix}
      {shown}
      {stat.suffix}
    </>
  );
}

export function StatsLedger() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const band = useSequence(BANDS.length, inView, 420);

  return (
    <div ref={ref} className="space-y-10">
      {BANDS.map((group, gi) => {
        const live = band >= gi;
        return (
          <div key={group.name}>
            <div className="flex items-center gap-4">
              <h3 className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400">
                {group.name}
              </h3>
              <span
                aria-hidden
                className={cn(
                  "h-px flex-1 origin-left bg-border transition-transform duration-[900ms] ease-out motion-reduce:transition-none",
                  live ? "scale-x-100" : "scale-x-0",
                )}
              />
              <span
                aria-hidden
                className="shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground"
              >
                {String(group.stats.length).padStart(2, "0")}
              </span>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-7 lg:grid-cols-4">
              {group.stats.map((s, si) => (
                <div
                  key={s.metric}
                  className={cn(
                    "transition-all duration-500 ease-out motion-reduce:transition-none",
                    live ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                  )}
                  style={{ transitionDelay: `${si * 90}ms` }}
                >
                  <dt className="shine-text text-2xl font-bold tracking-tight tabular-nums sm:text-[1.75rem]">
                    <Figure stat={s} live={live} />
                  </dt>
                  <dd className="mt-1.5 text-[13px] leading-snug text-muted-foreground">
                    {s.metric}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        );
      })}
    </div>
  );
}
