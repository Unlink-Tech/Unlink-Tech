import { Fragment } from "react";
import {
  ChevronRight,
  Code,
  Compass,
  FlaskConical,
  Headphones,
  Lock,
  Palette,
  PenTool,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const raisedSm =
  "shadow-[5px_5px_10px_var(--neu-dark),-5px_-5px_10px_var(--neu-light)]";

const steps: { label: string; icon: LucideIcon }[] = [
  { label: "Discovery", icon: Compass },
  { label: "Architecture Design", icon: PenTool },
  { label: "Compliance Review", icon: ShieldCheck },
  { label: "UI/UX Design", icon: Palette },
  { label: "Platform Development", icon: Code },
  { label: "Testing", icon: FlaskConical },
  { label: "Security Audit", icon: Lock },
  { label: "Deployment", icon: Rocket },
  { label: "24/7 Support", icon: Headphones },
];

/**
 * Delivery-approach flow — numbered neumorphic step nodes connected by chevrons,
 * wrapping responsively (a horizontal flow on desktop, compact rows on mobile).
 */
export function DeliveryProcess() {
  return (
    <ol className="flex flex-wrap items-start justify-center gap-y-10">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const n = String(i + 1).padStart(2, "0");
        return (
          <Fragment key={step.label}>
            <li className="flex w-24 flex-col items-center gap-3 px-1 text-center sm:w-32">
              <div className="relative">
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-background text-indigo-500 dark:text-indigo-400 ${raisedSm}`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-[10px] font-bold text-white shadow-sm">
                  {n}
                </span>
              </div>
              <span className="text-sm font-medium leading-snug text-foreground">
                {step.label}
              </span>
            </li>
            {i < steps.length - 1 && (
              <li aria-hidden className="flex h-16 items-center">
                <ChevronRight className="h-5 w-5 shrink-0 text-indigo-400/60 dark:text-indigo-400/40" />
              </li>
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}
