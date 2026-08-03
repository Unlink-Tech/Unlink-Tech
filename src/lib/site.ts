/**
 * One source of truth for the facts every page's metadata needs: the canonical
 * origin, the organisation identity, and the social handles.
 *
 * The origin drives `metadataBase`, the sitemap, robots, and every canonical
 * and og:url on the site. It is read from the environment so preview and
 * production deployments each advertise themselves correctly rather than all
 * claiming the production domain, which is what makes a preview deploy
 * outrank or cannibalise the real one in search.
 */

const FALLBACK_ORIGIN = "https://www.unlink-technologies.com";

/**
 * Vercel exposes the deployment host without a scheme. Prefer an explicit
 * NEXT_PUBLIC_SITE_URL so a custom domain always wins over the generated one.
 */
function resolveOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return FALLBACK_ORIGIN;
}

export const SITE_ORIGIN = resolveOrigin();
export const SITE_URL = new URL(SITE_ORIGIN);

export const SITE = {
  name: "Unlink Technologies",
  /** Used as the og:site_name and in structured data. */
  legalName: "Unlink Technologies Private Limited",
  tagline: "We Deliver What we Promise",
  description:
    // Enclave hidden for now: "and governed enterprise AI" belongs back in this list when it returns.
    "Financial infrastructure for regulated businesses: payments, reconciliation, and merchant onboarding, shipped and running in production.",
  locale: "en_US",
  linkedIn:
    "https://www.linkedin.com/company/unlink-technologies-private-limited",
  email: "sales@unlink-technologies.com",
} as const;

/** Absolute URL for a route, for canonicals, og:url, and the sitemap. */
export function absoluteUrl(path = "/") {
  return new URL(path, SITE_ORIGIN).toString();
}

/**
 * Per-page metadata: title, description, and the canonical / og:url pair that
 * has to point at *this* page.
 *
 * This exists because Next merges metadata from the root layout down, and
 * `alternates.canonical` is inherited. A canonical set once in the layout is
 * therefore silently copied onto every route, telling search engines that all
 * of them are duplicates of the home page. Routing every page through this
 * helper makes the path a required argument, so a new page cannot ship without
 * its own canonical.
 */
export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  /** For pages that exist but should never appear in results. */
  noIndex?: boolean;
}) {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${title} | ${SITE.name}`,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
