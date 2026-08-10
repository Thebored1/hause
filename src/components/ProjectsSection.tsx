import React from "react";

import ProjectFilterGrid from "@/components/ProjectFilterGrid";

// The filterable portfolio band used on /projects. Placement only — the
// project list still lives in ProjectFilterGrid.

export default function ProjectsSection() {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#0c0d0e]">
      <div className="max-w-[1408px] mx-auto">
        <ProjectFilterGrid />
      </div>
    </section>
  );
}
