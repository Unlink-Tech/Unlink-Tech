"use server";

import { z } from "zod";
import { Resend } from "resend";
import { redirect } from "next/navigation";
import {
  TIMELINES,
  type ContactField,
  type ContactState,
} from "@/lib/contact";

// Where enquiries are delivered, and who they're sent as. Defaults are safe to
// commit; override in .env.local (see .env.example). Until the domain is
// verified in Resend, CONTACT_FROM must stay onboarding@resend.dev.
const TO = process.env.CONTACT_TO || "sales@unlink-technologies.com";
const FROM = process.env.CONTACT_FROM || "Unlink Website <onboarding@resend.dev>";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  company: z.string().trim().max(120, "That looks too long.").optional(),
  phone: z
    .string()
    .trim()
    .max(30, "That looks too long.")
    .optional()
    .refine(
      (v) => !v || /^[+()\d\s-]{6,}$/.test(v),
      "Enter a valid phone number.",
    ),
  challenge: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least 10 characters.")
    .max(4000, "That's a bit long — please trim it down."),
  timeline: z.enum(TIMELINES, { message: "Select a timeline." }),
});

function firstErrors(error: z.ZodError) {
  const out: Partial<Record<ContactField, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot — bots fill hidden fields. Pretend success without sending.
  if (formData.get("company_website")) {
    redirect("/contact/thank-you");
  }

  const raw = {
    name: (formData.get("name") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    company: (formData.get("company") as string) ?? "",
    phone: (formData.get("phone") as string) ?? "",
    challenge: (formData.get("challenge") as string) ?? "",
    timeline: (formData.get("timeline") as string) ?? "",
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: firstErrors(parsed.error), values: raw };
  }

  const data = parsed.data;

  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not set — email not sent.");
    return {
      ok: false,
      values: raw,
      formError:
        "Sorry — our enquiry inbox isn't connected yet. Please email sales@unlink-technologies.com directly for now.",
    };
  }

  const subject = `New enquiry — ${data.name}${
    data.company ? ` · ${data.company}` : ""
  }`;

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company || "—"],
    ["Phone", data.phone || "—"],
    ["Timeline", data.timeline],
  ];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "What they're building / their challenge:",
    data.challenge,
  ].join("\n");

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1f2937">
      <h2 style="margin:0 0 4px;font-size:18px">New website enquiry</h2>
      <p style="margin:0 0 16px;color:#6b7280;font-size:13px">Submitted via the Unlink Technologies contact form.</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr>
                <td style="padding:8px 12px;background:#f3f4f6;font-weight:600;width:120px;border:1px solid #e5e7eb">${k}</td>
                <td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(
                  v,
                )}</td>
              </tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 6px;font-weight:600;font-size:14px">What they're building / their challenge</p>
      <p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.6">${escapeHtml(
        data.challenge,
      )}</p>
    </div>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: data.email, // sales can reply straight to the enquirer
      subject,
      text,
      html,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return {
        ok: false,
        values: raw,
        formError:
          "Something went wrong sending your message. Please try again, or email sales@unlink-technologies.com.",
      };
    }
  } catch (err) {
    console.error("[contact] Unexpected send failure:", err);
    return {
      ok: false,
      values: raw,
      formError:
        "Something went wrong sending your message. Please try again in a moment.",
    };
  }

  // Success — go to the dedicated thank-you page.
  redirect("/contact/thank-you");
}
