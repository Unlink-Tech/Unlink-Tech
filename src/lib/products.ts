import { CreditCard, Scale, UserRoundCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * The production products, as shown on the home page showcase.
 *
 * Kept here rather than inside the section component so the showcase layouts
 * and the visuals in product-visuals.tsx read from one source.
 *
 * Ordered as the transaction travels: onboard, accept, reconcile. The lifecycle
 * section directly above the showcase walks the same three in the same order,
 * so a reader meets the cards in the sequence they were just given. This list
 * is a narrative, which is why it is NOT sorted alphabetically the way the nav
 * and footer lists are: those are for looking something up, this one is for
 * being told a story.
 *
 * `hero` is the first of the product's measured figures and `points` are the
 * rest. Keeping the headline number out of the list is what stops it appearing
 * twice on the same card.
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
    slug: "merchant-onboarding",
    name: "Merchant Onboarding",
    category: "Automated KYC/KYB & risk scoring",
    icon: UserRoundCheck,
    description:
      "Turn weeks of onboarding into the same day, without loosening a single compliance control.",
    hero: { value: "−70%", caption: "Onboarding time" },
    points: [
      "Manual compliance decisions: 40/day → 4/day",
      "Approved merchants transacting the same day",
    ],
  },
  {
    slug: "payment-gateway",
    name: "Payment Gateway",
    category: "High-throughput acceptance & routing",
    icon: CreditCard,
    description:
      "Accept at scale with intelligent routing, broad currency support, and fast settlement. Built for the traffic spike, not the demo.",
    hero: { value: "10,000+ TPS", caption: "Peak throughput" },
    points: [
      "99.99% uptime in production",
      "40+ currencies · T+0 settlement where supported",
    ],
  },
  // Enclave hidden for now. Restoring this entry also restores its showcase
  // card and its sitemap URL, both of which are generated from this list.
  // {
  //   slug: "enclave",
  //   name: "Enclave",
  //   category: "Private, governed enterprise AI",
  //   icon: BrainCircuit,
  //   description:
  //     "Enterprise AI that answers in seconds and cites every claim, running entirely inside your boundary.",
  //   hero: { value: "Seconds", caption: "vs 20-minute manual searches" },
  //   points: [
  //     "Every claim cited to its source",
  //     "Deploy in your VPC, on-prem, or air-gapped",
  //   ],
  // },
  {
    slug: "cimmetri",
    name: "Cimmetri",
    category: "Reconciliation & exception management",
    icon: Scale,
    description:
      "Close the books faster and hand auditors a ready package, not a month-end scramble. Multi-source matching across gateways, banks, and ledgers, with exceptions routed, tracked, and resolved rather than buried in spreadsheets.",
    hero: { value: "15 → 3 days", caption: "Month-end close" },
    points: ["Audit package in 48 hours", "~70% of manual effort eliminated"],
  },
];
