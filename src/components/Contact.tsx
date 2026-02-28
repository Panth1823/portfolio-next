"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-40 px-6 sm:px-12 bg-[var(--bg-primary)] flex flex-col justify-center items-center text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-[#c8ff00] text-sm font-semibold tracking-[2px] uppercase mb-8">
          Get In Touch
        </h2>
        <h3 className="text-4xl sm:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-10">
          Let&apos;s create something
          <br /> extraordinary together.
        </h3>

        <a
          href="mailto:hello@example.com"
          className="inline-block border border-[var(--border)] hover:border-[#c8ff00] hover:text-[#c8ff00] transition-colors rounded-full px-8 py-4 text-[var(--text-primary)] font-medium text-lg mb-16"
        >
          hello@example.com
        </a>

        <div className="flex justify-center gap-8 text-[var(--text-muted)] text-sm tracking-widest uppercase mb-16">
          <a
            href="#"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Twitter
          </a>
          <a
            href="#"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Dribbble
          </a>
          <a
            href="#"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Github
          </a>
        </div>
      </motion.div>
      <div className="border-t border-[var(--border)] w-full pt-10 text-[var(--text-muted)] text-xs text-center flex justify-between items-center max-w-4xl">
        <p>© 2026 Panth. All rights reserved.</p>
        <p>Built with Next.js & Framer Motion</p>
      </div>
    </section>
  );
}
