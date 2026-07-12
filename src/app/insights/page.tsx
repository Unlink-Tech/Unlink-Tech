import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { NeuButton } from "@/components/ui/neu-button";
import { LinkedInIcon } from "@/components/brand-icons";
import { InsightsList } from "@/components/insights-list";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Field notes from production: deep dives on payments, reconciliation, fraud ML, compliance, and governed AI, written by the engineers who shipped the systems.",
};

const LINKEDIN_URL =
  "https://www.linkedin.com/company/unlink-technologies-private-limited";

const raised =
  "shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)]";
const insetSm =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";

export default function InsightsPage() {
  return (
    <>
      {/* page header with breadcrumb + aurora background */}
      <PageHero
        eyebrow="Insights"
        title="Field notes from production."
        subtitle="Deep dives on payments, reconciliation, fraud ML, compliance, and governed AI, written by the engineers who shipped the systems, not a marketing team."
      />

      {/* LinkedIn connect banner */}
      <section className="px-4 pt-16 sm:px-6">
        <Reveal className="mx-auto max-w-6xl">
          <div
            className={`flex flex-col items-start justify-between gap-6 rounded-3xl bg-background p-8 sm:flex-row sm:items-center ${raised}`}
          >
            <div className="flex items-center gap-5">
              <span
                className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-background ${insetSm}`}
              >
                <LinkedInIcon className="h-7 w-7" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  We publish first on LinkedIn
                </h2>
                <p className="mt-1 text-muted-foreground">
                  Every deep dive reaches our network first. Follow along for
                  new writing as it ships.
                </p>
              </div>
            </div>
            <NeuButton asChild variant="neutral" size="lg" className="shrink-0">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon className="h-5 w-5" />
                Follow on LinkedIn
              </a>
            </NeuButton>
          </div>
        </Reveal>
      </section>

      {/* article list */}
      <section className="px-4 pb-24 pt-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <InsightsList />
        </div>
      </section>
    </>
  );
}
