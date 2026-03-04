"use client";

import { motion } from "framer-motion";

const POLAROIDS = [
  {
    src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=400&q=80",
    alt: "Pia(ar)no",
    caption: "Pia(ar)no",
    rot: -10,
    y: 0,
    icon: (
      <svg
        className="w-[18px] h-[18px] fill-none stroke-current stroke-[1.5] opacity-90"
        viewBox="0 0 24 24"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
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
    src: "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=400&q=80",
    alt: "Photography",
    caption: "Photography",
    rot: -4,
    y: 5,
    icon: (
      <svg
        className="w-[18px] h-[18px] fill-none stroke-current stroke-[1.5] opacity-90"
        viewBox="0 0 24 24"
      >
        <rect x="2" y="7" width="20" height="13" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=400&q=80",
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
    src: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=400&q=80",
    alt: "Paw-ful",
    caption: "Paw-ful",
    rot: -8,
    y: 15,
    icon: (
      <svg
        className="w-[18px] h-[18px] fill-none stroke-current stroke-[1.5] opacity-90"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="4" r="2" />
        <circle cx="18" cy="8" r="2" />
        <circle cx="7" cy="11" r="2" />
        <circle cx="14" cy="16" r="2" />
        <path d="M12 22c-3.3 0-6-2.7-6-6 0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2 0 3.3-2.7 6-6 6Z" />
      </svg>
    ),
  },
  {
    src: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=400&q=80",
    alt: "Hooked",
    caption: "Hooked",
    rot: 5,
    y: -5,
    icon: (
      <svg
        className="w-[18px] h-[18px] fill-none stroke-current stroke-[1.5] opacity-90"
        viewBox="0 0 24 24"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
    ),
  },
];

export default function Polaroid() {
  return (
    <section className="polaroid-section w-full mx-auto py-32 sm:py-40 px-6 sm:px-10 flex flex-col items-center gap-[60px] font-manrope bg-[var(--bg-primary)]">
      <div className="gallery-container w-full max-w-[1120px] flex justify-center items-center py-0 perspective-[1120px]">
        <div className="polaroid-wrapper flex items-center justify-center relative -gap-5">
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
              style={{ zIndex: 10 - i }}
              className={`polaroid-card w-[280px] bg-[var(--bg-card)]/60 backdrop-blur-xl p-[14px] pb-[30px] rounded-[20px] border border-[var(--border)] shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)] cursor-pointer relative ${
                i > 0 ? "-ml-[30px]" : ""
              } group shrink-0`}
            >
              <div className="polaroid-img-container w-full aspect-square bg-[var(--bg-secondary)] overflow-hidden rounded-xl mb-5">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <div className="polaroid-caption flex items-center justify-center gap-2.5 text-[15px] font-medium text-[var(--text-primary)] tracking-[-0.2px]">
                {item.icon}
                {item.caption}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
