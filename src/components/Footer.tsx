"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#08090a] text-white/70 py-20 px-6 sm:px-12 md:px-16 border-t border-white/10">
      <div className="max-w-[1408px] mx-auto flex flex-col gap-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <Link
              href="/"
              aria-label="Hause Interiors — Home"
              className="inline-block hover:opacity-90 transition-opacity"
            >
              <Image
                src="/images/footer-logo.png"
                alt="Hause Interiors"
                width={331}
                height={310}
                className="h-36 sm:h-44 w-auto"
              />
            </Link>
          </div>

          {/* Services Col */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/90">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <Link href="/services/residential-interior-design" className="hover:text-white transition-colors">
                  Residential Design
                </Link>
              </li>
              <li>
                <Link href="/services/commercial-office-interior-design" className="hover:text-white transition-colors">
                  Commercial &amp; Office
                </Link>
              </li>
              <li>
                <Link href="/services/modular-kitchen-wardrobe-design" className="hover:text-white transition-colors">
                  Modular Kitchens &amp; Wardrobes
                </Link>
              </li>
              <li>
                <Link href="/services/turnkey-interior-solutions" className="hover:text-white transition-colors">
                  Turnkey Interior Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/renovation-remodeling" className="hover:text-white transition-colors">
                  Renovation &amp; Remodeling
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/80 hover:text-white inline-flex items-center gap-1 pt-1 font-medium">
                  View All Services <ArrowUpRight size={12} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Col */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/90">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Portfolio / Projects
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-white transition-colors">
                  Our 5-Step Process
                </Link>
              </li>
              <li>
                <Link href="/why-hause-interiors" className="hover:text-white transition-colors">
                  Why Hause Interiors
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-white transition-colors">
                  Locations We Serve
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-white transition-colors">
                  Client Testimonials
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/90">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Studio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact &amp; Enquiry
                </Link>
              </li>
              <li>
                <a href="https://hause.co.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  Hause Digital Practice <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>

            <div className="space-y-3 pt-2 border-t border-white/10 text-xs text-white/60">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-white/40 shrink-0 mt-0.5" />
                <span>2nd A 255 Nehru Nagar, Ghaziabad, 201001, U.P.</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-white/40 shrink-0" />
                <a href="tel:+919899204333" className="hover:text-white transition-colors">
                  +91 98992 04333
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-white/40 shrink-0" />
                <a href="mailto:info@hause.co.in" className="hover:text-white transition-colors">
                  info@hause.co.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            &copy; {currentYear} Hause Interiors. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Headquartered in Ghaziabad, Delhi NCR</span>
            <span>•</span>
            <span>Delivering Pan-India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
