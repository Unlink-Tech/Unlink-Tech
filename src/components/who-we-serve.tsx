"use client";

import {
  Gamepad2,
  HandCoins,
  Landmark,
  Network,
  Smartphone,
  Store,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { useInView, useSequence } from "@/lib/visual-motion";
import { cn } from "@/lib/utils";

/**
 * Who we serve — the six businesses, and the regimes they answer to.
 *
 * The segments are a plain grid on purpose. The section above it is the rail
 * and the one below is the stacked deck; a third piece of choreography here
 * would be noise, and a reader looking for their own industry wants to find it
 * in one pass, not watch it arrive.
 *
 * What the design does add is the map from region to regulator. The source copy
 * ran the regions and the regulators as two flat lists in one sentence, which
 * leaves the reader to work out which body supervises which market. Pairing
 * them says the same thing and answers the question a buyer in Riyadh actually
 * has, which is whether we have worked under SAMA.
 *
 * Motion is the site's usual scroll-in, one tile at a time on a quick cadence,
 * then nothing. See lib/visual-motion.ts.
 */

/** Neumorphic soft-shadow helpers, driven by the theme's --neu-* variables. */
const raisedSm =
  "shadow-[5px_5px_10px_var(--neu-dark),-5px_-5px_10px_var(--neu-light)]";
const inset =
  "shadow-[inset_5px_5px_10px_var(--neu-dark),inset_-5px_-5px_10px_var(--neu-light)]";
const insetXs =
  "shadow-[inset_3px_3px_6px_var(--neu-dark),inset_-3px_-3px_6px_var(--neu-light)]";

const enter =
  "transition-all duration-500 ease-out motion-reduce:transition-none";

type Segment = { icon: LucideIcon; label: string };

const segments: Segment[] = [
  { icon: Landmark, label: "Banks & NBFCs" },
  { icon: Network, label: "Payment processors & PSPs" },
  { icon: Smartphone, label: "Fintechs & neobanks" },
  { icon: HandCoins, label: "Lending platforms" },
  { icon: Store, label: "Marketplaces & platform businesses" },
  { icon: Gamepad2, label: "Gaming & high-volume transaction platforms" },
];

/** Each market paired with the body that supervises it, not two loose lists. */
const regions = [
  { name: "India", regulators: ["RBI"] },
  { name: "South East Asia", regulators: ["MAS"] },
  { name: "Middle East", regulators: ["SAMA", "CBUAE"] },
];

export function WhoWeServe() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const step = useSequence(segments.length, inView, 90);

  return (
    <section className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Who we build for"
          title={
            <>
              If a mistake in your systems is a{" "}
              <span className="shine-text">regulator&apos;s problem</span>,
              we&apos;re{" "}
              <span className="shine-text" style={{ animationDelay: "0.7s" }}>
                built for you.
              </span>
            </>
          }
          className="mb-14"
        />

        <div ref={ref}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {segments.map(({ icon: Icon, label }, i) => (
              <li
                key={label}
                className={cn(
                  "group flex items-center gap-4 rounded-2xl bg-background p-5 sm:p-6",
                  raisedSm,
                  enter,
                  "hover:-translate-y-1 hover:shadow-[8px_8px_18px_var(--neu-dark),-8px_-8px_18px_var(--neu-light)]",
                  step >= i
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0",
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background text-indigo-500 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400",
                    insetXs,
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-[15px] font-medium leading-snug text-foreground">
                  {label}
                </span>
              </li>
            ))}
          </ul>

          {/* ---- where, and under whom ---- */}
          <div
            className={cn(
              "relative mt-10 overflow-hidden rounded-3xl bg-background p-8 sm:p-10",
              inset,
              "transition-all duration-700 ease-out motion-reduce:transition-none",
              inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: "600ms" }}
          >
            {/* the lit edge, sweeping open as the panel lands */}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-0 top-0 h-px origin-left bg-[linear-gradient(90deg,transparent,rgb(var(--particle-rgb)/0.7),transparent)] transition-transform duration-[1200ms] ease-out motion-reduce:transition-none",
                inView ? "scale-x-100" : "scale-x-0",
              )}
              style={{ transitionDelay: "800ms" }}
            />

            <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Where we work, and under whom
            </p>

            <dl className="mt-7 grid gap-8 sm:grid-cols-3 sm:gap-6">
              {regions.map(({ name, regulators }, i) => (
                <div
                  key={name}
                  className={cn(
                    "text-center",
                    // Hairlines between the regions, from sm up only: stacked,
                    // a left border reads as an outdent, not a divider.
                    i > 0 && "sm:border-l sm:border-border/60",
                    enter,
                    inView
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0",
                  )}
                  style={{ transitionDelay: `${900 + i * 120}ms` }}
                >
                  <dt className="text-lg font-bold tracking-tight text-foreground">
                    {name}
                  </dt>
                  <dd className="mt-3 flex flex-wrap items-center justify-center gap-2">
                    {regulators.map((r) => (
                      <span
                        key={r}
                        className={cn(
                          "inline-flex items-center rounded-full bg-background px-3 py-1.5 font-mono text-[11px] font-semibold tracking-wider text-indigo-600 dark:text-indigo-400",
                          raisedSm,
                        )}
                      >
                        {r}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
