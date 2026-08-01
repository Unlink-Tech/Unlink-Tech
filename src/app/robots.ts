import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * Crawl rules.
 *
 * The thank-you pages are disallowed because they are post-submission
 * confirmations: they carry no standalone value, and indexing them puts a dead
 * end into the search results that a user can reach without ever submitting
 * anything.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/contact/thank-you", "/book-demo/thank-you"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
