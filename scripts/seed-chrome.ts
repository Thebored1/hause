// Seeds the Nav & Footer global with the site's current chrome, so the admin
// shows the real links rather than blank fields.
//
//   npx payload run scripts/seed-chrome.ts
//
// Content comes from the components' own exported defaults, so the seed and
// the fallbacks cannot disagree. Safe to re-run — it overwrites.

import { getPayload } from "payload";
import config from "../src/payload.config";
import { HEADER_DEFAULTS, FOOTER_DEFAULTS } from "../src/lib/chrome";

const payload = await getPayload({ config });

await payload.updateGlobal({
  slug: "site-settings",
  data: {
    header: {
      logo: HEADER_DEFAULTS.logo,
      navLinks: HEADER_DEFAULTS.navLinks,
      servicesLabel: HEADER_DEFAULTS.servicesLabel,
      servicesHref: HEADER_DEFAULTS.servicesHref,
      serviceItems: HEADER_DEFAULTS.serviceItems,
      cta: HEADER_DEFAULTS.cta,
    },
    footer: {
      logo: FOOTER_DEFAULTS.logo,
      columns: FOOTER_DEFAULTS.columns,
      contact: FOOTER_DEFAULTS.contact,
      bottom: {
        companyName: FOOTER_DEFAULTS.bottom.companyName,
        // Payload arrays cannot hold bare strings.
        notes: FOOTER_DEFAULTS.bottom.notes.map((value) => ({ value })),
      },
    },
  } as never,
});

const after = await payload.findGlobal({ slug: "site-settings", depth: 0 });
const doc = after as unknown as Record<string, Record<string, unknown>>;
const header = doc.header ?? {};
const footer = doc.footer ?? {};
console.log(
  "seeded — nav links:", (header.navLinks as unknown[])?.length,
  "| services:", (header.serviceItems as unknown[])?.length,
  "| footer columns:", (footer.columns as unknown[])?.length,
);
process.exit(0);
