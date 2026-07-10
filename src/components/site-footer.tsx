import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { NeuButton } from "@/components/ui/neu-button";
import { LinkedInIcon, TwitterIcon } from "@/components/brand-icons";
import { Logo } from "@/components/logo";
import { ScrollToTop } from "@/components/scroll-to-top";

type FooterLink = { label: string; href: string };

const LINKEDIN_URL =
  "https://www.linkedin.com/company/unlink-technologies-private-limited";
const X_URL = "https://x.com/unlink_tech";

const offices = [
  {
    flag: "🇮🇳",
    country: "India",
    note: "Head Office",
    address: "#305, Tower B, ATS BOUQUET,\nBlock B, Sector 132,\nNoida, India 201304.",
  },
  {
    flag: "🇬🇧",
    country: "UK",
    note: "Office",
    address: "TSC House Spindle Way,\nCrawley RH10 1TG.",
  },
];

const company: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Proof", href: "/proof" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const products: FooterLink[] = [
  { label: "Cimmetri", href: "/products/cimmetri" },
  { label: "Enclave", href: "/products/enclave" },
  { label: "Payment Gateway", href: "/products/payment-gateway" },
  { label: "Merchant Onboarding", href: "/products/merchant-onboarding" },
];

const services: FooterLink[] = [
  {
    label: "Fintech Platform Engineering",
    href: "/custom-engineering/fintech-platform-engineering",
  },
  {
    label: "AI & ML Product Development",
    href: "/custom-engineering/ai-ml-product-development",
  },
  {
    label: "Enterprise Workflow & Onboarding",
    href: "/custom-engineering/enterprise-workflow-onboarding",
  },
  {
    label: "Regulatory Compliance Technology",
    href: "/custom-engineering/regulatory-compliance-technology",
  },
  {
    label: "Mobile & Field Commerce",
    href: "/custom-engineering/mobile-field-commerce",
  },
];

function LinkColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* brand + contact */}
          <div className="lg:col-span-5">
            <Logo className="h-10" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Financial infrastructure for regulated businesses — shipped and
              running in production.
            </p>

            {/* offices */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {offices.map((o) => (
                <div key={o.country}>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <span aria-hidden className="text-base leading-none">
                      {o.flag}
                    </span>
                    {o.country}{" "}
                    <span className="font-normal text-muted-foreground">
                      ({o.note})
                    </span>
                  </h4>
                  <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {o.address}
                  </p>
                </div>
              ))}
            </div>

            {/* contact */}
            <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:hr@unlink-technologies.com"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                  hr@unlink-technologies.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@unlink-technologies.com"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                  sales@unlink-technologies.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919650583832"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-foreground"
                >
                  <Phone className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                  +91-9650583832
                </a>
              </li>
            </ul>

            {/* social — neumorphic icon buttons */}
            <div className="mt-6 flex items-center gap-3">
              <NeuButton asChild variant="icon" size="icon">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Unlink Technologies on LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              </NeuButton>
              <NeuButton asChild variant="icon" size="icon">
                <a
                  href={X_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Unlink Technologies on X"
                >
                  <TwitterIcon />
                </a>
              </NeuButton>
            </div>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <LinkColumn title="Company" links={company} />
            <LinkColumn title="Products" links={products} />
            <LinkColumn title="Custom Engineering" links={services} />
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} Unlink Technologies. All rights reserved.
          </p>
          <ScrollToTop />
        </div>
      </div>
    </footer>
  );
}
