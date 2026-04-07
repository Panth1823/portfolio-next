"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/#journey", label: "About" },
    { href: "/#contact", label: "Contact" },
  ];

  const resumeFile = "/Resume - Shvetha Senthilkumar.pdf";

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
            className="flex items-center font-manrope font-semibold tracking-tight text-[var(--text-primary)]" style={{ fontSize: "24px" }}
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

        {/* Nav Links & Actions */}
        <div className="flex items-center gap-6 md:gap-10">
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors tracking-wide"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={resumeFile}
              download
              className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors tracking-wide"
            >
              Resume
            </a>
          </div>

          <button
            onClick={() => window.dispatchEvent(new Event("toggle-ai-chat"))}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border)] rounded-full text-[var(--text-muted)] text-sm font-medium hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-all active:scale-95 group"
          >
            <span>Chat with My AI</span>
            <span className="text-sm opacity-50 group-hover:opacity-100 transition-opacity">✨</span>
          </button>

          {/* Mobile: hamburger */}
          <div className="flex md:hidden items-center gap-4">
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
            {navLinks.map((l, i) => (
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
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.06 }}
            >
              <a
                href={resumeFile}
                download
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
