import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AuroraCard } from "@/components/ui/aurora-card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Unlink is a specialist fintech technology company. For 5+ years we have shipped payment infrastructure, AI risk systems, enterprise workflows, and regulatory compliance platforms across India, Southeast Asia, and the Middle East.",
};

const insetSm =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";

/** font-medium foreground emphasis inside prose. */
function Em({ children }: { children: ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>;
}

/** Gradient-accented product / key names. */
function Grad({ children }: { children: ReactNode }) {
  return (
    <span className="bg-gradient-to-br from-indigo-500 to-violet-600 bg-clip-text font-semibold text-transparent dark:from-indigo-400 dark:to-violet-400">
      {children}
    </span>
  );
}

function StatementCard({
  icon: Icon,
  eyebrow,
  heading,
  children,
}: {
  icon: LucideIcon;
  eyebrow: string;
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <AuroraCard>
      <span
        className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-indigo-500 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400 ${insetSm}`}
      >
        <Icon className="h-6 w-6" />
      </span>
      <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight">
        <span className="bg-gradient-to-br from-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
          {heading}
        </span>
      </h2>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        {children}
      </p>
    </AuroraCard>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* page header with breadcrumb + aurora background */}
      <PageHero
        eyebrow="About"
        title="We started as engineers. The domain made us specialists."
      />

      {/* anchor statement */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-balance text-lg leading-relaxed text-foreground/90 sm:text-2xl sm:leading-relaxed">
            Unlink is a specialist fintech technology company. For 5+ years we
            have designed and delivered payment infrastructure, AI-powered risk
            systems, enterprise workflows, and regulatory compliance platforms
            for banks, NBFCs, PSPs, and fintechs across India, Southeast Asia,
            and the Middle East. Along the way, the systems that solved the
            hardest problems became products: <Grad>Cimmetri</Grad>,{" "}
            <Grad>Enclave</Grad>, our <Grad>Payment Gateway</Grad>, and{" "}
            <Grad>Merchant Onboarding</Grad>.{" "}
            <Em>
              That is not a claim — it is the foundation of everything we do for
              the next client.
            </Em>
          </p>
        </Reveal>
      </section>

      {/* differentiation + on AI */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <StatementCard
              icon={ShieldCheck}
              eyebrow="The standard we build to"
              heading="Pass the audit, not just the demo."
            >
              The code we write has to <Em>pass a PCI-DSS audit</Em>,{" "}
              <Em>satisfy a MAS TRM examiner</Em>, survive a bank&apos;s security
              review, and operate at production scale{" "}
              <Em>without a single reconciliation error</Em>. Most firms can
              build software. Very few understand the compliance, regulatory,
              and operational consequences of the decisions inside it.{" "}
              <Em>We do</Em> — because we have already made them, under real
              production conditions, with real consequences.
            </StatementCard>
          </Reveal>

          <Reveal delay={100}>
            <StatementCard
              icon={Sparkles}
              eyebrow="On AI"
              heading="Can&apos;t AI just build this?"
            >
              We use AI tooling in our engineering — it makes us faster, and we
              built <Em>Enclave</Em>, so we understand it deeply. What AI cannot
              replace is <Em>domain judgement</Em>: knowing which architectural
              decision fails a MAS audit six months after go-live, or how a
              settlement system handles a reconciliation dispute at{" "}
              <Em>$50M daily volume</Em>. That knowledge comes from production.{" "}
              <Em>It is not in a training dataset.</Em>
            </StatementCard>
          </Reveal>
        </div>
      </section>
    </>
  );
}
