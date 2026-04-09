"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ── Resume Download Confirmation Modal ───────────────────────────────────────

function ResumeModal({ onClose }: { onClose: () => void }) {
  const resumeFile = "/Resume - Shvetha Senthilkumar.pdf";

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = resumeFile;
    a.download = "Resume - Shvetha Senthilkumar.pdf";
    a.click();
    onClose();
  };

  // Close on Escape
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
      onKeyDown={handleKey}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className="relative w-full max-w-[900px] h-[85vh] flex flex-col rounded-[24px] border border-[var(--border)] bg-[var(--bg-primary)] font-manrope overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title and Download Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--bg-secondary)] shrink-0">
          <h3 className="text-[18px] font-semibold text-[var(--text-primary)] tracking-tight">
            Resume
          </h3>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl text-[13px] font-semibold bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 16 16" className="w-4 h-4 fill-none stroke-current stroke-[1.5]">
                <path d="M8 2v9M4 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 14h12" strokeLinecap="round" />
              </svg>
              Download
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2]">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Preview container */}
        <div className="flex-1 w-full bg-[#f1f1f1] relative">
          <iframe 
            src={`${resumeFile}#toolbar=0`} 
            className="w-full h-full border-none"
            title="Resume Preview"
          />
        </div>
      </motion.div>
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/#journey", label: "About" },
    { href: "/#contact", label: "Contact" },
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
            {/* Desktop Resume button */}
            <button
              onClick={() => setResumeModalOpen(true)}
              className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors tracking-wide"
            >
              Resume
            </button>
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
            {/* Mobile Resume button */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.06 }}
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setResumeModalOpen(true);
                }}
                className="text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Resume
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume download confirmation modal */}
      <AnimatePresence>
        {resumeModalOpen && (
          <ResumeModal onClose={() => setResumeModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
