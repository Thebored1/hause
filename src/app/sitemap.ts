import type { MetadataRoute } from "next";
import { listSitemapPages } from "@/lib/pages";
import { getPublishedPosts } from "@/lib/posts";
import { pageUrl, SITE_URL } from "@/lib/site-url";

// Pages and posts are edited in the CMS, so the sitemap has to reflect the
// database at request time rather than whatever existed at build time.
export const dynamic = "force-dynamic";

/**
 * sitemap.xml
 *
 * Covers the CMS pages, the blog index and every published post. Drafts and
 * noindex pages are excluded: listing a page the same site asks crawlers to
 * skip is a contradiction, and Search Console reports it as one.
 *
 * A failure here must not take the route down — an empty sitemap costs a
 * crawl cycle, a 500 costs the file entirely.
 */
/**
 * Relative weight within this site — it says nothing to other sites, and
 * search engines treat it as a hint at best.
 *
 * Derived from the slug rather than made an editable field: a number nobody
 * can feel the effect of is one that gets set once, forgotten, and then
 * quietly contradicts the site as it grows.
 */
function priorityFor(slug: string): number {
  if (slug === "home") return 1;
  // The pages that win work: services, and the page that asks for the enquiry.
  if (slug.startsWith("services")) return 0.9;
  if (slug === "contact" || slug === "projects") return 0.8;
  return 0.7;
}

function changeFrequencyFor(slug: string): "weekly" | "monthly" {
  // Only the home page and the portfolio change on any regular cadence;
  // claiming otherwise for a services page invites crawls that find nothing.
  return slug === "home" || slug === "projects" ? "weekly" : "monthly";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, posts] = await Promise.all([
    listSitemapPages().catch(() => []),
    getPublishedPosts(1000).catch(() => []),
  ]);

  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: pageUrl(page.slug),
    // Real edit times, so a crawler can tell what actually changed instead of
    // being told the whole site changed on every deploy.
    lastModified: page.updatedAt ? new Date(page.updatedAt) : undefined,
    changeFrequency: changeFrequencyFor(page.slug),
    priority: priorityFor(page.slug),
  }));

  const blogIndex: MetadataRoute.Sitemap = [{ url: `${SITE_URL}/blog`, priority: 0.6 }];

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${String(post.slug ?? "")}`,
    lastModified: post.updatedAt ? new Date(String(post.updatedAt)) : undefined,
    priority: 0.5,
  }));

  return [...pageEntries, ...blogIndex, ...postEntries];
}
