import React from "react";
import { Star, MapPin, Quote } from "lucide-react";

// The client testimonial grid used on /testimonials.

export interface Testimonial {
  client: string;
  designation: string;
  project: string;
  location: string;
  rating: number;
  quote: string;
  tags: string[];
}

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    client: "Vikram & Ananya Malhotra",
    designation: "Homeowners",
    project: "3BHK Turnkey Interior",
    location: "Vaishali, Ghaziabad",
    rating: 5,
    quote:
      "What stood out most was the adherence to the initial BOQ. There were zero surprise costs mid-execution. The site supervisor was present every single day, and the finished carpentry and lighting match the 3D renders down to the millimeter.",
    tags: ["Turnkey Interior", "BWP Plywood", "On-Time Handover"],
  },
  {
    client: "Sameer Saxena",
    designation: "Managing Director, CloudTech Solutions",
    project: "Corporate Workspace Fit-Out (4,800 sq. ft.)",
    location: "Cyber City, Gurugram",
    rating: 5,
    quote:
      "Hause Interiors executed our office fit-out on a strict 10-week schedule before our team's move-in date. Their MEP coordination and acoustic partition execution were flawless. Highly recommend them for commercial work.",
    tags: ["Commercial Office", "Acoustic Partitioning", "Minimal Downtime"],
  },
  {
    client: "Pooja & Karan Mehra",
    designation: "Homeowners",
    project: "Parallel Modular Kitchen & Master Suite",
    location: "Sector 62, Noida",
    rating: 5,
    quote:
      "Our kitchen is easily the most used room in our house. The storage ergonomics, soft-close hardware, and quartz countertop prep zones were planned with incredible precision. Truly a functional masterpiece.",
    tags: ["Modular Kitchen", "Acrylic Shutters", "Custom Wardrobes"],
  },
  {
    client: "Rohit Singhal",
    designation: "Villa Owner",
    project: "Structural Renovation & Interior Remodel",
    location: "Greater Kailash, South Delhi",
    rating: 5,
    quote:
      "Renovating a 20-year-old property while keeping structural integrity was daunting. Hause handled the civil alterations, new plumbing, and modern wood finishes with utter professionalism. The house feels brand new.",
    tags: ["Full Renovation", "Italian Marble", "False Ceiling"],
  },
  {
    client: "Deepika Sen",
    designation: "Founder, Bloom Dental Clinic",
    project: "Healthcare Clinic Interior",
    location: "Indirapuram, Ghaziabad",
    rating: 5,
    quote:
      "Patients constantly compliment our clinic's calming, minimalist aesthetic. The soothing lighting, durable anti-microbial surfaces, and efficient reception flow make everyday operations seamless.",
    tags: ["Healthcare Commercial", "Lobby Design", "Custom Cabinetry"],
  },
  {
    client: "Arjun Nambiar",
    designation: "NRI Homeowner (Singapore)",
    project: "Remote Turnkey Apartment Interior",
    location: "Dwarka Expressway, Gurugram",
    rating: 5,
    quote:
      "Managing an interior project from Singapore felt impossible until we partnered with Hause. Weekly video walkthroughs, transparent milestone reports, and flawless handover without me having to travel to India once.",
    tags: ["Remote Turnkey", "Pan-India / NRI", "Video Site Audits"],
  },
];

export default function TestimonialsGrid({
  testimonials = DEFAULT_TESTIMONIALS,
}: {
  testimonials?: Testimonial[];
}) {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#f9f8f6] text-[#18181b]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="p-8 bg-white border border-black/10 hover:border-black/25 rounded-2xl transition-all flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex text-amber-500 gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <Quote size={20} className="text-[#8a8578]/40" />
              </div>

              <p className="text-sm text-[#18181b] font-normal leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {t.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    className="px-3 py-1 bg-[#f3efea] border border-black/5 text-[10px] text-[#6b6559] uppercase tracking-wider rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-black/10 pt-4">
              <h4 className="text-base font-medium text-[#18181b]">{t.client}</h4>
              <p className="text-xs text-[#8a8578]">{t.designation}</p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-[#6b6559]">
                <MapPin size={12} className="text-[#8a8578]" />
                <span>{t.project} · {t.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
