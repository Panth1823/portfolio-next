"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// Stack positions for cards: [front, middle, back]
const stackVariants = [
  { y: 0, scale: 1, opacity: 1, zIndex: 30 },
  { y: 28, scale: 0.96, opacity: 0.7, zIndex: 20 },
  { y: 56, scale: 0.92, opacity: 0.4, zIndex: 10 },
];

function CardContent({ project }: { project: Project }) {
  return (
    <div className="group/card flex flex-col lg:flex-row rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border)] h-full">
      {/* Left — Screenshot */}
      <div className="w-full lg:w-[55%] p-5 sm:p-6">
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
  const [activeIndex, setActiveIndex] = useState(0);

  // Compute the visual order: activeIndex is front, next is middle, next is back
  const getStackPosition = (cardIndex: number) => {
    const diff = (cardIndex - activeIndex + projects.length) % projects.length;
    return diff; // 0 = front, 1 = middle, 2 = back
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <section
      id="work"
      className="py-32 sm:py-40 px-6 sm:px-12 bg-[var(--bg-primary)]"
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="text-[#c8ff00] text-sm font-semibold tracking-[2px] uppercase block mb-4">
              Selected Work
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              Recent Projects
            </h2>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--text-muted)] font-medium mr-2">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[#c8ff00] hover:text-[#c8ff00] transition-colors cursor-pointer"
              aria-label="Next project"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-none stroke-current stroke-[2]"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Card Stack */}
        <div className="relative w-full">
          {/* Render cards: front card is relative to set height, back cards are absolute */}
          {projects.map((project, i) => {
            const stackPos = getStackPosition(i);
            const variant = stackVariants[stackPos];
            const isFront = stackPos === 0;

            return (
              <motion.div
                key={project.title}
                layout
                className={`${isFront ? "relative" : "absolute inset-x-0 top-0"} w-full cursor-pointer`}
                style={{
                  zIndex: variant.zIndex,
                  originY: 0,
                }}
                animate={{
                  y: variant.y,
                  scale: variant.scale,
                  opacity: variant.opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                }}
                onClick={() => handleCardClick(i)}
                whileHover={
                  stackPos !== 0
                    ? { opacity: variant.opacity + 0.15 }
                    : undefined
                }
              >
                <CardContent project={project} />
              </motion.div>
            );
          })}
        </div>

        {/* Dot indicators */}
        {/* <div className="flex justify-center gap-2 mt-20">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? "bg-[#c8ff00] w-6"
                  : "bg-[var(--text-muted)]/40 hover:bg-[var(--text-muted)]"
              }`}
              aria-label={`View project ${i + 1}`}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
}
