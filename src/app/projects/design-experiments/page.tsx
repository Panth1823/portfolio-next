"use client";

import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RelatedProjects from "@/components/RelatedProjects";
import { useState, useRef } from "react";

// ── Bento Card ─────────────────────────────────────────────────────────────────

interface BentoCardProps {
  src: string;
  alt: string;
  videoSrc?: string;
  className?: string;
  objectPos?: string;
  w: number;
  h: number;
}

function BentoCard({
  src,
  alt,
  videoSrc,
  className = "",
  objectPos = "center center",
  w,
  h,
}: BentoCardProps) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-[16px] border border-[var(--theme-border)] bg-[var(--theme-surface)] ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Static image — fades out on hover when video is present */}
      <Image
        src={src}
        alt={alt}
        fill
        className={`transition-all duration-500 ${hovered && videoSrc ? "opacity-0 scale-[1.03]" : "opacity-100 scale-100"}`}
        style={{ objectFit: "cover", objectPosition: objectPos }}
      />

      {/* Video — always mounted, hidden until hover for instant playback */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="auto"
          width={w}
          height={h}
          className={`absolute inset-0 block transition-opacity duration-500 w-full h-full object-cover ${hovered ? "opacity-100" : "opacity-0"}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: objectPos }}
        />
      )}

    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DesignExperimentsPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center selection:bg-[#84CC16] selection:text-white font-manrope bg-[var(--theme-bg)] text-[var(--theme-text-mid)] antialiased">
        <Nav />

        <main className="w-full max-w-[1440px] px-8 md:px-[60px] pt-28 md:pt-36 pb-24">
          {/* ── Section 1: Hero ── */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2.5 text-[14px] font-medium hover:opacity-80 transition-all mb-16 md:mb-20 text-[var(--theme-text-lo)]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-current stroke-[1.5]"
            >
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Go back
          </Link>

          <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-10 mb-14">
            <h1 className="text-[64px] font-medium leading-[1.1] tracking-tight max-w-[900px] text-[var(--theme-text-hi)]">
              Design Experiments that Sparked My Curiosity
            </h1>
            <div className="flex flex-col items-center lg:mt-2 relative">
              <span className="text-[64px] lg:text-[80px] font-medium leading-[0.60] opacity-20 tracking-tight relative z-10 text-[var(--theme-text-lo)]">
                04
              </span>
              <div className="w-[50px] h-[3px] mt-4 rounded-full relative z-10 bg-[var(--theme-accent)]"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24 lg:mb-32">
            <div className="col-span-2 hidden md:block"></div>
            <div className="col-span-2">
              <p className="text-base leading-[1.8] pr-4 lg:pr-12 max-w-[600px] text-[var(--theme-text-lo)]">
                This is a collection of explorations across web, app,
                interaction and branding projects driven by curiosity and a
                desire to go beyond conventional design patterns. It captures my
                process of learning, testing ideas, and discovering what truly
                works through hands-on experimentation.
              </p>
            </div>
          </div>

          {/* ── Section 2: Bento Grid — matching the reference image ── */}
          <div className="w-full mb-24 lg:mb-32 flex flex-col gap-3">
            {/* Top row: narrow vertical label strip + left card + right card */}
            <div className="flex gap-3" style={{ height: "442px" }}>
              {/* Vertical "Micro Interactions" label strip */}
              <div className="flex-none w-[52px] rounded-[16px] bg-[#111] border border-[var(--theme-border)] flex flex-col items-center justify-between py-6 px-2">
                <div
                  className="text-[var(--theme-text-hi)] font-medium text-[11px] tracking-widest uppercase opacity-60 select-none"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  Micro Interactions
                </div>
                <div className="w-6 h-6 rounded-full bg-[var(--theme-accent)]/20 flex items-center justify-center">
                  <svg width="7" height="8" viewBox="0 0 7 8" fill="none">
                    <polygon points="1,0.5 6.5,4 1,7.5" fill="#84CC16" />
                  </svg>
                </div>
              </div>

              {/* Top-left: Yummy / Meal Steal */}
              <BentoCard
                src="/images/Rectangle 20.png"
                alt="Yummy - Meal Steal App"
                videoSrc="/videos/1 - Design Experiments -  Micro Interaction section - Row 1 - 1st video.mp4"
                objectPos="center center"
                className="flex-1"
                w={653}
                h={422}
              />

              {/* Top-right: Good Morning Coffee */}
              <BentoCard
                src="/images/Rectangle 18.png"
                alt="Good Morning Coffee App"
                videoSrc="/videos/2 - Design Experiments -  Micro Interaction section - Row 1 - 2nd video.mp4"
                objectPos="center top"
                className="flex-none w-[38%]"
                w={316}
                h={422}
              />
            </div>

            {/* Bottom row: Pizza Party + Furniture designer */}
            <div className="flex gap-3" style={{ height: "338px" }}>
              {/* Bottom-left: Pizza Party */}
              <BentoCard
                src="/images/Rectangle 19.png"
                alt="Pizza Party App"
                videoSrc="/videos/3 - Design Experiments -  Micro Interaction section - Row 2 - 1st video.mp4"
                objectPos="center center"
                className="flex-1"
                w={515}
                h={338}
              />

              {/* Bottom-right: Foam Wood Furniture */}
              <BentoCard
                src="/images/Rectangle 21.png"
                alt="Foam Wood - Design Your Own Furniture"
                videoSrc="/videos/4 - Design Experiments -  Micro Interaction section - Row 2 - 2nd video.mp4"
                objectPos="center center"
                className="flex-1"
                w={540}
                h={338}
              />
            </div>
          </div>

        </main>

        {/* ── Section 3: Full project image collage ── */}
        <div className="w-full mb-24 lg:mb-32">
          <Image
            src="/images/Design Experiments.png"
            alt="Design Experiments — full project collage"
            width={1920}
            height={2400}
            sizes="100vw"
            className="w-full h-auto"
            priority
          />
        </div>

        <div className="w-full max-w-[1440px] px-8 md:px-[60px] pb-24">
          {/* ── Section 4: Related Projects ── */}
          <RelatedProjects currentProject="Design Experiments" />
        </div>

        {/* ── Section 5: Footer ── */}
        <Footer />
      </div>
    </>
  );
}
