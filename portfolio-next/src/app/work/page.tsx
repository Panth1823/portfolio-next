"use client";

import Nav from "@/components/Nav";
import { projects } from "@/components/WorkSection";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Contact from "@/components/Contact";

export default function Work() {
  return (
    <main className="bg-black min-h-screen">
      <Nav />
      <div className="pt-40 max-w-[1200px] mx-auto px-6 sm:px-12 mb-32">
        <h1 className="text-6xl sm:text-8xl font-bold tracking-tight text-white mb-20 text-center">
          All <span className="text-white/40 italic">Work</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
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
      <Contact />
    </main>
  );
}
