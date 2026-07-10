import { Boxes, ShieldCheck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { AuroraCard } from "@/components/ui/aurora-card";
import { SectionHeading } from "@/components/section-heading";

/** Neumorphic soft-shadow helper for the inset icon niche. */
const insetIcon =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";

/** Inline emphasis for product names / standards inside the body copy. */
function Em({ children }: { children: ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>;
}

type Column = {
  icon: LucideIcon;
  /** Accent-coloured subject of the heading + the remainder. */
  lead: string;
  rest: string;
  body: ReactNode;
};

const columns: Column[] = [
  {
    icon: Boxes,
    lead: "Products",
    rest: " that deploy in weeks.",
    body: (
      <>
        <Em>Cimmetri</Em> (reconciliation), <Em>Enclave</Em> (governed
        enterprise AI), <Em>Payment Gateway</Em>, and{" "}
        <Em>Merchant Onboarding</Em> — proven infrastructure you deploy instead
        of build. First reconciled run in days. Merchants live the same day. AI
        grounded in your own data, inside your own boundary.
      </>
    ),
  },
  {
    icon: Wrench,
    lead: "Engineering",
    rest: " when no product fits.",
    body: (
      <>
        Payment and settlement platforms, AI/ML fraud and risk systems, KYC/KYB
        workflow automation, MAS TRM and compliance technology, offline-first
        mobile commerce — designed and shipped end to end, in your regulatory
        environment.
      </>
    ),
  },
  {
    icon: ShieldCheck,
    lead: "One standard",
    rest: " for both.",
    body: (
      <>
        Every system we ship has to pass the audit, not just the demo:{" "}
        <Em>PCI-DSS</Em>, <Em>MAS TRM and FEAT</Em>, regulator-grade audit
        trails, and reconciliation accuracy measured at{" "}
        <Em>100% on $50M+ daily volume</Em>.
      </>
    ),
  },
];

export function WhatWeDo() {
  return (
    <section className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        {/* section header */}
        <SectionHeading
          eyebrow="What we do"
          title="Two ways in — held to one standard."
          className="mb-14"
        />

        {/* three columns */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {columns.map(({ icon: Icon, lead, rest, body }) => (
            <AuroraCard key={lead}>
              <span
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-indigo-500 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400 ${insetIcon}`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-2xl font-bold leading-snug tracking-tight text-foreground">
                <span className="bg-gradient-to-br from-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
                  {lead}
                </span>
                {rest}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {body}
              </p>
            </AuroraCard>
          ))}
        </div>
      </div>
    </section>
  );
}
