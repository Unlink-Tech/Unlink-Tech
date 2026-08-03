import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { serviceCards } from "@/lib/service-cards";
import { serviceVisuals } from "@/components/service-visuals-map";
import { cn } from "@/lib/utils";

/**
 * Custom-engineering showcase — split rows, dealt as a stack.
 *
 * Each service is a full-width row, visual on one side and copy on the other,
 * and the rows pin as you scroll so they build up on screen the way the product
 * cards do.
 *
 * The two rules from ProductsShowcase apply here for the same reasons, and both
 * are load-bearing: uniform card height (a ragged edge shows under the pinned
 * card above) and nothing bleeding outside a card.
 *
 * Rows alternate, and the phase is offset from the products section: this one
 * opens with the visual on the LEFT. Two stacked sections back to back that
 * start the same way read as the same slide twice, so starting on opposite
 * sides keeps them distinct while the behaviour stays consistent.
 *
 * Pure CSS `position: sticky`. No ancestor of the sticky wrapper may set
 * `overflow: hidden`, or the pinning silently stops working.
 */

const insetSm =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";
/** Where the first card pins (clearing the 64px header), and the step per card. */
const TOP_BASE = 80;
const TOP_STEP = 14;
/**
 * Card height, set to exactly the visual slot plus the card's own padding
 * (27rem + 2 × 3rem), so there is no slack left over.
 *
 * It is 4rem shorter than the products card by design, not by oversight. A
 * product card is sized by its copy column, which runs to ~463px; the service
 * copy is half that, so the card there is sized by the visual slot instead.
 * Forcing both to 37rem leaves the last service card with ~64px of empty card
 * under its visual, which is exactly the trailing gap this avoids. The visuals
 * themselves are the same size in both sections, which is what carries the
 * matching weight.
 */
const MIN_HEIGHT = "lg:min-h-[33rem]";
/**
 * Uniform visual slot, so all five line up whatever their natural height.
 * Must stay above the tallest visual: the card clips its overflow, so a slot
 * that is even slightly short cuts one of them off.
 */
const VISUAL_SLOT = "lg:h-[27rem]";

/**
 * @param showHeading  false on /custom-engineering, where the page hero already
 *                     carries the eyebrow and title and a second one repeats it.
 */
export function ServicesShowcase({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  // With the section heading hidden (on /custom-engineering, where the page
  // hero already carries it) the cards become the page's top-level sections,
  // so their titles step up to h2 or the document jumps h1 → h3.
  const CardHeading = showHeading ? "h3" : "h2";

  return (
    <section
      className={cn("bg-background", showHeading && "border-t border-border/60")}
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        {showHeading && (
          <Reveal className="mb-16">
            <SectionHeading
              eyebrow="Custom Engineering"
              title="Five service lines. One domain: regulated fintech."
              subtitle="When no product fits, the same team builds it. Every capability below is already shipped, audited, and running in production."
            />
          </Reveal>
        )}

        <div className="space-y-8">
          {serviceCards.map((service, i) => {
            const { slug, icon: Icon, title, description, stats, proof } =
              service;
            const Visual = serviceVisuals[slug];
            // Opposite phase to the products section: odd cards keep the visual
            // on the left, even cards mirror to the right.
            const reversed = i % 2 === 1;
            return (
              <div
                key={slug}
                // Desktop only: on a phone the card is taller than the viewport,
                // and a pinned element you cannot scroll past hides its own
                // bottom. There it stays a plain, scrolling stack of cards.
                className="lg:sticky"
                style={{ top: `${TOP_BASE + i * TOP_STEP}px` }}
              >
                <article
                  className={`relative overflow-hidden rounded-[2rem] bg-background p-7 sm:p-10 lg:p-12 ${MIN_HEIGHT}`}
                >
                  {/* brand wash, following whichever side the visual is on */}
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-y-0 hidden w-[60%] bg-[radial-gradient(closest-side,rgba(99,102,241,0.13),transparent)] blur-2xl dark:bg-[radial-gradient(closest-side,rgba(129,140,248,0.15),transparent)] lg:block",
                      reversed ? "right-[-10%]" : "left-[-10%]",
                    )}
                  />

                  <div
                    className={cn(
                      "relative grid h-full grid-cols-[minmax(0,1fr)] items-center gap-10 lg:gap-14",
                      // The visual always takes the wider column, so the ratio
                      // flips along with the sides.
                      reversed
                        ? "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
                        : "lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]",
                    )}
                  >
                    {/* ---- visual, in a slot every card shares ---- */}
                    <div
                      className={cn(
                        "order-2 flex items-center justify-center",
                        VISUAL_SLOT,
                        reversed ? "lg:order-2" : "lg:order-1",
                      )}
                    >
                      <Visual className="w-full max-w-[34rem]" />
                    </div>

                    {/* ---- copy. Always first on mobile, whichever side it
                         takes on desktop. ---- */}
                    <div
                      className={cn("order-1", reversed ? "lg:order-1" : "lg:order-2")}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background text-indigo-500 dark:text-indigo-400",
                            insetSm,
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {String(i + 1).padStart(2, "0")} /{" "}
                          {String(serviceCards.length).padStart(2, "0")}
                        </span>
                      </div>

                      <CardHeading className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                        <span className="shine-text">{title}</span>
                      </CardHeading>
                      <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
                        {description}
                      </p>

                      <ul className="mt-5 flex flex-wrap gap-2">
                        {stats.map((s) => (
                          <li
                            key={s}
                            className={cn(
                              "rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground/80",
                              insetSm,
                            )}
                          >
                            {s}
                          </li>
                        ))}
                      </ul>

                      {/* the evidence behind the chips above, in prose */}
                      <div
                        className={cn(
                          "mt-5 rounded-xl bg-background px-4 py-3.5",
                          insetSm,
                        )}
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-500 dark:text-indigo-400">
                          Proof
                        </p>
                        <p className="mt-1.5 text-[12.5px] leading-[1.55] text-muted-foreground">
                          {proof}
                        </p>
                      </div>

                      <Link
                        href={`/custom-engineering/${slug}`}
                        className="group/link mt-6 inline-flex min-h-6 items-center gap-1.5 text-sm font-medium text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-indigo-400"
                      >
                        Explore this service
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
