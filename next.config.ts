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
  images: {
    remotePatterns: imageHosts.map((hostname) => ({ protocol: "https" as const, hostname })),
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

// withPayload externalises Payload's database tooling (drizzle-kit and
// friends) from the server bundle. Without it Turbopack tries to parse
// non-JS files inside those packages and the admin fails to compile.
export default withPayload(nextConfig);
