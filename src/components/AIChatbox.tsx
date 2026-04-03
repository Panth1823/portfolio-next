'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ── Types ────────────────────────────────────────────────────────────────────

interface Suggestion {
  label: string;
  value: string;
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  suggestions?: Suggestion[];
}

type KnowledgeCategory =
  | 'experience'
  | 'work'
  | 'problem'
  | 'skills'
  | 'who'
  | 'greeting'
  | 'default';

// ── Data ─────────────────────────────────────────────────────────────────────

const knowledgeBase: Record<KnowledgeCategory, string[]> = {
  experience: [
    'Shvetha is a Product Designer with 3+ years of experience in building cinematic web and mobile experiences. She loves combining her engineering background with user-centric design.',
    'With 3 years in the design field, Shvetha has a knack for turning complex problems into simple, intuitive solutions.',
    "Shvetha has been designing for 3 years now. She transitioned from engineering to Product Design, focusing on logical yet creative UX.",
  ],
  work: [
    "She's currently a UX Designer at Koiostudio (2025). Previously, she was a UX Intern at Mentorsity and has been freelancing since 2022.",
    "Currently, she's contributing as a UX Designer at Koiostudio. Her background includes an internship at Mentorsity and freelance work.",
  ],
  problem: [
    "In the 'Financial Decisions' study, Shvetha tackled 'Information Overload'—helping users make choices rather than just seeing data.",
    "The core problem was that budgeting tools often confuse users with too much data. Her solution focuses on guided clarity.",
  ],
  skills: [
    "She's an expert in Figma and FigJam, using them for deep UX Research and high-fidelity Prototyping.",
    "Her skill set includes UX Research, UI Design, and Wireframing, bringing 'Decision-First' digital tools to life.",
  ],
  who: [
    "I'm Shvetha's dedicated AI assistant! I'm here to provide insights into her design process and experience.",
    "I'm a digital guide to Shvetha's portfolio. I can help you navigate her 3 years of work.",
  ],
  greeting: [
    "Hello! What part of Shvetha's journey are you most curious about?",
    'Hi there! Would you like to hear about her latest case study or her overall experience?',
  ],
  default: [
    "That's a great question! I can tell you about Shvetha's 3 years of experience, her role at Koiostudio, or the finance case study.",
    "I'm still learning! But I can share details about Shvetha's design skills or the 'Financial Decisions' project.",
  ],
};

const suggestionPool: Suggestion[] = [
  { label: 'Case Study Problem', value: 'Case Study Problem' },
  { label: '3 Years Experience', value: 'Experience' },
  { label: 'Koiostudio Role', value: 'Work at Koiostudio' },
  { label: 'Design Skills', value: 'Skills' },
  { label: 'Mentorsity Internship', value: 'Mentorsity Internship' },
  { label: 'Engineering Background', value: 'Engineering Background' },
  { label: 'Her Design Process', value: 'Process' },
  { label: 'Current Location', value: 'Where is she based?' },
];

const narrativeText =
  "Hi! I'm Shvetha... For this project, I really wanted to solve a problem I've faced myself. Most budgeting apps are just numbers and charts, which can feel really overwhelming for students... So, I reimagined the experience to be what I call 'Decision-First'... Instead of just tracking where your money went, I designed it to guide you toward clear financial choices, like whether you can actually afford that next coffee today... The result? A 40% boost in user engagement. It's not just an app; it's a proactive financial guide that I'm truly proud of.";

// ── Helpers ───────────────────────────────────────────────────────────────────

function getCategory(text: string): KnowledgeCategory {
  const lower = text.toLowerCase();
  if (lower.includes('experience')) return 'experience';
  if (lower.includes('work') || lower.includes('koiostudio')) return 'work';
  if (lower.includes('problem')) return 'problem';
  if (lower.includes('skill')) return 'skills';
  if (lower.includes('who')) return 'who';
  if (lower.includes('hi') || lower.includes('hello')) return 'greeting';
  return 'default';
}

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getDynamicSuggestions(currentValue: string): Suggestion[] {
  const lower = currentValue.toLowerCase();
  return suggestionPool
    .filter(
      (s) =>
        s.value.toLowerCase() !== lower && s.label.toLowerCase() !== lower,
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
}

// ── Component ─────────────────────────────────────────────────────────────────

interface AIChatboxProps {
  onClose?: () => void;
}

export default function AIChatbox({ onClose }: AIChatboxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceState, setVoiceState] = useState<'idle' | 'speaking' | 'paused'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgIdRef = useRef(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // ── Voice helpers ───────────────────────────────────────────────────────────

  const getFemaleVoice = useCallback((): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    const searchTerms = ['Zira', 'Aria', 'Samantha', 'Victoria', 'Google US English', 'Female'];
    for (const term of searchTerms) {
      const voice = voices.find((v) => v.name.includes(term));
      if (voice) return voice;
    }
    return voices.find((v) => v.lang.startsWith('en')) ?? voices[0] ?? null;
  }, []);

  const addMessage = useCallback(
    (text: string, isUser = false, suggestions?: Suggestion[]) => {
      setMessages((prev) => [
        ...prev,
        { id: ++msgIdRef.current, text, isUser, suggestions },
      ]);
    },
    [],
  );

  const stopVoice = useCallback(() => {
    if (utteranceRef.current) {
      utteranceRef.current.onend = null;
      utteranceRef.current.onerror = null;
    }
    window.speechSynthesis.cancel();
    setVoiceState('idle');
  }, []);

  const startVoice = useCallback(() => {
    if (utteranceRef.current) {
      utteranceRef.current.onend = null;
      utteranceRef.current.onerror = null;
    }
    window.speechSynthesis.cancel();

    setTimeout(() => {
      const utt = new SpeechSynthesisUtterance(narrativeText);
      utt.pitch = 1.0;
      utt.rate = 0.92;
      const voice = getFemaleVoice();
      if (voice) utt.voice = voice;
      utt.onend = () => setVoiceState('idle');
      utt.onerror = () => setVoiceState('idle');
      utteranceRef.current = utt;
      window.speechSynthesis.speak(utt);
      setVoiceState('speaking');
      addMessage('Narrating my project journey... 🎙️');
    }, 100);
  }, [getFemaleVoice, addMessage]);

  const toggleVoice = useCallback(() => {
    if (voiceState === 'idle') {
      startVoice();
    } else if (voiceState === 'speaking') {
      window.speechSynthesis.pause();
      setVoiceState('paused');
    } else {
      window.speechSynthesis.resume();
      setVoiceState('speaking');
    }
  }, [voiceState, startVoice]);

  // ── Message sending ─────────────────────────────────────────────────────────

  const sendMessage = useCallback(
    (customText?: string) => {
      const text = customText ?? inputValue.trim();
      if (!text) return;
      addMessage(text, true);
      if (!customText) setInputValue('');
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        const category = getCategory(text);
        const reply = getRandom(knowledgeBase[category]);
        const suggestions = getDynamicSuggestions(text);
        addMessage(reply, false, suggestions);
      }, 1000);
    },
    [inputValue, addMessage],
  );

  // ── Init welcome message ────────────────────────────────────────────────────

  useEffect(() => {
    const welcomeSuggestions = suggestionPool
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const timer = setTimeout(() => {
      addMessage(
        "Hi! I'm Shvetha's AI assistant. I can help you walk through her portfolio, explain the design process behind her projects, or share more about her 3-year journey. What would you like to explore?",
        false,
        welcomeSuggestions,
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [addMessage]);

  // ── Auto-scroll ─────────────────────────────────────────────────────────────

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // ── Cleanup on unmount ──────────────────────────────────────────────────────

  useEffect(() => {
    return () => stopVoice();
  }, [stopVoice]);

  // ── Render ──────────────────────────────────────────────────────────────────

  const voiceIcon =
    voiceState === 'speaking' ? (
      /* Pause icon */
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
      </svg>
    ) : voiceState === 'paused' ? (
      /* Play icon */
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 3.868v16.264c0 .88 1.05 1.34 1.706.746l8.846-8.132a1 1 0 0 0 0-1.492L6.706 3.122C6.05 2.528 5 2.988 5 3.868z" />
      </svg>
    ) : (
      /* Mic icon */
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="19" x2="12" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="8" y1="23" x2="16" y2="23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );

  return (
    <div className="w-full max-w-[380px] h-[580px] bg-[#0d0d0d] border border-white/10 rounded-[28px] shadow-2xl flex flex-col overflow-hidden font-[Inter,sans-serif]">
      {/* Header */}
      <div className="p-6 border-b border-white/5 bg-white/[0.01] flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/50 font-bold text-lg">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-white/90 font-bold text-[15px]">Shvetha&apos;s AI</span>
            <span className="text-[10px] text-gray-500 font-medium tracking-wide uppercase opacity-80">
              Portfolio Assistant
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleVoice}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 text-gray-500 hover:text-[#84CC16] transition-all"
            title="Narrate Project"
          >
            {voiceIcon}
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow p-6 overflow-y-auto flex flex-col gap-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-1.5 max-w-[85%] ${msg.isUser ? 'self-end items-end' : 'self-start'}`}
          >
            <div
              className={`p-3.5 rounded-[18px] text-[13px] leading-[1.6] shadow-md ${
                msg.isUser
                  ? 'bg-white/10 text-white rounded-tr-none'
                  : 'bg-white/[0.03] border border-white/5 text-gray-300 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
            {!msg.isUser && msg.suggestions && (
              <div className="flex flex-wrap gap-2 mt-2">
                {msg.suggestions.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => sendMessage(s.value)}
                    className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] text-gray-400 hover:border-white/30 hover:text-white transition-all text-left"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
            <span className="text-[9px] text-gray-700 font-medium px-1 mt-1">
              {msg.isUser ? 'You · Just now' : 'AI · Just now'}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex self-start p-3 bg-white/[0.02] rounded-full px-5 text-gray-600 text-[11px] animate-pulse">
            thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-5 bg-white/[0.01] border-t border-white/5">
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your question..."
            className="w-full bg-white/5 border border-white/5 rounded-full py-3 px-5 pr-12 text-[13px] text-white focus:outline-none focus:border-white/20 placeholder:text-gray-700 transition-all"
          />
          <button
            onClick={() => sendMessage()}
            className="absolute right-1 top-1 w-10 h-10 flex items-center justify-center bg-white/[0.05] rounded-full text-white/50 hover:bg-white/10 hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
