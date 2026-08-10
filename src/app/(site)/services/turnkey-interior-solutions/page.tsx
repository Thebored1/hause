import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import StageGrid from "@/components/StageGrid";
import IconCards from "@/components/IconCards";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Turnkey Interior Solutions Delhi NCR | Hause Interiors",
  description:
    "End-to-end turnkey interior design and execution in Delhi NCR — one team handling design, civil, electrical, carpentry, paint and styling with zero hassle.",
};

const TURNKEY_STAGES = [
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
    // Odd one out — spans the full row rather than leaving a gap.
    wide: true,
  },
];

const WHO_IS_IT_FOR = [
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
];

export default function TurnkeyServicePage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Turnkey Solutions"
          title="One design partner. Zero coordination headaches."
          subtitle="Managing an interior project shouldn't feel like a full-time job. Hause Interiors delivers complete turnkey interior solutions across Delhi NCR — from design concept to final handover, managed by one team under one timeline."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Turnkey Interior Solutions" },
          ]}
          bgImage="/images/jaiswal/jaiswal-07.jpg"
          primaryCtaText="Book a Turnkey Consultation"
          primaryCtaHref="/contact"
          secondaryCtaText="View Our Projects"
          secondaryCtaHref="/projects"
        />

        {/* SECTION 1: What's Included (Crisp Light Ivory Background: #f9f8f6) */}
        <StageGrid
          eyebrow="End-to-End Scope"
          title="What's Included in Our Turnkey Service"
          intro="We take total responsibility for your site from day one to key handover."
          stages={TURNKEY_STAGES}
        />

        {/* SECTION 2: Ideal For (Warm Sand Background: #f3efea) */}
        <IconCards
          eyebrow="Ideal For"
          title="Who Is Turnkey Right For?"
          cards={WHO_IS_IT_FOR}
          titleTracking="normal"
        />

        {/* Global CTA */}
        <CTASection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
