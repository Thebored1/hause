"use client";

import React, { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleDone = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#141618] border border-white/15 p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors border-none cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <CheckCircle2 size={64} className="text-emerald-400 mb-4 animate-bounce" />
            <h3 className="m-0 text-2xl font-bold text-white">Inquiry Received</h3>
            <p className="mt-3 text-sm text-neutral-300 leading-relaxed max-w-sm">
              Thank you for reaching out! Our team will review your project details and get back to you within 24 hours to schedule your free consultation.
            </p>
            <button
              onClick={handleDone}
              className="mt-8 rounded-full bg-white text-black font-semibold text-sm px-8 py-3 hover:bg-neutral-200 transition-colors cursor-pointer border-none"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <span className="text-xs font-semibold tracking-[0.1em] text-neutral-400 uppercase">
              Free Consultation
            </span>
            <h3 className="mt-1 text-2xl font-bold text-white">
              Tell us about your space
            </h3>
            <p className="mt-1 text-xs text-neutral-400">
              We respond to every enquiry within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Ananya Sharma"
                  className="w-full rounded-xl bg-[#171717] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl bg-[#171717] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl bg-[#171717] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Gurugram, Haryana"
                    className="w-full rounded-xl bg-[#171717] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Project Type
                  </label>
                  <select className="w-full rounded-xl bg-[#171717] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 transition-colors appearance-none">
                    <option>Residential - Full Home</option>
                    <option>Residential - Specific Room(s)</option>
                    <option>Commercial / Office Fit-out</option>
                    <option>Modular Kitchen / Wardrobes</option>
                    <option>Renovation &amp; Remodeling</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Project Details / Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your space requirements, timeline, or preferred aesthetic..."
                  className="w-full rounded-xl bg-[#171717] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-white text-black font-semibold text-sm py-3.5 hover:bg-neutral-200 transition-colors cursor-pointer border-none shadow-lg"
              >
                Request Free Consultation
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
