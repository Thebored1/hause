import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ChecklistFeature from "@/components/ChecklistFeature";
import NumberedCards from "@/components/NumberedCards";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Home Renovation & Remodeling in Delhi NCR | Hause Interiors",
  description:
    "Expert home, kitchen and bathroom renovations across Delhi NCR — modernizing older homes, improving layouts, and upgrading MEP with minimal disruption.",
};

const RENOVATION_SERVICES = [
  "Full-home structural & cosmetic renovations",
  "Modular kitchen modernizations & layout expansions",
  "Luxury bathroom remodels with thermostatic fixtures",
  "Flooring upgrades (Italian marble, tiles, engineered wood)",
  "Full electrical re-wiring & plumbing replacement",
  "Structural partition removals & beam reinforcements",
  "Custom carpentry, false ceilings & door replacements",
  "Balcony waterproofings & sunroom enclosures",
];

const OCCUPIED_STRATEGIES = [
  {
    title: "Phased Zone-Wise Execution",
    desc: "We seal off active work zones with dust barriers and tackle rooms sequentially so your daily living isn't completely upended.",
  },
  {
    title: "Strict Noise Time-Boxing",
    desc: "Heavy civil demolition and tile cutting are strictly restricted to permitted society hours (10:00 AM – 5:00 PM).",
  },
  {
    title: "Daily Site Cleanups",
    desc: "Debris and construction waste are cleared daily, keeping hallways, elevators, and living areas neat and presentable.",
  },
];

export default function RenovationServicePage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Renovation & Remodeling"
          title="Give your space a second life."
          subtitle="You don't always need a new home to get the space you want. Hause Interiors renovates and remodels residential and commercial properties across Delhi NCR — modernising older layouts, upgrading electrical and plumbing, and delivering fresh aesthetics with minimal disruption."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Renovation & Remodeling" },
          ]}
          bgImage="/images/jaiswal/jaiswal-13.jpg"
          primaryCtaText="Plan Your Renovation"
          primaryCtaHref="/contact"
          secondaryCtaText="View Renovation Projects"
          secondaryCtaHref="/projects"
        />

        {/* SECTION 1: Renovation Scope (Crisp Light Ivory Background: #f9f8f6) */}
        <ChecklistFeature
          eyebrow="Revitalize & Modernize"
          title="What We Renovate"
          body="From targeted single-room overhauls to full structural renovations of decades-old homes in Delhi NCR."
          items={RENOVATION_SERVICES}
          image="/images/service-renovation.jpg"
          imageAlt="Bathroom and Living Renovation"
        />

        {/* SECTION 2: Living Through A Remodel (Warm Sand Background: #f3efea) */}
        <NumberedCards
          eyebrow="Living Through A Remodel"
          title="Renovating in Occupied Spaces"
          intro="If you are living in the home while remodeling takes place, we follow strict dust-containment and noise-mitigation protocols."
          cards={OCCUPIED_STRATEGIES}
        />

        {/* Global CTA */}
        <CTASection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
