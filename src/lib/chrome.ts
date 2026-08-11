/**
 * Nav and footer content: the shapes, the shipped defaults, and the reader.
 *
 * The defaults are the copy the site already had. Navbar and Footer fall back
 * to them field by field, so an empty or half-filled Nav & Footer document
 * renders exactly what was there before — the same contract the page sections
 * use.
 *
 * Types live here rather than in the components because both the server (which
 * reads the global) and the client components need them, and importing a
 * "use client" module from a server component to get a type is a trap.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  href: string;
  desc: string;
  /** Key into SERVICE_ICONS in Navbar. */
  icon: string;
}

export interface HeaderContent {
  logo: string;
  navLinks: NavLink[];
  servicesLabel: string;
  servicesHref: string;
  serviceItems: ServiceItem[];
  cta: { label: string; href: string };
}

export interface FooterLink extends NavLink {
  arrow?: boolean;
  external?: boolean;
  emphasis?: boolean;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface FooterContent {
  logo: string;
  columns: FooterColumn[];
  contact: { address: string; phone: string; email: string };
  bottom: { companyName: string; notes: string[] };
}

export const HEADER_DEFAULTS: HeaderContent = {
  logo: "/images/logo.png",
  servicesLabel: "SERVICES",
  servicesHref: "/services",
  serviceItems: [
    {
      title: "Residential Interior Design",
      href: "/services/residential-interior-design",
      desc: "Apartments, luxury penthouses & villas",
      icon: "home",
    },
    {
      title: "Commercial & Office Interiors",
      href: "/services/commercial-office-interior-design",
      desc: "Agile tech offices, studios & retail spaces",
      icon: "building",
    },
    {
      title: "Modular Kitchens & Wardrobes",
      href: "/services/modular-kitchen-wardrobe-design",
      desc: "Precision German/Austrian hardware & acrylic finishes",
      icon: "kitchen",
    },
    {
      title: "Turnkey Interior Solutions",
      href: "/services/turnkey-interior-solutions",
      desc: "Complete concept-to-handover under one team",
      icon: "layers",
    },
    {
      title: "Renovation & Remodeling",
      href: "/services/renovation-remodeling",
      desc: "Structural wall removal, MEP overhauls & modern updates",
      icon: "hammer",
    },
  ],
  navLinks: [
    { label: "PORTFOLIO", href: "/projects" },
    { label: "PROCESS", href: "/process" },
    { label: "WHY US", href: "/why-hause-interiors" },
    { label: "LOCATIONS", href: "/locations" },
    { label: "ABOUT", href: "/about" },
    { label: "FAQS", href: "/faqs" },
    { label: "CONTACT", href: "/contact" },
  ],
  cta: { label: "CONSULTATION", href: "/contact" },
};

export const FOOTER_DEFAULTS: FooterContent = {
  logo: "/images/footer-logo.png",
  columns: [
    {
      heading: "Services",
      links: [
        { label: "Residential Design", href: "/services/residential-interior-design" },
        { label: "Commercial & Office", href: "/services/commercial-office-interior-design" },
        { label: "Modular Kitchens & Wardrobes", href: "/services/modular-kitchen-wardrobe-design" },
        { label: "Turnkey Interior Solutions", href: "/services/turnkey-interior-solutions" },
        { label: "Renovation & Remodeling", href: "/services/renovation-remodeling" },
        { label: "View All Services", href: "/services", arrow: true, emphasis: true },
      ],
    },
    {
      heading: "Explore",
      links: [
        { label: "Portfolio / Projects", href: "/projects" },
        { label: "Our 5-Step Process", href: "/process" },
        { label: "Why Hause Interiors", href: "/why-hause-interiors" },
        { label: "Locations We Serve", href: "/locations" },
        { label: "Client Testimonials", href: "/testimonials" },
        { label: "Frequently Asked Questions", href: "/faqs" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About Our Studio", href: "/about" },
        { label: "Contact & Enquiry", href: "/contact" },
        { label: "Hause Digital Practice", href: "https://hause.co.in", arrow: true, external: true },
      ],
    },
  ],
  contact: {
    address: "2nd A 255 Nehru Nagar, Ghaziabad, 201001, U.P.",
    phone: "+91 98992 04333",
    email: "info@hause.co.in",
  },
  bottom: {
    companyName: "Hause Interiors",
    notes: ["Headquartered in Ghaziabad, Delhi NCR", "Delivering Pan-India"],
  },
};

/** Empty strings and empty arrays mean "unset", so the default survives. */
const val = <T,>(v: unknown, fallback: T): T => {
  if (v === null || v === undefined) return fallback;
  if (typeof v === "string" && v.trim() === "") return fallback;
  if (Array.isArray(v) && v.length === 0) return fallback;
  return v as T;
};

type Doc = Record<string, unknown>;

/** Merges a stored Nav & Footer document over the shipped defaults. */
export function toChrome(doc: Doc | null | undefined): {
  header: HeaderContent;
  footer: FooterContent;
} {
  const header = (doc?.header ?? {}) as Doc;
  const footer = (doc?.footer ?? {}) as Doc;
  const cta = (header.cta ?? {}) as Doc;
  const contact = (footer.contact ?? {}) as Doc;
  const bottom = (footer.bottom ?? {}) as Doc;

  return {
    header: {
      logo: val(header.logo, HEADER_DEFAULTS.logo),
      navLinks: val(header.navLinks, HEADER_DEFAULTS.navLinks),
      servicesLabel: val(header.servicesLabel, HEADER_DEFAULTS.servicesLabel),
      servicesHref: val(header.servicesHref, HEADER_DEFAULTS.servicesHref),
      serviceItems: val(header.serviceItems, HEADER_DEFAULTS.serviceItems),
      cta: {
        label: val(cta.label, HEADER_DEFAULTS.cta.label),
        href: val(cta.href, HEADER_DEFAULTS.cta.href),
      },
    },
    footer: {
      logo: val(footer.logo, FOOTER_DEFAULTS.logo),
      columns: val(footer.columns, FOOTER_DEFAULTS.columns),
      contact: {
        address: val(contact.address, FOOTER_DEFAULTS.contact.address),
        phone: val(contact.phone, FOOTER_DEFAULTS.contact.phone),
        email: val(contact.email, FOOTER_DEFAULTS.contact.email),
      },
      bottom: {
        companyName: val(bottom.companyName, FOOTER_DEFAULTS.bottom.companyName),
        // Payload arrays cannot hold bare strings, so notes arrive wrapped.
        notes: val(
          (bottom.notes as { value: string }[] | undefined)?.map((n) => n.value),
          FOOTER_DEFAULTS.bottom.notes,
        ),
      },
    },
  };
}
