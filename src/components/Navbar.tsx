"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Phone, Mail, ChevronDown, Sparkles, Home, Building2, UtensilsCrossed, Layers, Hammer } from "lucide-react";

interface NavbarProps {
  onOpenContact?: () => void;
}

export const SERVICE_ITEMS = [
  {
    title: "Residential Interior Design",
    href: "/services/residential-interior-design",
    desc: "Apartments, luxury penthouses & villas",
    icon: Home,
  },
  {
    title: "Commercial & Office Interiors",
    href: "/services/commercial-office-interior-design",
    desc: "Agile tech offices, studios & retail spaces",
    icon: Building2,
  },
  {
    title: "Modular Kitchens & Wardrobes",
    href: "/services/modular-kitchen-wardrobe-design",
    desc: "Precision German/Austrian hardware & acrylic finishes",
    icon: UtensilsCrossed,
  },
  {
    title: "Turnkey Interior Solutions",
    href: "/services/turnkey-interior-solutions",
    desc: "Complete concept-to-handover under one team",
    icon: Layers,
  },
  {
    title: "Renovation & Remodeling",
    href: "/services/renovation-remodeling",
    desc: "Structural wall removal, MEP overhauls & modern updates",
    icon: Hammer,
  },
];

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isServicePage = pathname.startsWith("/services");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Click outside to close desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: "PORTFOLIO", href: "/projects" },
    { label: "PROCESS", href: "/process" },
    { label: "WHY US", href: "/why-hause-interiors" },
    { label: "LOCATIONS", href: "/locations" },
    { label: "ABOUT", href: "/about" },
    { label: "FAQS", href: "/faqs" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled || !isHome || mobileMenuOpen
          ? "bg-[#0c0d0e]/95 backdrop-blur-md border-white/10 py-4 shadow-2xl"
          : "bg-transparent border-transparent py-7"
      }`}
    >
      <div className="max-w-[1408px] mx-auto px-6 sm:px-12 md:px-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          aria-label="Hause Interiors — Home"
          className="hover:opacity-90 transition-opacity shrink-0"
        >
          <Image
            src="/images/logo.png"
            alt="Hause Interiors"
            width={1060}
            height={235}
            priority
            className="h-7 sm:h-8 w-auto"
          />
        </Link>

        {/* Desktop Navigation (Visible on xl screens 1280px+) */}
        <nav className="hidden xl:flex items-center gap-7 2xl:gap-8 bg-transparent">
          {/* Services Dropdown Item */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <div className="flex items-center gap-1">
              <Link
                href="/services"
                className={`text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors whitespace-nowrap ${
                  isServicePage ? "text-white font-bold" : "text-[#d4d4d4]/70 hover:text-white"
                }`}
              >
                SERVICES
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setServicesDropdownOpen(!servicesDropdownOpen);
                }}
                className="text-white/60 hover:text-white transition-transform duration-200 focus:outline-none p-1 cursor-pointer"
                aria-label="Toggle Services Dropdown"
              >
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-300 ${servicesDropdownOpen ? "rotate-180 text-white" : ""}`}
                />
              </button>
            </div>

            {/* Desktop Mega / Flyout Dropdown Menu */}
            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 pt-3 w-[360px] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="bg-[#121316]/98 backdrop-blur-2xl border border-white/15 rounded-2xl p-3 shadow-2xl overflow-hidden">
                  <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40">
                      Design &amp; Build Services
                    </span>
                    <Sparkles size={11} className="text-white/40" />
                  </div>

                  <div className="space-y-1 py-1">
                    {SERVICE_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const isItemActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-all group ${
                            isItemActive
                              ? "bg-white/10 text-white"
                              : "text-white/80 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/20 transition-colors shrink-0 mt-0.5">
                            <Icon size={14} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold tracking-wide text-white group-hover:text-[#f3efea] transition-colors leading-tight">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-white/45 font-light line-clamp-1 mt-0.5">
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* All Services Footer Link */}
                  <div className="mt-1 pt-2 border-t border-white/10 px-2 pb-1">
                    <Link
                      href="/services"
                      className="flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <span>View All 5 Services</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Standard Navigation Links */}
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-semibold tracking-[0.18em] transition-colors uppercase whitespace-nowrap ${
                  isActive
                    ? "text-white font-bold"
                    : "text-[#d4d4d4]/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Consultation CTA + Hamburger Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Consultation Button */}
          <div className="hidden sm:flex items-center">
            {onOpenContact ? (
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 bg-[#f3efea] text-[#0c0d0e] px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.16em] uppercase hover:bg-white transition-all cursor-pointer border-none shadow-md whitespace-nowrap"
              >
                <span>Consultation</span>
                <ArrowUpRight size={13} />
              </button>
            ) : (
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#f3efea] text-[#0c0d0e] px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.16em] uppercase hover:bg-white transition-all shadow-md whitespace-nowrap"
              >
                <span>Consultation</span>
                <ArrowUpRight size={13} />
              </Link>
            )}
          </div>

          {/* Hamburger Menu Toggle Button (Visible on screens < 1280px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden inline-flex items-center justify-center p-2.5 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Responsive Hamburger Drawer Menu (< 1280px displays) */}
      {mobileMenuOpen && (
        <div className="xl:hidden w-full bg-[#0c0d0e]/98 backdrop-blur-2xl px-6 sm:px-12 py-8 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-3 duration-200 max-h-[85vh] overflow-y-auto">
          {/* Nav Items 2-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* First 6 Links: Portfolio, Process, Why Us, Locations, About, FAQs */}
            {navLinks.slice(0, 6).map((link) => {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl text-xs font-semibold tracking-[0.2em] uppercase transition-all flex items-center justify-between border border-transparent text-white/70 hover:text-white hover:bg-white/5"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={14} className="opacity-50" />
                </Link>
              );
            })}

            {/* SERVICES Accordion Item (Left Column - Highlighted) */}
            <div
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className={`p-3 rounded-xl text-xs font-semibold tracking-[0.2em] uppercase transition-all flex items-center justify-between border cursor-pointer ${
                isServicePage || mobileServicesOpen
                  ? "bg-white/15 text-white border-white/30 shadow-md"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/15"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>SERVICES</span>
                <span className="text-[10px] text-white/60 font-normal lowercase tracking-normal">(5)</span>
              </div>
              <ChevronDown
                size={15}
                className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180 text-white" : "text-white/80"}`}
              />
            </div>

            {/* CONTACT Link (Right Column next to SERVICES - Standard) */}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl text-xs font-semibold tracking-[0.2em] uppercase transition-all flex items-center justify-between border border-transparent text-white/70 hover:text-white hover:bg-white/5"
            >
              <span>CONTACT</span>
              <ArrowUpRight size={14} className="opacity-50" />
            </Link>

            {/* Expanded Services Dropdown (Spans full width across grid when open) */}
            {mobileServicesOpen && (
              <div className="sm:col-span-2 bg-[#141618] border border-white/15 rounded-2xl p-3 space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl">
                <div className="px-2 py-1 flex items-center justify-between border-b border-white/10 mb-1">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-white/40">
                    Select Service Discipline
                  </span>
                  <Sparkles size={11} className="text-white/40" />
                </div>

                {SERVICE_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isItemActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                        isItemActive
                          ? "bg-white/15 text-white"
                          : "text-white/80 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 shrink-0 mt-0.5">
                        <Icon size={14} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold tracking-wide text-white leading-tight">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-white/45 font-light line-clamp-1 mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  );
                })}

                <div className="pt-2 border-t border-white/10 px-1">
                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <span>View All 5 Services Overview</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Studio Info & Consultation in Mobile Drawer */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 text-xs text-white/50">
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-white/40" />
                <a href="tel:+919899204333" className="hover:text-white transition-colors">
                  +91 98992 04333
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-white/40" />
                <a href="mailto:info@hause.co.in" className="hover:text-white transition-colors">
                  info@hause.co.in
                </a>
              </div>
            </div>

            {onOpenContact ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full sm:w-auto text-center px-7 py-3 bg-[#f3efea] text-[#0c0d0e] text-xs font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors rounded-full cursor-pointer border-none shadow-lg shrink-0"
              >
                Book Free Consultation
              </button>
            ) : (
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full sm:w-auto text-center px-7 py-3 bg-[#f3efea] text-[#0c0d0e] text-xs font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors rounded-full shadow-lg shrink-0"
              >
                Book Free Consultation
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
