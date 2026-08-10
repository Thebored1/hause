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

const nextConfig: NextConfig = {
  // No `images.remotePatterns` on purpose: every image is served from this
  // origin, and a wildcard would turn /_next/image into an open proxy that
  // fetches arbitrary URLs on request. Add specific hosts here if that changes.
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

// withPayload externalises Payload's database tooling (drizzle-kit and
// friends) from the server bundle. Without it Turbopack tries to parse
// non-JS files inside those packages and the admin fails to compile.
export default withPayload(nextConfig);
