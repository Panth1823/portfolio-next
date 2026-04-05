"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import Walker from "./Walker";
import ExperienceCards from "./ExperienceCards";

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[var(--bg-primary)] max-md:h-[600vh]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Grid Overlay */}
        <div className="absolute inset-0 flex justify-between items-center px-6 sm:px-12 pointer-events-none z-[1]">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="grid-line w-[1px] h-[65%] bg-gradient-to-b from-transparent via-black/[0.06] dark:via-white/[0.06] to-transparent"
            />
          ))}
        </div>

        {/* Header */}
        <div className="relative z-[5] pt-20 sm:pt-20 px-6 sm:px-12">
          <div className="flex items-center gap-4 mb-[22px]">
            <span className="text-sm font-normal text-[var(--text-muted)] tracking-[1px] whitespace-nowrap">
              • Walking Through The Journey
            </span>
            <div className="flex-1 max-w-[460px] h-[1px] bg-[var(--border)]" />
          </div>
          <p className="text-[14px] font-light leading-[1.75] text-[var(--text-secondary)] max-w-[580px] max-sm:text-[13px] max-sm:max-w-full">
            I started as a problem-solver with an engineering background and
            gradually found my way into Product design, where logic meets
            creativity. Over the past 3 years, I&apos;ve designed web and mobile
            experiences focused on creating simple and intuitive solutions.
          </p>
        </div>

        <ExperienceCards progress={scrollYProgress} />

        <div className="hidden md:block">
          <Walker progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}
