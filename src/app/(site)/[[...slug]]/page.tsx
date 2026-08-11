import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBlocks, { type PageBlock } from "@/components/PageBlocks";
import SmoothScroll from "@/components/SmoothScroll";
import { getPageBySlug } from "@/lib/pages";
import { getChrome } from "@/lib/site-settings";

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
  const page = await getPageBySlug(slugOf(slug)).catch(() => null);
  if (!page) return {};

  const meta = page.meta ?? {};
  return {
    title: meta.title || page.title,
    ...(meta.description ? { description: meta.description } : {}),
  };
}

export default async function SitePage({ params }: Params) {
  const { slug } = await params;
  const path = slugOf(slug);
  const [page, chrome] = await Promise.all([
    getPageBySlug(path).catch(() => null),
    getChrome(),
  ]);

  if (!page) notFound();

  return (
    <SmoothScroll>
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
