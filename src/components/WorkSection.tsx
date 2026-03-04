"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  year: string;
  category: string;
  link?: string;
  images: string[];
  iconColor: string;
}

const projects: Project[] = [
  {
    title: "Pocketwise",
    subtitle: "A smart budgeting app designed for millennials and Gen Z.",
    description:
      "Designed end-to-end UX flows, from onboarding to expense tracking. Created custom illustrations and a cohesive design system across iOS and Android.",
    year: "2024",
    category: "Mobile Application",
    link: "#",
    images: [
      "/images/Rectangle 2.png",
      "/images/Rectangle 4.png",
      "/images/Rectangle 8.png",
    ],
    iconColor: "#c8ff00",
  },
  {
    title: "Flavoura",
    subtitle: "Recipe discovery platform with curated collections.",
    description:
      "Built a visually rich recipe exploration experience with scroll-driven animations and personalized recommendations based on dietary preferences.",
    year: "2024",
    category: "Web Application",
    link: "#",
    images: [
      "/images/Rectangle 4.png",
      "/images/Rectangle 8.png",
      "/images/Rectangle 2.png",
    ],
    iconColor: "#ff6b6b",
  },
  {
    title: "Koiostudio",
    subtitle: "Brand identity and product design for a creative agency.",
    description:
      "As an early design hire, worked across brand and product design. Established design guidelines, component library, and marketing assets.",
    year: "2025",
    category: "Brand Identity",
    link: "#",
    images: [
      "/images/Rectangle 8.png",
      "/images/Rectangle 2.png",
      "/images/Rectangle 4.png",
    ],
    iconColor: "#7c5cfc",
  },
];

function CardContent({ project }: { project: Project }) {
  return (
    <div className="group/card flex flex-col lg:flex-row rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border)] h-full p-6 gap-12">
      {/* Left — Screenshot */}
      <div className="w-full lg:w-[55%]">
        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border)]">
          <Image
            src={project.images[2]}
            alt={`${project.title} preview`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </div>
      </div>

      {/* Right — Project Details */}
      <div className="w-full lg:w-[45%] p-5 sm:p-6 lg:pl-2 flex flex-col justify-center">
        {/* Title Row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: project.iconColor + "20" }}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: project.iconColor }}
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              {project.title}
            </h3>
          </div>
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 stroke-[var(--text-muted)] stroke-[2] fill-none shrink-0 transition-all duration-300 group-hover/card:stroke-black dark:group-hover/card:stroke-[#c8ff00] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>

        {/* Subtitle */}
        <p className="text-[15px] font-semibold text-[var(--text-primary)] leading-snug mb-3">
          {project.subtitle}
        </p>

        {/* Description */}
        <p className="text-[13px] text-[var(--text-muted)] leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          <span className="px-4 py-1.5 rounded-full text-xs font-medium border border-[var(--border)] text-[var(--text-secondary)] bg-[var(--bg-secondary)]/50 tracking-wide">
            {project.year}
          </span>
          <span className="px-4 py-1.5 rounded-full text-xs font-medium border border-[var(--border)] text-[var(--text-secondary)] bg-[var(--bg-secondary)]/50 tracking-wide">
            {project.category}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function WorkSection() {
  return (
    <section
      id="work"
      className="bg-[var(--bg-primary)] relative pb-32 sm:pb-40"
    >
      {/* Section Header — sticky at top */}
      <div className="sticky top-0 z-[10] pt-16 sm:pt-20 pb-6 px-6 sm:px-12 bg-[var(--bg-primary)]">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between"
          >
            <div>
              <span className="text-[#c8ff00] text-sm font-semibold tracking-[2px] uppercase block mb-4">
                Selected Work
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
                Recent Projects
              </h2>
            </div>

            <span className="text-sm text-[var(--text-muted)] font-medium">
              {String(projects.length).padStart(2, "0")} Projects
            </span>
          </motion.div>
        </div>
      </div>

      {/* Stacking Cards using ScrollStack */}
      <div className="px-6 sm:px-12">
        <ScrollStack>
          {projects.map((project) => (
            <ScrollStackItem key={project.title}>
              <CardContent project={project} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
