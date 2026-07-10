import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BrainCircuit,
  ClipboardCheck,
  Server,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NeuButton } from "@/components/ui/neu-button";
import { AuroraCard } from "@/components/ui/aurora-card";
import { PageHero } from "@/components/page-hero";
import { CrossLink } from "@/components/cross-link";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Custom Engineering",
  description:
    "When no vendor sells what a bank, NBFC, PSP, or fintech needs, the same team designs and ships it end to end — in production, in your regulatory environment. Five service lines within regulated fintech.",
};

/** Neumorphic inset helpers, driven by the theme's --neu-* variables. */
const inset =
  "shadow-[inset_5px_5px_10px_var(--neu-dark),inset_-5px_-5px_10px_var(--neu-light)]";
const insetSm =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";

/** Inline emphasis for the proof metrics. */
function Em({ children }: { children: ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>;
}

type Service = {
  n: string;
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  proof: ReactNode;
};

const services: Service[] = [
  {
    n: "01",
    slug: "fintech-platform-engineering",
    icon: Server,
    title: "Fintech Platform Engineering",
    description:
      "Payment gateways, settlement engines, merchant platforms — built for regulated environments and high-volume scale. We know the architecture decision that determines whether a gateway survives 10× traffic — because we have made it.",
    proof: (
      <>
        A production gateway handling multi-currency transactions at{" "}
        <Em>PCI-DSS Level 1</Em>; a settlement engine at{" "}
        <Em>100% reconciliation accuracy on $50M+ daily volume</Em>;{" "}
        <Em>99.99% uptime</Em> architecture with failover and DR.
      </>
    ),
  },
  {
    n: "02",
    slug: "ai-ml-product-development",
    icon: BrainCircuit,
    title: "AI & ML Product Development",
    description:
      "Fraud detection, anomaly detection, risk scoring — with model governance and explainability from day one. Not a proof of concept — production AI that survives a regulatory audit.",
    proof: (
      <>
        A production fraud ML system at <Em>98.7% detection</Em>,{" "}
        <Em>60% fewer false positives</Em> than the rule-based system it
        replaced, <Em>sub-50ms scoring latency</Em>, and{" "}
        <Em>MAS FEAT-compliant explainability</Em> built into the architecture.
      </>
    ),
  },
  {
    n: "03",
    slug: "enterprise-workflow-onboarding",
    icon: ClipboardCheck,
    title: "Enterprise Workflow & Onboarding Systems",
    description:
      "KYC/KYB automation, approval workflows, and ERP systems for regulated industries — where a workflow error is a compliance event.",
    proof: (
      <>
        Manual compliance decisions reduced <Em>40/day → 4/day</Em> through
        tiered automation handling <Em>95% of cases</Em>, with full audit-trail
        integrity.
      </>
    ),
  },
  {
    n: "04",
    slug: "regulatory-compliance-technology",
    icon: ShieldCheck,
    title: "Regulatory Compliance Technology (MAS TRM & Beyond)",
    description:
      "Gap assessment, implementation, and ongoing posture management — MAS TRM and Cyber Hygiene in Singapore, and the equivalent regimes across India (RBI), Southeast Asia, and the Middle East (SAMA, CBUAE). We know what examiners actually check, because we have implemented these controls in a live regulated environment and watched them be tested. A quarterly retainer model tied to the compliance calendar.",
    proof: (
      <>
        <Em>100% compliance posture</Em> achieved with board-level attestation
        readiness; open TRM findings reduced <Em>85%</Em> through targeted
        implementation, not policy-writing.
      </>
    ),
  },
  {
    n: "05",
    slug: "mobile-field-commerce",
    icon: Smartphone,
    title: "Mobile & Field Commerce Platforms",
    description:
      "Consumer-grade mobile payment acceptance for field conditions — offline-first architecture as the primary design, QR and NFC, iOS and Android from one codebase.",
    proof: (
      <>
        A merchant mobile platform at a <Em>4.8-star rating</Em> with{" "}
        <Em>1M+ production transactions</Em>, handling connectivity loss without
        transaction-integrity failure.
      </>
    ),
  },
];

function ServiceCard({ service }: { service: Service }) {
  const { n, slug, icon: Icon, title, description, proof } = service;
  return (
    <AuroraCard>
      <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
        {/* left — number, icon, title */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4">
            <span
              className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-indigo-500 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400 ${insetSm}`}
            >
              <Icon className="h-6 w-6" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Service line {n}
            </span>
          </div>
          <h2 className="mt-5 text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
            <span className="bg-gradient-to-br from-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
              {title}
            </span>
          </h2>

          <NeuButton
            asChild
            variant="neutral"
            size="md"
            className="group/btn mt-6"
          >
            <Link href={`/custom-engineering/${slug}`}>
              Explore this service
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
          </NeuButton>
        </div>

        {/* right — description + proof readout */}
        <div className="lg:col-span-3">
          <p className="text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
          <div className={`mt-6 rounded-2xl bg-background p-5 ${inset}`}>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
              Proof
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              {proof}
            </p>
          </div>
        </div>
      </div>
    </AuroraCard>
  );
}

export default function CustomEngineeringPage() {
  return (
    <>
      {/* page header with breadcrumb + aurora background */}
      <PageHero
        eyebrow="Custom Engineering"
        title="When the product doesn't exist yet, we build it."
        subtitle="Our products came from client work. When a bank, NBFC, PSP, or fintech needs something no vendor sells, the same team designs and ships it — end to end, in production, in your regulatory environment. 5+ years of doing exactly this."
      />

      {/* intro */}
      <section className="px-4 py-16 sm:px-6">
        <Reveal className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-muted-foreground">
            We work in five service lines — all within one domain: regulated
            fintech. They are not separate practices; they are five aspects of
            the same expertise. And they are where our products came from: every
            capability below has already been shipped, audited, and run at
            production scale before we ever offered it to you.
          </p>
        </Reveal>
      </section>

      {/* service lines */}
      <section className="px-4 pb-8 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-8">
          {services.map((service) => (
            <Reveal key={service.n}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* cross-link block */}
      <CrossLink
        href="/products"
        ctaLabel="Explore the products"
        text={
          <>
            Prefer proven infrastructure over a custom build?{" "}
            <span className="font-medium text-foreground">
              Four of these capabilities are already productized — deploy them
              instead of building.
            </span>
          </>
        }
      />
    </>
  );
}
