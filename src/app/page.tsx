import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { Hero } from "@/components/hero";
import { ComplianceBar } from "@/components/compliance-bar";
import { WhatWeDo } from "@/components/what-we-do";
import { Lifecycle } from "@/components/lifecycle";
import { ProductsShowcase } from "@/components/products-showcase";
import { WhoWeServe } from "@/components/who-we-serve";
import { ServicesShowcase } from "@/components/services-showcase";
import { ProofBand } from "@/components/proof-band";
import { WhyTeamsChoose } from "@/components/why-teams-choose";
import { WhyUnlink } from "@/components/why-unlink";
import { ClosingBand } from "@/components/closing-band";

/**
 * Title and description are inherited from the root layout, which already
 * describes the home page. Only the canonical is set here, since the root
 * deliberately does not set one (see the note in app/layout.tsx).
 */
export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ComplianceBar />
      <WhyUnlink />
      <WhatWeDo />
      {/* The spine: names the three products before the showcase details them. */}
      <Lifecycle />
      <ProductsShowcase />
      <WhoWeServe />
      <ServicesShowcase />
      <ProofBand />
      <WhyTeamsChoose />
      <ClosingBand />
    </>
  );
}
