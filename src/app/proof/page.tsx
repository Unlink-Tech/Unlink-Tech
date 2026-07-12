import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  BrainCircuit,
  ClipboardCheck,
  CreditCard,
  Lock,
  Scale,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AuroraCard } from "@/components/ui/aurora-card";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Proof",
  description:
    "5+ years of fintech-grade systems across payments, settlement, fraud, onboarding, compliance, and enterprise AI. Every claim carries a number; none requires a client name.",
};

const raisedSm =
  "shadow-[5px_5px_10px_var(--neu-dark),-5px_-5px_10px_var(--neu-light)]";
const inset =
  "shadow-[inset_5px_5px_10px_var(--neu-dark),inset_-5px_-5px_10px_var(--neu-light)]";
const insetSm =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";

function Em({ children }: { children: ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>;
}

/* ---- platform statistics ------------------------------------------------ */

const stats: { figure: string; metric: string }[] = [
  { figure: "5+", metric: "Years shipping regulated fintech systems" },
  { figure: "99.99%", metric: "Payment gateway uptime SLA achieved" },
  { figure: "10,000+ TPS", metric: "Peak transaction processing capacity" },
  { figure: "40+", metric: "Currencies supported in production" },
  { figure: "100%", metric: "Settlement reconciliation accuracy" },
  { figure: "$50M+", metric: "Daily volume on settlement system" },
  { figure: "98.7%", metric: "Fraud detection rate (production ML)" },
  { figure: "−60%", metric: "False positives vs rule-based system" },
  { figure: "<50ms", metric: "ML scoring latency in production" },
  { figure: "40 → 4", metric: "Onboarding manual decisions per day" },
  { figure: "−70%", metric: "Onboarding time" },
  { figure: "−85%", metric: "MAS TRM findings post-engagement" },
  { figure: "4.8★ / 1M+", metric: "Mobile platform rating / transactions" },
  { figure: "−60%", metric: "Time-to-market vs in-house build" },
];

/* ---- capability briefs -------------------------------------------------- */

type Brief = {
  icon: LucideIcon;
  domain: string;
  product: string | null;
  problem: string;
  complexity: string;
  architecture: string;
  outcome: string;
  origin: string;
};

const briefs: Brief[] = [
  {
    icon: CreditCard,
    domain: "Payment acceptance & routing",
    product: "Payment Gateway",
    problem:
      "Accept card and alternative payments across dozens of currencies without dropping a transaction when volume spikes 10× at peak.",
    complexity:
      "PCI-DSS Level 1 scope, idempotency under acquirer retries, cross-acquirer failover, and multi-currency settlement timing.",
    architecture:
      "An idempotent transaction ledger, per-acquirer circuit breakers, routing on live cost and success-rate signals, and stateless gateways scaled horizontally behind a durable queue.",
    outcome: "10,000+ TPS peak · 99.99% uptime · 40+ currencies live.",
    origin: "This system is where our Payment Gateway came from.",
  },
  {
    icon: Scale,
    domain: "Settlement & reconciliation",
    product: "Cimmetri",
    problem:
      "Reconcile every leg of a payment against bank statements and processor reports at high daily volume, with zero tolerance for a missed cent.",
    complexity:
      "Settlement timing differences, partial captures, chargebacks, and multi-party disputes that a naive matcher silently drops.",
    architecture:
      "An event-sourced ledger with deterministic matching rules, exception queues for the minority of cases that need human judgment, and an immutable audit trail on every match and adjustment.",
    outcome:
      "100% reconciliation accuracy on $50M+ daily · month-end close 15 → 3 days · audit pack in 48 hours.",
    origin: "This system is where Cimmetri came from.",
  },
  {
    icon: BrainCircuit,
    domain: "Fraud & risk ML",
    product: null,
    problem:
      "Catch fraud in real time without burying the operations team in false positives, and prove every decision to a regulator.",
    complexity:
      "Severe class imbalance, concept drift, a sub-50ms latency budget, and MAS FEAT explainability obligations.",
    architecture:
      "A feature store feeding gradient-boosted and graph models, shadow-deployed against the incumbent rules engine, with per-decision reason codes captured at inference time.",
    outcome: "98.7% detection · −60% false positives vs rules · <50ms scoring.",
    origin:
      "This work seeded our AI & ML practice, and the governance behind Enclave.",
  },
  {
    icon: ClipboardCheck,
    domain: "Onboarding & KYC/KYB",
    product: "Merchant Onboarding",
    problem:
      "Take a merchant from application to live in hours, not weeks, without lowering the compliance bar.",
    complexity:
      "Cross-jurisdiction KYC/KYB, sanctions and PEP screening, document verification, and risk-tiering a compliance officer will sign off on.",
    architecture:
      "A tiered decision engine that auto-clears low-risk cases, routes edge cases to a reviewer with full context, and writes an evidence trail for every decision.",
    outcome:
      "Manual decisions 40/day → 4/day · 95% auto-handled · onboarding time −70% · same-day go-live.",
    origin: "This system is where Merchant Onboarding came from.",
  },
  {
    icon: ShieldCheck,
    domain: "Regulatory compliance technology",
    product: null,
    problem:
      "Reach and hold a defensible compliance posture across MAS TRM, RBI, SAMA, and CBUAE: a working control set, not a policy binder.",
    complexity:
      "Mapping controls to live systems, continuous evidence collection, and knowing which findings an examiner actually tests first.",
    architecture:
      "Control-to-system mapping with automated evidence capture, a findings tracker tied to the compliance calendar, and board-level attestation reporting.",
    outcome:
      "100% posture with board-ready attestation · open TRM findings −85% through implementation, not paperwork.",
    origin: "This became our MAS TRM and compliance-technology practice.",
  },
  {
    icon: Lock,
    domain: "Governed enterprise AI",
    product: "Enclave",
    problem:
      "Give an enterprise useful AI over its own documents without the data ever leaving its boundary, and cite every answer to a source.",
    complexity:
      "Retrieval quality on messy internal corpora, source attribution, document-level access control, and deployment into VPC, on-prem, or air-gapped environments.",
    architecture:
      "Retrieval-augmented generation with per-chunk citations, tenant-isolated indexes, and a governance layer that enforces permissions at query time.",
    outcome:
      "Answers in seconds vs 20-minute searches · every claim cited · deployable in ~4 weeks.",
    origin: "This system is where Enclave came from.",
  },
];

function Block({
  label,
  children,
  strong,
}: {
  label: string;
  children: ReactNode;
  strong?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
        {label}
      </p>
      <p
        className={cn(
          "mt-2 text-sm leading-relaxed",
          strong ? "font-medium text-foreground" : "text-muted-foreground",
        )}
      >
        {children}
      </p>
    </div>
  );
}

function BriefCard({ brief }: { brief: Brief }) {
  const { icon: Icon, domain, product, problem, complexity, architecture, outcome, origin } =
    brief;
  return (
    <AuroraCard>
      <div className="flex flex-wrap items-center gap-4">
        <span
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background text-indigo-500 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400 ${insetSm}`}
        >
          <Icon className="h-6 w-6" />
        </span>
        <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
          <span className="bg-gradient-to-br from-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
            {domain}
          </span>
        </h3>
        {product && (
          <span
            className={`inline-flex items-center rounded-full bg-background px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 ${insetSm}`}
          >
            → {product}
          </span>
        )}
      </div>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <Block label="The problem">{problem}</Block>
        <Block label="The complexity">{complexity}</Block>
        <Block label="The architecture">{architecture}</Block>
        <Block label="The outcome" strong>
          {outcome}
        </Block>
      </div>

      <div className={`mt-7 rounded-2xl bg-background px-5 py-4 ${inset}`}>
        <p className="text-sm font-medium text-foreground/80">{origin}</p>
      </div>
    </AuroraCard>
  );
}

export default function ProofPage() {
  return (
    <>
      {/* page header with breadcrumb + aurora background */}
      <PageHero
        eyebrow="Proof"
        title="Shipped. In production. Under real regulatory load."
      />

      {/* intro */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            Our client work is confidential, which is what you would want if you
            were the client. What we share instead is the depth of the work: 5+
            years of fintech-grade systems across payments, settlement, fraud,
            onboarding, compliance, and enterprise AI.{" "}
            <Em>
              Every claim below carries a number; none requires a client name.
            </Em>{" "}
            If you are doing due diligence, this tells you more than a reference
            list would.
          </p>
        </Reveal>
      </section>

      {/* platform statistics */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mb-12">
            <SectionHeading
              eyebrow="Platform statistics"
              title="By the numbers."
              subtitle="Every claim carries a figure, and none requires a client name."
            />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {stats.map(({ figure, metric }) => (
                <AuroraCard
                  key={metric}
                  className={`rounded-2xl p-5 sm:p-6 ${raisedSm}`}
                >
                  <div className="bg-gradient-to-br from-indigo-500 to-violet-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent tabular-nums sm:text-3xl dark:from-indigo-400 dark:to-violet-400">
                    {figure}
                  </div>
                  <div className="mt-1.5 text-xs leading-snug text-muted-foreground sm:text-sm">
                    {metric}
                  </div>
                </AuroraCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* capability briefs */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mb-12">
            <SectionHeading
              eyebrow="Capability briefs"
              title="Technical depth, not a reference list."
              subtitle="How the hardest systems were actually built, and the products they became."
            />
          </Reveal>
          <div className="space-y-8">
            {briefs.map((brief) => (
              <Reveal key={brief.domain}>
                <BriefCard brief={brief} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
