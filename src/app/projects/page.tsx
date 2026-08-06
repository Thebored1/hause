import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ProjectFilterGrid from "@/components/ProjectFilterGrid";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Interior Design Projects & Portfolio | Hause Interiors",
  description:
    "Browse residential and commercial interior design projects by Hause Interiors across Delhi NCR — homes, offices, retail and hospitality spaces.",
};

export default function ProjectsPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Design Portfolio"
          title="Spaces we've designed and delivered."
          subtitle="Browse residential and commercial interior design projects across Delhi NCR — apartments, luxury villas, tech workspaces, modular kitchens, and structural renovations."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Projects & Portfolio" },
          ]}
          bgImage="/images/jaiswal/jaiswal-04.jpg"
          primaryCtaText="Start Your Own Project"
          primaryCtaHref="/contact"
          secondaryCtaText="Explore Services"
          secondaryCtaHref="/services"
        />

        {/* Filterable Portfolio Grid Section */}
        <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#0c0d0e]">
          <div className="max-w-[1408px] mx-auto">
            <ProjectFilterGrid />
          </div>
        </section>

        {/* Global CTA */}
        <CTASection bgImage="/images/jaiswal/jaiswal-33.jpg" />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
