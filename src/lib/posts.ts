import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Blog queries.
 *
 * The `_status` filter is explicit on both of these because the local API runs
 * with overrideAccess: true, so the Posts collection's read access rule does
 * not apply here — without it, unpublished drafts appear on the public blog.
 *
 * These live outside the route files because Next 16 allows a `page.tsx` to
 * export only route handlers and segment config.
 */

const PUBLISHED = { _status: { equals: "published" } } as const;

/** Published posts, newest first. */
export async function getPublishedPosts(limit = 50) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    where: PUBLISHED,
    sort: "-publishedAt",
    limit,
    depth: 1,
  });
  return docs;
}

/** A single published post. Returns null when there isn't one. */
export async function getPublishedPostBySlug(slug: string) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    where: { and: [{ slug: { equals: slug } }, PUBLISHED] },
    limit: 1,
    depth: 1,
  });
  return docs[0] ?? null;
}
