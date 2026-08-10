import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import RatingBar from "@/components/RatingBar";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import PhotoStrip from "@/components/PhotoStrip";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials | Hause Interiors Delhi NCR",
  description:
    "Read what homeowners and businesses across Delhi NCR say about working with Hause Interiors for their interior design projects.",
};

export default function TestimonialsPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Client Stories"
          title="What clients say about working with us."
          subtitle="Real reviews from homeowners and business leaders across Delhi NCR who trusted Hause Interiors with their residential and commercial spaces."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Testimonials" },
          ]}
          bgImage="/images/jaiswal/jaiswal-14.jpg"
          primaryCtaText="Book a Free Consultation"
          primaryCtaHref="/contact"
          secondaryCtaText="View Portfolio"
          secondaryCtaHref="/projects"
        />

        {/* SECTION 1: Rating Summary Bar (Warm Sand: #f3efea) */}
        <RatingBar />

        {/* SECTION 2: Testimonials Grid (Crisp Light Ivory Background: #f9f8f6) */}
        <TestimonialsGrid />

        {/* SECTION 3: Completed Spaces Snapshot (Dark Obsidian Background: #0c0d0e) */}
        <PhotoStrip />

        {/* Global CTA */}
        <CTASection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
