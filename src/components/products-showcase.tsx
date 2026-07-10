import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  CreditCard,
  Scale,
  UserRoundCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NeuButton } from "@/components/ui/neu-button";
import { AuroraCard } from "@/components/ui/aurora-card";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

/** Neumorphic inset helpers for the readout well, icon niche and check dots. */
const inset =
  "shadow-[inset_5px_5px_10px_var(--neu-dark),inset_-5px_-5px_10px_var(--neu-light)]";
const insetSm =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";

type Product = {
  slug: string;
  name: string;
  category: string;
  icon: LucideIcon;
  description: string;
  hero: { value: string; caption: string };
  points: string[];
};

const products: Product[] = [
  {
    slug: "cimmetri",
    name: "Cimmetri",
    category: "Reconciliation & financial operations",
    icon: Scale,
    description:
      "Close the books faster and hand auditors a ready package — not a month-end scramble.",
    hero: { value: "15 → 3 days", caption: "Month-end close" },
    points: [
      "Audit package in 48 hours",
      "~70% of manual effort eliminated",
    ],
  },
  {
    slug: "enclave",
    name: "Enclave",
    category: "Private, governed enterprise AI",
    icon: BrainCircuit,
    description:
      "Enterprise AI that answers in seconds and cites every claim — running entirely inside your boundary.",
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

function ProofCard({ product }: { product: Product }) {
  const { icon: Icon, name, category, hero, points } = product;
  return (
    <div className="relative">
      {/* soft brand glow behind the card */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(99,102,241,0.18),transparent_70%)] blur-2xl dark:bg-[radial-gradient(60%_60%_at_50%_40%,rgba(129,140,248,0.16),transparent_70%)]" />

      <AuroraCard>
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-indigo-500 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400 ${insetSm}`}
          >
            <Icon className="h-6 w-6" />
          </span>
          <span className="text-right text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {category}
          </span>
        </div>

        {/* hero proof stat in an inset "readout" well */}
        <div className={`mt-7 rounded-2xl bg-background px-6 py-7 ${inset}`}>
          <div className="bg-gradient-to-br from-indigo-500 to-violet-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent tabular-nums dark:from-indigo-400 dark:to-violet-400">
            {hero.value}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {hero.caption}
          </div>
        </div>

        {/* supporting proof points */}
        <ul className="mt-6 space-y-3">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-sm text-foreground/90">
              <span
                className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background text-indigo-500 dark:text-indigo-400 ${insetSm}`}
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {name}
        </div>
      </AuroraCard>
    </div>
  );
}

export function ProductsShowcase() {
  return (
    <section id="products" className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        {/* section header */}
        <Reveal className="mb-20">
          <SectionHeading
            eyebrow="Products"
            title="Four products. Proven in production."
            subtitle="Infrastructure you deploy instead of build — each one measured on a number that matters."
          />
        </Reveal>

        {/* alternating product rows */}
        <div className="space-y-20 lg:space-y-28">
          {products.map((product, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal key={product.slug}>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  {/* copy */}
                  <div className={reversed ? "lg:order-2" : "lg:order-1"}>
                    <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                      {product.category}
                    </p>
                    <h3 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                      <span className="bg-gradient-to-br from-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
                        {product.name}
                      </span>
                    </h3>
                    <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>
                    <NeuButton
                      asChild
                      variant="neutral"
                      size="md"
                      className="group mt-8"
                    >
                      <Link href={`/products/${product.slug}`}>
                        Explore {product.name}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </NeuButton>
                  </div>

                  {/* proof card */}
                  <div className={reversed ? "lg:order-1" : "lg:order-2"}>
                    <ProofCard product={product} />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
