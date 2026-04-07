"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RelatedProjects from "@/components/RelatedProjects";
import QuickBriefButton from "@/components/QuickBriefButton";

const BRIEF_DATA = {
  title: "Design Intelligence",
  href: "#summary",
  accentColor: "#F24E1E",
  role: "Product Designer",
  duration: "3 months",
  tools: "Figma, Perplexity",
  category: "Product Concept",
  points: [
    "Embedded real-time design review directly into the Figma workflow",
    "Detects spacing, contrast, accessibility & design-system deviations on the canvas",
    "Flags orphan screens and broken navigation flows automatically",
    "Eliminates context-switching between tools and review plugins",
    "Outcome: 55% faster issue detection, 50% higher consistency, 35% less rework",
  ],
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function FinanceAppPage() {
  const [activeHash, setActiveHash] = useState("#summary");

  useEffect(() => {
    const sections = [
      "summary",
      "problem",
      "users",
      "frustrations",
      "design",
      "testing",
      "snippets",
      "impact",
      "next",
    ];
    const ob = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveHash("#" + e.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px" },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) ob.observe(el);
    });
    return () => ob.disconnect();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center selection:bg-[#84CC16] selection:text-white font-manrope bg-[var(--theme-bg)] text-[var(--theme-text-mid)] antialiased">
        {/* Navbar */}
        <Nav />

        <main className="w-full max-w-[1440px] px-8 md:px-[60px] pt-28 md:pt-36 pb-24">
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
              Real-Time Design Review Inside Figma
            </h1>
            <div className="flex flex-col items-center lg:mt-2 relative">
              <span className="text-[64px] lg:text-[80px] font-medium leading-[0.60] opacity-20 tracking-tight relative z-10 text-[var(--theme-text-lo)]">
                02
              </span>
              <div className="w-[50px] h-[3px] mt-4 rounded-full relative z-10 bg-[var(--theme-accent)]"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24 lg:mb-32">
            <div className="col-span-2 hidden md:block"></div>
            <div className="col-span-2">
              <p className="text-base leading-[1.8] pr-4 lg:pr-12 max-w-[600px] text-[var(--theme-text-lo)]">
                In this project, I explored how design tools can shift from
                passive creation platforms to active design assistants. By
                embedding intelligence directly into the workflow, the goal is
                to help designers identify issues early, reduce friction, and
                make better design decisions in real time.
              </p>
            </div>
          </div>

          <div className="w-full h-[1px] mb-12 bg-[var(--theme-border)]"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 pb-12 border-b border-[var(--theme-border)]">
            {[
              ["Role", "Product Designer"],
              ["Project Duration", "3 months"],
              ["Tools", "Figma, Perplexity"],
              ["Category", "Product Concept"],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-4">
                <span className="text-[14px] uppercase tracking-[0.14em] font-bold opacity-50 text-[var(--theme-text-lo)]">
                  {label}
                </span>
                <span className="text-[20px] font-medium text-[var(--theme-text-hi)]">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16 mt-20 md:mt-32">
            <aside className="col-span-1 lg:col-span-3 flex flex-col lg:sticky lg:top-32 h-fit mb-12 lg:mb-0 z-20 xl:pl-4">
              <h4 className="text-[14px] uppercase tracking-[0.12em] font-semibold mb-8 opacity-80 text-[var(--theme-text-lo)]">
                Contents
              </h4>
              <ul className="flex flex-col gap-4 text-[14px]">
                {[
                  { id: "#summary", label: "01 / Summary" },
                  { id: "#problem", label: "02 / The Problem" },
                  { id: "#users", label: "03 / Users and Research" },
                  {
                    id: "#frustrations",
                    label: "04 / Frustrations and Findings",
                  },
                  { id: "#design", label: "05 / Design Concept" },
                  { id: "#testing", label: "06 / User Testing" },
                  { id: "#snippets", label: "07 / Snippets" },
                  { id: "#impact", label: "08 / Impact and Learnings" },
                  { id: "#next", label: "09 / What's Next" },
                ].map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.id}
                      className="transition-all font-medium"
                      style={{
                        color:
                          activeHash === link.id
                            ? "var(--theme-text-hi)"
                            : "var(--theme-text-lo)",
                        opacity: activeHash === link.id ? 1 : 0.4,
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="col-span-1 lg:col-span-9 flex flex-col pt-2 lg:pt-0">
              {/* 01: Summary */}
              <div id="summary" className="scroll-mt-32">
                <div className="grid grid-cols-1 md:grid-cols-11 gap-x-8 gap-y-12 mb-16 lg:ml-2">
                  <div className="col-span-1 md:col-span-5 lg:col-span-4 flex flex-col">
                    <h2 className="text-[32px] md:text-[32px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">
                      Summary
                    </h2>
                    <div className="w-[45px] h-[3px] rounded-full mb-8 bg-[var(--theme-accent)]"></div>
                    <p className="text-[16px] leading-[1.65] w-[95%] lg:w-[85%] text-[var(--theme-text-mid)]">
                      A product concept exploring how design review can be
                      integrated directly into the design process instead of
                      being treated as a separate step.
                    </p>
                  </div>
                  <div className="col-span-1 md:col-span-6 lg:col-span-7 flex flex-col gap-8 lg:pl-12">
                    <p className="text-[16px] leading-[1.7] md:w-[95%] text-[var(--theme-text-mid)]">
                      Most design tools today focus on creation, but reviewing
                      designs often happens later or through plugins.
                    </p>
                    <p className="text-[16px] leading-[1.7] md:w-[95%] text-[var(--theme-text-mid)]">
                      This concept introduces Design Intelligence, a system that
                      works alongside designers, automatically detecting issues,
                      suggesting improvements, and maintaining consistency in
                      real time.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8 mt-10">
                      {[
                        ["Faster Issue Detection", "55%"],
                        ["Reduced Rework", "35%"],
                        ["Improved Consistency", "50%"],
                        ["Better Accessibility", "42%"],
                      ].map(([label, val]) => (
                        <div key={label}>
                          <p className="text-[14px] font-medium mb-3 tracking-wide text-[var(--theme-text-lo)]">
                            {label}
                          </p>
                          <p className="text-[36px] md:text-[44px] font-medium leading-none tracking-tight text-[var(--theme-text-hi)]">
                            {val}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center mb-16">
                  <Image
                    src="/images/Project 2 - Design Intelligence Case study Images/Summary - DI.png"
                    alt="Summary mockup"
                    width={1000}
                    height={700}
                    className="w-auto max-h-[700px] object-contain rounded-[24px]"
                  />
                </div>
              </div>

              {/* 02: Problem */}
              <div
                id="problem"
                className="scroll-mt-32 flex flex-col items-start mt-32 mb-16"
              >
                <h2 className="text-[32px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">
                  The Problem
                </h2>
                <div className="w-[50px] h-[3px] rounded-full mb-10 bg-[var(--theme-accent)]"></div>
                <p className="text-base leading-[1.65] text-left max-w-[820px] mb-20 text-[var(--theme-text-lo)]">
                  Design tools prioritize creation, but reviewing quality still
                  depends on manual checks
                  <br className="hidden md:block" /> or plugins, which
                  interrupts flow and delays feedback.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-20">
                  <div className="flex flex-col border rounded-[20px] p-2 bg-[var(--theme-surface)] border-[var(--theme-border)]">
                    <div className="w-full aspect-[4/3] rounded-[12px] mb-4 relative overflow-hidden">
                      <Image
                        src="/images/Project 2 - Design Intelligence Case study Images/DI Problem - 1.png"
                        alt="Missed Design Issues"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="px-2 pb-2 flex flex-col">
                      <h3 className="text-[16px] font-medium mb-3 text-[var(--theme-text-hi)]">
                        Missed Design Issues
                      </h3>
                      <p className="text-[14px] leading-[1.65] text-[var(--theme-text-lo)]">
                        Small inconsistencies like spacing, contrast, or
                        alignment often remain unnoticed during the design
                        process.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col border rounded-[20px] p-2 bg-[var(--theme-surface)] border-[var(--theme-border)]">
                    <div className="w-full aspect-[4/3] rounded-[12px] mb-4 relative overflow-hidden">
                      <Image
                        src="/images/Project 2 - Design Intelligence Case study Images/DI Problem - 2.png"
                        alt="Fragmented Workflow"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="px-2 pb-2 flex flex-col">
                      <h3 className="text-[16px] font-medium mb-3 text-[var(--theme-text-hi)]">
                        Fragmented Workflow
                      </h3>
                      <p className="text-[14px] leading-[1.65] text-[var(--theme-text-lo)]">
                        Switching between designing and plugins breaks focus and
                        adds unnecessary steps to the workflow.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col border rounded-[20px] p-2 bg-[var(--theme-surface)] border-[var(--theme-border)]">
                    <div className="w-full aspect-[4/3] rounded-[12px] mb-4 relative overflow-hidden">
                      <Image
                        src="/images/Project 2 - Design Intelligence Case study Images/DI Problem - 3.png"
                        alt="Delayed Feedback"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="px-2 pb-2 flex flex-col">
                      <h3 className="text-[16px] font-medium mb-3 text-[var(--theme-text-hi)]">
                        Delayed Feedback
                      </h3>
                      <p className="text-[14px] leading-[1.65] text-[var(--theme-text-lo)]">
                        Issues are identified after completion, leading to
                        rework and slower iteration cycles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 03: Users */}
              <div
                id="users"
                className="scroll-mt-32 w-full border rounded-[32px] p-10 lg:p-14 mb-16 lg:ml-2 bg-[var(--theme-surface)] border-[var(--theme-border)]"
              >
                <h2 className="text-[32px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">
                  Users and Research
                </h2>
                <div className="w-[50px] h-[3px] rounded-full mb-12 bg-[var(--theme-accent)]"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 mb-16">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[16px] font-medium tracking-wide text-[var(--theme-text-hi)]">
                      Why it Started ?
                    </h3>
                    <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">
                      Designers focus on building interfaces, not constantly
                      reviewing them. This creates gaps where small issues go
                      unnoticed, especially in fast-paced workflows involving
                      multiple screens and components.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[16px] font-medium tracking-wide text-[var(--theme-text-hi)]">
                      Who are we solving for?
                    </h3>
                    <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">
                      Product and UI designers working on complex flows,
                      managing multiple screens, components, and systems, where
                      maintaining consistency and catching small issues becomes
                      difficult during active design work.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[16px] font-medium tracking-wide text-[var(--theme-text-hi)]">
                      How are we solving it?
                    </h3>
                    <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">
                      Shift the experience from manual review to real-time
                      guidance by embedding feedback directly into the design
                      environment, allowing designers to identify and resolve
                      issues instantly without switching.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full">
                  <div className="flex flex-col gap-6">
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#1A1A1A] border border-[#FAFAFA] rounded-[12px] p-[8px]">
                      <div className="relative w-full h-full rounded-[4px] overflow-hidden border border-black/20 bg-white">
                        <Image
                          src="/images/Project 2 - Design Intelligence Case study Images/DI User Research - Research Approach - 1.png"
                          alt="Research Approach"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 px-1">
                      <h4 className="text-[16px] font-medium text-[var(--theme-text-hi)]">
                        Research Approach
                      </h4>
                      <p className="text-[14px] leading-[1.65] text-[var(--theme-text-lo)]">
                        Focused on understanding where designers lose attention
                        and how delayed feedback impacts design quality.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#1A1A1A] border border-[#FAFAFA] rounded-[12px] p-[8px]">
                      <div className="relative w-full h-full rounded-[4px] overflow-hidden border border-black/20 bg-white">
                        <Image
                          src="/images/Project 2 - Design Intelligence Case study Images/DI User Research - Intelligence oppurtunity - 2.png"
                          alt="Intelligence Opportunity"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 px-1">
                      <h4 className="text-[16px] font-medium text-[var(--theme-text-hi)]">
                        Intelligence Opportunity
                      </h4>
                      <p className="text-[14px] leading-[1.65] text-[var(--theme-text-lo)]">
                        This enables tools to move from passive interfaces to
                        active systems that assist designers while decisions are
                        being made.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 04: Frustrations */}
              <div
                id="frustrations"
                className="scroll-mt-32 w-full mb-24 lg:mb-32 mt-20 md:mt-32 lg:ml-2"
              >
                <h2 className="text-[32px] md:text-[32px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">
                  Frustrations and Findings
                </h2>
                <div className="w-[50px] h-[3px] rounded-full mb-10 bg-[var(--theme-accent)]"></div>
                <p className="text-[16px] leading-[1.7] max-w-[700px] mb-20 text-[var(--theme-text-lo)]">
                  Designers don&apos;t ignore issues, they simply don&apos;t see
                  them at the right moment. Most problems surface too late,
                  after the design is already built.
                </p>

                <h3 className="text-[24px] font-medium mb-10 text-[var(--theme-text-hi)]">
                  Pain points identified
                </h3>

                <div className="flex flex-wrap gap-3 w-[698px]">
                  {[
                    "Where are inconsistencies across my screens",
                    "Does this meet accessibility standards",
                    "Am I following the design system correctly",
                    "Is my spacing system consistent",
                    "Are all my flows connected properly",
                    "What small details am I missing",
                    "Why does something feel slightly off",
                    "Is this visually balanced",
                  ].map((p) => (
                    <div
                      key={p}
                      className="px-4 py-2.5 rounded-[100px] border text-[16px] font-medium cursor-default select-none whitespace-nowrap border-[var(--theme-border)] text-[var(--theme-text-lo)]"
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* 05: Design Concept */}
              <div
                id="design"
                className="scroll-mt-32 w-full mb-32 pt-10 lg:ml-2"
              >
                <h2 className="text-[32px] md:text-[32px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">
                  Design Concept
                </h2>
                <div className="w-[50px] h-[3px] rounded-full mb-20 bg-[var(--theme-accent)]"></div>

                <div className="flex flex-col gap-24">
                  {/* Item 1 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div className="flex flex-col">
                      <h3 className="text-[24px] font-medium mb-4 tracking-tight text-[var(--theme-text-hi)]">
                        Guided Design Awareness
                      </h3>
                      <p className="text-[16px] leading-[1.6] mb-6 text-[var(--theme-text-lo)]">
                        Surfaces issues directly on the canvas as they occur,
                        making problems visible in the moment.
                      </p>
                      <ul className="flex flex-col gap-3.5 pl-1">
                        {[
                          "Detects spacing, contrast, and structure",
                          "Highlights issues in context",
                          "Brings hidden problems into focus",
                          "Removes separate review steps",
                          "Fixes issues during creation",
                        ].map((li) => (
                          <li
                            key={li}
                            className="flex items-center gap-3 text-[16px] leading-none text-[var(--theme-text-lo)]"
                          >
                            <div className="w-1.5 h-1.5 rounded-sm shrink-0 bg-[#FAFAFA]"></div>
                            {li}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="w-full aspect-[4/3] relative rounded-[16px] overflow-hidden border border-[var(--theme-border)] p-2">
                      <Image
                        src="/images/Project 2 - Design Intelligence Case study Images/DI Design concept - 1.png"
                        alt="Guided Design Awareness"
                        fill
                        className="object-cover rounded-[8px]"
                      />
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div className="flex flex-col">
                      <h3 className="text-[24px] font-medium mb-4 tracking-tight text-[var(--theme-text-hi)]">
                        In-Flow Accessibility Checks
                      </h3>
                      <p className="text-[16px] leading-[1.6] mb-6 text-[var(--theme-text-lo)]">
                        Embeds accessibility checks into the workflow, enabling
                        instant corrections without context switching.
                      </p>
                      <ul className="flex flex-col gap-3.5 pl-1">
                        {[
                          "Flags low contrast instantly",
                          "Suggests accessible color options",
                          "Enables one-click fixes",
                          "Aligns with accessibility standards",
                          "Removes external tool dependency",
                        ].map((li) => (
                          <li
                            key={li}
                            className="flex items-center gap-3 text-[16px] leading-none text-[var(--theme-text-lo)]"
                          >
                            <div className="w-1.5 h-1.5 rounded-sm shrink-0 bg-[#FAFAFA]"></div>
                            {li}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="w-full aspect-[4/3] relative rounded-[16px] overflow-hidden border border-[var(--theme-border)] p-2">
                      <Image
                        src="/images/Project 2 - Design Intelligence Case study Images/DI Design concept - 2.png"
                        alt="In-Flow Accessibility Checks"
                        fill
                        className="object-cover rounded-[8px]"
                      />
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div className="flex flex-col">
                      <h3 className="text-[24px] font-medium mb-4 tracking-tight text-[var(--theme-text-hi)]">
                        Design System Integrity
                      </h3>
                      <p className="text-[16px] leading-[1.6] mb-6 text-[var(--theme-text-lo)]">
                        Maintains consistency by detecting deviations and
                        guiding designs back to system-defined components.
                      </p>
                      <ul className="flex flex-col gap-3.5 pl-1">
                        {[
                          "Flags detached components",
                          "Suggests system reconnection",
                          "Prevents visual inconsistencies",
                          "Reinforces system usage",
                          "Keeps designs aligned",
                        ].map((li) => (
                          <li
                            key={li}
                            className="flex items-center gap-3 text-[16px] leading-none text-[var(--theme-text-lo)]"
                          >
                            <div className="w-1.5 h-1.5 rounded-sm shrink-0 bg-[#FAFAFA]"></div>
                            {li}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="w-full aspect-[4/3] relative rounded-[16px] overflow-hidden border border-[var(--theme-border)] p-2">
                      <Image
                        src="/images/Project 2 - Design Intelligence Case study Images/DI Design concept - 3.png"
                        alt="Design System Integrity"
                        fill
                        className="object-cover rounded-[8px]"
                      />
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div className="flex flex-col">
                      <h3 className="text-[24px] font-medium mb-4 tracking-tight text-[var(--theme-text-hi)]">
                        Connection Intelligence
                      </h3>
                      <p className="text-[16px] leading-[1.6] mb-6 text-[var(--theme-text-lo)]">
                        Ensures complete user journeys by identifying gaps in
                        navigation and interaction.
                      </p>
                      <ul className="flex flex-col gap-3.5 pl-1">
                        {[
                          "Detects broken flows",
                          "Flags orphan screens",
                          "Suggests next connections",
                          "Maintains navigation continuity",
                          "Reduces flow errors early",
                        ].map((li) => (
                          <li
                            key={li}
                            className="flex items-center gap-3 text-[16px] leading-none text-[var(--theme-text-lo)]"
                          >
                            <div className="w-1.5 h-1.5 rounded-sm shrink-0 bg-[#FAFAFA]"></div>
                            {li}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="w-full aspect-[4/3] relative rounded-[16px] overflow-hidden border border-[var(--theme-border)] p-2">
                      <Image
                        src="/images/Project 2 - Design Intelligence Case study Images/DI Design concept - 4.png"
                        alt="Connection Intelligence"
                        fill
                        className="object-cover rounded-[8px]"
                      />
                    </div>
                  </div>

                  {/* Item 5 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div className="flex flex-col">
                      <h3 className="text-[24px] font-medium mb-4 tracking-tight text-[var(--theme-text-hi)]">
                        Design Health Visibility
                      </h3>
                      <p className="text-[16px] leading-[1.6] mb-6 text-[var(--theme-text-lo)]">
                        Turns design quality into a measurable signal that
                        evolves with the product.
                      </p>
                      <ul className="flex flex-col gap-3.5 pl-1">
                        {[
                          "Tracks issues and improvements",
                          "Shows design health score",
                          "Compares iterations easily",
                          "Supports faster decisions",
                          "Makes quality visible",
                        ].map((li) => (
                          <li
                            key={li}
                            className="flex items-center gap-3 text-[16px] leading-none text-[var(--theme-text-lo)]"
                          >
                            <div className="w-1.5 h-1.5 rounded-sm shrink-0 bg-[#FAFAFA]"></div>
                            {li}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="w-full aspect-[4/3] relative rounded-[16px] overflow-hidden border border-[var(--theme-border)] p-2">
                      <Image
                        src="/images/Project 2 - Design Intelligence Case study Images/DI Design concept - 5.png"
                        alt="Design Health Visibility"
                        fill
                        className="object-cover rounded-[8px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 06: Testing */}
              <div
                id="testing"
                className="scroll-mt-32 w-full border rounded-[32px] p-10 lg:p-14 mb-16 lg:ml-2 mt-20 md:mt-32 bg-[var(--theme-surface)] border-[var(--theme-border)] flex flex-col gap-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="flex flex-col">
                    <h2 className="text-[32px] md:text-[32px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">
                      User Testing
                    </h2>
                    <div className="w-[50px] h-[3px] rounded-full mb-10 bg-[var(--theme-accent)]"></div>
                    <p className="text-[16px] leading-[1.7] max-w-[400px] text-[var(--theme-text-lo)]">
                      Initial validation explored how real-time feedback
                      influences designer behaviour during active workflows.
                    </p>
                  </div>
                  <div className="flex flex-col gap-6">
                    <h3 className="text-[16px] font-medium text-[var(--theme-text-hi)]">
                      What stood out during testing
                    </h3>
                    <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">
                      Designers responded well to immediate insights, as they
                      reduced reliance on plugins and allowed issues to be fixed
                      instantly, maintaining flow and making the overall design
                      process more efficient and focused.
                    </p>
                    <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">
                      Designers also showed improved confidence in their
                      decisions, as feedback was available at the right moment.
                      This reduced hesitation and allowed them to move forward
                      without second-guessing their design choices.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
                  <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#1A1A1A] border border-[#FAFAFA] rounded-[12px] p-[8px]">
                    <div className="relative w-full h-full rounded-[4px] overflow-hidden border border-black/20 bg-white">
                      <Image
                        src="/images/Project 2 - Design Intelligence Case study Images/DI User Testing - 1.png"
                        alt="Testing 1"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#1A1A1A] border border-[#FAFAFA] rounded-[12px] p-[8px]">
                    <div className="relative w-full h-full rounded-[4px] overflow-hidden border border-black/20 bg-white">
                      <Image
                        src="/images/Project 2 - Design Intelligence Case study Images/DI User Testing - 2.png"
                        alt="Testing 2"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 07: Snippets */}
              <div id="snippets" className="scroll-mt-32 mt-24 mb-16 lg:ml-2">
                <h2 className="text-[32px] md:text-[32px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">
                  Snippets
                </h2>
                <div className="w-[50px] h-[3px] rounded-full mb-12 bg-[var(--theme-accent)]"></div>

                <h3 className="text-[20px] font-medium mb-6 tracking-wide text-[var(--theme-text-hi)]">
                  Before & After
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                  <div className="flex flex-col gap-4">
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#1A1A1A] border border-[#FAFAFA] rounded-[12px] p-[8px]">
                      <div className="relative w-full h-full rounded-[4px] overflow-hidden border border-black/20 bg-white">
                        <Image
                          src="/images/Project 2 - Design Intelligence Case study Images/DI Before.png"
                          alt="Before"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <span className="text-[16px] text-[var(--theme-text-lo)]">
                      Before
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#1A1A1A] border border-[#FAFAFA] rounded-[12px] p-[8px]">
                      <div className="relative w-full h-full rounded-[4px] overflow-hidden border border-black/20 bg-white">
                        <Image
                          src="/images/Project 2 - Design Intelligence Case study Images/DI After.png"
                          alt="After"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <span className="text-[16px] text-[var(--theme-text-lo)]">
                      After
                    </span>
                  </div>
                </div>

                <h3 className="text-[20px] font-medium mb-6 tracking-wide text-[var(--theme-text-hi)]">
                  Designs and explorations
                </h3>
                <div className="w-full aspect-[16/9] md:aspect-[2/1] relative overflow-hidden bg-[#1A1A1A] border border-[#FAFAFA] rounded-[12px] p-[8px]">
                  <div className="relative w-full h-full rounded-[4px] overflow-hidden border border-black/20 bg-white">
                    <Image
                      src="/images/Project 2 - Design Intelligence Case study Images/DI Design Explorations.png"
                      alt="Design Explorations"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* 08: Impact */}
              <div
                id="impact"
                className="scroll-mt-32 mt-24 mb-16 lg:ml-2 flex flex-col gap-8"
              >
                <div className="w-full border rounded-[32px] p-10 lg:p-14 bg-transparent border-[#FAFAFA]">
                  <h2 className="text-[32px] md:text-[32px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">
                    Design Impact
                  </h2>
                  <div className="w-[50px] h-[3px] rounded-full mb-16 bg-[var(--theme-accent)]"></div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-10">
                    {[
                      ["55%", "Faster Issue Detection"],
                      ["50%", "Higher Consistency"],
                      ["42%", "Better Accessibility"],
                      ["35%", "Reduced Rework"],
                    ].map(([val, label]) => (
                      <div
                        key={label}
                        className="flex flex-col items-center md:items-start text-center md:text-left"
                      >
                        <span className="text-[36px] md:text-[44px] font-medium mb-3 leading-none text-[var(--theme-text-hi)]">
                          {val}
                        </span>
                        <span className="text-[14px] font-medium tracking-wide text-[var(--theme-text-lo)]">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full border rounded-[32px] p-10 lg:p-14 bg-transparent border-[#FAFAFA]">
                  <h2 className="text-[32px] md:text-[32px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">
                    Learnings
                  </h2>
                  <div className="w-[50px] h-[3px] rounded-full mb-12 bg-[var(--theme-accent)]"></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    <ul className="flex flex-col gap-6">
                      {[
                        "Immediate feedback reduces rework and speeds up decisions",
                        "Contextual guidance lowers cognitive effort during design",
                        "Early issue detection prevents inconsistencies at scale",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-4 text-[16px] leading-[1.65] text-[var(--theme-text-lo)]"
                        >
                          <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-[var(--theme-text-lo)] opacity-50"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <ul className="flex flex-col gap-6">
                      {[
                        "Integrated systems remove dependency on plugins",
                        "Continuous feedback supports better design habits",
                        "Quality becomes part of the process, not a final step",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-4 text-[16px] leading-[1.65] text-[var(--theme-text-lo)]"
                        >
                          <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-[var(--theme-text-lo)] opacity-50"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 09: Next */}
              <div id="next" className="scroll-mt-32 mt-16 mb-24 lg:ml-2">
                <div className="w-full border rounded-[32px] p-10 lg:p-14 relative overflow-hidden bg-[var(--theme-surface)] border-[var(--theme-border)]">
                  <h2 className="text-[32px] md:text-[32px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">
                    What&apos;s Next
                  </h2>
                  <div className="w-[60px] h-[3px] rounded-full mb-16 bg-[var(--theme-accent)]"></div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 relative z-10">
                    {[
                      [
                        "Smarter Suggestions",
                        "Contextual recommendations help designers make faster decisions with less effort.",
                      ],
                      [
                        "Deeper Integration",
                        "Tighter system integration ensures consistency without extra steps.",
                      ],
                      [
                        "Collaborative Intelligence",
                        "Shared insights help teams maintain consistent quality at scale.",
                      ],
                    ].map(([title, desc]) => (
                      <div key={title} className="flex flex-col">
                        <h3 className="text-[20px] font-medium mb-3 text-[var(--theme-text-hi)]">
                          {title}
                        </h3>
                        <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center mt-20 mb-10 w-full text-center">
                  <span className="text-[16px] text-[var(--theme-text-lo)] opacity-70">
                    Thanks for reading . More projects coming in
                  </span>
                </div>
              </div>
            </div>
          </div>

          <RelatedProjects currentProject="Design Intelligence" />
        </main>

        <Footer />
      </div>
    </>
  );
}
