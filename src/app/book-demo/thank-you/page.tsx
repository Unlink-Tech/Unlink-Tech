import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Check, Mail, MonitorPlay } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { NeuButton } from "@/components/ui/neu-button";

export const metadata: Metadata = pageMetadata({
  title: "Demo requested",
  description:
    "Thanks for requesting a demo of Unlink Technologies. An engineer will be in touch with times, usually within one business day.",
  path: "/book-demo/thank-you",
  noIndex: true,
});

const raised =
  "shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)]";
const inset =
  "shadow-[inset_5px_5px_10px_var(--neu-dark),inset_-5px_-5px_10px_var(--neu-light)]";

const next = [
  {
    icon: Mail,
    title: "It's landed with the right people",
    description:
      "Your request went straight to our team at sales@unlink-technologies.com, with no ticket queue in between.",
  },
  {
    icon: CalendarCheck,
    title: "Times, within one business day",
    description:
      "We'll reply with a couple of 45-minute slots. Bring whoever needs to see it: ops, engineering, or compliance.",
  },
  {
    icon: MonitorPlay,
    title: "Built around what you asked",
    description:
      "We'll prepare the session against the workflow you described, so it opens on your problem rather than a scripted tour.",
  },
];

export default function DemoThankYouPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a demo"
        title="Thanks. Your demo request is in."
        subtitle="We've received it and it's now with our engineering team. Here's what happens next."
      />

      <section className="px-4 pb-24 pt-16 sm:px-6">
        <Reveal className="mx-auto max-w-3xl">
          <div className={`rounded-3xl bg-background p-8 text-center sm:p-12 ${raised}`}>
            <span
              className={`inline-flex h-16 w-16 items-center justify-center rounded-full bg-background text-emerald-500 ${inset}`}
            >
              <Check className="h-7 w-7" strokeWidth={2.5} />
            </span>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              We&apos;ll be in touch with times.
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
              Thank you for requesting a demo. An engineer will read what you
              sent, prepare the session around it, and reply with slots, usually
              within one business day.
            </p>

            <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
              {next.map(({ icon: Icon, title, description }) => (
                <div key={title} className={`rounded-2xl bg-background p-5 ${inset}`}>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-background text-indigo-500 shadow-[4px_4px_8px_var(--neu-dark),-4px_-4px_8px_var(--neu-light)] dark:text-indigo-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <NeuButton asChild variant="primary" size="lg" className="group">
                <Link href="/products">
                  Explore the products
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </NeuButton>
              <NeuButton asChild variant="neutral" size="lg">
                <Link href="/proof">See our proof and capabilities</Link>
              </NeuButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
