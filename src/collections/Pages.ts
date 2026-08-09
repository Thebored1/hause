import type { CollectionConfig } from "payload";
import { ServicesGridBlock } from "../blocks/ServicesGridBlock";
import { CanvasBlock } from "../blocks/CanvasBlock";
import { HeroBlock, ProcessBlock, WhyUsBlock, LocationsBlock, PortfolioBlock, CtaBlock } from "../blocks/sections";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: { useAsTitle: "title", defaultColumns: ["title", "slug", "updatedAt"] },
  access: { read: () => true },
  versions: { drafts: { autosave: false }, maxPerDoc: 25 },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    {
      name: "layout",
      type: "blocks",
      // Existing site components, exposed as editable blocks.
      blocks: [HeroBlock, ServicesGridBlock, PortfolioBlock, ProcessBlock, WhyUsBlock, LocationsBlock, CtaBlock, CanvasBlock],
    },
  ],
};
