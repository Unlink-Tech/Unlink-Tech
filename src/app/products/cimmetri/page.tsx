import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Download,
  FileSearch,
  ListFilter,
  ShieldCheck,
  Timer,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NeuButton } from "@/components/ui/neu-button";
import { AuroraCard } from "@/components/ui/aurora-card";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StatTile } from "@/components/stat-tile";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Cimmetri",
  description:
    "Cimmetri is a cloud-native financial operations platform unifying reconciliation, settlement, exception resolution, and audit — closing your books in 3 days, not 15.",
};

const raised =
  "shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)]";
const inset =
  "shadow-[inset_5px_5px_10px_var(--neu-dark),inset_-5px_-5px_10px_var(--neu-light)]";
const insetSm =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";
const gradientText =
  "bg-gradient-to-br from-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400";

/* ---------------- data ---------------- */

const problemStats = [
  { value: "30–40%", label: "of back-office finance labour goes to reconciliation & exception handling" },
  { value: "70%", label: "of mid-market teams still reconcile in spreadsheets & tribal knowledge" },
  { value: "$1.5–2.5M", label: "a year for a 10-person exception-triage team at a single bank" },
];

const feedFormats = ["XML", "CSV", "SWIFT", "ISO 20022", "Parquet", "JSON", "FIX", "EDI"];

const harder: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Timer,
    title: "Legacy stacks are slow to change",
    text: "On-prem systems take 6–12 months to stand up, and every rule change waits on the vendor or on engineering.",
  },
  {
    icon: Wrench,
    title: "Exceptions stay manual",
    text: "The tooling treats duplicates, breaks, and manual matches as afterthoughts, so exception handling never stops being hands-on.",
  },
  {
    icon: FileSearch,
    title: "Audit is archaeology",
    text: "When the auditor arrives, reconstructing what happened to a transaction means digging through logs and spreadsheets.",
  },
];

const stages: { n: string; icon: LucideIcon; name: string; text: string; note?: string }[] = [
  {
    n: "01",
    icon: Download,
    name: "Ingest",
    text: "S3, SFTP, REST. A declarative dispatcher routes every incoming file to the right pipeline.",
  },
  {
    n: "02",
    icon: Zap,
    name: "Match",
    text: "An event-driven engine with independent per-pipeline elasticity.",
    note: "Benchmark: 30,000 exceptions × 30 rules in under 5 seconds.",
  },
  {
    n: "03",
    icon: ListFilter,
    name: "Investigate",
    text: "An exception workspace with five queues, smart filters, SLA-breach surfacing, and atomic manual-match and break-apart.",
  },
  {
    n: "04",
    icon: ShieldCheck,
    name: "Audit",
    text: "Immutable, regulator-grade lineage. Every state transition is reconstructable.",
    note: "Examination-ready package generated in 48 hours.",
  },
];

const differentiators: { title: string; text: string; code?: string; tag?: string }[] = [
  {
    title: "Manifest-driven everything",
    text: "Pipelines, rules, thresholds, and workflows are version-controlled declarative configuration — code-reviewed, CI-deployed, rolled back in seconds. Operations teams evolve their own reconciliation logic without waiting on engineering.",
    tag: "No incumbent does this.",
  },
  {
    title: "Multi-action workflow rules",
    text: "A sentence-style editor, versioned and auditable. Rivals stop at single-action rules.",
    code: "If status is Open AND break on Price THEN label Critical AND allocate to FX Desk.",
  },
  {
    title: "Atomic manual-match",
    text: "Pair or split rows and the match, counts, and audit commit together the instant you save. Break-apart is remembered forever. Rivals reconcile only on the next run.",
  },
  {
    title: "First-class duplicates",
    text: "Duplicates are a peer category with persistent dismissals, clustering, and cross-run bulk actions — not folded into a generic exception bucket.",
  },
];

const outcomes = [
  { value: "15 → 3 days", label: "Month-end close" },
  { value: "6 wks → 48 hrs", label: "Audit preparation" },
  { value: "18 → 4 hrs", label: "Exception first-touch" },
  { value: "~70%", label: "Manual reconciliation eliminated" },
  { value: "3–6 wks", label: "Go-live, API-first" },
];

/* ---------------- page ---------------- */

export default function CimmetriPage() {
  return (
    <>
      <PageHero
        eyebrow="Reconciliation & financial operations"
        title="Reconciliation that closes your books in 3 days, not 15."
        subtitle="Cimmetri is a cloud-native financial operations platform that unifies reconciliation, settlement, exception resolution, and audit on one system — built for payment companies and regulated finance teams reconciling high volumes across disparate sources."
      />

      {/* The problem */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12">
            <SectionHeading
              eyebrow="The problem"
              title="Finance runs on data that doesn’t agree."
              subtitle="Reconciling it is a fixed, rising cost — and it grows with every counterparty you add."
            />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {problemStats.map((s) => (
                <StatTile key={s.value} value={s.value} label={s.label} />
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-10">
            <div className={`rounded-3xl bg-background p-8 ${raised}`}>
              <p className="text-base leading-relaxed text-muted-foreground">
                Every new counterparty adds another feed — and the integration
                burden grows with each one:
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {feedFormats.map((f) => (
                  <li
                    key={f}
                    className={`rounded-full bg-background px-4 py-1.5 text-sm font-medium text-foreground/80 ${insetSm}`}
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why it's harder */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mb-12">
            <SectionHeading
              eyebrow="Why it’s harder than it looks"
              title="The real cost is in the edges."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {harder.map(({ icon: Icon, title, text }) => (
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

      {/* How it works */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mb-12">
            <SectionHeading
              eyebrow="How it works"
              title="Four stages, one system."
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map(({ n, icon: Icon, name, text, note }) => (
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
                  {note && (
                    <div className={`mt-auto rounded-xl bg-background px-3.5 py-2.5 ${inset}`}>
                      <p className="text-xs font-medium leading-snug text-foreground/80">
                        {note}
                      </p>
                    </div>
                  )}
                </AuroraCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What sets it apart */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mb-12">
            <SectionHeading
              eyebrow="What sets it apart"
              title="What no incumbent does."
              subtitle="The difference is not features — it’s where the control lives."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {differentiators.map((d) => (
              <Reveal key={d.title} className="min-w-0">
                <AuroraCard className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold tracking-tight sm:text-xl">
                    <span className={gradientText}>{d.title}</span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {d.text}
                  </p>
                  {d.code && (
                    <pre
                      className={`mt-4 whitespace-pre-wrap break-words rounded-xl bg-background px-4 py-3 font-mono text-xs leading-relaxed text-foreground/90 ${inset}`}
                    >
                      {d.code}
                    </pre>
                  )}
                  {d.tag && (
                    <p className="mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      {d.tag}
                    </p>
                  )}
                </AuroraCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mb-12">
            <SectionHeading
              eyebrow="Outcomes"
              title="What changes when you run it."
              subtitle="Headcount decoupled from volume — no rip-and-replace."
            />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {outcomes.map((o) => (
                <StatTile key={o.label} value={o.value} label={o.label} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 48-hour pilot */}
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
              No commitment · no infrastructure change · no cost
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
              See it on{" "}
              <span className={gradientText}>your own data</span> in 48 hours.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Run 30 days of your own settlement data through the Cimmetri engine
              and receive a full exception report within 48 hours — unmatched
              exceptions with category and age breakdown, and a full lifecycle
              summary.
            </p>
            <NeuButton asChild variant="primary" size="lg" className="group mt-9">
              <Link href="/contact">
                Request the 48-hour pilot
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
              Cimmetri grew out of settlement systems we engineered and ran for
              clients — including a settlement engine at{" "}
              <span className="font-medium text-foreground">
                100% reconciliation accuracy on $50M+ daily volume
              </span>
              .
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <NeuButton asChild variant="neutral" size="md" className="group">
                <Link href="/proof">
                  See the production systems
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </NeuButton>
              <NeuButton asChild variant="neutral" size="md" className="group">
                <Link href="/custom-engineering">
                  Reconciliation logic no product ships
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
