import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import SmoothScroll from "@/components/SmoothScroll";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

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
        <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
          <div className="max-w-[1000px] mx-auto space-y-16">
            <FAQAccordion theme="light" />

            {/* Still have questions card (Warm Sand: #f3efea) */}
            <div className="p-8 sm:p-10 bg-[#f3efea] border border-black/10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-xl font-medium text-[#18181b]">Have a specific question not answered here?</h3>
                <p className="text-xs sm:text-sm text-[#6b6559] font-normal">
                  Our design directors are happy to answer your specific spatial, timeline, or material queries.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#18181b] text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors rounded-full shadow-lg shrink-0"
              >
                <MessageSquare size={14} />
                <span>Ask Us Directly</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Global CTA */}
        <CTASection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
