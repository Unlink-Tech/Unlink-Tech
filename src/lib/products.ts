import {
  BrainCircuit,
  CreditCard,
  Scale,
  UserRoundCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * The four production products, as shown on the home page showcase.
 *
 * Kept here rather than inside the section component so the showcase layouts
 * and the visuals in product-visuals.tsx read from one source.
 */

export type ShowcaseProduct = {
  slug: string;
  name: string;
  category: string;
  icon: LucideIcon;
  description: string;
  /** The one number the product is measured on. */
  hero: { value: string; caption: string };
  points: string[];
};

export const showcaseProducts: ShowcaseProduct[] = [
  {
    slug: "cimmetri",
    name: "Cimmetri",
    category: "Reconciliation & financial operations",
    icon: Scale,
    description:
      "Close the books faster and hand auditors a ready package, not a month-end scramble.",
    hero: { value: "15 → 3 days", caption: "Month-end close" },
    points: ["Audit package in 48 hours", "~70% of manual effort eliminated"],
  },
  {
    slug: "enclave",
    name: "Enclave",
    category: "Private, governed enterprise AI",
    icon: BrainCircuit,
    description:
      "Enterprise AI that answers in seconds and cites every claim, running entirely inside your boundary.",
    hero: { value: "Seconds", caption: "vs 20-minute manual searches" },
    points: [
      "Every claim cited to its source",
      "Deploy in your VPC, on-prem, or air-gapped",
    ],
  },
  {
    slug: "payment-gateway",
    name: "Payment Gateway",
    category: "High-throughput acceptance & routing",
    icon: CreditCard,
    description:
      "Accept at scale with intelligent routing, broad currency support, and fast settlement.",
    hero: { value: "10,000+ TPS", caption: "Peak throughput" },
    points: [
      "99.99% uptime in production",
      "40+ currencies · T+0 settlement where supported",
    ],
  },
  {
    slug: "merchant-onboarding",
    name: "Merchant Onboarding",
    category: "Automated KYC/KYB & risk scoring",
    icon: UserRoundCheck,
    description:
      "Automated KYC/KYB and risk scoring that turns weeks of onboarding into the same day.",
    hero: { value: "−70%", caption: "Onboarding time" },
    points: [
      "Manual compliance decisions cut from 40/day to 4",
      "Approved merchants transacting the same day",
    ],
  },
];
