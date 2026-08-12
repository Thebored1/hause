import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Fetches a published CMS page by slug. Returns null when there isn't one.
 *
 * The `_status` filter is explicit because the local API runs with
 * overrideAccess: true, so the Pages collection's read access rule does not
 * apply here — without it, drafts would be served to visitors.
 *
 * This lives outside the route files because Next 16 allows a `page.tsx` to
 * export only route handlers and segment config; anything else fails the
 * generated route type check.
 */
export async function getPageBySlug(slug: string) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "pages",
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }],
    },
    limit: 1,
    depth: 1,
  });
  return docs[0] ?? null;
}

/** One entry per page that belongs in sitemap.xml. */
export interface SitemapEntry {
  slug: string;
  updatedAt: string;
}

/**
 * Published pages that are not hidden from search.
 *
 * Drafts are excluded by the query and noindex pages by the filter: listing a
 * page in the sitemap while asking crawlers to skip it is a contradiction, and
 * Search Console reports it as an error rather than ignoring it.
 */
export async function listSitemapPages(): Promise<SitemapEntry[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "pages",
    where: {
      and: [{ _status: { equals: "published" } }, { "meta.noindex": { not_equals: true } }],
    },
    limit: 1000,
    depth: 0,
  });
  return docs.map((d) => ({
    slug: String(d.slug ?? ""),
    updatedAt: String(d.updatedAt ?? ""),
  }));
}

/** Slugs of every published page, used to decide which breadcrumbs to link. */
export async function listPageSlugs(): Promise<string[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "pages",
    where: { _status: { equals: "published" } },
    limit: 1000,
    depth: 0,
  });
  return docs.map((d) => String(d.slug ?? ""));
}
