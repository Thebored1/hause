import type { Block } from "payload";

/**
 * Editable content for the existing <ServicesGrid /> component.
 * The fields mirror its props exactly, so the CMS drives the
 * component that already ships — no re-creation of the design.
 */
export const ServicesGridBlock: Block = {
  slug: "servicesGrid",
  labels: { singular: "Services Grid", plural: "Services Grids" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "Services" },
    { name: "title", type: "textarea", defaultValue: "Interior design services that work for the way you live." },
    { name: "intro", type: "textarea" },
    { name: "featureImage", type: "text", defaultValue: "/images/sp-living.jpg" },
    {
      type: "row",
      fields: [
        { name: "statLabel", type: "text", defaultValue: "Site Supervision", admin: { width: "50%" } },
        { name: "statValue", type: "text", defaultValue: "100%", admin: { width: "50%" } },
      ],
    },
    { name: "statBody", type: "textarea" },
    {
      type: "row",
      fields: [
        { name: "ctaLabel", type: "text", defaultValue: "Book a free consultation", admin: { width: "50%" } },
        { name: "ctaHref", type: "text", defaultValue: "/contact", admin: { width: "50%" } },
      ],
    },
    {
      name: "services",
      type: "array",
      minRows: 1,
      labels: { singular: "Service", plural: "Services" },
      fields: [
        {
          type: "row",
          fields: [
            { name: "id", type: "text", required: true, admin: { width: "30%", description: "e.g. 01" } },
            {
              name: "icon",
              type: "select",
              required: true,
              defaultValue: "home",
              options: ["home", "globe", "sparkles", "zap", "layers", "box"],
              admin: { width: "70%" },
            },
          ],
        },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
  ],
};
