import type { Block } from "payload";

// ============================================================
// Payload blocks for the site's own section components.
//
// Each block's fields mirror the component's props. Where a field
// is left empty the component falls back to the copy it has always
// shipped, so a half-filled block still renders correctly.
// ============================================================

export const HeroBlock: Block = {
  slug: "hero",
  labels: { singular: "Hero", plural: "Heroes" },
  fields: [
    { name: "eyebrow", type: "text" },
    {
      type: "row",
      fields: [
        { name: "titleLine1", type: "text", admin: { width: "50%" } },
        { name: "titleLine2", type: "text", admin: { width: "50%" } },
      ],
    },
    { name: "body", type: "textarea" },
    {
      type: "row",
      fields: [
        { name: "primaryLabel", type: "text", admin: { width: "50%" } },
        { name: "ctaHref", type: "text", admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "secondaryLabel", type: "text", admin: { width: "50%" } },
        { name: "secondaryHref", type: "text", admin: { width: "50%" } },
      ],
    },
    { name: "spacesLabel", type: "text" },
    {
      name: "spaces",
      type: "array",
      labels: { singular: "Space", plural: "Spaces" },
      admin: { description: "Chips that swap the background photograph." },
      fields: [
        { name: "key", type: "text", required: true, admin: { description: "Unique id, e.g. living-rooms" } },
        { name: "name", type: "text", required: true },
        { name: "image", type: "text", required: true, admin: { description: "e.g. /images/sp-living.jpg" } },
      ],
    },
    { name: "statsIntro", type: "textarea" },
    {
      name: "stats",
      type: "array",
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
    },
  ],
};

export const ProcessBlock: Block = {
  slug: "process",
  labels: { singular: "Process", plural: "Process sections" },
  fields: [
    {
      name: "steps",
      type: "array",
      fields: [
        { name: "n", type: "text", required: true, admin: { description: "e.g. 01" } },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
};

export const WhyUsBlock: Block = {
  slug: "whyUs",
  labels: { singular: "Why Us", plural: "Why Us sections" },
  fields: [
    {
      name: "reasons",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
};

export const LocationsBlock: Block = {
  slug: "locations",
  labels: { singular: "Locations", plural: "Locations sections" },
  fields: [
    {
      name: "cities",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
        { name: "tag", type: "text", required: true, admin: { description: "e.g. On ground" } },
      ],
    },
  ],
};

export const PortfolioBlock: Block = {
  slug: "portfolio",
  labels: { singular: "Portfolio", plural: "Portfolio sections" },
  // Placement only for now — the project list still lives in the
  // component and is not editable here yet.
  fields: [],
};

export const CtaBlock: Block = {
  slug: "cta",
  labels: { singular: "Closing CTA", plural: "Closing CTAs" },
  fields: [
    {
      name: "bgImage",
      type: "text",
      admin: { description: "Background photograph, e.g. /images/jaiswal/jaiswal-07.jpg" },
    },
  ],
};
