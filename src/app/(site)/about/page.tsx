import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import StudioStory from "@/components/StudioStory";
import PhilosophyGrid from "@/components/PhilosophyGrid";
import TeamNetwork from "@/components/TeamNetwork";
import GalleryRibbon from "@/components/GalleryRibbon";
import ValuesGrid from "@/components/ValuesGrid";
import ReachBar from "@/components/ReachBar";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "About Hause Interiors | Interior Design Studio Delhi NCR",
  description:
    "Learn about Hause Interiors — our story, design philosophy, in-house team, and how we bring architectural rigor and transparent execution to homes and workspaces across Delhi NCR and pan-India.",
};


export default function AboutPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="About Hause Interiors"
          title="Spaces designed with purpose. Delivered with precision."
          subtitle="We are an interior design and turnkey execution studio based in Delhi NCR. We bridge the gap between high-end architectural design and disciplined on-ground delivery."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "About Us" },
          ]}
          bgImage="/images/jaiswal/jaiswal-01.jpg"
          primaryCtaText="Book a Free Consultation"
          primaryCtaHref="/contact"
          secondaryCtaText="View Our Work"
          secondaryCtaHref="/projects"
        />

        {/* SECTION 1: Studio Story (Crisp Light Ivory Background: #f9f8f6) */}
        <StudioStory />

        {/* SECTION 2: Guiding Principles (Warm Sand / Stone Beige Background: #f3efea) */}
        <PhilosophyGrid />

        {/* SECTION 3: Execution Network & Craftsmanship (Dark Obsidian: #0c0d0e) */}
        <TeamNetwork />

        {/* SECTION 4: Visual Gallery Ribbon (Photo Showcase from Jaiswal Portfolio) */}
        <GalleryRibbon />

        {/* SECTION 5: Values Grid (Crisp Light Ivory Background: #f9f8f6) */}
        <ValuesGrid />

        {/* Where We Work Overview */}
        <ReachBar />

        {/* Global CTA */}
        <CTASection bgImage="/images/jaiswal/jaiswal-01.jpg" />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
