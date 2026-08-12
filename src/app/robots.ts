import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

/**
 * robots.txt
 *
 * Disallowing /admin and /api is housekeeping rather than security - both are
 * behind auth, and robots.txt is a request that only well-behaved crawlers
 * honour. The point is to keep login screens and JSON endpoints out of search
 * results, not to hide them.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    // Absolute by definition: this line is read by crawlers that have no
    // context for a relative path.
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
