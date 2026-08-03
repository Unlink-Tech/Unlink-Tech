import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { CrossLink } from "@/components/cross-link";
import { ProductsShowcase } from "@/components/products-showcase";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "Three products, one infrastructure standard: payments, merchant onboarding, and reconciliation. Deploy standalone or as a connected stack.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      {/* page header with breadcrumb + aurora background */}
      <PageHero
        eyebrow="Products"
        title="Three products. One infrastructure standard."
        subtitle="Each product began as a system we built and ran for a client in production. We kept what survived: the architecture, the edge cases, the audit trail. Then we made it deployable. Use them standalone or as a connected stack: accept payments, onboard merchants, and reconcile every transaction to the cent."
      />

      {/*
        The same stacked deck as the home page, minus its section heading: the
        page hero above already carries the eyebrow and title. One component
        means the product story is written once and cannot drift between here
        and the home page.
      */}
      <ProductsShowcase showHeading={false} />

      {/* cross-link block */}
      <CrossLink
        href="/custom-engineering"
        ctaLabel="Custom Engineering"
        text={
          <>
            Need something none of these solves?{" "}
            <span className="font-medium text-foreground">
              The same team builds custom financial platforms end to end.
            </span>
          </>
        }
      />
    </>
  );
}
