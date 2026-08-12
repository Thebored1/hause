import { describe, it, expect } from "vitest";
import type { Metadata } from "next";
import { buildMetadata, buildTitle, type MetadataPage, type SiteDefaults } from "@/lib/metadata";
import { normalizeOrigin, pagePath, pageUrl, absoluteUrl, SITE_URL } from "@/lib/site-url";

/**
 * Every assertion here is a fallback chain, which is the failure mode that
 * matters: nothing throws when a canonical is wrong or an og:image is
 * relative. The page renders, the tests pass, and you find out when someone
 * pastes a link into WhatsApp and gets a bare blue line.
 */

const site: SiteDefaults = {
  name: "Studio",
  description: "Site-wide description.",
};

/**
 * Next types `twitter` as a union where only some members carry `card`, so
 * reading it needs a narrow. Done once here rather than at each assertion.
 */
const twitterCard = (meta: Metadata): string | undefined =>
  (meta.twitter as { card?: string } | undefined)?.card;

const page = (over: Partial<MetadataPage["meta"]> = {}, rest: Partial<MetadataPage> = {}): MetadataPage => ({
  title: "About",
  slug: "about",
  meta: {
    title: "",
    description: "",
    image: "",
    canonical: "",
    ogType: "website",
    schemaType: "page",
    noindex: false,
    ...over,
  },
  ...rest,
});

describe("buildTitle", () => {
  it("appends the site name", () => {
    expect(buildTitle(page(), site)).toBe("About — Studio");
  });

  it("prefers an explicit meta title, untouched", () => {
    // Set precisely when the page title is wrong for a search result, so it
    // must not have the site name bolted on afterwards.
    expect(buildTitle(page({ title: "Interior design in Delhi NCR" }), site)).toBe(
      "Interior design in Delhi NCR",
    );
  });

  it("does not repeat the site name", () => {
    expect(buildTitle(page({}, { title: "Studio" }), site)).toBe("Studio");
  });

  it("ignores case when comparing to the site name", () => {
    expect(buildTitle(page({}, { title: "STUDIO" }), site)).toBe("STUDIO");
  });

  it("copes with no site name", () => {
    expect(buildTitle(page(), { ...site, name: "" })).toBe("About");
  });

  it("treats a whitespace-only meta title as unset", () => {
    expect(buildTitle(page({ title: "   " }), site)).toBe("About — Studio");
  });
});

describe("buildMetadata", () => {
  it("falls back to the site description", () => {
    expect(buildMetadata(page(), site).description).toBe("Site-wide description.");
  });

  it("prefers the page description", () => {
    expect(buildMetadata(page({ description: "About this studio." }), site).description).toBe(
      "About this studio.",
    );
  });

  describe("canonical", () => {
    it("defaults to the page's own URL", () => {
      expect(buildMetadata(page(), site).alternates?.canonical).toBe(`${SITE_URL}/about`);
    });

    it("uses the page's own canonical when set", () => {
      const meta = buildMetadata(page({ canonical: "https://example.com/original" }), site);
      expect(meta.alternates?.canonical).toBe("https://example.com/original");
    });

    it("is the bare origin for the home page", () => {
      expect(buildMetadata(page({}, { slug: "home" }), site).alternates?.canonical).toBe(
        `${SITE_URL}/`,
      );
    });

    it("is always absolute", () => {
      // A relative canonical is ignored by crawlers.
      const value = String(buildMetadata(page(), site).alternates?.canonical);
      expect(value.startsWith("http")).toBe(true);
    });
  });

  describe("robots", () => {
    it("is indexable by default", () => {
      expect(buildMetadata(page(), site).robots).toEqual({ index: true, follow: true });
    });

    it("honours noindex but keeps following links", () => {
      // Out of the index, still passing value onward from its links.
      expect(buildMetadata(page({ noindex: true }), site).robots).toEqual({
        index: false,
        follow: true,
      });
    });
  });

  describe("share card", () => {
    it("makes a relative image absolute", () => {
      const meta = buildMetadata(page({ image: "/media/hero.jpg" }), site);
      expect(meta.openGraph?.images).toEqual([{ url: `${SITE_URL}/media/hero.jpg` }]);
    });

    it("leaves an already absolute image alone", () => {
      // A storage adapter may serve uploads from its own host.
      const meta = buildMetadata(page({ image: "https://cdn.example.com/a.jpg" }), site);
      expect(meta.openGraph?.images).toEqual([{ url: "https://cdn.example.com/a.jpg" }]);
    });

    it("falls back to the site default image", () => {
      const meta = buildMetadata(page(), { ...site, defaultImage: "/media/default.jpg" });
      expect(meta.openGraph?.images).toEqual([{ url: `${SITE_URL}/media/default.jpg` }]);
    });

    it("prefers the page image over the default", () => {
      const meta = buildMetadata(page({ image: "/media/page.jpg" }), {
        ...site,
        defaultImage: "/media/default.jpg",
      });
      expect(meta.openGraph?.images).toEqual([{ url: `${SITE_URL}/media/page.jpg` }]);
    });

    it("uses the large twitter card when there is an image", () => {
      expect(twitterCard(buildMetadata(page({ image: "/a.jpg" }), site))).toBe(
        "summary_large_image",
      );
    });

    it("drops to the small card with no image", () => {
      // summary_large_image with nothing to show renders worse than summary.
      expect(twitterCard(buildMetadata(page(), site))).toBe("summary");
      expect(buildMetadata(page(), site).openGraph?.images).toBeUndefined();
    });

    it("carries the og type", () => {
      expect(buildMetadata(page({ ogType: "article" }), site).openGraph).toMatchObject({
        type: "article",
      });
      expect(buildMetadata(page(), site).openGraph).toMatchObject({ type: "website" });
    });

    it("points og:url at the canonical, not the raw page URL", () => {
      const meta = buildMetadata(page({ canonical: "https://example.com/original" }), site);
      expect(meta.openGraph).toMatchObject({ url: "https://example.com/original" });
    });
  });
});

describe("site-url", () => {
  it("strips a trailing slash", () => {
    expect(normalizeOrigin("https://example.com/")).toBe("https://example.com");
  });

  it("adds a scheme to a bare host", () => {
    // "example.com/about" is not a URL, and would break every canonical.
    expect(normalizeOrigin("example.com")).toBe("https://example.com");
  });

  it("maps home to the root path", () => {
    expect(pagePath("home")).toBe("/");
    expect(pagePath("")).toBe("/");
  });

  it("keeps nested slugs", () => {
    expect(pagePath("services/design")).toBe("/services/design");
    expect(pageUrl("services/design")).toBe(`${SITE_URL}/services/design`);
  });

  it("tolerates slashes around a slug", () => {
    expect(pagePath("/about/")).toBe("/about");
  });

  it("returns undefined rather than a bare origin for a missing image", () => {
    // Emitting the origin alone as og:image would show the wrong thing
    // instead of nothing.
    expect(absoluteUrl("")).toBeUndefined();
    expect(absoluteUrl(null)).toBeUndefined();
    expect(absoluteUrl(undefined)).toBeUndefined();
  });

  it("joins a path missing its leading slash", () => {
    expect(absoluteUrl("media/a.jpg")).toBe(`${SITE_URL}/media/a.jpg`);
  });
});
