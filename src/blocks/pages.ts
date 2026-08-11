import type { Block } from "payload";

// ============================================================
// Blocks for the inner pages (as opposed to the home page's
// sections, which live in ./sections.ts).
//
// Same contract: fields mirror component props, and an empty
// field means "keep the copy the component already ships".
// ============================================================

export const PageHeroBlock: Block = {
  slug: "pageHero",
  labels: { singular: "Page Hero", plural: "Page Heroes" },
  admin: { group: "Page sections" },
  fields: [
    { name: "badge", type: "text", admin: { description: "Small pill above the title." } },
    { name: "title", type: "text", required: true },
    { name: "subtitle", type: "textarea" },
    {
      name: "bgImage",
      type: "text",
      admin: { description: "e.g. /images/jaiswal/jaiswal-15.jpg" },
    },
    {
      name: "breadcrumbs",
      type: "array",
      labels: { singular: "Crumb", plural: "Breadcrumbs" },
      admin: { description: "Leave the last crumb's link empty — it is the current page." },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "primaryCtaText", type: "text", admin: { width: "50%" } },
        { name: "primaryCtaHref", type: "text", admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "secondaryCtaText", type: "text", admin: { width: "50%" } },
        { name: "secondaryCtaHref", type: "text", admin: { width: "50%" } },
      ],
    },
  ],
};

export const FAQSectionBlock: Block = {
  slug: "faqSection",
  labels: { singular: "FAQ Section", plural: "FAQ Sections" },
  admin: { group: "Page sections" },
  fields: [
    {
      name: "items",
      type: "array",
      labels: { singular: "Question", plural: "Questions" },
      admin: { description: "Leave empty to use the standard question set." },
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
        { name: "category", type: "text" },
      ],
    },
    { name: "askTitle", type: "text" },
    { name: "askBody", type: "textarea" },
    {
      type: "row",
      fields: [
        { name: "askLabel", type: "text", admin: { width: "50%" } },
        { name: "askHref", type: "text", admin: { width: "50%" } },
      ],
    },
  ],
};

export const ProjectsSectionBlock: Block = {
  slug: "projectsSection",
  labels: { singular: "Projects Grid", plural: "Projects Grids" },
  admin: { group: "Page sections" },
  fields: [
    {
      name: "projects",
      type: "array",
      labels: { singular: "Project", plural: "Projects" },
      admin: {
        description:
          "The filter tabs are built from the categories used here. Leave empty to keep the current set.",
      },
      fields: [
        { name: "id", type: "text", required: true, admin: { description: "Unique key, e.g. villa-entrance" } },
        { name: "title", type: "text", required: true },
        { name: "category", type: "text", required: true },
        {
          type: "row",
          fields: [
            { name: "location", type: "text", required: true, admin: { width: "50%" } },
            { name: "area", type: "text", required: true, admin: { width: "50%" } },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "scope", type: "text", required: true, admin: { width: "50%" } },
            { name: "timeline", type: "text", required: true, admin: { width: "50%" } },
          ],
        },
        { name: "image", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        {
          name: "highlights",
          type: "array",
          labels: { singular: "Highlight", plural: "Highlights" },
          fields: [{ name: "value", type: "text", required: true }],
        },
      ],
    },
  ],
};

export const ContactDetailsBlock: Block = {
  slug: "contactDetails",
  labels: { singular: "Contact Details", plural: "Contact Details" },
  admin: { group: "Page sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "title", type: "text" },
    { name: "body", type: "textarea" },
    {
      type: "row",
      fields: [
        { name: "phone", type: "text", admin: { width: "50%" } },
        { name: "email", type: "text", admin: { width: "50%" } },
      ],
    },
    {
      name: "address",
      type: "textarea",
      admin: { description: "One line per line break." },
    },
    { name: "hours", type: "text" },
    { name: "nextStepsLabel", type: "text" },
    {
      type: "collapsible",
      label: "Enquiry form options",
      admin: { initCollapsed: true, description: "Leave empty to keep the current options." },
      fields: [
        {
          name: "projectTypes",
          type: "array",
          labels: { singular: "Project type", plural: "Project types" },
          fields: [
            { name: "value", type: "text", required: true, admin: { description: "Stored on the enquiry; keep stable." } },
            { name: "label", type: "text", required: true },
          ],
        },
        {
          name: "budgets",
          type: "array",
          labels: { singular: "Budget band", plural: "Budget bands" },
          fields: [
            { name: "value", type: "text", required: true, admin: { description: "Stored on the enquiry; keep stable." } },
            { name: "label", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "nextSteps",
      type: "array",
      labels: { singular: "Step", plural: "Steps" },
      fields: [
        { name: "step", type: "text", required: true, admin: { description: "e.g. 01" } },
        { name: "title", type: "text", required: true },
        { name: "desc", type: "textarea", required: true },
      ],
    },
  ],
};

export const PromoBannerBlock: Block = {
  slug: "promoBanner",
  labels: { singular: "Promo Banner", plural: "Promo Banners" },
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
    {
      type: "collapsible",
      label: "Appearance",
      admin: { initCollapsed: true },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "spacing",
              type: "select",
              defaultValue: "normal",
              options: [
                { label: "Normal", value: "normal" },
                { label: "Loose", value: "loose" },
              ],
              admin: { width: "33%" },
            },
            {
              name: "cardShadow",
              type: "select",
              defaultValue: "sm",
              options: [
                { label: "Soft", value: "sm" },
                { label: "Medium", value: "md" },
              ],
              admin: { width: "33%" },
            },
            {
              name: "showArrow",
              type: "checkbox",
              defaultValue: true,
              label: "Arrow on button",
              admin: { width: "33%" },
            },
          ],
        },
      ],
    },
  ],
};

export const RegionsDirectoryBlock: Block = {
  slug: "regionsDirectory",
  labels: { singular: "Regions Directory", plural: "Regions Directories" },
  admin: { group: "Page sections" },
  fields: [
    {
      name: "regions",
      type: "array",
      labels: { singular: "Region", plural: "Regions" },
      admin: { description: "Leave empty to use the standard service-area list." },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "badge", type: "text", required: true },
        { name: "subtext", type: "text", required: true },
        { name: "desc", type: "textarea", required: true },
        {
          name: "specialties",
          type: "array",
          labels: { singular: "Focus", plural: "Key project focus" },
          fields: [{ name: "value", type: "text", required: true }],
        },
        {
          name: "highlight",
          type: "checkbox",
          label: "Dark card (headquarters)",
          defaultValue: false,
        },
      ],
    },
    { name: "specialtiesLabel", type: "text" },
    { name: "ctaHref", type: "text" },
  ],
};
