import { Activity, Landmark, Lock, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

/** Neumorphic soft-shadow helpers, driven by the theme's --neu-* variables. */
const raised =
  "shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)]";
const node =
  "shadow-[5px_5px_10px_var(--neu-dark),-5px_-5px_10px_var(--neu-light)]";

function Em({ children }: { children: ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>;
}

type Step = {
  icon: LucideIcon;
  title: string;
  caption: string;
  highlight?: boolean;
};

const steps: Step[] = [
  {
    icon: ShieldCheck,
    title: "PCI-DSS audit",
    caption: "Passes a full payment-security audit.",
  },
  {
    icon: Landmark,
    title: "MAS TRM examiner",
    caption: "Satisfies the regulator's technology-risk review.",
  },
  {
    icon: Lock,
    title: "Bank security review",
    caption: "Survives a partner bank's security assessment.",
  },
  {
    icon: Activity,
    title: "Production scale",
    caption: "Runs at scale with zero reconciliation errors.",
    highlight: true,
  },
];

function Gauntlet() {
  return (
    <div className={`rounded-3xl bg-background p-8 sm:p-10 ${raised}`}>
      <p className="mb-8 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        What every system clears before it ships
      </p>

      <ol className="relative">
        {/* connecting line runs through the node centres */}
        <span
          aria-hidden
          className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-indigo-400/70 via-violet-400/50 to-violet-400/20"
        />
        {steps.map(({ icon: Icon, title, caption, highlight }, i) => (
          <li
            key={title}
            className={`relative flex items-start gap-5 ${i < steps.length - 1 ? "pb-8" : ""}`}
          >
            <span
              className={`relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${node} ${
                highlight
                  ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white"
                  : "bg-background text-indigo-500 dark:text-indigo-400"
              }`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <div className="pt-1">
              <h3 className="text-base font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{caption}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function WhyUnlink() {
  return (
    <section className="border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16">
        {/* left — the process pipeline */}
        <Reveal className="order-2 lg:order-1">
          <Gauntlet />
        </Reveal>

        {/* right — the differentiation copy */}
        <Reveal delay={100} className="order-1 lg:order-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
            Why this is Different
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            In <span className="shine-text">regulated finance</span>, a software decision is a <span className="shine-text">compliance</span> event.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              An onboarding queue that leaks merchants to a faster competitor. A
              gateway that buckles at 10× traffic. A reconciliation break nobody
              catches until the auditor does. These aren&apos;t bugs: they are{" "}
              <Em>lost merchants</Em>, <Em>revenue leakage</Em>, and{" "}
              <Em>regulatory findings</Em>.
            </p>
            <p>
              We build for the version of the system that has to survive all of
              it: peak volume, an examiner&apos;s questions, and a partner
              bank&apos;s security team, <Em>at the same time</Em>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
