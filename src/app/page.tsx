"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSpaceSwitcher from "@/components/HeroSpaceSwitcher";
import ServicesGrid from "@/components/ServicesGrid";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import ProcessTimeline from "@/components/ProcessTimeline";
import WhyUs from "@/components/WhyUs";
import LocationsGrid from "@/components/LocationsGrid";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        {/* Floating Header Navbar */}
        <Navbar onOpenContact={() => setContactModalOpen(true)} />

        {/* Hero Section with Interactive Space Switcher */}
        <HeroSpaceSwitcher onOpenContact={() => setContactModalOpen(true)} />

        {/* Services Grid */}
        <ServicesGrid onOpenContact={() => setContactModalOpen(true)} />

        {/* Portfolio Showcase */}
        <PortfolioShowcase />

        {/* Process Timeline */}
        <ProcessTimeline />

        {/* Why Us Differentiators */}
        <WhyUs />

        {/* Locations Coverage Grid */}
        <LocationsGrid />

        {/* CTA Get Started Section */}
        <CTASection onOpenContact={() => setContactModalOpen(true)} />

        {/* Footer */}
        <Footer />

        {/* Interactive Contact Inquiry Modal */}
        <ContactModal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
        />
      </main>
    </SmoothScroll>
  );
}
