import type { Metadata } from "next";
import { BrainCircuit, Download, Phone, Scale } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to an engineer, not a sales rep. Tell us what you're building or where you're stuck, and we'll tell you honestly whether we're the right team.",
};

const raisedSm =
  "shadow-[5px_5px_10px_var(--neu-dark),-5px_-5px_10px_var(--neu-light)]";
const insetSm =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";

type EntryPoint = { icon: LucideIcon; title: string; description: string };

const entryPoints: EntryPoint[] = [
  {
    icon: Scale,
    title: "Request the Cimmetri 48-hour pilot",
    description:
      "See the engine run on 30 days of your own settlement data.",
  },
  {
    icon: BrainCircuit,
    title: "Start an Enclave guided evaluation",
    description: "One document set, one read-only database, one week.",
  },
  {
    icon: Phone,
    title: "Book a scoping call",
    description: "30 minutes on your custom build. No obligation.",
  },
  {
    icon: Download,
    title: "Download a resource",
    description:
      "MAS TRM readiness checklist · build-vs-buy ROI calculator.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* page header with breadcrumb + aurora background */}
      <PageHero
        eyebrow="Contact"
        title="Talk to an engineer, not a sales rep."
        subtitle="Tell us what you're building or where you're stuck. We'll tell you honestly whether we're the right team, and how we'd approach it. If we're not the right fit, the conversation will still have been useful."
      />

      <section className="px-4 pb-24 pt-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
          {/* left — four entry points */}
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Four ways to start
            </h2>
            <div className="mt-6 space-y-4">
              {entryPoints.map(({ icon: Icon, title, description }) => (
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
                    <p className="mt-1 text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* right — contact form */}
          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
