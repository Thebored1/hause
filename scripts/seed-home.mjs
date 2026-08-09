// Seeds the CMS "home" page with the site's current content, so the
// admin shows the real copy rather than blank fields.
//
// Safe to re-run: matches on slug and updates in place.
// Usage: SEED_PASSWORD=… node scripts/seed-home.mjs [baseUrl]

const BASE = process.argv[2] ?? "http://localhost:3000";
const EMAIL = process.env.SEED_EMAIL ?? "dev@local.test";
const PASSWORD = process.env.SEED_PASSWORD ?? "";

const layout = [
  {
    blockType: "hero",
    eyebrow: "Interior Design Studio · Delhi NCR · Projects Pan India",
    titleLine1: "We design spaces",
    titleLine2: "that feel like home.",
    body: "Hause Interiors brings the same obsession with strategy and craft that built Hause's digital work into the physical spaces you live and work in. Thoughtful design, honest execution, and interiors built to last — from the first sketch to the final handover.",
    primaryLabel: "Book a Free Design Consultation",
    ctaHref: "/contact",
    secondaryLabel: "Explore Our Services",
    secondaryHref: "/services",
    spacesLabel: "Spaces",
    spaces: [
      { key: "architectural-atrium", name: "Living Rooms", image: "/images/sp-living.jpg" },
      { key: "living-sanctuary", name: "Bedrooms", image: "/images/sp-bedroom.jpg" },
      { key: "executive-lounge", name: "Offices", image: "/images/sp-office.jpg" },
      { key: "gourmet-atelier", name: "Modular Kitchens", image: "/images/sp-kitchen.jpg" },
      { key: "dining-pavilion", name: "Dining", image: "/images/sp-dining.jpg" },
      { key: "wellness-bath", name: "Bathrooms", image: "/images/sp-bathroom.jpg" },
    ],
    statsIntro:
      "Residential and commercial interiors designed and delivered end to end — from the first sketch to the final handover, under one accountable team.",
    stats: [
      { value: "100+", label: "Spaces Designed" },
      { value: "5+", label: "Cities Served Across India" },
      { value: "8+", label: "Years of Design & Delivery" },
      { value: "100%", label: "Personally Supervised" },
    ],
  },
  {
    blockType: "servicesGrid",
    eyebrow: "Services",
    title: "Interior design services that work for the way you live.",
    intro:
      "Whether it's a first home, a growing office, or a retail space that needs to convert footfall into sales, Hause Interiors designs around how a space is actually used — then builds it to hold up.",
    featureImage: "/images/sp-living.jpg",
    statLabel: "Site Supervision",
    statValue: "100%",
    statBody:
      "Every project is personally supervised on site by our own team, from the first day of civil work to final styling.",
    ctaLabel: "Book a free consultation",
    ctaHref: "/contact",
    services: [
      { number: "01", icon: "home", title: "Residential Interior Design", description: "Full-home and room-wise design for apartments, villas and builder-floor homes — living rooms, bedrooms, kitchens and everything in between.", href: "/services/residential-interior-design" },
      { number: "02", icon: "globe", title: "Commercial & Office Design", description: "Offices, retail stores, showrooms, cafes and clinics designed to reflect your brand and support how your team and customers move through the space.", href: "/services/commercial-office-interior-design" },
      { number: "03", icon: "sparkles", title: "Modular Kitchens & Wardrobes", description: "Custom kitchen and wardrobe layouts engineered for storage, durability, and everyday use — not just a pretty render.", href: "/services/modular-kitchen-wardrobe-design" },
      { number: "04", icon: "zap", title: "Turnkey Interior Solutions", description: "One team handles design, civil work, electrical, carpentry, and styling — a single point of accountability from day one to handover.", href: "/services/turnkey-interior-solutions" },
      { number: "05", icon: "layers", title: "Renovation & Remodeling", description: "Refresh a tired home or reconfigure an outdated office layout without starting from scratch.", href: "/services/renovation-remodeling" },
      { number: "06", icon: "box", title: "3D Visualization & Design Consultation", description: "See your space before it's built, with detailed 3D visuals and material mock-ups that remove the guesswork from decision-making.", href: "/services" },
    ],
  },
  { blockType: "portfolio" },
  {
    blockType: "process",
    steps: [
      { n: "01", title: "Discovery & site visit", body: "We visit the site (or review it remotely for pan-India projects), understand how the space will be used, and discuss budget, timelines and must-haves before any design work begins." },
      { n: "02", title: "Design & 3D visualization", body: "Layouts, mood boards and detailed renders let you see and approve the design before execution starts." },
      { n: "03", title: "Material selection & costing", body: "Every material and finish is selected and costed into a detailed Bill of Quantities, so you know exactly what you're paying for before work begins." },
      { n: "04", title: "Execution & site management", body: "Civil, electrical, carpentry and finishing work carried out under continuous supervision, with scheduled progress updates." },
      { n: "05", title: "Handover & styling", body: "A defect-check walkthrough followed by final styling — soft furnishings, decor and finishing touches — so the space is ready to move into, not just structurally complete." },
    ],
  },
  {
    blockType: "whyUs",
    reasons: [
      { title: "Single point of responsibility", body: "One team for design and execution, so nothing gets lost between the architect, contractor and carpenter." },
      { title: "Transparent, BOQ-based costing", body: "You see exactly what you're paying for, itemised against a detailed Bill of Quantities, before work begins." },
      { title: "Design with a business mindset", body: "Born from a digital studio built on measurable outcomes — clear scopes, realistic timelines, and practical budgets." },
      { title: "On-ground site supervision", body: "Delhi NCR projects are personally supervised at every stage, from civil work to final styling." },
      { title: "Pan-India delivery capability", body: "Structured remote design paired with vetted local partners, so the same accountability applies anywhere." },
    ],
  },
  {
    blockType: "locations",
    cities: [
      { name: "Delhi", body: "South Delhi apartments to independent floors in older colonies.", tag: "On ground" },
      { name: "Gurugram", body: "High-rise apartments, builder floors and corporate offices.", tag: "On ground" },
      { name: "Noida & Greater Noida", body: "Growing apartment societies, plus office and retail fit-outs.", tag: "On ground" },
      { name: "Ghaziabad", body: "Our home base — the most frequent site oversight.", tag: "Headquarters" },
      { name: "Faridabad", body: "Residential and commercial, same process throughout.", tag: "On ground" },
      { name: "Pan-India", body: "Remote design, milestone site visits and vetted local execution partners.", tag: "Select projects" },
    ],
  },
  { blockType: "cta", bgImage: "/images/jaiswal/jaiswal-07.jpg" },
];

const j = async (res) => {
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${res.status} ${JSON.stringify(body).slice(0, 400)}`);
  return body;
};

const main = async () => {
  const { token } = await j(
    await fetch(`${BASE}/api/users/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
    }),
  );
  const auth = { "content-type": "application/json", Authorization: `JWT ${token}` };
  const payload = { title: "Home", slug: "home", layout };

  const { docs } = await j(await fetch(`${BASE}/api/pages?where[slug][equals]=home&depth=0`, { headers: auth }));
  const existing = docs[0];

  const res = existing
    ? await j(await fetch(`${BASE}/api/pages/${existing.id}`, { method: "PATCH", headers: auth, body: JSON.stringify(payload) }))
    : await j(await fetch(`${BASE}/api/pages`, { method: "POST", headers: auth, body: JSON.stringify(payload) }));

  console.log(`${existing ? "updated" : "created"} home — ${res.doc.layout.length} blocks`);
};

main().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
