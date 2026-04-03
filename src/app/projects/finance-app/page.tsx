'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import AIChatbox from '@/components/AIChatbox';

// ── Theme configuration ───────────────────────────────────────────────────────

const THEMES = ['0', '1', '2', '3', '4', '5'] as const;
type ThemeIndex = 0 | 1 | 2 | 3 | 4 | 5;

const themeVars: Record<
  string,
  {
    bg: string;
    surface: string;
    hi: string;
    mid: string;
    lo: string;
    border: string;
    accent: string;
    navBg: string;
  }
> = {
  '0': {
    bg: '#FAFAFA',
    surface: '#F3F4F6',
    hi: '#000000',
    mid: '#111111',
    lo: '#6B7280',
    border: '#E5E7EB',
    accent: '#84CC16',
    navBg: 'rgba(250,250,250,0.82)',
  },
  '1': {
    bg: '#F0FAF4',
    surface: '#DCFCE7',
    hi: '#065F46',
    mid: '#111111',
    lo: '#6B7280',
    border: '#BBF7D0',
    accent: '#10B981',
    navBg: 'rgba(240,250,244,0.82)',
  },
  '2': {
    bg: '#FFF7ED',
    surface: '#FFEDD5',
    hi: '#9A3412',
    mid: '#111111',
    lo: '#6B7280',
    border: '#FED7AA',
    accent: '#FF8C00',
    navBg: 'rgba(255,247,237,0.82)',
  },
  '3': {
    bg: '#1e1b4b',
    surface: '#262361',
    hi: '#A5B4FC',
    mid: '#E0E7FF',
    lo: '#94A3B8',
    border: '#4338ca',
    accent: '#818cf8',
    navBg: 'rgba(30,27,75,0.82)',
  },
  '4': {
    bg: '#0f172a',
    surface: '#1e293b',
    hi: '#7DD3FC',
    mid: '#E2E8F0',
    lo: '#94A3B8',
    border: '#334155',
    accent: '#38bdf8',
    navBg: 'rgba(15,23,42,0.82)',
  },
  '5': {
    bg: '#010101',
    surface: '#111111',
    hi: '#f5f5f5',
    mid: '#ebebeb',
    lo: '#888888',
    border: '#1f1f1f',
    accent: '#84CC16',
    navBg: 'rgba(1,1,1,0.82)',
  },
};

export default function FinanceAppPage() {
  const [themeIndex, setThemeIndex] = useState<ThemeIndex>(5);
  const [chatOpen, setChatOpen] = useState(false);
  const emailCopied = useRef(false);
  const [copyVisible, setCopyVisible] = useState(false);
  
  // Active nav highlighting
  const [activeHash, setActiveHash] = useState('#summary');
  
  useEffect(() => {
    const t = themeVars[THEMES[themeIndex]];
    const root = document.documentElement;
    root.style.setProperty('--theme-bg', t.bg);
    root.style.setProperty('--theme-surface', t.surface);
    root.style.setProperty('--theme-text-hi', t.hi);
    root.style.setProperty('--theme-text-mid', t.mid);
    root.style.setProperty('--theme-text-lo', t.lo);
    root.style.setProperty('--theme-border', t.border);
    root.style.setProperty('--theme-accent', t.accent);
    root.style.setProperty('--theme-nav-bg', t.navBg);
  }, [themeIndex]);

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

  const copyEmail = useCallback(() => {
    if (emailCopied.current) return;
    navigator.clipboard.writeText('shvethanila@gmail.com').then(() => {
      setCopyVisible(true);
      emailCopied.current = true;
      setTimeout(() => {
        setCopyVisible(false);
        emailCopied.current = false;
      }, 2000);
    });
  }, []);

  const t = themeVars[THEMES[themeIndex]];

  return (
    <>
      <style>{`
        :root {
          --theme-bg: ${t.bg};
          --theme-surface: ${t.surface};
          --theme-text-hi: ${t.hi};
          --theme-text-mid: ${t.mid};
          --theme-text-lo: ${t.lo};
          --theme-border: ${t.border};
          --theme-accent: ${t.accent};
          --theme-nav-bg: ${t.navBg};
        }
        div, section, h1, h2, h3, h4, p, span, a, button, nav, footer, aside, ul, li {
          transition: background-color 0.8s cubic-bezier(0.23,1,0.32,1),
            border-color 0.8s cubic-bezier(0.23,1,0.32,1),
            color 0.8s cubic-bezier(0.23,1,0.32,1),
            fill 0.8s cubic-bezier(0.23,1,0.32,1),
            stroke 0.8s cubic-bezier(0.23,1,0.32,1);
        }
      `}</style>
      <div style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text-mid)' }} className="min-h-screen flex flex-col items-center selection:bg-[#84CC16] selection:text-white font-[Inter,sans-serif]">
        
        {/* Navbar */}
        <nav
          className="w-full max-w-[1440px] px-8 md:px-[60px] py-10 flex justify-between items-center sticky top-0 z-50 backdrop-blur-xl"
          style={{ background: 'var(--theme-nav-bg)', borderBottom: '1px solid var(--theme-border)' }}
        >
          <div style={{ color: 'var(--theme-text-hi)' }} className="text-[24px] font-medium leading-none tracking-tight">S</div>
          <div className="flex items-center gap-6 md:gap-10">
            <div className="hidden md:flex gap-10 text-[16px] font-medium" style={{ color: 'var(--theme-text-lo)' }}>
              <Link href="/projects" className="hover:opacity-80 transition-opacity">Projects</Link>
              <a href="#" className="hover:opacity-80 transition-opacity">About</a>
              <a href="#" className="hover:opacity-80 transition-opacity">Contact</a>
              <a href="#" className="hover:opacity-80 transition-opacity">Resume</a>
            </div>
            <button
              onClick={() => setChatOpen((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[16px] font-medium transition-all active:scale-95 group"
              style={{ backgroundColor: 'var(--theme-surface)', border: '1px solid var(--theme-border)', color: 'var(--theme-text-hi)' }}
            >
              <span>Chat with My AI</span>
              <span className="text-[16px] opacity-60 group-hover:opacity-100 transition-opacity">✨</span>
            </button>
          </div>
        </nav>

        <main className="w-full max-w-[1440px] px-8 md:px-[60px] pt-12 md:pt-16 pb-24">
          
          <Link href="/projects" className="inline-flex items-center gap-2.5 text-[14px] font-medium hover:opacity-80 transition-all mb-16 md:mb-20" style={{ color: 'var(--theme-text-lo)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current stroke-[1.5]">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Go back
          </Link>

          <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-10 mb-14">
            <h1 className="text-[44px] sm:text-[60px] lg:text-[76px] font-medium leading-[1.1] tracking-tight max-w-[900px]" style={{ color: 'var(--theme-text-hi)' }}>
              Redefining How Students Make Financial Decisions
            </h1>
            <div className="flex flex-col items-center lg:mt-2 relative">
              <span className="text-[64px] lg:text-[80px] font-medium leading-[0.60] opacity-20 tracking-tight relative z-10" style={{ color: 'var(--theme-text-lo)' }}>
                02
              </span>
              <div className="w-[50px] h-[3px] mt-4 rounded-full relative z-10" style={{ backgroundColor: 'var(--theme-accent)' }}></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24 lg:mb-32">
            <div className="col-span-2 hidden md:block"></div>
            <div className="col-span-2">
              <p className="text-[20px] md:text-[20px] leading-[1.8] pr-4 lg:pr-12 max-w-[600px]" style={{ color: 'var(--theme-text-lo)' }}>
                In this project, I redesigned a student budgeting experience by shifting focus from passive expense tracking to guided decision-making ; helping users understand their spending, reduce overwhelm, and take confident financial actions.
              </p>
            </div>
          </div>

          <div className="w-full h-[1px] mb-12" style={{ backgroundColor: 'var(--theme-border)' }}></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 pb-12 border-b" style={{ borderColor: 'var(--theme-border)' }}>
            {[
              ['Role', 'Product Designer'],
              ['Project Duration', '2 months'],
              ['Tools', 'Figma, FigJam'],
              ['Category', 'App Concept'],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-4">
                <span className="text-[12px] uppercase tracking-[0.14em] font-bold opacity-50" style={{ color: 'var(--theme-text-lo)' }}>{label}</span>
                <span className="text-[16px] font-medium" style={{ color: 'var(--theme-text-hi)' }}>{value}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16 mt-20 md:mt-32">
            
            <aside className="col-span-1 lg:col-span-3 flex flex-col lg:sticky lg:top-32 h-fit mb-12 lg:mb-0 z-20 xl:pl-4">
              <h4 className="text-[14px] uppercase tracking-[0.12em] font-semibold mb-8 opacity-80" style={{ color: 'var(--theme-text-lo)' }}>Contents</h4>
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
                    <h2 className="text-[32px] md:text-[36px] font-medium mb-3 tracking-tight" style={{ color: 'var(--theme-text-hi)' }}>Summary</h2>
                    <div className="w-[45px] h-[3px] rounded-full mb-8" style={{ backgroundColor: 'var(--theme-accent)' }}></div>
                    <p className="text-[16px] leading-[1.65] w-[95%] lg:w-[85%]" style={{ color: 'var(--theme-text-mid)' }}>
                      A quick overview of how student budgeting can be simplified into clear and easy financial decisions.
                    </p>
                  </div>
                  <div className="col-span-1 md:col-span-6 lg:col-span-7 flex flex-col gap-8 lg:pl-12">
                    <p className="text-[16px] leading-[1.7] md:w-[95%]" style={{ color: 'var(--theme-text-mid)' }}>
                      Reimagined how student budgeting apps should work. Instead of overwhelming users with numbers, I focused on making money management simple and easy to understand.
                    </p>
                    <p className="text-[16px] leading-[1.7] md:w-[95%]" style={{ color: 'var(--theme-text-mid)' }}>
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
                          <p className="text-[14px] font-medium mb-3 tracking-wide uppercase opacity-80" style={{ color: 'var(--theme-text-lo)' }}>{label}</p>
                          <p className="text-[36px] md:text-[44px] font-medium leading-none tracking-tight" style={{ color: 'var(--theme-text-hi)' }}>{val}</p>
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
                <h2 className="text-[32px] md:text-[40px] font-medium mb-3 tracking-tight" style={{ color: 'var(--theme-text-hi)' }}>The Problem</h2>
                <div className="w-[50px] h-[3px] rounded-full mb-10" style={{ backgroundColor: 'var(--theme-accent)' }}></div>
                <p className="text-[18px] leading-[1.65] text-center max-w-[820px] mb-24 lg:mb-32" style={{ color: 'var(--theme-text-lo)' }}>
                  Budgeting tools rely heavily on data presentation but fail to support decision-making.<br className="hidden md:block"/> Users are left to interpret complex charts and fragmented information on their own.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-20">
                  <div className="flex flex-col border rounded-[20px] p-6 lg:p-7 hover:opacity-80 transition-opacity" style={{ backgroundColor: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }}>
                    <div className="w-full aspect-[4/3] bg-white rounded-xl mb-8 flex flex-col items-start justify-start p-6 border border-gray-100 relative overflow-hidden">
                      <span className="text-[28px] font-bold text-[#222] leading-none mb-2">£840<span className="text-sm font-normal text-gray-400 ml-1">left</span></span>
                      <span className="text-[14px] text-[#84CC16] tracking-wide font-medium">from £2400 this month</span>
                    </div>
                    <h3 className="text-[16px] font-medium mb-4" style={{ color: 'var(--theme-text-hi)' }}>Information Overload</h3>
                    <p className="text-[16px] leading-[1.65]" style={{ color: 'var(--theme-text-lo)' }}>Too many categories and charts make it difficult to identify what actually matters.</p>
                  </div>
                  <div className="flex flex-col border rounded-[20px] p-6 lg:p-7 hover:opacity-80 transition-opacity" style={{ backgroundColor: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }}>
                    <div className="w-full aspect-[4/3] bg-white rounded-xl mb-8 flex flex-col items-start justify-center p-6 border border-gray-100">
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
                    <h3 className="text-[16px] font-medium mb-4" style={{ color: 'var(--theme-text-hi)' }}>Lack of Direction</h3>
                    <p className="text-[16px] leading-[1.65]" style={{ color: 'var(--theme-text-lo)' }}>Users see data but don&apos;t know what actions to take.</p>
                  </div>
                  <div className="flex flex-col border rounded-[20px] p-6 lg:p-7 hover:opacity-80 transition-opacity" style={{ backgroundColor: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }}>
                    <div className="w-full aspect-[4/3] bg-white rounded-xl mb-8 flex flex-col justify-start p-6 border border-gray-100 gap-3">
                      <div className="flex flex-col gap-1 w-full"><span className="text-[11px] text-gray-800 font-semibold tracking-tight">Add Expense</span>
                        <div className="w-full border border-gray-100 rounded-md p-2 text-[12px] text-gray-400 bg-gray-50 uppercase tracking-widest">£40</div>
                      </div>
                      <div className="flex flex-col gap-1 w-full mt-2"><span className="text-[10px] text-gray-800 font-semibold tracking-tight">Date</span>
                        <div className="w-full border border-gray-100 rounded-md p-2 text-[12px] text-gray-400 bg-gray-50">Today, 14 Oct</div>
                      </div>
                    </div>
                    <h3 className="text-[16px] font-medium mb-4" style={{ color: 'var(--theme-text-hi)' }}>High Cognitive Effort</h3>
                    <p className="text-[16px] leading-[1.65]" style={{ color: 'var(--theme-text-lo)' }}>Understanding finances requires time and mental effort, leading to drop-offs.</p>
                  </div>
                </div>
              </div>

              {/* 03: Users */}
              <div id="users" className="scroll-mt-32 w-full border rounded-[32px] p-10 lg:p-14 mb-16 lg:ml-2" style={{ backgroundColor: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }}>
                <h2 className="text-[32px] md:text-[40px] font-medium mb-3 tracking-tight" style={{ color: 'var(--theme-text-hi)' }}>Users and Research</h2>
                <div className="w-[50px] h-[3px] rounded-full mb-12" style={{ backgroundColor: 'var(--theme-accent)' }}></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 mb-16">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[16px] font-medium tracking-wide" style={{ color: 'var(--theme-text-hi)' }}>Why it Started ?</h3>
                    <p className="text-[16px] leading-[1.7]" style={{ color: 'var(--theme-text-lo)' }}>Budgeting apps focus heavily on tracking but fail to support real decision-making. Users are exposed to fragmented data across charts and categories, creating confusion instead of clarity.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[16px] font-medium tracking-wide" style={{ color: 'var(--theme-text-hi)' }}>Who are we solving for?</h3>
                    <p className="text-[16px] leading-[1.7]" style={{ color: 'var(--theme-text-lo)' }}>Students and early professionals manage limited monthly budgets with frequent small expenses. They rely on quick decisions and need clear, easy-to-understand insights in seconds.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[16px] font-medium tracking-wide" style={{ color: 'var(--theme-text-hi)' }}>How are we solving it?</h3>
                    <p className="text-[16px] leading-[1.7]" style={{ color: 'var(--theme-text-lo)' }}>We shift the experience from tracking expenses to guiding decisions through structured insights. By reducing cognitive load and surfacing only relevant information, users can quickly understand and act.</p>
                  </div>
                </div>
              </div>

              {/* 04: Frustrations */}
              <div id="frustrations" className="scroll-mt-32 w-full mb-24 lg:mb-32 mt-20 md:mt-32">
                <h2 className="text-[34px] md:text-[38px] font-medium mb-3 tracking-tight" style={{ color: 'var(--theme-text-hi)' }}>Frustrations and Findings</h2>
                <div className="w-[50px] h-[3px] rounded-full mb-10" style={{ backgroundColor: 'var(--theme-accent)' }}></div>
                <p className="text-[16px] leading-[1.7] max-w-[700px] mb-20" style={{ color: 'var(--theme-text-lo)' }}>
                  Users struggled to interpret their financial data due to cluttered interfaces and lack of clear direction. Instead of enabling decisions, existing experiences required effort, leading to confusion, hesitation, and inconsistent usage.
                </p>

                <h3 className="text-[24px] font-medium mb-10" style={{ color: 'var(--theme-text-hi)' }}>Pain points identified</h3>

                <div className="flex flex-wrap gap-4 max-w-[850px]">
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
                    <div key={p} className="px-5 py-3 rounded-[100px] border text-[14px] font-medium cursor-default select-none hover:opacity-80 transition-opacity" style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text-lo)' }}>
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* 05: Design Concept */}
              <div id="design" className="scroll-mt-32 w-full mb-32 pt-10">
                <h2 className="text-[34px] md:text-[38px] font-medium mb-3 tracking-tight" style={{ color: 'var(--theme-text-hi)' }}>Design Concept</h2>
                <div className="w-[50px] h-[3px] rounded-full mb-20" style={{ backgroundColor: 'var(--theme-accent)' }}></div>

                <div className="grid grid-cols-1 lg:grid-cols-11 gap-10 lg:gap-16 mb-24 lg:mb-32 items-start">
                  <div className="col-span-1 lg:col-span-11 xl:col-span-5 flex flex-col pt-1 h-auto xl:h-[260px] justify-between">
                    <div>
                      <h3 className="text-[22px] font-medium mb-6 tracking-tight" style={{ color: 'var(--theme-text-hi)' }}>Guided Financial Decisions</h3>
                      <p className="text-[16px] leading-[1.6] mb-6" style={{ color: 'var(--theme-text-lo)' }}>
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
                          <li key={li} className="flex items-center gap-3 text-[14px] leading-none" style={{ color: 'var(--theme-text-lo)' }}>
                            <div className="w-1.5 h-1.5 rounded-sm shrink-0" style={{ backgroundColor: 'var(--theme-accent)' }}></div>
                            {li}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-span-1 lg:col-span-11 xl:col-span-6 xl:pl-10 flex items-start justify-end">
                    <div className="w-[408px] h-[260px] border rounded-[24px] p-8 md:p-9 flex flex-col gap-6 overflow-hidden" style={{ backgroundColor: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }}>
                       {/* Placeholder for Mockup 1 */}
                       <div className="flex justify-between items-center mb-1">
                           <span className="text-[18px] font-bold" style={{ color: 'var(--theme-text-hi)' }}>Monthly Budget</span>
                           <div className="px-3.5 py-2 rounded-lg text-[15px] font-bold" style={{ backgroundColor: 'rgba(132, 204, 22, 0.1)', color: 'var(--theme-accent)' }}>
                             £560 left
                           </div>
                       </div>
                       <div className="relative w-full h-[14px] rounded-full overflow-hidden flex items-center" style={{ backgroundColor: 'var(--theme-border)' }}>
                           <div className="w-[65%] h-full rounded-full relative z-10" style={{ backgroundColor: 'var(--theme-accent)' }}></div>
                           <span className="absolute right-3 text-[10px] font-bold z-20 tracking-wider" style={{ color: 'var(--theme-text-lo)' }}>35% used</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 06: Testing */}
              <div id="testing" className="scroll-mt-32 w-full border rounded-[32px] p-10 lg:p-14 mb-16 lg:ml-2 mt-20 md:mt-32" style={{ backgroundColor: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <div className="flex flex-col">
                    <h2 className="text-[34px] md:text-[38px] font-medium mb-3 tracking-tight" style={{ color: 'var(--theme-text-hi)' }}>User Testing</h2>
                    <div className="w-[50px] h-[3px] rounded-full mb-10" style={{ backgroundColor: 'var(--theme-accent)' }}></div>
                    <p className="text-[14px] leading-[1.7] max-w-[400px]" style={{ color: 'var(--theme-text-lo)' }}>
                      This phase focused on validating how users understand insights and make financial decisions using the redesigned experience.
                    </p>
                  </div>
                  <div className="flex flex-col gap-6">
                    <h3 className="text-[18px] font-medium" style={{ color: 'var(--theme-text-hi)' }}>The wins that made me happy</h3>
                    <p className="text-[16px] leading-[1.7]" style={{ color: 'var(--theme-text-lo)' }}>
                      Tested the experience with students to evaluate how effectively it supports real financial decisions. Users were able to quickly understand their financial state without interpreting complex charts or fragmented data.
                    </p>
                  </div>
                </div>
              </div>

              {/* 07: Snippets */}
              <div id="snippets" className="scroll-mt-32 mt-24 mb-16 lg:ml-2">
                <h2 className="text-[34px] md:text-[38px] font-medium mb-3 tracking-tight" style={{ color: 'var(--theme-text-hi)' }}>Snippets</h2>
                <div className="w-[50px] h-[3px] rounded-full mb-16" style={{ backgroundColor: 'var(--theme-accent)' }}></div>
                <h3 className="text-[17px] font-medium mb-8 tracking-wide uppercase opacity-80" style={{ color: 'var(--theme-text-hi)' }}>Before & After</h3>
                <div className="w-full aspect-[2.2/1] border rounded-[32px] flex items-center justify-center overflow-hidden relative mb-24 p-8 md:p-12" style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)' }}>
                  <div className="text-sm opacity-50" style={{ color: 'var(--theme-text-lo)' }}>Dashboard concepts</div>
                </div>
              </div>

              {/* 08: Impact */}
              <div id="impact" className="scroll-mt-32 mt-24 mb-16 lg:ml-2 flex flex-col gap-8">
                <div className="w-full border rounded-[32px] p-10 lg:p-14" style={{ backgroundColor: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }}>
                  <h2 className="text-[34px] md:text-[38px] font-medium mb-3 tracking-tight" style={{ color: 'var(--theme-text-hi)' }}>Design Impact</h2>
                  <div className="w-[50px] h-[3px] rounded-full mb-16" style={{ backgroundColor: 'var(--theme-accent)' }}></div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-10">
                    {[
                      ['50%', 'Lower Drop-offs'],
                      ['40%', 'Faster Decision Making'],
                      ['25%', 'More Engagement'],
                      ['35%', 'Smarter Spending']
                    ].map(([val, label]) => (
                      <div key={label} className="flex flex-col items-start">
                        <span className="text-[36px] md:text-[44px] font-medium mb-3 leading-none" style={{ color: 'var(--theme-text-hi)' }}>{val}</span>
                        <span className="text-[14px] font-medium tracking-wide uppercase opacity-80" style={{ color: 'var(--theme-text-lo)' }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 09: Next */}
              <div id="next" className="scroll-mt-32 mt-16 mb-24 lg:ml-2">
                <div className="w-full border rounded-[32px] p-10 lg:p-14 relative overflow-hidden" style={{ backgroundColor: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }}>
                  <h2 className="text-[34px] md:text-[42px] font-medium mb-3 tracking-tight" style={{ color: 'var(--theme-text-hi)' }}>What&apos;s Next</h2>
                  <div className="w-[60px] h-[3px] rounded-full mb-20" style={{ backgroundColor: 'var(--theme-accent)' }}></div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative z-10">
                    {[
                      ['Smarter Personalization', 'Adapting the experience based on user behaviour to deliver more relevant insights. This helps users feel understood and improves financial decision-making.'],
                      ['Predictive Insights', 'Helping users anticipate future spending patterns and make proactive financial decisions. This reduces uncertainty and enables better planning before financial issues occur.'],
                      ['Habit Building', 'Encouraging consistent financial habits through nudges, reminders, and progress tracking. This supports users in building stronger financial discipline over time.']
                    ].map(([title, desc]) => (
                      <div key={title} className="flex flex-col">
                        <h3 className="text-[20px] font-medium mb-4" style={{ color: 'var(--theme-text-hi)' }}>{title}</h3>
                        <p className="text-[16px] leading-[1.7]" style={{ color: 'var(--theme-text-lo)' }}>{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>

        <footer className="relative w-full min-h-[670px] flex flex-col items-center justify-between pt-[100px] pb-[40px] overflow-hidden mt-32" style={{ backgroundColor: 'var(--theme-bg)' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-full pointer-events-none z-0">
            {['10%', '22%'].map((left) => (
              <div key={left} className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--theme-border)]/30 to-transparent" style={{ left }} />
            ))}
            {['22%', '10%'].map((right) => (
              <div key={right} className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--theme-border)]/30 to-transparent" style={{ right }} />
            ))}
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none z-0" style={{ backgroundColor: 'var(--theme-accent)', opacity: 0.05, filter: 'blur(120px)' }} />

          <div className="relative z-10 flex flex-col items-center text-center px-6 w-full">
            <div className="mb-14">
              <h2 className="text-[36px] md:text-[52px] font-light tracking-tighter leading-[1.1] mb-2" style={{ color: 'var(--theme-text-lo)', opacity: 0.4 }}>
                Interested in working together?
              </h2>
              <h2 className="text-[36px] md:text-[52px] font-light tracking-tighter leading-[1.1]" style={{ color: 'var(--theme-text-hi)', opacity: 0.8 }}>
                I&apos;d love to hear from you.
              </h2>
            </div>
            <div className="relative mb-12">
              <button
                onClick={copyEmail}
                className="flex items-center justify-center gap-0 hover:gap-3 px-8 py-4 rounded-xl text-[16px] transition-all duration-500 hover:-translate-y-1 group overflow-hidden"
                style={{ backgroundColor: 'var(--theme-surface)', border: '1px solid var(--theme-border)', color: 'var(--theme-text-hi)' }}
              >
                <span>shvethanila@gmail.com</span>
                <div className="w-0 group-hover:w-5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--theme-accent)' }}>
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </div>
              </button>
              <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-[12px] pointer-events-none transition-opacity duration-300 ${copyVisible ? 'opacity-100' : 'opacity-0'}`} style={{ color: 'var(--theme-text-lo)' }}>
                Email copied!
              </div>
            </div>
            <div className="w-[1px] h-[100px] bg-gradient-to-b from-[var(--theme-border)] to-transparent mb-12 opacity-40" />
            <div className="flex gap-8 items-center mb-16">
              <a href="#" className="w-12 h-12 flex items-center justify-center transition-all duration-500 hover:scale-110" style={{ color: 'var(--theme-text-lo)' }}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center transition-all duration-500 hover:scale-110" style={{ color: 'var(--theme-text-lo)' }}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center transition-all duration-500 hover:scale-110" style={{ color: 'var(--theme-text-lo)' }}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                </svg>
              </a>
            </div>
            <div className="flex items-center gap-2 text-[14px] opacity-40 font-medium pb-8 w-full justify-center" style={{ color: 'var(--theme-text-lo)' }}>
              <span>©</span>
              <span>Shvetha Senthilkumar 2026</span>
            </div>
          </div>
        </footer>

        {/* AI Chat Drawer & Fab */}
        <div className={`fixed bottom-0 right-0 p-4 z-[200] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${chatOpen ? 'translate-y-0' : 'translate-y-[110%]'}`} style={{ width: 400, height: 620 }}>
          <AIChatbox onClose={() => setChatOpen(false)} />
        </div>
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100]">
          <button onClick={() => setChatOpen((v) => !v)} className="w-12 h-12 flex items-center justify-center rounded-full transition-all" style={{ backgroundColor: 'var(--theme-surface)', border: '1px solid var(--theme-border)', color: 'var(--theme-text-lo)' }}>
            {chatOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
          </button>
        </div>

        {/* Theme Dock */}
        <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[100] flex">
          <div className="group relative flex items-center gap-4 px-4 py-2 rounded-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:w-[260px] w-[56px] h-[48px] overflow-hidden cursor-pointer" style={{ backgroundColor: 'var(--theme-surface)', border: '1px solid var(--theme-border)' }}>
            <div className="flex-shrink-0 transition-all duration-500 scale-110 group-hover:rotate-12" style={{ color: 'var(--theme-text-hi)' }}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM12 4v16a8 8 0 000-16z" />
              </svg>
            </div>
            <div className="relative flex items-center w-[170px] h-full opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="flex justify-between w-full items-center px-1 pointer-events-none">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-[6px] h-[6px] rounded-full transition-all duration-500" style={{ backgroundColor: 'var(--theme-accent)', opacity: i <= themeIndex ? 1 : 0.2, transform: i === themeIndex ? 'scale(1.6)' : 'scale(1)' }} />
                ))}
              </div>
              <input type="range" min={0} max={5} step={1} value={themeIndex} onChange={(e) => setThemeIndex(parseInt(e.target.value) as ThemeIndex)} className="absolute inset-0 w-full h-[40px] opacity-0 cursor-pointer z-50 appearance-none" />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
