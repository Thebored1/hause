import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import ServicesGrid, { type ServiceItem } from "@/components/ServicesGrid";

export const dynamic = "force-dynamic";

// ============================================================
// Renders a CMS-managed page using the site's own components.
//
// Nothing here re-creates the design: each stored block maps to
// the component that already ships, with its content supplied
// as props. Existing hand-coded pages are untouched.
// ============================================================

type Block = { blockType?: string; [key: string]: unknown };

function renderBlock(block: Block, i: number) {
  switch (block.blockType) {
    case "servicesGrid":
      return (
        <ServicesGrid
          key={i}
          eyebrow={block.eyebrow as string}
          title={block.title as string}
          intro={block.intro as string}
          featureImage={block.featureImage as string}
          statLabel={block.statLabel as string}
          statValue={block.statValue as string}
          statBody={block.statBody as string}
          ctaLabel={block.ctaLabel as string}
          ctaHref={block.ctaHref as string}
          services={block.services as ServiceItem[]}
        />
      );
    default:
      return null;
  }
}

export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });

  const page = docs[0];
  if (!page) notFound();

  const layout = (page.layout ?? []) as Block[];
  return <main className="min-h-screen bg-[#0c0d0e]">{layout.map(renderBlock)}</main>;
}
