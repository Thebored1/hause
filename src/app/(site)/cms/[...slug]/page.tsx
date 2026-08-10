import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/pages";
import PageBlocks, { type PageBlock } from "@/components/PageBlocks";
import SmoothScroll from "@/components/SmoothScroll";

export const dynamic = "force-dynamic";

// Catch-all rather than [slug]: nested pages such as the service details are
// stored under slugs like "services/renovation-remodeling".

type Params = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug.join("/"));
  if (!page) return {};

  const meta = page.meta ?? {};
  return {
    title: meta.title || page.title,
    ...(meta.description ? { description: meta.description } : {}),
  };
}

export default async function CmsPage({ params }: Params) {
  const { slug } = await params;
  const path = slug.join("/");
  const page = await getPageBySlug(path);
  if (!page) notFound();

  // Same shell as the hand-coded pages, so a CMS page is a drop-in replacement.
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <PageBlocks
          blocks={(page.layout ?? []) as PageBlock[]}
          withChrome
          contactModal={Boolean(page.contactModal)}
          activePath={`/${path}`}
        />
      </main>
    </SmoothScroll>
  );
}
