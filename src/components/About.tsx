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
