import type { CollectionConfig } from "payload";
import {
  lexicalEditor,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  InlineCodeFeature,
  ParagraphFeature,
  HeadingFeature,
  UnorderedListFeature,
  OrderedListFeature,
  BlockquoteFeature,
  LinkFeature,
  UploadFeature,
  HorizontalRuleFeature,
  AlignFeature,
  IndentFeature,
  InlineToolbarFeature,
  FixedToolbarFeature,
} from "@payloadcms/richtext-lexical";

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
    {
      name: "content",
      type: "richText",
      // Scopes the WYSIWYG styling in (payload)/admin.css to this field, so
      // the page canvas's inline rich text is untouched.
      admin: { className: "blog-body" },
      // Pinned rather than relying on lexicalEditor()'s defaults, which vary
      // by release. Everything enabled here has matching styles in .nb-prose.
      editor: lexicalEditor({
        features: [
          ParagraphFeature(),
          // h1 is the post title on the page, so the body starts at h2.
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          StrikethroughFeature(),
          InlineCodeFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          BlockquoteFeature(),
          LinkFeature({ enabledCollections: ["posts", "pages"] }),
          // `collections` needs a `fields` array per slug; use enabledCollections
          // to simply restrict which upload collections may be inserted.
          UploadFeature({ enabledCollections: ["media"] }),
          HorizontalRuleFeature(),
          AlignFeature(),
          IndentFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
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
