import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { showcaseProducts } from "@/lib/products";
import { services } from "@/lib/services";

/**
 * The sitemap is generated from the same data that generates the pages, so a
 * new product or service line cannot ship with the sitemap left behind. The
 * thank-you routes are deliberately absent, matching robots.ts.
 *
 * `priority` and `changeFrequency` are hints, not instructions; they are set to
 * reflect how the site is actually maintained rather than to game anything.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Spread through `.map` would widen `changeFrequency` back to `string`, so
  // each entry carries `lastModified` directly and the literal keeps its type.
  const core: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, priority: 1, changeFrequency: "weekly" },
    { url: absoluteUrl("/products"), lastModified, priority: 0.9, changeFrequency: "monthly" },
    { url: absoluteUrl("/custom-engineering"), lastModified, priority: 0.9, changeFrequency: "monthly" },
    { url: absoluteUrl("/proof"), lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: absoluteUrl("/about"), lastModified, priority: 0.7, changeFrequency: "yearly" },
    { url: absoluteUrl("/insights"), lastModified, priority: 0.7, changeFrequency: "weekly" },
    { url: absoluteUrl("/contact"), lastModified, priority: 0.6, changeFrequency: "yearly" },
    { url: absoluteUrl("/book-demo"), lastModified, priority: 0.6, changeFrequency: "yearly" },
    { url: absoluteUrl("/privacy"), lastModified, priority: 0.2, changeFrequency: "yearly" },
    { url: absoluteUrl("/terms"), lastModified, priority: 0.2, changeFrequency: "yearly" },
  ];

  const productPages: MetadataRoute.Sitemap = showcaseProducts.map((p) => ({
    url: absoluteUrl(`/products/${p.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: absoluteUrl(`/custom-engineering/${s.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...core, ...productPages, ...servicePages];
}
