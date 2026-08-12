// ============================================================
// Absolute URLs.
//
// Canonical tags and share-card images are the two places where
// a relative URL is not merely worse but ignored outright: a
// crawler resolving og:image has no page context to resolve it
// against. Everything that has to leave the page goes through
// here so there is one definition of "where this site lives".
//
// Set NEXT_PUBLIC_SITE_URL to the public origin, e.g.
// https://www.example.com — no trailing slash needed, one is
// tolerated. Without it we fall back to localhost, which is
// right for development and wrong in production; buildMetadata
// warns rather than emitting a localhost canonical to the web.
// ============================================================

const FALLBACK = "http://localhost:3000";

/** True when the origin is a real public one rather than the dev fallback. */
export const hasSiteUrl = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

/** Public origin, without a trailing slash. */
export const SITE_URL = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL || FALLBACK);

export function normalizeOrigin(input: string): string {
  const trimmed = input.trim().replace(/\/+$/, "");
  if (!trimmed) return FALLBACK;
  // A bare host ("example.com") is a common way to set this and would
  // otherwise produce "example.com/about", which is not a URL at all.
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/**
 * Public path for a page slug. "home" is the front page, and nested
 * slugs ("services/design") keep their depth.
 */
export function pagePath(slug: string): string {
  const clean = String(slug ?? "").replace(/^\/+|\/+$/g, "");
  return clean === "home" || clean === "" ? "/" : `/${clean}`;
}

/** Absolute URL for a page slug. */
export function pageUrl(slug: string): string {
  const path = pagePath(slug);
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/**
 * Absolute URL for anything already expressed as a path or URL —
 * uploaded images arrive as "/media/x.jpg" but may already be absolute
 * if a storage adapter serves them from its own host.
 */
export function absoluteUrl(pathOrUrl: string | null | undefined): string | undefined {
  if (!pathOrUrl) return undefined;
  const value = String(pathOrUrl).trim();
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? "" : "/"}${value}`;
}
