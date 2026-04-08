"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AIChatbox, { type AIChatboxHandle } from "./AIChatbox";

export default function AIChatWrapper() {
  const pathname = usePathname();
  const isProjectPage =
    pathname?.startsWith("/projects/") && pathname !== "/projects";
  const isHomePage = pathname === "/";
  const isProjectsListPage = pathname === "/projects";
  const hideFab = isHomePage || isProjectsListPage;

  const [chatOpen, setChatOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const chatboxRef = useRef<AIChatboxHandle>(null);

  // Global toggle listener (used by Hero or other components)
  useEffect(() => {
    const handleToggle = () => setChatOpen((prev) => !prev);
    window.addEventListener("toggle-ai-chat", handleToggle);
    return () => window.removeEventListener("toggle-ai-chat", handleToggle);
  }, []);

  const handleVoiceStateChange = useCallback(
    (state: "idle" | "speaking" | "paused") => {
      setIsSpeaking(state !== "idle");
      setIsPaused(state === "paused");
    },
    [],
  );

  const triggerVoiceBrief = useCallback(() => {
    if (!chatboxRef.current) return;

    if (!isSpeaking) {
      chatboxRef.current.startVoice();
    } else {
      if (!isPaused) {
        chatboxRef.current.pauseVoice();
      } else {
        chatboxRef.current.resumeVoice();
      }
    }
  }, [isSpeaking, isPaused]);

  const restartVoice = useCallback(() => {
    chatboxRef.current?.restartVoice();
  }, []);

  return (
    <>
      {/* ── AI CHATBOX DRAWER ── */}
      <div
        className={`fixed bottom-0 right-0 w-[450px] max-w-full h-[650px] max-h-[90vh] p-4 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-[200] ${
          chatOpen ? "translate-y-0" : "translate-y-[110%]"
        }`}
      >
        <AIChatbox
          ref={chatboxRef}
          onClose={() => setChatOpen(false)}
          onVoiceStateChange={handleVoiceStateChange}
        />
      </div>

      {/* ── FLOATING BUTTONS ── */}
      {!hideFab &&
        (isProjectPage ? (
          !chatOpen &&
          /* Project Page: Quick Brief Button */
          <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] flex items-center">
            <div
              className={`flex items-center gap-1 p-1.5 bg-[var(--theme-surface)] border backdrop-blur-2xl rounded-full transition-all duration-500 ease-out ${
                isSpeaking
                  ? "border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/5"
                  : "border-[var(--theme-border)]"
              }`}
            >
              {/* Restart Button */}
              {isSpeaking && (
                <button
                  onClick={restartVoice}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-[var(--theme-lo)] hover:bg-[var(--theme-border)]/20 hover:text-[var(--theme-hi)] transition-all active:scale-90"
                  title="Restart"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              )}

              {/* Main Toggle Button */}
              <button
                onClick={triggerVoiceBrief}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[var(--theme-hi)] text-[13px] font-medium transition-all group active:scale-95 hover:bg-[var(--theme-border)]/20"
              >
                <div className="relative flex items-center justify-center w-6 h-6">
                  {/* Animated Wave */}
                  {isSpeaking && !isPaused && (
                    <div className="flex gap-[2px] items-center h-3">
                      <div className="w-[1.5px] h-1.5 bg-[var(--theme-accent)] rounded-full animate-[wave_1s_infinite_0s]"></div>
                      <div className="w-[1.5px] h-3 bg-[var(--theme-accent)] rounded-full animate-[wave_1s_infinite_0.2s]"></div>
                      <div className="w-[1.5px] h-1.5 bg-[var(--theme-accent)] rounded-full animate-[wave_1s_infinite_0.4s]"></div>
                    </div>
                  )}

                  {/* Mic icon (idle) */}
                  {!isSpeaking && (
                    <Image
                      src="/images/weui_voice-outlined.png"
                      alt="Volume"
                      width={20}
                      height={20}
                      className="w-5 h-5 opacity-70 invert transition-opacity group-hover:opacity-100"
                    />
                  )}

                  {/* Play icon (paused) */}
                  {isSpeaking && isPaused && (
                    <svg
                      className="w-6 h-6 text-[var(--theme-accent)]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 3.868v16.264c0 .88 1.05 1.34 1.706.746l8.846-8.132a1 1 0 0 0 0-1.492L6.706 3.122C6.05 2.528 5 2.988 5 3.868z" />
                    </svg>
                  )}
                </div>
                <span className="tracking-wide">
                  {!isSpeaking ? "Quick Brief" : isPaused ? "Play" : "Pause"}
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* Regular Page: Chat FAB */
          <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100]">
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className="w-12 h-12 flex items-center justify-center bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-full text-[var(--theme-lo)] hover:text-[var(--theme-accent)] hover:border-[var(--theme-accent)]/50 transition-all"
              aria-label="Toggle AI Chat"
            >
              {chatOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  />
                </svg>
              )}
            </button>
          </div>
        ))}
    </>
  );
}
