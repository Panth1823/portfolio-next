'use client';

import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { usePathname } from 'next/navigation';

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

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionErrorEventLike {
  error: string;
}

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

interface WindowWithSpeechRecognition extends Window {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
}

// ── Data ─────────────────────────────────────────────────────────────────────

const knowledgeBase: Record<string, { keywords: string[], weight?: number, responses: string[] }> = {

            // ── ABOUT / INTRODUCTION ──────────────────────────────────
            about: {
                keywords: ['who', 'about', 'tell me', 'introduce', 'shvetha', 'herself', 'yourself', 'background', 'bio', 'profile', 'describe'],
                weight: 1,
                responses: [
                    "Shvetha Senthilkumar is a Product Designer with 3+ years of experience. She combines her engineering background with user-centric design to build decision-first digital experiences.",
                    "She's a Product Designer who bridges engineering logic with design creativity — 3+ years of crafting simple, intuitive web and mobile experiences.",
                ]
            },

            // ── EXPERIENCE / YEARS ────────────────────────────────────
            experience: {
                keywords: ['experience', 'years', 'how long', 'career', 'journey', 'long have', 'been designing', 'time in design'],
                weight: 1,
                responses: [
                    "3+ years in Product Design. She's worked across freelance, internships, and full-time roles — driving results like a 40% increase in user engagement.",
                    "Over 3 years of design experience spanning UX research, UI design, and prototyping — with a unique edge from her engineering background.",
                ]
            },

            // ── CURRENT WORK / KOIOSTUDIO ─────────────────────────────
            work: {
                keywords: ['work', 'koiostudio', 'current', 'job', 'company', 'now', 'role', 'currently', 'working at', 'position', 'employ', 'where does she work'],
                weight: 1,
                responses: [
                    "Currently a UX Designer at Koiostudio (2025). She's an early design hire working across brand and product design.",
                    "She works at Koiostudio as a UX Designer — shaping both brand identity and product design as an early hire.",
                ]
            },

            // ── MENTORSITY / INTERNSHIP ────────────────────────────────
            internship: {
                keywords: ['mentorsity', 'intern', 'internship', 'first job', 'started', 'previous', 'past work', 'earlier'],
                weight: 1,
                responses: [
                    "She interned at Mentorsity as a UX designer, co-creating wireframes and prototypes that drove a 40% increase in user engagement.",
                    "At Mentorsity, she collaborated on wireframes and prototypes — achieving a measurable 40% boost in user engagement.",
                ]
            },

            // ── FREELANCE ─────────────────────────────────────────────
            freelance: {
                keywords: ['freelance', 'freelancing', 'independent', 'commissioned', 'client', 'contract', 'side projects'],
                weight: 1,
                responses: [
                    "Freelancing since 2022 — she's been commissioned for custom websites, apps, and identity systems across different industries.",
                    "She's taken on freelance work since 2022, creating websites, mobile apps, and brand identity systems for various clients.",
                ]
            },

            // ── ENGINEERING BACKGROUND ─────────────────────────────────
            engineering: {
                keywords: ['engineering', 'engineer', 'technical', 'transition', 'switched', 'tech background', 'degree', 'education', 'study', 'studied', 'college', 'university', 'qualification'],
                weight: 1,
                responses: [
                    "She has an engineering background — it's her superpower. She approaches design problems with both logic and creativity.",
                    "Transitioned from engineering to Product Design. Her analytical training helps her break down complex problems into intuitive solutions.",
                ]
            },

            // ── SKILLS / TOOLS ────────────────────────────────────────
            skills: {
                keywords: ['skill', 'tools', 'figma', 'figjam', 'software', 'tech stack', 'capabilities', 'expertise', 'proficient', 'specializ', 'good at', 'strengths'],
                weight: 1,
                responses: [
                    "Core tools: Figma & FigJam. Skills span UX Research, UI Design, Prototyping, and Wireframing — all focused on decision-first experiences.",
                    "Proficient in Figma and FigJam. Strengths include UX Research, Interaction Design, Information Architecture, and Visual Design.",
                ]
            },

            // ── DESIGN PROCESS ────────────────────────────────────────
            process: {
                keywords: ['process', 'approach', 'methodology', 'how does she design', 'workflow', 'design thinking', 'method', 'framework', 'philosophy', 'strategy'],
                weight: 1,
                responses: [
                    "Her 'Decision-First' approach: Research → Identify pain points → Design guided solutions → Test with users. Every design helps users take confident actions.",
                    "She starts with deep user research, then designs experiences that guide decisions rather than just presenting data. Reducing cognitive load is key.",
                ]
            },

            // ══════════════════════════════════════════════════════════
            // PROJECT: BUDGETING APP
            // ══════════════════════════════════════════════════════════

            budgeting_overview: {
                keywords: ['budgeting', 'finance', 'financial', 'money', 'budget app', 'fintech', 'student budget', 'spending', 'case study'],
                weight: 1.2,
                responses: [
                    "Her flagship case study — redesigned student budgeting from passive tracking to guided decision-making. Helps users understand spending and take confident financial actions.",
                    "The Budgeting App reimagines money management for students. Instead of overwhelming data, it guides toward clear financial choices.",
                ]
            },

            budgeting_problem: {
                keywords: ['problem', 'challenge', 'issue', 'pain point', 'information overload', 'cognitive', 'overwhelm', 'confus', 'frustrat', 'struggle'],
                weight: 1,
                responses: [
                    "Three core problems: Information Overload (too many charts), Lack of Direction (data without actions), and High Cognitive Effort (leading to drop-offs).",
                    "Users had data but no clarity. They couldn't answer simple questions like 'Can I afford this?' or 'What should I cut?'",
                ]
            },

            budgeting_solution: {
                keywords: ['solution', 'decision first', 'redesign', 'guided', 'how did she solve', 'approach to', 'design concept'],
                weight: 1,
                responses: [
                    "Three pillars: Guided Financial Decisions, Decision-First Experience, and AI-Driven Guidance. Shifted from 'here's your data' to 'here's what to do.'",
                    "Simplified the interface, prioritized key metrics, added real-time feedback, and introduced AI insights for contextual recommendations.",
                ]
            },

            budgeting_impact: {
                keywords: ['impact', 'result', 'outcome', 'metric', 'stats', 'numbers', 'engagement', 'improvement', 'success', 'achievement', '40%', '35%', '50%', '25%'],
                weight: 1,
                responses: [
                    "40% faster insights · 35% smarter spending · 50% lower drop-offs · 25% more engagement. Users felt confident making financial decisions.",
                    "Key results: 40% faster insights, 35% better spending decisions, 50% fewer drop-offs, and 25% higher engagement.",
                ]
            },

            budgeting_research: {
                keywords: ['research', 'user research', 'users', 'target', 'audience', 'persona', 'who are the users', 'solving for', 'testing', 'test', 'validate', 'interview'],
                weight: 1,
                responses: [
                    "Target users: students and early professionals with limited budgets who need quick, clear insights — not complex dashboards.",
                    "Focused on how users interpret financial data. Testing validated that the decision-first approach made users feel more in control.",
                ]
            },

            budgeting_details: {
                keywords: ['duration', 'timeline', 'how long did', 'category', 'app concept', 'mobile', 'role in the project'],
                weight: 0.8,
                responses: [
                    "Role: Product Designer · Duration: 2 months · Tools: Figma, FigJam · Category: Fintech Mobile App Concept (2024–2025).",
                ]
            },

            // ══════════════════════════════════════════════════════════
            // PROJECT: DESIGN INTELLIGENCE
            // ══════════════════════════════════════════════════════════

            design_intelligence: {
                keywords: ['design intelligence', 'design review', 'figma plugin', 'real-time review', 'review inside figma', 'product concept'],
                weight: 1.2,
                responses: [
                    "A 2026 product concept — real-time design review integrated directly inside Figma, instead of treating review as a separate step.",
                    "Design Intelligence embeds review into the design workflow within Figma. No more context-switching for feedback.",
                ]
            },

            // ══════════════════════════════════════════════════════════
            // PROJECT: DESIGN EXPERIMENTS
            // ══════════════════════════════════════════════════════════

            design_experiments: {
                keywords: ['experiment', 'exploration', 'packaging', 'branding', 'identity', 'crunch', 'jamora', 'brew', 'scentaura', 'radiante', 'curiosity', 'visual design', 'brand design'],
                weight: 1,
                responses: [
                    "A collection of explorations in packaging (Crunch, Brew), branding (Jamora, Scentaura, Radiante), and UI design — driven by curiosity.",
                    "Design experiments across product, brand, and visual design. Each project pushed her into new creative territory beyond core product work.",
                ]
            },

            // ══════════════════════════════════════════════════════════
            // OTHER PROJECTS
            // ══════════════════════════════════════════════════════════

            other_projects: {
                keywords: ['other project', 'design system', 'restaurant', 'booking', '3d scroll', 'analytics', 'all projects', 'portfolio projects', 'list projects', 'what projects'],
                weight: 1,
                responses: [
                    "Projects include: Budgeting App, Design Intelligence, Design Experiments, Koiostudio Design System, 3D Portfolio, Restaurant Booking App, and SaaS Dashboard.",
                    "Her portfolio spans fintech, branding, design systems, and more — from the flagship Budgeting App to creative packaging experiments.",
                ]
            },

            // ══════════════════════════════════════════════════════════
            // CONTACT / HIRE
            // ══════════════════════════════════════════════════════════

            contact: {
                keywords: ['contact', 'email', 'reach', 'hire', 'connect', 'work together', 'collaborate', 'get in touch', 'social', 'linkedin', 'instagram', 'behance', 'available', 'open to'],
                weight: 1,
                responses: [
                    "📧 shvethanila@gmail.com — also on LinkedIn, Instagram, and Behance. She's always open to collaborations!",
                    "Reach her at shvethanila@gmail.com or connect on LinkedIn, Instagram, and Behance. She'd love to hear from you!",
                ]
            },

            // ── RESUME ────────────────────────────────────────────────
            resume: {
                keywords: ['resume', 'cv', 'download', 'portfolio pdf'],
                weight: 1,
                responses: [
                    "You can view Shvetha's resume directly on the Navigation bar. There's a 'Resume' link in the navigation that lets you download her full CV as a PDF."
                ],
            },

            // ── LOCATION ──────────────────────────────────────────────
            location: {
                keywords: ['location', 'where', 'based', 'city', 'country', 'live', 'from', 'remote'],
                weight: 0.8,
                responses: [
                    "Based in Tamil Nadu, India — currently working in Bangalore. She's comfortable working remotely across time zones.",
                    "She's from Tamil Nadu, India and works in Bangalore. Open to remote collaborations globally.",
                ]
            },

            // ── AI ASSISTANT (META) ───────────────────────────────────
            ai_self: {
                keywords: ['who are you', 'what are you', 'ai assistant', 'bot', 'chatbot', 'what can you do', 'help me', 'capabilities'],
                weight: 1,
                responses: [
                    "I'm Shvetha's AI portfolio assistant! 🤖 Ask me about her projects, experience, skills, design process, or how to contact her.",
                    "I'm a guide to Shvetha's portfolio — I know her projects, skills, and work history. Ask me anything!",
                ]
            },

            // ── GREETINGS ─────────────────────────────────────────────
            greeting: {
                keywords: ['hi', 'hello', 'hey', 'sup', 'good morning', 'good evening', 'good afternoon', 'howdy', 'greetings', 'hola', 'namaste', 'what\'s up'],
                weight: 0.6,
                responses: [
                    "Hello! 👋 What would you like to explore — her projects, experience, or design process?",
                    "Hey there! Ask me about Shvetha's case studies, skills, or anything in her portfolio.",
                    "Hi! 😊 I can tell you about her work, projects, or how to connect. What interests you?",
                ]
            },

            // ── THANKS / FAREWELL ─────────────────────────────────────
            thanks: {
                keywords: ['thank', 'thanks', 'bye', 'goodbye', 'see you', 'appreciate', 'helpful', 'great', 'awesome', 'nice', 'cool'],
                weight: 0.5,
                responses: [
                    "You're welcome! 😊 Reach Shvetha at shvethanila@gmail.com if you'd like to connect!",
                    "Happy to help! She's just an email away at shvethanila@gmail.com ✨",
                    "Glad I could help! Feel free to come back anytime. 🙌",
                ]
            },

            // ── UX / UI DESIGN CONCEPTS ───────────────────────────────
            ux_concepts: {
                keywords: ['ux', 'user experience', 'ui', 'user interface', 'interaction', 'wireframe', 'prototype', 'usability', 'accessibility', 'information architecture', 'heuristic'],
                weight: 0.9,
                responses: [
                    "Her 'Decision-First Design' approach: interfaces that guide actions, not just present data. Skilled in UX research, wireframing, prototyping, and usability testing.",
                    "She covers the full UX/UI spectrum — from information architecture to hi-fi prototypes. Every component serves a clear purpose.",
                ]
            },

            // ── DESIGN SYSTEMS ────────────────────────────────────────
            design_system: {
                keywords: ['design system', 'component', 'token', 'library', 'scalable', 'consistency', 'koiostudio system'],
                weight: 1,
                responses: [
                    "She built the Koiostudio Design System (2025) — a component library with design tokens ensuring consistency across all their products.",
                    "The Koiostudio Design System is a comprehensive component library and token system. It shows her ability to think in systems, not just screens.",
                ]
            },

            // ── DEFAULT / CATCH-ALL ───────────────────────────────────
            default: {
                keywords: [],
                weight: 0,
                responses: [
                    "I can help with her projects, experience, skills, design process, or contact info. What would you like to know?",
                    "Try asking about her Budgeting App, skills, work experience, or how to reach her!",
                    "I'm best at answering about her projects, background, tools, or contact details. What interests you? 😊",
                ]
            }
        };
;

const suggestionPool: Suggestion[] = [
            { label: '💼 Work Experience', value: 'What is her work experience?' },
            { label: '📱 Budgeting App', value: 'Tell me about the Budgeting App' },
            { label: '🎨 Design Skills', value: 'What are her skills?' },
            { label: '🧠 Design Process', value: 'What is her design process?' },
            { label: '🧪 Design Experiments', value: 'What are her design experiments?' },
            { label: '📊 Case Study Results', value: 'What were the budgeting app results?' },
            { label: '🔍 User Research', value: 'How did she conduct user research?' },
            { label: '⚡ Problem Solved', value: 'What problem does the budgeting app solve?' },
            { label: '🎓 Engineering Background', value: 'Tell me about her engineering background' },
            { label: '📬 Contact Her', value: 'How can I contact Shvetha?' },
            { label: '🖥️ All Projects', value: 'What projects does she have?' },
            { label: '🏢 Koiostudio', value: 'What does she do at Koiostudio?' },
            { label: '📋 Mentorsity', value: 'Tell me about Mentorsity' },
            { label: '🎯 Design Intelligence', value: 'What is Design Intelligence?' },
            { label: '🎨 Design System', value: 'Tell me about the Design System' },
            { label: '💡 Freelance Work', value: 'Tell me about her freelance work' },
            { label: '📍 Location', value: 'Where is she based?' },
        ];;

const PROJECT_NARRATIVES: Record<string, string> = {
  '/projects/portfolio-strategy':
    "Hi, I'm Shvetha's AI assistant. I'll walk you through this project. This project explores a simple idea. What if a portfolio could guide you, instead of just showing content? Most portfolios are static. You scroll, read, and try to figure things out on your own. So this experience was designed to feel more interactive and supportive, almost like the portfolio is having a conversation with you. One of the key features is the AI chatbot. Instead of searching through pages, you can simply ask questions like Who is Shvetha? or How many years of experience does she have? and get instant answers. You can either type or speak, whichever feels more natural in the moment. There's also a quick voice brief, which gives you a short, conversational overview of a project, so you don't have to read everything to understand it. Another feature is adaptive contrast. You can switch between different color themes designed for better accessibility and comfort, so you can choose what works best for your eyes. There's also a signature journey section, which highlights key moments and decisions in a more memorable way, so instead of just seeing the work, you actually remember the story behind it. All of this is designed to reduce effort. You don't have to search, guess, or spend too much time figuring things out, the portfolio gently guides you as you explore. The goal is simple, to make the experience easy to navigate, easy to understand, and memorable. Or simply put, from just viewing a portfolio to actually experiencing it. I'll let the interface take it from here, explore the screens below and try it out yourself.",
  '/projects/design-intelligence':
    "Hi, I'm Shvetha's AI assistant. I'll walk you through this project. This project explores a simple but powerful idea. What if design tools could actually think alongside designers? Today, most tools are reactive. You design first and only later notice issues through plugins or reviews. That pause breaks your flow. So Design Intelligence was designed to work with you in real-time, almost like a second pair of eyes while you design. As you're working, the system continuously scans your design. For example, if you pick a text color with low contrast, instead of waiting for an accessibility check later, it instantly highlights it and says something like, This text may be hard to read, try increasing contrast, and even suggests a better color you can apply in one click. Or if your spacing is slightly off between elements, it gently points it out and offers to auto-align it, so you don't have to manually fix every small inconsistency. It also understands context. If you're designing a button, it can suggest improving padding, hierarchy, or even label clarity based on common UX patterns. The key here is that it doesn't interrupt you. There are no disruptive pop-ups, just subtle, inline suggestions that feel like a quiet nudge when you need it. Some of the core features include real-time issue detection as you design, context-aware suggestions based on the component you're working on, one-click fixes for things like contrast, spacing, and alignment, and adaptive feedback that improves as your design evolves. So instead of stopping to check your work later, you're improving it while you create. The goal is simple, to help you stay in flow, make better decisions faster, and feel more confident in what you're designing. At its core, this shifts design tools from something you use to something that actually supports you. Or simply put, from designing alone to designing with a smart partner. I'll let the visuals take it from here, explore the screens below to see how this works in action.",
  '/projects/budgeting-app':
    "Hi, I'm Shvetha's AI assistant. I'll walk you through this project. This project started with a simple thought. What if budgeting didn't just show numbers, but actually guided you? Most budgeting apps today feel passive. You add expenses, you see charts, but you're still left wondering, Okay, what should I do now? So this app was designed to act more like a smart companion, one that actively helps you make better financial decisions. As you use the app, AI suggestions are integrated throughout the experience, not as a separate feature, but as something that quietly supports you at every step. For example, if your food spending suddenly increases, the app doesn't just show a spike. It tells you something like, You've spent 30% more on food this week compared to last week. Want to set a limit? If you're close to exceeding your budget, it nudges you with a simple suggestion like, You're nearing your monthly limit, consider reducing non-essential spending. Even while adding an expense, the app can auto-categorise it and suggest smarter labels, saving time and effort. The idea is to remove the need for users to constantly analyse their own data. Instead, the app does the thinking and gives clear, actionable insights. Some of the key features include AI-powered suggestions across the entire app, smart alerts based on real spending behaviour, automatic categorisation of expenses, visual dashboards that highlight what actually matters, and timely nudges that help users adjust before it's too late. The focus is on making budgeting feel less like a responsibility and more like a guided experience. The goal is not just to track money, but to help users make smarter decisions without overthinking. At its core, this project shifts budgeting from a passive tracking tool to an active, intelligent guide. Or simply put, from What did I spend? to What should I do next? I'll let the visuals take it from here, explore the screens below to see how these suggestions come to life.",
  '/projects/design-experiments':
    "Hi, I'm Shvetha's AI assistant. I'll walk you through this project. This one's a little different. It's not a single project, but a collection of design explorations. You'll see a mix of business cards, logos, micro interactions, websites, apps, posters, and more. Each of these started as a simple idea or curiosity, just trying things out, exploring styles, and seeing what works. There's no fixed goal here, just a space to experiment, learn, and grow through design. Over time, these small explorations come together and help build a stronger design perspective. Or simply put, designing freely and learning along the way. I'll let the visuals take it from here, take a look below and explore the work.",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function analyzeQuery(query: string): string {
            const lowerQuery = query.toLowerCase().trim();
            const queryWords = lowerQuery.split(/\s+/);
            let bestCategory = null;
            let bestScore = 0;

            for (const [categoryName, categoryData] of Object.entries(knowledgeBase)) {
                if (categoryName === 'default') continue;

                let score = 0;
                const keywords = categoryData.keywords;
                const weight = categoryData.weight || 1;

                for (const keyword of keywords) {
                    const lowerKeyword = keyword.toLowerCase();

                    // Exact phrase match (highest priority)
                    if (lowerQuery.includes(lowerKeyword)) {
                        const wordCount = lowerKeyword.split(/\s+/).length;
                        score += (2 + wordCount) * weight;
                    }

                    // Partial / fuzzy word match
                    for (const word of queryWords) {
                        if (word.length >= 3 && lowerKeyword.includes(word)) {
                            score += 1 * weight;
                        }
                        if (lowerKeyword.length >= 3 && word.includes(lowerKeyword)) {
                            score += 0.8 * weight;
                        }
                    }
                }

                if (score > bestScore) {
                    bestScore = score;
                    bestCategory = categoryName;
                }
            }

            return bestScore > 0 && bestCategory ? bestCategory : 'default';}

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
  const pathname = usePathname();
  const normalizedPathname = pathname?.replace(/\/$/, '') ?? '';
  const projectNarrative = PROJECT_NARRATIVES[normalizedPathname] ?? '';

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
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

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
    if (!projectNarrative) {
      addMessage('Quick Brief is available on individual project pages only.');
      return;
    }

    if (utteranceRef.current) {
      utteranceRef.current.onend = null;
      utteranceRef.current.onerror = null;
    }
    window.speechSynthesis.cancel();

    setTimeout(() => {
      const utt = new SpeechSynthesisUtterance(projectNarrative);
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
  }, [projectNarrative, getFemaleVoice, addMessage, setAndNotifyVoiceState]);

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
    const speechWindow = window as WindowWithSpeechRecognition;
    const SpeechRecognitionCtor =
      speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      console.warn('Speech Recognition not supported in this browser.');
      return false;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setMicStatus({ text: '🎤 Listening... speak now', color: '#ef4444' });
    };

    recognition.onresult = (event: SpeechRecognitionEventLike) => {
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

    recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
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

  return (
    <div className="w-full max-w-[380px] h-[580px] bg-[var(--theme-bg)] border border-[var(--theme-border)] rounded-[28px] shadow-2xl flex flex-col overflow-hidden font-manrope">
      <style>{`
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
      `}</style>
      {/* Header */}
      <div className="p-6 border-b border-[var(--theme-border)] bg-[var(--theme-surface)] flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--theme-bg)] border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-lo)] font-bold text-lg">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-[var(--theme-text-hi)] font-bold text-[15px]">Shvetha&apos;s AI</span>
            <span className="text-[10px] text-[var(--theme-text-lo)] font-medium tracking-wide uppercase opacity-90">
              Portfolio Assistant
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--theme-bg)] text-[var(--theme-text-lo)] hover:text-[var(--theme-text-hi)] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow p-6 overflow-y-auto flex flex-col gap-5 scrollbar-thin scrollbar-thumb-[var(--theme-border)] scrollbar-track-transparent">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`msg-animate flex flex-col gap-1.5 max-w-[85%] ${msg.isUser ? 'self-end items-end' : 'self-start'}`}
          >
            <div
              className={`p-3.5 rounded-[18px] text-[13px] leading-[1.6] shadow-md ${
                msg.isUser
                  ? 'bg-[var(--theme-surface)] border border-[var(--theme-accent)] text-[var(--theme-text-hi)] rounded-tr-none'
                  : 'bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-text-mid)] rounded-tl-none'
              }`}
              dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br>') }}
            >
            </div>
            {!msg.isUser && msg.suggestions && (
              <div className="flex flex-wrap gap-2 mt-2">
                {msg.suggestions.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => sendMessage(s.value)}
                    className="px-3 py-1.5 rounded-full border border-[var(--theme-border)] bg-[var(--theme-bg)] text-[11px] text-[var(--theme-text-lo)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-text-hi)] transition-all text-left"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
            <span className="text-[9px] text-[var(--theme-text-lo)] font-medium px-1 mt-1 opacity-80">
              {msg.isUser ? 'You · Just now' : 'AI · Just now'}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex self-start p-3 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-full px-5 text-[var(--theme-text-lo)] text-[11px] animate-pulse">
            thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-5 bg-[var(--theme-surface)] border-t border-[var(--theme-border)]">
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type or Tap to speak..."
            className="w-full bg-[var(--theme-bg)] border border-[var(--theme-border)] rounded-full py-3 px-5 pr-24 text-[13px] text-[var(--theme-text-hi)] focus:outline-none focus:border-[var(--theme-accent)] placeholder:text-[var(--theme-text-lo)] transition-all"
          />

          {/* Mic Button */}
          <button
            onClick={toggleMicInput}
            className={`absolute right-12 inset-y-0 my-auto w-10 h-10 flex items-center justify-center rounded-full transition-all border border-transparent ${
              isListening
                ? 'mic-recording'
                : 'text-[var(--theme-text-lo)] hover:bg-[var(--theme-bg)] hover:text-[var(--theme-text-hi)]'
            }`}
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
            className="absolute right-1 inset-y-0 my-auto w-10 h-10 flex items-center justify-center bg-[var(--theme-bg)] border border-[var(--theme-border)] rounded-full text-[var(--theme-text-lo)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-text-hi)] transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        
        {/* Mic status text */}
        <div 
          className="text-[10px] text-center mt-2 h-4 transition-all"
          style={{ color: micStatus.color || 'var(--theme-text-lo)' }}
        >
          {micStatus.text}
        </div>
      </div>
    </div>
  );
});

export default AIChatbox;
