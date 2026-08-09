import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import PageBlocks, { type PageBlock } from "@/components/PageBlocks";

export const dynamic = "force-dynamic";

/** Fetches a CMS page by slug. Returns null when there isn't one. */
export async function getPageBySlug(slug: string) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  return docs[0] ?? null;
}

export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  return (
    <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea]">
      <PageBlocks blocks={(page.layout ?? []) as PageBlock[]} />
    </main>
  );
}
