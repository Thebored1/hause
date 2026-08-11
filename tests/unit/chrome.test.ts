import { describe, it, expect } from "vitest";
import { toChrome, HEADER_DEFAULTS, FOOTER_DEFAULTS } from "@/lib/chrome";

/**
 * The nav and footer render from a CMS global merged over shipped defaults.
 *
 * The failure that matters is silent: an empty or half-filled document must
 * fall back to the defaults rather than render a site with no navigation. An
 * editor clearing a field by accident should not be able to remove the menu.
 */
describe("toChrome", () => {
  it("returns the defaults when there is no document", () => {
    expect(toChrome(null).header).toEqual(HEADER_DEFAULTS);
    expect(toChrome(undefined).footer).toEqual(FOOTER_DEFAULTS);
  });

  it("returns the defaults for an empty document", () => {
    const { header, footer } = toChrome({});
    expect(header).toEqual(HEADER_DEFAULTS);
    expect(footer).toEqual(FOOTER_DEFAULTS);
  });

  it("treats an empty string as absent", () => {
    // A cleared text input arrives as "", not undefined.
    expect(toChrome({ header: { logo: "" } }).header.logo).toBe(HEADER_DEFAULTS.logo);
  });

  it("treats an empty array as absent", () => {
    // Deleting every nav row must not produce a header with no links.
    expect(toChrome({ header: { navLinks: [] } }).header.navLinks).toEqual(
      HEADER_DEFAULTS.navLinks,
    );
  });

  it("uses stored values when they are present", () => {
    const links = [{ label: "WORK", href: "/work" }];
    const { header } = toChrome({ header: { logo: "/custom.png", navLinks: links } });
    expect(header.logo).toBe("/custom.png");
    expect(header.navLinks).toEqual(links);
  });

  it("fills only the missing parts of a partial document", () => {
    const { header } = toChrome({ header: { servicesLabel: "WHAT WE DO" } });
    expect(header.servicesLabel).toBe("WHAT WE DO");
    // Everything else still comes from the defaults.
    expect(header.navLinks).toEqual(HEADER_DEFAULTS.navLinks);
    expect(header.cta).toEqual(HEADER_DEFAULTS.cta);
  });

  it("merges nested groups independently", () => {
    const { header } = toChrome({ header: { cta: { label: "Book a call" } } });
    expect(header.cta.label).toBe("Book a call");
    expect(header.cta.href).toBe(HEADER_DEFAULTS.cta.href);
  });

  it("unwraps footer notes, which Payload stores as objects", () => {
    // Payload arrays cannot hold bare strings, so notes arrive as {value}.
    // If this regressed the footer would render "[object Object]".
    const { footer } = toChrome({
      bottom: undefined,
      footer: { bottom: { notes: [{ value: "GST 09ABCDE" }, { value: "Est. 2015" }] } },
    });
    expect(footer.bottom.notes).toEqual(["GST 09ABCDE", "Est. 2015"]);
  });

  it("falls back when notes are absent", () => {
    expect(toChrome({ footer: { bottom: {} } }).footer.bottom.notes).toEqual(
      FOOTER_DEFAULTS.bottom.notes,
    );
  });

  it("does not mutate the defaults", () => {
    // toChrome returns references to the default objects for untouched fields;
    // a caller mutating the result would otherwise poison every later render.
    const snapshot = JSON.parse(JSON.stringify(HEADER_DEFAULTS));
    toChrome({ header: { navLinks: [{ label: "X", href: "/x" }] } });
    expect(HEADER_DEFAULTS).toEqual(snapshot);
  });
});
