"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

// ── Theme configuration ───────────────────────────────────────────────────────

// ── Project data ──────────────────────────────────────────────────────────────

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  href: string;
  image: string | null;
  iconColor: string;
}

const projects: Project[] = [
  {
    title: "Project 1",
    subtitle: "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    description: "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    tags: ["2024", "Mobile Application"],
    href: "/projects/project-1",
    image: null,
    iconColor: "#e5e7eb",
  },
  {
    title: "Design Intelligence",
    subtitle: "Real-Time Design Review Inside Figma",
    description: "A product concept exploring how design review can be integrated directly into the design process instead of being treated as a separate step.",
    tags: ["2026", "Product Concept"],
    href: "/projects/design-intelligence",
    image: "/images/Project 2 - Design Intelligence Case study Images/Summary - DI.png",
    iconColor: "#F24E1E",
  },
  {
    title: "Budgeting App",
    subtitle: "Redefining How Students Make Financial Decisions",
    description: "Reimagined how student budgeting apps should work. Instead of overwhelming users with numbers, I focused on making money management simple and easy to understand.",
    tags: ["2025", "Mobile Application", "Fintech"],
    href: "/projects/budgeting-app",
    image: "/images/Project 3 - Finance app Case Study Images/Summary - PW.png",
    iconColor: "#14B8A6",
  },
  {
    title: "Design experiments",
    subtitle: "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    description: "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    tags: ["2024", "Mobile Application"],
    href: "/projects/design-experiments",
    image: null,
    iconColor: "#e5e7eb",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center selection:bg-[#84CC16] selection:text-white font-[Inter,sans-serif] bg-[var(--theme-bg)] text-[var(--theme-text-mid)] antialiased">
        {/* ── Navbar ─────────────────────────────────────────────────────────── */}
        <Nav />

        {/* ── Main Content ────────────────────────────────────────────────────── */}
        <main className="w-full max-w-[1440px] px-6 sm:px-12 md:px-[60px] pb-32">
          {/* Page Header */}
          <div className="pt-28 pb-16 md:pb-20 mb-4">
            <h1 className="text-[44px] sm:text-[56px] md:text-[76px] font-medium leading-[0.95] tracking-tight text-[var(--theme-text-hi)]">
              Design Case <br />
              Studies
            </h1>
          </div>

          {/* ── Project Cards ──────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-10 md:gap-14">
            {projects.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                className="group block"
              >
                <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden bg-[var(--theme-surface)] border border-[var(--theme-border)] p-4 sm:p-6 gap-6 lg:gap-12 min-h-[auto] lg:min-h-[480px] transition-[transform,border-color] duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5 hover:border-[var(--theme-accent)]">
                  {/* Left — Screenshot */}
                  <div className="w-full lg:w-[55%]">
                    <div className="relative w-full h-[220px] sm:h-[280px] lg:h-full lg:aspect-[4/3] rounded-xl overflow-hidden bg-[var(--theme-bg)] border border-[var(--theme-border)]">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={`${project.title} preview`}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 1024px) 100vw, 55vw"
                        />
                      ) : (
                        <div 
                          className="w-full h-full absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
                          style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="20" height="20" fill="%23000"/><rect x="20" y="20" width="20" height="20" fill="%23000"/></svg>')` }} 
                        />
                      )}
                    </div>
                  </div>

                  {/* Right — Project Details */}
                  <div className="w-full lg:w-[45%] px-1 sm:px-0 sm:p-4 lg:pl-2 flex flex-col justify-center">
                    {/* Title Row */}
                    <div className="flex items-center justify-between mb-3 sm:mb-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: project.iconColor + "20" }}
                        >
                          <div
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full"
                            style={{ backgroundColor: project.iconColor }}
                          />
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[var(--theme-text-hi)] tracking-tight">
                          {project.title}
                        </h3>
                      </div>
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 sm:w-5 sm:h-5 stroke-[var(--theme-text-lo)] stroke-[2] fill-none shrink-0 transition-all duration-300 group-hover:stroke-[var(--theme-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>

                    {/* Subtitle */}
                    <p className="text-[14px] sm:text-[15px] font-semibold text-[var(--theme-text-hi)] leading-snug mb-2 sm:mb-3">
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-[12px] sm:text-[13px] text-[var(--theme-text-lo)] leading-relaxed mb-4 sm:mb-6">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium border border-[var(--theme-border)] text-[var(--theme-text-lo)] tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
