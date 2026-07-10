import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { NeuButton } from "@/components/ui/neu-button";
import { Reveal } from "@/components/reveal";

/**
 * Reusable bottom-of-page cross-link band — muted lead text + a primary CTA.
 * Text, button label and destination are passed per page.
 */
export function CrossLink({
  text,
  ctaLabel,
  href,
}: {
  text: ReactNode;
  ctaLabel: string;
  href: string;
}) {
  return (
    <section className="px-4 pb-24 pt-8 sm:px-6">
      <Reveal className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-background p-8 text-center shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)] sm:flex-row sm:p-10 sm:text-left">
          <p className="max-w-xl text-lg text-muted-foreground">{text}</p>
          <NeuButton asChild variant="primary" size="lg" className="group shrink-0">
            <Link href={href}>
              {ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </NeuButton>
        </div>
      </Reveal>
    </section>
  );
}
