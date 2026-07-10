import Link from "next/link";
import type { Metadata } from "next";
import {
  Activity,
  ArrowRight,
  Banknote,
  CreditCard,
  Gauge,
  Landmark,
  Route,
  Scale,
  ShieldCheck,
  Shuffle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NeuButton } from "@/components/ui/neu-button";
import { AuroraCard } from "@/components/ui/aurora-card";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StatTile } from "@/components/stat-tile";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Payment Gateway",
  description:
    "A payment gateway that survives 10× traffic and settles when it says it will — high-throughput acceptance, intelligent routing, and reliable settlement, engineered for production load.",
};

const raised =
  "shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)]";
const insetSm =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";
const gradientText =
  "bg-gradient-to-br from-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400";

/* ---------------- data ---------------- */

const problems: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Activity,
    title: "The failure is architectural",
    text: "Most gateway failures under load are not server capacity. They are one architectural decision made in week 2 of the build that nobody revisited — until peak traffic found it.",
  },
  {
    icon: Scale,
    title: "Settlement you can’t prove",
    text: "A gateway that accepts payments but cannot prove settlement to the rupee creates a reconciliation problem you pay for every month afterwards.",
  },
];

const valueProps: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Gauge,
    title: "Built for throughput",
    text: "10,000+ TPS peak capacity at 99.99% uptime in production — peak load is a Tuesday, not a crisis.",
  },
  {
    icon: Route,
    title: "Intelligent routing",
    text: "A universal routing engine picks the optimal path per transaction in real time — improving authorization rates and cutting cost per transaction across 40+ currencies and multiple rails.",
  },
  {
    icon: Landmark,
    title: "Settlement with certainty",
    text: "Reliable settlement including T+0 where supported, with a complete reconciliation trail behind every movement of money — natively compatible with Cimmetri.",
  },
  {
    icon: ShieldCheck,
    title: "PCI-DSS Level 1 patterns",
    text: "Compliance designed in and proven in a real audit environment — you clear audits instead of scrambling for them.",
  },
];

const stats = [
  { value: "10,000+ TPS", label: "Peak throughput" },
  { value: "99.99%", label: "Uptime in production" },
  { value: "40+", label: "Currencies supported" },
  { value: "T+0", label: "Settlement where supported" },
  { value: "PCI-DSS L1", label: "Proven in a real audit" },
];

const stages: { n: string; icon: LucideIcon; name: string; text: string }[] = [
  {
    n: "01",
    icon: CreditCard,
    name: "Accept",
    text: "One integration, every major payment method.",
  },
  {
    n: "02",
    icon: Shuffle,
    name: "Route",
    text: "The engine optimizes each transaction in real time.",
  },
  {
    n: "03",
    icon: Banknote,
    name: "Settle",
    text: "Funds move on schedule, fully reconciled and reported.",
  },
];

/* ---------------- page ---------------- */

export default function PaymentGatewayPage() {
  return (
    <>
      <PageHero
        eyebrow="High-throughput acceptance & routing"
        title="A payment gateway that survives 10× traffic — and settles when it says it will."
        subtitle="High-throughput acceptance, intelligent routing, and reliable settlement — engineered on the architecture decisions that only show up under production load."
      />

      {/* The problem */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12">
            <SectionHeading
              eyebrow="The problem"
              title="Gateways don’t fail on capacity — they fail on a decision."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {problems.map(({ icon: Icon, title, text }) => (
              <Reveal key={title}>
                <AuroraCard>
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-indigo-500 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400 ${insetSm}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {text}
                  </p>
                </AuroraCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Value propositions */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mb-12">
            <SectionHeading
              eyebrow="What it does"
              title="Throughput, routing, settlement — done right."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {valueProps.map(({ icon: Icon, title, text }) => (
              <Reveal key={title}>
                <AuroraCard>
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-indigo-500 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400 ${insetSm}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold tracking-tight">
                    <span className={gradientText}>{title}</span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {text}
                  </p>
                </AuroraCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* By the numbers */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mb-12">
            <SectionHeading eyebrow="Proof" title="By the numbers." />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {stats.map((s) => (
                <StatTile key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mb-12">
            <SectionHeading eyebrow="How it works" title="Accept. Route. Settle." />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {stages.map(({ n, icon: Icon, name, text }) => (
              <Reveal key={n}>
                <AuroraCard>
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-indigo-500 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400 ${insetSm}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className={`text-2xl font-bold tabular-nums ${gradientText}`}>
                      {n}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold tracking-tight">
                    <span className={gradientText}>{name}</span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {text}
                  </p>
                </AuroraCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60 bg-background px-4 py-20 sm:px-6 sm:py-24">
        <Reveal className="mx-auto max-w-4xl">
          <div className={`rounded-[2rem] bg-background p-8 text-center sm:p-14 ${raised}`}>
            <span
              className={`inline-flex items-center gap-2 rounded-full bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground ${insetSm}`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Technical walkthrough · with the engineers
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
              See the gateway{" "}
              <span className={gradientText}>in action.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              A technical walkthrough with the engineers who built it — under
              real production conditions, not a slide deck.
            </p>
            <NeuButton asChild variant="primary" size="lg" className="group mt-9">
              <Link href="/contact">
                See a technical walkthrough
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </NeuButton>
          </div>
        </Reveal>
      </section>

      {/* How this was built */}
      <section className="border-t border-border/60 bg-background px-4 pb-24 pt-16 sm:px-6">
        <Reveal className="mx-auto max-w-4xl">
          <div className={`rounded-3xl bg-background p-8 sm:p-10 ${raised}`}>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
              How this was built
            </p>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              Built and hardened in production: multi-currency, multi-rail
              routing live under real volume;{" "}
              <span className="font-medium text-foreground">
                99.99% uptime architecture with failover and DR
              </span>
              ; regulator-ready API design.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <NeuButton asChild variant="neutral" size="md" className="group">
                <Link href="/proof">
                  See the production systems
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </NeuButton>
              <NeuButton asChild variant="neutral" size="md" className="group">
                <Link href="/custom-engineering/fintech-platform-engineering">
                  Custom payment platform builds
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </NeuButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
