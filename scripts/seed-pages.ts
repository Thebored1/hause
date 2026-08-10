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
  {
    title: "About Us",
    slug: "about",
    meta: {
      title: "About Hause Interiors | Interior Design Studio Delhi NCR",
      description:
        "Learn about Hause Interiors \u2014 our story, design philosophy, in-house team, and how we bring architectural rigor and transparent execution to homes and workspaces across Delhi NCR and pan-India.",
    },
    layout: [
      {
        blockType: "pageHero",
        badge: "About Hause Interiors",
        title: "Spaces designed with purpose. Delivered with precision.",
        subtitle:
          "We are an interior design and turnkey execution studio based in Delhi NCR. We bridge the gap between high-end architectural design and disciplined on-ground delivery.",
        breadcrumbs: [home, { label: "About Us" }],
        bgImage: "/images/jaiswal/jaiswal-01.jpg",
        primaryCtaText: "Book a Free Consultation",
        primaryCtaHref: "/contact",
        secondaryCtaText: "View Our Work",
        secondaryCtaHref: "/projects",
      },
      { blockType: "studioStory" },
      { blockType: "philosophyGrid" },
      { blockType: "teamNetwork" },
      { blockType: "galleryRibbon" },
      { blockType: "valuesGrid" },
      { blockType: "reachBar" },
      { blockType: "cta", bgImage: "/images/jaiswal/jaiswal-01.jpg" },
    ],
  },
  {
    title: "Services",
    slug: "services",
    meta: {
      title: "Interior Design Services in Delhi NCR | Hause Interiors",
      description:
        "Explore Hause Interiors' full range of interior design services in Delhi NCR \u2014 residential, commercial, modular kitchens, turnkey solutions and renovations.",
    },
    layout: [
      {
        blockType: "pageHero",
        badge: "Our Services",
        title: "Interior design services that move with your life.",
        subtitle:
          "From a single room to a full office fit-out, every Hause Interiors project starts with how the space needs to function \u2014 then we design around it.",
        breadcrumbs: [home, { label: "Services" }],
        bgImage: "/images/jaiswal/jaiswal-04.jpg",
        primaryCtaText: "Book a Free Consultation",
        primaryCtaHref: "/contact",
        secondaryCtaText: "View Portfolio",
        secondaryCtaHref: "/projects",
      },
      { blockType: "servicesShowcase" },
      { blockType: "assuranceRibbon" },
      { blockType: "cta", bgImage: "/images/jaiswal/jaiswal-03.jpg" },
    ],
  },
  {
    title: "Our Process",
    slug: "process",
    meta: {
      title: "Our Interior Design Process | Hause Interiors Delhi NCR",
      description:
        "From first consultation to final handover \u2014 see how Hause Interiors plans, designs and executes interior projects in Delhi NCR and pan-India.",
    },
    layout: [
      {
        blockType: "pageHero",
        badge: "Our Delivery Process",
        title: "A process built for spaces that get delivered on time.",
        subtitle:
          "Interior projects go over budget and past deadline when there's no single process holding them together. Here's how we structure ours.",
        breadcrumbs: [home, { label: "Our Process" }],
        bgImage: "/images/jaiswal/jaiswal-09.jpg",
        primaryCtaText: "Start With a Discovery Call",
        primaryCtaHref: "/contact",
        secondaryCtaText: "View Portfolio",
        secondaryCtaHref: "/projects",
      },
      { blockType: "processDeepDive" },
      { blockType: "commitmentBar" },
      { blockType: "cta", bgImage: "/images/jaiswal/jaiswal-24.jpg" },
    ],
  },
  {
    title: "Testimonials",
    slug: "testimonials",
    meta: {
      title: "Client Reviews & Testimonials | Hause Interiors Delhi NCR",
      description:
        "Read what homeowners and businesses across Delhi NCR say about working with Hause Interiors for their interior design projects.",
    },
    layout: [
      {
        blockType: "pageHero",
        badge: "Client Stories",
        title: "What clients say about working with us.",
        subtitle:
          "Real reviews from homeowners and business leaders across Delhi NCR who trusted Hause Interiors with their residential and commercial spaces.",
        breadcrumbs: [home, { label: "Testimonials" }],
        bgImage: "/images/jaiswal/jaiswal-14.jpg",
        primaryCtaText: "Book a Free Consultation",
        primaryCtaHref: "/contact",
        secondaryCtaText: "View Portfolio",
        secondaryCtaHref: "/projects",
      },
      { blockType: "ratingBar" },
      { blockType: "testimonialsGrid" },
      { blockType: "photoStrip" },
      { blockType: "cta" },
    ],
  },
  {
    title: "Why Hause Interiors",
    slug: "why-hause-interiors",
    meta: {
      title: "Why Choose Hause Interiors | Interior Design Company Delhi NCR",
      description:
        "Transparent costing, single-point accountability, and on-time delivery \u2014 here's why homeowners and businesses across Delhi NCR choose Hause Interiors.",
    },
    layout: [
      {
        blockType: "pageHero",
        badge: "Why Choose Hause",
        title: "More than a design studio \u2014 a space partner.",
        subtitle:
          "Anyone can make a space look good in a render. What's harder is delivering it on time, on budget, and exactly as designed. That's the gap Hause Interiors is built to close.",
        breadcrumbs: [home, { label: "Why Us" }],
        bgImage: "/images/jaiswal/jaiswal-02.jpg",
        primaryCtaText: "Talk to Us About Your Project",
        primaryCtaHref: "/contact",
        secondaryCtaText: "Explore Our Work",
        secondaryCtaHref: "/projects",
      },
      { blockType: "pillarsGrid" },
      { blockType: "comparisonColumns" },
      { blockType: "cta" },
    ],
  },
  {
    title: "Renovation & Remodeling",
    slug: "services/renovation-remodeling",
    meta: {
      title: "Home Renovation & Remodeling in Delhi NCR | Hause Interiors",
      description:
        "Expert home, kitchen and bathroom renovations across Delhi NCR \u2014 modernizing older homes, improving layouts, and upgrading MEP with minimal disruption.",
    },
    layout: [
      {
        blockType: "pageHero",
        badge: "Renovation & Remodeling",
        title: "Give your space a second life.",
        subtitle:
          "You don't always need a new home to get the space you want. Hause Interiors renovates and remodels residential and commercial properties across Delhi NCR \u2014 modernising older layouts, upgrading electrical and plumbing, and delivering fresh aesthetics with minimal disruption.",
        breadcrumbs: [home, { label: "Services", href: "/services" }, { label: "Renovation & Remodeling" }],
        bgImage: "/images/jaiswal/jaiswal-13.jpg",
        primaryCtaText: "Plan Your Renovation",
        primaryCtaHref: "/contact",
        secondaryCtaText: "View Renovation Projects",
        secondaryCtaHref: "/projects",
      },
      {
        blockType: "checklistFeature",
        eyebrow: "Revitalize & Modernize",
        title: "What We Renovate",
        body: "From targeted single-room overhauls to full structural renovations of decades-old homes in Delhi NCR.",
        items: [
          "Full-home structural & cosmetic renovations",
          "Modular kitchen modernizations & layout expansions",
          "Luxury bathroom remodels with thermostatic fixtures",
          "Flooring upgrades (Italian marble, tiles, engineered wood)",
          "Full electrical re-wiring & plumbing replacement",
          "Structural partition removals & beam reinforcements",
          "Custom carpentry, false ceilings & door replacements",
          "Balcony waterproofings & sunroom enclosures",
        ].map((value) => ({ value })),
        image: "/images/service-renovation.jpg",
        imageAlt: "Bathroom and Living Renovation",
        imageSide: "right",
        tone: "ivory",
      },
      {
        blockType: "numberedCards",
        eyebrow: "Living Through A Remodel",
        title: "Renovating in Occupied Spaces",
        intro:
          "If you are living in the home while remodeling takes place, we follow strict dust-containment and noise-mitigation protocols.",
        cards: [
          {
            title: "Phased Zone-Wise Execution",
            desc: "We seal off active work zones with dust barriers and tackle rooms sequentially so your daily living isn't completely upended.",
          },
          {
            title: "Strict Noise Time-Boxing",
            desc: "Heavy civil demolition and tile cutting are strictly restricted to permitted society hours (10:00 AM \u2013 5:00 PM).",
          },
          {
            title: "Daily Site Cleanups",
            desc: "Debris and construction waste are cleared daily, keeping hallways, elevators, and living areas neat and presentable.",
          },
        ],
        columns: "3",
        tone: "sand",
      },
      { blockType: "cta" },
    ],
  },
  {
    title: "Commercial & Office Interior Design",
    slug: "services/commercial-office-interior-design",
    meta: {
      title: "Commercial & Office Interior Designers in Delhi NCR | Hause Interiors",
      description:
        "Commercial, office, retail and hospitality interior design and turnkey fit-outs in Delhi NCR \u2014 designed for team productivity, brand presence, and minimal downtime.",
    },
    layout: [
      {
        blockType: "pageHero",
        badge: "Commercial & Office",
        title: "Workspaces that work as hard as your team.",
        subtitle:
          "An office is not just desks and chairs \u2014 it's where your team collaborates, your clients form impressions, and your culture is lived. Hause Interiors delivers commercial interiors across Delhi NCR designed for productivity and brand impact.",
        breadcrumbs: [home, { label: "Services", href: "/services" }, { label: "Commercial & Office" }],
        bgImage: "/images/service-commercial.jpg",
        primaryCtaText: "Discuss Your Office Fit-Out",
        primaryCtaHref: "/contact",
        secondaryCtaText: "View Commercial Portfolio",
        secondaryCtaHref: "/projects",
      },
      {
        blockType: "cardListFeature",
        eyebrow: "Tailored Commercial Solutions",
        title: "Spaces We Design & Fit Out",
        body: "From fast-scaling tech companies to bespoke luxury retail showrooms, we provide full turnkey fit-out and architectural interior services.",
        cards: [
          {
            title: "Corporate Offices & Tech Workspaces",
            desc: "Agile desks, private acoustic focus booths, boardrooms, and open collaboration areas built for high-performing teams.",
          },
          {
            title: "Co-Working & Managed Spaces",
            desc: "Flexible, high-density layouts optimized for spatial efficiency, hot-desking, shared breakout lounges, and community cafes.",
          },
          {
            title: "Retail Stores & Brand Showrooms",
            desc: "Customer-first spatial flow, spotlight display fixtures, seamless POS zones, and luxury trial rooms that elevate brand perception.",
          },
          {
            title: "Cafes, Restaurants & Dining Spaces",
            desc: "Atmospheric layered lighting, acoustic control, ergonomic seating, commercial kitchen layouts, and guest circulation planning.",
          },
          {
            title: "Clinics & Professional Practice Studios",
            desc: "Hygienic, anti-microbial finishes, calming reception waiting lounges, sound-isolated consultation chambers, and organized utility storage.",
          },
        ],
        image: "/images/service-commercial.jpg",
        imageAlt: "Modern Tech Office Fit-Out",
      },
      {
        blockType: "iconCards",
        eyebrow: "Commercial Advantage",
        title: "Why Businesses Choose Hause Interiors",
        intro:
          "We treat commercial projects with strict project governance, clear milestones, and complete fiscal transparency.",
        cards: [
          {
            icon: "clock",
            title: "Minimal Disruption & Fast Delivery",
            desc: "We understand that business downtime costs money. We plan phased fit-outs, weekend work schedules, and pre-fabricated modular joinery to minimize handover delays.",
          },
          {
            icon: "layout-grid",
            title: "Brand-First Design",
            desc: "Your workspace is the physical expression of your company culture and values. We integrate your brand identity into materials, signage, and environmental design.",
          },
          {
            icon: "zap",
            title: "Integrated MEP & Acoustic Planning",
            desc: "HVAC distribution, structured data cabling, emergency lighting, and acoustic dampening are planned seamlessly alongside aesthetic elements.",
          },
        ],
      },
      { blockType: "cta" },
    ],
  },
  {
    title: "Turnkey Interior Solutions",
    slug: "services/turnkey-interior-solutions",
    meta: {
      title: "Turnkey Interior Solutions Delhi NCR | Hause Interiors",
      description:
        "End-to-end turnkey interior design and execution in Delhi NCR \u2014 one team handling design, civil, electrical, carpentry, paint and styling with zero hassle.",
    },
    layout: [
      {
        blockType: "pageHero",
        badge: "Turnkey Solutions",
        title: "One design partner. Zero coordination headaches.",
        subtitle:
          "Managing an interior project shouldn't feel like a full-time job. Hause Interiors delivers complete turnkey interior solutions across Delhi NCR \u2014 from design concept to final handover, managed by one team under one timeline.",
        breadcrumbs: [home, { label: "Services", href: "/services" }, { label: "Turnkey Interior Solutions" }],
        bgImage: "/images/jaiswal/jaiswal-07.jpg",
        primaryCtaText: "Book a Turnkey Consultation",
        primaryCtaHref: "/contact",
        secondaryCtaText: "View Our Projects",
        secondaryCtaHref: "/projects",
      },
      {
        blockType: "stageGrid",
        eyebrow: "End-to-End Scope",
        title: "What's Included in Our Turnkey Service",
        intro: "We take total responsibility for your site from day one to key handover.",
        stages: [
          {
            num: "01",
            title: "Detailed 3D Renders & Technical Blueprints",
            desc: "Complete architectural drawings, 2D electrical/plumbing layouts, and photorealistic 3D visualization.",
          },
          {
            num: "02",
            title: "Civil & Structural Modifications",
            desc: "Demolition, partition creation, flooring leveling, waterproofing, and tile/marble laying.",
          },
          {
            num: "03",
            title: "Electrical, Plumbing & HVAC Integration",
            desc: "Concealed conduit wiring, switchboard placement, plumbing fixtures, and AC drainage routing.",
          },
          {
            num: "04",
            title: "False Ceiling & Architectural Lighting",
            desc: "Gypsum board framing, cove lighting, magnetic track lights, and profile LED illumination.",
          },
          {
            num: "05",
            title: "Custom Carpentry & Modular Joinery",
            desc: "Modular kitchens, sliding/hinged wardrobes, vanity counters, and bespoke media consoles.",
          },
          {
            num: "06",
            title: "Painting, Wall Textures & Finishes",
            desc: "Wall putty, primer coats, premium emulsions, fluted paneling, wallpaper, and PU finishes.",
          },
          {
            num: "07",
            title: "Deep Cleaning, Styling & Handover",
            desc: "Post-construction chemical deep clean, soft furnishing placement, and final snag-list walkthrough.",
            wide: true,
          },
        ],
      },
      {
        blockType: "iconCards",
        eyebrow: "Ideal For",
        title: "Who Is Turnkey Right For?",
        titleTracking: "normal",
        cards: [
          {
            icon: "check-circle",
            title: "Busy Professionals & Families",
            desc: "Clients who don't have the time to coordinate with 5 different contractors, carpenters, and painters every weekend.",
          },
          {
            icon: "check-circle",
            title: "Out-of-Town & NRI Homeowners",
            desc: "Property owners living outside Delhi NCR or overseas who require rigorous local site management and digital milestone reporting.",
          },
          {
            icon: "check-circle",
            title: "Fixed-Budget Projects",
            desc: "Clients who want guaranteed cost certainty through a locked Bill of Quantities before work starts.",
          },
        ],
      },
      { blockType: "cta" },
    ],
  },
  {
    title: "Modular Kitchens & Wardrobes",
    slug: "services/modular-kitchen-wardrobe-design",
    meta: {
      title: "Modular Kitchen & Wardrobe Designers Delhi NCR | Hause Interiors",
      description:
        "Custom modular kitchens and wardrobes in Delhi NCR \u2014 straight, L-shaped, U-shaped and island kitchens; sliding, hinged and walk-in wardrobes built with BWP marine-grade plywood and premium hardware.",
    },
    layout: [
      {
        blockType: "pageHero",
        badge: "Kitchens & Wardrobes",
        title: "Kitchens and wardrobes built to actually hold your life.",
        subtitle:
          "Storage needs to be engineered around the way you cook, dress, and live. Hause Interiors designs and executes precision modular kitchens and customized wardrobe systems across Delhi NCR using marine-grade materials and premium hardware.",
        breadcrumbs: [home, { label: "Services", href: "/services" }, { label: "Modular Kitchen & Wardrobe Design" }],
        bgImage: "/images/jaiswal/jaiswal-18.jpg",
        primaryCtaText: "Design Your Kitchen",
        primaryCtaHref: "/contact",
        secondaryCtaText: "View Kitchen Portfolio",
        secondaryCtaHref: "/projects",
      },
      {
        blockType: "layoutCards",
        eyebrow: "Ergonomics & Work Triangle",
        title: "Modular Kitchen Layouts",
        intro: "Every layout is tailored to your cooking habits, appliance requirements, and spatial dimensions.",
        bestForLabel: "Best For:",
        options: [
          {
            name: "L-Shaped Kitchen",
            bestFor: "Small to mid-sized apartments",
            desc: "Optimizes corner space while leaving the kitchen open to adjacent dining or living areas.",
          },
          {
            name: "Parallel / Galley Kitchen",
            bestFor: "Long, narrow kitchen rooms",
            desc: "The most ergonomically efficient work triangle with opposing counters for prep and cooking.",
          },
          {
            name: "U-Shaped Kitchen",
            bestFor: "Independent homes and larger flats",
            desc: "Maximum countertop workspace, continuous continuous storage, and dedicated appliance zones.",
          },
          {
            name: "Island Kitchen",
            bestFor: "Open-plan luxury residences",
            desc: "A freestanding central counter that doubles as a social gathering spot and extra culinary prep surface.",
          },
        ],
      },
      {
        blockType: "specFeature",
        eyebrow: "Engineered for Longevity",
        title: "Materials & Hardware That Endure",
        body: "Indian cooking demands materials that withstand moisture, heat, and turmeric stains. We never compromise on core marine-grade plywood or branded German/Austrian hardware.",
        specs: [
          {
            category: "Carcass Core",
            options: "Boiling Water Proof (BWP) 710 Marine-Grade Plywood, HDHMR for wet zones",
          },
          {
            category: "External Finishes",
            options: "High-Gloss Acrylic, Anti-Fingerprint Matte Laminates, PU Paint, Natural Wood Veneer",
          },
          {
            category: "Countertops",
            options: "Engineered Quartz, Brazilian Granite, Nano White Slabs, Sintered Stone",
          },
          {
            category: "Hardware & Fittings",
            options: "Hettich, Blum, Hafele soft-close tandem boxes, lift-up shutters & pull-out pantries",
          },
        ],
        image: "/images/jaiswal/jaiswal-21.jpg",
        imageAlt: "Modular Kitchen Detail & Quartz Worktop",
      },
      {
        blockType: "darkCardGrid",
        eyebrow: "Bespoke Storage",
        title: "Custom Wardrobe Systems",
        intro:
          "Wardrobe interiors customized down to the millimeter for your specific collection of garments, accessories, shoes, and jewelry.",
        cards: [
          {
            title: "Sliding Door Wardrobes",
            desc: "Space-saving designs ideal for compact bedrooms, with smooth soft-close bottom/top roller tracks.",
          },
          {
            title: "Hinged / Swing Door Wardrobes",
            desc: "Classic full-access design allowing you to view the entire wardrobe interior simultaneously.",
          },
          {
            title: "Walk-in Dressing Suites",
            desc: "Dedicated dressing rooms with integrated island jewelry drawers, bronze glass shutters, and sensor illumination.",
          },
          {
            title: "Loft & Over-Door Storage",
            desc: "Custom overhead cabinetry utilizing full vertical ceiling height for seasonal bedding and luggage storage.",
          },
        ],
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
