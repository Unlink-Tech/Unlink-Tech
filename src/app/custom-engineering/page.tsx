import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { CrossLink } from "@/components/cross-link";
import { Reveal } from "@/components/reveal";
import { ServicesShowcase } from "@/components/services-showcase";

export const metadata: Metadata = pageMetadata({
  title: "Custom Engineering",
  description:
    "When no vendor sells what a bank, NBFC, PSP, or fintech needs, the same team designs and ships it end to end, in production, in your regulatory environment. Five service lines within regulated fintech.",
  path: "/custom-engineering",
});

export default function CustomEngineeringPage() {
  return (
    <>
      {/* page header with breadcrumb + aurora background */}
      <PageHero
        eyebrow="Custom Engineering"
        title="When the product doesn't exist yet, we build it."
        subtitle="Our products came from client work. When a bank, NBFC, PSP, or fintech needs something no vendor sells, the same team designs and ships it end to end, in production, in your regulatory environment. 5+ years of doing exactly this."
      />

      {/* intro */}
      <section className="px-4 py-16 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            We work in five service lines, all within one domain: regulated
            fintech. They are not separate practices; they are five aspects of
            the same expertise. And they are where our products came from: every
            capability below has already been shipped, audited, and run at
            production scale before we ever offered it to you.
          </p>
        </Reveal>
      </section>

      {/*
        The same stacked deck as the home page, minus its section heading: the
        page hero and the intro above already do that job. One component means
        the service story is written once and cannot drift between here and the
        home page.
      */}
      <ServicesShowcase showHeading={false} />

      {/* cross-link block */}
      <CrossLink
        href="/products"
        ctaLabel="Explore the products"
        text={
          <>
            Prefer proven infrastructure over a custom build?{" "}
            <span className="font-medium text-foreground">
              Four of these capabilities are already productized. Deploy them
              instead of building.
            </span>
          </>
        }
      />
    </>
  );
}
