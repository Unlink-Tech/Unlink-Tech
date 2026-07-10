import type { ReactNode } from "react";
import { AuroraCard } from "@/components/ui/aurora-card";

const raisedSm =
  "shadow-[5px_5px_10px_var(--neu-dark),-5px_-5px_10px_var(--neu-light)]";
const gradientText =
  "bg-gradient-to-br from-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400";

/** Neumorphic stat tile — big gradient figure over a muted label, with hover aurora. */
export function StatTile({
  value,
  label,
}: {
  value: ReactNode;
  label: ReactNode;
}) {
  return (
    <AuroraCard className={`rounded-2xl p-5 sm:p-6 ${raisedSm}`}>
      <div
        className={`text-2xl font-bold tracking-tight tabular-nums sm:text-3xl ${gradientText}`}
      >
        {value}
      </div>
      <div className="mt-1.5 text-xs leading-snug text-muted-foreground sm:text-sm">
        {label}
      </div>
    </AuroraCard>
  );
}
