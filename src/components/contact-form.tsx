"use client";

import { useActionState, useId } from "react";
import { AlertCircle, ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { NeuButton } from "@/components/ui/neu-button";
import { submitContact } from "@/app/contact/actions";
import {
  TIMELINES,
  initialContactState,
  type ContactField,
  type ContactState,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

const raised =
  "shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)]";
const insetField =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";

const fieldBase =
  "w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 aria-[invalid=true]:outline-2 aria-[invalid=true]:outline-red-500/70";
const labelBase = "mb-2 block text-sm font-medium text-foreground";

/** Small label + inline error wrapper, reused by every field. */
function Field({
  name,
  label,
  htmlFor,
  error,
  children,
}: {
  name: ContactField;
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelBase}>
        {label}
      </label>
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
 * Contact form — neumorphic inset fields, validated on the server (zod) and
 * delivered by email via a Server Action. On success the action redirects to
 * /contact/thank-you; validation and delivery errors surface inline here.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitContact,
    initialContactState,
  );

  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const errs = state.errors ?? {};
  const vals = state.values ?? {};
  const invalid = (n: ContactField) =>
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
          label="Email"
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

      <div className="mt-5">
        <Field
          name="challenge"
          label="What you're trying to build / your biggest challenge"
          htmlFor={id("challenge")}
          error={errs.challenge}
        >
          <textarea
            id={id("challenge")}
            name="challenge"
            required
            rows={5}
            defaultValue={vals.challenge}
            placeholder="Tell us what you're building or where you're stuck…"
            className={cn(fieldBase, insetField, "resize-none")}
            {...invalid("challenge")}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field
          name="timeline"
          label="Timeline"
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
              {TIMELINES.map((t) => (
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
            Start the conversation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </NeuButton>
    </form>
  );
}
