import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { Clock, MonitorPlay, ShieldCheck, UserRoundCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { DemoForm } from "@/components/demo-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Book a demo",
  description:
    "See the product running on the problem you actually have. Tell us which product and what you need to see, and an engineer will walk you through it.",
  path: "/book-demo",
});

const raisedSm =
  "shadow-[5px_5px_10px_var(--neu-dark),-5px_-5px_10px_var(--neu-light)]";
const insetSm =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";

type Expectation = { icon: LucideIcon; title: string; description: string };

const expectations: Expectation[] = [
  {
    icon: MonitorPlay,
    title: "A live system, not a slide deck",
    description:
      "We run the product against a real workflow, including the awkward parts: exceptions, failures, and what the audit trail looks like afterwards.",
  },
  {
    icon: UserRoundCheck,
    title: "An engineer runs it",
    description:
      "Someone who builds these systems takes the session, so architecture and integration questions get answered in the room, not followed up later.",
  },
  {
    icon: Clock,
    title: "45 minutes, scheduled around you",
    description:
      "We reply within one business day with a couple of slots. Bring whoever needs to see it: ops, engineering, or compliance.",
  },
  {
    icon: ShieldCheck,
    title: "Your data stays yours",
    description:
      "The demo runs on our sample data by default. If you'd rather see your own, we'll agree how first, in writing.",
  },
];

export default function BookDemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a demo"
        title="See it running on your problem."
        subtitle="Tell us which product you want to see and what you need it to answer. An engineer will walk you through it against a workflow that resembles yours, not a scripted happy path."
      />

      <section className="px-4 pb-24 pt-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
          {/* left — what the session actually is */}
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              What to expect
            </h2>
            <div className="mt-6 space-y-4">
              {expectations.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className={`flex items-start gap-4 rounded-2xl bg-background p-5 transition-transform duration-300 hover:-translate-y-0.5 ${raisedSm}`}
                >
                  <span
                    className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background text-indigo-500 dark:text-indigo-400 ${insetSm}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* right — the request form */}
          <Reveal delay={100}>
            <DemoForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
