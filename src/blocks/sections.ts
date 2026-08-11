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
  labels: { singular: "Portfolio", plural: "Portfolios" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text" },
    { name: "intro", type: "textarea" },
    {
      name: "cards",
      type: "array",
      labels: { singular: "Card", plural: "Feature cards" },
      admin: {
        description:
          "Three works best: the first spans two rows, the other two stack beside it. Leave empty to keep the current set.",
      },
      fields: [
        { name: "tag", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "image", type: "text", required: true },
        { name: "href", type: "text", admin: { description: "Defaults to the CTA link." } },
      ],
    },
    {
      name: "strip",
      type: "array",
      labels: { singular: "Image", plural: "Image strip" },
      admin: { description: "Two image-only cards below the features; the note card sits beside them." },
      fields: [
        { name: "image", type: "text", required: true },
        { name: "alt", type: "text", required: true },
        { name: "href", type: "text" },
      ],
    },
    { name: "note", type: "textarea" },
    {
      type: "row",
      fields: [
        { name: "ctaLabel", type: "text", admin: { width: "50%" } },
        { name: "ctaHref", type: "text", admin: { width: "50%" } },
      ],
    },
  ],
};

export const CtaBlock: Block = {
  slug: "cta",
  labels: { singular: "Closing CTA", plural: "Closing CTAs" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text" },
    { name: "body", type: "textarea" },
    { name: "bgImage", type: "text", admin: { description: "e.g. /images/jaiswal/jaiswal-07.jpg" } },
    {
      type: "row",
      fields: [
        { name: "studioLabel", type: "text", admin: { width: "50%" } },
        { name: "contactLabel", type: "text", admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "studioAddress", type: "textarea", admin: { width: "50%", description: "One line per line break." } },
        { name: "contactDetails", type: "textarea", admin: { width: "50%", description: "One line per line break." } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "ctaLabel", type: "text", admin: { width: "50%" } },
        { name: "ctaHref", type: "text", admin: { width: "50%" } },
      ],
    },
  ],
};
