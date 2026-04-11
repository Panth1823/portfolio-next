"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const POLAROIDS = [
  {
    src: "/images/Workshop-Npr.jpeg",
    alt: "Workshop",
    caption: "Workshop @ NPR",
    rot: 6,
    y: -15,
    icon: (
      <svg
        className="w-[18px] h-[18px] fill-none stroke-current stroke-[1.5] opacity-90"
        viewBox="0 0 24 24"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    src: "/images/IMG_6994.PNG",
    alt: "Piano",
    caption: "Piano",
    rot: -4,
    y: 5,
    icon: (
      <svg
        className="w-[18px] h-[18px] fill-none stroke-current stroke-[1.5] opacity-90"
        viewBox="0 0 24 24"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    src: "/images/U&I-volunteer.jpeg",
    alt: "Volunteer",
    caption: "Volunteer @ U&I",
    rot: 2,
    y: -10,
    icon: (
      <svg
        className="w-[18px] h-[18px] fill-none stroke-current stroke-[1.5] opacity-90"
        viewBox="0 0 24 24"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    src: "/images/IMG_6995.PNG",
    alt: "Crochetology",
    caption: "Crochetology",
    rot: -8,
    y: 15,
    icon: (
      <svg
        className="w-[18px] h-[18px] fill-none stroke-current stroke-[1.5] opacity-90"
        viewBox="0 0 24 24"
      >
        <path d="M9 3C9 3 8 9 12 12C16 15 22 15 22 15" />
        <path d="M9 3C9 3 10 9 7 12C4 15 2 15 2 15" />
        <path d="M2 15C2 15 6 17 9 21" />
        <path d="M22 15C22 15 18 17 15 21" />
        <path d="M12 12C12 12 12 17 12 21" />
      </svg>
    ),
  },
];

export default function Polaroid() {
  return (
    <section className="polaroid-section w-full mx-auto py-20 sm:py-28 px-6 sm:px-12 flex flex-col items-center gap-[60px] font-manrope bg-[var(--bg-primary)]">
      <div className="w-full max-w-[1120px]">
        {/* Mobile: abstract staggered layout */}
        <div className="sm:hidden relative w-full" style={{ height: "520px" }}>
          {POLAROIDS.map((item, i) => {
            // Abstract positions: alternate left/right columns with vertical offsets
            const leftPositions = [4, 8, 4];
            const rightPositions = [48, 52, 48];
            const isLeft = i % 2 === 0;
            const colIndex = Math.floor(i / 2);
            const left = isLeft
              ? `${leftPositions[colIndex % 3]}%`
              : `${rightPositions[colIndex % 3]}%`;
            const topOffsets = [10, 80, 160, 240, 320, 400];
            const rotations = [-8, 6, -5, 9, -7, 4];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, rotate: rotations[i] - 10 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: rotations[i],
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 18,
                    delay: i * 0.08,
                  },
                }}
                whileHover={{ scale: 1.06, rotate: 0, zIndex: 50 }}
                viewport={{ once: true, margin: "-30px" }}
                className="absolute bg-[var(--bg-card)]/70 backdrop-blur-xl p-2.5 pb-5 rounded-[16px] border border-[var(--border)] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] cursor-pointer"
                style={{
                  width: "42%",
                  left,
                  top: `${topOffsets[i] || 0}px`,
                  zIndex: 10 - i,
                }}
              >
                <div className="w-full aspect-square bg-[var(--bg-secondary)] overflow-hidden rounded-xl mb-3 relative">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="45vw"
                    className={`${i !== 1 ? "object-cover " : ""}opacity-85`}
                  />
                </div>
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-[var(--text-primary)]">
                  {item.icon}
                  {item.caption}
                </div>
              </motion.div>
            );
          })}
        </div>
        {/* Tablet: compact 3-per-row fanned layout */}
        <div className="hidden sm:flex md:hidden items-end justify-center gap-4 flex-wrap">
          {POLAROIDS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: item.y + 40, rotate: item.rot - 8 }}
              whileInView={{
                opacity: 1,
                y: item.y * 0.5,
                rotate: item.rot * 0.7,
                transition: {
                  type: "spring",
                  stiffness: 220,
                  damping: 20,
                  delay: i * 0.08,
                },
              }}
              whileHover={{ scale: 1.08, rotate: 0, y: -10, zIndex: 50 }}
              viewport={{ once: true, margin: "-40px" }}
              className="bg-[var(--bg-card)]/60 backdrop-blur-xl p-3 pb-6 rounded-[18px] border border-[var(--border)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] cursor-pointer shrink-0"
              style={{ width: "180px", zIndex: 10 - i }}
            >
              <div className="w-full aspect-square bg-[var(--bg-secondary)] overflow-hidden rounded-xl mb-3 relative">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="180px"
                  className={`${i !== 1 ? "object-cover " : ""}opacity-80`}
                />
              </div>
              <div className="flex items-center justify-center gap-2 text-[12px] font-medium text-[var(--text-primary)]">
                {item.icon}
                {item.caption}
              </div>
            </motion.div>
          ))}
        </div>
        {/* Desktop: original fanned layout */}
        <div className="hidden md:flex items-center justify-center relative perspective-[1120px]">
          {POLAROIDS.map((item, i) => (
            <motion.div
              layout
              key={i}
              initial={{ opacity: 0, y: item.y + 60, rotate: item.rot - 15 }}
              whileInView={{
                opacity: 1,
                y: item.y,
                rotate: item.rot,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: i * 0.1,
                },
              }}
              whileHover={{
                scale: 1.08,
                rotate: 0,
                y: item.y - 15,
                zIndex: 50,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                },
              }}
              viewport={{ once: true, margin: "-50px" }}
              style={{ zIndex: 10 - i, width: "clamp(140px, 14vw, 280px)" }}
              className={`polaroid-card bg-[var(--bg-card)]/60 backdrop-blur-xl p-[clamp(8px,1vw,14px)] pb-[clamp(16px,2vw,30px)] rounded-[20px] border border-[var(--border)] shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)] cursor-pointer relative ${
                i > 0 ? "-ml-[clamp(10px,2vw,30px)]" : ""
              } group shrink-0`}
            >
              <div className="polaroid-img-container w-full aspect-square bg-[var(--bg-secondary)] overflow-hidden rounded-xl mb-[clamp(8px,1vw,20px)] relative">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1200px) 14vw, 280px"
                  className={`${i !== 1 ? "object-cover " : ""}opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                />
              </div>
              <div className="polaroid-caption flex items-center justify-center gap-1.5 text-[clamp(10px,1vw,15px)] font-medium text-[var(--text-primary)] tracking-[-0.2px]">
                {item.icon}
                {item.caption}
              </div>
            </motion.div>
          ))}
        </div>
      </div>{" "}
      {/* closes max-w outer */}
    </section>
  );
}
