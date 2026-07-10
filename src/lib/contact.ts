/**
 * Shared contact-form constants and types. Kept free of server-only imports
 * (no zod / resend) so both the Client Component form and the Server Action can
 * import from here.
 */

export const TIMELINES = [
  "Exploring options",
  "Within a month",
  "1–3 months",
  "3–6 months",
  "Not sure yet",
] as const;

export type Timeline = (typeof TIMELINES)[number];

/** Field names used by the form and validated on the server. */
export type ContactField =
  | "name"
  | "email"
  | "company"
  | "phone"
  | "challenge"
  | "timeline";

/** State returned from the submit Server Action to `useActionState`. */
export type ContactState = {
  ok: boolean;
  /** Per-field validation messages (first error per field). */
  errors?: Partial<Record<ContactField, string>>;
  /** A non-field error (e.g. the email service failed). */
  formError?: string;
  /** Echo of submitted values so the form can repopulate after an error. */
  values?: Partial<Record<ContactField, string>>;
};

export const initialContactState: ContactState = { ok: false };
