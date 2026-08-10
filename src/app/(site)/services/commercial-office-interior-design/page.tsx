import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CardListFeature from "@/components/CardListFeature";
import IconCards from "@/components/IconCards";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Commercial & Office Interior Designers in Delhi NCR | Hause Interiors",
  description:
    "Commercial, office, retail and hospitality interior design and turnkey fit-outs in Delhi NCR — designed for team productivity, brand presence, and minimal downtime.",
};

const COMMERCIAL_TYPES = [
  {
    title: "Corporate Offices & Tech Workspaces",
    desc: "Agile desks, private acoustic focus booths, boardrooms, and open collaboration areas built for high-performing teams.",
  },
  {
    title: "Co-Working & Managed Spaces",
    desc: "Flexible, high-density layouts optimized for spatial efficiency, hot-desking, shared breakout lounges, and community cafes.",
  },
  {
    title: "Retail Stores & Brand Showrooms",
    desc: "Customer-first spatial flow, spotlight display fixtures, seamless POS zones, and luxury trial rooms that elevate brand perception.",
  },
  {
    title: "Cafes, Restaurants & Dining Spaces",
    desc: "Atmospheric layered lighting, acoustic control, ergonomic seating, commercial kitchen layouts, and guest circulation planning.",
  },
  {
    title: "Clinics & Professional Practice Studios",
    desc: "Hygienic, anti-microbial finishes, calming reception waiting lounges, sound-isolated consultation chambers, and organized utility storage.",
  },
];

const COMMERCIAL_PILLARS = [
  {
    title: "Minimal Disruption & Fast Delivery",
    desc: "We understand that business downtime costs money. We plan phased fit-outs, weekend work schedules, and pre-fabricated modular joinery to minimize handover delays.",
    icon: "clock",
  },
  {
    title: "Brand-First Design",
    desc: "Your workspace is the physical expression of your company culture and values. We integrate your brand identity into materials, signage, and environmental design.",
    icon: "layout-grid",
  },
  {
    title: "Integrated MEP & Acoustic Planning",
    desc: "HVAC distribution, structured data cabling, emergency lighting, and acoustic dampening are planned seamlessly alongside aesthetic elements.",
    icon: "zap",
  },
];

export default function CommercialServicePage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Commercial & Office"
          title="Workspaces that work as hard as your team."
          subtitle="An office is not just desks and chairs — it's where your team collaborates, your clients form impressions, and your culture is lived. Hause Interiors delivers commercial interiors across Delhi NCR designed for productivity and brand impact."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Commercial & Office" },
          ]}
          bgImage="/images/service-commercial.jpg"
          primaryCtaText="Discuss Your Office Fit-Out"
          primaryCtaHref="/contact"
          secondaryCtaText="View Commercial Portfolio"
          secondaryCtaHref="/projects"
        />

        {/* SECTION 1: Commercial Scope (Crisp Light Ivory Background: #f9f8f6) */}
        <CardListFeature
          eyebrow="Tailored Commercial Solutions"
          title="Spaces We Design & Fit Out"
          body="From fast-scaling tech companies to bespoke luxury retail showrooms, we provide full turnkey fit-out and architectural interior services."
          cards={COMMERCIAL_TYPES}
          image="/images/service-commercial.jpg"
          imageAlt="Modern Tech Office Fit-Out"
        />

        {/* SECTION 2: Why Businesses Choose Hause (Warm Sand Background: #f3efea) */}
        <IconCards
          eyebrow="Commercial Advantage"
          title="Why Businesses Choose Hause Interiors"
          intro="We treat commercial projects with strict project governance, clear milestones, and complete fiscal transparency."
          cards={COMMERCIAL_PILLARS}
        />

        {/* Global CTA */}
        <CTASection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
