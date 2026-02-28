import Nav from "@/components/Nav";
import { projects } from "@/components/WorkSection";
import Image from "next/image";
import Contact from "@/components/Contact";
import Link from "next/link";

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <main className="bg-black min-h-screen pt-40 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/work" className="text-[#c8ff00] hover:underline">
            Back to Work
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black min-h-screen">
      <Nav />
      {/* Hero section for case study */}
      <section className="pt-40 max-w-[1000px] mx-auto px-6 sm:px-12 mb-20 text-center">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white mb-6">
          {project.title}
        </h1>
        <p className="text-white/50 text-sm font-semibold uppercase tracking-widest mb-12">
          {project.category}
        </p>
        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-white/5">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Brief content body */}
      <section className="max-w-[800px] mx-auto px-6 sm:px-12 mb-40 text-left text-white/80 text-lg leading-relaxed font-light">
        <h2 className="text-white text-3xl font-semibold mb-6">Overview</h2>
        <p className="mb-8">
          This project involved designing from the ground up, blending aesthetic
          appeal with deep functional logic. We focused on micro-interactions
          and cinematic layouts to bring the digital experience to life.
        </p>
        <p className="mb-12">
          The goal was to create a digital product that doesn&apos;t just work,
          but feels intuitive, modern, and aligned with the brand&apos;s core
          values. Using Next.js and Framer Motion, we achieved a smooth,
          immersive journey for the user.
        </p>

        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[#c8ff00] text-sm font-semibold uppercase tracking-widest hover:text-white transition-colors"
        >
          &larr; Back to all work
        </Link>
      </section>

      <Contact />
    </main>
  );
}
