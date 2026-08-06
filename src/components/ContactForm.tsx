"use client";

import React, { useState } from "react";
import { CheckCircle2, ArrowRight, Clock, ShieldCheck } from "lucide-react";

interface ContactFormProps {
  theme?: "light" | "dark";
}

export default function ContactForm({ theme = "dark" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    projectType: "Residential",
    budgetRange: "₹15L - ₹30L",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const isLight = theme === "light";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div
        className={`rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center shadow-xl ${
          isLight
            ? "bg-white border border-black/10 text-[#18181b]"
            : "bg-[#141618] border border-white/15 text-[#f3efea]"
        }`}
      >
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md ${
            isLight
              ? "bg-[#18181b] text-white"
              : "bg-white/10 text-white border border-white/20"
          }`}
        >
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl sm:text-3xl font-medium tracking-tight">
          Thank You, {formData.fullName || "Friend"}!
        </h3>
        <p
          className={`mt-3 text-sm sm:text-base max-w-md font-normal leading-relaxed ${
            isLight ? "text-[#6b6559]" : "text-white/70 font-light"
          }`}
        >
          Your project inquiry has been received. Our senior design team will review your requirements and get back to you within 24 hours with a free consultation slot.
        </p>
        <div
          className={`mt-8 flex items-center gap-6 text-xs border-t pt-6 ${
            isLight ? "border-black/10 text-[#8a8578]" : "border-white/10 text-white/50"
          }`}
        >
          <div className="flex items-center gap-2">
            <Clock size={14} className={isLight ? "text-[#18181b]" : "text-white/60"} />
            <span>24h Response Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className={isLight ? "text-[#18181b]" : "text-white/60"} />
            <span>Confidential &amp; Direct</span>
          </div>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              fullName: "",
              email: "",
              phone: "",
              city: "",
              projectType: "Residential",
              budgetRange: "₹15L - ₹30L",
              message: "",
            });
          }}
          className={`mt-8 px-6 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors rounded-full cursor-pointer border-none shadow-md ${
            isLight
              ? "bg-[#18181b] text-white hover:bg-black"
              : "bg-white/10 hover:bg-white/20 text-white"
          }`}
        >
          Send Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-3xl p-6 sm:p-10 flex flex-col gap-6 shadow-xl ${
        isLight
          ? "bg-white border border-black/10 text-[#18181b]"
          : "bg-[#141618] border border-white/10 text-[#f3efea]"
      }`}
    >
      <div className={`border-b pb-4 ${isLight ? "border-black/10" : "border-white/10"}`}>
        <h3 className="text-xl sm:text-2xl font-medium">
          Send an Enquiry
        </h3>
        <p
          className={`mt-1 text-xs sm:text-sm ${
            isLight ? "text-[#6b6559] font-normal" : "text-white/50 font-light"
          }`}
        >
          Tell us about your space. We respond to every enquiry within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            className={`block text-[11px] font-semibold tracking-[0.16em] uppercase mb-2 ${
              isLight ? "text-[#8a8578]" : "text-white/60"
            }`}
          >
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Rahul Sharma"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={`w-full rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none ${
              isLight
                ? "bg-[#f9f8f6] border border-black/15 text-[#18181b] placeholder:text-black/30 focus:border-black"
                : "bg-[#0c0d0e] border border-white/15 text-[#f3efea] placeholder:text-white/25 focus:border-white/50"
            }`}
          />
        </div>

        <div>
          <label
            className={`block text-[11px] font-semibold tracking-[0.16em] uppercase mb-2 ${
              isLight ? "text-[#8a8578]" : "text-white/60"
            }`}
          >
            Email Address *
          </label>
          <input
            type="email"
            required
            placeholder="rahul@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none ${
              isLight
                ? "bg-[#f9f8f6] border border-black/15 text-[#18181b] placeholder:text-black/30 focus:border-black"
                : "bg-[#0c0d0e] border border-white/15 text-[#f3efea] placeholder:text-white/25 focus:border-white/50"
            }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            className={`block text-[11px] font-semibold tracking-[0.16em] uppercase mb-2 ${
              isLight ? "text-[#8a8578]" : "text-white/60"
            }`}
          >
            Phone Number *
          </label>
          <input
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none ${
              isLight
                ? "bg-[#f9f8f6] border border-black/15 text-[#18181b] placeholder:text-black/30 focus:border-black"
                : "bg-[#0c0d0e] border border-white/15 text-[#f3efea] placeholder:text-white/25 focus:border-white/50"
            }`}
          />
        </div>

        <div>
          <label
            className={`block text-[11px] font-semibold tracking-[0.16em] uppercase mb-2 ${
              isLight ? "text-[#8a8578]" : "text-white/60"
            }`}
          >
            City / Project Location *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Ghaziabad / Gurugram / Noida / Delhi"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className={`w-full rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none ${
              isLight
                ? "bg-[#f9f8f6] border border-black/15 text-[#18181b] placeholder:text-black/30 focus:border-black"
                : "bg-[#0c0d0e] border border-white/15 text-[#f3efea] placeholder:text-white/25 focus:border-white/50"
            }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            className={`block text-[11px] font-semibold tracking-[0.16em] uppercase mb-2 ${
              isLight ? "text-[#8a8578]" : "text-white/60"
            }`}
          >
            Project Type *
          </label>
          <select
            value={formData.projectType}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
            className={`w-full rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none cursor-pointer ${
              isLight
                ? "bg-[#f9f8f6] border border-black/15 text-[#18181b] focus:border-black"
                : "bg-[#0c0d0e] border border-white/15 text-[#f3efea] focus:border-white/50"
            }`}
          >
            <option value="Residential">Residential Interior (Apartment / Villa)</option>
            <option value="Commercial & Office">Commercial &amp; Office Interior</option>
            <option value="Modular Kitchen & Wardrobe">Modular Kitchen &amp; Wardrobe</option>
            <option value="Turnkey Interior Solutions">Turnkey Interior Solutions</option>
            <option value="Renovation & Remodeling">Renovation &amp; Remodeling</option>
            <option value="3D Visualization & Consultation">3D Visualization &amp; Consultation</option>
          </select>
        </div>

        <div>
          <label
            className={`block text-[11px] font-semibold tracking-[0.16em] uppercase mb-2 ${
              isLight ? "text-[#8a8578]" : "text-white/60"
            }`}
          >
            Approximate Budget (Optional)
          </label>
          <select
            value={formData.budgetRange}
            onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
            className={`w-full rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none cursor-pointer ${
              isLight
                ? "bg-[#f9f8f6] border border-black/15 text-[#18181b] focus:border-black"
                : "bg-[#0c0d0e] border border-white/15 text-[#f3efea] focus:border-white/50"
            }`}
          >
            <option value="₹5L - ₹15L">₹5 Lakhs – ₹15 Lakhs</option>
            <option value="₹15L - ₹30L">₹15 Lakhs – ₹30 Lakhs</option>
            <option value="₹30L - ₹60L">₹30 Lakhs – ₹60 Lakhs</option>
            <option value="₹60L+">₹60 Lakhs +</option>
            <option value="To be determined">Undecided / Need Consultation</option>
          </select>
        </div>
      </div>

      <div>
        <label
          className={`block text-[11px] font-semibold tracking-[0.16em] uppercase mb-2 ${
            isLight ? "text-[#8a8578]" : "text-white/60"
          }`}
        >
          Tell us about your project
        </label>
        <textarea
          rows={4}
          placeholder="Describe your space, timeline, carpet area, specific requirements or questions..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`w-full rounded-xl px-4 py-3 text-sm transition-colors resize-none focus:outline-none ${
            isLight
              ? "bg-[#f9f8f6] border border-black/15 text-[#18181b] placeholder:text-black/30 focus:border-black"
              : "bg-[#0c0d0e] border border-white/15 text-[#f3efea] placeholder:text-white/25 focus:border-white/50"
          }`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 cursor-pointer border-none rounded-full shadow-lg disabled:opacity-50 ${
          isLight
            ? "bg-[#18181b] text-white hover:bg-black"
            : "bg-[#f3efea] text-[#0c0d0e] hover:bg-white"
        }`}
      >
        <span>{loading ? "Submitting..." : "Send Enquiry"}</span>
        <ArrowRight size={14} />
      </button>

      <div
        className={`flex items-center justify-center gap-4 text-[11px] text-center ${
          isLight ? "text-[#8a8578]" : "text-white/40"
        }`}
      >
        <span>✓ Free Initial Consultation</span>
        <span>•</span>
        <span>✓ 24-Hour Response Guarantee</span>
        <span>•</span>
        <span>✓ Delhi NCR &amp; Pan-India</span>
      </div>
    </form>
  );
}
