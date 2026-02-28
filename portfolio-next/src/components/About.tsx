"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const bioText =
  "I bring ideas to life with a blend of design thinking and technical execution. Focused on aesthetics, performance, and engaging user experiences.".split(
    " ",
  );

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
      className="py-40 px-6 sm:px-12 bg-black min-h-screen flex flex-col justify-center items-center text-center"
    >
      <div className="max-w-4xl w-full flex flex-col items-center">
        <h2 className="text-[#c8ff00] text-sm font-semibold tracking-[2px] uppercase mb-12">
          About Me
        </h2>

        <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center mb-24">
          {bioText.map((word, i) => {
            const start = i / bioText.length;
            const end = start + 1 / bioText.length;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(
              scrollYProgress,
              [start, end],
              [0.1, 1],
            );
            return (
              <motion.span
                key={i}
                style={{ opacity }}
                className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white"
              >
                {word}
              </motion.span>
            );
          })}
        </div>

        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl text-left">
          <div className="flex flex-col gap-2">
            <h3 className="text-white/40 text-xs uppercase tracking-widest mb-2 border-b border-white/10 pb-2">
              Design
            </h3>
            <span className="text-white/80 text-sm">UI/UX Design</span>
            <span className="text-white/80 text-sm">Wireframing</span>
            <span className="text-white/80 text-sm">Prototyping</span>
            <span className="text-white/80 text-sm">Design Systems</span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-white/40 text-xs uppercase tracking-widest mb-2 border-b border-white/10 pb-2">
              Engineering
            </h3>
            <span className="text-white/80 text-sm">React / Next.js</span>
            <span className="text-white/80 text-sm">TypeScript</span>
            <span className="text-white/80 text-sm">Tailwind CSS</span>
            <span className="text-white/80 text-sm">Framer Motion</span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-white/40 text-xs uppercase tracking-widest mb-2 border-b border-white/10 pb-2">
              Tools
            </h3>
            <span className="text-white/80 text-sm">Figma</span>
            <span className="text-white/80 text-sm">VS Code</span>
            <span className="text-white/80 text-sm">Vercel</span>
            <span className="text-white/80 text-sm">GitHub</span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-white/40 text-xs uppercase tracking-widest mb-2 border-b border-white/10 pb-2">
              Soft Skills
            </h3>
            <span className="text-white/80 text-sm">Problem Solving</span>
            <span className="text-white/80 text-sm">Collaboration</span>
            <span className="text-white/80 text-sm">Adaptability</span>
            <span className="text-white/80 text-sm">Communication</span>
          </div>
        </div> */}
      </div>
    </section>
  );
}
