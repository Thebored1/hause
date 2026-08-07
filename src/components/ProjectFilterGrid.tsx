"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Clock, MapPin, Layers, Sparkles } from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  area: string;
  scope: string;
  timeline: string;
  image: string;
  description: string;
  highlights: string[];
}

export const defaultProjects: ProjectItem[] = [
  {
    id: "sp-bathroom-lounge",
    title: "VIP Client Waiting Lounge & Marble Feature Wall",
    category: "Lounges & Reception",
    location: "Golf Course Road, Gurugram",
    area: "450 sq. ft.",
    scope: "Executive Lounge & Marble Wall Fit-Out",
    timeline: "3 Weeks",
    image: "/images/sp-bathroom.jpg",
    description:
      "Executive waiting lounge featuring twin plush armchairs, a bookmatched white marble slab wall with an embedded vertical LED profile, a swan centerpiece, and a metal grid display bookshelf with greenery.",
    highlights: [
      "Bookmatched white marble slab wall with integrated LED strip",
      "Plush armchairs & swan sculpture centerpiece",
      "Open steel grid display unit with potted greenery",
    ],
  },
  {
    id: "sp-bedroom-doorway",
    title: "Villa Main Entrance & Slatted Wood Doorway",
    category: "Villa Entrances",
    location: "Greater Kailash, South Delhi",
    area: "350 sq. ft.",
    scope: "Villa Entrance & Architectural Doorway",
    timeline: "3 Weeks",
    image: "/images/sp-bedroom.jpg",
    description:
      "Bespoke villa front entrance design featuring a horizontal slatted timber door, dark casing, raised entry steps, bollard lighting, white subway tile walling, and an integrated bamboo planter box.",
    highlights: [
      "Horizontal slatted timber entrance door with dark casing",
      "Raised entry steps with outdoor bollard lighting",
      "White subway tile accent wall with integrated bamboo planter",
    ],
  },
  {
    id: "varmora-reception-suite",
    title: "Varmora Corporate Reception & Meeting Suite",
    category: "Corporate & Commercial",
    location: "Sector 62, Noida",
    area: "650 sq. ft.",
    scope: "Corporate Reception & Acoustic Ceiling Fit-Out",
    timeline: "4 Weeks",
    image: "/images/service-kitchen.jpg",
    description:
      "Executive reception area fit-out featuring backlit Varmora brand signage, slatted timber acoustic ceiling treatments, multi-ring halo pendant lights, and an integrated reception counter.",
    highlights: [
      "Backlit Varmora illuminated brand sign",
      "Slatted timber acoustic ceiling with halo ring lights",
      "Integrated reception desk & executive seating",
    ],
  },
  {
    id: "sp-boutique-display",
    title: "Boutique Retail Alcove & Material Sample Display",
    category: "Retail & Showrooms",
    location: "Indirapuram, Ghaziabad",
    area: "420 sq. ft.",
    scope: "Boutique Fit-Out & Display Wall",
    timeline: "3 Weeks",
    image: "/images/sp-kitchen.jpg",
    description:
      "Architectural retail display alcove featuring terracotta arch framing, clothing and accessory display pedestals, and an interactive material sample wall ('Touch & Feel Gritstone').",
    highlights: [
      "Terracotta arched alcove with apparel display rail",
      "Interactive wall panel with tactile finish samples",
      "Track-lit showroom background with lounge seating",
    ],
  },
  {
    id: "jaiswal-elevator-lobby",
    title: "Private Apartment Elevator Foyer & Console",
    category: "Entryways & Foyers",
    location: "Vaishali, Ghaziabad",
    area: "320 sq. ft.",
    scope: "Foyer Architecture & Marble Cladding",
    timeline: "3 Weeks",
    image: "/images/jaiswal/jaiswal-18.jpg",
    description:
      "Private residential elevator lobby featuring full-height marble tile cladding, stainless steel elevator doors, a sleek console table with a decorative Buddha sculpture, and unit entry signage.",
    highlights: [
      "Full-height marble wall paneling and surround",
      "White floating entryway console table with Buddha accent",
      "Stainless steel elevator doors with digital floor indicator",
    ],
  },
  {
    id: "sp-office-commercial",
    title: "Agile Tech Office Workspace & Glass Hubs",
    category: "Corporate & Commercial",
    location: "Cyber City, Gurugram",
    area: "4,800 sq. ft.",
    scope: "Full Commercial Fit-Out & MEP",
    timeline: "11 Weeks",
    image: "/images/service-commercial.jpg",
    description:
      "High-performance office workspace featuring suspended acoustic ceiling baffles, collaborative hot-desking clusters, and glass-partitioned private conference hubs.",
    highlights: [
      "Acoustic felt ceiling sound baffling",
      "Glass partition meeting & focus hubs",
      "Integrated cable management desk bays",
    ],
  },
  {
    id: "sp-living-suite",
    title: "Warm Ambient Living Room & Wall Paneling",
    category: "Living & Lounges",
    location: "Indirapuram, Ghaziabad",
    area: "3,100 sq. ft.",
    scope: "Turnkey Living Room Interior",
    timeline: "10 Weeks",
    image: "/images/sp-living.jpg",
    description:
      "Spacious turnkey living room featuring bookmatched Italian marble wall cladding, fluted walnut millwork, concealed LED ceiling coves, and custom seating.",
    highlights: [
      "Bookmatched Italian marble TV console",
      "Concealed ambient LED profile coving",
      "Fluted walnut wall paneling",
    ],
  },
  {
    id: "sp-dining-suite",
    title: "Showroom Material Display Gallery & Partitions",
    category: "Retail & Showrooms",
    location: "Vasant Vihar, South Delhi",
    area: "850 sq. ft.",
    scope: "Material Gallery & Acoustic Paneling",
    timeline: "5 Weeks",
    image: "/images/sp-dining.jpg",
    description:
      "Material display gallery featuring slatted acoustic partition walls, sample display racks, and warm ambient track lighting.",
    highlights: [
      "Slatted acoustic partition walls",
      "Material sample display shelves",
      "Recessed ceiling track lighting",
    ],
  },
  {
    id: "jaiswal-experience-showroom",
    title: "Somany Architectural Tile & Bathware Gallery",
    category: "Retail & Showrooms",
    location: "Nehru Nagar, Ghaziabad",
    area: "1,800 sq. ft.",
    scope: "Architectural Display & Lighting Fit-Out",
    timeline: "6 Weeks",
    image: "/images/jaiswal/jaiswal-07.jpg",
    description:
      "High-impact retail experience center with illuminated wave wall installations, double-height display galleries, and textured architectural surface bays.",
    highlights: [
      "Backlit fluid wave wall sculpture",
      "Double-height experience gallery",
      "Architectural spotlighting tracks",
    ],
  },
];

export default function ProjectFilterGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Dynamically extract unique categories present in the available projects list
  const categories = ["All", ...Array.from(new Set(defaultProjects.map((p) => p.category)))];

  const filteredProjects = activeCategory === "All"
    ? defaultProjects
    : defaultProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-12 pb-4 border-b border-white/10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-[0.16em] uppercase transition-all border cursor-pointer ${
              activeCategory === cat
                ? "bg-[#f3efea] text-[#0c0d0e] border-[#f3efea] shadow-md"
                : "bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid following Suggested Template & Matching Image Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col bg-[#141618] border border-white/10 rounded-3xl transition-all duration-300 overflow-hidden shadow-xl"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141618] via-transparent to-transparent opacity-80" />

              <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-semibold tracking-wider text-white/90 uppercase border border-white/15">
                {project.category}
              </span>
            </div>

            {/* Content Details (Strictly Matching Image Visual Content) */}
            <div className="p-7 flex flex-col flex-grow justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <MapPin size={12} className="text-white/40" />
                  <span>{project.location}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-medium text-[#f3efea] leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Execution Highlights directly generated from image content */}
              <div className="bg-white/5 border border-white/8 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase text-white/40">
                  <Sparkles size={11} className="text-white/50" />
                  <span>Key Execution Highlights</span>
                </div>
                <ul className="space-y-1 text-xs text-white/75 font-light">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 leading-tight">
                      <span className="w-1 h-1 rounded-full bg-white/50 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Template Metadata: Area, Scope & Timeline */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-white/60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Layers size={13} className="text-white/40" />
                    <span className="text-white/40">Area:</span>
                  </div>
                  <span className="font-medium text-white">{project.area}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/40">Scope:</span>
                  <span className="font-medium text-white/90 text-right line-clamp-1">{project.scope}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-white/40" />
                    <span className="text-white/40">Timeline:</span>
                  </div>
                  <span className="font-medium text-white">{project.timeline}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
