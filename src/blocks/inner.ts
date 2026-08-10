import type { Block } from "payload";

// ============================================================
// Blocks for the remaining inner pages — about, services,
// process, testimonials and why-hause-interiors.
//
// Same contract as ./pages.ts: fields mirror component props,
// and an empty field means "keep the copy the component ships".
// ============================================================

/** Payload arrays can't hold bare strings, so string lists are wrapped. */
const stringList = (name: string, label: string): Block["fields"][number] => ({
  name,
  type: "array",
  labels: { singular: label, plural: label },
  fields: [{ name: "value", type: "text", required: true }],
});

const THEME_OPTIONS = [
  { label: "Light", value: "light" },
  { label: "Sand", value: "sand" },
  { label: "Dark", value: "dark" },
];

// ---------- why-hause-interiors ----------

export const PillarsGridBlock: Block = {
  slug: "pillarsGrid",
  labels: { singular: "Pillars Grid", plural: "Pillars Grids" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text" },
    {
      name: "pillars",
      type: "array",
      labels: { singular: "Pillar", plural: "Pillars" },
      admin: { description: "Cards 1 and 4 span two columns. Leave empty for the standard five." },
      fields: [
        { name: "num", type: "text", required: true },
        { name: "tag", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "desc", type: "textarea", required: true },
        {
          name: "icon",
          type: "select",
          defaultValue: "shield-check",
          options: ["shield-check", "file-check", "target", "eye", "globe"].map((v) => ({ label: v, value: v })),
        },
        stringList("details", "Detail"),
      ],
    },
  ],
};

export const ComparisonColumnsBlock: Block = {
  slug: "comparisonColumns",
  labels: { singular: "Comparison", plural: "Comparisons" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text" },
    { name: "negativeLabel", type: "text" },
    stringList("negatives", "Drawback"),
    { name: "positiveLabel", type: "text" },
    stringList("positives", "Advantage"),
  ],
};

// ---------- testimonials ----------

export const RatingBarBlock: Block = {
  slug: "ratingBar",
  labels: { singular: "Rating Bar", plural: "Rating Bars" },
  admin: { group: "Page sections" },
  fields: [
    { name: "stars", type: "number", min: 0, max: 5 },
    { name: "summary", type: "text" },
    stringList("facts", "Fact"),
  ],
};

export const TestimonialsGridBlock: Block = {
  slug: "testimonialsGrid",
  labels: { singular: "Testimonials Grid", plural: "Testimonials Grids" },
  admin: { group: "Page sections" },
  fields: [
    {
      name: "testimonials",
      type: "array",
      labels: { singular: "Testimonial", plural: "Testimonials" },
      fields: [
        { name: "client", type: "text", required: true },
        { name: "designation", type: "text", required: true },
        { name: "project", type: "text", required: true },
        { name: "location", type: "text", required: true },
        { name: "rating", type: "number", required: true, min: 1, max: 5 },
        { name: "quote", type: "textarea", required: true },
        stringList("tags", "Tag"),
      ],
    },
  ],
};

export const PhotoStripBlock: Block = {
  slug: "photoStrip",
  labels: { singular: "Photo Strip", plural: "Photo Strips" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text" },
    {
      type: "row",
      fields: [
        { name: "linkLabel", type: "text", admin: { width: "50%" } },
        { name: "linkHref", type: "text", admin: { width: "50%" } },
      ],
    },
    {
      name: "photos",
      type: "array",
      labels: { singular: "Photo", plural: "Photos" },
      fields: [
        { name: "src", type: "text", required: true },
        { name: "title", type: "text", required: true },
      ],
    },
  ],
};

// ---------- process ----------

export const ProcessDeepDiveBlock: Block = {
  slug: "processDeepDive",
  labels: { singular: "Process Deep Dive", plural: "Process Deep Dives" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text" },
    { name: "deliverablesLabel", type: "text" },
    {
      name: "steps",
      type: "array",
      labels: { singular: "Step", plural: "Steps" },
      fields: [
        { name: "num", type: "text", required: true },
        { name: "tag", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "subtitle", type: "text", required: true },
        { name: "desc", type: "textarea", required: true },
        { name: "image", type: "text", required: true },
        { name: "theme", type: "select", defaultValue: "light", options: THEME_OPTIONS },
        stringList("deliverables", "Deliverable"),
      ],
    },
  ],
};

export const CommitmentBarBlock: Block = {
  slug: "commitmentBar",
  labels: { singular: "Commitment Bar", plural: "Commitment Bars" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text" },
    { name: "body", type: "textarea" },
    {
      type: "row",
      fields: [
        { name: "ctaLabel", type: "text", admin: { width: "50%" } },
        { name: "ctaHref", type: "text", admin: { width: "50%" } },
      ],
    },
  ],
};

// ---------- services ----------

export const ServicesShowcaseBlock: Block = {
  slug: "servicesShowcase",
  labels: { singular: "Services Showcase", plural: "Services Showcases" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text" },
    {
      name: "services",
      type: "array",
      labels: { singular: "Service", plural: "Services" },
      fields: [
        { name: "slug", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "tagline", type: "text", required: true },
        { name: "desc", type: "textarea", required: true },
        { name: "image", type: "text", required: true },
        { name: "theme", type: "select", defaultValue: "light", options: THEME_OPTIONS },
        {
          name: "isExternalOrContact",
          type: "checkbox",
          label: "Link to /contact instead of the service page",
          defaultValue: false,
        },
        stringList("features", "Feature"),
      ],
    },
  ],
};

export const AssuranceRibbonBlock: Block = {
  slug: "assuranceRibbon",
  labels: { singular: "Assurance Ribbon", plural: "Assurance Ribbons" },
  admin: { group: "Page sections" },
  fields: [
    {
      name: "cards",
      type: "array",
      labels: { singular: "Card", plural: "Cards" },
      fields: [
        {
          name: "icon",
          type: "select",
          defaultValue: "shield-check",
          options: ["shield-check", "clock", "award"].map((v) => ({ label: v, value: v })),
        },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
};

// ---------- about ----------

export const StudioStoryBlock: Block = {
  slug: "studioStory",
  labels: { singular: "Studio Story", plural: "Studio Stories" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text" },
    { name: "body1", type: "textarea" },
    { name: "body2", type: "textarea" },
    {
      name: "stats",
      type: "array",
      labels: { singular: "Stat", plural: "Stats" },
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
    },
    { name: "image", type: "text" },
    { name: "imageAlt", type: "text" },
    { name: "imageEyebrow", type: "text" },
    { name: "imageCaption", type: "textarea" },
  ],
};

export const PhilosophyGridBlock: Block = {
  slug: "philosophyGrid",
  labels: { singular: "Philosophy Grid", plural: "Philosophy Grids" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text" },
    { name: "intro", type: "textarea" },
    {
      name: "philosophies",
      type: "array",
      labels: { singular: "Principle", plural: "Principles" },
      fields: [
        { name: "num", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "desc", type: "textarea", required: true },
        {
          name: "icon",
          type: "select",
          defaultValue: "compass",
          options: ["compass", "sliders", "shield-check", "award"].map((v) => ({ label: v, value: v })),
        },
      ],
    },
  ],
};

export const TeamNetworkBlock: Block = {
  slug: "teamNetwork",
  labels: { singular: "Team Network", plural: "Team Networks" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text" },
    { name: "body", type: "textarea" },
    stringList("points", "Point"),
    { name: "image", type: "text" },
    { name: "imageAlt", type: "text" },
    { name: "imageEyebrow", type: "text" },
    { name: "imageCaption", type: "textarea" },
  ],
};

export const GalleryRibbonBlock: Block = {
  slug: "galleryRibbon",
  labels: { singular: "Gallery Ribbon", plural: "Gallery Ribbons" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text" },
    {
      type: "row",
      fields: [
        { name: "linkLabel", type: "text", admin: { width: "50%" } },
        { name: "linkHref", type: "text", admin: { width: "50%" } },
      ],
    },
    {
      name: "items",
      type: "array",
      labels: { singular: "Item", plural: "Items" },
      fields: [
        { name: "src", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "tag", type: "text", required: true },
      ],
    },
  ],
};

export const ValuesGridBlock: Block = {
  slug: "valuesGrid",
  labels: { singular: "Values Grid", plural: "Values Grids" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text" },
    {
      name: "values",
      type: "array",
      labels: { singular: "Value", plural: "Values" },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "desc", type: "textarea", required: true },
      ],
    },
  ],
};

export const ReachBarBlock: Block = {
  slug: "reachBar",
  labels: { singular: "Reach Bar", plural: "Reach Bars" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text" },
    { name: "body", type: "textarea" },
    {
      type: "row",
      fields: [
        { name: "ctaLabel", type: "text", admin: { width: "50%" } },
        { name: "ctaHref", type: "text", admin: { width: "50%" } },
      ],
    },
  ],
};

// ---------- shared by the service detail pages ----------

const TONE_OPTIONS = [
  { label: "Ivory", value: "ivory" },
  { label: "Sand", value: "sand" },
];

export const ChecklistFeatureBlock: Block = {
  slug: "checklistFeature",
  labels: { singular: "Checklist Feature", plural: "Checklist Features" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "body", type: "textarea", required: true },
    stringList("items", "Item"),
    {
      type: "row",
      fields: [
        { name: "image", type: "text", required: true, admin: { width: "50%" } },
        { name: "imageAlt", type: "text", required: true, admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "imageSide",
          type: "select",
          defaultValue: "right",
          options: [
            { label: "Right", value: "right" },
            { label: "Left", value: "left" },
          ],
          admin: { width: "50%" },
        },
        { name: "tone", type: "select", defaultValue: "ivory", options: TONE_OPTIONS, admin: { width: "50%" } },
      ],
    },
  ],
};

export const NumberedCardsBlock: Block = {
  slug: "numberedCards",
  labels: { singular: "Numbered Cards", plural: "Numbered Cards" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "intro", type: "textarea", required: true },
    {
      name: "cards",
      type: "array",
      labels: { singular: "Card", plural: "Cards" },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "desc", type: "textarea", required: true },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "columns",
          type: "select",
          defaultValue: "3",
          options: ["2", "3", "4"].map((v) => ({ label: v, value: v })),
          admin: { width: "50%" },
        },
        { name: "tone", type: "select", defaultValue: "sand", options: TONE_OPTIONS, admin: { width: "50%" } },
      ],
    },
  ],
};

export const CardListFeatureBlock: Block = {
  slug: "cardListFeature",
  labels: { singular: "Card List Feature", plural: "Card List Features" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "body", type: "textarea", required: true },
    {
      name: "cards",
      type: "array",
      labels: { singular: "Card", plural: "Cards" },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "desc", type: "textarea", required: true },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "image", type: "text", required: true, admin: { width: "50%" } },
        { name: "imageAlt", type: "text", required: true, admin: { width: "50%" } },
      ],
    },
  ],
};

export const IconCardsBlock: Block = {
  slug: "iconCards",
  labels: { singular: "Icon Cards", plural: "Icon Cards" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "intro", type: "textarea", admin: { description: "Leave empty for no lead paragraph." } },
    {
      name: "titleTracking",
      type: "select",
      defaultValue: "tight",
      options: [
        { label: "Tight", value: "tight" },
        { label: "Normal", value: "normal" },
      ],
    },
    {
      name: "cards",
      type: "array",
      labels: { singular: "Card", plural: "Cards" },
      fields: [
        {
          name: "icon",
          type: "select",
          defaultValue: "clock",
          options: ["clock", "layout-grid", "zap", "shield-check", "users", "building", "sparkles", "layers", "check-circle"].map(
            (v) => ({ label: v, value: v }),
          ),
        },
        { name: "title", type: "text", required: true },
        { name: "desc", type: "textarea", required: true },
      ],
    },
  ],
};

export const StageGridBlock: Block = {
  slug: "stageGrid",
  labels: { singular: "Stage Grid", plural: "Stage Grids" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "intro", type: "textarea", required: true },
    {
      name: "stages",
      type: "array",
      labels: { singular: "Stage", plural: "Stages" },
      fields: [
        { name: "num", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "desc", type: "textarea", required: true },
        {
          name: "wide",
          type: "checkbox",
          label: "Span the full row",
          defaultValue: false,
          admin: { description: "Use for a trailing card that would otherwise leave a gap." },
        },
      ],
    },
  ],
};

export const LayoutCardsBlock: Block = {
  slug: "layoutCards",
  labels: { singular: "Layout Cards", plural: "Layout Cards" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "intro", type: "textarea", required: true },
    { name: "bestForLabel", type: "text" },
    {
      name: "options",
      type: "array",
      labels: { singular: "Option", plural: "Options" },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "bestFor", type: "text", required: true },
        { name: "desc", type: "textarea", required: true },
      ],
    },
  ],
};

export const SpecFeatureBlock: Block = {
  slug: "specFeature",
  labels: { singular: "Spec Feature", plural: "Spec Features" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "body", type: "textarea", required: true },
    {
      name: "specs",
      type: "array",
      labels: { singular: "Spec", plural: "Specs" },
      fields: [
        { name: "category", type: "text", required: true },
        { name: "options", type: "textarea", required: true },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "image", type: "text", required: true, admin: { width: "50%" } },
        { name: "imageAlt", type: "text", required: true, admin: { width: "50%" } },
      ],
    },
  ],
};

export const DarkCardGridBlock: Block = {
  slug: "darkCardGrid",
  labels: { singular: "Dark Card Grid", plural: "Dark Card Grids" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "intro", type: "textarea", required: true },
    {
      name: "cards",
      type: "array",
      labels: { singular: "Card", plural: "Cards" },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "desc", type: "textarea", required: true },
      ],
    },
  ],
};

export const PropertyCardsBlock: Block = {
  slug: "propertyCards",
  labels: { singular: "Property Cards", plural: "Property Cards" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "intro", type: "textarea", required: true },
    {
      name: "types",
      type: "array",
      labels: { singular: "Type", plural: "Types" },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "desc", type: "textarea", required: true },
      ],
    },
  ],
};

export const ProjectRibbonBlock: Block = {
  slug: "projectRibbon",
  labels: { singular: "Project Ribbon", plural: "Project Ribbons" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text", required: true },
    { name: "title", type: "text", required: true },
    {
      type: "row",
      fields: [
        { name: "linkLabel", type: "text", required: true, admin: { width: "50%" } },
        { name: "linkHref", type: "text", required: true, admin: { width: "50%" } },
      ],
    },
    {
      name: "photos",
      type: "array",
      labels: { singular: "Photo", plural: "Photos" },
      fields: [
        { name: "src", type: "text", required: true },
        { name: "title", type: "text", required: true },
      ],
    },
  ],
};

export const DarkStepCardsBlock: Block = {
  slug: "darkStepCards",
  labels: { singular: "Dark Step Cards", plural: "Dark Step Cards" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "intro", type: "textarea", required: true },
    {
      name: "steps",
      type: "array",
      labels: { singular: "Step", plural: "Steps" },
      fields: [
        { name: "step", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "desc", type: "textarea", required: true },
      ],
    },
  ],
};
