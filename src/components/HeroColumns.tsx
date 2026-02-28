"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";

const col1Images = [
  "/images/Rectangle 2.png",
  "/images/Rectangle 4.png",
  "/images/Rectangle 8.png",
];

const col2Images = [
  "/images/Rectangle 2.png",
  "/images/Rectangle 4.png",
  "/images/Rectangle 8.png",
];

const col3Images = [
  "/images/Rectangle 2.png",
  "/images/Rectangle 4.png",
  "/images/Rectangle 8.png",
];

function ImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-white/5 shrink-0">
      <Image src={src} alt={alt} fill className="object-cover" sizes="33vw" />
    </div>
  );
}

export default function HeroColumns() {
  return (
    <section className="relative h-screen overflow-hidden bg-[var(--bg-primary)] flex items-center justify-center">
      {/* 3 Vertical Infinite Scrolling Columns */}
      <div className="absolute inset-0 flex justify-center gap-8 px-6 sm:px-12 opacity-10 select-none">
        {/* Column 1 — scrolls up */}
        <Marquee
          vertical
          className="h-full w-1/3 [--duration:25s] [--gap:32px]"
          repeat={4}
        >
          {col1Images.map((src, i) => (
            <ImageCard key={i} src={src} alt={`Portfolio work ${i + 1}`} />
          ))}
        </Marquee>

        {/* Column 2 — scrolls down (reverse) */}
        <Marquee
          vertical
          reverse
          className="h-full w-1/3 [--duration:30s] [--gap:32px]"
          repeat={4}
        >
          {col2Images.map((src, i) => (
            <ImageCard key={i} src={src} alt={`Portfolio work ${i + 4}`} />
          ))}
        </Marquee>

        {/* Column 3 — scrolls up */}
        <Marquee
          vertical
          className="h-full w-1/3 [--duration:22s] [--gap:32px]"
          repeat={4}
        >
          {col3Images.map((src, i) => (
            <ImageCard key={i} src={src} alt={`Portfolio work ${i + 7}`} />
          ))}
        </Marquee>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/80 via-[var(--bg-primary)]/50 to-[var(--bg-primary)] z-[1] pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-start text-left px-6 sm:px-12 w-full max-w-7xl">
        <div className="flex items-center gap-5 mb-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-[var(--text-primary)] leading-[0.95]"
          >
            Product Designer
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-4 border border-[var(--border)] rounded-xl   bg-[var(--bg-secondary)]/50 backdrop-blur-md shrink-0"
          >
            <div className="w-2 h-2 rounded-full bg-[#c8ff00] animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-widest text-[var(--text-secondary)] whitespace-nowrap">
              Open to Opportunities
            </span>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-xl sm:text-2xl md:text-3xl text-[var(--text-primary)] font-light mb-2"
        >
          focused on solving real user problems
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="text-xl sm:text-2xl md:text-3xl font-light text-[var(--text-primary)]"
        >
          for <span className="text-[#c8ff00] font-semibold">3+ years</span>
        </motion.p>
      </div>
    </section>
  );
}
