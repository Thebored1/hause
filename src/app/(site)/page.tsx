import SmoothScroll from "@/components/SmoothScroll";
import PageBlocks, { type PageBlock } from "@/components/PageBlocks";
import HomeHardcoded from "@/components/HomeHardcoded";
import { getPageBySlug } from "@/lib/pages";

export const dynamic = "force-dynamic";

/**
 * The home page is CMS-driven when a page with slug "home" exists.
 * If it does not — a fresh database, or a failed lookup — the
 * original hand-coded page renders instead, so the site is never
 * blank because of a missing record.
 */
export default async function Home() {
  const page = await getPageBySlug("home").catch(() => null);

  if (!page) return <HomeHardcoded />;

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <PageBlocks blocks={(page.layout ?? []) as PageBlock[]} withChrome />
      </main>
    </SmoothScroll>
  );
}
