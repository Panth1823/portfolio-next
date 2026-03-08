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
        <div className="absolute inset-0 flex justify-between px-6 sm:px-12 pointer-events-none z-[1]">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`w-[1px] h-full ${i % 2 !== 0 ? "max-sm:hidden" : ""}`}
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, var(--grid-line) 20%, var(--grid-line) 80%, transparent 100%)",
              }}
            />
          ))}
        </div>

        {/* Header */}
        <div className="relative z-[5] pt-20 sm:pt-24 px-6 sm:px-12">
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
