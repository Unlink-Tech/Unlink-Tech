import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Cloud,
  Database,
  FileText,
  Network,
  Search,
  Server,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NeuButton } from "@/components/ui/neu-button";
import { AuroraCard } from "@/components/ui/aurora-card";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StatTile } from "@/components/stat-tile";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Enclave",
  description:
    "Enclave is a private, governed AI platform that unifies your documents, knowledge, and live databases behind one plain-English interface — every answer cited, every request governed, inside your boundary.",
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

const problems: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Search,
    title: "~20 minutes lost per search",
    text: "Answers are scattered across documents, wikis, and inboxes — every employee loses roughly 20 minutes to knowledge search, every day.",
  },
  {
    icon: Database,
    title: "Data behind analysts and SQL",
    text: "Business data sits behind analysts and query languages, so routine questions queue for days waiting on someone with access.",
  },
  {
    icon: ShieldAlert,
    title: "Shadow AI leaks data",
    text: "When staff reach for consumer AI to move faster, sensitive data leaves the governed boundary — a compliance incident waiting to be discovered.",
  },
];

const requirements = [
  "Enforce RBAC on every request",
  "Ground every claim in a citable source",
  "Touch databases read-only",
  "Log everything for the auditor",
];

const capabilities: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: FileText,
    title: "Knowledge retrieval with citations",
    text: "Answers grounded in your own sources via a retrieval-augmented pipeline — every claim cited to the exact document or record.",
  },
  {
    icon: Database,
    title: "Live data without SQL",
    text: "Plain-English questions become read-only, SELECT-only queries on PostgreSQL and MySQL. The AI can read your data — never modify it.",
  },
  {
    icon: Network,
    title: "Agent orchestration",
    text: "An orchestrator dispatches specialist agents — knowledge, SQL, tools, reasoning, guardrails — in parallel, then merges the results into one sourced answer.",
  },
  {
    icon: ShieldCheck,
    title: "Governance at every layer",
    text: "JWT authentication, RBAC on every request, AES-256 at rest, sandboxed tools, input/output guardrails, and a full audit trail.",
  },
];

const deployments: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Server,
    title: "Customer-hosted",
    text: "Your cloud, your VPC, or fully on-premises — documents, embeddings, and logs never leave your boundary. Self-hosted open-weight models available for air-gapped environments.",
  },
  {
    icon: Cloud,
    title: "Unlink-hosted",
    text: "A fully managed service, isolated per tenant — the fastest path to value, with no infrastructure for your team to run.",
  },
];

const economics = [
  { value: "~$113/mo", label: "Fixed single-tenant infrastructure" },
  { value: "$6–118/mo", label: "AI usage, dev to heavy · ~$0.004 / request" },
  { value: "+$120/mo", label: "Production high-availability" },
];

const outcomes = [
  { value: "Seconds", label: "Time-to-answer, down from ~20-minute searches" },
  { value: "No queue", label: "Data questions self-served, no analyst needed" },
  { value: "Retained", label: "Institutional knowledge survives staff turnover" },
  { value: "No trade-off", label: "AI capability without giving up governance" },
];

/* ---------------- page ---------------- */

export default function EnclavePage() {
  return (
    <>
      <PageHero
        eyebrow="Private, governed enterprise AI"
        title="Enterprise AI that knows your business — and stays inside your boundary."
        subtitle="Enclave is a private, governed AI platform that unifies your documents, institutional knowledge, and live databases behind one plain-English interface — every answer cited to its exact source, every request governed by your roles and your audit trail."
      />

      {/* The problem */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12">
            <SectionHeading
              eyebrow="The problem"
              title="Information-rich, access-poor."
              subtitle="The answers exist — they’re just buried, gated, or quietly leaking out."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
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

      {/* Why it's harder */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mb-12">
            <SectionHeading
              eyebrow="Why it’s harder than it looks"
              title="An architecture problem before a model problem."
            />
          </Reveal>
          <Reveal>
            <div className={`rounded-3xl bg-background p-8 ${raised}`}>
              <p className="text-base leading-relaxed text-muted-foreground">
                A chatbot bolted onto a document store hallucinates, ignores
                access rights, and writes to nothing — or worse, to everything.
                Governed enterprise AI has to do four things at once:
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {requirements.map((r) => (
                  <li
                    key={r}
                    className="flex items-center gap-3 text-sm font-medium text-foreground"
                  >
                    <span
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background text-indigo-500 dark:text-indigo-400 ${insetSm}`}
                    >
                      <ShieldCheck className="h-4 w-4" />
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What Enclave does */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mb-12">
            <SectionHeading
              eyebrow="What Enclave does"
              title="One interface, four engines."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {capabilities.map(({ icon: Icon, title, text }) => (
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

      {/* Deployment */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mb-12">
            <SectionHeading
              eyebrow="Deployment"
              title="Deploy where your regulator requires."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {deployments.map(({ icon: Icon, title, text }) => (
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
          <Reveal className="mt-6">
            <div className={`rounded-2xl bg-background px-6 py-5 ${inset}`}>
              <p className="text-sm leading-relaxed text-foreground/80">
                No tenant&apos;s data is ever shared with, or used to train models
                for, another. Roughly{" "}
                <span className="font-medium text-foreground">
                  four weeks from deployment to go-live
                </span>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Economics */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mb-12">
            <SectionHeading
              eyebrow="Economics"
              title="Predictable cost, not an unbounded token bill."
              subtitle="Flat, infrastructure-anchored pricing that does not scale linearly with every question your staff asks."
            />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {economics.map((e) => (
                <StatTile key={e.label} value={e.value} label={e.label} />
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-6">
            <p className="text-sm text-muted-foreground">
              Enterprise pricing is packaged separately — but the flat,
              transparent cost model is itself a differentiator.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mb-12">
            <SectionHeading
              eyebrow="Outcomes"
              title="What changes when it’s in."
            />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {outcomes.map((o) => (
                <StatTile key={o.label} value={o.value} label={o.label} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Guided evaluation CTA */}
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
              One week · your data · your questions
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
              Point it at your data.{" "}
              <span className={gradientText}>Check the citations yourself.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Point Enclave at one document set and one read-only database.
              Within a week, your team asks it real questions and verifies every
              citation for themselves.
            </p>
            <NeuButton asChild variant="primary" size="lg" className="group mt-9">
              <Link href="/contact">
                Start a guided evaluation
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
              Enclave&apos;s governance model comes from the same discipline as
              our regulated builds — RBAC designed for audit, SELECT-only data
              access, full trails. Built by the team behind{" "}
              <span className="font-medium text-foreground">
                MAS FEAT-compliant fraud AI in production
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
                <Link href="/custom-engineering/ai-ml-product-development">
                  Custom AI/ML builds
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
