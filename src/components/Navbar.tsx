"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-40 w-full max-w-[1408px] mx-auto px-6 sm:px-12 md:px-16 pt-10 pb-4 flex items-center justify-between bg-transparent">
      <Link
        href="#"
        className="text-[28px] font-medium tracking-[-0.02em] text-white hover:opacity-90 transition-opacity"
      >
        Hause
      </Link>

      {/* Transparent Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-12 bg-transparent">
        <Link
          href="#overview"
          className="text-[12px] font-semibold tracking-[0.22em] text-[#d4d4d4] hover:text-white transition-colors uppercase"
        >
          SERVICES
        </Link>
        <Link
          href="#work"
          className="text-[12px] font-semibold tracking-[0.22em] text-[#d4d4d4] hover:text-white transition-colors uppercase"
        >
          PORTFOLIO
        </Link>
        <Link
          href="#process"
          className="text-[12px] font-semibold tracking-[0.22em] text-[#d4d4d4] hover:text-white transition-colors uppercase"
        >
          PROCESS
        </Link>
        <button
          onClick={onOpenContact}
          className="text-[12px] font-semibold tracking-[0.22em] text-[#d4d4d4] hover:text-white transition-colors uppercase bg-transparent border-none p-0 cursor-pointer font-inherit"
        >
          CONTACT
        </button>
      </nav>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-white p-2 focus:outline-none bg-transparent"
        aria-label="Toggle Navigation Menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#141618]/95 backdrop-blur-md border-b border-white/10 px-8 py-6 flex flex-col gap-5 md:hidden z-50 shadow-2xl">
          <Link
            href="#overview"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-semibold tracking-[0.22em] text-[#d4d4d4] hover:text-white uppercase"
          >
            SERVICES
          </Link>
          <Link
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-semibold tracking-[0.22em] text-[#d4d4d4] hover:text-white uppercase"
          >
            PORTFOLIO
          </Link>
          <Link
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-semibold tracking-[0.22em] text-[#d4d4d4] hover:text-white uppercase"
          >
            PROCESS
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="text-left text-xs font-semibold tracking-[0.22em] text-[#d4d4d4] hover:text-white uppercase bg-transparent border-none p-0 cursor-pointer"
          >
            CONTACT
          </button>
        </div>
      )}
    </header>
  );
}
