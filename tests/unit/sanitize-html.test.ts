import { describe, it, expect } from "vitest";
import { sanitizeHtml } from "@/lib/doc";

/**
 * These are the cases that matter most in the project.
 *
 * Rich-text HTML reaches `dangerouslySetInnerHTML`, and it can be written over
 * the REST API by an editor or by an agent acting on something it read, so it
 * is untrusted input. A regression here is stored XSS, not a cosmetic bug.
 *
 * Written as "this payload must not survive" rather than "the output equals
 * this exact string": the scrub is allowed to change how it renders safe
 * markup, but it is never allowed to let script through.
 */
describe("sanitizeHtml", () => {
  const executes = (html: string) =>
    /<\s*script/i.test(html) ||
    /\son[a-z]+\s*=/i.test(html) ||
    /javascript:/i.test(html);

  describe("strips anything that can execute", () => {
    const attacks = [
      ["script tag", `<p>hi</p><script>alert(1)</script>`],
      ["script with attributes", `<script type="text/javascript">alert(1)</script>`],
      ["uppercase tag", `<SCRIPT>alert(1)</SCRIPT>`],
      ["whitespace in tag", `<  script >alert(1)</  script >`],
      ["self-closing script", `<script src="//evil.example/x.js" />`],
      ["inline handler", `<p onclick="alert(1)">click</p>`],
      ["handler, single quotes", `<p onmouseover='alert(1)'>hover</p>`],
      ["handler, unquoted", `<p onload=alert(1)>x</p>`],
      ["javascript: href", `<a href="javascript:alert(1)">x</a>`],
      ["javascript: with spacing", `<a href = 'javascript:alert(1)'>x</a>`],
      ["img onerror", `<img src="x" onerror="alert(1)">`],
      ["iframe", `<iframe src="//evil.example"></iframe>`],
      ["object", `<object data="//evil.example"></object>`],
      ["embed", `<embed src="//evil.example">`],
      ["form", `<form action="//evil.example"><input name="a"></form>`],
      ["style tag", `<style>body{display:none}</style>`],
      ["svg with handler", `<svg onload="alert(1)"></svg>`],
      ["body onload", `<body onload="alert(1)">x</body>`],
    ] as const;

    for (const [name, payload] of attacks) {
      it(name, () => {
        const out = sanitizeHtml(payload);
        expect(executes(out), `survived: ${out}`).toBe(false);
      });
    }
  });

  describe("keeps legitimate formatting", () => {
    it("keeps allowed tags", () => {
      const out = sanitizeHtml("<p>A <strong>bold</strong> and <em>italic</em> line.</p>");
      expect(out).toContain("<strong>");
      expect(out).toContain("<em>");
      expect(out).toContain("bold");
    });

    it("keeps ordinary links", () => {
      const out = sanitizeHtml(`<a href="/contact">Contact</a>`);
      expect(out).toContain("Contact");
      expect(out).toContain("/contact");
    });

    it("keeps the text of a disallowed tag rather than dropping the content", () => {
      // The wrapper goes; the words the editor typed stay.
      expect(sanitizeHtml("<marquee>Still here</marquee>")).toContain("Still here");
    });

    it("leaves plain text untouched", () => {
      expect(sanitizeHtml("No markup at all")).toBe("No markup at all");
    });

    it("preserves non-ASCII copy", () => {
      // The site quotes prices in rupees; mangling this would be visible.
      expect(sanitizeHtml("<p>₹15L – ₹30L</p>")).toContain("₹15L – ₹30L");
    });
  });

  describe("degenerate input", () => {
    it("handles an empty string", () => {
      expect(sanitizeHtml("")).toBe("");
    });

    it("does not throw on null or undefined", () => {
      // Called from hooks where the field may be absent.
      expect(sanitizeHtml(null as unknown as string)).toBe("");
      expect(sanitizeHtml(undefined as unknown as string)).toBe("");
    });

    it("is idempotent", () => {
      const once = sanitizeHtml(`<p onclick="alert(1)">hi</p><script>x</script>`);
      expect(sanitizeHtml(once)).toBe(once);
    });
  });
});
