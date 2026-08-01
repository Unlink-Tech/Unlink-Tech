"use client";

import { Check, Nfc, QrCode, ShieldCheck, WifiOff } from "lucide-react";
import { useCountUp, useInView, useSequence } from "@/lib/visual-motion";
import { cn } from "@/lib/utils";

/**
 * Service visuals — one diagram per custom-engineering service line.
 *
 * Drawn in markup for the same reasons as the product visuals: sharp at any
 * size, re-themes with the site, and cheap to keep truthful.
 *
 * Sized to the same scale as the product visuals: same well radius, padding,
 * and type ramp, so a service card and a product card carry equal weight when
 * you scroll from one section into the other. They were previously drawn a step
 * smaller, which read as a lesser class of card rather than a different one.
 *
 * Motion is the "live instrument" treatment shared with the product visuals:
 * assemble once on scroll-in, in the order the real system would, then keep one
 * ambient loop running on whatever is genuinely still in flight. See
 * lib/visual-motion.ts.
 */

const insetXs =
  "shadow-[inset_3px_3px_6px_var(--neu-dark),inset_-3px_-3px_6px_var(--neu-light)]";
const inset =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";

/** Shared enter transition for a row that lands as its step completes. */
const enter =
  "transition-all duration-500 ease-out motion-reduce:transition-none";

export type VisualProps = { className?: string };

/** Shared frame: matches the product visuals' well exactly. */
function Well({
  children,
  label,
  meta,
  className,
}: VisualProps & {
  children: React.ReactNode;
  label: string;
  meta?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "w-full rounded-3xl bg-background p-5 sm:p-6",
        inset,
        className,
      )}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
        {meta}
      </div>
      {children}
    </div>
  );
}

/** Small pill used for statuses and tags across the visuals. */
function Tag({
  children,
  tone = "ink",
  className,
}: {
  children: React.ReactNode;
  tone?: "ink" | "good" | "mute";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap",
        tone === "ink" &&
          "bg-indigo-500/12 text-indigo-600 dark:bg-indigo-400/12 dark:text-indigo-300",
        tone === "good" &&
          "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400",
        tone === "mute" && "bg-muted-foreground/10 text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   Fintech Platform Engineering — the path a payment takes through the platform.

   Motion: the stages come up in order, then a packet keeps clearing the rail
   end to end, because the platform is never idle.
   ------------------------------------------------------------------------- */

const STAGES = [
  { name: "Ingress", sub: "TLS · idempotent" },
  { name: "Risk", sub: "12ms" },
  { name: "Switch", sub: "route + retry" },
  { name: "Ledger", sub: "double entry" },
  { name: "Settle", sub: "T+0" },
];

export function PlatformVisual({ className }: VisualProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const step = useSequence(STAGES.length, inView, 300);
  const complete = step >= STAGES.length - 1;

  return (
    <div ref={ref} className={className}>
      <Well label="Transaction path" meta={<Tag tone="good">PCI-DSS L1</Tag>}>
        <div className="relative">
          {/* the rail every stage sits on */}
          <span className="absolute left-[9%] right-[9%] top-[17px] h-px bg-gradient-to-r from-indigo-500 to-violet-500 opacity-45" />

          {/* once the path is proven, payments keep clearing it */}
          {complete && (
            <span
              aria-hidden
              className="rail-travel absolute top-[17px] z-10 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgb(var(--particle-rgb))] shadow-[0_0_8px_rgb(var(--particle-rgb)/0.9)]"
            />
          )}

          <div className="relative grid grid-cols-5 gap-2">
            {STAGES.map((s, i) => (
              <div
                key={s.name}
                className={cn(
                  "flex flex-col items-center text-center",
                  enter,
                  step >= i
                    ? "translate-y-0 opacity-100"
                    : "translate-y-1 opacity-0",
                )}
              >
                <span
                  className={cn(
                    "flex h-[34px] w-[34px] items-center justify-center rounded-xl text-[12px] font-bold text-white",
                    i === STAGES.length - 1
                      ? "bg-gradient-to-br from-indigo-500 to-violet-600"
                      : "bg-indigo-500/85 dark:bg-indigo-400/85",
                  )}
                >
                  {i + 1}
                </span>
                <span className="mt-2.5 text-[11px] font-medium leading-tight text-foreground/85">
                  {s.name}
                </span>
                <span className="mt-0.5 font-mono text-[9px] leading-tight text-muted-foreground">
                  {s.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2.5">
          {[
            { k: "$50M+", v: "settled / day" },
            { k: "100%", v: "reconciled" },
            { k: "99.99%", v: "uptime" },
          ].map((s, i) => (
            <div
              key={s.k}
              className={cn(
                "rounded-xl bg-background px-3.5 py-3.5",
                insetXs,
                enter,
                complete
                  ? "translate-y-0 opacity-100"
                  : "translate-y-1 opacity-0",
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-base font-bold tabular-nums text-foreground">
                {s.k}
              </div>
              <div className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                {s.v}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {["Idempotent by design", "Retry-safe", "Double-entry ledger"].map(
            (b, i) => (
              <span
                key={b}
                className={cn(
                  "rounded-full bg-background px-3 py-1.5 text-[10px] font-medium text-muted-foreground",
                  insetXs,
                  enter,
                  complete ? "opacity-100" : "opacity-0",
                )}
                style={{ transitionDelay: `${300 + i * 90}ms` }}
              >
                {b}
              </span>
            ),
          )}
        </div>
      </Well>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   AI & ML — a scored decision, and the reasons behind it.

   The attribution bars are the point: a fraud score a regulator cannot
   interrogate is a score you cannot ship in this domain.

   Motion: the score resolves, then the reasons for it are produced one by one,
   which is the order that matters here. The declined decision keeps breathing
   while it sits in the review queue.
   ------------------------------------------------------------------------- */

const FEATURES = [
  { name: "Velocity, 1h", weight: 0.34 },
  { name: "Device trust", weight: 0.26 },
  { name: "Geo mismatch", weight: 0.19 },
  { name: "Merchant MCC", weight: 0.11 },
];

export function AiVisual({ className }: VisualProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const score = useCountUp(0.94, inView, 1200);
  const step = useSequence(FEATURES.length, inView, 240);

  return (
    <div ref={ref} className={className}>
      <Well label="Decision · txn 90412" meta={<Tag tone="ink">MAS FEAT</Tag>}>
        <div className="flex items-center gap-5">
          <div>
            <div className="shine-text text-3xl font-bold tabular-nums">
              {score.toFixed(2)}
            </div>
            <div className="mt-0.5 text-[10px] text-muted-foreground">
              Fraud score
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span className="breathe">Declined · queued for review</span>
              <span className="font-mono">18ms</span>
            </div>
            <span className="mt-2 block h-2 overflow-hidden rounded-full bg-muted-foreground/15">
              <span
                style={{ width: inView ? "94%" : "0%" }}
                className="block h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-[1200ms] ease-out motion-reduce:transition-none"
              />
            </span>
          </div>
        </div>

        {/* why it scored that way */}
        <div className="mt-6 space-y-3">
          {FEATURES.map((f, i) => (
            <div
              key={f.name}
              className={cn(
                "flex items-center gap-3",
                enter,
                step >= i ? "opacity-100" : "opacity-0",
              )}
            >
              <span className="w-28 shrink-0 text-[11px] text-foreground/75">
                {f.name}
              </span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted-foreground/12">
                <span
                  style={{
                    width:
                      step >= i ? `${Math.round(f.weight * 100 * 2.4)}%` : "0%",
                  }}
                  className="block h-full rounded-full bg-indigo-500/70 transition-[width] duration-500 ease-out motion-reduce:transition-none dark:bg-indigo-400/70"
                />
              </span>
              <span className="w-9 shrink-0 text-right font-mono text-[10px] tabular-nums text-muted-foreground">
                {f.weight.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "mt-6 flex flex-wrap gap-2",
            enter,
            step >= FEATURES.length - 1 ? "opacity-100" : "opacity-0",
          )}
        >
          <Tag tone="mute">model v2.4</Tag>
          <Tag tone="good">no drift</Tag>
          <Tag tone="mute">98.7% detection</Tag>
        </div>
      </Well>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Enterprise Workflow & Onboarding — a case moving through approval, with the
   audit trail it leaves behind.

   Motion: the trail is written one entry at a time, which is what an audit
   trail is. The final sign-off keeps its halo.
   ------------------------------------------------------------------------- */

const TRAIL = [
  { step: "Submitted", who: "portal", at: "09:12", done: true },
  { step: "Automated checks", who: "12 of 12 passed", at: "09:14", done: true },
  { step: "Compliance review", who: "a.rao", at: "09:31", done: true },
  { step: "Approved", who: "dual sign-off", at: "09:41", done: false },
];

export function WorkflowVisual({ className }: VisualProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const step = useSequence(TRAIL.length, inView, 380);

  return (
    <div ref={ref} className={className}>
      <Well label="Case KYB-4471" meta={<Tag tone="good">95% automated</Tag>}>
        <div className="space-y-2.5">
          {TRAIL.map((t, i) => {
            const landed = step >= i;
            return (
              <div
                key={t.step}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl bg-background px-3.5 py-3",
                  insetXs,
                  enter,
                  landed
                    ? "translate-y-0 opacity-100"
                    : "translate-y-1 opacity-0",
                )}
              >
                {/* connector down to the next entry, across the row gap */}
                {i < TRAIL.length - 1 && (
                  <span className="absolute left-[25px] top-[42px] h-[14px] w-px bg-indigo-500/35" />
                )}
                <span
                  className={cn(
                    "flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-white",
                    t.done
                      ? "bg-indigo-500/85 dark:bg-indigo-400/85"
                      : "bg-gradient-to-br from-indigo-500 to-violet-600",
                    // the sign-off that just landed keeps a soft ring
                    !t.done && landed && "step-halo",
                  )}
                >
                  <Check className="h-3 w-3" strokeWidth={4} />
                </span>
                <span className="text-[11px] font-medium text-foreground/85">
                  {t.step}
                </span>
                <span className="min-w-0 truncate font-mono text-[10px] text-muted-foreground">
                  {t.who}
                </span>
                <span className="ml-auto shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground">
                  {t.at}
                </span>
              </div>
            );
          })}
        </div>

        <div
          className={cn(
            "mt-5 flex items-center justify-between text-[10px] text-muted-foreground",
            enter,
            step >= TRAIL.length - 1 ? "opacity-100" : "opacity-0",
          )}
        >
          <span>Manual decisions: 40/day → 4/day</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            Full audit trail
          </span>
        </div>
      </Well>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Regulatory Compliance Technology — controls mapped to evidence, the way an
   examiner asks for it.

   Motion: the posture ring fills to where the programme actually is and the
   controls are evidenced one at a time. The one still in progress keeps
   breathing, because it is the only thing here that is not finished.
   ------------------------------------------------------------------------- */

const CONTROLS = [
  { id: "TRM 6.2", name: "Access control", state: "Evidenced" },
  { id: "TRM 8.1", name: "Change management", state: "Evidenced" },
  { id: "TRM 11.4", name: "Incident response", state: "Evidenced" },
  { id: "TRM 13.2", name: "Third-party risk", state: "In progress" },
];

/** Circumference of the r=15.5 ring, and the offset that leaves 90% drawn. */
const RING = 97.4;
const RING_AT_90 = 9.7;

export function ComplianceVisual({ className }: VisualProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const posture = useCountUp(90, inView, 1400);
  const step = useSequence(CONTROLS.length, inView, 300);

  return (
    <div ref={ref} className={className}>
      <Well label="MAS TRM posture" meta={<Tag tone="good">Board-ready</Tag>}>
        <div className="flex items-center gap-5">
          {/* posture ring */}
          <div className="relative h-[68px] w-[68px] shrink-0">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                strokeWidth="3.5"
                className="stroke-muted-foreground/15"
              />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={RING}
                strokeDashoffset={inView ? RING_AT_90 : RING}
                className="stroke-indigo-500 transition-[stroke-dashoffset] duration-[1400ms] ease-out motion-reduce:transition-none dark:stroke-indigo-400"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[13px] font-bold tabular-nums text-foreground">
              {Math.round(posture)}%
            </span>
          </div>
          <div>
            <div className="text-[13px] font-medium text-foreground/85">
              36 of 40 controls evidenced
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground">
              Findings down 85% since the last assessment
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-2.5">
          {CONTROLS.map((c, i) => {
            const pending = c.state !== "Evidenced";
            return (
              <div
                key={c.id}
                className={cn(
                  "flex items-center gap-3 rounded-xl bg-background px-3.5 py-2.5",
                  insetXs,
                  enter,
                  step >= i
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-1 opacity-0",
                )}
              >
                <span className="w-16 shrink-0 font-mono text-[10px] text-muted-foreground">
                  {c.id}
                </span>
                <span className="min-w-0 truncate text-[11px] text-foreground/80">
                  {c.name}
                </span>
                <span className="ml-auto shrink-0">
                  <Tag
                    tone={pending ? "mute" : "good"}
                    className={cn(pending && step >= i && "breathe")}
                  >
                    {c.state}
                  </Tag>
                </span>
              </div>
            );
          })}
        </div>
      </Well>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Mobile & Field Commerce — acceptance that keeps working when the signal does
   not, which is the whole problem in the field.

   Motion: takings land in the queue one at a time, and the two still waiting
   on signal keep breathing. The synced one sits still, which is the difference
   the panel exists to show.
   ------------------------------------------------------------------------- */

const TAKINGS = [
  { id: "#8841", amt: "₹1,240", state: "queued" },
  { id: "#8840", amt: "₹380", state: "queued" },
  { id: "#8839", amt: "₹2,150", state: "synced" },
];

export function MobileVisual({ className }: VisualProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const step = useSequence(TAKINGS.length, inView, 340);

  return (
    <div ref={ref} className={className}>
      <Well label="Field terminal" meta={<Tag tone="mute">iOS · Android</Tag>}>
        <div className="flex items-stretch gap-5">
          {/* handset */}
          <div
            className={cn(
              "w-[112px] shrink-0 rounded-2xl border border-border/70 bg-background p-3",
              insetXs,
              enter,
              inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
          >
            <span className="mx-auto mb-3 block h-0.5 w-7 rounded-full bg-muted-foreground/30" />
            <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 px-2 py-3.5 text-center">
              <div className="text-base font-bold text-white tabular-nums">
                ₹1,240
              </div>
              <div className="mt-0.5 text-[9px] text-white/80">Tap or scan</div>
            </div>
            <div className="mt-3 flex justify-center gap-2.5 text-muted-foreground">
              <QrCode className="h-4 w-4" />
              <Nfc className="h-4 w-4" />
            </div>
          </div>

          {/* offline queue */}
          <div className="flex-1">
            <div className="breathe flex items-center gap-2 text-[11px] text-amber-600 dark:text-amber-400">
              <WifiOff className="h-3.5 w-3.5" />
              Offline · queued locally
            </div>
            <div className="mt-3 space-y-2.5">
              {TAKINGS.map((t, i) => {
                const queued = t.state === "queued";
                return (
                  <div
                    key={t.id}
                    className={cn(
                      "flex items-center gap-3 rounded-xl bg-background px-3.5 py-2.5 font-mono text-[10px]",
                      insetXs,
                      enter,
                      step >= i
                        ? "translate-y-0 opacity-100"
                        : "translate-y-1 opacity-0",
                    )}
                  >
                    <span className="text-muted-foreground">{t.id}</span>
                    <span className="text-foreground/80">{t.amt}</span>
                    <span className="ml-auto">
                      <Tag
                        tone={queued ? "mute" : "good"}
                        className={cn(queued && step >= i && "breathe")}
                      >
                        {t.state}
                      </Tag>
                    </span>
                  </div>
                );
              })}
            </div>
            <div
              className={cn(
                "mt-3.5 text-[10px] text-muted-foreground",
                enter,
                step >= TAKINGS.length - 1 ? "opacity-100" : "opacity-0",
              )}
            >
              Syncs and settles the moment signal returns.
            </div>
          </div>
        </div>

        {/* what being offline actually costs, which is the point of the panel */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          {[
            { k: "₹1,620", v: "Held locally, 2 takings" },
            { k: "0", v: "Sales lost to signal" },
          ].map((s, i) => (
            <div
              key={s.v}
              className={cn(
                "rounded-xl bg-background px-3.5 py-3.5",
                insetXs,
                enter,
                step >= TAKINGS.length - 1
                  ? "translate-y-0 opacity-100"
                  : "translate-y-1 opacity-0",
              )}
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              <div className="text-base font-bold tabular-nums text-foreground">
                {s.k}
              </div>
              <div className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </Well>
    </div>
  );
}
