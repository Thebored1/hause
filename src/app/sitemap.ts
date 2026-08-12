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
    // The home page is worth weighting; beyond that, priority is guesswork
    // that search engines largely ignore.
    priority: page.slug === "home" ? 1 : 0.7,
  }));

  const blogIndex: MetadataRoute.Sitemap = [{ url: `${SITE_URL}/blog`, priority: 0.6 }];

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${String(post.slug ?? "")}`,
    lastModified: post.updatedAt ? new Date(String(post.updatedAt)) : undefined,
    priority: 0.5,
  }));

  return [...pageEntries, ...blogIndex, ...postEntries];
}
