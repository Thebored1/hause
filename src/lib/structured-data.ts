import { SITE_URL, absoluteUrl, pageUrl } from "./site-url";
import type { SeoSettings, BusinessDetails, SiteIdentity } from "./seo-settings";

// ============================================================
// JSON-LD.
//
// One @graph per page rather than several loose scripts, with
// stable @id anchors so the nodes reference each other instead
// of repeating themselves - a Service can point at
// "#organization" and Google resolves it.
//
// Everything is driven by CMS values. A field left blank is
// omitted rather than emitted empty: incomplete structured data
// is treated as a quality signal, and an empty address is worse
// than no address.
// ============================================================

type Json = Record<string, unknown>;

/** Drops keys that are empty, so blank CMS fields never reach the output. */
function compact(input: Json): Json {
  const out: Json = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value) && value.length === 0) continue;
    out[key] = value;
  }
  return out;
}

export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORGANISATION_ID = `${SITE_URL}/#organization`;
export const BUSINESS_ID = `${SITE_URL}/#localbusiness`;

export function websiteNode(site: SiteIdentity): Json {
  return compact({
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: site.name,
    description: site.description,
    publisher: { "@id": ORGANISATION_ID },
  });
}

export function organisationNode(site: SiteIdentity, logo?: string): Json {
  return compact({
    "@type": "Organization",
    "@id": ORGANISATION_ID,
    name: site.name,
    url: `${SITE_URL}/`,
    description: site.description,
    logo: absoluteUrl(logo),
    // How Google ties this site to the same entity's social profiles.
    sameAs: site.sameAs,
  });
}

export function localBusinessNode(business: BusinessDetails, site: SiteIdentity): Json | null {
  if (!business.enabled) return null;

  const address = compact({
    "@type": "PostalAddress",
    streetAddress: business.streetAddress,
    addressLocality: business.locality,
    addressRegion: business.region,
    postalCode: business.postalCode,
    addressCountry: business.country,
  });

  // Coordinates are only meaningful as a pair.
  const geo =
    business.latitude && business.longitude
      ? {
          "@type": "GeoCoordinates",
          latitude: business.latitude,
          longitude: business.longitude,
        }
      : undefined;

  return compact({
    "@type": business.type || "LocalBusiness",
    "@id": BUSINESS_ID,
    name: site.name,
    url: `${SITE_URL}/`,
    description: site.description,
    parentOrganization: { "@id": ORGANISATION_ID },
    // Only emit an address node if it holds more than its own @type.
    address: Object.keys(address).length > 1 ? address : undefined,
    geo,
    telephone: business.telephone,
    email: business.email,
    priceRange: business.priceRange,
    openingHours: business.openingHours,
    areaServed: business.areaServed.map((name) => ({ "@type": "City", name })),
  });
}

/**
 * Breadcrumbs for a nested slug: "services/design" becomes
 * Home > Services > Design.
 *
 * Ancestors are only linked when a published page actually exists at that
 * path. A breadcrumb pointing at a 404 is worse than a shorter trail, and
 * "services" existing as a section does not mean /services is a page.
 */
export function breadcrumbNode(
  slug: string,
  pageTitle: string,
  knownSlugs: readonly string[],
  homeName = "Home",
): Json | null {
  const clean = String(slug ?? "").replace(/^\/+|\/+$/g, "");
  if (!clean || clean === "home") return null;

  const known = new Set(knownSlugs);
  const segments = clean.split("/");
  const items: Json[] = [{ "@type": "ListItem", position: 1, name: homeName, item: pageUrl("home") }];

  segments.forEach((segment, index) => {
    const path = segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;
    if (!isLast && !known.has(path)) return;

    items.push({
      "@type": "ListItem",
      position: items.length + 1,
      name: isLast ? pageTitle : titleFromSlug(segment),
      item: pageUrl(path),
    });
  });

  // A trail of just "Home" is noise.
  return items.length > 1
    ? { "@type": "BreadcrumbList", "@id": `${pageUrl(clean)}#breadcrumb`, itemListElement: items }
    : null;
}

/** "modular-kitchen" -> "Modular Kitchen", for an ancestor with no page of its own. */
export function titleFromSlug(segment: string): string {
  return segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** A question and answer pair lifted from page content. */
export interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * FAQPage schema.
 *
 * Built from the questions already rendered on the page, never maintained
 * separately: schema that disagrees with what a visitor sees is the specific
 * thing Google penalises, and a second copy would drift the first time
 * somebody edits one of them.
 */
export function faqNode(entries: readonly FaqEntry[], slug: string): Json | null {
  const usable = entries.filter((e) => e.question?.trim() && e.answer?.trim());
  if (!usable.length) return null;

  return {
    "@type": "FAQPage",
    "@id": `${pageUrl(slug)}#faq`,
    mainEntity: usable.map((entry) => ({
      "@type": "Question",
      name: entry.question.trim(),
      acceptedAnswer: { "@type": "Answer", text: entry.answer.trim() },
    })),
  };
}

/** What the page is claiming to be, beyond the site-wide nodes. */
export interface PageFacts {
  slug: string;
  title: string;
  description: string;
  image?: string;
  updatedAt?: string;
  createdAt?: string;
}

/**
 * Service, for a page describing something the business offers.
 *
 * provider points at the organisation by id rather than restating it, and
 * areaServed is reused from the business details so the two cannot disagree
 * about where the work is done.
 */
export function serviceNode(page: PageFacts, business: BusinessDetails): Json {
  return compact({
    "@type": "Service",
    "@id": `${pageUrl(page.slug)}#service`,
    name: page.title,
    description: page.description,
    url: pageUrl(page.slug),
    image: absoluteUrl(page.image),
    provider: { "@id": ORGANISATION_ID },
    areaServed: business.areaServed.map((name) => ({ "@type": "City", name })),
  });
}

/**
 * Article, for a post.
 *
 * Dates come from the document's own timestamps rather than a field an
 * editor maintains: a dateModified that disagrees with the page is worse
 * than none, and nobody remembers to update one by hand.
 */
export function articleNode(page: PageFacts): Json {
  return compact({
    "@type": "Article",
    "@id": `${pageUrl(page.slug)}#article`,
    headline: page.title,
    description: page.description,
    url: pageUrl(page.slug),
    image: absoluteUrl(page.image),
    datePublished: page.createdAt,
    dateModified: page.updatedAt || page.createdAt,
    author: { "@id": ORGANISATION_ID },
    publisher: { "@id": ORGANISATION_ID },
  });
}

/**
 * Pulls FAQ entries out of a page's blocks.
 *
 * Read from the same array the page renders, so the schema and the visible
 * questions cannot disagree - editing an answer changes what Google is given,
 * because there is only one copy of it.
 */
export function faqsFromBlocks(blocks: unknown): FaqEntry[] {
  if (!Array.isArray(blocks)) return [];

  const out: FaqEntry[] = [];
  for (const block of blocks) {
    const b = block as { blockType?: string; items?: unknown };
    if (b?.blockType !== "faqSection" || !Array.isArray(b.items)) continue;

    for (const item of b.items) {
      const entry = item as { question?: unknown; answer?: unknown };
      out.push({
        question: String(entry?.question ?? ""),
        answer: String(entry?.answer ?? ""),
      });
    }
  }
  return out;
}

export interface GraphInput {
  settings: SeoSettings;
  slug: string;
  pageTitle: string;
  knownSlugs: readonly string[];
  faqs?: readonly FaqEntry[];
  /** "page" adds nothing beyond the site-wide nodes. */
  schemaType?: "page" | "service" | "article";
  page?: Omit<PageFacts, "slug" | "title">;
}

/** The complete graph for one page. */
export function buildGraph({
  settings,
  slug,
  pageTitle,
  knownSlugs,
  faqs = [],
  schemaType = "page",
  page = { description: "" },
}: GraphInput): Json {
  const facts: PageFacts = { ...page, slug, title: pageTitle };

  const nodes: (Json | null)[] = [
    websiteNode(settings.site),
    organisationNode(settings.site, settings.site.defaultImage),
    localBusinessNode(settings.business, settings.site),
    breadcrumbNode(slug, pageTitle, knownSlugs),
    faqNode(faqs, slug),
    schemaType === "service" ? serviceNode(facts, settings.business) : null,
    schemaType === "article" ? articleNode(facts) : null,
  ];

  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter((node): node is Json => node !== null),
  };
}
