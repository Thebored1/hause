import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import RegionsDirectory from "@/components/RegionsDirectory";
import PromoBanner from "@/components/PromoBanner";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Interior Designers in Delhi NCR | Gurugram, Noida, Ghaziabad, Faridabad",
  description:
    "Hause Interiors delivers residential and commercial interior design across Delhi NCR — Delhi, Gurugram, Noida, Ghaziabad, Faridabad — with select projects pan-India.",
};

export default function LocationsPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0c0d0e] text-[#f3efea] selection:bg-[#171717] selection:text-[#f3efea]">
        <Navbar />

        {/* Page Hero with Cinematic Backdrop */}
        <PageHero
          badge="Service Locations"
          title="Interior designers near you — across Delhi NCR."
          subtitle="Hause Interiors is headquartered in Ghaziabad and works across the National Capital Region with hands-on, on-ground project management. Here's where we're active."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Locations" },
          ]}
          bgImage="/images/jaiswal/jaiswal-08.jpg"
          primaryCtaText="Check Your City / Book Consultation"
          primaryCtaHref="/contact"
          secondaryCtaText="Explore Services"
          secondaryCtaHref="/services"
        />

        {/* SECTION 1: Locations Directory (Crisp Light Ivory Background: #f9f8f6) */}
        <RegionsDirectory />

        {/* SECTION 2: Physical Studio & Materials (Warm Sand Background: #f3efea) */}
        <PromoBanner
          eyebrow="Central Studio"
          title="Visit Our Ghaziabad Studio & Material Library"
          body="2nd A 255 Nehru Nagar, Ghaziabad, 201001, U.P. Experience material samples, laminate swatches, quartz stones, and hardware mockups in person."
          ctaLabel="Schedule Visit"
          ctaHref="/contact"
          spacing="loose"
          cardShadow="md"
          showArrow={false}
        />

        {/* Global CTA */}
        <CTASection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
