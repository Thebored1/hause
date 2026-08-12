import { getPayload } from "payload";
import config from "@payload-config";

// ============================================================
// The site identity and business details behind metadata and
// structured data.
//
// Read separately from getChrome(): chrome must never be the
// reason a page fails, and the same applies here — a database
// hiccup should cost the share card, not the page. Both fall
// back rather than throw.
// ============================================================

export interface SiteIdentity {
  name: string;
  description: string;
  /** Resolved to a URL, so callers never handle the upload relation. */
  defaultImage: string;
  sameAs: string[];
}

export interface BusinessDetails {
  enabled: boolean;
  type: string;
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
  telephone: string;
  email: string;
  priceRange: string;
  latitude: string;
  longitude: string;
  openingHours: string;
  areaServed: string[];
}

export interface SeoSettings {
  site: SiteIdentity;
  business: BusinessDetails;
}

export const SEO_DEFAULTS: SeoSettings = {
  site: {
    name: "Hause Interiors",
    description:
      "Interior design services that work for the way you live. Residential, commercial, modular kitchens, and turnkey interior solutions based in Delhi NCR and serving pan-India.",
    defaultImage: "",
    sameAs: [],
  },
  business: {
    enabled: false,
    type: "InteriorDesignService",
    streetAddress: "",
    locality: "",
    region: "",
    postalCode: "",
    country: "IN",
    telephone: "",
    email: "",
    priceRange: "",
    latitude: "",
    longitude: "",
    openingHours: "",
    areaServed: [],
  },
};

type Doc = Record<string, unknown>;

const str = (v: unknown, fallback = "") => (typeof v === "string" && v ? v : fallback);
const arr = (v: unknown): Doc[] => (Array.isArray(v) ? (v as Doc[]) : []);

/** Merges a stored document over the shipped defaults. */
export function toSeoSettings(doc: Doc | null | undefined): SeoSettings {
  const site = (doc?.site ?? {}) as Doc;
  const business = (doc?.business ?? {}) as Doc;
  const image = site.defaultImage as Doc | string | null | undefined;

  return {
    site: {
      name: str(site.name, SEO_DEFAULTS.site.name),
      description: str(site.description, SEO_DEFAULTS.site.description),
      // Populated at depth 1; a bare id means the upload was deleted.
      defaultImage: image && typeof image === "object" ? str(image.url) : "",
      // Payload arrays cannot hold bare strings, so these arrive wrapped.
      sameAs: arr(site.sameAs)
        .map((s) => str(s.url))
        .filter(Boolean),
    },
    business: {
      enabled: business.enabled === true,
      type: str(business.type, SEO_DEFAULTS.business.type),
      streetAddress: str(business.streetAddress),
      locality: str(business.locality),
      region: str(business.region),
      postalCode: str(business.postalCode),
      country: str(business.country, SEO_DEFAULTS.business.country),
      telephone: str(business.telephone),
      email: str(business.email),
      priceRange: str(business.priceRange),
      latitude: str(business.latitude),
      longitude: str(business.longitude),
      openingHours: str(business.openingHours),
      areaServed: arr(business.areaServed)
        .map((a) => str(a.name))
        .filter(Boolean),
    },
  };
}

export async function getSeoSettings(): Promise<SeoSettings> {
  try {
    const payload = await getPayload({ config });
    // Depth 1 so the default share image arrives as a document with a URL.
    const doc = await payload.findGlobal({ slug: "site-settings", depth: 1 });
    return toSeoSettings(doc as unknown as Doc);
  } catch {
    return SEO_DEFAULTS;
  }
}
