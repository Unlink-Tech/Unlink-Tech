"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { NeuButton } from "@/components/ui/neu-button";
import { SITE } from "@/lib/site";
import { useInView, useSequence } from "@/lib/visual-motion";
import { cn } from "@/lib/utils";

/** Neumorphic soft-shadow helpers, driven by the theme's --neu-* variables. */
const raised =
  "shadow-[10px_10px_28px_var(--neu-dark),-10px_-10px_28px_var(--neu-light)]";
const raisedSm =
  "shadow-[4px_4px_8px_var(--neu-dark),-4px_-4px_8px_var(--neu-light)]";

const enter =
  "transition-all duration-600 ease-out motion-reduce:transition-none";

/**
 * Closing conversion band — a neumorphic panel on the soft surface, with a live
 * status pulse and gradient accent for freshness. Uses the shared NeuButton
 * (primary) exactly like the home hero.
 *
 * The contents land in reading order rather than as one block. It is the last
 * thing on the page and the only thing being asked of the reader, so it is
 * worth the extra beat: the pill, then the promise, then what we bring, then
 * the two ways to start. Whole-panel Reveal did all four at once, which is
 * cheaper and reads as one more section rather than an invitation.
 */
export function ClosingBand() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const step = useSequence(4, inView, 170);

  /** Shared arrival state for the nth element in the sequence. */
  const at = (i: number) =>
    cn(enter, step >= i ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0");

  return (
    <section className="border-t border-border/60 bg-background px-4 py-20 sm:px-6 sm:py-28">
      <div ref={ref} className="mx-auto max-w-4xl">
        <div className="relative">
          {/* soft brand glow behind the panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.75rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(99,102,241,0.18),transparent_70%)] blur-2xl dark:bg-[radial-gradient(60%_60%_at_50%_50%,rgba(129,140,248,0.16),transparent_70%)]"
          />

          <div
            className={cn(
              "relative overflow-hidden rounded-[2rem] bg-background px-6 py-16 text-center sm:px-16 sm:py-20",
              raised,
            )}
          >
            {/* the lit edge, sweeping open as the panel arrives */}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-0 top-0 h-px origin-left bg-[linear-gradient(90deg,transparent,rgb(var(--particle-rgb)/0.7),transparent)] transition-transform duration-[1200ms] ease-out motion-reduce:transition-none",
                inView ? "scale-x-100" : "scale-x-0",
              )}
            />

            <div className="mx-auto flex max-w-2xl flex-col items-center">
              {/* live status pill — neumorphic raised */}
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-medium text-muted-foreground",
                  raisedSm,
                  at(0),
                )}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                Straight to the engineers
              </span>

              <h2
                className={cn(
                  "mt-6 text-4xl font-bold leading-tight tracking-tight text-balance text-foreground sm:text-5xl",
                  at(1),
                )}
              >
                Talk to the people who{" "}
                <span className="shine-text">built it.</span>
              </h2>

              <p
                className={cn(
                  "mt-5 text-lg leading-relaxed text-muted-foreground",
                  at(2),
                )}
              >
                A working conversation with the engineers who have shipped this
                in production: about your volume, your regulator, and whether
                you should buy or build. We bring the security questionnaire,
                the audit history, and the references.{" "}
                <span className="font-medium text-foreground">
                  Not a pitch deck.
                </span>
              </p>

              <div
                className={cn(
                  "mt-9 flex flex-col items-center gap-5 sm:flex-row sm:gap-7",
                  at(3),
                )}
              >
                <NeuButton asChild variant="primary" size="lg" className="group">
                  <Link href="/book-demo">
                    Book a walkthrough
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </NeuButton>

                {/* The address in full, not hidden behind a word: a reader who
                    would rather email than fill in a form should be able to
                    copy it without clicking anything. */}
                <a
                  href={`mailto:${SITE.email}`}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  <Mail className="h-4 w-4 text-indigo-500 transition-transform group-hover:-translate-y-0.5 dark:text-indigo-400" />
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
