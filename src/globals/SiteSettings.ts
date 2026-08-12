import type { GlobalConfig } from "payload";

/**
 * Nav and footer content.
 *
 * A global rather than a collection: there is exactly one of these, and it is
 * chrome rather than a page. Every field is optional — the components ship the
 * current copy as defaults, so an empty document renders the site exactly as
 * it does today and a half-filled one is still coherent.
 */

const linkFields = [
  { name: "label", type: "text" as const, required: true },
  { name: "href", type: "text" as const, required: true },
];

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  // Was "Nav & Footer"; it now carries the site identity and business
  // details that structured data is built from, as well as the chrome.
  label: "Site Settings",
  admin: { group: "Site" },
  access: {
    // Chrome is public; only staff can change it.
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "site",
          label: "Site",
          description:
            "Used as the fallback for any page that sets no SEO of its own, and as the identity search engines attach to this site.",
          fields: [
            { name: "name", type: "text", defaultValue: "Hause Interiors" },
            {
              name: "description",
              type: "textarea",
              admin: { description: "Default meta description." },
            },
            {
              name: "defaultImage",
              type: "upload",
              relationTo: "media",
              label: "Default share image",
              admin: {
                description:
                  "Shown when a link is pasted into WhatsApp, LinkedIn or Slack, for any page with no image of its own. 1200x630; keep text large, because it is usually shown small and cropped.",
              },
            },
            {
              name: "sameAs",
              type: "array",
              label: "Social profiles",
              admin: {
                description:
                  "Full profile URLs. Search engines use these to connect the site to those accounts, so only list ones you control.",
              },
              fields: [{ name: "url", type: "text", required: true }],
            },
          ],
        },
        {
          name: "business",
          label: "Business",
          description:
            "Studio details, published as structured data so the business can appear in local search and on maps.",
          fields: [
            {
              name: "enabled",
              type: "checkbox",
              defaultValue: false,
              label: "Publish business details to search engines",
              admin: {
                description:
                  "Off until the fields below are right. A half-filled address is treated as a quality problem, and these are cross-checked against your Google Business Profile — they must match it exactly.",
              },
            },
            {
              name: "type",
              type: "text",
              defaultValue: "InteriorDesignService",
              label: "Schema type",
              admin: {
                description:
                  "InteriorDesignService is the closest fit for a studio. LocalBusiness is the safe general option.",
              },
            },
            {
              type: "row",
              fields: [
                { name: "telephone", type: "text", admin: { width: "50%" } },
                { name: "email", type: "text", admin: { width: "50%" } },
              ],
            },
            { name: "streetAddress", type: "text" },
            {
              type: "row",
              fields: [
                { name: "locality", type: "text", label: "City", admin: { width: "50%" } },
                { name: "region", type: "text", label: "State", admin: { width: "50%" } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "postalCode", type: "text", admin: { width: "50%" } },
                {
                  name: "country",
                  type: "text",
                  defaultValue: "IN",
                  admin: { width: "50%", description: "Two-letter code." },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "latitude",
                  type: "text",
                  admin: {
                    width: "50%",
                    description: "Google Maps: right-click the pin, the numbers at the top.",
                  },
                },
                { name: "longitude", type: "text", admin: { width: "50%" } },
              ],
            },
            {
              name: "openingHours",
              type: "text",
              admin: { description: 'Schema format, e.g. "Mo-Sa 10:00-19:00".' },
            },
            { name: "priceRange", type: "text", admin: { description: 'Coarse, e.g. "₹₹".' } },
            {
              name: "areaServed",
              type: "array",
              label: "Areas served",
              admin: { description: "Cities you work in — Delhi, Noida, Gurugram, and so on." },
              fields: [{ name: "name", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Header",
          fields: [
            {
              name: "header",
              type: "group",
              label: false,
              fields: [
                { name: "logo", type: "text", admin: { description: "e.g. /images/logo.png" } },
                {
                  name: "navLinks",
                  type: "array",
                  labels: { singular: "Link", plural: "Nav links" },
                  admin: { description: "Shown after the Services dropdown. Leave empty to keep the current set." },
                  fields: linkFields,
                },
                {
                  name: "servicesLabel",
                  type: "text",
                  admin: { description: "Label for the dropdown itself." },
                },
                { name: "servicesHref", type: "text" },
                {
                  name: "serviceItems",
                  type: "array",
                  labels: { singular: "Service", plural: "Services dropdown" },
                  fields: [
                    { name: "title", type: "text", required: true },
                    { name: "href", type: "text", required: true },
                    { name: "desc", type: "text", required: true },
                    {
                      name: "icon",
                      type: "select",
                      defaultValue: "home",
                      options: ["home", "building", "kitchen", "layers", "hammer"].map((v) => ({
                        label: v,
                        value: v,
                      })),
                    },
                  ],
                },
                {
                  name: "cta",
                  type: "group",
                  fields: [
                    { name: "label", type: "text" },
                    { name: "href", type: "text" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Footer",
          fields: [
            {
              name: "footer",
              type: "group",
              label: false,
              fields: [
                { name: "logo", type: "text", admin: { description: "e.g. /images/footer-logo.png" } },
                {
                  name: "columns",
                  type: "array",
                  labels: { singular: "Column", plural: "Link columns" },
                  admin: { description: "Leave empty to keep the current three columns." },
                  fields: [
                    { name: "heading", type: "text", required: true },
                    {
                      name: "links",
                      type: "array",
                      labels: { singular: "Link", plural: "Links" },
                      fields: [
                        ...linkFields,
                        {
                          name: "arrow",
                          type: "checkbox",
                          label: "Show arrow",
                          defaultValue: false,
                        },
                        {
                          name: "external",
                          type: "checkbox",
                          label: "Opens in a new tab",
                          defaultValue: false,
                        },
                        {
                          name: "emphasis",
                          type: "checkbox",
                          label: "Brighter text",
                          defaultValue: false,
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "contact",
                  type: "group",
                  fields: [
                    { name: "address", type: "text" },
                    { name: "phone", type: "text" },
                    { name: "email", type: "text" },
                  ],
                },
                {
                  name: "bottom",
                  type: "group",
                  fields: [
                    { name: "companyName", type: "text", admin: { description: "Used in the © line; the year is added automatically." } },
                    {
                      name: "notes",
                      type: "array",
                      labels: { singular: "Note", plural: "Bottom-right notes" },
                      fields: [{ name: "value", type: "text", required: true }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
