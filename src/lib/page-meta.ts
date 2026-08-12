import type { MetadataPage, PageMeta } from "./metadata";

// ============================================================
// Normalising a stored document's SEO group.
//
// Payload gives these back as `string | null | undefined`, with
// the share image as either an id or a populated document
// depending on depth. Everything downstream wants plain strings,
// so the widening happens once, here, rather than at each use.
// ============================================================

type Doc = {
  title?: unknown;
  slug?: unknown;
  meta?: {
    title?: unknown;
    description?: unknown;
    image?: unknown;
    canonical?: unknown;
    ogType?: unknown;
    schemaType?: unknown;
    noindex?: unknown;
  } | null;
};

export function metaOf(doc: Doc): PageMeta {
  const meta = doc?.meta ?? {};
  const image = meta.image;

  return {
    title: String(meta.title ?? ""),
    description: String(meta.description ?? ""),
    // Populated at depth 1. A bare id means the upload was deleted, in which
    // case there is no image rather than a broken one.
    image:
      image && typeof image === "object"
        ? String((image as { url?: unknown }).url ?? "")
        : "",
    canonical: String(meta.canonical ?? ""),
    ogType: meta.ogType === "article" ? "article" : "website",
    // Anything unrecognised falls back to an ordinary page: a stored value
    // outside the select's options can only arrive by writing straight to the
    // database, and should not make a page claim to be something it is not.
    schemaType:
      meta.schemaType === "service" || meta.schemaType === "article"
        ? meta.schemaType
        : "page",
    noindex: Boolean(meta.noindex),
  };
}

export function toMetadataPage(doc: Doc): MetadataPage {
  return {
    title: String(doc?.title ?? ""),
    slug: String(doc?.slug ?? ""),
    meta: metaOf(doc),
  };
}
