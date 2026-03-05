"use client";

import { useState } from "react";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "shvethanila@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="footer-section relative w-full h-[670px] min-h-[670px] flex flex-col items-center justify-between py-[60px] pb-[40px] bg-[var(--bg-primary)] overflow-hidden font-manrope">
      {/* Background Grid Lines */}
      <div className="grid-lines absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-full pointer-events-none z-0">
        <div className="grid-line absolute w-[1px] h-full left-[10%] bg-gradient-to-b from-transparent via-black/15 dark:via-white/15 to-transparent" />
        <div className="grid-line absolute w-[1px] h-full left-[22%] bg-gradient-to-b from-transparent via-black/15 dark:via-white/15 to-transparent" />
        <div className="grid-line absolute w-[1px] h-full right-[22%] bg-gradient-to-b from-transparent via-black/15 dark:via-white/15 to-transparent" />
        <div className="grid-line absolute w-[1px] h-full right-[10%] bg-gradient-to-b from-transparent via-black/15 dark:via-white/15 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="footer-content relative z-[5] text-center flex flex-col items-center my-auto">
        <div className="title-group mb-12 animate-fadeInUp">
          <h2 className="footer-title text-[48px] font-light mb-2 tracking-[-1px] text-[var(--text-muted)]">
            Interested in working together?
          </h2>
          <h2 className="footer-subtitle text-[48px] font-light tracking-[-1px] text-[var(--text-primary)]">
            I&apos;d love to hear from you.
          </h2>
        </div>

        <div className="email-wrapper relative mb-12">
          <button
            onClick={handleCopy}
            className={`email-btn bg-[var(--bg-secondary)] border border-[var(--border)] py-3.5 px-6 rounded-xl text-[var(--text-primary)] text-[16px] font-normal cursor-pointer transition-all duration-500 hover:border-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:px-8 hover:gap-3 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-center gap-0 overflow-hidden whitespace-nowrap group animate-fadeInUp delay-200`}
          >
            <span>{email}</span>
            <div className="copy-icon w-0 opacity-0 group-hover:w-[18px] group-hover:opacity-100 transition-all duration-400 flex items-center justify-center">
              <svg
                className="w-[18px] h-[18px] fill-none stroke-[var(--accent)] stroke-[1.5]"
                viewBox="0 0 24 24"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </div>
          </button>
          <div
            className={`copy-success absolute -bottom-[30px] left-1/2 -translate-x-1/2 text-[12px] text-[var(--text-muted)] transition-opacity duration-300 pointer-events-none ${copied ? "opacity-100" : "opacity-0"}`}
          >
            Email copied!
          </div>
        </div>

        <div className="social-group flex gap-6 items-center flex-wrap justify-center animate-fadeInUp delay-400">
          <SocialLink href="#" label="LinkedIn" iconClass="linkedin-icon" />
          <SocialLink href="#" label="Instagram" iconClass="instagram-icon" />
          <SocialLink href="#" label="Behance" iconClass="behance-icon" />
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright-bar relative z-[5] text-[14px] text-[var(--text-muted)] flex items-center gap-2 pb-5 font-normal">
        <span>©</span>
        <span>Shvetha Senthilkumar 2026</span>
      </div>
    </section>
  );
}

function SocialLink({
  href,
  label,
  iconClass,
}: {
  href: string;
  label: string;
  iconClass: string;
}) {
  const iconUrls: Record<string, string> = {
    "linkedin-icon":
      "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg",
    "instagram-icon":
      "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg",
    "behance-icon":
      "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/behance.svg",
  };

  return (
    <a
      href={href}
      className="social-link w-[52px] h-[52px] rounded-xl flex items-center justify-center transition-all duration-500 text-[var(--text-secondary)] hover:scale-105 hover:text-[var(--accent)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
      aria-label={label}
    >
      <span
        className="icon-component w-6 h-6 bg-current transition-colors duration-400"
        style={{
          maskImage: `url(${iconUrls[iconClass]})`,
          WebkitMaskImage: `url(${iconUrls[iconClass]})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
    </a>
  );
}
