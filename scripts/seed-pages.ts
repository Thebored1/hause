// Seeds the CMS with the inner pages, mirroring the hand-coded ones so the
// admin shows the real copy rather than blank fields.
//
// Uses Payload's local API, so it needs no login:
//   npx payload run scripts/seed-pages.ts
//
// Safe to re-run: matches on slug and updates in place. Fields left out fall
// back to the component's shipped defaults — deliberate for sections whose
// content has not been lifted into the CMS yet.

import { getPayload } from "payload";
import config from "../src/payload.config";
import type { Page } from "../src/payload-types";

const home = { label: "Home", href: "/" };

const pages: Pick<Page, "title" | "slug" | "meta" | "layout">[] = [
  {
    title: "FAQs",
    slug: "faqs",
    meta: {
      title: "Frequently Asked Questions | Hause Interiors Delhi NCR",
      description:
        "Answers to common questions about interior design costs, timelines, process and execution in Delhi NCR and pan-India with Hause Interiors.",
    },
    layout: [
      {
        blockType: "pageHero",
        badge: "Frequently Asked Questions",
        title: "Clear, honest answers about working with us.",
        subtitle:
          "Everything you want to know before reaching out — how we work, what things cost, timelines, site supervision, and post-handover support.",
        breadcrumbs: [home, { label: "FAQs" }],
        bgImage: "/images/jaiswal/jaiswal-15.jpg",
        primaryCtaText: "Book a Free Consultation",
        primaryCtaHref: "/contact",
        secondaryCtaText: "See Our Process",
        secondaryCtaHref: "/process",
      },
      // No items: the standard question set lives in FAQAccordion.
      {
        blockType: "faqSection",
        askTitle: "Have a specific question not answered here?",
        askBody:
          "Our design directors are happy to answer your specific spatial, timeline, or material queries.",
        askLabel: "Ask Us Directly",
        askHref: "/contact",
      },
      { blockType: "cta" },
    ],
  },
  {
    title: "Projects & Portfolio",
    slug: "projects",
    meta: {
      title: "Interior Design Projects & Portfolio | Hause Interiors",
      description:
        "Browse residential and commercial interior design projects by Hause Interiors across Delhi NCR — homes, offices, retail and hospitality spaces.",
    },
    layout: [
      {
        blockType: "pageHero",
        badge: "Design Portfolio",
        title: "Spaces we've designed and delivered.",
        subtitle:
          "Browse residential and commercial interior design projects across Delhi NCR — apartments, luxury villas, tech workspaces, modular kitchens, and structural renovations.",
        breadcrumbs: [home, { label: "Projects & Portfolio" }],
        bgImage: "/images/jaiswal/jaiswal-04.jpg",
        primaryCtaText: "Start Your Own Project",
        primaryCtaHref: "/contact",
        secondaryCtaText: "Explore Services",
        secondaryCtaHref: "/services",
      },
      { blockType: "projectsSection" },
      { blockType: "cta", bgImage: "/images/jaiswal/jaiswal-33.jpg" },
    ],
  },
  {
    title: "Contact Us",
    slug: "contact",
    meta: {
      title: "Contact Hause Interiors | Book an Interior Design Consultation",
      description:
        "Get in touch with Hause Interiors. Book a free consultation for your home, office, or commercial interior project in Delhi NCR or pan-India.",
    },
    layout: [
      {
        blockType: "pageHero",
        badge: "Get in Touch",
        title: "Let's talk about your space.",
        subtitle:
          "Whether you have a project ready to start or just want to explore ideas and ballpark budgets, we're happy to connect. No pressure, no hard sell.",
        breadcrumbs: [home, { label: "Contact Us" }],
        bgImage: "/images/jaiswal/jaiswal-01.jpg",
      },
      {
        blockType: "contactDetails",
        eyebrow: "Studio & Direct Details",
        title: "Reach our design directors directly.",
        body: "We look forward to discussing your upcoming residential or commercial project. Reach out by phone, email, or visit our studio in Ghaziabad.",
        phone: "+91 80065 59900",
        email: "interiors@hause.agency",
        address: "2nd A 255 Nehru Nagar,\nGhaziabad, 201001, Uttar Pradesh",
        hours: "Monday – Saturday: 10:00 AM – 7:00 PM IST",
        nextStepsLabel: "What Happens Next?",
        nextSteps: [
          {
            step: "01",
            title: "24-Hour Review",
            desc: "We review your requirements and reach out within 24 hours to schedule a discovery discussion.",
          },
          {
            step: "02",
            title: "Discovery Call or Site Visit",
            desc: "We conduct an in-depth conversation or physical site measurement to understand your vision and constraints.",
          },
          {
            step: "03",
            title: "Concept & Ballpark Estimate",
            desc: "We share a preliminary spatial concept and transparent ballpark estimate — completely free of charge.",
          },
        ],
      },
      {
        blockType: "promoBanner",
        eyebrow: "In-Person Consultations",
        title: "Visit Our Studio & Experience Materials Hands-On",
        body: "Feel high-gloss acrylics, touch textured fluted panels, inspect soft-close German tandem boxes, and compare quartz stone samples before making design decisions.",
        ctaLabel: "Open in Maps",
        ctaHref: "https://maps.google.com/?q=2nd+A+255+Nehru+Nagar+Ghaziabad",
      },
    ],
  },
  {
    title: "Locations",
    slug: "locations",
    meta: {
      title: "Interior Designers in Delhi NCR | Gurugram, Noida, Ghaziabad, Faridabad",
      description:
        "Hause Interiors delivers residential and commercial interior design across Delhi NCR — Delhi, Gurugram, Noida, Ghaziabad, Faridabad — with select projects pan-India.",
    },
    layout: [
      {
        blockType: "pageHero",
        badge: "Service Locations",
        title: "Interior designers near you — across Delhi NCR.",
        subtitle:
          "Hause Interiors is headquartered in Ghaziabad and works across the National Capital Region with hands-on, on-ground project management. Here's where we're active.",
        breadcrumbs: [home, { label: "Locations" }],
        bgImage: "/images/jaiswal/jaiswal-08.jpg",
        primaryCtaText: "Check Your City / Book Consultation",
        primaryCtaHref: "/contact",
        secondaryCtaText: "Explore Services",
        secondaryCtaHref: "/services",
      },
      // No regions: the standard service-area list lives in RegionsDirectory.
      { blockType: "regionsDirectory", specialtiesLabel: "Key Project Focus:", ctaHref: "/contact" },
      {
        blockType: "promoBanner",
        eyebrow: "Central Studio",
        title: "Visit Our Ghaziabad Studio & Material Library",
        body: "2nd A 255 Nehru Nagar, Ghaziabad, 201001, U.P. Experience material samples, laminate swatches, quartz stones, and hardware mockups in person.",
        ctaLabel: "Schedule Visit",
        ctaHref: "/contact",
        spacing: "loose",
        cardShadow: "md",
        showArrow: false,
      },
      { blockType: "cta" },
    ],
  },
];

const payload = await getPayload({ config });

for (const page of pages) {
  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: page.slug } },
    limit: 1,
    depth: 0,
  });

  if (docs[0]) {
    await payload.update({ collection: "pages", id: docs[0].id, data: page });
    console.log(`updated ${page.slug} — ${page.layout?.length} blocks`);
  } else {
    await payload.create({ collection: "pages", data: page });
    console.log(`created ${page.slug} — ${page.layout?.length} blocks`);
  }
}

process.exit(0);
