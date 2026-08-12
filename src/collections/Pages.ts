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
  LayoutCardsBlock,
  SpecFeatureBlock,
  DarkCardGridBlock,
  PropertyCardsBlock,
  ProjectRibbonBlock,
  DarkStepCardsBlock,
} from "../blocks/inner";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: { useAsTitle: "title", defaultColumns: ["title", "slug", "updatedAt"] },
  access: {
    // Drafts stay private; published pages are public. Same rule as Posts.
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
  },
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
    // The SEO group used to be declared here with a title and a description.
    // It now comes from @payloadcms/plugin-seo, which adds the share image,
    // character counts and a search-result preview alongside them — and keeps
    // the same `meta.title` / `meta.description` paths, so nothing stored
    // under the old fields moves.
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
        LayoutCardsBlock, SpecFeatureBlock, DarkCardGridBlock,
        PropertyCardsBlock, ProjectRibbonBlock, DarkStepCardsBlock,
        // Freeform canvas
        CanvasBlock,
      ],
    },
  ],
};
