"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Walker from "./Walker";
import ExperienceCards from "./ExperienceCards";

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const groundWidth = useTransform(scrollYProgress, [0, 0.93], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[var(--bg-primary)] max-sm:h-[550vh]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Grid Overlay */}
        <div className="absolute inset-0 flex justify-between px-[60px] pointer-events-none z-[1] max-md:px-[30px] max-sm:px-[24px]">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`w-[1px] h-full bg-[var(--grid-line)] ${i % 2 !== 0 ? "max-sm:hidden" : ""}`}
            />
          ))}
        </div>

        {/* Header */}
        <div className="relative z-[5] pt-[54px] px-[60px] max-md:px-[30px] max-sm:pt-[30px] max-sm:px-[24px]">
          <div className="flex items-center gap-4 mb-[22px]">
            <span className="text-[12px] font-normal text-[var(--text-muted)] tracking-[1px] whitespace-nowrap uppercase">
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

        {/* Ground Line */}
        <motion.div
          style={{ width: groundWidth }}
          className="absolute bottom-[30px] left-0 h-[1px] bg-[#c8ff00]/70 z-[4] max-sm:bottom-[20px]"
        />

        <Walker progress={scrollYProgress} />
      </div>
    </section>
  );
}
