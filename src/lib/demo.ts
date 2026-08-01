/**
 * Shared book-a-demo constants and types. Kept free of server-only imports
 * (no zod / resend) so both the Client Component form and the Server Action can
 * import from here. Mirrors lib/contact.ts, plus the two fields a demo request
 * needs that a general enquiry does not: which product, and what to show.
 */

/** Which product the demo is for. Kept in step with lib/products.ts. */
export const DEMO_PRODUCTS = [
  "Cimmetri — reconciliation & financial operations",
  "Enclave — private, governed enterprise AI",
  "Payment Gateway — acceptance & routing",
  "Merchant Onboarding — KYC/KYB & risk scoring",
  "A custom build, not one of the products",
  "Not sure yet — help me choose",
] as const;

export type DemoProduct = (typeof DEMO_PRODUCTS)[number];

export const DEMO_TIMELINES = [
  "As soon as possible",
  "Within two weeks",
  "This month",
  "Next quarter",
  "Just exploring",
] as const;

export type DemoTimeline = (typeof DEMO_TIMELINES)[number];

/** Field names used by the form and validated on the server. */
export type DemoField =
  | "name"
  | "email"
  | "company"
  | "phone"
  | "product"
  | "goals"
  | "timeline";

/** State returned from the submit Server Action to `useActionState`. */
export type DemoState = {
  ok: boolean;
  /** Per-field validation messages (first error per field). */
  errors?: Partial<Record<DemoField, string>>;
  /** A non-field error (e.g. the email service failed). */
  formError?: string;
  /** Echo of submitted values so the form can repopulate after an error. */
  values?: Partial<Record<DemoField, string>>;
};

export const initialDemoState: DemoState = { ok: false };
