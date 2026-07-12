import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NeuButton } from "@/components/ui/neu-button";
import { Reveal } from "@/components/reveal";

/** Neumorphic soft-shadow helpers, driven by the theme's --neu-* variables. */
const raised =
  "shadow-[10px_10px_28px_var(--neu-dark),-10px_-10px_28px_var(--neu-light)]";
const raisedSm =
  "shadow-[4px_4px_8px_var(--neu-dark),-4px_-4px_8px_var(--neu-light)]";

/**
 * Closing conversion band — a neumorphic panel on the soft surface, with a live
 * status pulse and gradient accent for freshness. Uses the shared NeuButton
 * (primary) exactly like the home hero.
 */
export function ClosingBand() {
  return (
    <section className="border-t border-border/60 bg-background px-4 py-20 sm:px-6 sm:py-28">
      <Reveal className="mx-auto max-w-4xl">
        <div className="relative">
          {/* soft brand glow behind the panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.75rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(99,102,241,0.18),transparent_70%)] blur-2xl dark:bg-[radial-gradient(60%_60%_at_50%_50%,rgba(129,140,248,0.16),transparent_70%)]"
          />

          <div
            className={`rounded-[2rem] bg-background px-6 py-16 text-center ${raised} sm:px-16 sm:py-20`}
          >
            <div className="mx-auto flex max-w-2xl flex-col items-center">
              {/* live status pill — neumorphic raised */}
              <span
                className={`inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-medium text-muted-foreground ${raisedSm}`}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                Straight to the engineers
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-balance text-foreground sm:text-5xl">
                Talk to the people who{" "}
                <span className="bg-gradient-to-br from-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
                  built it.
                </span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                No sales script. Just a conversation with the engineers who have
                shipped this in production.
              </p>

              <NeuButton asChild variant="primary" size="lg" className="group mt-9">
                <Link href="/contact">
                  Start a conversation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </NeuButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
