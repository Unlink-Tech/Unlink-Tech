import { Activity, CalendarCheck, Globe, Landmark, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Stat = { icon: LucideIcon; value: string; label: string };

const stats: Stat[] = [
  { icon: CalendarCheck, value: "5+ years", label: "regulated fintech delivery" },
  { icon: Activity, value: "99.99%", label: "uptime in production" },
  { icon: Zap, value: "10,000+ TPS", label: "peak capacity" },
  { icon: Landmark, value: "$50M+ / day", label: "settlement · 100% reconciliation" },
  { icon: Globe, value: "India · SE Asia · Middle East", label: "regions served" },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Track record"
      className="border-t border-border/60 bg-background"
    >
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-8 px-4 py-8 text-center sm:grid-cols-3 sm:px-6 lg:grid-cols-5 lg:gap-x-0 lg:divide-x lg:divide-border/60">
        {stats.map(({ icon: Icon, value, label }) => (
          <li
            key={label}
            className="flex flex-col items-center gap-1.5 px-2 lg:px-5"
          >
            <Icon className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            <span className="text-sm font-semibold tracking-tight text-foreground tabular-nums sm:text-base">
              {value}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
