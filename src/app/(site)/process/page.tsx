import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ProcessDeepDive from "@/components/ProcessDeepDive";
import CommitmentBar from "@/components/CommitmentBar";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Our Interior Design Process | Hause Interiors Delhi NCR",
  description:
    "From first consultation to final handover — see how Hause Interiors plans, designs and executes interior projects in Delhi NCR and pan-India.",
};

export default function ProcessPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Our Delivery Process"
          title="A process built for spaces that get delivered on time."
          subtitle="Interior projects go over budget and past deadline when there's no single process holding them together. Here's how we structure ours."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Our Process" },
          ]}
          bgImage="/images/jaiswal/jaiswal-09.jpg"
          primaryCtaText="Start With a Discovery Call"
          primaryCtaHref="/contact"
          secondaryCtaText="View Portfolio"
          secondaryCtaHref="/projects"
        />

        {/* 5-Step Process Deep Dive (Alternating Rich Themes) */}
        <ProcessDeepDive />

        {/* SECTION: Strict Quality & Transparency (Warm Sand: #f3efea) */}
        <CommitmentBar />

        {/* Global CTA */}
        <CTASection bgImage="/images/jaiswal/jaiswal-24.jpg" />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
