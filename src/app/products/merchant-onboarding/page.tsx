import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ClipboardCheck,
  Layers,
  Rocket,
  SearchCheck,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NeuButton } from "@/components/ui/neu-button";
import { AuroraCard } from "@/components/ui/aurora-card";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StatTile } from "@/components/stat-tile";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Merchant Onboarding",
  description:
    "Onboard merchants in hours, not weeks: automated KYC/KYB, risk scoring, and tiered approval workflows with a full audit trail on every decision.",
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
    icon: ShieldAlert,
    title: "A workflow error is a compliance breach",
    text: "In regulated finance, a mistake in onboarding is not a bug. It is a breach. So teams review everything manually, and merchants wait weeks.",
  },
  {
    icon: Users,
    title: "Headcount scales with volume",
    text: "Manual review means cost grows with every application. At 300 merchants a month, onboarding overhead runs $250K+ per year.",
  },
];

const valueProps: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ClipboardCheck,
    title: "Automate the paperwork",
    text: "KYC and KYB checks run automatically with configurable verification flows and a full evidence trail. Your team reviews exceptions, not every application.",
  },
  {
    icon: Layers,
    title: "Tiered decision logic",
    text: "Auto-approve, recommend-and-review, or full manual, designed so ~95% of cases resolve without human intervention while audit integrity holds. In production, this cut manual compliance decisions from 40/day to 4.",
  },
  {
    icon: ShieldCheck,
    title: "Controls built for the examiner",
    text: "Four-eyes approval, escalation and override controls, and role-based access designed for regulatory audit.",
  },
  {
    icon: TrendingUp,
    title: "Scale without hiring",
    text: "Onboarding time down 70%. Handle 10× the applications with the same team, and approved merchants transact the same day.",
  },
];

const stats = [
  { value: "40 → 4", label: "Manual decisions per day" },
  { value: "~95%", label: "Cases auto-resolved" },
  { value: "−70%", label: "Onboarding time" },
  { value: "10×", label: "Applications, same team" },
  { value: "Same day", label: "Merchant go-live" },
];

const stages: { n: string; icon: LucideIcon; name: string; text: string }[] = [
  {
    n: "01",
    icon: UserPlus,
    name: "Apply",
    text: "A guided flow captures everything needed, once.",
  },
  {
    n: "02",
    icon: SearchCheck,
    name: "Verify",
    text: "Automated KYC/KYB and risk checks run in the background.",
  },
  {
    n: "03",
    icon: Rocket,
    name: "Go live",
    text: "Approved merchants transact the same day.",
  },
];

/* ---------------- page ---------------- */

export default function MerchantOnboardingPage() {
  return (
    <>
      <PageHero
        eyebrow="Automated KYC/KYB & risk scoring"
        title="Onboard merchants in hours, not weeks, with an audit trail on every decision."
        subtitle="Automated KYC/KYB, risk scoring, and tiered approval workflows that turn a compliance bottleneck into a competitive advantage."
      />

      {/* The problem */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12">
            <SectionHeading
              eyebrow="The problem"
              title="Every manual review is a cost, and a risk."
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
              title="Compliance that runs at the speed of your pipeline."
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
            <SectionHeading eyebrow="How it works" title="Apply. Verify. Go live." />
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
              30-minute walkthrough · the decision engine
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
              Streamline your{" "}
              <span className={gradientText}>onboarding.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Start with a 30-minute walkthrough of the decision engine: see the
              tiered logic and the audit trail on real cases.
            </p>
            <NeuButton asChild variant="primary" size="lg" className="group mt-9">
              <Link href="/contact">
                Book a 30-minute walkthrough
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
              Productized from an onboarding system we shipped for a regulated
              client:{" "}
              <span className="font-medium text-foreground">
                40 manual decisions a day down to 4, with full audit-trail
                integrity
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
                <Link href="/custom-engineering/enterprise-workflow-onboarding">
                  Custom workflow builds
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
