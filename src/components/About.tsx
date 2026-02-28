"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

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
  const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[var(--text-primary)]"
    >
      {word}
    </motion.span>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-40 px-6 sm:px-12 bg-[var(--bg-secondary)] min-h-screen flex flex-col justify-center items-center text-center"
    >
      <div className="max-w-4xl w-full flex flex-col items-center">
        <h2 className="text-[#c8ff00] text-sm font-semibold tracking-[2px] uppercase mb-12">
          About Me
        </h2>

        <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center mb-24">
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
    </section>
  );
}
