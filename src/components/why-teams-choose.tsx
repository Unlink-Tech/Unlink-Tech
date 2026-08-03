"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { useInView, useSequence } from "@/lib/visual-motion";
import { cn } from "@/lib/utils";

/**
 * "Anyone can ship code. Few own its consequences."
 *
 * The panel is the headline drawn as one list rather than argued in prose. The
 * three things every firm delivers land quickly at the top, a rule labelled
 * "most firms stop here" draws across, and then the list keeps going: four more
 * items, slower, that are the actual job. The argument is the fact that the
 * column does not end where the reader expects it to.
 *
 * Two panels side by side would have said the same thing far more weakly. A
 * comparison invites the reader to weigh two options; one column that overruns
 * its own stopping point does not offer a choice, it shows a gap.
 *
 * The beat after the divider is deliberate and load-bearing: index 4 in the
 * sequence lands nothing at all. Without that pause the lower items read as
 * simply more list, and the whole point is that everyone else has stopped.
 */

/** Neumorphic soft-shadow helpers, driven by the theme's --neu-* variables. */
const raised =
  "shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)]";
const insetXs =
  "shadow-[inset_3px_3px_6px_var(--neu-dark),inset_-3px_-3px_6px_var(--neu-light)]";

const enter =
  "transition-all duration-500 ease-out motion-reduce:transition-none";

/** Inline emphasis, matching the other prose sections. */
function Em({ children }: { children: ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>;
}

/** What every firm delivers. Necessary, and nowhere near sufficient. */
const tableStakes = [
  "The feature works",
  "The demo passes",
  "The test suite is green",
];

/** What the same code still has to survive afterwards. */
const consequences = [
  "It passes a PCI-DSS audit",
  "It satisfies a MAS TRM examiner",
  "It survives a partner bank's security review",
  "It runs at production scale without a reconciliation break",
];

/** Stakes, then the divider, then one empty beat, then the consequences. */
const DIVIDER_STEP = tableStakes.length;
const RESUME_STEP = DIVIDER_STEP + 2;
const TOTAL_STEPS = RESUME_STEP + consequences.length;

export function WhyTeamsChoose() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const step = useSequence(TOTAL_STEPS, inView, 280);

  return (
    <section className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Why teams choose Unlink"
          title={
            <>
              Anyone can ship code.{" "}
              <span className="shine-text">Few own its consequences.</span>
            </>
          }
          className="mb-14"
        />

        <div
          ref={ref}
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* ---- left: the argument ---- */}
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              The code we write has to do more than run. It has to{" "}
              <Em>pass a PCI-DSS audit</Em>,{" "}
              <Em>satisfy a MAS TRM examiner</Em>,{" "}
              <Em>survive a bank&apos;s security review</Em>, and operate at
              production scale <Em>without a reconciliation break</Em>.
            </p>
            <p>
              Most firms can build software. Very few understand the compliance,
              regulatory, and operational consequences of the decisions inside
              it. <Em>We do</Em>, because for 5+ years we have made those
              decisions under real production conditions, with real
              consequences.
            </p>
            <p>
              Our products exist because we built them first for clients, then
              made them repeatable. That is the difference between a vendor and{" "}
              <Em>a partner you can put in front of your board</Em>.
            </p>
          </div>

          {/* ---- right: the list that does not stop where it should ---- */}
          <div className={cn("rounded-3xl bg-background p-8 sm:p-10", raised)}>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              What the code has to survive
            </p>

            <ul className="mt-7 space-y-3.5">
              {tableStakes.map((item, i) => (
                <li
                  key={item}
                  className={cn(
                    "flex items-center gap-3 text-[15px] text-muted-foreground",
                    enter,
                    step >= i
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-2 opacity-0",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background text-muted-foreground",
                      insetXs,
                    )}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* the line everyone else stops at */}
            <div
              className={cn(
                "my-6 flex items-center gap-3",
                enter,
                step >= DIVIDER_STEP ? "opacity-100" : "opacity-0",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "h-px flex-1 origin-left bg-border transition-transform duration-700 ease-out motion-reduce:transition-none",
                  step >= DIVIDER_STEP ? "scale-x-100" : "scale-x-0",
                )}
              />
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Most firms stop here
              </span>
              <span
                aria-hidden
                className={cn(
                  "h-px flex-1 origin-right bg-border transition-transform duration-700 ease-out motion-reduce:transition-none",
                  step >= DIVIDER_STEP ? "scale-x-100" : "scale-x-0",
                )}
              />
            </div>

            <ul className="space-y-3.5">
              {consequences.map((item, i) => (
                <li
                  key={item}
                  className={cn(
                    "flex items-center gap-3 text-[15px] font-medium text-foreground",
                    enter,
                    step >= RESUME_STEP + i
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-2 opacity-0",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white",
                    )}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
