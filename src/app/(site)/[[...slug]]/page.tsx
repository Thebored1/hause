import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBlocks, { type PageBlock } from "@/components/PageBlocks";
import SmoothScroll from "@/components/SmoothScroll";
import { getPageBySlug } from "@/lib/pages";
import { getChrome } from "@/lib/site-settings";
import { getSeoSettings } from "@/lib/seo-settings";
import { buildMetadata } from "@/lib/metadata";
import { buildGraph, faqsFromBlocks } from "@/lib/structured-data";
import { metaOf, toMetadataPage } from "@/lib/page-meta";
import { listPageSlugs } from "@/lib/pages";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

/**
 * Every page of the site, served from the CMS.
 *
 * An optional catch-all, so `/` and `/services/renovation-remodeling` come
 * through the same code path — the slug is stored with its full depth, which
 * is why the nested service pages need no special case.
 *
 * More specific routes still win: `/blog`, `/admin` and `/api` have their own
 * files and are never reached by this one.
 *
 * A path with no document 404s, `/` included. There is no hand-coded
 * fallback: a second copy of the homepage would drift from the CMS without
 * anyone noticing, and a missing `home` document is a broken install, which
 * is better shown than papered over.
 */
type Params = { params: Promise<{ slug?: string[] }> };

const slugOf = (slug?: string[]) => (slug?.length ? slug.join("/") : "home");

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const path = slugOf(slug);
  const [page, seo] = await Promise.all([
    getPageBySlug(path).catch(() => null),
    getSeoSettings(),
  ]);
  // A missing page must not be indexed: without this it inherits the site
  // defaults and advertises a 404 as a real page.
  if (!page) return { title: "Not found", robots: { index: false, follow: false } };

  return buildMetadata(toMetadataPage(page), {
    name: seo.site.name,
    description: seo.site.description,
    defaultImage: seo.site.defaultImage,
  });
}

export default async function SitePage({ params }: Params) {
  const { slug } = await params;
  const path = slugOf(slug);
  const [page, chrome, seo, slugs, nonce] = await Promise.all([
    getPageBySlug(path).catch(() => null),
    getChrome(),
    getSeoSettings(),
    listPageSlugs().catch(() => [] as string[]),
    headers().then((h) => h.get("x-nonce") ?? undefined),
  ]);

  if (!page) notFound();

  const graph = buildGraph({
    settings: seo,
    slug: page.slug,
    pageTitle: page.title,
    knownSlugs: slugs,
    // Lifted from the FAQ blocks on this page, so the questions given to
    // search engines are the ones a visitor actually sees.
    faqs: faqsFromBlocks(page.layout),
    schemaType: metaOf(page).schemaType,
    page: {
      description: metaOf(page).description || seo.site.description,
      image: metaOf(page).image || seo.site.defaultImage,
      updatedAt: String(page.updatedAt ?? ""),
      createdAt: String(page.createdAt ?? ""),
    },
  });

  return (
    <SmoothScroll>
      {/* Nonce-signed: an unsigned ld+json block is dropped by the CSP. */}
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <PageBlocks
          blocks={(page.layout ?? []) as PageBlock[]}
          withChrome
          // The home page opens the contact modal; the inner pages link to
          // /contact. Stored per page rather than inferred from the path.
          contactModal={Boolean(page.contactModal)}
          activePath={path === "home" ? "/" : `/${path}`}
          header={chrome.header}
          footer={chrome.footer}
        />
      </main>
    </SmoothScroll>
  );
}
