import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";
import { Check, Home, Compass, Eye, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Residential Interior Designers in Delhi NCR | Hause Interiors",
  description:
    "Full-home and room-wise residential interior design in Delhi NCR — apartments, villas and builder-floor homes designed and executed end-to-end by Hause Interiors.",
};

const WHAT_WE_DESIGN = [
  "Living & dining spaces with architectural paneling",
  "Master and children's bedrooms with custom wardrobes",
  "Modular kitchens with ergonomic workflow storage",
  "False ceiling & layered architectural cove lighting",
  "Pooja rooms with customized CNC marble & wood elements",
  "Home offices & quiet study sanctuaries",
  "Balconies, terraces & utility zones",
  "Full-home turnkey residential transformations",
];

const WHO_WE_DESIGN_FOR = [
  {
    title: "Apartments & Flats",
    desc: "From 2BHK to expansive 4BHK society flats in Noida, Gurugram, and Ghaziabad, maximizing spatial efficiency and storage.",
  },
  {
    title: "Independent Villas & Builder Floors",
    desc: "Multi-level homes across South Delhi and Delhi NCR requiring cohesive architectural themes and custom woodwork.",
  },
  {
    title: "Duplexes & Penthouses",
    desc: "High-ceiling residences with grand double-height living areas, feature staircases, and terrace entertainment zones.",
  },
  {
    title: "Resale-Home Makeovers",
    desc: "Transforming older properties into contemporary, modern-living spaces with updated MEP and refined finishes.",
  },
];

const APPROACH_STEPS = [
  {
    step: "01",
    title: "Lifestyle Discovery & Site Visit",
    desc: "We study family routines, traffic flow, natural daylight patterns, storage pain points, and target budgets.",
  },
  {
    step: "02",
    title: "Spatial Layout & 3D Visualization",
    desc: "Photorealistic 3D renders let you see furniture proportions, texture palettes, and lighting before site work starts.",
  },
  {
    step: "03",
    title: "Turnkey Execution & Supervision",
    desc: "One dedicated team handles civil, electrical, carpentry, paint, and final styling under constant site supervision.",
  },
];

const RESIDENTIAL_GALLERY = [
  { src: "/images/jaiswal/jaiswal-08.jpg", title: "Living Area & Wall Joinery" },
  { src: "/images/jaiswal/jaiswal-11.jpg", title: "Master Bedroom & Wardrobe" },
  { src: "/images/jaiswal/jaiswal-17.jpg", title: "Dining & Ambient Fixtures" },
];

export default function ResidentialServicePage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Residential Design"
          title="Homes designed around how you live."
          subtitle="A home should adapt to the people in it — not the other way around. Hause Interiors designs residential interiors across Delhi NCR that balance everyday function with a look that feels considered, not generic."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Residential Interior Design" },
          ]}
          bgImage="/images/jaiswal/jaiswal-06.jpg"
          primaryCtaText="Start Your Home Project"
          primaryCtaHref="/contact"
          secondaryCtaText="View Residential Portfolio"
          secondaryCtaHref="/projects"
        />

        {/* SECTION 1: Scope of Design (Crisp Light Ivory Background: #f9f8f6) */}
        <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                Scope of Design
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#18181b] leading-tight">
                What We Design
              </h2>
              <p className="text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
                Whether you are outfitting a newly handed-over apartment or revitalizing an established family home, we deliver complete room-wise and full-home design solutions tailored to your routine.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {WHAT_WE_DESIGN.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#18181b]">
                    <Check size={16} className="text-[#8a8578] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-black/10 shadow-2xl group">
              <Image
                src="/images/jaiswal/jaiswal-03.jpg"
                alt="Residential Living Room Interior"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </section>

        {/* SECTION 2: Who We Design For (Warm Sand Background: #f3efea) */}
        <section className="py-28 px-6 sm:px-12 md:px-16 bg-[#f3efea] text-[#18181b] border-t border-black/10">
          <div className="max-w-[1280px] mx-auto space-y-16">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                Tailored Solutions
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-normal tracking-tight text-[#18181b] leading-tight">
                Who We Design For
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#6b6559] font-normal leading-relaxed">
                Every property type has unique structural characteristics and municipal guidelines. We tailor our engineering and aesthetics accordingly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHO_WE_DESIGN_FOR.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-white border border-black/10 hover:border-black/25 rounded-2xl transition-all shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono text-[#8a8578] block mb-4 font-semibold">0{idx + 1}</span>
                    <h3 className="text-lg font-medium text-[#18181b] mb-3">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-[#6b6559] font-normal leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: Residential Photography Ribbon (Photo Showcase) */}
        <section className="py-20 px-6 sm:px-12 md:px-16 bg-[#121316] border-t border-white/10">
          <div className="max-w-[1280px] mx-auto space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-semibold tracking-[0.22em] text-white/50 uppercase">
                  Delivered Residences
                </span>
                <h3 className="mt-2 text-2xl sm:text-3xl font-medium text-white">
                  Real Residential Projects in Delhi NCR
                </h3>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-white hover:text-white/80 transition-colors"
              >
                <span>View All Projects</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RESIDENTIAL_GALLERY.map((g, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group">
                  <Image
                    src={g.src}
                    alt={g.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-sm font-medium">{g.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: Our Approach (Dark Obsidian Background: #0c0d0e) */}
        <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#0c0d0e] border-t border-white/10">
          <div className="max-w-[1280px] mx-auto space-y-14">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.22em] text-white/50 uppercase">
                Execution Methodology
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-medium tracking-tight text-white leading-tight">
                Our Residential Approach
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/60 font-light leading-relaxed">
                We start with a detailed site visit and lifestyle discussion — how many people live in the home, how each room is actually used, storage needs, and budget.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {APPROACH_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="p-8 bg-[#141618] border border-white/10 rounded-2xl flex flex-col justify-between shadow-md"
                >
                  <div>
                    <span className="text-2xl font-light text-white/40 block mb-4 font-mono">
                      {step.step}
                    </span>
                    <h3 className="text-xl font-medium text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/60 font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global CTA */}
        <CTASection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
