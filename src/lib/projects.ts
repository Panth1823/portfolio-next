export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  href: string;
  image: string | null;
  iconColor: string;
  iconImage?: string;
  quickBrief?: {
    role: string;
    duration: string;
    tools: string;
    category: string;
    points: string[];
  };
}

export const PROJECT_LIST: Project[] = [
  {
    title: "Portfolio Breakdown",
    subtitle: "Designing My Portfolio as a Product",
    description:
      "A self-initiated project focused on transforming my portfolio from a visual showcase into a strategic product that communicates design thinking, decision-making, and impact clearly to recruiters within seconds.",
    tags: ["2026", "Portfolio"],
    href: "/projects/portfolio-strategy",
    image: "/images/Portfolio Breakdown Project Images/Portfolio Breakdown Project Images/1 Summary - Portfolio.png",
    iconColor: "#e5e7eb",
    iconImage: "/images/Fav Icon/Fav Icon/Fav Icon 2.png",
    quickBrief: {
      role: "Product Designer",
      duration: "4 months",
      tools: "Figma, Perplexity",
      category: "Portfolio",
      points: [
        "Redesigned the portfolio as a product, not just a visual showcase",
        "Prioritized clarity, storytelling and scannability for recruiters",
        "Introduced AI Portfolio Assistant and Voice Brief as core concepts",
        "Structured experience surfaces key insights within seconds",
        "Outcome: 55% faster project understanding, 40% improved content clarity",
      ],
    },
  },
  {
    title: "Design Intelligence",
    subtitle: "Real-Time Design Review Inside Figma",
    description:
      "A product concept exploring how design review can be integrated directly into the design process instead of being treated as a separate step.",
    tags: ["2026", "Product Concept"],
    href: "/projects/design-intelligence",
    image:
      "/images/Project 2 - Design Intelligence Case study Images/Summary - DI.png",
    iconColor: "#F24E1E",
    iconImage:
      "/images/Project card icons/Project card icons/Design Intelligence.png",
    quickBrief: {
      role: "Product Designer",
      duration: "3 months",
      tools: "Figma, Perplexity",
      category: "Product Concept",
      points: [
        "Embedded real-time design review directly into the Figma workflow",
        "Detects spacing, contrast, accessibility and design-system deviations on the canvas",
        "Flags orphan screens and broken navigation flows automatically",
        "Eliminates the need to switch between design tools and review plugins",
        "Outcome: 55% faster issue detection, 50% higher consistency, 35% less rework",
      ],
    },
  },
  {
    title: "Budgeting App",
    subtitle: "Redefining How Students Make Financial Decisions",
    description:
      "Reimagined how student budgeting apps should work. Instead of overwhelming users with numbers, I focused on making money management simple and easy to understand.",
    tags: ["2025", "Mobile Application", "Fintech"],
    href: "/projects/budgeting-app",
    image: "/images/Project 3 - Finance app Case Study Images/Summary - PW.png",
    iconColor: "#14B8A6",
    iconImage:
      "/images/Project card icons/Project card icons/Budgeting app.png",
    quickBrief: {
      role: "Product Designer",
      duration: "2 months",
      tools: "Figma, FigJam",
      category: "Fintech",
      points: [
        "Redesigned student budgeting: shifted from data tracking to decision-first guidance",
        "Introduced AI-driven insights to replace static summaries and passive reports",
        "Simplified hierarchy — surfaced only what matters for quick financial actions",
        "Designed three core concepts: Guided Clarity, Decision-First UX, AI Assistance",
        "Outcome: 50% lower drop-offs, 40% faster decision making, 25% more engagement",
      ],
    },
  },
  {
    title: "Design Experiments",
    subtitle:
      "A collection of explorations across web, app, interaction and branding.",
    description:
      "Driven by curiosity and a desire to go beyond conventional design patterns. It captures my process of learning, testing ideas, and discovering what truly works.",
    tags: ["2024", "Branding", "UI Exploration"],
    href: "/projects/design-experiments",
    image: "/images/Design Experiments.png",
    iconColor: "#e5e7eb",
    iconImage:
      "/images/Project card icons/Project card icons/Design Experiments.png",
    quickBrief: {
      role: "Product Designer",
      duration: "Ongoing",
      tools: "Figma, After Effects",
      category: "Branding · UI Exploration",
      points: [
        "A collection of micro-interaction and UI explorations across 4 app concepts",
        "Yummy / Meal Steal — animated food ordering micro-interactions",
        "Good Morning Coffee — calm, minimal morning routine app exploration",
        "Pizza Party — playful interaction patterns for a food delivery concept",
        "Foam Wood Furniture — configurator UI with dynamic, hands-on feel",
      ],
    },
  },
];
