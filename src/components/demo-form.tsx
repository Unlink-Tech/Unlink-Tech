"use client";

import { useActionState, useId } from "react";
import { AlertCircle, ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { NeuButton } from "@/components/ui/neu-button";
import { submitDemo } from "@/app/book-demo/actions";
import {
  DEMO_PRODUCTS,
  DEMO_TIMELINES,
  initialDemoState,
  type DemoField,
  type DemoState,
} from "@/lib/demo";
import { cn } from "@/lib/utils";

const raised =
  "shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)]";
const insetField =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";

const fieldBase =
  "w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 aria-[invalid=true]:outline-2 aria-[invalid=true]:outline-red-500/70";
const labelBase = "mb-2 block text-sm font-medium text-foreground";

/** Small label + optional hint + inline error wrapper, reused by every field. */
function Field({
  name,
  label,
  hint,
  htmlFor,
  error,
  children,
}: {
  name: DemoField;
  label: string;
  hint?: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelBase}>
        {label}
      </label>
      {hint && (
        <p className="mb-2 -mt-1 text-xs text-muted-foreground">{hint}</p>
      )}
      {children}
      {error && (
        <p
          id={`${name}-error`}
          className="mt-1.5 flex items-center gap-1.5 text-sm text-red-500 dark:text-red-400"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Book-a-demo form.
 *
 * The contact form with the two things a demo needs that a general enquiry does
 * not: which product to demo, and what the person actually wants to see. Both
 * are asked up front so the call opens on their data and their questions rather
 * than a generic walkthrough.
 *
 * Same mechanics as ContactForm: neumorphic inset fields, validated on the
 * server with zod and delivered by email via a Server Action, which redirects
 * to /book-demo/thank-you on success.
 */
export function DemoForm() {
  const [state, formAction, pending] = useActionState<DemoState, FormData>(
    submitDemo,
    initialDemoState,
  );

  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const errs = state.errors ?? {};
  const vals = state.values ?? {};
  const invalid = (n: DemoField) =>
    errs[n] ? { "aria-invalid": true, "aria-describedby": `${n}-error` } : {};

  return (
    <form
      action={formAction}
      className={`relative rounded-3xl bg-background p-6 sm:p-8 ${raised}`}
    >
      {/* honeypot — hidden from users, catches bots */}
      <div
        aria-hidden
        className="absolute left-[-9999px] top-[-9999px]"
        tabIndex={-1}
      >
        <label htmlFor={id("company_website")}>Leave this field empty</label>
        <input
          id={id("company_website")}
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.formError && (
        <div
          role="alert"
          className={`mb-6 flex items-start gap-3 rounded-2xl bg-background p-4 text-sm text-red-600 dark:text-red-400 ${insetField}`}
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.formError}</span>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Name" htmlFor={id("name")} error={errs.name}>
          <input
            id={id("name")}
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={vals.name}
            placeholder="Your name"
            className={`${fieldBase} ${insetField}`}
            {...invalid("name")}
          />
        </Field>

        <Field
          name="email"
          label="Work email"
          htmlFor={id("email")}
          error={errs.email}
        >
          <input
            id={id("email")}
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={vals.email}
            placeholder="you@company.com"
            className={`${fieldBase} ${insetField}`}
            {...invalid("email")}
          />
        </Field>

        <Field
          name="company"
          label="Company"
          htmlFor={id("company")}
          error={errs.company}
        >
          <input
            id={id("company")}
            name="company"
            type="text"
            autoComplete="organization"
            defaultValue={vals.company}
            placeholder="Company name"
            className={`${fieldBase} ${insetField}`}
            {...invalid("company")}
          />
        </Field>

        <Field
          name="phone"
          label="Phone (optional)"
          htmlFor={id("phone")}
          error={errs.phone}
        >
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={vals.phone}
            placeholder="+91 98765 43210"
            className={`${fieldBase} ${insetField}`}
            {...invalid("phone")}
          />
        </Field>
      </div>

      {/* the two demo-specific fields */}
      <div className="mt-5">
        <Field
          name="product"
          label="Which demo would you like?"
          htmlFor={id("product")}
          error={errs.product}
        >
          <div className="relative">
            <select
              id={id("product")}
              name="product"
              required
              defaultValue={vals.product ?? ""}
              className={cn(fieldBase, insetField, "appearance-none pr-10")}
              {...invalid("product")}
            >
              <option value="" disabled>
                Select a product
              </option>
              {DEMO_PRODUCTS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </Field>
      </div>

      <div className="mt-5">
        <Field
          name="goals"
          label="What would you like the demo to cover?"
          hint="Your setup, the workflow you want to see, anything specific you need answered. The more you give us, the less generic the session."
          htmlFor={id("goals")}
          error={errs.goals}
        >
          <textarea
            id={id("goals")}
            name="goals"
            required
            rows={5}
            defaultValue={vals.goals}
            placeholder="e.g. We reconcile three PSPs against one ledger and month-end takes two weeks. We'd like to see how exceptions are surfaced and what the audit package looks like."
            className={cn(fieldBase, insetField, "resize-none")}
            {...invalid("goals")}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field
          name="timeline"
          label="How soon are you looking to evaluate?"
          htmlFor={id("timeline")}
          error={errs.timeline}
        >
          <div className="relative">
            <select
              id={id("timeline")}
              name="timeline"
              required
              defaultValue={vals.timeline ?? ""}
              className={cn(fieldBase, insetField, "appearance-none pr-10")}
              {...invalid("timeline")}
            >
              <option value="" disabled>
                Select a timeline
              </option>
              {DEMO_TIMELINES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </Field>
      </div>

      <NeuButton
        type="submit"
        variant="primary"
        size="lg"
        disabled={pending}
        className="group mt-7 w-full sm:w-auto"
      >
        {pending ? (
          <>
            Sending…
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            Book the demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </NeuButton>
    </form>
  );
}
