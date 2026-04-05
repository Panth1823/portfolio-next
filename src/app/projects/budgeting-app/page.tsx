"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RelatedProjects from "@/components/RelatedProjects";

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
              Redefining How Students Make Financial Decisions
            </h1>
            <div className="flex flex-col items-center lg:mt-2 relative">
              <span className="text-[64px] lg:text-[80px] font-medium leading-[0.60] opacity-20 tracking-tight relative z-10 text-[var(--theme-text-lo)]">
                03
              </span>
              <div className="w-[50px] h-[3px] mt-4 rounded-full relative z-10 bg-[var(--theme-accent)]"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24 lg:mb-32">
            <div className="col-span-2 hidden md:block"></div>
            <div className="col-span-2">
              <p className="text-base leading-[1.8] pr-4 lg:pr-12 max-w-[600px] text-[var(--theme-text-lo)]">
                In this project, I redesigned a student budgeting experience by
                shifting focus from passive expense tracking to guided
                decision-making ; helping users understand their spending,
                reduce overwhelm, and take confident financial actions.
              </p>
            </div>
          </div>

          <div className="w-full h-[1px] mb-12 bg-[var(--theme-border)]"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 pb-12 border-b border-[var(--theme-border)]">
            {[
              ["Role", "Product Designer"],
              ["Project Duration", "2 months"],
              ["Tools", "Figma, FigJam"],
              ["Category", "Fintech"],
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
                      A quick overview of how student budgeting can be
                      simplified into clear and easy financial decisions.
                    </p>
                  </div>
                  <div className="col-span-1 md:col-span-6 lg:col-span-7 flex flex-col gap-8 lg:pl-12">
                    <p className="text-[16px] leading-[1.7] md:w-[95%] text-[var(--theme-text-mid)]">
                      Reimagined how student budgeting apps should work. Instead
                      of overwhelming users with numbers, I focused on making
                      money management simple and easy to understand.
                    </p>
                    <p className="text-[16px] leading-[1.7] md:w-[95%] text-[var(--theme-text-mid)]">
                      The experience is designed to guide students toward better
                      spending habits, not just track expenses. By simplifying
                      information and presenting it in a clear way, it helps
                      users understand their finances faster and make confident
                      decisions.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8 mt-10">
                      {[
                        ["Faster Insights", "40%"],
                        ["Smarter Spending", "35%"],
                        ["Lower Drop-offs", "50%"],
                        ["More Engagement", "25%"],
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
                    src="/images/Project 3 - Finance app Case Study Images/Summary - PW.png"
                    alt="Summary mockup"
                    width={1000}
                    height={700}
                    className="w-auto max-h-[700px] object-contain rounded-[24px]"
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
                <p className="text-base leading-[1.65] text-left max-w-[820px] mb-20 text-[var(--theme-text-lo)]">
                  Budgeting tools rely heavily on data presentation but fail to
                  support decision-making.
                  <br className="hidden md:block" /> Users are left to interpret
                  complex charts and fragmented information on their own.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-20">
                  <div className="flex flex-col border rounded-[20px] p-2 bg-[var(--theme-surface)] border-[var(--theme-border)]">
                    <div className="w-full aspect-[4/3] bg-white rounded-[12px] mb-4 flex flex-col items-start justify-start p-6 border border-gray-100 relative overflow-hidden">
                      <span className="text-[28px] font-bold text-[#222] leading-none mb-2">
                        £840
                        <span className="text-sm font-normal text-gray-400 ml-1">
                          left
                        </span>
                      </span>
                      <span className="text-[14px] text-[#84CC16] tracking-wide font-medium">
                        from £2400 this month
                      </span>
                    </div>
                    <div className="px-2 pb-2">
                      <h3 className="text-[16px] font-medium mb-3 text-[var(--theme-text-hi)]">
                        Information Overload
                      </h3>
                      <p className="text-[16px] leading-[1.65] text-[var(--theme-text-lo)]">
                        Too many categories and charts make it difficult to
                        identify what actually matters.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col border rounded-[20px] p-2 bg-[var(--theme-surface)] border-[var(--theme-border)]">
                    <div className="w-full aspect-[4/3] bg-white rounded-[12px] mb-4 flex flex-col items-start justify-center p-6 border border-gray-100">
                      <div className="flex justify-between w-full items-baseline mb-4">
                        <span className="text-[16px] font-semibold text-gray-700">
                          Monthly Budget
                        </span>
                        <span className="text-[16px] font-medium text-[#14B8A6]">
                          £560 left
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
                        <div className="w-[30%] h-full bg-[#14B8A6] rounded-full"></div>
                      </div>
                      <span className="text-[16px] font-semibold text-gray-700">
                        Spending Overview
                      </span>
                      <div className="w-full h-1 bg-gray-100 mt-4">
                        <div className="w-1/2 h-full bg-gray-300"></div>
                      </div>
                    </div>
                    <div className="px-2 pb-2">
                      <h3 className="text-[16px] font-medium mb-3 text-[var(--theme-text-hi)]">
                        Lack of Direction
                      </h3>
                      <p className="text-[16px] leading-[1.65] text-[var(--theme-text-lo)]">
                        Users see data but don&apos;t know what actions to take.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col border rounded-[20px] p-2 bg-[var(--theme-surface)] border-[var(--theme-border)]">
                    <div className="w-full aspect-[4/3] bg-white rounded-[12px] mb-4 flex flex-col justify-start p-6 border border-gray-100 gap-3">
                      <div className="flex flex-col gap-1 w-full">
                        <span className="text-[11px] text-gray-800 font-semibold tracking-tight">
                          Add Expense
                        </span>
                        <div className="w-full border border-gray-100 rounded-md p-2 text-[12px] text-gray-400 bg-gray-50 uppercase tracking-widest">
                          £40
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 w-full mt-2">
                        <span className="text-[10px] text-gray-800 font-semibold tracking-tight">
                          Date
                        </span>
                        <div className="w-full border border-gray-100 rounded-md p-2 text-[12px] text-gray-400 bg-gray-50">
                          Today, 14 Oct
                        </div>
                      </div>
                    </div>
                    <div className="px-2 pb-2">
                      <h3 className="text-[16px] font-medium mb-3 text-[var(--theme-text-hi)]">
                        High Cognitive Effort
                      </h3>
                      <p className="text-[16px] leading-[1.65] text-[var(--theme-text-lo)]">
                        Understanding finances requires time and mental effort,
                        leading to drop-offs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                id="users"
                className="scroll-mt-32 w-full border rounded-[32px] p-10 lg:p-14 mb-16 lg:ml-2 mt-20 md:mt-32 bg-[var(--theme-surface)] border-[var(--theme-border)]"
              >
                <h2 className="text-[32px] md:text-[32px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">
                  Users and Research
                </h2>
                <div className="w-[50px] h-[3px] rounded-full mb-12 bg-[var(--theme-accent)]"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 mb-16">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[16px] font-medium tracking-wide text-[var(--theme-text-hi)]">
                      Why it Started ?
                    </h3>
                    <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">
                      Budgeting apps focus heavily on tracking but fail to
                      support real decision-making. Users are exposed to
                      fragmented data across charts and categories, creating
                      confusion instead of clarity.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[16px] font-medium tracking-wide text-[var(--theme-text-hi)]">
                      Who are we solving for?
                    </h3>
                    <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">
                      Students and early professionals manage limited monthly
                      budgets with frequent small expenses. They rely on quick
                      decisions and need clear, easy-to-understand insights in
                      seconds.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[16px] font-medium tracking-wide text-[var(--theme-text-hi)]">
                      How are we solving it?
                    </h3>
                    <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">
                      We shift the experience from tracking expenses to guiding
                      decisions through structured insights. By reducing
                      cognitive load and surfacing only relevant information,
                      users can quickly understand and act.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full">
                  <div className="flex flex-col gap-6">
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#1A1A1A] border border-[#FAFAFA] rounded-[12px] p-[8px]">
                      <div className="relative w-full h-full rounded-[4px] overflow-hidden border border-black/20 bg-white">
                        <Image
                          src="/images/Project 3 - Finance app Case Study Images/PW - User Research - Research approach - 1.png"
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
                        Focused on understanding how users interpret financial
                        data rather than how they input it.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#1A1A1A] border border-[#FAFAFA] rounded-[12px] p-[8px]">
                      <div className="relative w-full h-full rounded-[4px] overflow-hidden border border-black/20 bg-white">
                        <Image
                          src="/images/Project 3 - Finance app Case Study Images/PW - User Research - AI Oppurtunity - 2.png"
                          alt="AI Opportunity"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 px-1">
                      <h4 className="text-[16px] font-medium text-[var(--theme-text-hi)]">
                        AI Opportunity
                      </h4>
                      <p className="text-[14px] leading-[1.65] text-[var(--theme-text-lo)]">
                        AI allows the product to move from passive reporting to
                        proactive financial assistance.
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
                  Users struggled to interpret their financial data due to
                  cluttered interfaces and lack of clear direction. Instead of
                  enabling decisions, existing experiences required effort,
                  leading to confusion, hesitation, and inconsistent usage.
                </p>

                <h3 className="text-[24px] font-medium mb-10 text-[var(--theme-text-hi)]">
                  Pain points identified
                </h3>

                <div className="flex flex-wrap gap-3 w-[698px]">
                  {[
                    "Where is my money actually going?",
                    "Am I overspending or doing okay?",
                    "Can I afford this right now?",
                    "Why did I run out of money early?",
                    "What should I cut down on?",
                    "How much can I safely spend today?",
                    "Which expenses matter the most?",
                    "How do I stay within my budget?",
                    "What should I do next?",
                    "Am I improving or getting worse?",
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

              {/* 05: Concept */}
              <div
                id="design"
                className="scroll-mt-32 w-full mb-32 pt-10 lg:ml-2"
              >
                <h2 className="text-[32px] md:text-[32px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">
                  Design Concept
                </h2>
                <div className="w-[50px] h-[3px] rounded-full mb-20 bg-[var(--theme-accent)]"></div>

                <div className="flex flex-col gap-24 lg:gap-32">
                  {/* Guided Financial Clarity */}
                  <div className="grid grid-cols-1 lg:grid-cols-11 gap-10 lg:gap-16 items-start">
                    <div className="col-span-1 lg:col-span-11 xl:col-span-5 flex flex-col pt-1 h-auto xl:h-[260px] justify-between">
                      <div>
                        <h3 className="text-[22px] font-medium mb-6 tracking-tight text-[var(--theme-text-hi)]">
                          Guided Financial Clarity
                        </h3>
                        <p className="text-[16px] leading-[1.6] mb-6 text-[var(--theme-text-lo)]">
                          Simplified the interface to highlight only what truly
                          matters for quick understanding.
                        </p>
                        <ul className="flex flex-col gap-3.5 pl-1">
                          {[
                            "Removed excessive charts and unnecessary categories",
                            "Prioritized key metrics like balance and budget status",
                            "Simplified hierarchy for faster visual scanning",
                            "Structured content for clarity and readability",
                            "Focused on showing only relevant information",
                          ].map((item, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-3 text-[16px] leading-none text-[var(--theme-text-lo)]"
                            >
                              <div className="w-1.5 h-1.5 rounded-sm shrink-0 bg-[#FAFAFA]"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="col-span-1 lg:col-span-11 xl:col-span-6 xl:pl-10 flex items-start justify-end">
                      <div className="w-full xl:w-[408px] h-auto aspect-[4/3] xl:aspect-auto xl:h-[260px] border rounded-[24px] p-2 relative overflow-hidden bg-[var(--theme-surface)] border-[var(--theme-border)]">
                        <Image
                          src="/images/Project 3 - Finance app Case Study Images/PW - Design Concept - 1.png"
                          alt="Guided Financial Clarity"
                          fill
                          className="object-cover rounded-[16px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Decision-First Experience */}
                  <div className="grid grid-cols-1 lg:grid-cols-11 gap-10 lg:gap-16 items-start">
                    <div className="col-span-1 lg:col-span-11 xl:col-span-5 flex flex-col pt-1 h-auto xl:h-[260px] justify-between">
                      <div>
                        <h3 className="text-[22px] font-medium mb-6 tracking-tight text-[var(--theme-text-hi)]">
                          Decision-First Experience
                        </h3>
                        <p className="text-[16px] leading-[1.6] mb-6 text-[var(--theme-text-lo)]">
                          Reframed the experience to support decisions instead
                          of passive tracking.
                        </p>
                        <ul className="flex flex-col gap-3.5 pl-1">
                          {[
                            "Shifted focus from data display to decision support",
                            "Added real-time feedback during user actions",
                            "Reduced steps to understand spending impact",
                            "Designed flows around key user questions",
                            "Eliminated delays between action and insight",
                            "Enabled faster, more confident decisions",
                          ].map((item, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-3 text-[16px] leading-none text-[var(--theme-text-lo)]"
                            >
                              <div className="w-1.5 h-1.5 rounded-sm shrink-0 bg-[#FAFAFA]"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="col-span-1 lg:col-span-11 xl:col-span-6 xl:pl-10 flex items-start justify-end">
                      <div className="w-full xl:w-[408px] h-auto aspect-[4/3] xl:aspect-auto xl:h-[260px] border rounded-[24px] p-2 relative overflow-hidden bg-[var(--theme-surface)] border-[var(--theme-border)]">
                        <Image
                          src="/images/Project 3 - Finance app Case Study Images/PW - Design Concept - 2.png"
                          alt="Decision-First Experience"
                          fill
                          className="object-cover rounded-[16px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* AI-Driven Financial Guidance */}
                  <div className="grid grid-cols-1 lg:grid-cols-11 gap-10 lg:gap-16 items-start">
                    <div className="col-span-1 lg:col-span-11 xl:col-span-5 flex flex-col pt-1 h-auto xl:h-[260px] justify-between">
                      <div>
                        <h3 className="text-[22px] font-medium mb-6 tracking-tight text-[var(--theme-text-hi)]">
                          AI-Driven Financial Guidance
                        </h3>
                        <p className="text-[16px] leading-[1.6] mb-6 text-[var(--theme-text-lo)]">
                          Introduced intelligence to guide users with relevant
                          and timely insights.
                        </p>
                        <ul className="flex flex-col gap-3.5 pl-1">
                          {[
                            "Replaced static summaries with contextual insights",
                            "Reduced need for manual data interpretation",
                            "Highlighted actions instead of raw information",
                            "Positioned AI as a decision support system",
                            "Enabled proactive financial guidance",
                          ].map((item, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-3 text-[16px] leading-none text-[var(--theme-text-lo)]"
                            >
                              <div className="w-1.5 h-1.5 rounded-sm shrink-0 bg-[#FAFAFA]"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="col-span-1 lg:col-span-11 xl:col-span-6 xl:pl-10 flex items-start justify-end">
                      <div className="w-full xl:w-[408px] h-auto aspect-[4/3] xl:aspect-auto xl:h-[260px] border rounded-[24px] p-2 relative overflow-hidden bg-[var(--theme-surface)] border-[var(--theme-border)]">
                        <Image
                          src="/images/Project 3 - Finance app Case Study Images/PW - Design Concept - 3.png"
                          alt="AI-Driven Financial Guidance"
                          fill
                          className="object-cover rounded-[16px]"
                        />
                      </div>
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
                      This phase focused on validating how users understand
                      insights and make financial decisions using the redesigned
                      experience.
                    </p>
                  </div>
                  <div className="flex flex-col gap-6">
                    <h3 className="text-[16px] font-medium text-[var(--theme-text-hi)]">
                      The wins that made me happy
                    </h3>
                    <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">
                      Tested the experience with students to evaluate how
                      effectively it supports real financial decisions. Users
                      were able to quickly understand their financial state
                      without interpreting complex charts or fragmented data.
                      Core actions like tracking spending and adding expenses
                      felt more intuitive and required less effort.
                    </p>
                    <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">
                      The experience increased user confidence by providing
                      clear, actionable insights at the right moments.
                      Participants reported feeling more in control of their
                      finances and less overwhelmed. This validated the shift
                      from passive tracking to a guided, decision-first
                      experience.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
                  <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#1A1A1A] border border-[#FAFAFA] rounded-[12px] p-[8px]">
                    <div className="relative w-full h-full rounded-[4px] overflow-hidden border border-black/20 bg-white">
                      <Image
                        src="/images/Project 3 - Finance app Case Study Images/PW - User Testing - 1.png"
                        alt="Testing 1"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#1A1A1A] border border-[#FAFAFA] rounded-[12px] p-[8px]">
                    <div className="relative w-full h-full rounded-[4px] overflow-hidden border border-black/20 bg-white">
                      <Image
                        src="/images/Project 3 - Finance app Case Study Images/PW - User Testing - 2.png"
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
                  Before &amp; After
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                  <div className="flex flex-col gap-4">
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#1A1A1A] border border-[#FAFAFA] rounded-[12px] p-[8px]">
                      <div className="relative w-full h-full rounded-[4px] overflow-hidden border border-black/20 bg-white">
                        <Image
                          src="/images/Project 3 - Finance app Case Study Images/PW Before.png"
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
                          src="/images/Project 3 - Finance app Case Study Images/PW After.png"
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
                      src="/images/Project 3 - Finance app Case Study Images/PW Design Explorations.png"
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
                      ["50%", "Lower Drop-offs"],
                      ["40%", "Faster Decision Making"],
                      ["25%", "More Engagement"],
                      ["35%", "Smarter Spending"],
                    ].map(([val, label]) => (
                      <div key={label} className="flex flex-col items-start">
                        <span className="text-[36px] md:text-[44px] font-medium mb-3 leading-none text-[var(--theme-text-hi)]">
                          {val}
                        </span>
                        <span className="text-[14px] font-medium tracking-wide uppercase opacity-80 text-[var(--theme-text-lo)]">
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
                        "Clarity in financial products matters more than data density",
                        "Users prefer quick answers over detailed analysis",
                        "Reducing cognitive load improves decision confidence",
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
                        "Contextual insights are more valuable than static dashboards",
                        "Decision support drives engagement better than tracking",
                        "Simplicity directly impacts long-term product adoption",
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
                  <div className="w-[60px] h-[3px] rounded-full mb-20 bg-[var(--theme-accent)]"></div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative z-10">
                    {[
                      [
                        "Smarter Personalization",
                        "Adapts insights based on user patterns to support better choices.",
                      ],
                      [
                        "Predictive Insights",
                        "Forecasts upcoming expenses to help users plan with more clarity.",
                      ],
                      [
                        "Habit Building",
                        "Builds consistent money habits with nudges and simple progress cues.",
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

              {/* Related Projects */}
              <RelatedProjects currentProject="Budgeting App" />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
