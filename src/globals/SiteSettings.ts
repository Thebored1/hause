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
  label: "Nav & Footer",
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
