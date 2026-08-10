import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, ArrowUpRight } from "lucide-react";

// The alternating service showcase used on /services. Cards cycle through
// light / dark / sand themes, and every other one flips its image to the left.

export interface ServiceEntry {
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  features: string[];
  image: string;
  /** "light" | "dark" | "sand" — anything else falls back to light. */
  theme: string;
  /** Links to /contact rather than /services/<slug>. */
  isExternalOrContact?: boolean;
}

export const DEFAULT_SERVICES_LIST: ServiceEntry[] = [
  {
    slug: "residential-interior-design",
    title: "Residential Interior Design",
    tagline: "Homes designed around how you live.",
    desc: "Full-home and room-wise design for apartments, independent villas, builder floors, duplexes and penthouses — living rooms, bedrooms, modular kitchens, false ceilings, pooja rooms, and more.",
    features: [
      "Apartment, villa & penthouse specialists",
      "Living, master suite & dining spatial planning",
      "Custom false ceilings & architectural lighting",
      "Pooja rooms, home offices & balcony retreats",
    ],
    image: "/images/jaiswal/jaiswal-02.jpg",
    theme: "light",
  },
  {
    slug: "commercial-office-interior-design",
    title: "Commercial & Office Interior Design",
    tagline: "Workspaces that work as hard as your team.",
    desc: "Offices, co-working spaces, retail stores, showrooms, restaurants, cafes and clinics — designed to reflect your brand and support how people actually move through and use the space.",
    features: [
      "Agile tech offices & corporate headquarters",
      "Brand-aligned retail showrooms & boutiques",
      "Cafes, restaurants & hospitality spaces",
      "Minimal downtime & phased commercial fit-outs",
    ],
    image: "/images/service-commercial.jpg",
    theme: "dark",
  },
  {
    slug: "modular-kitchen-wardrobe-design",
    title: "Modular Kitchens & Wardrobes",
    tagline: "Kitchens and wardrobes built to actually hold your life.",
    desc: "Straight, L-shaped, U-shaped, parallel and island kitchen layouts, along with sliding, hinged and walk-in wardrobes — designed for storage first, style always.",
    features: [
      "Marine-grade BWP/BWR plywood carcasses",
      "Acrylic, PU, laminate & veneer premium finishes",
      "Soft-close premium European hardware fittings",
      "Walk-in dressing rooms & custom wardrobe internals",
    ],
    image: "/images/jaiswal/jaiswal-21.jpg",
    theme: "sand",
  },
  {
    slug: "turnkey-interior-solutions",
    title: "Turnkey Interior Solutions",
    tagline: "One design partner. Zero coordination headaches.",
    desc: "Design, civil work, electrical and plumbing coordination, carpentry, painting, and styling — delivered by one team under one timeline, for clients who want a single point of accountability.",
    features: [
      "Single point of project ownership & accountability",
      "Itemised Bill of Quantities (BOQ) with fixed costs",
      "Full civil, MEP, carpentry & finishing execution",
      "Defect-free handover checklist & post-handover support",
    ],
    image: "/images/jaiswal/jaiswal-07.jpg",
    theme: "dark",
  },
  {
    slug: "renovation-remodeling",
    title: "Renovation & Remodeling",
    tagline: "Give your space a second life.",
    desc: "Full home renovations, kitchen and bathroom remodels, and office layout reconfigurations — planned to minimise disruption to spaces that are still in use.",
    features: [
      "Full home structural & interior makeovers",
      "Modular kitchen & luxury bathroom modernizations",
      "Electrical & plumbing overhauls for older properties",
      "Phased execution plans for occupied residences",
    ],
    image: "/images/jaiswal/jaiswal-13.jpg",
    theme: "light",
  },
  {
    slug: "3d-visualization-consultation",
    title: "3D Visualization & Design Consultation",
    tagline: "See your space with photorealistic clarity before you build.",
    desc: "Standalone design consultation and 3D visualization for clients who want expert direction and detailed renders before committing to execution — with Hause Interiors or their own contractor.",
    features: [
      "Photorealistic 3D interior renders & material moodboards",
      "Detailed 2D CAD layouts & electrical/plumbing drawings",
      "Material specifications & BOQ estimation guidance",
      "Adjustable against final project cost upon execution",
    ],
    image: "/images/service-3d.jpg",
    theme: "sand",
    isExternalOrContact: true,
  },
];

export interface ServicesShowcaseProps {
  eyebrow?: string;
  title?: string;
  services?: ServiceEntry[];
}

export default function ServicesShowcase({
  eyebrow = "End-to-End Capabilities",
  title = "Specialized practices for residential and commercial environments.",
  services = DEFAULT_SERVICES_LIST,
}: ServicesShowcaseProps) {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
      <div className="max-w-[1280px] mx-auto space-y-16">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#18181b] leading-tight">
            {title}
          </h2>
        </div>

        <div className="space-y-12">
          {services.map((srv, idx) => {
            const isEven = idx % 2 === 0;
            const href = srv.isExternalOrContact
              ? "/contact"
              : `/services/${srv.slug}`;

            const isDarkCard = srv.theme === "dark";
            const isSandCard = srv.theme === "sand";

            return (
              <div
                key={srv.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center p-8 sm:p-12 lg:p-14 rounded-3xl transition-all shadow-lg ${
                  isDarkCard
                    ? "bg-[#141618] text-white border border-white/10"
                    : isSandCard
                    ? "bg-[#f3efea] text-[#18181b] border border-black/10"
                    : "bg-white text-[#18181b] border border-black/10"
                } ${isEven ? "" : "lg:flex-row-reverse"}`}
              >
                {/* Text Details */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? "" : "lg:order-2"}`}>
                  <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase">
                    <span className={isDarkCard ? "text-white/50" : "text-[#8a8578]"}>
                      0{idx + 1}
                    </span>
                    <span className={isDarkCard ? "text-white/30" : "text-[#a19c8f]"}>•</span>
                    <span className={isDarkCard ? "text-white/50 font-semibold" : "text-[#8a8578] font-semibold"}>
                      Service Vertical
                    </span>
                  </div>

                  <h3 className={`text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight leading-tight ${
                    isDarkCard ? "text-white" : "text-[#18181b]"
                  }`}>
                    {srv.title}
                  </h3>

                  <p className={`text-xs sm:text-sm font-semibold tracking-wider uppercase ${
                    isDarkCard ? "text-white/60" : "text-[#8a8578]"
                  }`}>
                    {srv.tagline}
                  </p>

                  <p className={`text-sm sm:text-base font-normal leading-relaxed ${
                    isDarkCard ? "text-white/75 font-light" : "text-[#6b6559]"
                  }`}>
                    {srv.desc}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {srv.features.map((f, fi) => (
                      <div
                        key={fi}
                        className={`flex items-center gap-3 text-xs sm:text-sm ${
                          isDarkCard ? "text-white/80" : "text-[#18181b]/85"
                        }`}
                      >
                        <Check size={15} className={isDarkCard ? "text-white/60 shrink-0" : "text-[#8a8578] shrink-0"} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      href={href}
                      className={`inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold tracking-[0.16em] uppercase transition-all rounded-full shadow-md ${
                        isDarkCard
                          ? "bg-white text-black hover:bg-neutral-200"
                          : "bg-[#18181b] text-white hover:bg-black"
                      }`}
                    >
                      <span>{srv.isExternalOrContact ? "Book Consultation" : "Explore Service"}</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Image Showcase */}
                <div
                  className={`lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border shadow-md group ${
                    isDarkCard ? "border-white/15 bg-black/40" : "border-black/10 bg-neutral-100"
                  } ${isEven ? "" : "lg:order-1"}`}
                >
                  <Image
                    src={srv.image}
                    alt={srv.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
