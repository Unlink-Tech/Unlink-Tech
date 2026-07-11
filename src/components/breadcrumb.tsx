"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, House } from "lucide-react";
import { cn } from "@/lib/utils";

/** Nice labels for known slugs; anything else is title-cased from the slug. */
const LABELS: Record<string, string> = {
  products: "Products",
  "custom-engineering": "Custom Engineering",
  "payment-gateway": "Payment Gateway",
  "merchant-onboarding": "Merchant Onboarding",
  cimmetri: "Cimmetri",
  enclave: "Enclave",
  "fintech-platform-engineering": "Fintech Platform Engineering",
  "ai-ml-product-development": "AI & ML Product Development",
  "enterprise-workflow-onboarding": "Enterprise Workflow & Onboarding",
  "regulatory-compliance-technology": "Regulatory Compliance Technology",
  "mobile-field-commerce": "Mobile & Field Commerce",
  about: "About",
  proof: "Proof",
  insights: "Insights",
  contact: "Contact",
  privacy: "Privacy Policy",
  terms: "Terms & Conditions",
};

function labelFor(segment: string) {
  return (
    LABELS[segment] ??
    segment
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}

/** Dynamic breadcrumb built from the current path. Sleek neumorphic pill. */
export function Breadcrumb({ className }: { className?: string }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null; // no breadcrumb on the home page

  const crumbs = segments.map((seg, i) => ({
    label: labelFor(seg),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "inline-flex max-w-full flex-wrap items-center justify-center gap-x-1.5 gap-y-1 rounded-full bg-background px-4 py-2 text-sm shadow-[4px_4px_8px_var(--neu-dark),-4px_-4px_8px_var(--neu-light)]",
        className,
      )}
    >
      <Link
        href="/"
        aria-label="Home"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        <House className="h-4 w-4" />
      </Link>
      {crumbs.map((c) => (
        <Fragment key={c.href}>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
          {c.isLast ? (
            <span
              aria-current="page"
              className="font-medium text-indigo-600 dark:text-indigo-400"
            >
              {c.label}
            </span>
          ) : (
            <Link
              href={c.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {c.label}
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
