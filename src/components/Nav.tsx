"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "#work", label: "Projects" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
    { href: "/resume", label: "Resume" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-16 py-5 sm:py-6 backdrop-blur-md bg-[var(--bg-primary)]/80 border-[var(--border)]/40"
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
            className="flex items-center font-manrope font-extrabold tracking-tight text-2xl text-[var(--text-primary)]"
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

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors tracking-wide"
            >
              {l.label}
            </Link>
          ))}
          <AnimatedThemeToggler className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer [&_svg]:w-4 [&_svg]:h-4" />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-4">
          <AnimatedThemeToggler className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer [&_svg]:w-4 [&_svg]:h-4" />
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] text-[var(--text-primary)]"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-current origin-center transition-all"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[1.5px] bg-current"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-current origin-center transition-all"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[68px] z-40 md:hidden bg-[var(--bg-card)]/95 backdrop-blur-xl border-b border-[var(--border)] px-6 py-6 flex flex-col gap-5"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
