import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Hause Interiors Delhi NCR",
  description:
    "Answers to common questions about interior design costs, timelines, process and execution in Delhi NCR and pan-India with Hause Interiors.",
};

export default function FAQsPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Frequently Asked Questions"
          title="Clear, honest answers about working with us."
          subtitle="Everything you want to know before reaching out — how we work, what things cost, timelines, site supervision, and post-handover support."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "FAQs" },
          ]}
          bgImage="/images/jaiswal/jaiswal-15.jpg"
          primaryCtaText="Book a Free Consultation"
          primaryCtaHref="/contact"
          secondaryCtaText="See Our Process"
          secondaryCtaHref="/process"
        />

        {/* SECTION 1: FAQ Accordion (Crisp Light Ivory Background: #f9f8f6) */}
        <FAQSection />

        {/* Global CTA */}
        <CTASection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
