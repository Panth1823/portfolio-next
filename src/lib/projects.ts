export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  href: string;
  image: string | null;
  iconColor: string;
  iconImage?: string;
}

export const PROJECT_LIST: Project[] = [
  {
    title: "Project 1",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.",
    tags: ["2024", "Mobile Application"],
    href: "/projects/project-1",
    image: null,
    iconColor: "#e5e7eb",
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
  },
  {
    title: "Design Experiments",
    subtitle:
      "A collection of explorations across web, app, interaction and branding.",
    description:
      "Driven by curiosity and a desire to go beyond conventional design patterns. It captures my process of learning, testing ideas, and discovering what truly works.",
    tags: ["2024", "Branding", "UI Exploration"],
    href: "/projects/design-experiments",
    image: "/images/Design Experiments Cover.png",
    iconColor: "#e5e7eb",
    iconImage:
      "/images/Project card icons/Project card icons/Design Experiments.png",
  },
];
