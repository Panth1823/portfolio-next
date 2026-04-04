'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

// ── Component ─────────────────────────────────────────────────────────────────

export default function FinanceAppPage() {
  const [activeHash, setActiveHash] = useState('#summary');

  useEffect(() => {
    const sections = ['summary', 'problem', 'users', 'frustrations', 'design', 'testing', 'snippets', 'impact', 'next'];
    const ob = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveHash('#' + e.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -50% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) ob.observe(el);
    });
    return () => ob.disconnect();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center selection:bg-[#84CC16] selection:text-white font-[Inter,sans-serif] bg-[var(--theme-bg)] text-[var(--theme-text-mid)] antialiased">
        
        {/* Navbar */}
        <Nav />

        <main className="w-full max-w-[1440px] px-8 md:px-[60px] pt-28 md:pt-36 pb-24">
          
          <Link href="/projects" className="inline-flex items-center gap-2.5 text-[14px] font-medium hover:opacity-80 transition-all mb-16 md:mb-20 text-[var(--theme-text-lo)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current stroke-[1.5]">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Go back
          </Link>

          <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-10 mb-14">
            <h1 className="text-[44px] sm:text-[60px] lg:text-[76px] font-medium leading-[1.1] tracking-tight max-w-[900px] text-[var(--theme-text-hi)]">
              Redefining How Students Make Financial Decisions
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
              <p className="text-[20px] md:text-[20px] leading-[1.8] pr-4 lg:pr-12 max-w-[600px] text-[var(--theme-text-lo)]">
                In this project, I redesigned a student budgeting experience by shifting focus from passive expense tracking to guided decision-making ; helping users understand their spending, reduce overwhelm, and take confident financial actions.
              </p>
            </div>
          </div>

          <div className="w-full h-[1px] mb-12 bg-[var(--theme-border)]"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 pb-12 border-b border-[var(--theme-border)]">
            {[
              ['Role', 'Product Designer'],
              ['Project Duration', '2 months'],
              ['Tools', 'Figma, FigJam'],
              ['Category', 'App Concept'],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-4">
                <span className="text-[12px] uppercase tracking-[0.14em] font-bold opacity-50 text-[var(--theme-text-lo)]">{label}</span>
                <span className="text-[16px] font-medium text-[var(--theme-text-hi)]">{value}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16 mt-20 md:mt-32">
            
            <aside className="col-span-1 lg:col-span-3 flex flex-col lg:sticky lg:top-32 h-fit mb-12 lg:mb-0 z-20 xl:pl-4">
              <h4 className="text-[14px] uppercase tracking-[0.12em] font-semibold mb-8 opacity-80 text-[var(--theme-text-lo)]">Contents</h4>
              <ul className="flex flex-col gap-4 text-[14px]">
                {[
                  { id: '#summary', label: '01 / Summary' },
                  { id: '#problem', label: '02 / The Problem' },
                  { id: '#users', label: '03 / Users and Research' },
                  { id: '#frustrations', label: '04 / Frustrations and Findings' },
                  { id: '#design', label: '05 / Design Concept' },
                  { id: '#testing', label: '06 / User Testing' },
                  { id: '#snippets', label: '07 / Snippets' },
                  { id: '#impact', label: '08 / Impact and Learnings' },
                  { id: '#next', label: "09 / What's Next" },
                ].map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.id}
                      className="transition-all font-medium"
                      style={{
                        color: activeHash === link.id ? 'var(--theme-text-hi)' : 'var(--theme-text-lo)',
                        opacity: activeHash === link.id ? 1 : 0.4
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
                    <h2 className="text-[32px] md:text-[36px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">Summary</h2>
                    <div className="w-[45px] h-[3px] rounded-full mb-8 bg-[var(--theme-accent)]"></div>
                    <p className="text-[16px] leading-[1.65] w-[95%] lg:w-[85%] text-[var(--theme-text-mid)]">
                      A quick overview of how student budgeting can be simplified into clear and easy financial decisions.
                    </p>
                  </div>
                  <div className="col-span-1 md:col-span-6 lg:col-span-7 flex flex-col gap-8 lg:pl-12">
                    <p className="text-[16px] leading-[1.7] md:w-[95%] text-[var(--theme-text-mid)]">
                      Reimagined how student budgeting apps should work. Instead of overwhelming users with numbers, I focused on making money management simple and easy to understand.
                    </p>
                    <p className="text-[16px] leading-[1.7] md:w-[95%] text-[var(--theme-text-mid)]">
                      The experience is designed to guide students toward better spending habits, not just track expenses. By simplifying information and presenting it in a clear way, it helps users understand their finances faster and make confident decisions.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8 mt-10">
                      {[
                        ['Faster Insights', '40%'],
                        ['Smarter Spending', '35%'],
                        ['Lower Drop-offs', '50%'],
                        ['More Engagement', '25%'],
                      ].map(([label, val]) => (
                        <div key={label}>
                          <p className="text-[14px] font-medium mb-3 tracking-wide uppercase opacity-80 text-[var(--theme-text-lo)]">{label}</p>
                          <p className="text-[36px] md:text-[44px] font-medium leading-none tracking-tight text-[var(--theme-text-hi)]">{val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-full h-auto aspect-[1.1] md:aspect-[1.3] lg:aspect-[1.5] rounded-[24px] md:rounded-[40px] relative overflow-hidden flex items-center justify-center p-8 lg:p-12 lg:ml-2 mb-16">
                  <div className="absolute inset-0 bg-[#f4f5f7]"></div>
                  <div className="relative z-10 w-full h-full border border-gray-200/50 rounded-[16px] md:rounded-[24px] flex items-center justify-center text-[#888] bg-white/70 backdrop-blur-md">
                    <span className="text-[16px] md:text-[16px] font-medium tracking-wide border border-dashed border-[#ccc] px-10 py-5 rounded-xl bg-white/50">Mockup UI Placeholder</span>
                  </div>
                </div>
              </div>

              {/* 02: Problem */}
              <div id="problem" className="scroll-mt-32 flex flex-col items-center mt-32 mb-16">
                <h2 className="text-[32px] md:text-[40px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">The Problem</h2>
                <div className="w-[50px] h-[3px] rounded-full mb-10 bg-[var(--theme-accent)]"></div>
                <p className="text-[18px] leading-[1.65] text-center max-w-[820px] mb-24 lg:mb-32 text-[var(--theme-text-lo)]">
                  Budgeting tools rely heavily on data presentation but fail to support decision-making.<br className="hidden md:block"/> Users are left to interpret complex charts and fragmented information on their own.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-20">
                  <div className="flex flex-col border rounded-[20px] p-2 hover:opacity-80 transition-opacity bg-[var(--theme-surface)] border-[var(--theme-border)]">
                    <div className="w-full aspect-[4/3] bg-white rounded-[12px] mb-4 flex flex-col items-start justify-start p-6 border border-gray-100 relative overflow-hidden">
                      <span className="text-[28px] font-bold text-[#222] leading-none mb-2">£840<span className="text-sm font-normal text-gray-400 ml-1">left</span></span>
                      <span className="text-[14px] text-[#84CC16] tracking-wide font-medium">from £2400 this month</span>
                    </div>
                    <div className="px-2 pb-2">
                      <h3 className="text-[16px] font-medium mb-3 text-[var(--theme-text-hi)]">Information Overload</h3>
                      <p className="text-[16px] leading-[1.65] text-[var(--theme-text-lo)]">Too many categories and charts make it difficult to identify what actually matters.</p>
                    </div>
                  </div>
                  <div className="flex flex-col border rounded-[20px] p-2 hover:opacity-80 transition-opacity bg-[var(--theme-surface)] border-[var(--theme-border)]">
                    <div className="w-full aspect-[4/3] bg-white rounded-[12px] mb-4 flex flex-col items-start justify-center p-6 border border-gray-100">
                      <div className="flex justify-between w-full items-baseline mb-4">
                        <span className="text-[16px] font-semibold text-gray-700">Monthly Budget</span>
                        <span className="text-[16px] font-medium text-[#14B8A6]">£560 left</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
                        <div className="w-[30%] h-full bg-[#14B8A6] rounded-full"></div>
                      </div>
                      <span className="text-[16px] font-semibold text-gray-700">Spending Overview</span>
                      <div className="w-full h-1 bg-gray-100 mt-4">
                        <div className="w-1/2 h-full bg-gray-300"></div>
                      </div>
                    </div>
                    <div className="px-2 pb-2">
                      <h3 className="text-[16px] font-medium mb-3 text-[var(--theme-text-hi)]">Lack of Direction</h3>
                      <p className="text-[16px] leading-[1.65] text-[var(--theme-text-lo)]">Users see data but don&apos;t know what actions to take.</p>
                    </div>
                  </div>
                  <div className="flex flex-col border rounded-[20px] p-2 hover:opacity-80 transition-opacity bg-[var(--theme-surface)] border-[var(--theme-border)]">
                    <div className="w-full aspect-[4/3] bg-white rounded-[12px] mb-4 flex flex-col justify-start p-6 border border-gray-100 gap-3">
                      <div className="flex flex-col gap-1 w-full"><span className="text-[11px] text-gray-800 font-semibold tracking-tight">Add Expense</span>
                        <div className="w-full border border-gray-100 rounded-md p-2 text-[12px] text-gray-400 bg-gray-50 uppercase tracking-widest">£40</div>
                      </div>
                      <div className="flex flex-col gap-1 w-full mt-2"><span className="text-[10px] text-gray-800 font-semibold tracking-tight">Date</span>
                        <div className="w-full border border-gray-100 rounded-md p-2 text-[12px] text-gray-400 bg-gray-50">Today, 14 Oct</div>
                      </div>
                    </div>
                    <div className="px-2 pb-2">
                      <h3 className="text-[16px] font-medium mb-3 text-[var(--theme-text-hi)]">High Cognitive Effort</h3>
                      <p className="text-[16px] leading-[1.65] text-[var(--theme-text-lo)]">Understanding finances requires time and mental effort, leading to drop-offs.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 03: Users */}
              <div id="users" className="scroll-mt-32 w-full border rounded-[32px] p-10 lg:p-14 mb-16 lg:ml-2 bg-[var(--theme-surface)] border-[var(--theme-border)]">
                <h2 className="text-[32px] md:text-[40px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">Users and Research</h2>
                <div className="w-[50px] h-[3px] rounded-full mb-12 bg-[var(--theme-accent)]"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 mb-16">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[16px] font-medium tracking-wide text-[var(--theme-text-hi)]">Why it Started ?</h3>
                    <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">Budgeting apps focus heavily on tracking but fail to support real decision-making. Users are exposed to fragmented data across charts and categories, creating confusion instead of clarity.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[16px] font-medium tracking-wide text-[var(--theme-text-hi)]">Who are we solving for?</h3>
                    <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">Students and early professionals manage limited monthly budgets with frequent small expenses. They rely on quick decisions and need clear, easy-to-understand insights in seconds.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[16px] font-medium tracking-wide text-[var(--theme-text-hi)]">How are we solving it?</h3>
                    <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">We shift the experience from tracking expenses to guiding decisions through structured insights. By reducing cognitive load and surfacing only relevant information, users can quickly understand and act.</p>
                  </div>
                </div>
              </div>

              {/* 04: Frustrations */}
              <div id="frustrations" className="scroll-mt-32 w-full mb-24 lg:mb-32 mt-20 md:mt-32">
                <h2 className="text-[34px] md:text-[38px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">Frustrations and Findings</h2>
                <div className="w-[50px] h-[3px] rounded-full mb-10 bg-[var(--theme-accent)]"></div>
                <p className="text-[16px] leading-[1.7] max-w-[700px] mb-20 text-[var(--theme-text-lo)]">
                  Users struggled to interpret their financial data due to cluttered interfaces and lack of clear direction. Instead of enabling decisions, existing experiences required effort, leading to confusion, hesitation, and inconsistent usage.
                </p>

                <h3 className="text-[24px] font-medium mb-10 text-[var(--theme-text-hi)]">Pain points identified</h3>

                <div className="flex flex-wrap gap-3">
                  {[
                    'Where is my money actually going?',
                    'Am I overspending or doing okay?',
                    'Can I afford this right now?',
                    'Why did I run out of money early?',
                    'What should I cut down on?',
                    'How much can I safely spend today?',
                    'Which expenses matter the most?',
                    'How do I stay within my budget?',
                    'What should I do next?',
                    'Am I improving or getting worse?',
                  ].map((p) => (
                    <div key={p} className="px-4 py-2.5 rounded-[100px] border text-[13px] font-medium cursor-default select-none whitespace-nowrap hover:opacity-80 transition-opacity border-[var(--theme-border)] text-[var(--theme-text-lo)]">
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* 05: Design Concept */}
              <div id="design" className="scroll-mt-32 w-full mb-32 pt-10">
                <h2 className="text-[34px] md:text-[38px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">Design Concept</h2>
                <div className="w-[50px] h-[3px] rounded-full mb-20 bg-[var(--theme-accent)]"></div>

                <div className="grid grid-cols-1 lg:grid-cols-11 gap-10 lg:gap-16 mb-24 lg:mb-32 items-start">
                  <div className="col-span-1 lg:col-span-11 xl:col-span-5 flex flex-col pt-1 h-auto xl:h-[260px] justify-between">
                    <div>
                      <h3 className="text-[22px] font-medium mb-6 tracking-tight text-[var(--theme-text-hi)]">Guided Financial Decisions</h3>
                      <p className="text-[16px] leading-[1.6] mb-6 text-[var(--theme-text-lo)]">
                        Simplified the interface to highlight only what truly matters for quick understanding.
                      </p>
                      <ul className="flex flex-col gap-3.5 pl-1">
                        {[
                          'Removed excessive charts and unnecessary categories',
                          'Prioritized key metrics like balance and budget status',
                          'Simplified hierarchy for faster visual scanning',
                          'Reduced secondary data that didn\'t support decisions',
                          'Structured content for clarity and readability',
                          'Focused on showing only relevant information'
                        ].map((li) => (
                          <li key={li} className="flex items-center gap-3 text-[14px] leading-none text-[var(--theme-text-lo)]">
                            <div className="w-1.5 h-1.5 rounded-sm shrink-0 bg-[var(--theme-accent)]"></div>
                            {li}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-span-1 lg:col-span-11 xl:col-span-6 xl:pl-10 flex items-start justify-end">
                    <div className="w-[408px] h-[260px] border rounded-[24px] p-8 md:p-9 flex flex-col gap-6 overflow-hidden bg-[var(--theme-surface)] border-[var(--theme-border)]">
                       {/* Placeholder for Mockup 1 */}
                       <div className="flex justify-between items-center mb-1">
                           <span className="text-[18px] font-bold text-[var(--theme-text-hi)]">Monthly Budget</span>
                           <div className="px-3.5 py-2 rounded-lg text-[15px] font-bold bg-[rgba(132,204,22,0.1)] text-[var(--theme-accent)]">
                             £560 left
                           </div>
                       </div>
                       <div className="relative w-full h-[14px] rounded-full overflow-hidden flex items-center bg-[var(--theme-border)]">
                           <div className="w-[65%] h-full rounded-full relative z-10 bg-[var(--theme-accent)]"></div>
                           <span className="absolute right-3 text-[10px] font-bold z-20 tracking-wider text-[var(--theme-text-lo)]">35% used</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 06: Testing */}
              <div id="testing" className="scroll-mt-32 w-full border rounded-[32px] p-10 lg:p-14 mb-16 lg:ml-2 mt-20 md:mt-32 bg-[var(--theme-surface)] border-[var(--theme-border)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <div className="flex flex-col">
                    <h2 className="text-[34px] md:text-[38px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">User Testing</h2>
                    <div className="w-[50px] h-[3px] rounded-full mb-10 bg-[var(--theme-accent)]"></div>
                    <p className="text-[14px] leading-[1.7] max-w-[400px] text-[var(--theme-text-lo)]">
                      This phase focused on validating how users understand insights and make financial decisions using the redesigned experience.
                    </p>
                  </div>
                  <div className="flex flex-col gap-6">
                    <h3 className="text-[18px] font-medium text-[var(--theme-text-hi)]">The wins that made me happy</h3>
                    <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">
                      Tested the experience with students to evaluate how effectively it supports real financial decisions. Users were able to quickly understand their financial state without interpreting complex charts or fragmented data.
                    </p>
                  </div>
                </div>
              </div>

              {/* 07: Snippets */}
              <div id="snippets" className="scroll-mt-32 mt-24 mb-16 lg:ml-2">
                <h2 className="text-[34px] md:text-[38px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">Snippets</h2>
                <div className="w-[50px] h-[3px] rounded-full mb-16 bg-[var(--theme-accent)]"></div>
                <h3 className="text-[17px] font-medium mb-8 tracking-wide uppercase opacity-80 text-[var(--theme-text-hi)]">Before & After</h3>
                <div className="w-full aspect-[2.2/1] border rounded-[32px] flex items-center justify-center overflow-hidden relative mb-24 p-8 md:p-12 bg-[var(--theme-bg)] border-[var(--theme-border)]">
                  <div className="text-sm opacity-50 text-[var(--theme-text-lo)]">Dashboard concepts</div>
                </div>
              </div>

              {/* 08: Impact */}
              <div id="impact" className="scroll-mt-32 mt-24 mb-16 lg:ml-2 flex flex-col gap-8">
                <div className="w-full border rounded-[32px] p-10 lg:p-14 bg-[var(--theme-surface)] border-[var(--theme-border)]">
                  <h2 className="text-[34px] md:text-[38px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">Design Impact</h2>
                  <div className="w-[50px] h-[3px] rounded-full mb-16 bg-[var(--theme-accent)]"></div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-10">
                    {[
                      ['50%', 'Lower Drop-offs'],
                      ['40%', 'Faster Decision Making'],
                      ['25%', 'More Engagement'],
                      ['35%', 'Smarter Spending']
                    ].map(([val, label]) => (
                      <div key={label} className="flex flex-col items-start">
                        <span className="text-[36px] md:text-[44px] font-medium mb-3 leading-none text-[var(--theme-text-hi)]">{val}</span>
                        <span className="text-[14px] font-medium tracking-wide uppercase opacity-80 text-[var(--theme-text-lo)]">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 09: Next */}
              <div id="next" className="scroll-mt-32 mt-16 mb-24 lg:ml-2">
                <div className="w-full border rounded-[32px] p-10 lg:p-14 relative overflow-hidden bg-[var(--theme-surface)] border-[var(--theme-border)]">
                  <h2 className="text-[34px] md:text-[42px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)]">What&apos;s Next</h2>
                  <div className="w-[60px] h-[3px] rounded-full mb-20 bg-[var(--theme-accent)]"></div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative z-10">
                    {[
                      ['Smarter Personalization', 'Adapting the experience based on user behaviour to deliver more relevant insights. This helps users feel understood and improves financial decision-making.'],
                      ['Predictive Insights', 'Helping users anticipate future spending patterns and make proactive financial decisions. This reduces uncertainty and enables better planning before financial issues occur.'],
                      ['Habit Building', 'Encouraging consistent financial habits through nudges, reminders, and progress tracking. This supports users in building stronger financial discipline over time.']
                    ].map(([title, desc]) => (
                      <div key={title} className="flex flex-col">
                        <h3 className="text-[20px] font-medium mb-4 text-[var(--theme-text-hi)]">{title}</h3>
                        <p className="text-[16px] leading-[1.7] text-[var(--theme-text-lo)]">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>

        <Footer />

      </div>
    </>
  );
}
