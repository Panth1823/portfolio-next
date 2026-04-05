"use client";

import { useEffect, useState } from "react";

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
    bg: "#f5f5f0",
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
    bg: "#0a0a0a",
    surface: "#111111",
    hi: "#f5f5f5",
    mid: "#ebebeb",
    lo: "#888888",
    border: "#1f1f1f",
    accent: "#84CC16",
    navBg: "rgba(1,1,1,0.82)",
  },
};

export default function ThemeDock() {
  const [themeIndex, setThemeIndex] = useState<ThemeIndex>(5);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("projectThemeIndex");
    if (saved !== null && !isNaN(parseInt(saved))) {
      setThemeIndex(parseInt(saved) as ThemeIndex);
    }
  }, []);

  useEffect(() => {
    const t = themeVars[THEMES[themeIndex]];
    const root = document.documentElement;
    
    // Map to projects CSS vars
    root.style.setProperty("--theme-bg", t.bg);
    root.style.setProperty("--theme-surface", t.surface);
    root.style.setProperty("--theme-text-hi", t.hi);
    root.style.setProperty("--theme-text-mid", t.mid);
    root.style.setProperty("--theme-text-lo", t.lo);
    root.style.setProperty("--theme-border", t.border);
    root.style.setProperty("--theme-accent", t.accent);
    root.style.setProperty("--theme-nav-bg", t.navBg);

    // Map to homepage global CSS vars
    root.style.setProperty("--bg-primary", t.bg);
    root.style.setProperty("--bg-secondary", t.surface);
    root.style.setProperty("--bg-card", t.surface);
    root.style.setProperty("--text-primary", t.hi);
    root.style.setProperty("--text-secondary", t.mid);
    root.style.setProperty("--text-muted", t.lo);
    root.style.setProperty("--border", t.border);
    // don't map accent directly yet strictly, but it's safe
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--ground-line", t.accent);
  }, [themeIndex]);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        div:not(.cursor-pointer):not(.translate-y-0):not(.rotate-12):not(.opacity-0):not(.scale-110), section, h1, h2, h3, h4, p, span, a, button, nav, footer, aside, ul, li {
          transition: background-color 0.8s cubic-bezier(0.23,1,0.32,1),
            border-color 0.8s cubic-bezier(0.23,1,0.32,1),
            color 0.8s cubic-bezier(0.23,1,0.32,1),
            fill 0.8s cubic-bezier(0.23,1,0.32,1),
            stroke 0.8s cubic-bezier(0.23,1,0.32,1);
        }
        
        .transition-all {
          transition-property: all !important;
        }
      `}</style>
      <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[100] flex">
        <div className="group relative flex items-center gap-4 px-4 py-2 rounded-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:w-[220px] w-[56px] h-[48px] overflow-hidden cursor-pointer bg-[var(--theme-surface)] border border-[var(--theme-border)]">
          <div className="flex-shrink-0 transition-all duration-500 scale-110 group-hover:rotate-12 text-[var(--theme-text-hi)]">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM12 4v16a8 8 0 000-16z" />
            </svg>
          </div>
          <div className="relative flex items-center w-[140px] h-full opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="flex justify-between w-full items-center px-1 pointer-events-none">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-[6px] h-[6px] rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: i === themeIndex ? "var(--theme-accent)" : "var(--theme-text-hi)",
                    opacity: i === themeIndex ? 1 : 0.25,
                    transform: i === themeIndex ? "scale(1.5)" : "scale(1)",
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
              onChange={(e) => {
                const newIndex = parseInt(e.target.value) as ThemeIndex;
                setThemeIndex(newIndex);
                localStorage.setItem("projectThemeIndex", newIndex.toString());
              }}
              className="absolute inset-0 w-full h-[40px] opacity-0 cursor-pointer z-50 appearance-none"
            />
          </div>
        </div>
      </div>
    </>
  );
}
