import type { Metadata } from "next";
import { SITE_URL, absoluteUrl, pageUrl } from "./site-url";


// ============================================================
// Turning stored SEO fields into the tags a crawler reads.
//
// Kept as a pure function over plain values rather than
// something that fetches: every rule here is a fallback chain,
// and fallback chains are what break quietly. This way each one
// is a test, rather than something you find out about when a
// link looks wrong in WhatsApp.
// ============================================================

export interface SiteDefaults {
  name: string;
  description: string;
  /** Used for any page that does not set its own share image. */
  defaultImage?: string;
}

/** Everything a search engine or a share card reads about a page. */
export interface PageMeta {
  title: string;
  description: string;
  /** Already resolved to a URL by the reader. */
  image: string;
  canonical: string;
  ogType: "website" | "article";
  schemaType: "page" | "service" | "article";
  noindex: boolean;
}

/** The page fields this needs, and no more, so tests stay readable. */
export interface MetadataPage {
  title: string;
  slug: string;
  meta: PageMeta;
}

/**
 * Page title as shown in a browser tab and a search result.
 *
 * An explicit meta title wins outright - it is set precisely when the page
 * title is the wrong thing to show. Otherwise the site name is appended,
 * except where the page is already named after the site, which would
 * otherwise read "Studio - Studio".
 */
export function buildTitle(page: MetadataPage, site: SiteDefaults): string {
  const explicit = page.meta.title.trim();
  if (explicit) return explicit;

  const title = page.title.trim();
  const siteName = site.name.trim();
  if (!siteName) return title;
  if (title.toLowerCase() === siteName.toLowerCase()) return title;
  return `${title} — ${siteName}`;
}

export function buildMetadata(page: MetadataPage, site: SiteDefaults): Metadata {
  const title = buildTitle(page, site);
  const description = page.meta.description.trim() || site.description.trim();

  // A page's own canonical wins; otherwise the page's own URL is the
  // canonical one, which is correct for everything except a duplicate.
  const canonical = page.meta.canonical.trim() || pageUrl(page.slug);

  // Share images must be absolute: a crawler fetching og:image has no page
  // context to resolve a relative path against, so it drops it silently.
  const image = absoluteUrl(page.meta.image || site.defaultImage);

  return {
    // Lets Next resolve any relative URL in the metadata against the real
    // origin rather than guessing.
    metadataBase: new URL(SITE_URL),
    title,
    description: description || undefined,
    alternates: { canonical },
    robots: page.meta.noindex
      ? // Still followed: the page leaves the index, but links on it should
        // keep passing value to pages that are in it.
        { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description: description || undefined,
      url: canonical,
      siteName: site.name || undefined,
      type: page.meta.ogType === "article" ? "article" : "website",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      // The large card is the one worth having; the summary card is a
      // thumbnail most people scroll past.
      card: image ? "summary_large_image" : "summary",
      title,
      description: description || undefined,
      ...(image ? { images: [image] } : {}),
    },
  };
}
