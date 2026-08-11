// Seeds the home page with the site's current content.
//
//   npx payload run scripts/seed-home.ts
//
// Content comes from the components' own exported defaults, so the seed and
// the fallbacks cannot disagree. Replaces the old seed-home.mjs, which held a
// second copy of the same copy and needed an admin password to run.
//
// Safe to re-run: matches on slug and updates in place.

import { getPayload } from "payload";
import config from "../src/payload.config";
import type { Page } from "../src/payload-types";
import {
  HERO_SPACE_SWITCHER_DEFAULTS,
  DEFAULT_SPACES,
  DEFAULT_HERO_STATS,
} from "../src/components/HeroSpaceSwitcher";
import { SERVICES_GRID_DEFAULTS, DEFAULT_SERVICES } from "../src/components/ServicesGrid";
import {
  PORTFOLIO_SHOWCASE_DEFAULTS,
  DEFAULT_PORTFOLIO_CARDS,
  DEFAULT_PORTFOLIO_STRIP,
} from "../src/components/PortfolioShowcase";
import { DEFAULT_STEPS } from "../src/components/ProcessTimeline";
import { DEFAULT_REASONS } from "../src/components/WhyUs";
import { DEFAULT_CITIES } from "../src/components/LocationsGrid";

const page: Pick<Page, "title" | "slug" | "meta" | "layout" | "contactModal" | "_status"> = {
  title: "Home",
  slug: "home",
  // The hero and nav buttons open the contact modal here; the inner pages link.
  contactModal: true,
  _status: "published",
  meta: {
    title: "Hause Interiors — We design spaces that feel like home",
    description:
      "Interior design services that work for the way you live. Residential, commercial, modular kitchens, and turnkey interior solutions based in Delhi NCR and serving pan-India.",
  },
  layout: [
    {
      blockType: "hero",
      ...HERO_SPACE_SWITCHER_DEFAULTS,
      spaces: DEFAULT_SPACES,
      stats: DEFAULT_HERO_STATS,
    },
    {
      blockType: "servicesGrid",
      ...SERVICES_GRID_DEFAULTS,
      services: DEFAULT_SERVICES,
    },
    {
      blockType: "portfolio",
      ...PORTFOLIO_SHOWCASE_DEFAULTS,
      cards: DEFAULT_PORTFOLIO_CARDS,
      strip: DEFAULT_PORTFOLIO_STRIP,
    },
    { blockType: "process", steps: DEFAULT_STEPS },
    { blockType: "whyUs", reasons: DEFAULT_REASONS },
    { blockType: "locations", cities: DEFAULT_CITIES },
    { blockType: "cta", bgImage: "/images/jaiswal/jaiswal-07.jpg" },
  ] as Page["layout"],
};

const payload = await getPayload({ config });

const { docs } = await payload.find({
  collection: "pages",
  where: { slug: { equals: page.slug } },
  limit: 1,
  depth: 0,
});

const res = docs[0]
  ? await payload.update({ collection: "pages", id: docs[0].id, data: page })
  : await payload.create({ collection: "pages", data: page });

console.log(`${docs[0] ? "updated" : "created"} home — ${res.layout?.length} blocks`);
process.exit(0);
