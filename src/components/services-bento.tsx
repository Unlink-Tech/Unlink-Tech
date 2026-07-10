import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  ClipboardCheck,
  Server,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AuroraCard } from "@/components/ui/aurora-card";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const insetSm =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";

type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  stats: string[];
  span: string;
  feature?: boolean;
};

const services: Service[] = [
  {
    slug: "fintech-platform-engineering",
    icon: Server,
    feature: true,
    span: "sm:col-span-2 lg:col-span-2",
    title: "Fintech Platform Engineering",
    description:
      "Payment gateways, settlement engines, and merchant platforms — built for regulated environments and high-volume scale. We know the architecture decision that determines whether a gateway survives 10× traffic, because we have made it.",
    stats: ["100% reconciliation on $50M+/day", "99.99% uptime", "PCI-DSS Level 1"],
  },
  {
    slug: "ai-ml-product-development",
    icon: BrainCircuit,
    span: "",
    title: "AI & ML Product Development",
    description:
      "Fraud, anomaly, and risk scoring — with model governance and explainability from day one.",
    stats: ["98.7% detection", "−60% false positives", "MAS FEAT-compliant"],
  },
  {
    slug: "enterprise-workflow-onboarding",
    icon: ClipboardCheck,
    span: "",
    title: "Enterprise Workflow & Onboarding",
    description:
      "KYC/KYB automation, approval workflows, and ERP for regulated industries — where a workflow error is a compliance event.",
    stats: ["40/day → 4/day", "95% automated", "Full audit trail"],
  },
  {
    slug: "regulatory-compliance-technology",
    icon: ShieldCheck,
    span: "",
    title: "Regulatory Compliance Technology",
    description:
      "Gap assessment, implementation, and posture management across MAS TRM, RBI, SAMA, and CBUAE. We know what examiners actually check.",
    stats: ["100% compliance posture", "−85% TRM findings", "Board-ready attestation"],
  },
  {
    slug: "mobile-field-commerce",
    icon: Smartphone,
    span: "",
    title: "Mobile & Field Commerce",
    description:
      "Consumer-grade mobile acceptance for field conditions — offline-first, QR + NFC, iOS & Android from one codebase.",
    stats: ["4.8★ rating", "1M+ transactions", "Offline-first"],
  },
];

function BentoCard({ service }: { service: Service }) {
  const { slug, icon: Icon, title, description, stats, span, feature } = service;
  return (
    <Link
      href={`/custom-engineering/${slug}`}
      className={cn(
        "block h-full rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        span,
      )}
    >
      <AuroraCard>
        <span
          className={cn(
            "inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-indigo-500 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400",
            insetSm,
          )}
        >
          <Icon className="h-6 w-6" />
        </span>

        <h3
          className={cn(
            "mt-6 font-bold tracking-tight",
            feature ? "text-2xl sm:text-3xl" : "text-xl",
          )}
        >
          <span className="bg-gradient-to-br from-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
            {title}
          </span>
        </h3>

        <p
          className={cn(
            "mt-3 leading-relaxed text-muted-foreground",
            feature ? "max-w-lg text-base" : "text-sm",
          )}
        >
          {description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {stats.map((s) => (
            <li
              key={s}
              className={cn(
                "rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground/80",
                insetSm,
              )}
            >
              {s}
            </li>
          ))}
        </ul>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-indigo-600 dark:text-indigo-400">
          Explore this service
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </AuroraCard>
    </Link>
  );
}

export function ServicesBento() {
  return (
    <section className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <Reveal className="mb-14">
          <SectionHeading
            eyebrow="Custom Engineering"
            title="Five service lines. One domain: regulated fintech."
            subtitle="When no product fits, the same team builds it — every capability already shipped, audited, and run in production."
          />
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <BentoCard key={service.slug} service={service} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
