import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import SmoothScroll from "@/components/SmoothScroll";
import { Phone, Mail, MapPin, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Hause Interiors | Book an Interior Design Consultation",
  description:
    "Get in touch with Hause Interiors. Book a free consultation for your home, office, or commercial interior project in Delhi NCR or pan-India.",
};

const NEXT_STEPS = [
  {
    step: "01",
    title: "24-Hour Review",
    desc: "We review your requirements and reach out within 24 hours to schedule a discovery discussion.",
  },
  {
    step: "02",
    title: "Discovery Call or Site Visit",
    desc: "We conduct an in-depth conversation or physical site measurement to understand your vision and constraints.",
  },
  {
    step: "03",
    title: "Concept & Ballpark Estimate",
    desc: "We share a preliminary spatial concept and transparent ballpark estimate — completely free of charge.",
  },
];

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
        <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            {/* Left: Direct Info & Next Steps */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              {/* Studio Info Section */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                    Studio &amp; Direct Details
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-normal text-[#18181b] tracking-tight">
                    Reach our design directors directly.
                  </h2>
                  <p className="text-sm text-[#6b6559] font-normal leading-relaxed">
                    We look forward to discussing your upcoming residential or commercial project. Reach out by phone, email, or visit our studio in Ghaziabad.
                  </p>
                </div>

                {/* Direct Info List */}
                <div className="space-y-4 border-t border-black/10 pt-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#18181b] shrink-0 shadow-sm">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="text-xs text-[#8a8578] uppercase tracking-wider block font-semibold">Phone / WhatsApp</span>
                      <a
                        href="tel:+918006559900"
                        className="text-base font-medium text-[#18181b] hover:text-black transition-colors"
                      >
                        +91 80065 59900
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#18181b] shrink-0 shadow-sm">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="text-xs text-[#8a8578] uppercase tracking-wider block font-semibold">Email Inquiries</span>
                      <a
                        href="mailto:interiors@hause.agency"
                        className="text-base font-medium text-[#18181b] hover:text-black transition-colors"
                      >
                        interiors@hause.agency
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#18181b] shrink-0 shadow-sm">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="text-xs text-[#8a8578] uppercase tracking-wider block font-semibold">Office &amp; Material Studio</span>
                      <p className="text-sm text-[#18181b] leading-relaxed m-0 font-normal">
                        2nd A 255 Nehru Nagar,<br />
                        Ghaziabad, 201001, Uttar Pradesh
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#18181b] shrink-0 shadow-sm">
                      <Clock size={18} />
                    </div>
                    <div>
                      <span className="text-xs text-[#8a8578] uppercase tracking-wider block font-semibold">Working Hours</span>
                      <p className="text-sm text-[#18181b] leading-relaxed m-0 font-normal">
                        Monday – Saturday: 10:00 AM – 7:00 PM IST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Happens Next - Stretches dynamically to match Form height */}
              <div className="border-t border-black/10 pt-5 flex-1 flex flex-col justify-between mt-4">
                <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase block mb-3">
                  What Happens Next?
                </span>
                <div className="flex-1 flex flex-col justify-between gap-3">
                  {NEXT_STEPS.map((s) => (
                    <div key={s.step} className="p-4 bg-white border border-black/10 rounded-2xl shadow-sm flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-[#8a8578] font-semibold">{s.step}</span>
                        <h4 className="text-sm font-medium text-[#18181b]">{s.title}</h4>
                      </div>
                      <p className="text-xs text-[#6b6559] font-normal leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Comprehensive Interactive Form */}
            <div className="lg:col-span-7 h-full flex flex-col">
              <ContactForm theme="light" />
            </div>
          </div>
        </section>

        {/* SECTION 2: Studio Location (Warm Sand Background: #f3efea) */}
        <section className="py-20 px-6 sm:px-12 md:px-16 bg-[#f3efea] text-[#18181b] border-t border-black/10">
          <div className="max-w-[1280px] mx-auto p-8 sm:p-12 bg-white border border-black/10 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-sm">
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs font-semibold tracking-[0.22em] text-[#8a8578] uppercase">
                In-Person Consultations
              </span>
              <h3 className="text-2xl sm:text-3xl font-normal text-[#18181b]">
                Visit Our Studio &amp; Experience Materials Hands-On
              </h3>
              <p className="text-sm text-[#6b6559] font-normal leading-relaxed max-w-2xl">
                Feel high-gloss acrylics, touch textured fluted panels, inspect soft-close German tandem boxes, and compare quartz stone samples before making design decisions.
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <a
                href="https://maps.google.com/?q=2nd+A+255+Nehru+Nagar+Ghaziabad"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-[#18181b] text-white text-xs font-bold tracking-[0.16em] uppercase hover:bg-black transition-colors rounded-full shadow-lg inline-flex items-center gap-2"
              >
                <span>Open in Maps</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
