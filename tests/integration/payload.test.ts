import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { Payload } from "payload";

/**
 * Behaviour that only exists once Payload is running: collection hooks, access
 * rules, and the field mapping between the site and the database.
 *
 * Runs against a scratch SQLite file, created and deleted per run, so it never
 * touches the developer's database and never needs Supabase credentials. The
 * env vars are set before the config is imported because the adapter is chosen
 * from DATABASE_URI at module load.
 */
let payload: Payload;
let dir: string;

beforeAll(async () => {
  dir = mkdtempSync(join(tmpdir(), "hause-test-"));
  process.env.DATABASE_URI = `file:${join(dir, "test.db").replace(/\\/g, "/")}`;
  process.env.PAYLOAD_SECRET = "test-secret-not-used-anywhere-real";
  // NODE_ENV is set by the test runner and is read-only in the type defs.

  const [{ getPayload }, config] = await Promise.all([
    import("payload"),
    import("@/payload.config").then((m) => m.default),
  ]);
  payload = await getPayload({ config });
}, 120_000);

afterAll(async () => {
  await payload?.destroy?.();
  try {
    rmSync(dir, { recursive: true, force: true });
  } catch {
    // Windows keeps the SQLite handle open briefly after destroy(), and
    // `force` does not cover EPERM. The directory is under the OS temp path
    // and gets collected there; failing the run over it would report a
    // passing suite as broken.
  }
});

describe("enquiries", () => {
  it("stores every field the contact form sends", async () => {
    // The form posts these names; a mismatch means the answer is dropped
    // silently, which is how the budget field went missing before.
    const doc = await payload.create({
      collection: "enquiries",
      data: {
        name: "Test Person",
        email: "test@example.com",
        phone: "+91 90000 00000",
        location: "Noida",
        projectType: "Residential",
        budget: "₹15L - ₹30L",
        message: "Hello",
        source: "Contact page",
      } as never,
    });

    expect(doc.name).toBe("Test Person");
    expect(doc.budget).toBe("₹15L - ₹30L");
    expect(doc.projectType).toBe("Residential");
    expect(doc.source).toBe("Contact page");
    expect(doc.status).toBe("new");
  });

  it("does not rate-limit server-side code", async () => {
    // The limiter exempts the local API. Seeds and imports would otherwise
    // start failing partway through.
    for (let i = 0; i < 12; i++) {
      await payload.create({
        collection: "enquiries",
        data: { name: `Bulk ${i}`, email: `bulk${i}@example.com` } as never,
      });
    }
    const { totalDocs } = await payload.count({ collection: "enquiries" });
    expect(totalDocs).toBeGreaterThanOrEqual(12);
  });
});

describe("pages", () => {
  it("keeps a draft out of anonymous results", async () => {
    await payload.create({
      collection: "pages",
      data: { title: "Secret", slug: "secret-draft", _status: "draft" } as never,
    });

    // overrideAccess: false is what an unauthenticated request gets.
    const { docs } = await payload.find({
      collection: "pages",
      where: { slug: { equals: "secret-draft" } },
      overrideAccess: false,
      user: null,
      depth: 0,
    });
    expect(docs).toHaveLength(0);
  });

  it("returns a published page to an anonymous reader", async () => {
    await payload.create({
      collection: "pages",
      data: { title: "Public", slug: "public-page", _status: "published" } as never,
    });

    const { docs } = await payload.find({
      collection: "pages",
      where: { slug: { equals: "public-page" } },
      overrideAccess: false,
      user: null,
      depth: 0,
    });
    expect(docs).toHaveLength(1);
    expect(docs[0]!.title).toBe("Public");
  });

  it("sanitises rich text inside a canvas block on write", async () => {
    // The canvas is JSON, so the scrub has to walk the tree rather than
    // check one field. This is the stored-XSS path.
    const page = await payload.create({
      collection: "pages",
      data: {
        title: "Canvas",
        slug: "canvas-xss",
        _status: "published",
        layout: [
          {
            blockType: "canvas",
            content: {
              ROOT: {
                type: { resolvedName: "TextBlock" },
                props: { html: `<p onclick="alert(1)">hi</p><script>alert(2)</script>` },
                nodes: [],
              },
            },
          },
        ],
      } as never,
    });

    const stored = JSON.stringify(page.layout);
    expect(stored).not.toMatch(/<\s*script/i);
    expect(stored).not.toMatch(/onclick/i);
    expect(stored).toContain("hi");
  });
});

describe("site settings", () => {
  it("round-trips the nav and footer global", async () => {
    await payload.updateGlobal({
      slug: "site-settings",
      data: { header: { logo: "/x.png", navLinks: [{ label: "WORK", href: "/work" }] } } as never,
    });

    const doc = await payload.findGlobal({ slug: "site-settings" });
    const header = doc.header as unknown as { logo: string; navLinks: { label: string }[] };
    expect(header.logo).toBe("/x.png");
    expect(header.navLinks[0]!.label).toBe("WORK");
  });
});
