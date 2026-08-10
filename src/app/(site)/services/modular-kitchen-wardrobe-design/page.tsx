import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import LayoutCards from "@/components/LayoutCards";
import SpecFeature from "@/components/SpecFeature";
import DarkCardGrid from "@/components/DarkCardGrid";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Modular Kitchen & Wardrobe Designers Delhi NCR | Hause Interiors",
  description:
    "Custom modular kitchens and wardrobes in Delhi NCR — straight, L-shaped, U-shaped and island kitchens; sliding, hinged and walk-in wardrobes built with BWP marine-grade plywood and premium hardware.",
};


const KITCHEN_LAYOUTS = [
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
];

const WARDROBE_TYPES = [
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
];

const MATERIALS = [
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
];

export default function ModularKitchenServicePage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Kitchens & Wardrobes"
          title="Kitchens and wardrobes built to actually hold your life."
          subtitle="Storage needs to be engineered around the way you cook, dress, and live. Hause Interiors designs and executes precision modular kitchens and customized wardrobe systems across Delhi NCR using marine-grade materials and premium hardware."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Modular Kitchen & Wardrobe Design" },
          ]}
          bgImage="/images/jaiswal/jaiswal-18.jpg"
          primaryCtaText="Design Your Kitchen"
          primaryCtaHref="/contact"
          secondaryCtaText="View Kitchen Portfolio"
          secondaryCtaHref="/projects"
        />

        {/* SECTION 1: Kitchen Layouts (Crisp Light Ivory Background: #f9f8f6) */}
        <LayoutCards
          eyebrow="Ergonomics & Work Triangle"
          title="Modular Kitchen Layouts"
          intro="Every layout is tailored to your cooking habits, appliance requirements, and spatial dimensions."
          options={KITCHEN_LAYOUTS}
        />

        {/* SECTION 2: Materials & Hardware (Warm Sand Background: #f3efea) */}
        <SpecFeature
          eyebrow="Engineered for Longevity"
          title="Materials & Hardware That Endure"
          body="Indian cooking demands materials that withstand moisture, heat, and turmeric stains. We never compromise on core marine-grade plywood or branded German/Austrian hardware."
          specs={MATERIALS}
          image="/images/jaiswal/jaiswal-21.jpg"
          imageAlt="Modular Kitchen Detail & Quartz Worktop"
        />

        {/* SECTION 3: Custom Wardrobes (Dark Obsidian Background: #0c0d0e) */}
        <DarkCardGrid
          eyebrow="Bespoke Storage"
          title="Custom Wardrobe Systems"
          intro="Wardrobe interiors customized down to the millimeter for your specific collection of garments, accessories, shoes, and jewelry."
          cards={WARDROBE_TYPES}
        />

        {/* Global CTA */}
        <CTASection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
