import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

/**
 * Baseline response headers.
 *
 * Deliberately no `script-src`: Next injects inline bootstrap scripts, so a
 * useful script policy needs per-request nonces threaded through the document —
 * separate work, and it breaks the admin if done carelessly. `frame-ancestors`
 * is the part that is safe to set unconditionally.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Clickjacking. Same-origin rather than DENY so Payload's preview iframe works.
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  // Ignored over plain HTTP, so it is safe to send in every environment.
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

/**
 * Hosts the image optimiser may fetch from, as a comma-separated env value:
 *
 *   NEXT_IMAGE_HOSTS=xxxx.public.blob.vercel-storage.com
 *
 * Empty by default, and deliberately not `hostname: "**"` — a wildcard turns
 * /_next/image into an open proxy that fetches arbitrary URLs on request.
 *
 * Set this in production if you enable Vercel Blob storage. Payload then serves
 * the media collection from the blob host, and `next/image` refuses any remote
 * URL that is not listed here, so uploaded images would silently fail to render.
 * Images committed under /public are same-origin and need no entry.
 */
const imageHosts = (process.env.NEXT_IMAGE_HOSTS ?? "")
  .split(",")
  .map((host) => host.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  // One canonical shape per URL. Without this a page answers at both /about
  // and /about/, which search engines can treat as two pages competing over
  // the same content.
  trailingSlash: false,
  images: {
    remotePatterns: imageHosts.map((hostname) => ({ protocol: "https" as const, hostname })),
    // AVIF first, WebP next, the original as fallback. This is a
    // photography-led site: images are most of what a visitor downloads and
    // most of what Largest Contentful Paint measures, and AVIF is routinely
    // half the bytes of the same JPEG at matching quality.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // robots.txt asks crawlers not to visit these; this tells any that do
        // anyway not to index what they found. A disallowed URL can still be
        // indexed from a link elsewhere - the header is what actually keeps a
        // login screen out of search results.
        source: "/:path(admin|api)/:rest*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

// withPayload externalises Payload's database tooling (drizzle-kit and
// friends) from the server bundle. Without it Turbopack tries to parse
// non-JS files inside those packages and the admin fails to compile.
export default withPayload(nextConfig);
