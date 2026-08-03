import type { ReactNode } from "react";
import {
  BrainCircuit,
  ClipboardCheck,
  Server,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * The five custom-engineering service lines, as shown on the home page and on
 * /custom-engineering.
 *
 * The short card copy lives here; the long-form detail for each service page is
 * in lib/services.ts. Kept out of the section component so the layout variants
 * and the visuals in service-visuals.tsx read from one source.
 *
 * `.tsx` rather than `.ts` because `proof` carries inline emphasis. The import
 * path is unchanged.
 */

/** Inline emphasis for the figures inside a proof statement. */
function Em({ children }: { children: ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>;
}

export type ServiceCard = {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  stats: string[];
  /**
   * What was actually shipped, in prose. The stats above are the headline
   * figures; this is the evidence behind them, and it is what a reader doing
   * due diligence needs in order to believe the chips.
   */
  proof: ReactNode;
  /** Grid span for the asymmetric bento layouts. Ignored by uniform grids. */
  span: string;
  /** The lead card, set larger in bento layouts. */
  feature?: boolean;
};

export const serviceCards: ServiceCard[] = [
  {
    slug: "fintech-platform-engineering",
    icon: Server,
    feature: true,
    span: "sm:col-span-2 lg:col-span-2",
    title: "Fintech Platform Engineering",
    // One sentence each, like the other four: the proof block below carries the
    // evidence, so the description does not have to argue as well as describe.
    description:
      "Gateways, settlement engines, and merchant platforms for high-volume regulated environments.",
    stats: ["$50M+/day", "99.99% uptime", "PCI-DSS Level 1"],
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
    slug: "ai-ml-product-development",
    icon: BrainCircuit,
    span: "",
    title: "AI & ML Product Development",
    description:
      "Fraud, anomaly, and risk scoring with governance and explainability from day one.",
    stats: ["98.7% detection", "−60% false positives", "MAS FEAT-compliant"],
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
    slug: "enterprise-workflow-onboarding",
    icon: ClipboardCheck,
    span: "",
    title: "Enterprise Workflow & Onboarding",
    description:
      "KYC/KYB automation and approval workflows where a workflow error is a compliance event.",
    stats: ["40/day → 4/day", "95% automated", "Full audit trail"],
    proof: (
      <>
        Manual compliance decisions reduced <Em>40/day → 4/day</Em> through
        tiered automation handling <Em>95% of cases</Em>, with full audit-trail
        integrity.
      </>
    ),
  },
  {
    slug: "regulatory-compliance-technology",
    icon: ShieldCheck,
    span: "",
    title: "Regulatory Compliance Technology",
    description:
      "Gap assessment to posture management across MAS TRM, RBI, SAMA, CBUAE. We know what examiners actually check.",
    stats: ["−85% TRM findings", "Board-ready attestation"],
    proof: (
      <>
        <Em>100% compliance posture</Em> achieved with board-level attestation
        readiness; open TRM findings reduced <Em>85%</Em> through targeted
        implementation, not policy-writing.
      </>
    ),
  },
  {
    slug: "mobile-field-commerce",
    icon: Smartphone,
    span: "",
    title: "Mobile & Field Commerce",
    description:
      "Offline-first, QR + NFC, iOS & Android from one codebase.",
    stats: ["4.8★", "1M+ transactions", "Offline-first"],
    proof: (
      <>
        A merchant mobile platform at a <Em>4.8-star rating</Em> with{" "}
        <Em>1M+ production transactions</Em>, handling connectivity loss without
        transaction-integrity failure.
      </>
    ),
  },
  // Alphabetical, matching lib/services.ts and the nav.
].sort((a, b) => a.title.localeCompare(b.title));
