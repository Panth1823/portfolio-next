"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  /** Pass true when used inside WorkSection (uses ScrollStack CSS vars) */
  variant?: "home" | "page";
}

export default function ProjectCard({ project, variant = "page" }: ProjectCardProps) {
  const isHome = variant === "home";

  return (
    <Link href={project.href} className="group block">
      <div
        className={`flex flex-col lg:flex-row rounded-2xl overflow-hidden p-4 sm:p-6 gap-6 lg:gap-12 min-h-[auto] lg:min-h-[480px] transition-[transform,border-color] duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5 hover:border-[var(--theme-accent)] ${
          isHome
            ? "bg-[var(--bg-card)] border border-[var(--border)]"
            : "bg-[var(--theme-surface)] border border-[var(--theme-border)]"
        }`}
      >
        {/* Left — Screenshot */}
        <div className="w-full lg:w-[55%]">
          <div
            className={`relative w-full h-[220px] sm:h-[280px] lg:h-full lg:aspect-[4/3] rounded-xl overflow-hidden border ${
              isHome
                ? "bg-[var(--bg-secondary)] border-[var(--border)]"
                : "bg-[var(--theme-bg)] border-[var(--theme-border)]"
            }`}
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                className=""
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            ) : (
              <div
                className="w-full h-full absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="20" height="20" fill="%23000"/><rect x="20" y="20" width="20" height="20" fill="%23000"/></svg>')`,
                }}
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
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
                style={project.iconImage ? {} : { backgroundColor: project.iconColor + "20" }}
              >
                {project.iconImage ? (
                  <Image
                    src={project.iconImage}
                    alt={`${project.title} icon`}
                    width={36}
                    height={36}
                    className="w-full h-full "
                  />
                ) : (
                  <div
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full"
                    style={{ backgroundColor: project.iconColor }}
                  />
                )}
              </div>
              <h3
                className={`text-lg sm:text-xl lg:text-2xl font-bold tracking-tight ${
                  isHome ? "text-[var(--text-primary)]" : "text-[var(--theme-text-hi)]"
                }`}
              >
                {project.title}
              </h3>
            </div>
            <svg
              viewBox="0 0 24 24"
              className={`w-4 h-4 sm:w-5 sm:h-5 stroke-[2] fill-none shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                isHome
                  ? "stroke-[var(--text-muted)] group-hover:stroke-[#c8ff00]"
                  : "stroke-[var(--theme-text-lo)] group-hover:stroke-[var(--theme-accent)]"
              }`}
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>

          {/* Subtitle */}
          <p
            className={`text-base font-semibold leading-snug mb-2 sm:mb-3 ${
              isHome ? "text-[var(--text-primary)]" : "text-[var(--theme-text-hi)]"
            }`}
          >
            {project.subtitle}
          </p>

          {/* Description */}
          <p
            className={`text-base leading-relaxed mb-4 sm:mb-6 ${
              isHome ? "text-[var(--text-muted)]" : "text-[var(--theme-text-lo)]"
            }`}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-base font-medium border tracking-wide ${
                  isHome
                    ? "border-[var(--border)] text-[var(--text-secondary)] bg-[var(--bg-secondary)]/50"
                    : "border-[var(--theme-border)] text-[var(--theme-text-lo)]"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
