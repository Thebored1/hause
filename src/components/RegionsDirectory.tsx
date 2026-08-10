import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

// The service-area directory used on /locations. One card per region; the
// region flagged `highlight` is rendered as the dark headquarters card.

export interface Region {
  name: string;
  badge: string;
  subtext: string;
  desc: string;
  specialties: string[];
  /** Renders this card dark — used for the headquarters. */
  highlight?: boolean;
}

export const DEFAULT_REGIONS: Region[] = [
  {
    name: "Delhi",
    badge: "On-Ground Supervision",
    subtext: "South Delhi, Central Delhi, West & North Delhi",
    desc: "From South Delhi luxury apartments and builder floors in Greater Kailash, Vasant Vihar, and Defence Colony to independent residences in older colonies, we design residential and commercial interiors with site visits scheduled around the city's traffic and access realities.",
    specialties: ["Luxury builder floors & apartments", "Heritage & resale home transformations", "Boutique retail & executive offices"],
  },
  {
    name: "Gurugram (Gurgaon)",
    badge: "On-Ground Supervision",
    subtext: "Golf Course Road, Cyber City, Sohna Road, Dwarka Expressway",
    desc: "High-rise apartments, builder floors, and corporate offices across Gurugram's residential and business hubs — designed with the space and finish standards the city's newer luxury developments expect.",
    specialties: ["High-rise condominium interiors", "Tech company & startup fit-outs", "Open-concept penthouse suites"],
  },
  {
    name: "Noida & Greater Noida",
    badge: "On-Ground Supervision",
    subtext: "Sector 62, Sector 150, Noida Expressway, Greater Noida West",
    desc: "Residential interiors for Noida and Greater Noida's growing apartment societies, along with office and retail fit-outs for the region's rapidly expanding commercial and industrial corridors.",
    specialties: ["New society flat handovers (2/3/4 BHK)", "Turnkey modular kitchens & wardrobes", "Commercial coworking hubs & clinics"],
  },
  {
    name: "Ghaziabad",
    badge: "Headquarters & Central Hub",
    subtext: "Nehru Nagar, Indirapuram, Vaishali, Vasundhara, Raj Nagar Extension",
    desc: "As our home base, Ghaziabad gets the most frequent site oversight — from residential apartments and independent villas to small business, clinical, and retail interiors across the city.",
    specialties: ["Daily site visits & immediate response", "Fast-track turnkey home makeovers", "Local factory craftsmanship oversight"],
    highlight: true,
  },
  {
    name: "Faridabad",
    badge: "On-Ground Supervision",
    subtext: "Neharpar (Greater Faridabad), Green Field, Sector 14–21",
    desc: "Residential and commercial interior design for Faridabad, with the exact same design discipline, BOQ transparency, and execution process used across the rest of Delhi NCR.",
    specialties: ["Independent kothi & villa interiors", "Modern apartment storage upgrades", "Retail showroom modernizations"],
  },
  {
    name: "Pan-India Projects",
    badge: "Structured Remote + Local Partners",
    subtext: "Bengaluru, Mumbai, Pune, Hyderabad, Chandigarh, Jaipur & beyond",
    desc: "For clients outside Delhi NCR, Hause Interiors offers structured remote design — video consultations, detailed 3D visualization, and milestone-based site visits — paired with a vetted on-ground execution partner in your city, so the project is still run under a single, accountable process.",
    specialties: ["Comprehensive 3D render & CAD drawing packs", "Milestone video walkthroughs & BOQ control", "Empanelled local craftsmanship verification"],
  },
];

export interface RegionsDirectoryProps {
  regions?: Region[];
  specialtiesLabel?: string;
  ctaHref?: string;
}

export default function RegionsDirectory({
  regions = DEFAULT_REGIONS,
  specialtiesLabel = "Key Project Focus:",
  ctaHref = "/contact",
}: RegionsDirectoryProps) {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regions.map((region, idx) => {
            const isHq = Boolean(region.highlight);

            return (
              <div
                key={idx}
                className={`p-8 sm:p-10 rounded-2xl transition-all flex flex-col justify-between shadow-sm ${
                  isHq
                    ? "bg-[#18181b] text-white border border-black/20 ring-1 ring-white/10 shadow-xl"
                    : "bg-white text-[#18181b] border border-black/10 hover:border-black/25"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-xs font-mono font-semibold ${isHq ? "text-white/40" : "text-[#8a8578]"}`}>
                      0{idx + 1}
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full ${
                        isHq
                          ? "bg-white text-black"
                          : "bg-black/5 text-[#18181b] border border-black/10"
                      }`}
                    >
                      {region.badge}
                    </span>
                  </div>

                  <h2 className={`text-2xl font-medium mb-1 tracking-tight ${isHq ? "text-white" : "text-[#18181b]"}`}>
                    {region.name}
                  </h2>
                  <p className={`text-xs font-medium mb-4 ${isHq ? "text-white/50" : "text-[#8a8578]"}`}>
                    {region.subtext}
                  </p>

                  <p className={`text-xs sm:text-sm font-normal leading-relaxed mb-6 ${
                    isHq ? "text-white/75 font-light" : "text-[#6b6559]"
                  }`}>
                    {region.desc}
                  </p>

                  <div className={`border-t pt-4 space-y-2 ${isHq ? "border-white/10" : "border-black/10"}`}>
                    <span className={`text-[11px] font-semibold uppercase tracking-wider block mb-2 ${
                      isHq ? "text-white/40" : "text-[#8a8578]"
                    }`}>
                      {specialtiesLabel}
                    </span>
                    {region.specialties.map((s, si) => (
                      <div key={si} className={`flex items-center gap-2 text-xs ${
                        isHq ? "text-white/80" : "text-[#18181b]/85"
                      }`}>
                        <CheckCircle2 size={13} className={`shrink-0 ${isHq ? "text-white/50" : "text-[#8a8578]"}`} />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`mt-8 pt-4 border-t flex justify-end ${isHq ? "border-white/10" : "border-black/10"}`}>
                  <Link
                    href={ctaHref}
                    className={`text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-1.5 transition-colors ${
                      isHq ? "text-white hover:text-white/70" : "text-[#18181b] hover:text-black"
                    }`}
                  >
                    <span>Start In {region.name}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
