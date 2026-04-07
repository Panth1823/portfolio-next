"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export interface BriefData {
  title: string;
  href: string;
  accentColor: string;
  role: string;
  duration: string;
  tools: string;
  category: string;
  points: string[];
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function QuickBriefModal({
  data,
  onClose,
}: {
  data: BriefData;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const meta = [
    { label: "Role", value: data.role },
    { label: "Duration", value: data.duration },
    { label: "Tools", value: data.tools },
    { label: "Category", value: data.category },
  ];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[540px] rounded-[24px] border border-[var(--theme-border)] bg-[var(--theme-bg)] font-manrope overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
        style={{ animation: "briefUp 0.32s cubic-bezier(0.16,1,0.3,1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-[var(--theme-border)]">
          <div>
            <p className="text-[10px] tracking-[0.14em] uppercase font-semibold opacity-40 text-[var(--theme-text-lo)] mb-1">
              Quick Brief
            </p>
            <h3 className="text-[20px] font-semibold leading-tight text-[var(--theme-text-hi)]">
              {data.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center border border-[var(--theme-border)] text-[var(--theme-text-lo)] hover:text-[var(--theme-text-hi)] hover:border-[var(--theme-text-lo)] transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2]">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Meta strip */}
        <div className="grid grid-cols-4 gap-px border-b border-[var(--theme-border)] bg-[var(--theme-border)]">
          {meta.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1 px-4 py-4 bg-[var(--theme-bg)]">
              <span className="text-[10px] uppercase tracking-[0.12em] font-semibold opacity-40 text-[var(--theme-text-lo)]">
                {label}
              </span>
              <span className="text-[13px] font-medium leading-snug text-[var(--theme-text-hi)]">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Bullet points */}
        <ul className="flex flex-col gap-4 px-7 py-6">
          {data.points.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[14px] leading-[1.65] text-[var(--theme-text-lo)]"
            >
              <span
                className="mt-[6px] w-1.5 h-1.5 rounded-sm shrink-0"
                style={{ backgroundColor: data.accentColor }}
              />
              {point}
            </li>
          ))}
        </ul>

        {/* Accent line at bottom */}
        <div className="px-7 pb-7">
          <div
            className="w-full h-[2px] rounded-full mb-5 opacity-30"
            style={{ backgroundColor: data.accentColor }}
          />
          <Link
            href={data.href}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[13px] font-semibold border border-[var(--theme-border)] text-[var(--theme-text-lo)] hover:text-[var(--theme-text-hi)] hover:border-[var(--theme-text-lo)] transition-all"
          >
            Scroll to read full case study
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2]">
              <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes briefUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

// ── Trigger Button ────────────────────────────────────────────────────────────

export default function QuickBriefButton({ data }: { data: BriefData }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open quick brief"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--theme-border)] text-[var(--theme-text-lo)] text-[13px] font-semibold tracking-wide hover:text-[var(--theme-text-hi)] hover:border-[var(--theme-text-lo)] transition-all duration-200 hover:scale-[1.02] active:scale-95"
      >
        <svg viewBox="0 0 16 16" className="w-4 h-4 fill-none stroke-current stroke-[1.5]">
          <circle cx="8" cy="8" r="6.5" />
          <path d="M8 7v4M8 5.2v.6" strokeLinecap="round" />
        </svg>
        Quick Brief
      </button>

      {open && <QuickBriefModal data={data} onClose={() => setOpen(false)} />}
    </>
  );
}
