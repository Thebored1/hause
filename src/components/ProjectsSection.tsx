import React from "react";

import ProjectFilterGrid, { type ProjectItem } from "@/components/ProjectFilterGrid";

// The filterable portfolio band used on /projects.

export default function ProjectsSection({ projects }: { projects?: ProjectItem[] }) {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 bg-[#0c0d0e]">
      <div className="max-w-[1408px] mx-auto">
        <ProjectFilterGrid projects={projects} />
      </div>
    </section>
  );
}
