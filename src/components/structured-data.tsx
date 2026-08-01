import { SITE, SITE_ORIGIN, absoluteUrl } from "@/lib/site";

/**
 * Schema.org structured data.
 *
 * This is the part of SEO that search engines act on rather than merely read:
 * it is what lets the site appear as a known organisation with a logo and a
 * verified profile link, and what makes breadcrumbs render in a result instead
 * of a bare URL.
 *
 * Rendered as a plain <script type="application/ld+json"> rather than through
 * any helper, because the payload is a static object we control end to end.
 * The JSON is serialised with a `<` escape so a stray character in copy can
 * never close the script tag early.
 */

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/**
 * Who the company is, plus the site itself. Emitted once, in the root layout,
 * so every page carries the organisation identity.
 */
export function OrganizationSchema() {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE_ORIGIN,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/app-icon.svg"),
    },
    description: SITE.description,
    email: SITE.email,
    sameAs: [SITE.linkedIn],
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "Singapore" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    knowsAbout: [
      "Payment infrastructure",
      "Settlement and reconciliation",
      "Merchant onboarding and KYC/KYB",
      "Fraud and risk machine learning",
      "MAS TRM and regulatory compliance technology",
      "Governed enterprise AI",
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    url: SITE_ORIGIN,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    inLanguage: "en",
  };

  return (
    <JsonLd
      data={{ "@context": "https://schema.org", "@graph": [organization, website] }}
    />
  );
}

/**
 * The trail for a sub-page. Google renders this in place of the raw URL in a
 * result, so it is worth carrying on every page below the root.
 */
export function BreadcrumbSchema({
  trail,
}: {
  /** Ordered, excluding Home, which is prepended here. */
  trail: { name: string; path: string }[];
}) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

/**
 * A product page's offering. `Service` rather than `Product` because these are
 * deployed and operated for a client, not sold as a boxed good, and Google
 * treats a Product without price or review data as incomplete.
 */
export function ServiceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: absoluteUrl(path),
        provider: { "@id": `${SITE_ORIGIN}/#organization` },
        serviceType: "Financial technology infrastructure",
        areaServed: ["India", "Singapore", "United Kingdom", "United Arab Emirates"],
      }}
    />
  );
}
