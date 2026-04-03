"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import AIChatbox from "@/components/AIChatbox";
import Footer from "@/components/Footer";

// ── Theme configuration ───────────────────────────────────────────────────────

const THEMES = ["0", "1", "2", "3", "4", "5"] as const;
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
  "0": {
    bg: "#FAFAFA",
    surface: "#F3F4F6",
    hi: "#000000",
    mid: "#111111",
    lo: "#6B7280",
    border: "#E5E7EB",
    accent: "#84CC16",
    navBg: "rgba(250,250,250,0.82)",
  },
  "1": {
    bg: "#F0FAF4",
    surface: "#DCFCE7",
    hi: "#065F46",
    mid: "#111111",
    lo: "#6B7280",
    border: "#BBF7D0",
    accent: "#10B981",
    navBg: "rgba(240,250,244,0.82)",
  },
  "2": {
    bg: "#FFF7ED",
    surface: "#FFEDD5",
    hi: "#9A3412",
    mid: "#111111",
    lo: "#6B7280",
    border: "#FED7AA",
    accent: "#FF8C00",
    navBg: "rgba(255,247,237,0.82)",
  },
  "3": {
    bg: "#1e1b4b",
    surface: "#262361",
    hi: "#A5B4FC",
    mid: "#E0E7FF",
    lo: "#94A3B8",
    border: "#4338ca",
    accent: "#818cf8",
    navBg: "rgba(30,27,75,0.82)",
  },
  "4": {
    bg: "#0f172a",
    surface: "#1e293b",
    hi: "#7DD3FC",
    mid: "#E2E8F0",
    lo: "#94A3B8",
    border: "#334155",
    accent: "#38bdf8",
    navBg: "rgba(15,23,42,0.82)",
  },
  "5": {
    bg: "#010101",
    surface: "#111111",
    hi: "#f5f5f5",
    mid: "#ebebeb",
    lo: "#888888",
    border: "#1f1f1f",
    accent: "#84CC16",
    navBg: "rgba(1,1,1,0.82)",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [themeIndex, setThemeIndex] = useState<ThemeIndex>(5);
  const [chatOpen, setChatOpen] = useState(false);
  const emailCopied = useRef(false);
  const [copyVisible, setCopyVisible] = useState(false);

  // ── Apply CSS variables ─────────────────────────────────────────────────────

  useEffect(() => {
    const t = themeVars[THEMES[themeIndex]];
    const root = document.documentElement;
    root.style.setProperty("--theme-bg", t.bg);
    root.style.setProperty("--theme-surface", t.surface);
    root.style.setProperty("--theme-text-hi", t.hi);
    root.style.setProperty("--theme-text-mid", t.mid);
    root.style.setProperty("--theme-text-lo", t.lo);
    root.style.setProperty("--theme-border", t.border);
    root.style.setProperty("--theme-accent", t.accent);
    root.style.setProperty("--theme-nav-bg", t.navBg);
  }, [themeIndex]);

  const copyEmail = useCallback(() => {
    if (emailCopied.current) return;
    navigator.clipboard.writeText("shvethanila@gmail.com").then(() => {
      setCopyVisible(true);
      emailCopied.current = true;
      setTimeout(() => {
        setCopyVisible(false);
        emailCopied.current = false;
      }, 2000);
    });
  }, []);

  const t = themeVars[THEMES[themeIndex]];

  // ── Inline styles (CSS-variable-driven) ─────────────────────────────────────
  const bodyStyle: React.CSSProperties = {
    backgroundColor: "var(--theme-bg)",
    color: "var(--theme-text-mid)",
    transition:
      "background-color 0.8s cubic-bezier(0.23,1,0.32,1), color 0.8s cubic-bezier(0.23,1,0.32,1)",
    WebkitFontSmoothing: "antialiased",
  };

  const navStyle: React.CSSProperties = {
    background: "var(--theme-nav-bg)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    borderBottom: "1px solid var(--theme-border)",
  };

  return (
    <>
      {/* Global theme CSS vars injected via useEffect */}
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
        div, section, h1, h2, h3, h4, p, span, a, button, nav, footer {
          transition: background-color 0.8s cubic-bezier(0.23,1,0.32,1),
            border-color 0.8s cubic-bezier(0.23,1,0.32,1),
            color 0.8s cubic-bezier(0.23,1,0.32,1),
            fill 0.8s cubic-bezier(0.23,1,0.32,1),
            stroke 0.8s cubic-bezier(0.23,1,0.32,1);
        }
        .project-card {
          border: 1px solid var(--theme-border);
          background: var(--theme-surface);
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.4s ease;
        }
        .project-card:hover { transform: translateY(-6px); border-color: var(--theme-accent); }
        .project-card:hover .card-arrow { transform: translateX(4px); }
        .card-arrow { transition: transform 0.3s ease; }
        .img-placeholder {
          width: 100%;
          aspect-ratio: 16/9;
          background: var(--theme-bg);
          border-bottom: 1px solid var(--theme-border);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .other-project-row {
          border-bottom: 1px solid var(--theme-border);
          transition: background-color 0.3s ease;
        }
        .other-project-row:hover { background-color: var(--theme-surface); }
      `}</style>

      <div
        style={bodyStyle}
        className="min-h-screen flex flex-col items-center selection:bg-[#84CC16] selection:text-white font-[Inter,sans-serif]"
      >
        {/* ── Navbar ─────────────────────────────────────────────────────────── */}
        <nav
          style={navStyle}
          className="w-full max-w-[1440px] px-8 md:px-[60px] py-10 flex justify-between items-center sticky top-0 z-50"
        >
          <div
            style={{ color: "var(--theme-text-hi)" }}
            className="text-[24px] font-medium leading-none tracking-tight"
          >
            S
          </div>
          <div className="flex items-center gap-6 md:gap-10">
            <div
              className="hidden md:flex gap-10 text-[16px] font-medium"
              style={{ color: "var(--theme-text-lo)" }}
            >
              <Link href="/projects" style={{ color: "var(--theme-text-hi)" }}>
                Projects
              </Link>
              <a href="#" className="hover:opacity-80 transition-opacity">
                About
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                Contact
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                Resume
              </a>
            </div>
            <button
              onClick={() => setChatOpen((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[16px] font-medium transition-all active:scale-95 group"
              style={{
                backgroundColor: "var(--theme-surface)",
                border: "1px solid var(--theme-border)",
                color: "var(--theme-text-hi)",
              }}
            >
              <span>Chat with My AI</span>
              <span className="text-[16px] opacity-60 group-hover:opacity-100 transition-opacity">
                ✨
              </span>
            </button>
          </div>
        </nav>

        {/* ── Main Content ────────────────────────────────────────────────────── */}
        <main className="w-full max-w-[1440px] px-8 md:px-[60px] pb-32">
          {/* Page Header */}
          <div className="pt-20 pb-16 mb-20">
            <p
              className="text-[12px] uppercase tracking-[0.18em] font-medium mb-5"
              style={{ color: "var(--theme-text-lo)" }}
            >
              Featured Work
            </p>
            <h1
              className="text-[52px] md:text-[76px] font-medium leading-[0.95] tracking-tight"
              style={{ color: "var(--theme-text-hi)" }}
            >
              Design Case <br />
              Studies
            </h1>
          </div>

          {/* ── Main Project Cards ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-10 mb-32 max-w-[900px] mx-auto w-full">
            {/* Card 1: Financial App */}
            <Link
              href="/projects/finance-app"
              className="project-card flex flex-row group"
              id="card-finance"
            >
              <div
                className="img-placeholder flex-shrink-0"
                style={{
                  width: "60%",
                  aspectRatio: "4/3",
                  borderBottom: "none",
                  borderRight: "1px solid var(--theme-border)",
                }}
              >
                <div className="flex flex-col items-center gap-3 opacity-20">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                    style={{ color: "var(--theme-text-lo)" }}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span
                    className="text-[11px] font-medium tracking-wide"
                    style={{ color: "var(--theme-text-lo)" }}
                  >
                    Add Cover Image
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-between p-10 flex-grow">
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "var(--theme-border)" }}
                      />
                      <h2
                        className="text-[22px] font-medium leading-tight"
                        style={{ color: "var(--theme-text-hi)" }}
                      >
                        Financial Decision Making
                      </h2>
                    </div>
                    <svg
                      className="card-arrow w-5 h-5 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      style={{ color: "var(--theme-text-lo)" }}
                    >
                      <path
                        d="M7 17L17 7M17 7H7M17 7v10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    className="text-[17px] font-medium leading-snug mb-4"
                    style={{ color: "var(--theme-text-hi)" }}
                  >
                    Redesigning money management for smarter, faster decisions.
                  </p>
                  <p
                    className="text-[14px] leading-relaxed"
                    style={{ color: "var(--theme-text-mid)" }}
                  >
                    Redesigning a budgeting app to guide users toward smarter
                    financial decisions through clarity and intent. A
                    decision-first approach that reduces cognitive load and
                    builds better habits.
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap mt-8">
                  {["2024", "Product Design", "FinTech"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[12px] font-medium rounded-full"
                      style={{
                        border: "1px solid var(--theme-border)",
                        color: "var(--theme-text-lo)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>

            {/* Card 2: E-commerce */}
            <a
              href="#"
              className="project-card flex flex-row group"
              id="card-ecommerce"
            >
              <div
                className="img-placeholder flex-shrink-0"
                style={{
                  width: "60%",
                  aspectRatio: "4/3",
                  borderBottom: "none",
                  borderRight: "1px solid var(--theme-border)",
                }}
              >
                <div className="flex flex-col items-center gap-3 opacity-20">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                    style={{ color: "var(--theme-text-lo)" }}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span
                    className="text-[11px] font-medium tracking-wide"
                    style={{ color: "var(--theme-text-lo)" }}
                  >
                    Add Cover Image
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-between p-10 flex-grow">
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "var(--theme-border)" }}
                      />
                      <h2
                        className="text-[22px] font-medium leading-tight"
                        style={{ color: "var(--theme-text-hi)" }}
                      >
                        Luxe E-Commerce Experience
                      </h2>
                    </div>
                    <svg
                      className="card-arrow w-5 h-5 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      style={{ color: "var(--theme-text-lo)" }}
                    >
                      <path
                        d="M7 17L17 7M17 7H7M17 7v10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    className="text-[17px] font-medium leading-snug mb-4"
                    style={{ color: "var(--theme-text-hi)" }}
                  >
                    Editorial fashion retail, reimagined for seamless discovery.
                  </p>
                  <p
                    className="text-[14px] leading-relaxed"
                    style={{ color: "var(--theme-text-mid)" }}
                  >
                    A premium fashion retail experience that blends editorial
                    storytelling with seamless, intent-driven purchasing flows.
                    Designed to feel like a boutique, not a marketplace.
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap mt-8">
                  {["2025", "Mobile App", "E-Commerce"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[12px] font-medium rounded-full"
                      style={{
                        border: "1px solid var(--theme-border)",
                        color: "var(--theme-text-lo)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>

            {/* Card 3: AI Productivity */}
            <a
              href="#"
              className="project-card flex flex-row group"
              id="card-ai"
            >
              <div
                className="img-placeholder flex-shrink-0"
                style={{
                  width: "60%",
                  aspectRatio: "4/3",
                  borderBottom: "none",
                  borderRight: "1px solid var(--theme-border)",
                }}
              >
                <div className="flex flex-col items-center gap-3 opacity-20">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                    style={{ color: "var(--theme-text-lo)" }}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span
                    className="text-[11px] font-medium tracking-wide"
                    style={{ color: "var(--theme-text-lo)" }}
                  >
                    Add Cover Image
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-between p-10 flex-grow">
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "var(--theme-border)" }}
                      />
                      <h2
                        className="text-[22px] font-medium leading-tight"
                        style={{ color: "var(--theme-text-hi)" }}
                      >
                        AI Productivity Dashboard
                      </h2>
                    </div>
                    <svg
                      className="card-arrow w-5 h-5 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      style={{ color: "var(--theme-text-lo)" }}
                    >
                      <path
                        d="M7 17L17 7M17 7H7M17 7v10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    className="text-[17px] font-medium leading-snug mb-4"
                    style={{ color: "var(--theme-text-hi)" }}
                  >
                    Intelligent task management that surfaces what matters most.
                  </p>
                  <p
                    className="text-[14px] leading-relaxed"
                    style={{ color: "var(--theme-text-mid)" }}
                  >
                    A futuristic task management tool that uses AI to surface
                    what matters most, reducing cognitive overload for knowledge
                    workers. Less noise, more focus.
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap mt-8">
                  {["2025", "SaaS", "AI/ML"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[12px] font-medium rounded-full"
                      style={{
                        border: "1px solid var(--theme-border)",
                        color: "var(--theme-text-lo)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </div>
        </main>

        {/* ── Footer ─────────────────────────────────────────────────────────── */}
        <footer
          className="relative w-full min-h-[670px] flex flex-col items-center justify-between pt-[100px] pb-[40px] overflow-hidden mt-32"
          style={{ backgroundColor: "var(--theme-bg)" }}
        >
          {/* Grid lines */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-full pointer-events-none z-0">
            {["10%", "22%"].map((left) => (
              <div
                key={left}
                className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--theme-border)]/30 to-transparent"
                style={{ left }}
              />
            ))}
            {["22%", "10%"].map((right) => (
              <div
                key={right}
                className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--theme-border)]/30 to-transparent"
                style={{ right }}
              />
            ))}
          </div>
          {/* Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none z-0"
            style={{
              backgroundColor: "var(--theme-accent)",
              opacity: 0.05,
              filter: "blur(120px)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center px-6 w-full">
            <div className="mb-14">
              <h2
                className="text-[36px] md:text-[52px] font-light tracking-tighter leading-[1.1] mb-2"
                style={{ color: "var(--theme-text-lo)", opacity: 0.4 }}
              >
                Interested in working together?
              </h2>
              <h2
                className="text-[36px] md:text-[52px] font-light tracking-tighter leading-[1.1]"
                style={{ color: "var(--theme-text-hi)", opacity: 0.8 }}
              >
                I&apos;d love to hear from you.
              </h2>
            </div>

            <div className="relative mb-12">
              <button
                onClick={copyEmail}
                className="flex items-center justify-center gap-0 hover:gap-3 px-8 py-4 rounded-xl text-[16px] transition-all duration-500 hover:-translate-y-1 group overflow-hidden"
                style={{
                  backgroundColor: "var(--theme-surface)",
                  border: "1px solid var(--theme-border)",
                  color: "var(--theme-text-hi)",
                }}
              >
                <span>shvethanila@gmail.com</span>
                <div className="w-0 group-hover:w-5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: "var(--theme-accent)" }}
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </div>
              </button>
              <div
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-[12px] pointer-events-none transition-opacity duration-300 ${copyVisible ? "opacity-100" : "opacity-0"}`}
                style={{ color: "var(--theme-text-lo)" }}
              >
                Email copied!
              </div>
            </div>

            <div className="w-[1px] h-[100px] bg-gradient-to-b from-[var(--theme-border)] to-transparent mb-12 opacity-40" />

            <div className="flex gap-8 items-center mb-16">
              {/* LinkedIn */}
              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center transition-all duration-500 hover:scale-110"
                style={{ color: "var(--theme-text-lo)" }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center transition-all duration-500 hover:scale-110"
                style={{ color: "var(--theme-text-lo)" }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* Dribbble */}
              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center transition-all duration-500 hover:scale-110"
                style={{ color: "var(--theme-text-lo)" }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                </svg>
              </a>
            </div>

            <div
              className="flex items-center gap-2 text-[14px] opacity-40 font-medium pb-8 w-full justify-center"
              style={{ color: "var(--theme-text-lo)" }}
            >
              <span>©</span>
              <span>Shvetha Senthilkumar 2026</span>
            </div>
          </div>
        </footer>

        <Footer />
        {/* ── AI Chat Drawer ──────────────────────────────────────────────────── */}
        <div
          className={`fixed bottom-0 right-0 p-4 z-[200] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${chatOpen ? "translate-y-0" : "translate-y-[110%]"}`}
          style={{ width: 400, height: 620 }}
        >
          <AIChatbox onClose={() => setChatOpen(false)} />
        </div>

        {/* ── Theme Dock ──────────────────────────────────────────────────────── */}
        <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[100] flex">
          <div
            className="group relative flex items-center gap-4 px-4 py-2 rounded-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:w-[260px] w-[56px] h-[48px] overflow-hidden cursor-pointer"
            style={{
              backgroundColor: "var(--theme-surface)",
              border: "1px solid var(--theme-border)",
            }}
          >
            <div
              className="flex-shrink-0 transition-all duration-500 scale-110 group-hover:rotate-12"
              style={{ color: "var(--theme-text-hi)" }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM12 4v16a8 8 0 000-16z" />
              </svg>
            </div>
            <div className="relative flex items-center w-[170px] h-full opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="flex justify-between w-full items-center px-1 pointer-events-none">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-[6px] h-[6px] rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: "var(--theme-accent)",
                      opacity: i <= themeIndex ? 1 : 0.2,
                      transform: i === themeIndex ? "scale(1.6)" : "scale(1)",
                    }}
                  />
                ))}
              </div>
              <input
                type="range"
                min={0}
                max={5}
                step={1}
                value={themeIndex}
                onChange={(e) =>
                  setThemeIndex(parseInt(e.target.value) as ThemeIndex)
                }
                className="absolute inset-0 w-full h-[40px] opacity-0 cursor-pointer z-50 appearance-none"
              />
            </div>
          </div>
        </div>

        {/* ── Floating Chat Button ────────────────────────────────────────────── */}
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100]">
          <button
            onClick={() => setChatOpen((v) => !v)}
            className="w-12 h-12 flex items-center justify-center rounded-full transition-all"
            style={{
              backgroundColor: "var(--theme-surface)",
              border: "1px solid var(--theme-border)",
              color: "var(--theme-text-lo)",
            }}
          >
            {chatOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
