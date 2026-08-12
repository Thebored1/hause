import { describe, it, expect } from "vitest";
import {
  buildGraph,
  breadcrumbNode,
  faqNode,
  localBusinessNode,
  organisationNode,
  titleFromSlug,
} from "@/lib/structured-data";
import { SEO_DEFAULTS, type SeoSettings } from "@/lib/seo-settings";
import { SITE_URL } from "@/lib/site-url";

/**
 * Structured data fails in one of two ways, neither of which throws:
 * it says something untrue about the business, or it disagrees with the
 * visible page. Both are treated by Google as a quality problem, so the
 * rules worth pinning are about what gets *left out*.
 */

const globals = (over: Partial<SeoSettings> = {}): SeoSettings => ({
  site: { ...SEO_DEFAULTS.site, name: "Studio", description: "A studio.", ...over.site },
  business: { ...SEO_DEFAULTS.business, ...over.business },
});

const node = (graph: ReturnType<typeof buildGraph>, type: string) =>
  (graph["@graph"] as Record<string, unknown>[]).find((n) => {
    const t = n["@type"];
    return Array.isArray(t) ? t.includes(type) : t === type;
  });

describe("graph", () => {
  it("always carries the site and organisation", () => {
    const graph = buildGraph({ settings: globals(), slug: "home", pageTitle: "Home", knownSlugs: [] });
    expect(node(graph, "WebSite")).toBeDefined();
    expect(node(graph, "Organization")).toBeDefined();
  });

  it("links the website to the organisation by id rather than repeating it", () => {
    const graph = buildGraph({ settings: globals(), slug: "home", pageTitle: "Home", knownSlugs: [] });
    const site = node(graph, "WebSite")!;
    const org = node(graph, "Organization")!;
    expect((site.publisher as { "@id": string })["@id"]).toBe(org["@id"]);
  });

  it("uses the schema.org context", () => {
    const graph = buildGraph({ settings: globals(), slug: "home", pageTitle: "Home", knownSlugs: [] });
    expect(graph["@context"]).toBe("https://schema.org");
  });
});

describe("organisation", () => {
  it("omits empty fields rather than emitting blanks", () => {
    const org = organisationNode({ ...SEO_DEFAULTS.site, name: "Studio", description: "" });
    expect(org).not.toHaveProperty("description");
    expect(org).not.toHaveProperty("logo");
    expect(org).not.toHaveProperty("sameAs");
  });

  it("carries social profiles when set", () => {
    const org = organisationNode({
      ...SEO_DEFAULTS.site,
      name: "Studio",
      sameAs: ["https://instagram.com/studio"],
    });
    expect(org.sameAs).toEqual(["https://instagram.com/studio"]);
  });

  it("makes a relative logo absolute", () => {
    const org = organisationNode({ ...SEO_DEFAULTS.site, name: "S" }, "/media/logo.png");
    expect(org.logo).toBe(`${SITE_URL}/media/logo.png`);
  });
});

describe("local business", () => {
  const filled = {
    enabled: true,
    type: "InteriorDesignService",
    streetAddress: "2nd A 255 Nehru Nagar",
    locality: "Ghaziabad",
    region: "U.P.",
    postalCode: "201001",
    country: "IN",
    telephone: "+91 80065 59900",
    email: "hi@example.com",
    priceRange: "₹₹",
    latitude: "28.6692",
    longitude: "77.4538",
    openingHours: "Mo-Sa 10:00-19:00",
    areaServed: ["Delhi", "Noida"],
  };

  it("is omitted entirely when not enabled", () => {
    // Publishing an empty business node is worse than publishing none.
    expect(localBusinessNode({ ...filled, enabled: false }, globals().site)).toBeNull();
  });

  it("carries the address, geo and hours", () => {
    const business = localBusinessNode(filled, globals().site)!;
    expect(business["@type"]).toBe("InteriorDesignService");
    expect(business.address).toMatchObject({ addressLocality: "Ghaziabad", postalCode: "201001" });
    expect(business.geo).toMatchObject({ latitude: "28.6692", longitude: "77.4538" });
    expect(business.openingHours).toBe("Mo-Sa 10:00-19:00");
    expect(business.areaServed).toEqual([
      { "@type": "City", name: "Delhi" },
      { "@type": "City", name: "Noida" },
    ]);
  });

  it("drops geo unless both coordinates are present", () => {
    // One coordinate alone points at the wrong place on the map.
    const half = localBusinessNode({ ...filled, longitude: "" }, globals().site)!;
    expect(half).not.toHaveProperty("geo");
  });

  it("omits the address entirely when no part of it is filled", () => {
    const bare = localBusinessNode(
      { ...filled, streetAddress: "", locality: "", region: "", postalCode: "", country: "" },
      globals().site,
    )!;
    expect(bare).not.toHaveProperty("address");
  });
});

describe("breadcrumbs", () => {
  it("are omitted on the home page", () => {
    expect(breadcrumbNode("home", "Home", [])).toBeNull();
  });

  it("are omitted for a single-level page, where the trail says nothing", () => {
    expect(breadcrumbNode("about", "About", [])).not.toBeNull();
  });

  it("build a trail for a nested page", () => {
    const crumb = breadcrumbNode("services/design", "Design", ["services"])!;
    const items = crumb.itemListElement as Record<string, unknown>[];
    expect(items.map((i) => i.name)).toEqual(["Home", "Services", "Design"]);
    expect(items.map((i) => i.position)).toEqual([1, 2, 3]);
  });

  it("skips an ancestor that has no page of its own", () => {
    // Linking a breadcrumb to a 404 is worse than a shorter trail.
    const crumb = breadcrumbNode("services/design", "Design", [])!;
    const items = crumb.itemListElement as Record<string, unknown>[];
    expect(items.map((i) => i.name)).toEqual(["Home", "Design"]);
    // Positions stay contiguous after the skip.
    expect(items.map((i) => i.position)).toEqual([1, 2]);
  });

  it("uses absolute URLs", () => {
    const crumb = breadcrumbNode("about", "About", [])!;
    const items = crumb.itemListElement as Record<string, unknown>[];
    for (const item of items) expect(String(item.item).startsWith("http")).toBe(true);
  });

  it("titles an unlinked ancestor from its slug", () => {
    expect(titleFromSlug("modular-kitchen-design")).toBe("Modular Kitchen Design");
  });
});

describe("FAQ", () => {
  it("is omitted when there are no questions", () => {
    expect(faqNode([], "faqs")).toBeNull();
  });

  it("drops entries missing a question or an answer", () => {
    // A Question with an empty answer is invalid and taints the whole page.
    const faq = faqNode(
      [
        { question: "Real question?", answer: "Real answer." },
        { question: "Unanswered?", answer: "   " },
        { question: "", answer: "Orphan answer." },
      ],
      "faqs",
    )!;
    expect((faq.mainEntity as unknown[]).length).toBe(1);
  });

  it("shapes questions the way Google expects", () => {
    const faq = faqNode([{ question: "How long?", answer: "About six weeks." }], "faqs")!;
    expect(faq.mainEntity).toEqual([
      {
        "@type": "Question",
        name: "How long?",
        acceptedAnswer: { "@type": "Answer", text: "About six weeks." },
      },
    ]);
  });

  it("appears in the graph when questions are passed", () => {
    const graph = buildGraph({
      settings: globals(),
      slug: "faqs",
      pageTitle: "FAQs",
      knownSlugs: [],
      faqs: [{ question: "Q?", answer: "A." }],
    });
    expect(node(graph, "FAQPage")).toBeDefined();
  });
});

describe("faqsFromBlocks", () => {
  it("lifts entries out of an FAQ block", async () => {
    const { faqsFromBlocks } = await import("@/lib/structured-data");
    expect(
      faqsFromBlocks([
        { blockType: "hero" },
        { blockType: "faqSection", items: [{ question: "How long?", answer: "Six weeks." }] },
      ]),
    ).toEqual([{ question: "How long?", answer: "Six weeks." }]);
  });

  it("ignores every other block type", async () => {
    const { faqsFromBlocks } = await import("@/lib/structured-data");
    expect(faqsFromBlocks([{ blockType: "hero", items: [{ question: "x", answer: "y" }] }])).toEqual([]);
  });

  it("collects across several FAQ blocks on one page", async () => {
    const { faqsFromBlocks } = await import("@/lib/structured-data");
    expect(
      faqsFromBlocks([
        { blockType: "faqSection", items: [{ question: "A?", answer: "1." }] },
        { blockType: "faqSection", items: [{ question: "B?", answer: "2." }] },
      ]),
    ).toHaveLength(2);
  });

  it("survives a layout that is not an array", async () => {
    // Never take a page down from inside a metadata helper.
    const { faqsFromBlocks } = await import("@/lib/structured-data");
    expect(faqsFromBlocks(null)).toEqual([]);
    expect(faqsFromBlocks(undefined)).toEqual([]);
    expect(faqsFromBlocks("nonsense")).toEqual([]);
  });
});
