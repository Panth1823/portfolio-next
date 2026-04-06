"use client";

import { FC, useState } from "react";
import Image from "next/image";

interface Tool {
  name: string;
  logo: string;
  hoverFilter?: string;
  active?: boolean;
  isColored?: boolean;
}

const tools: Tool[] = [
  {
    name: "Miro",
    logo: "/images/logo-miro.png",
    isColored: true,
  },
  { name: "Figma", logo: "/images/logo-figma.png" },
  {
    name: "Claude",
    logo: "/images/logo-claude.png",
    hoverFilter:
      "brightness(0) saturate(100%) invert(69%) sepia(33%) saturate(1176%) hue-rotate(343deg) brightness(94%) contrast(92%)",
  },
  {
    name: "Antigravity",
    logo: "/images/logo-antigravity.png",
    isColored: true,
  },
  {
    name: "Framer",
    logo: "/images/logo-framer.png",
    isColored: true,
  },
  {
    name: "Perplexity",
    logo: "/images/logo-perplexity.png",
    hoverFilter:
      "brightness(0) saturate(100%) invert(73%) sepia(65%) saturate(655%) hue-rotate(121deg) brightness(94%) contrast(93%)",
  },
];

const ToolIcon: FC<{
  tool: Tool;
  index: number;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}> = ({ tool, index, isHovered, onEnter, onLeave }) => (
  <div
    className="flex flex-col items-center gap-3.5 group"
    style={{ animationDelay: `${index * 80}ms` }}
  >
    <div className="relative">
      {/* Dot indicator */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
        <div
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            isHovered
              ? "bg-[var(--accent)] shadow-[0_0_10px_rgba(200,255,0,0.55)]"
              : "bg-[var(--border)]"
          }`}
        />
      </div>
      {/* Icon card */}
      <button
        type="button"
        aria-label={tool.name}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocus={onEnter}
        onBlur={onLeave}
        className={`w-24 h-24 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center cursor-pointer transition-all duration-300 ${
          isHovered
            ? "border-[var(--text-primary)]/20 shadow-[0_0_20px_rgba(255,255,255,0.08)] -translate-y-1"
            : ""
        }`}
      >
        <Image
          src={tool.logo}
          alt={tool.name}
          width={50}
          height={50}
          className={`w-[50px] h-[50px] object-contain transition-all duration-300 ${
            isHovered
              ? "opacity-100 scale-110"
              : "grayscale saturate-0 opacity-60"
          }`}
          style={{ filter: isHovered ? (tool.isColored ? "none" : tool.hoverFilter) : undefined }}
        />
      </button>
    </div>
    <span
      className={`text-sm transition-colors duration-300 ${
        isHovered ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
      }`}
    >
      {tool.name}
    </span>
  </div>
);

const TechStack = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-[var(--bg-primary)] px-6 pt-20 pb-32 sm:px-12">
      <div className="mx-auto w-full max-w-[1100px] rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)]/35 overflow-hidden">
        <div className="border-b border-[var(--border)] py-4">
          <p className="text-center text-[var(--text-secondary)] text-sm tracking-widest uppercase">
            My Current Tech Stack
          </p>
        </div>
        <div className="p-7 sm:p-10">
          <div className="flex items-center justify-center gap-8 sm:gap-10 flex-wrap">
            {tools.map((tool, i) => (
              <ToolIcon
                key={tool.name}
                tool={tool}
                index={i}
                isHovered={hoveredIndex === i}
                onEnter={() => setHoveredIndex(i)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
