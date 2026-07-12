import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock, Mail, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { NeuButton } from "@/components/ui/neu-button";

export const metadata: Metadata = {
  title: "Thank you",
  description:
    "Thanks for reaching out to Unlink Technologies. An engineer will read your enquiry and reply personally, usually within one business day.",
  robots: { index: false },
};

const raised =
  "shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)]";
const inset =
  "shadow-[inset_5px_5px_10px_var(--neu-dark),inset_-5px_-5px_10px_var(--neu-light)]";

const next = [
  {
    icon: Mail,
    title: "It's landed with the right people",
    description:
      "Your enquiry has been sent straight to our team at sales@unlink-technologies.com, with no ticket queue in between.",
  },
  {
    icon: Clock,
    title: "An engineer replies personally",
    description:
      "Someone who actually builds these systems will read it and respond, usually within one business day.",
  },
  {
    icon: ShieldCheck,
    title: "An honest first read",
    description:
      "We'll tell you candidly whether we're the right fit and how we'd approach it. If we're not, we'll point you in a better direction.",
  },
];

export default function ThankYouPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Thanks. Your message is on its way."
        subtitle="We've received your enquiry and it's now with our engineering team. Here's what happens next."
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
              We&apos;ll connect soon.
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
              Thank you for reaching out to Unlink Technologies. A real engineer
              will read what you sent and get back to you, usually within one
              business day.
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
                <Link href="/">
                  Back to home
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </NeuButton>
              <NeuButton asChild variant="neutral" size="lg">
                <Link href="/proof">Explore our proof and capabilities</Link>
              </NeuButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
