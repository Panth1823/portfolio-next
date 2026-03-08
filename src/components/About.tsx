"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

/* ───────────────────── Animated Bio Words ───────────────────── */
const bioText =
  "I work at the intersection of people, process, and product to deliver meaningful digital experiences.".split(
    " ",
  );

function AnimatedWord({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--text-primary)]"
    >
      {word}
    </motion.span>
  );
}

/* ───────────────────── Main About Section ───────────────────── */
export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section id="about" className="bg-[var(--bg-primary)]">
      {/* ── Bio Text (scroll-driven reveal) ── */}
      <div
        ref={containerRef}
        className="relative py-20 sm:py-28 px-6 sm:px-12 flex flex-col justify-center items-center text-center"
      >
        <div className="max-w-4xl w-full flex flex-col items-center">
          <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center">
            {bioText.map((word, i) => (
              <AnimatedWord
                key={i}
                word={word}
                index={i}
                total={bioText.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
