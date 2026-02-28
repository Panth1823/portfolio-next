"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { LightRays } from "@/components/ui/light-rays";

export default function HeroColumns() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-[#383838] flex items-center justify-center"
    >
      <LightRays
        color="#c8ff00"
        count={5}
        speed={15}
        blur={40}
        className="opacity-20"
      />

      {/* Background Columns */}
      <div className="absolute inset-0 flex justify-center gap-4 px-4 sm:gap-8 opacity-40 select-none -z-10 w-[120vw] -left-[10vw] -top-[30vh] h-[160vh]">
        <motion.div
          style={{ y: y1 }}
          className="flex flex-col gap-4 sm:gap-8 w-1/3"
        >
          <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
            <Image
              src="/images/hero-1.png"
              alt="Portfolio 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
            <Image
              src="/images/hero-2.png"
              alt="Portfolio 2"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          style={{ y: y2 }}
          className="flex flex-col gap-4 sm:gap-8 w-1/3"
        >
          <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
            <Image
              src="/images/hero-3.png"
              alt="Portfolio 3"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
            <Image
              src="/images/hero-4.png"
              alt="Portfolio 4"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          style={{ y: y3 }}
          className="flex flex-col gap-4 sm:gap-8 w-1/3"
        >
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
            <Image
              src="/images/hero-5.png"
              alt="Portfolio 5"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full h-[700px] rounded-xl overflow-hidden">
            <Image
              src="/images/hero-1.png"
              alt="Portfolio 6"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0a0a0a] z-0 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-md mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-[#c8ff00] animate-pulse" />
          <span className="text-xs font-medium uppercase tracking-widest text-white/80">
            Open to Opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white mb-6"
        >
          Product <span className="text-[#c8ff00] italic">Designer</span>
          <br />& Developer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl font-light"
        >
          Crafting cinematic websites and intuitive digital experiences.
          Bridging the gap between creative vision and engineering.
        </motion.p>
      </div>
    </section>
  );
}
