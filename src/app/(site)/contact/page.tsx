import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactDetails from "@/components/ContactDetails";
import PromoBanner from "@/components/PromoBanner";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Contact Hause Interiors | Book an Interior Design Consultation",
  description:
    "Get in touch with Hause Interiors. Book a free consultation for your home, office, or commercial interior project in Delhi NCR or pan-India.",
};

export default function ContactPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Get in Touch"
          title="Let's talk about your space."
          subtitle="Whether you have a project ready to start or just want to explore ideas and ballpark budgets, we're happy to connect. No pressure, no hard sell."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Contact Us" },
          ]}
          bgImage="/images/jaiswal/jaiswal-01.jpg"
        />

        {/* SECTION 1: Contact Details & Interactive Form (Crisp Light Ivory: #f9f8f6) */}
        <ContactDetails />

        {/* SECTION 2: Studio Location (Warm Sand Background: #f3efea) */}
        <PromoBanner />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
