import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PillarsGrid from "@/components/PillarsGrid";
import ComparisonColumns from "@/components/ComparisonColumns";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Why Choose Hause Interiors | Interior Design Company Delhi NCR",
  description:
    "Transparent costing, single-point accountability, and on-time delivery — here's why homeowners and businesses across Delhi NCR choose Hause Interiors.",
};

export default function WhyHausePage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Why Choose Hause"
          title="More than a design studio — a space partner."
          subtitle="Anyone can make a space look good in a render. What's harder is delivering it on time, on budget, and exactly as designed. That's the gap Hause Interiors is built to close."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Why Us" },
          ]}
          bgImage="/images/jaiswal/jaiswal-02.jpg"
          primaryCtaText="Talk to Us About Your Project"
          primaryCtaHref="/contact"
          secondaryCtaText="Explore Our Work"
          secondaryCtaHref="/projects"
        />

        {/* SECTION 1: 5 Pillars (Crisp Light Ivory Background: #f9f8f6) */}
        <PillarsGrid />

        {/* SECTION 2: Comparison (Warm Sand Background: #f3efea) */}
        <ComparisonColumns />

        {/* Global CTA */}
        <CTASection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
