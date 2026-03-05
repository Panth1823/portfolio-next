"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 sm:px-16 py-6"
    >
      {/* Logo — hover reveals full name */}
      <motion.div
        initial="idle"
        animate="idle"
        whileHover="hovered"
        className="flex items-center"
      >
        <Link
          href="/"
          className="flex items-center font-bold tracking-tighter text-2xl text-[var(--text-primary)]"
        >
          <span>S</span>
          <motion.span
            variants={{
              idle: { width: 0, opacity: 0, x: -6 },
              hovered: { width: "auto", opacity: 1, x: 0 },
            }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="inline-block overflow-hidden whitespace-nowrap"
          >
            hvetha
          </motion.span>
        </Link>
      </motion.div>

      {/* Nav Links + Theme Toggle */}
      <div className="flex items-center gap-8">
        <Link
          href="#work"
          className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors tracking-wide"
        >
          Projects
        </Link>
        <Link
          href="#about"
          className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors tracking-wide"
        >
          About
        </Link>
        <Link
          href="#contact"
          className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors tracking-wide"
        >
          Contact
        </Link>
        <Link
          href="/resume"
          className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors tracking-wide"
        >
          Resume
        </Link>

        {/* Theme Toggler */}
        <AnimatedThemeToggler className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer [&_svg]:w-4 [&_svg]:h-4" />
      </div>
    </motion.nav>
  );
}
