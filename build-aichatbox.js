const fs = require('fs');

const html = fs.readFileSync('AI_Chatbox.html', 'utf8');

const kbMatch = html.match(/const knowledgeBase = (\{[\s\S]*?\n        \};\n)/);
const spMatch = html.match(/const suggestionPool = (\[[\s\S]*?\];)/);
const queryMatch = html.match(/function analyzeQuery\(query\) \{([\s\S]*?)return bestScore > 0 \? bestCategory : 'default';\n        \}/);

const kb = kbMatch ? kbMatch[1] : '{}';
const sp = spMatch ? spMatch[1] : '[]';
const query = queryMatch ? `function analyzeQuery(query) {${queryMatch[1]}return bestScore > 0 ? bestCategory : 'default';}` : '';

let newFile = `'use client';

import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';

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

// ── Data ─────────────────────────────────────────────────────────────────────

const knowledgeBase: Record<string, { keywords: string[], weight?: number, responses: string[] }> = ${kb};

const suggestionPool: Suggestion[] = ${sp};

const narrativeText =
  "Hi! I'm Shvetha... For this project, I really wanted to solve a problem I've faced myself. Most budgeting apps are just numbers and charts, which can feel really overwhelming for students... So, I reimagined the experience to be what I call 'Decision-First'... Instead of just tracking where your money went, I designed it to guide you toward clear financial choices, like whether you can actually afford that next coffee today... The result? A 40% boost in user engagement. It's not just an app; it's a proactive financial guide that I'm truly proud of.";

// ── Helpers ───────────────────────────────────────────────────────────────────

${query}

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getResponse(query: string): string {
    const category = analyzeQuery(query);
    const categoryData = knowledgeBase[category] || knowledgeBase['default'];
    // Fallback to default if categoryData or responses is undefined
    const responses = categoryData && categoryData.responses ? categoryData.responses : ["I'm not quite sure how to help with that. Can you try asking about her projects or experience?"];
    return getRandom(responses);
}

// Global set to keep track of asked topics so suggestions are dynamic
const askedTopics = new Set<string>();

function getDynamicSuggestions(currentValue: string): Suggestion[] {
    askedTopics.add(currentValue.toLowerCase());

    let filtered = suggestionPool.filter(s =>
        !askedTopics.has(s.value.toLowerCase()) &&
        s.value.toLowerCase() !== currentValue.toLowerCase() &&
        s.label.toLowerCase() !== currentValue.toLowerCase()
    );

    if (filtered.length < 3) {
        filtered = suggestionPool.filter(s =>
            s.value.toLowerCase() !== currentValue.toLowerCase()
        );
    }

    return filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
}

// ── Component ─────────────────────────────────────────────────────────────────

export interface AIChatboxHandle {
  startVoice: () => void;
  pauseVoice: () => void;
  resumeVoice: () => void;
  restartVoice: () => void;
  voiceState: 'idle' | 'speaking' | 'paused';
}

interface AIChatboxProps {
  onClose?: () => void;
  onVoiceStateChange?: (state: 'idle' | 'speaking' | 'paused') => void;
}

const AIChatbox = forwardRef<AIChatboxHandle, AIChatboxProps>(function AIChatbox({ onClose, onVoiceStateChange }, ref) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceState, setVoiceState] = useState<'idle' | 'speaking' | 'paused'>('idle');
  const [isListening, setIsListening] = useState(false);
  const [micStatus, setMicStatus] = useState({ text: '', color: '' });

  const setAndNotifyVoiceState = useCallback((state: 'idle' | 'speaking' | 'paused') => {
    setVoiceState(state);
    onVoiceStateChange?.(state);
  }, [onVoiceStateChange]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgIdRef = useRef(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);

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
    setAndNotifyVoiceState('idle');
  }, [setAndNotifyVoiceState]);

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
      utt.onend = () => setAndNotifyVoiceState('idle');
      utt.onerror = () => setAndNotifyVoiceState('idle');
      utteranceRef.current = utt;
      window.speechSynthesis.speak(utt);
      setAndNotifyVoiceState('speaking');
      addMessage('Narrating my project journey... 🎙️');
    }, 100);
  }, [getFemaleVoice, addMessage, setAndNotifyVoiceState]);

  const pauseVoice = useCallback(() => {
    window.speechSynthesis.pause();
    setAndNotifyVoiceState('paused');
  }, [setAndNotifyVoiceState]);

  const resumeVoice = useCallback(() => {
    window.speechSynthesis.resume();
    setAndNotifyVoiceState('speaking');
  }, [setAndNotifyVoiceState]);

  const restartVoice = useCallback(() => {
    startVoice();
  }, [startVoice]);

  const toggleVoice = useCallback(() => {
    if (voiceState === 'idle') {
      startVoice();
    } else if (voiceState === 'speaking') {
      pauseVoice();
    } else {
      resumeVoice();
    }
  }, [voiceState, startVoice, pauseVoice, resumeVoice]);

  // ── Expose voice controls to parent via ref ─────────────────────────────────

  useImperativeHandle(ref, () => ({
    startVoice,
    pauseVoice,
    resumeVoice,
    restartVoice,
    voiceState,
  }), [startVoice, pauseVoice, resumeVoice, restartVoice, voiceState]);

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
        const reply = getResponse(text);
        const suggestions = getDynamicSuggestions(text);
        addMessage(reply, false, suggestions);
      }, 400 + Math.random() * 400); // randomize slightly to feel more natural
    },
    [inputValue, addMessage],
  );

  // ── Mic functionality (Speech Recognition) ─────────────────────────────────

  const stopMicInput = useCallback(() => {
    setIsListening(false);
    setMicStatus({ text: '', color: '' });
  }, []);

  const initSpeechRecognition = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported in this browser.');
      return false;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setMicStatus({ text: '🎤 Listening... speak now', color: '#ef4444' });
    };

    recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInputValue(transcript);

      if (event.results[event.results.length - 1].isFinal) {
        setTimeout(() => {
          sendMessage(transcript);
        }, 300);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      stopMicInput();
      if (event.error === 'not-allowed') {
        setMicStatus({ text: '⚠️ Mic access denied. Check browser permissions.', color: '#ef4444' });
      } else if (event.error === 'no-speech') {
        setMicStatus({ text: 'No speech detected. Try again.', color: '#6b7280' });
      } else {
        setMicStatus({ text: 'Mic error. Try again.', color: '#ef4444' });
      }
      setTimeout(() => setMicStatus({ text: '', color: '' }), 3000);
    };

    recognition.onend = () => {
      stopMicInput();
    };

    recognitionRef.current = recognition;
    return true;
  }, [sendMessage, stopMicInput]);

  const toggleMicInput = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
      stopMicInput();
      return;
    }

    if (!recognitionRef.current) {
      const supported = initSpeechRecognition();
      if (!supported) {
        setMicStatus({ text: '⚠️ Voice input not supported in this browser.', color: '#ef4444' });
        setTimeout(() => setMicStatus({ text: '', color: '' }), 3000);
        return;
      }
    }

    setInputValue('');
    recognitionRef.current?.start();
  }, [isListening, initSpeechRecognition, stopMicInput]);

  // ── Init welcome message ────────────────────────────────────────────────────

  useEffect(() => {
    const welcomeSuggestions = suggestionPool
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const timer = setTimeout(() => {
      addMessage(
        "Hi! 👋 I'm Shvetha's AI assistant. Ask me about her projects, skills, experience, or just say hello!",
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
      /* Mic icon text for narrative -> We replaced it with image */
      <img src="/images/weui_voice-outlined.png" alt="Volume" className="w-5 h-5 opacity-70 invert" />
    );

  return (
    <div className="w-full max-w-[380px] h-[580px] bg-[#0d0d0d] border border-white/10 rounded-[28px] shadow-2xl flex flex-col overflow-hidden font-manrope">
      <style>{\`
        @keyframes micPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
            50% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
        }
        .mic-recording {
            animation: micPulse 1.2s ease-in-out infinite !important;
            background: rgba(239, 68, 68, 0.2) !important;
            color: #ef4444 !important;
            border-color: rgba(239, 68, 68, 0.3) !important;
        }
        
        @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .msg-animate {
            animation: fadeSlideIn 0.35s cubic-bezier(0.23,1,0.32,1) both;
        }
      \`}</style>
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
            className={\`msg-animate flex flex-col gap-1.5 max-w-[85%] \${msg.isUser ? 'self-end items-end' : 'self-start'}\`}
          >
            <div
              className={\`p-3.5 rounded-[18px] text-[13px] leading-[1.6] shadow-md \${
                msg.isUser
                  ? 'bg-white/10 text-white rounded-tr-none'
                  : 'bg-white/[0.03] border border-white/5 text-gray-300 rounded-tl-none'
              }\`}
              dangerouslySetInnerHTML={{ __html: msg.text.replace(/\\n/g, '<br>') }}
            >
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
            className="w-full bg-white/5 border border-white/5 rounded-full py-3 px-5 pr-24 text-[13px] text-white focus:outline-none focus:border-white/20 placeholder:text-gray-700 transition-all"
          />

          {/* Mic Button */}
          <button
            onClick={toggleMicInput}
            className={\`absolute right-12 top-1 w-10 h-10 flex items-center justify-center rounded-full transition-all border border-transparent \${
              isListening
                ? 'mic-recording'
                : 'text-gray-500 hover:bg-white/5 hover:text-white'
            }\`}
            title="Speak your question"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="19" x2="12" y2="23" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="8" y1="23" x2="16" y2="23" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={() => sendMessage()}
            className="absolute right-1 top-1 w-10 h-10 flex items-center justify-center bg-white/[0.05] rounded-full text-white/50 hover:bg-white/10 hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        
        {/* Mic status text */}
        <div 
          className="text-[10px] text-center mt-2 h-4 transition-all"
          style={{ color: micStatus.color || '#6b7280' }}
        >
          {micStatus.text}
        </div>
      </div>
    </div>
  );
});

export default AIChatbox;
`;

fs.writeFileSync('src/components/AIChatbox.tsx', newFile);
console.log('Successfully written AIChatbox.tsx');
