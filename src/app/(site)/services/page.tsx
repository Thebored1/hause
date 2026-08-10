import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ServicesShowcase from "@/components/ServicesShowcase";
import AssuranceRibbon from "@/components/AssuranceRibbon";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Interior Design Services in Delhi NCR | Hause Interiors",
  description:
    "Explore Hause Interiors' full range of interior design services in Delhi NCR — residential, commercial, modular kitchens, turnkey solutions and renovations.",
};


export default function ServicesPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Our Services"
          title="Interior design services that move with your life."
          subtitle="From a single room to a full office fit-out, every Hause Interiors project starts with how the space needs to function — then we design around it."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services" },
          ]}
          bgImage="/images/jaiswal/jaiswal-04.jpg"
          primaryCtaText="Book a Free Consultation"
          primaryCtaHref="/contact"
          secondaryCtaText="View Portfolio"
          secondaryCtaHref="/projects"
        />

        {/* Services Showcase (Alternating Visual Harmony) */}
        <ServicesShowcase />

        {/* SECTION: Material & Quality Assurance Ribbon (Warm Sand: #f3efea) */}
        <AssuranceRibbon />

        {/* Global CTA */}
        <CTASection bgImage="/images/jaiswal/jaiswal-03.jpg" />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
