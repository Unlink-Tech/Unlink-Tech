import Link from "next/link";
import { ArrowRight, Blocks } from "lucide-react";
import { HeroBackground } from "@/components/hero-background";
import { NeuButton } from "@/components/ui/neu-button";

/** Neumorphic soft-shadow helpers, driven by the theme's --neu-* variables. */
const raisedSm =
  "shadow-[4px_4px_8px_var(--neu-dark),-4px_-4px_8px_var(--neu-light)]";
const inset =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";

const domains = ["Payments", "Reconciliation", "Onboarding", "Governed AI"];

export function Hero() {
  return (
    <section className="relative flex flex-1 items-center justify-center overflow-hidden bg-background px-4 py-24 sm:px-6">
      {/* animated infrastructure backdrop */}
      <HeroBackground />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* eyebrow badge — raised pill */}
        <span
          className={`mb-8 inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 ${raisedSm}`}
        >
          <Blocks className="h-4 w-4 text-indigo-500" />
          Regulated-grade financial infrastructure
        </span>

        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-700 dark:text-slate-100 sm:text-5xl lg:text-6xl">
          We build the financial infrastructure regulated businesses cannot
          afford to get wrong.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500 dark:text-slate-400">
          Four production-grade products and a specialist engineering team —
          payments, reconciliation, onboarding, and governed enterprise AI,
          shipped and running under real transaction volume and real regulators
          for 5+ years.
        </p>

        {/* CTAs — the reusable neumorphic button */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <NeuButton asChild variant="primary" size="lg" className="group">
            <Link href="/products">
              Explore the products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </NeuButton>

          <NeuButton asChild variant="neutral" size="lg">
            <Link href="/custom-engineering">Scope a custom build</Link>
          </NeuButton>
        </div>

        {/* domain chips — inset pills */}
        <ul className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {domains.map((d) => (
            <li
              key={d}
              className={`rounded-full bg-background px-4 py-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 ${inset}`}
            >
              {d}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
