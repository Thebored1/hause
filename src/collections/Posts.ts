import type { CollectionConfig } from "payload";

/** Blog posts. Drafts are on, autosave off — publish is explicit. */
export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Post", plural: "Posts" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "publishedAt", "_status"],
    group: "Blog",
  },
  access: {
    // Drafts stay private; published posts are public.
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
  },
  versions: { drafts: { autosave: false }, maxPerDoc: 25 },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "URL segment, e.g. choosing-a-modular-kitchen" },
    },
    {
      name: "excerpt",
      type: "textarea",
      admin: { description: "Shown on the blog index and used as the meta description." },
    },
    { name: "coverImage", type: "upload", relationTo: "media" },
    { name: "content", type: "richText" },
    {
      name: "publishedAt",
      type: "date",
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "author",
      type: "text",
      defaultValue: "Hause Interiors",
      admin: { position: "sidebar" },
    },
  ],
};
