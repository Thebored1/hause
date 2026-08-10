import type { CollectionConfig } from "payload";
import { ServicesGridBlock } from "../blocks/ServicesGridBlock";
import { CanvasBlock } from "../blocks/CanvasBlock";
import { HeroBlock, ProcessBlock, WhyUsBlock, LocationsBlock, PortfolioBlock, CtaBlock } from "../blocks/sections";
import {
  PageHeroBlock,
  FAQSectionBlock,
  ProjectsSectionBlock,
  ContactDetailsBlock,
  PromoBannerBlock,
  RegionsDirectoryBlock,
} from "../blocks/pages";
import {
  PillarsGridBlock,
  ComparisonColumnsBlock,
  RatingBarBlock,
  TestimonialsGridBlock,
  PhotoStripBlock,
  ProcessDeepDiveBlock,
  CommitmentBarBlock,
  ServicesShowcaseBlock,
  AssuranceRibbonBlock,
  StudioStoryBlock,
  PhilosophyGridBlock,
  TeamNetworkBlock,
  GalleryRibbonBlock,
  ValuesGridBlock,
  ReachBarBlock,
  ChecklistFeatureBlock,
  NumberedCardsBlock,
  CardListFeatureBlock,
  IconCardsBlock,
  StageGridBlock,
} from "../blocks/inner";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: { useAsTitle: "title", defaultColumns: ["title", "slug", "updatedAt"] },
  access: { read: () => true },
  versions: { drafts: { autosave: false }, maxPerDoc: 25 },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    {
      name: "contactModal",
      type: "checkbox",
      label: "Nav and CTA buttons open the contact modal",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Off means they link to /contact — how the inner pages behave.",
      },
    },
    {
      name: "meta",
      type: "group",
      label: "SEO",
      admin: { description: "Falls back to the page title and the site description." },
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
      ],
    },
    {
      name: "layout",
      type: "blocks",
      // Existing site components, exposed as editable blocks.
      blocks: [
        // Home page sections
        HeroBlock, ServicesGridBlock, PortfolioBlock, ProcessBlock, WhyUsBlock, LocationsBlock, CtaBlock,
        // Inner page sections
        PageHeroBlock, FAQSectionBlock, ProjectsSectionBlock, ContactDetailsBlock, PromoBannerBlock, RegionsDirectoryBlock,
        PillarsGridBlock, ComparisonColumnsBlock, RatingBarBlock, TestimonialsGridBlock, PhotoStripBlock,
        ProcessDeepDiveBlock, CommitmentBarBlock, ServicesShowcaseBlock, AssuranceRibbonBlock,
        StudioStoryBlock, PhilosophyGridBlock, TeamNetworkBlock, GalleryRibbonBlock, ValuesGridBlock, ReachBarBlock,
        ChecklistFeatureBlock, NumberedCardsBlock, CardListFeatureBlock, IconCardsBlock, StageGridBlock,
        // Freeform canvas
        CanvasBlock,
      ],
    },
  ],
};
