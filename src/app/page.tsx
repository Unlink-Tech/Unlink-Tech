import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { Hero } from "@/components/hero";
// import { TrustStrip } from "@/components/trust-strip";
import { WhatWeDo } from "@/components/what-we-do";
import { ProductsShowcase } from "@/components/products-showcase";
import { ServicesShowcase } from "@/components/services-showcase";
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
      {/* Parked for now, to be brought back later. */}
      {/* <TrustStrip /> */}
      <WhatWeDo />
      <ProductsShowcase />
      <ServicesShowcase />
      <WhyUnlink />
      <ClosingBand />
    </>
  );
}
