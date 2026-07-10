import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { WhatWeDo } from "@/components/what-we-do";
import { ProductsShowcase } from "@/components/products-showcase";
import { ServicesBento } from "@/components/services-bento";
import { WhyUnlink } from "@/components/why-unlink";
import { ClosingBand } from "@/components/closing-band";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WhatWeDo />
      <ProductsShowcase />
      <ServicesBento />
      <WhyUnlink />
      <ClosingBand />
    </>
  );
}
