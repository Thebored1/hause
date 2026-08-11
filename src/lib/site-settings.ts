import { getPayload } from "payload";
import config from "@payload-config";
import { toChrome, HEADER_DEFAULTS, FOOTER_DEFAULTS } from "./chrome";

/**
 * Reads the Nav & Footer global.
 *
 * Chrome must never be the reason a page fails, so a missing document or a
 * database hiccup falls back to the shipped defaults rather than throwing.
 */
export async function getChrome() {
  try {
    const payload = await getPayload({ config });
    const doc = await payload.findGlobal({ slug: "site-settings", depth: 0 });
    return toChrome(doc as unknown as Record<string, unknown>);
  } catch {
    return { header: HEADER_DEFAULTS, footer: FOOTER_DEFAULTS };
  }
}
