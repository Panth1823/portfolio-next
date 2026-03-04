"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  useScroll,
  useTransform,
  motion,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { ScrollVelocityRow } from "@/components/ui/scroll-based-velocity";

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

/* ───────────────────── Curiosity Lab Data ───────────────────── */
const curiosityImages = [
  "/images/curiosity-1.png",
  "/images/curiosity-2.png",
  "/images/curiosity-3.png",
];

const tags = ["Packaging Design", "Interactions", "Branding"];

/* ───────────────────── Peek Carousel (3-panel) ───────────────────── */
function PeekCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const total = curiosityImages.length;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextSlide]);

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 4000);
  };

  const prevIndex = currentIndex === 0 ? total - 1 : currentIndex - 1;
  const nextIndex = (currentIndex + 1) % total;

  return (
    <div className="relative w-full h-full flex items-center">
      {/* 3-panel layout: peek-left | main | peek-right */}
      <div className="flex items-stretch w-full h-full gap-3">
        {/* Peek Left */}
        <div className="relative w-[60px] sm:w-[80px] shrink-0 rounded-xl overflow-hidden opacity-40">
          <Image
            src={curiosityImages[prevIndex]}
            alt="Previous project"
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        {/* Main Image */}
        <div className="relative flex-1 rounded-xl overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={{
                initial: (d: number) => ({
                  x: d > 0 ? "100%" : "-100%",
                  opacity: 0,
                }),
                animate: { x: 0, opacity: 1 },
                exit: (d: number) => ({
                  x: d > 0 ? "-100%" : "100%",
                  opacity: 0,
                }),
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 28 },
                opacity: { duration: 0.35 },
              }}
              className="absolute inset-0"
            >
              <Image
                src={curiosityImages[currentIndex]}
                alt={`Curiosity Lab project ${currentIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 50vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Peek Right */}
        <div className="relative w-[60px] sm:w-[80px] shrink-0 rounded-xl overflow-hidden opacity-40">
          <Image
            src={curiosityImages[nextIndex]}
            alt="Next project"
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      </div>

      {/* Navigation Arrows — overlaid on the peek panels */}
      <button
        onClick={() => {
          prevSlide();
          resetTimer();
        }}
        className="absolute left-[10px] sm:left-[16px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#1a1a1a] transition-all duration-300 group"
        aria-label="Previous image"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 stroke-current stroke-2 fill-none transition-transform duration-200 group-hover:-translate-x-0.5"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        onClick={() => {
          nextSlide();
          resetTimer();
        }}
        className="absolute right-[10px] sm:right-[16px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#1a1a1a] transition-all duration-300 group"
        aria-label="Next image"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 stroke-current stroke-2 fill-none transition-transform duration-200 group-hover:translate-x-0.5"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

/* ───────────────────── Curiosity Lab Section ───────────────────── */
function CuriosityLab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-[1200px] mx-auto"
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch min-h-[380px]">
        {/* Left — Text Content */}
        <div className="w-full lg:w-[40%] flex flex-col justify-between">
          {/* Top: Label + Divider line */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <span className="text-[var(--text-muted)] text-[6px]">●</span>
              <span className="text-sm font-medium text-[var(--text-secondary)] tracking-wide whitespace-nowrap">
                Curiosity Lab
              </span>
              <div className="flex-1 h-px bg-[var(--border)]" />
            </div>

            {/* Icon — sparkle / experiment */}
            <motion.div
              className="w-10 h-10 mb-8 text-[var(--text-muted)]"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full fill-current opacity-60"
              >
                <path d="M12 2C12.5523 2 13 2.44772 13 3V5C13 5.55228 12.5523 6 12 6C11.4477 6 11 5.55228 11 5V3C11 2.44772 11.4477 2 12 2ZM4.92893 4.92893C5.31946 4.53841 5.95262 4.53841 6.34315 4.92893L7.75736 6.34315C8.14789 6.73367 8.14789 7.36684 7.75736 7.75736C7.36684 8.14789 6.73367 8.14789 6.34315 7.75736L4.92893 6.34315C4.53841 5.95262 4.53841 5.31946 4.92893 4.92893ZM19.0711 4.92893C19.4616 5.31946 19.4616 5.95262 19.0711 6.34315L17.6569 7.75736C17.2663 8.14789 16.6332 8.14789 16.2426 7.75736C15.8521 7.36684 15.8521 6.73367 16.2426 6.34315L17.6569 4.92893C18.0474 4.53841 18.6805 4.53841 19.0711 4.92893ZM12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8ZM2 12C2 11.4477 2.44772 11 3 11H5C5.55228 11 6 11.4477 6 12C6 12.5523 5.55228 13 5 13H3C2.44772 13 2 12.5523 2 12ZM18 12C18 11.4477 18.4477 11 19 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H19C18.4477 13 18 12.5523 18 12ZM6.34315 16.2426C6.73367 15.8521 7.36684 15.8521 7.75736 16.2426C8.14789 16.6332 8.14789 17.2663 7.75736 17.6569L6.34315 19.0711C5.95262 19.4616 5.31946 19.4616 4.92893 19.0711C4.53841 18.6805 4.53841 18.0474 4.92893 17.6569L6.34315 16.2426ZM16.2426 16.2426C16.6332 15.8521 17.2663 15.8521 17.6569 16.2426L19.0711 17.6569C19.4616 18.0474 19.4616 18.6805 19.0711 19.0711C18.6805 19.4616 18.0474 19.4616 17.6569 19.0711L16.2426 17.6569C15.8521 17.2663 15.8521 16.6332 16.2426 16.2426ZM12 18C12.5523 18 13 18.4477 13 19V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V19C11 18.4477 11.4477 18 12 18Z" />
              </svg>
            </motion.div>

            {/* Description — larger headline style */}
            <p className="text-xl sm:text-2xl lg:text-[26px] leading-snug font-normal text-[var(--text-secondary)] mb-10">
              Experiments that sparked my curiosity and led me down a few
              unexpected creative directions - pushing my creative boundaries
              along the way
            </p>
          </div>

          {/* Bottom: Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-5 py-2 rounded-full text-xs font-medium text-[var(--text-secondary)] bg-[#1a1a1a] tracking-wide cursor-default hover:bg-[#222] transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right — 3-panel Peek Carousel */}
        <div className="w-full lg:w-[60%] relative min-h-[320px]">
          <PeekCarousel />
        </div>
      </div>
    </motion.div>
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
        className="py-32 sm:py-40 px-6 sm:px-12 min-h-screen flex flex-col justify-center items-center text-center"
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
      </div>
    </section>
  );
}
