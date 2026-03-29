"use client";

import { motion } from "framer-motion";
import heroImage from "@/assets/hero-mockup.jpg";
import Image from "next/image";
export default function DesignIntelligenceHero() {
  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              Design
              <br />
              Intelligence{" "}
              <span className="text-[hsl(240,4%,66%)]">for</span>
              <br />
              <span className="text-[hsl(240,4%,66%)]">Figma</span>
            </h1>

            <motion.p
              className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Helping designers catch usability issues in real-time
              without leaving Figma.
            </motion.p>

            <motion.div
              className="mt-6 text-sm md:text-base leading-relaxed max-w-lg space-y-0.5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-foreground/80">
                While designing, I realized it&apos;s never the big mistakes we miss,
              </p>
              <p className="text-foreground/80">
                it&apos;s the small ones that quietly slip through.
              </p>
              <p className="text-foreground/80">
                Not because we don&apos;t know better, but because we&apos;re
              </p>
              <p className="text-foreground/80">
                focused on creating and reviewing comes later.
              </p>
              <p className="text-foreground/80">
                That made me think, what if the tool could review designs
              </p>
              <p className="text-foreground/80">
                while we are still designing?
              </p>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="animate-float bg-[hsl(0,0%,4%)] rounded-2xl border border-white/10 shadow-xl p-3 md:p-4">
              <Image
                src={heroImage}
                alt="Design Intelligence plugin interface showing Figma integration"
                className="w-full max-w-lg rounded-xl transition-transform duration-500 hover:scale-105 translate-x-1 -translate-y-1"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
