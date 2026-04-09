import Image from "next/image";
import Link from "next/link";

const ALL_PROJECTS = [
  {
    name: "Portfolio strategy - portfolio Breakdown",
    href: "/projects/portfolio-strategy",
    img: "/images/portfolio-strategy.png",
  },
  {
    name: "Design Intelligence",
    href: "/projects/design-intelligence",
    img: "/images/Project 2 - Design Intelligence Case study Images/Summary - DI.png",
  },
  {
    name: "Budgeting App",
    href: "/projects/budgeting-app",
    img: "/images/Project 3 - Finance app Case Study Images/Summary - PW.png",
  },
  {
    name: "Design Experiments",
    href: "/projects/design-experiments",
    img: "/images/Design Experiments Cover.png",
  },
];

interface RelatedProjectsProps {
  currentProject: string;
}

export default function RelatedProjects({
  currentProject,
}: RelatedProjectsProps) {
  const relatedProjects = ALL_PROJECTS.filter((p) => p.name !== currentProject);

  return (
    <div className="w-full mt-32 border-t border-[var(--theme-border)] pt-20 pb-10">
      <h2 className="text-[32px] font-medium mb-10 tracking-tight text-[var(--theme-text-hi)]">
        Related Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProjects.map((proj) => (
          <Link
            key={proj.name}
            href={proj.href}
            className="flex flex-col gap-4 group"
          >
            <div className="w-full aspect-[4/3] rounded-[16px] overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-surface)] relative flex items-center justify-center group-hover:border-[var(--theme-accent)] transition-colors">
              {proj.img ? (
                <Image
                  src={proj.img}
                  alt={proj.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
                />
              ) : (
                <div className="absolute inset-0 pattern-dots pattern-gray-400 pattern-bg-transparent pattern-size-4 pattern-opacity-10 scale-150 mix-blend-overlay"></div>
              )}
            </div>
            <span className="text-[16px] font-medium text-[var(--theme-text-hi)]">
              {proj.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
