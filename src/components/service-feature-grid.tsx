import { Check } from "lucide-react";
import { AuroraCard } from "@/components/ui/aurora-card";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const raisedSm =
  "shadow-[5px_5px_10px_var(--neu-dark),-5px_-5px_10px_var(--neu-light)]";
const insetSm =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";

/**
 * Reusable neumorphic list section — an eyebrow/title heading over a grid of
 * checked feature chips, each with the shared hover-aurora treatment. Used for
 * "What we build" and "Platform capabilities" on every service page.
 */
export function ServiceFeatureGrid({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: string[];
}) {
  return (
    <section className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal className="mb-12">
          <SectionHeading eyebrow={eyebrow} title={title} />
        </Reveal>
        <Reveal>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li key={item}>
                <AuroraCard className={`rounded-2xl p-4 ${raisedSm}`}>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background text-indigo-500 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400 ${insetSm}`}
                    >
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {item}
                    </span>
                  </div>
                </AuroraCard>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
