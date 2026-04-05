"use client";

import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ProjectCard from "@/components/ProjectCard";
import { PROJECT_LIST } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center selection:bg-[#84CC16] selection:text-white font-manrope bg-[var(--theme-bg)] text-[var(--theme-text-mid)] antialiased">
        <Nav />

        <main className="w-full max-w-[1440px] px-6 sm:px-12 md:px-[60px] pb-32">
          {/* Page Header */}
          <div className="pt-44 md:pt-56 pb-16 md:pb-20 mb-4">
            <h1 className="text-[44px] sm:text-[56px] md:text-[76px] font-medium leading-[0.95] tracking-tight text-[var(--theme-text-hi)]">
              Design Case <br />
              Studies
            </h1>
          </div>

          {/* Project Cards */}
          <div className="flex flex-col gap-10 md:gap-14">
            {PROJECT_LIST.map((project) => (
              <ProjectCard key={project.title} project={project} variant="page" />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
