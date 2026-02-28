"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-12 py-6 mix-blend-difference text-white"
    >
      <Link href="/" className="font-bold tracking-tighter text-xl">
        PANTH.
      </Link>
      <div className="flex items-center gap-6 text-sm font-medium tracking-wide">
        <Link href="#work" className="hover:text-[#c8ff00] transition-colors">
          Work
        </Link>
        <Link href="#about" className="hover:text-[#c8ff00] transition-colors">
          About
        </Link>
        <Link
          href="#contact"
          className="hover:text-[#c8ff00] transition-colors"
        >
          Contact
        </Link>
      </div>
    </motion.nav>
  );
}
