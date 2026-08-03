import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { SettlementRails } from "@/components/settlement-rails";
import { HeroConsole } from "@/components/hero-console";
import { NeuButton } from "@/components/ui/neu-button";

/** Neumorphic soft-shadow helpers, driven by the theme's --neu-* variables. */
const raisedSm =
  "shadow-[4px_4px_8px_var(--neu-dark),-4px_-4px_8px_var(--neu-light)]";
const insetXs =
  "shadow-[inset_3px_3px_6px_var(--neu-dark),inset_-3px_-3px_6px_var(--neu-light)]";

const domains = ["Payments", "Reconciliation", "Onboarding"];

export function Hero() {
  return (
    <section className="relative flex flex-1 items-center overflow-hidden bg-background px-4 py-20 sm:px-6 lg:py-28">
      {/* backdrop: soft brand washes with the cursor-reactive settlement rails on top */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-[10%] -top-[20%] h-[70%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.11),transparent_65%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(129,140,248,0.13),transparent_65%)]" />
        <div className="absolute -bottom-[25%] right-[-8%] h-[70%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.10),transparent_65%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(167,139,250,0.12),transparent_65%)]" />
        <SettlementRails />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-12">
        {/* ---- left: the pitch ---- */}
        <div className="text-center lg:text-left">
          <span
            className={`inline-flex items-center gap-2.5 rounded-full bg-background px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300 ${raisedSm}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
            Regulated-grade financial infrastructure
          </span>

          <h1 className="mt-8 text-4xl font-bold leading-[1.08] tracking-tight text-balance text-slate-700 dark:text-slate-100 sm:text-5xl lg:text-[3rem]">
            The <span className="shine-text">infrastructure</span> that moves
            regulated money and proves{" "}
            {/* Delayed so the two highlights gleam in reading order. */}
            <span className="shine-text" style={{ animationDelay: "0.7s" }}>
              every rupee
            </span>{" "}
            landed where it should.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-500 dark:text-slate-400 lg:mx-0 lg:text-lg">
            Onboard merchants, accept payments at scale, and reconcile every
            settlement to the cent. Three production-grade products and a
            specialist engineering team, running under real transaction volume
            and real regulators for 5+ years. Buy what&apos;s proven. Build what
            isn&apos;t. One team behind both.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <NeuButton asChild variant="primary" size="lg" className="group">
              <Link href="/products">
                Explore the products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </NeuButton>

            <NeuButton asChild variant="neutral" size="lg" className="group">
              <Link href="/custom-engineering">
                Scope a custom build
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </NeuButton>
          </div>

          {/* domain proof row */}
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 lg:justify-start">
            {domains.map((d) => (
              <li
                key={d}
                className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
              >
                <span
                  className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background text-indigo-500 dark:text-indigo-400 ${insetXs}`}
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>

        {/* ---- right: the products' live numbers ---- */}
        <HeroConsole />
      </div>
    </section>
  );
}
