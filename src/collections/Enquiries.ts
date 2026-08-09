import type { CollectionConfig } from "payload";

/**
 * Contact form submissions.
 *
 * Anyone may create one (the public form posts here); only signed-in
 * staff can read, edit or delete them. Fields are read-only in the
 * admin so a submission is never silently altered after the fact —
 * only its status and internal notes can change.
 */
export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  labels: { singular: "Enquiry", plural: "Enquiries" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "status", "createdAt"],
    group: "Enquiries",
  },
  access: {
    create: () => true, // the public contact form
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, admin: { readOnly: true, width: "50%" } },
        { name: "email", type: "email", required: true, admin: { readOnly: true, width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "phone", type: "text", admin: { readOnly: true, width: "50%" } },
        { name: "location", type: "text", admin: { readOnly: true, width: "50%" } },
      ],
    },
    { name: "projectType", type: "text", admin: { readOnly: true } },
    { name: "message", type: "textarea", admin: { readOnly: true } },
    {
      name: "source",
      type: "text",
      admin: { readOnly: true, description: "Which page or component the enquiry came from." },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Quoted", value: "quoted" },
        { label: "Won", value: "won" },
        { label: "Closed", value: "closed" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "notes",
      type: "textarea",
      admin: { position: "sidebar", description: "Internal only — never shown to the client." },
    },
  ],
};
