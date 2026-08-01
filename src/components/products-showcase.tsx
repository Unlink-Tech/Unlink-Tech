import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { NeuButton } from "@/components/ui/neu-button";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { showcaseProducts } from "@/lib/products";
import { productVisuals } from "@/components/product-visuals-map";
import { cn } from "@/lib/utils";

/**
 * Products showcase — immersive cards, dealt as a stack.
 *
 * The look is the immersive band: a chapter number, a brand wash behind the
 * visual, and the product name set large. The behaviour is the stacked deck:
 * each card pins as you scroll and comes to rest a little below the last, so
 * the four build up on screen instead of scrolling away.
 *
 * Two rules keep the stack honest, and both are load-bearing:
 *
 *   1. Every card is the same height (MIN_HEIGHT) and every visual sits in the
 *      same fixed-height, centred slot, so a card holds its size and its visual
 *      holds its place as the next one pins over it.
 *   2. Nothing bleeds outside a card. The tilted, overhanging visual that suits
 *      a single full-bleed band reads as broken overlap once cards stack.
 *
 * Rows alternate: odd cards put the visual on the right, even cards on the
 * left. Because sides swap via `order`, the grid template has to swap with them
 * — otherwise the visual lands in the narrower column on every other row.
 *
 * Pure CSS `position: sticky` — no scroll listeners and nothing to measure.
 * No ancestor of the sticky wrapper may set `overflow: hidden`, or the pinning
 * silently stops working; the card itself may, and does.
 */

const insetXs =
  "shadow-[inset_3px_3px_6px_var(--neu-dark),inset_-3px_-3px_6px_var(--neu-light)]";
/**
 * Where the first card pins (clearing the 64px header), and the step each later
 * card rests below it. Kept tight so a pinned card's bottom still clears a
 * short laptop window: TOP_BASE + card height has to fit the viewport, or the
 * card's own footer becomes unreachable while it is stuck.
 */
const TOP_BASE = 80;
const TOP_STEP = 16;
/** Uniform card height, so all four keep the same presence in the stack. */
const MIN_HEIGHT = "lg:min-h-[37rem]";
/** Uniform visual slot, so all four line up whatever their natural height. */
const VISUAL_SLOT = "lg:h-[27rem]";

/**
 * @param showHeading  false on /products, where the page hero already carries
 *                     the eyebrow and title and a second one would repeat it.
 */
export function ProductsShowcase({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  // With the section heading hidden (on /products, where the page hero already
  // carries it) the cards become the page's top-level sections, so their
  // titles have to step up to h2 or the document jumps h1 → h3.
  const CardHeading = showHeading ? "h3" : "h2";

  return (
    <section
      id="products"
      className={cn(
        "bg-background",
        showHeading && "border-t border-border/60",
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        {showHeading && (
          <Reveal className="mb-16">
            <SectionHeading
              eyebrow="Products"
              title="Four products. Proven in production."
              subtitle="Infrastructure you deploy instead of building. Each one is measured on a number that matters."
            />
          </Reveal>
        )}

        <div className="space-y-8">
          {showcaseProducts.map((product, i) => {
            const Visual = productVisuals[product.slug];
            // Even-numbered cards mirror: visual left, copy right.
            const reversed = i % 2 === 1;
            return (
              <div
                key={product.slug}
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
                      "pointer-events-none absolute inset-y-0 hidden w-[60%] bg-[radial-gradient(closest-side,rgba(99,102,241,0.14),transparent)] blur-2xl dark:bg-[radial-gradient(closest-side,rgba(129,140,248,0.15),transparent)] lg:block",
                      reversed ? "left-[-10%]" : "right-[-10%]",
                    )}
                  />

                  <div
                    className={cn(
                      "relative grid h-full items-center gap-10 lg:gap-14",
                      // The visual always takes the wider column, so the ratio
                      // flips along with the sides.
                      reversed
                        ? "lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]"
                        : "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]",
                    )}
                  >
                    {/* ---- copy. Always first on mobile, whichever side it
                         takes on desktop. ---- */}
                    <div className={reversed ? "lg:order-2" : "lg:order-1"}>
                      {/*
                        The ghost index is deliberately at the edge of
                        legibility. It is a position marker, not content: the
                        screen-reader label below carries the real information,
                        and the numeral itself is drawn as CSS content so it is
                        treated as the decoration it is. See .ghost-index.
                      */}
                      <p className="sr-only">
                        Product {i + 1} of {showcaseProducts.length}
                      </p>
                      <div aria-hidden className="flex items-baseline gap-3">
                        <span
                          data-index={String(i + 1).padStart(2, "0")}
                          className="ghost-index font-mono text-5xl font-bold leading-none text-foreground/[0.08] dark:text-foreground/[0.11]"
                        />
                        <span className="font-mono text-xs text-muted-foreground">
                          of {String(showcaseProducts.length).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                        {product.category}
                      </p>
                      <CardHeading className="mt-2.5 text-4xl font-bold tracking-tight sm:text-5xl">
                        <span className="shine-text">{product.name}</span>
                      </CardHeading>
                      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground lg:text-lg">
                        {product.description}
                      </p>

                      {/* the measured number, then the proof points beside it */}
                      <div className="mt-8 flex flex-wrap items-start gap-x-8 gap-y-5">
                        <div className="shrink-0">
                          <div className="shine-text text-3xl font-bold tracking-tight tabular-nums">
                            {product.hero.value}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {product.hero.caption}
                          </div>
                        </div>

                        {/*
                          The 15rem floor only applies from sm up. On a phone
                          it set a min-content width of ~412px on this column,
                          which is wider than the card itself: the grid column
                          grew to fit it and the card's overflow-hidden then
                          clipped the headings, the copy, and the right-hand
                          side of the visual. Below sm the list simply takes
                          the full width and wraps under the figure.
                        */}
                        <ul className="min-w-0 flex-1 space-y-2.5 sm:min-w-[15rem]">
                          {product.points.map((p) => (
                            <li
                              key={p}
                              className="flex items-start gap-2.5 text-sm text-foreground/90"
                            >
                              <span
                                className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background text-indigo-500 dark:text-indigo-400 ${insetXs}`}
                              >
                                <Check className="h-3 w-3" strokeWidth={3} />
                              </span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <NeuButton
                        asChild
                        variant="primary"
                        size="md"
                        className="group mt-9"
                      >
                        <Link href={`/products/${product.slug}`}>
                          Explore {product.name}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </NeuButton>
                    </div>

                    {/* ---- visual, in a slot every card shares ---- */}
                    <div
                      className={cn(
                        "flex items-center justify-center",
                        VISUAL_SLOT,
                        reversed ? "lg:order-1" : "lg:order-2",
                      )}
                    >
                      <Visual className="w-full max-w-[34rem]" />
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
