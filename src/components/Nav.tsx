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
      {/* Logo */}
      <Link
        href="/"
        className="font-bold tracking-tighter text-2xl text-[var(--text-primary)]"
      >
        S
      </Link>

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
