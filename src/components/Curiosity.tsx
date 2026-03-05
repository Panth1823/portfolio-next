"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

const ITEMS = [
  { src: "/images/Brew.png", alt: "Brew" },
  { src: "/images/Crunch.png", alt: "Crunch" },
  { src: "/images/Jamora.png", alt: "Jamora" },
  { src: "/images/Radiante.png", alt: "Radiante" },
  { src: "/images/Scentaura.png", alt: "Scentaura" },
];

export default function Curiosity() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const VISIBLE = 3;
  const GAP = 12;
  const maxOffset = ITEMS.length - VISIBLE;

  const updateCarousel = useCallback(() => {
    if (!trackRef.current) return;
    const items = trackRef.current.children;
    if (items.length === 0) return;
    const itemWidth = (items[0] as HTMLElement).offsetWidth;
    const shift = currentOffset * (itemWidth + GAP);
    trackRef.current.style.transform = `translateX(-${shift}px)`;
  }, [currentOffset, GAP]);

  useEffect(() => {
    updateCarousel();
    window.addEventListener("resize", updateCarousel);
    return () => window.removeEventListener("resize", updateCarousel);
  }, [updateCarousel]);

  return (
    <section className="curiosity-section w-full bg-[var(--bg-primary)] font-manrope relative z-[1]">
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-[1440px] w-full min-h-[460px] py-24 sm:py-32 lg:py-40 px-6 sm:px-12 lg:px-[160px] mx-auto gap-10">
        {/* Left Content */}
        <div className="content-left w-[55%] shrink-0 z-[5]">
          <div className="section-label flex items-center gap-3 mb-10">
            <span className="text-[13px] font-normal text-[var(--text-muted)] tracking-[0.5px]">
              • Curiosity Lab
            </span>
            <div className="line grow h-[1px] bg-[var(--border)] max-w-[300px] ml-2" />
          </div>

          <div className="icon mb-6 inline-block">
            <svg
              viewBox="0 0 32 32"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="text-[var(--text-primary)]"
            >
              <circle cx="15" cy="19" r="10" />
              <circle
                cx="11.5"
                cy="18"
                r="1"
                fill="currentColor"
                stroke="none"
              />
              <circle
                cx="18.5"
                cy="18"
                r="1"
                fill="currentColor"
                stroke="none"
              />
              <path d="M11.5 22a4.5 4.5 0 0 0 7 0" />
            </svg>
          </div>

          <p className="description text-2xl leading-[1.45] font-light mb-9 text-[var(--text-primary)] tracking-[-0.2px] max-w-[489px]">
            Experiments that sparked my curiosity and led me down a few
            unexpected creative directions pushing my creative boundaries along
            the way
          </p>

          <div className="tags flex gap-3 flex-wrap">
            <span className="tag bg-[var(--bg-secondary)] text-[var(--text-secondary)] py-2.5 px-5 rounded-lg text-base font-normal border border-[var(--border)]">
              Packaging Design
            </span>
            <span className="tag bg-[var(--bg-secondary)] text-[var(--text-secondary)] py-2.5 px-5 rounded-lg text-base font-normal border border-[var(--border)]">
              Interactions
            </span>
            <span className="tag bg-[var(--bg-secondary)] text-[var(--text-secondary)] py-2.5 px-5 rounded-lg text-base font-normal border border-[var(--border)]">
              Branding
            </span>
          </div>
        </div>

        {/* Right Carousel */}
        <div className="carousel-right shrink-0 relative flex items-center justify-end">
          <div className="carousel-container relative w-[507px] h-[287px] flex items-center justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)]">
            <div
              ref={trackRef}
              className="carousel-track flex items-center justify-start gap-3 transition-transform duration-500 cubic-bezier(0.25,0.8,0.25,1) will-change-transform"
            >
              {ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="carousel-item w-[220px] h-[287px] rounded-[10px] overflow-hidden shrink-0 relative bg-[var(--bg-secondary)] border border-[var(--border)]"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="220px"
                  />
                </div>
              ))}
            </div>

            {/* Navigation */}
            <button
              onClick={() => setCurrentOffset((prev) => Math.max(0, prev - 1))}
              disabled={currentOffset <= 0}
              aria-label="Previous project"
              className="nav-btn prev-btn absolute top-1/2 -translate-y-1/2 left-[calc(50%-150px-22px)] w-9 h-9 rounded-full bg-[var(--bg-secondary)] border border-[var(--accent)] text-[var(--text-primary)] flex items-center justify-center cursor-pointer z-10 transition-all hover:enabled:bg-[var(--bg-card)] hover:enabled:border-[var(--text-secondary)] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4 fill-none stroke-current stroke-[1.5]"
                viewBox="0 0 24 24"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() =>
                setCurrentOffset((prev) => Math.min(maxOffset, prev + 1))
              }
              disabled={currentOffset >= maxOffset}
              aria-label="Next project"
              className="nav-btn next-btn absolute top-1/2 -translate-y-1/2 right-[calc(50%-150px-22px)] w-9 h-9 rounded-full bg-[var(--bg-secondary)] border border-[var(--accent)] text-[var(--text-primary)] flex items-center justify-center cursor-pointer z-10 transition-all hover:enabled:bg-[var(--bg-card)] hover:enabled:border-[var(--text-secondary)] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4 fill-none stroke-current stroke-[1.5]"
                viewBox="0 0 24 24"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
