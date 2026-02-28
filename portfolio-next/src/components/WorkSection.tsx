"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export const projects = [
  {
    id: "1",
    slug: "geometric-dashboard",
    title: "Geometric Dashboard",
    category: "UI/UX Design",
    image: "/images/hero-1.png",
  },
  {
    id: "2",
    slug: "abstract-art",
    title: "Abstract Art Platform",
    category: "Web App",
    image: "/images/hero-2.png",
  },
  {
    id: "3",
    slug: "fintech-mobile",
    title: "Fintech Mobile App",
    category: "Product Design",
    image: "/images/hero-3.png",
  },
  {
    id: "4",
    slug: "creative-studio",
    title: "Creative Studio",
    category: "Brand Identity",
    image: "/images/hero-4.png",
  },
];

export default function WorkSection() {
  return (
    <section id="work" className="py-40 px-6 sm:px-12 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Selected Work
          </h2>
          <Link
            href="/work"
            className="text-[#c8ff00] uppercase text-sm font-semibold tracking-widest hover:text-white transition-colors"
          >
            View All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, i) => (
            <Link key={project.id} href={`/work/${project.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative cursor-pointer"
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover Reveal Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <p className="text-[#c8ff00] text-sm uppercase tracking-widest font-semibold mb-2">
                      View Case Study
                    </p>
                  </div>
                </div>
                <div className="pt-6">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-white text-2xl font-semibold tracking-tight group-hover:text-[#c8ff00] transition-colors">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
