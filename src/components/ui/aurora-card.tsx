import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared neumorphic card with the site-wide hover treatment: raised soft-UI
 * panel that lifts, deepens its shadow, and fades in a slow-rotating conic
 * aurora on hover. Content renders above the aurora. Used across the home
 * sections and product pages for consistency.
 */
export function AuroraCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl bg-background p-8 transition-all duration-300 hover:-translate-y-1.5",
        "shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)]",
        "group-hover:shadow-[11px_11px_24px_var(--neu-dark),-11px_-11px_24px_var(--neu-light)] hover:shadow-[11px_11px_24px_var(--neu-dark),-11px_-11px_24px_var(--neu-light)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[-50%] z-0 animate-[spin_9s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(99,102,241,0.35)_60deg,transparent_150deg,rgba(124,58,237,0.35)_240deg,transparent_330deg)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 motion-reduce:animate-none"
      />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
}
