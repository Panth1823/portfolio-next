"use client";

import { ScrollVelocityRow } from "@/components/ui/scroll-based-velocity";

export default function BeyondWork() {
  return (
    <section className="bg-[var(--bg-primary)] relative py-20 sm:py-28 overflow-hidden">
      <ScrollVelocityRow baseVelocity={3} direction={1}>
        <span className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] opacity-20 mx-8 sm:mx-12 font-manrope">
          BEYOND WORK
        </span>
        <span className="text-[var(--text-primary)] opacity-20 text-2xl mx-4 font-manrope">
          •
        </span>
      </ScrollVelocityRow>
    </section>
  );
}
