"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  const projects = [
    { href: "/projects/design-intelligence", label: "Design Intelligence" },
  ];

  const links = [
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
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
          {/* Projects Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProjectsOpen(true)}
            onMouseLeave={() => setProjectsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setProjectsOpen((prev) => !prev)}
              aria-expanded={projectsOpen}
              aria-haspopup="menu"
              className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors tracking-wide flex items-center gap-2"
            >
              Projects
              <motion.svg
                className="w-4 h-4"
                animate={{ rotate: projectsOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 9l6 6 6-6"
                />
              </motion.svg>
            </button>
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={
                projectsOpen
                  ? { opacity: 1, y: 0, pointerEvents: "auto" }
                  : { opacity: 0, y: -4, pointerEvents: "none" }
              }
              transition={{ duration: 0.2 }}
              role="menu"
              className="absolute left-0 mt-0 w-48 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg shadow-lg py-2"
            >
              {projects.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  onClick={() => setProjectsOpen(false)}
                  className="block px-4 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
                >
                  {p.label}
                </Link>
              ))}
            </motion.div>
          </div>

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
            {/* Mobile Projects Dropdown */}
            <div>
              <button
                onClick={() => setProjectsOpen(!projectsOpen)}
                aria-expanded={projectsOpen}
                aria-haspopup="menu"
                className="text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2 w-full"
              >
                Projects
                <motion.svg
                  className="w-4 h-4"
                  animate={{ rotate: projectsOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 9l6 6 6-6"
                  />
                </motion.svg>
              </button>
              <AnimatePresence>
                {projectsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 pt-2 flex flex-col gap-3">
                      {projects.map((p) => (
                        <Link
                          key={p.href}
                          href={p.href}
                          onClick={() => {
                            setMenuOpen(false);
                            setProjectsOpen(false);
                          }}
                          className="text-base text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                        >
                          {p.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
