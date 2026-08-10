import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ChecklistFeature from "@/components/ChecklistFeature";
import PropertyCards from "@/components/PropertyCards";
import ProjectRibbon from "@/components/ProjectRibbon";
import DarkStepCards from "@/components/DarkStepCards";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";

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
        <ChecklistFeature
          eyebrow="Scope of Design"
          title="What We Design"
          body="Whether you are outfitting a newly handed-over apartment or revitalizing an established family home, we deliver complete room-wise and full-home design solutions tailored to your routine."
          items={WHAT_WE_DESIGN}
          image="/images/jaiswal/jaiswal-03.jpg"
          imageAlt="Residential Living Room Interior"
        />

        {/* SECTION 2: Who We Design For (Warm Sand Background: #f3efea) */}
        <PropertyCards
          eyebrow="Tailored Solutions"
          title="Who We Design For"
          intro="Every property type has unique structural characteristics and municipal guidelines. We tailor our engineering and aesthetics accordingly."
          types={WHO_WE_DESIGN_FOR}
        />

        {/* SECTION 3: Residential Photography Ribbon (Photo Showcase) */}
        <ProjectRibbon
          eyebrow="Delivered Residences"
          title="Real Residential Projects in Delhi NCR"
          linkLabel="View All Projects"
          linkHref="/projects"
          photos={RESIDENTIAL_GALLERY}
        />

        {/* SECTION 4: Our Approach (Dark Obsidian Background: #0c0d0e) */}
        <DarkStepCards
          eyebrow="Execution Methodology"
          title="Our Residential Approach"
          intro="We start with a detailed site visit and lifestyle discussion — how many people live in the home, how each room is actually used, storage needs, and budget."
          steps={APPROACH_STEPS}
        />

        {/* Global CTA */}
        <CTASection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
