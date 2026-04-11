"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RelatedProjects from "@/components/RelatedProjects";
import {
  CheckerboardFrame,
  ConceptBlock,
  MetricGrid,
  SectionHeading,
  TwoColumnBulletList,
} from "@/components/ProjectCaseStudyBlocks";

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
              Designing My Portfolio as a Product
            </h1>
            <div className="flex flex-col items-center lg:mt-2 relative">
              <span className="text-[64px] lg:text-[80px] font-medium leading-[0.60] opacity-20 tracking-tight relative z-10 text-[var(--theme-text-lo)]">
                01
              </span>
              <div className="w-[50px] h-[3px] mt-4 rounded-full relative z-10 bg-[var(--theme-accent)]"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24 lg:mb-32">
            <div className="col-span-2 hidden md:block"></div>
            <div className="col-span-2">
              <p className="text-base leading-[1.8] pr-4 lg:pr-12 max-w-[600px] text-[var(--theme-text-lo)]">
                A self-initiated project focused on transforming my portfolio
                from a visual showcase into a strategic product that
                communicates design thinking, decision-making, and impact
                clearly to recruiters within seconds.
              </p>
            </div>
          </div>

          <div className="w-full h-[1px] mb-12 bg-[var(--theme-border)]"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 pb-12 border-b border-[var(--theme-border)]">
            {[
              ["Role", "Product Designer"],
              ["Project Duration", "4 months"],
              ["Tools", "Figma, Perplexity"],
              ["Category", "Portfolio"],
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
                      Most portfolios focus on visuals, making it difficult for
                      recruiters to quickly understand a designer&apos;s
                      thinking, process, and real impact.
                    </p>
                  </div>
                  <div className="col-span-1 md:col-span-6 lg:col-span-7 flex flex-col gap-8 lg:pl-12">
                    <p className="text-[16px] leading-[1.7] md:w-[95%] text-[var(--theme-text-mid)]">
                      This project rethinks the portfolio as a product,
                      prioritizing clarity, storytelling, and scannability over
                      purely aesthetic presentation.
                    </p>
                    <p className="text-[16px] leading-[1.7] md:w-[95%] text-[var(--theme-text-mid)]">
                      The goal was to design a portfolio that communicates value
                      within seconds while still allowing deeper exploration
                      when needed.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8 mt-10">
                      {[
                        ["Improved content clarity", "40%"],
                        ["Lower Effort Evaluation", "38%"],
                        ["Faster project understanding", "55%"],
                        ["Better Scannability", "42%"],
                      ].map(([label, val]) => (
                        <div key={label}>
                          <p className="text-[14px] font-medium mb-3 tracking-wide uppercase opacity-80 text-[var(--theme-text-lo)]">
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
                    src="/images/Portfolio Breakdown/1 Summary - Portfolio.png"
                    alt="Portfolio Strategy Summary"
                    width={1000}
                    height={700}
                    className="w-auto max-h-[700px]  rounded-[24px]"
                    priority
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
                <p className="text-base leading-[1.65] text-left max-w-[700px] mb-24 lg:mb-32 text-[var(--theme-text-lo)]">
                  Recruiters struggle to quickly evaluate portfolios as key
                  insights, decisions,
                  <br className="hidden md:block" /> and impact are unclear or
                  difficult to find.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-20">
                  <div className="flex flex-col border rounded-[20px] p-2 bg-[var(--theme-surface)] border-[var(--theme-border)]">
                    <div className="w-full aspect-[4/3] rounded-[8px] mb-4 relative overflow-hidden">
                      <Image
                        src="/images/Portfolio Breakdown/Problem 1 -  Low signal.png"
                        alt="Low signal to noise ratio"
                        fill
                        className=""
                      />
                    </div>
                    <div className="px-2 pb-2 flex flex-col">
                      <h3 className="text-[16px] font-medium mb-3 text-[var(--theme-text-hi)]">
                        Low signal-to-noise ratio
                      </h3>
                      <p className="text-[16px] leading-[1.65] text-[var(--theme-text-lo)]">
                        Important insights are buried under visual-heavy
                        content.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col border rounded-[20px] p-2 bg-[var(--theme-surface)] border-[var(--theme-border)]">
                    <div className="w-full aspect-[4/3] rounded-[8px] mb-4 relative overflow-hidden">
                      <Image
                        src="/images/Portfolio Breakdown/Problem 2 -  Unstructured Flow.png"
                        alt="Unstructured evaluation flow"
                        fill
                        className=""
                      />
                    </div>
                    <div className="px-2 pb-2 flex flex-col">
                      <h3 className="text-[16px] font-medium mb-3 text-[var(--theme-text-hi)]">
                        Unstructured evaluation flow
                      </h3>
                      <p className="text-[16px] leading-[1.65] text-[var(--theme-text-lo)]">
                        No clear path to review projects efficiently, increasing
                        time and effort.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col border rounded-[20px] p-2 bg-[var(--theme-surface)] border-[var(--theme-border)]">
                    <div className="w-full aspect-[4/3] rounded-[8px] mb-4 relative overflow-hidden">
                      <Image
                        src="/images/Portfolio Breakdown/Problem 3 - Hard to Evaluate.png"
                        alt="Hard to evaluate decisions"
                        fill
                        className=""
                      />
                    </div>
                    <div className="px-2 pb-2 flex flex-col">
                      <h3 className="text-[16px] font-medium mb-3 text-[var(--theme-text-hi)]">
                        Hard to evaluate decisions
                      </h3>
                      <p className="text-[16px] leading-[1.65] text-[var(--theme-text-lo)]">
                        Lack of clarity makes it difficult to assess the quality
                        of thinking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 03: Users */}
              <div
                id="users"
                className="scroll-mt-32 w-full border rounded-[32px] p-10 lg:p-14 mb-16 bg-[var(--theme-surface)] border-[var(--theme-border)]"
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
                      Recruiters struggle to quickly evaluate portfolios when
                      thinking and impact are unclear; while designers focus
                      more on visuals than clearly communicating decisions.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[16px] font-medium tracking-wide text-[var(--theme-text-hi)]">
                      Who are we solving for?
                    </h3>
                    <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">
                      Primary: Recruiters and hiring managers evaluating
                      candidates quickly. Secondary: Designers presenting their
                      work effectively through clear and structured
                      storytelling.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[16px] font-medium tracking-wide text-[var(--theme-text-hi)]">
                      How are we solving it?
                    </h3>
                    <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">
                      Design the portfolio as a structured experience that
                      surfaces key insights for recruiters while helping
                      designers communicate decisions, process, and impact
                      clearly.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full">
                  <div className="flex flex-col gap-6">
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#1A1A1A] border border-[#FAFAFA] rounded-[12px] p-[8px]">
                      <div className="relative w-full h-full rounded-[4px] overflow-hidden border border-black/20 bg-white">
                        <Image
                          src="/images/Portfolio Breakdown/1 User Research.png"
                          alt="Research approach"
                          fill
                          className=""
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 px-1">
                      <h4 className="text-[16px] font-medium text-[var(--theme-text-hi)]">
                        Research Approach
                      </h4>
                      <p className="text-[14px] leading-[1.65] text-[var(--theme-text-lo)]">
                        Studied how recruiters scan portfolios and what signals
                        they rely on, along with how designers present work and
                        where communication gaps reduce clarity.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#1A1A1A] border border-[#FAFAFA] rounded-[12px] p-[8px]">
                      <div className="relative w-full h-full rounded-[4px] overflow-hidden border border-black/20 bg-white">
                        <Image
                          src="/images/Portfolio Breakdown/2 User Research - Evaluation Opportunity.png"
                          alt="Evaluation Signals"
                          fill
                          className=""
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 px-1">
                      <h4 className="text-[16px] font-medium text-[var(--theme-text-hi)]">
                        Evaluation Signals
                      </h4>
                      <p className="text-[14px] leading-[1.65] text-[var(--theme-text-lo)]">
                        Identified key signals recruiters rely on to evaluate
                        portfolios quickly, including clarity of problem,
                        visible decision-making, and structured storytelling.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 04: Frustrations */}
              <div
                id="frustrations"
                className="scroll-mt-32 w-full mb-24 lg:mb-32 mt-20 md:mt-32"
              >
                <h2 className="text-[32px] md:text-[32px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">
                  Frustrations and Findings
                </h2>
                <div className="w-[50px] h-[3px] rounded-full mb-10 bg-[var(--theme-accent)]"></div>
                <p className="text-[16px] leading-[1.7] max-w-[700px] mb-20 text-[var(--theme-text-lo)]">
                  Recruiters don&apos;t struggle to evaluate portfolios because
                  of lack of skill, but because key insights are not visible at
                  the right time during evaluation.
                </p>

                <h3 className="text-[24px] font-medium mb-6 text-[var(--theme-text-hi)]">
                  Pain points identified ( Recruiters )
                </h3>
                <div className="flex flex-wrap gap-3 mb-12">
                  {[
                    "Where is the actual problem being solved?",
                    "What impact did this design create?",
                    "Why were these decisions made?",
                    "How quickly can I understand this project?",
                  ].map((p) => (
                    <div
                      key={p}
                      className="px-4 py-2.5 rounded-[100px] border text-[16px] font-medium cursor-default select-none border-[var(--theme-border)] text-[var(--theme-text-lo)]"
                    >
                      {p}
                    </div>
                  ))}
                </div>

                <h3 className="text-[24px] font-medium mb-6 text-[var(--theme-text-hi)]">
                  Pain points identified ( Designers )
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Am I clearly communicating my thinking?",
                    "Are key decisions visible at a glance?",
                    "Is my story structured or scattered?",
                    "What important context am I missing?",
                  ].map((p) => (
                    <div
                      key={p}
                      className="px-4 py-2.5 rounded-[100px] border text-[16px] font-medium cursor-default select-none border-[var(--theme-border)] text-[var(--theme-text-lo)]"
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
                <SectionHeading title="Design Concept" lineClassName="mb-20" />

                <div className="flex flex-col gap-24 lg:gap-32">
                  {[
                    {
                      title: "AI Portfolio Assistant",
                      imageSrc:
                        "/images/Portfolio Breakdown/Design Concept - 1 - AI Portfolio Assistant.png",
                      description:
                        "An AI-powered assistant that answers questions about the portfolio, helping recruiters explore projects, decisions, and outcomes without manual navigation.",
                      bullets: [
                        "Answers project-specific questions",
                        "Explains decisions and process",
                        "Guides deeper exploration",
                        "Provides contextual responses",
                        "Reduces navigation effort",
                      ],
                    },
                    {
                      title: "Voice Brief",
                      imageSrc:
                        "/images/Portfolio Breakdown/Design Concept - 2 - Voice Brief.png",
                      description:
                        "A voice-driven summary that narrates the project, helping recruiters quickly understand the problem, approach, and outcome without reading everything.",
                      bullets: [
                        "Converts project into quick audio summary",
                        "Communicates key points instantly",
                        "Supports passive consumption",
                        "Reduces reading effort",
                        "Improves quick understanding",
                      ],
                    },
                    {
                      title: "Adaptive Contrast",
                      imageSrc:
                        "/images/Portfolio Breakdown/Design Concept - 3 - Adaptive Contrast.png",
                      description:
                        "A dynamic theme system that adapts visual contrast across multiple modes, improving accessibility and allowing users to view content comfortably in different conditions.",
                      bullets: [
                        "Supports multiple contrast themes",
                        "Transitions from dark to light modes",
                        "Improves readability and accessibility",
                        "Reduces visual strain",
                        "Enhances viewing flexibility",
                      ],
                    },
                    {
                      title: "Signature Journey",
                      imageSrc:
                        "/images/Portfolio Breakdown/Design Concept - 4- Signature Journey.png",
                      description:
                        "A guided storytelling experience where a walking character leads users through my journey, making the portfolio more engaging and memorable.",
                      bullets: [
                        "Guides users through a structured journey",
                        "Uses a walking character as a visual anchor",
                        "Connects sections with smooth transitions",
                        "Improves engagement through motion",
                        "Makes the portfolio more memorable",
                      ],
                    },
                  ].map((concept) => (
                    <ConceptBlock
                      key={concept.title}
                      title={concept.title}
                      description={concept.description}
                      bullets={concept.bullets}
                      imageSrc={concept.imageSrc}
                      imageAlt={concept.title}
                    />
                  ))}
                </div>
              </div>

              {/* 06: Testing */}
              <div
                id="testing"
                className="scroll-mt-32 w-full border rounded-[32px] p-10 lg:p-14 mb-16 lg:ml-2 mt-20 md:mt-32 bg-[var(--theme-surface)] border-[var(--theme-border)]"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <div className="flex flex-col">
                    <SectionHeading
                      title="User Testing"
                      lineClassName="mb-10"
                    />
                    <p className="text-[16px] leading-[1.7] max-w-[400px] text-[var(--theme-text-lo)]">
                      Evaluation focused on simulating how recruiters scan and
                      assess portfolios, analysing clarity, navigation flow, and
                      how quickly key information could be understood.
                    </p>
                  </div>
                  <div className="flex flex-col gap-6">
                    <h3 className="text-[18px] font-medium text-[var(--theme-text-hi)]">
                      What stood out during evaluation
                    </h3>
                    <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">
                      Surfacing key information early improved how quickly the
                      portfolio could be understood, reducing the effort
                      required to identify problems, decisions, and outcomes.
                    </p>
                    <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">
                      Structured storytelling and features like Quick Brief and
                      AI support enabled smoother navigation, helping users move
                      from overview to details without losing context.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
                  <CheckerboardFrame 
                    label="Portfolio testing one" 
                    imageSrc="/images/Portfolio Breakdown/User Testing 1.png" 
                  />
                  <CheckerboardFrame 
                    label="Portfolio testing two" 
                    imageSrc="/images/Portfolio Breakdown/User Testing 2.png" 
                  />
                </div>
              </div>

              {/* 07: Snippets */}
              <div id="snippets" className="scroll-mt-32 mt-24 mb-16 lg:ml-2">
                <h2 className="text-[32px] md:text-[32px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">
                  Snippets
                </h2>
                <div className="w-[50px] h-[3px] rounded-full mb-12 bg-[var(--theme-accent)]"></div>
                <h3 className="text-[20px] font-medium mb-6 tracking-wide text-[var(--theme-text-hi)]">
                  Before &amp; After
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                  <div className="flex flex-col gap-4">
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#1A1A1A] border border-[#FAFAFA] rounded-[12px] p-[8px]">
                      <div className="relative w-full h-full rounded-[4px] overflow-hidden border border-black/20 bg-white">
                        <Image
                          src="/images/Portfolio Breakdown/Before.png"
                          alt="Before"
                          fill
                          className=""
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
                          src="/images/Portfolio Breakdown/After.png"
                          alt="After"
                          fill
                          className=""
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
                      src="/images/Portfolio Breakdown/Design Exploration.png"
                      alt="Design explorations"
                      fill
                      className="fill"
                    />
                  </div>
                </div>
              </div>

              {/* 08: Impact */}
              <div
                id="impact"
                className="scroll-mt-32 mt-24 mb-16 lg:ml-2 flex flex-col gap-8"
              >
                <div className="w-full border rounded-[32px] p-10 lg:p-14 bg-transparent border-[#1f1f1f]">
                  <SectionHeading title="Design Impact" lineClassName="mb-16" />
                  <MetricGrid
                    items={[
                      ["55%", "Faster Project Understanding"],
                      ["40%", "Improved Content Clarity"],
                      ["42%", "Better Scannability"],
                      ["38%", "Lower Effort Evaluation"],
                    ]}
                  />
                </div>

                <div className="w-full border rounded-[32px] p-10 lg:p-14 bg-transparent border-[#1f1f1f]">
                  <SectionHeading title="Learnings" lineClassName="mb-12" />
                  <TwoColumnBulletList
                    leftItems={[
                      "Clear structure improves how quickly work is understood",
                      "Highlighting key insights reduces evaluation effort",
                      "Less content can communicate more effectively",
                    ]}
                    rightItems={[
                      "Portfolios should support decision-making, not just display",
                      "Guiding users improves engagement and comprehension",
                      "Strong storytelling increases memorability",
                    ]}
                  />
                </div>
              </div>

              {/* 09: Next */}
              <div id="next" className="scroll-mt-32 mt-16 mb-24 lg:ml-2">
                <div className="w-full border rounded-[32px] p-10 lg:p-14 relative overflow-hidden border-[var(--theme-border)]">
                  <h2 className="text-[32px] md:text-[32px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">
                    What&apos;s Next
                  </h2>
                  <div className="w-[60px] h-[3px] rounded-full mb-20 bg-[var(--theme-accent)]"></div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative z-10">
                    {[
                      [
                        "More Guided Journeys",
                        "Improve storytelling for clarity and engagement.",
                      ],
                      [
                        "Smarter Content Presentation",
                        "Present information based on relevance and user focus.",
                      ],
                      [
                        "Continuous Refinement",
                        "Iterate based on feedback to improve usability and clarity.",
                      ],
                    ].map(([title, desc]) => (
                      <div key={title} className="flex flex-col">
                        <h3 className="text-[20px] font-medium mb-4 text-[var(--theme-text-hi)]">
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
              <RelatedProjects currentProject="Portfolio Breakdown" />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
