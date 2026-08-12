import type { Field } from "payload";

// ============================================================
// The SEO fields the plugin does not ship.
//
// @payloadcms/plugin-seo gives meta title, description, image
// and keywords, plus the search-result preview. These three are
// the ones an editor still needs and cannot fake with the
// others: keeping a page out of search, telling Google which
// URL is the real one, and how the page should present itself
// when shared.
//
// They are appended to the plugin's defaults through its
// `fields` override, so they land inside the same `meta` group
// and the same SEO tab.
// ============================================================

export const extraSeoFields: Field[] = [
  {
    name: "noindex",
    type: "checkbox",
    label: "Hide from search engines",
    defaultValue: false,
    admin: {
      description:
        "Adds a noindex tag and drops the page from sitemap.xml. The page stays public — this only asks search engines to skip it.",
    },
  },
  {
    name: "canonical",
    type: "text",
    label: "Canonical URL",
    admin: {
      description:
        "Leave blank unless this page duplicates another. Set it to the URL that should rank, and search engines will credit that one instead of treating the two as competing copies.",
      placeholder: "https://example.com/the-original-page",
    },
    validate: (value: unknown) => {
      if (!value) return true;
      // A relative or malformed canonical is silently ignored by crawlers,
      // so catching it here is the difference between a working tag and one
      // that looks set but does nothing.
      try {
        const url = new URL(String(value));
        if (url.protocol !== "http:" && url.protocol !== "https:") {
          return "Must be an http or https URL.";
        }
        return true;
      } catch {
        return "Must be a full URL including https://";
      }
    },
  },
  {
    name: "schemaType",
    type: "select",
    label: "What this page is",
    defaultValue: "page",
    options: [
      { label: "An ordinary page", value: "page" },
      { label: "A service you offer", value: "service" },
      { label: "An article or post", value: "article" },
    ],
    admin: {
      description:
        "Adds structured data describing the page to search engines. Only claim Service or Article when the page really is one — describing a contact form as an article is the kind of mismatch that costs trust rather than earning a richer result.",
    },
  },
  {
    name: "ogType",
    type: "select",
    label: "Share card type",
    defaultValue: "website",
    options: [
      { label: "Website", value: "website" },
      { label: "Article", value: "article" },
    ],
    admin: {
      description: "How this page describes itself when shared. Use Article for posts.",
    },
  },
];
