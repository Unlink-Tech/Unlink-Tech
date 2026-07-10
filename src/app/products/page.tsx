import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BrainCircuit,
  CreditCard,
  Scale,
  UserRoundCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NeuButton } from "@/components/ui/neu-button";
import { AuroraCard } from "@/components/ui/aurora-card";
import { PageHero } from "@/components/page-hero";
import { CrossLink } from "@/components/cross-link";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Four products, one infrastructure standard — payments, merchant onboarding, reconciliation, and governed enterprise AI. Deploy standalone or as a connected stack.",
};

/** Neumorphic inset helper for the stat pills and icon niche. */
const insetSm =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";

type Product = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  stats: string[];
};

const products: Product[] = [
  {
    slug: "payment-gateway",
    name: "Payment Gateway",
    description: "Accept, route, and settle payments at scale.",
    icon: CreditCard,
    stats: ["10K+ TPS", "99.99% uptime", "40+ currencies"],
  },
  {
    slug: "merchant-onboarding",
    name: "Merchant Onboarding",
    description: "From application to live merchant in hours.",
    icon: UserRoundCheck,
    stats: ["−70% onboarding time", "Full evidence trail"],
  },
  {
    slug: "cimmetri",
    name: "Cimmetri",
    description: "Reconciliation and financial operations.",
    icon: Scale,
    stats: ["Close in 3 days", "Audit pack in 48 hours"],
  },
  {
    slug: "enclave",
    name: "Enclave",
    description: "Private, governed enterprise AI.",
    icon: BrainCircuit,
    stats: ["Cited answers", "Your boundary", "~4 weeks to live"],
  },
];

function ProductCard({ product }: { product: Product }) {
  const { icon: Icon, name, description, stats, slug } = product;
  return (
    <AuroraCard>
      <span
        className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-indigo-500 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400 ${insetSm}`}
      >
        <Icon className="h-6 w-6" />
      </span>

      <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
        <span className="bg-gradient-to-br from-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
          {name}
        </span>
      </h2>
      <p className="mt-2 text-base text-muted-foreground">{description}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {stats.map((s) => (
          <li
            key={s}
            className={`rounded-full bg-background px-3.5 py-1.5 text-xs font-medium text-foreground/80 ${insetSm}`}
          >
            {s}
          </li>
        ))}
      </ul>

      <NeuButton
        asChild
        variant="neutral"
        size="md"
        className="group/btn mt-8 self-start"
      >
        <Link href={`/products/${slug}`}>
          Explore {name}
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
        </Link>
      </NeuButton>
    </AuroraCard>
  );
}

export default function ProductsPage() {
  return (
    <>
      {/* page header with breadcrumb + aurora background */}
      <PageHero
        eyebrow="Products"
        title="Four products. One infrastructure standard."
        subtitle="Each product began as a system we built and ran for a client in production. We kept what survived — the architecture, the edge cases, the audit trail — and made it deployable. Use them standalone or as a connected stack: accept payments, onboard merchants, reconcile every transaction, and put a governed AI layer over all of it."
      />

      {/* card grid */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:gap-8">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 2) * 100}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* cross-link block */}
      <CrossLink
        href="/custom-engineering"
        ctaLabel="Custom Engineering"
        text={
          <>
            Need something none of these solve?{" "}
            <span className="font-medium text-foreground">
              The same team builds custom financial platforms end to end.
            </span>
          </>
        }
      />
    </>
  );
}
