import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { AuroraCard } from "@/components/ui/aurora-card";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ServiceFeatureGrid } from "@/components/service-feature-grid";
import { CrossLink } from "@/components/cross-link";
import { DeliveryProcess } from "@/components/delivery-process";
import { Reveal } from "@/components/reveal";
import { getService, services, serviceSlugs } from "@/lib/services";

const raised =
  "shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)]";
const insetSm =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";
const raisedSm =
  "shadow-[5px_5px_10px_var(--neu-dark),-5px_-5px_10px_var(--neu-light)]";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.name, description: service.tagline };
}

const gradientText =
  "bg-gradient-to-br from-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const {
    name,
    tagline,
    icon: Icon,
    overview,
    whatWeBuild,
    platformCapabilities,
    proof,
    approach,
    signature,
  } = service;
  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      {/* header with breadcrumb + aurora background */}
      <PageHero eyebrow="Custom Engineering" title={name} subtitle={tagline} />

      {/* overview */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span
            className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-indigo-500 dark:text-indigo-400 ${insetSm}`}
          >
            <Icon className="h-6 w-6" />
          </span>
          <h2 className="mt-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Overview
          </h2>
          <p className="mt-3 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            {overview}
          </p>
        </Reveal>
      </section>

      {/* what we build */}
      <ServiceFeatureGrid
        eyebrow="What we build"
        title="Platforms we design and ship."
        items={whatWeBuild}
      />

      {/* platform capabilities */}
      <ServiceFeatureGrid
        eyebrow="Platform capabilities"
        title="Engineered in from day one."
        items={platformCapabilities}
      />

      {/* proof */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mb-12">
            <SectionHeading eyebrow="Proof" title="By the numbers." />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {proof.map(({ figure, label }) => (
                <AuroraCard key={label} className={`rounded-2xl p-5 sm:p-6 ${raisedSm}`}>
                  <div className={`text-2xl font-bold tracking-tight tabular-nums sm:text-3xl ${gradientText}`}>
                    {figure}
                  </div>
                  <div className="mt-1.5 text-xs leading-snug text-muted-foreground sm:text-sm">
                    {label}
                  </div>
                </AuroraCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* how we approach it */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mb-12">
            <SectionHeading
              eyebrow="How we approach it"
              title="The decisions that make it hold."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {approach.map((a) => (
              <Reveal key={a.title}>
                <AuroraCard>
                  <h3 className="text-lg font-semibold text-foreground">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {a.text}
                  </p>
                </AuroraCard>
              </Reveal>
            ))}
          </div>

          {/* signature statement */}
          <Reveal className="mt-8">
            <div className={`rounded-3xl bg-background p-8 text-center sm:p-12 ${raised}`}>
              <p className="mx-auto max-w-3xl text-2xl font-bold leading-snug tracking-tight text-balance sm:text-3xl">
                <span className={gradientText}>{signature}</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* delivery approach flow */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mb-14">
            <SectionHeading
              eyebrow="How we deliver"
              title="Our delivery approach."
              subtitle="The same disciplined path on every engagement — from first conversation to 24/7 production support."
            />
          </Reveal>
          <Reveal>
            <DeliveryProcess />
          </Reveal>
        </div>
      </section>

      {/* explore other services */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="mb-12">
            <SectionHeading
              eyebrow="More from Custom Engineering"
              title="Explore the other service lines."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <Reveal key={s.slug}>
                <Link
                  href={`/custom-engineering/${s.slug}`}
                  className="block h-full rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <AuroraCard>
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-indigo-500 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400 ${insetSm}`}
                    >
                      <s.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-base font-bold leading-snug tracking-tight">
                      <span className={gradientText}>{s.name}</span>
                    </h3>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </AuroraCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* cross-link to contact */}
      <CrossLink
        href="/contact"
        ctaLabel="Scope your build"
        text={
          <>
            Have a build no vendor sells?{" "}
            <span className="font-medium text-foreground">
              Talk to the engineers who have shipped this in production.
            </span>
          </>
        }
      />
    </>
  );
}
