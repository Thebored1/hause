"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Maximize2, X, Clock, MapPin, Layers } from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  category: "Residential" | "Commercial & Office" | "Modular Kitchens" | "Renovations";
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
    id: "jaiswal-residence-living",
    title: "Luxury Modern 4BHK Residence",
    category: "Residential",
    location: "Vaishali, Ghaziabad",
    area: "3,100 sq. ft.",
    scope: "Turnkey Architecture & Full-Home Interior",
    timeline: "12 Weeks",
    image: "/images/jaiswal/jaiswal-01.jpg",
    description:
      "A complete turnkey interior transformation with bespoke walnut woodwork, fluted paneling, warm ambient layered lighting, and customized modular cabinetry.",
    highlights: ["Custom Italian marble TV console", "Concealed ambient LED profiles", "Integrated false ceiling design"],
  },
  {
    id: "jaiswal-residence-dining",
    title: "Contemporary Dining & Bar Lounge",
    category: "Residential",
    location: "Indirapuram, Ghaziabad",
    area: "850 sq. ft.",
    scope: "Custom Millwork & Lighting Design",
    timeline: "5 Weeks",
    image: "/images/jaiswal/jaiswal-02.jpg",
    description:
      "An atmospheric dining space with custom slatted acoustic wall paneling, floating credenza, and designer pendant illumination.",
    highlights: ["Bookmatched marble dining tabletop", "Backlit fluted charcoal paneling", "Concealed glassware bar cabinet"],
  },
  {
    id: "cyber-city-workspace",
    title: "Executive Tech Headquarters, Cyber City",
    category: "Commercial & Office",
    location: "Gurugram, Delhi NCR",
    area: "4,800 sq. ft.",
    scope: "Full Commercial Fit-Out & MEP",
    timeline: "11 Weeks",
    image: "/images/service-commercial.jpg",
    description:
      "An agile, high-performance office environment featuring acoustic private phone booths, collaborative lounges, ergonomic workstations, and brand-first executive suites.",
    highlights: ["Acoustic felt ceiling panels", "Biophilic indoor planters", "Glass partition conference hubs"],
  },
  {
    id: "jaiswal-kitchen-suite",
    title: "Minimalist Culinary Studio & Island",
    category: "Modular Kitchens",
    location: "Sector 62, Noida",
    area: "340 sq. ft.",
    scope: "Modular Kitchen & Breakfast Island",
    timeline: "4 Weeks",
    image: "/images/jaiswal/jaiswal-18.jpg",
    description:
      "An ergonomically planned parallel modular kitchen built with anti-fingerprint acrylic shutters, quartz countertops, and soft-close Austrian hardware.",
    highlights: ["Marine-grade BWP plywood carcass", "Hidden pull-out pantry tall unit", "Under-cabinet task lighting"],
  },
  {
    id: "south-delhi-penthouse",
    title: "Contemporary Master Suite, Greater Kailash",
    category: "Residential",
    location: "South Delhi",
    area: "650 sq. ft.",
    scope: "Master Suite Interior & Walk-in Wardrobe",
    timeline: "6 Weeks",
    image: "/images/jaiswal/jaiswal-11.jpg",
    description:
      "A serene master suite combining tactile bouclé upholstery, brushed brass detailing, and floor-to-ceiling custom wardrobes with bronze glass.",
    highlights: ["Walk-in wardrobe with bronze glass", "Custom headboard acoustic paneling", "Architectural cove lighting"],
  },
  {
    id: "vasant-vihar-remodel",
    title: "Colonial Residence Revival, Vasant Vihar",
    category: "Renovations",
    location: "South Delhi",
    area: "2,900 sq. ft.",
    scope: "Structural Renovation & Modernization",
    timeline: "12 Weeks",
    image: "/images/jaiswal/jaiswal-13.jpg",
    description:
      "Phased structural remodeling of a 20-year-old property, upgrading MEP systems, opening up partitions for natural light, and introducing curated modern finishes.",
    highlights: ["Structural wall removal with steel beams", "Restored herringbone flooring", "Full plumbing & wiring overhaul"],
  },
  {
    id: "noida-highrise-living",
    title: "Sky Villa Residence, Expressway",
    category: "Residential",
    location: "Sector 150, Noida",
    area: "2,800 sq. ft.",
    scope: "Turnkey Interior Design",
    timeline: "10 Weeks",
    image: "/images/jaiswal/jaiswal-06.jpg",
    description:
      "High-rise luxury apartment interior with double-height ceiling treatments, motorized sheer drapery, and integrated smart home automation.",
    highlights: ["Double-height architectural lighting", "Italian stone TV wall cladding", "Smart mood scene automation"],
  },
  {
    id: "ghaziabad-wardrobe-walkin",
    title: "Bespoke Glass Wardrobe Suite",
    category: "Modular Kitchens",
    location: "Raj Nagar Extension, Ghaziabad",
    area: "280 sq. ft.",
    scope: "Custom Wardrobes & Vanity",
    timeline: "3 Weeks",
    image: "/images/jaiswal/jaiswal-09.jpg",
    description:
      "Custom bronze-tinted glass wardrobes with motion-sensor LED profile lighting, velvet jewelry display drawers, and integrated vanity mirror.",
    highlights: ["Fluted glass wardrobe shutters", "Motion-activated drawer illumination", "Dedicated watch & jewelry organizers"],
  },
  {
    id: "golf-course-penthouse",
    title: "Luxury Penthouse Bath & Powder Room",
    category: "Renovations",
    location: "Gurugram, Delhi NCR",
    area: "450 sq. ft.",
    scope: "Bathroom Remodeling & Styling",
    timeline: "3 Weeks",
    image: "/images/sp-bathroom.jpg",
    description:
      "Spa-inspired bathroom renovation featuring bookmatched porcelain slabs, concealed thermostatic rain shower fittings, and floating vanity units.",
    highlights: ["Thermostatic multi-jet rain shower", "Backlit floating vanity mirror", "Anti-skid textured microcement"],
  },
];

export default function ProjectFilterGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ["All", "Residential", "Commercial & Office", "Modular Kitchens", "Renovations"];

  const filteredProjects = activeCategory === "All"
    ? defaultProjects
    : defaultProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-12 pb-4 border-b border-white/10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-[0.16em] uppercase transition-all border cursor-pointer ${
              activeCategory === cat
                ? "bg-[#f3efea] text-[#0c0d0e] border-[#f3efea] shadow-md"
                : "bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group relative flex flex-col bg-[#141618] border border-white/10 hover:border-white/30 rounded-3xl transition-all duration-300 cursor-pointer overflow-hidden shadow-xl"
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

              <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-semibold tracking-wider text-white/90 uppercase border border-white/10">
                {project.category}
              </span>

              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                <Maximize2 size={14} />
              </div>
            </div>

            {/* Content Details */}
            <div className="p-7 flex flex-col flex-grow justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-white/50 mb-2">
                  <MapPin size={12} className="text-white/40" />
                  <span>{project.location}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-[#f3efea] group-hover:text-white transition-colors leading-snug">
                  {project.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-white/60 font-light line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                <div className="flex items-center gap-1.5">
                  <Layers size={13} className="text-white/40" />
                  <span>{project.area}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-white/40" />
                  <span>{project.timeline}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[#f3efea] font-medium group-hover:translate-x-0.5 transition-transform">
                  View <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Lightbox Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#121316] border border-white/15 rounded-3xl p-6 sm:p-10 text-[#f3efea] shadow-2xl my-8 overflow-hidden">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 text-white/60 hover:text-white rounded-full border border-white/10 hover:border-white/30 bg-white/5 transition-colors cursor-pointer"
              aria-label="Close Project Modal"
            >
              <X size={20} />
            </button>

            <div className="space-y-6">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60 border border-white/10 rounded-2xl">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wider text-white uppercase mb-3">
                  {selectedProject.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">
                  {selectedProject.title}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-white/70 font-light leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl text-xs">
                <div>
                  <span className="text-white/40 uppercase tracking-wider block mb-1">Location</span>
                  <span className="text-white font-medium">{selectedProject.location}</span>
                </div>
                <div>
                  <span className="text-white/40 uppercase tracking-wider block mb-1">Floor Area</span>
                  <span className="text-white font-medium">{selectedProject.area}</span>
                </div>
                <div>
                  <span className="text-white/40 uppercase tracking-wider block mb-1">Scope</span>
                  <span className="text-white font-medium">{selectedProject.scope}</span>
                </div>
                <div>
                  <span className="text-white/40 uppercase tracking-wider block mb-1">Timeline</span>
                  <span className="text-white font-medium">{selectedProject.timeline}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold tracking-wider uppercase text-white/60 mb-3">
                  Key Execution Highlights
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
                  {selectedProject.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 bg-[#f3efea] text-[#0c0d0e] text-xs font-semibold tracking-wider uppercase hover:bg-white transition-colors rounded-full cursor-pointer border-none shadow-md"
                >
                  Close Showcase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
