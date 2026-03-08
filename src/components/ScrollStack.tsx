"use client";

import React, {
  useRef,
  Children,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/* ─────────────── Context ─────────────── */
interface ScrollStackContextValue {
  scrollYProgress: MotionValue<number>;
  totalItems: number;
}

const ScrollStackContext = createContext<ScrollStackContextValue | null>(null);

/* ─────────────── ScrollStackItem ─────────────── */
interface ScrollStackItemProps {
  children: ReactNode;
  index?: number;
}

export function ScrollStackItem({ children, index = 0 }: ScrollStackItemProps) {
  const ctx = useContext(ScrollStackContext);
  if (!ctx) throw new Error("ScrollStackItem must be used inside ScrollStack");

  const { scrollYProgress, totalItems } = ctx;

  // Scale: each card shrinks slightly as the next one stacks on top
  const targetScale = Math.max(0.85, 1 - (totalItems - index - 1) * 0.05);
  const rangeStart = index / totalItems;
  const scale = useTransform(
    scrollYProgress,
    [rangeStart, 1],
    [1, targetScale],
  );

  return (
    <div
      className="sticky top-0 flex items-center justify-center"
      style={{
        zIndex: index + 1,
        height: "100vh",
        paddingTop: `calc(clamp(60px, 8vw, 120px) + ${index * 20}px)`,
      }}
    >
      <motion.div
        className="w-full max-w-[1100px] origin-top"
        style={{ scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─────────────── ScrollStack ─────────────── */
interface ScrollStackProps {
  children: ReactNode;
}

export default function ScrollStack({ children }: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const items = Children.toArray(children);
  const totalItems = items.length;

  return (
    <ScrollStackContext.Provider value={{ scrollYProgress, totalItems }}>
      <div ref={containerRef}>
        {items.map((child, i) => {
          // Clone the child element to inject the index prop
          if (React.isValidElement<ScrollStackItemProps>(child)) {
            return React.cloneElement(child, { index: i, key: i });
          }
          return child;
        })}
      </div>
    </ScrollStackContext.Provider>
  );
}
