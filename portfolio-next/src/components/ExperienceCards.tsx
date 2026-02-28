"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface CardProps {
  progress: MotionValue<number>;
  fadeInPos: number;
  activeStart: number;
  activeEnd: number;
  title: string;
  company: string;
  date: string;
  description: string;
  icon: React.ReactNode;
}

function ExperienceCard({
  progress,
  fadeInPos,
  activeStart,
  activeEnd,
  title,
  company,
  date,
  description,
  icon,
}: CardProps) {
  // Fade in animation mapped to a narrow band around fadeInPos
  const opacity = useTransform(progress, [fadeInPos - 0.05, fadeInPos], [0, 1]);

  const y = useTransform(progress, [fadeInPos - 0.05, fadeInPos], [22, 0]);

  // Active state color transition
  const titleColor = useTransform(
    progress,
    [activeStart - 0.01, activeStart, activeEnd, activeEnd + 0.01],
    ["#ffffff", "#c8ff00", "#c8ff00", "#ffffff"],
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="flex-1 max-w-[280px] max-sm:max-w-full"
    >
      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 transition-colors">
        {icon}
      </div>
      <div className="text-[11px] font-medium text-white/40 tracking-widest uppercase mb-2">
        {company}
      </div>
      <motion.div
        style={{ color: titleColor }}
        className="text-[26px] max-md:text-[20px] max-sm:text-[18px] font-bold leading-tight mb-2.5 transition-colors duration-300"
      >
        {title}
      </motion.div>
      <div className="text-[11px] font-medium text-white/40 tracking-wide mb-3">
        {date}
      </div>
      <p className="text-[13px] font-light leading-relaxed text-white/45 max-w-[230px]">
        {description}
      </p>
    </motion.div>
  );
}

export default function ExperienceCards({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  return (
    <div className="absolute bottom-[130px] left-[60px] right-[60px] flex justify-between gap-10 z-[5] max-md:left-[30px] max-md:right-[30px] max-md:gap-6 max-sm:flex-col max-sm:left-[24px] max-sm:right-[24px] max-sm:bottom-auto max-sm:top-[180px] max-sm:gap-7">
      <ExperienceCard
        progress={progress}
        fadeInPos={0.18}
        activeStart={0.18}
        activeEnd={0.5}
        title="UI Designer"
        company="Freelance"
        date="2022 – 2024"
        description="I've been commissioned to create custom websites, apps and identity systems."
        icon={
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-none stroke-white/80 stroke-[1.8] items-center"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        }
      />

      <ExperienceCard
        progress={progress}
        fadeInPos={0.48}
        activeStart={0.5}
        activeEnd={0.78}
        title="UX Intern"
        company="Mentorsity"
        date="2024 · Uttar Pradesh"
        description="Co-created wireframes and prototypes, driving a 40% increase in user engagement."
        icon={
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-none stroke-white/80 stroke-[1.8]"
          >
            <polyline points="2,20 9,9 14,15 17,11 22,20" />
            <line x1="2" y1="20" x2="22" y2="20" />
          </svg>
        }
      />

      <ExperienceCard
        progress={progress}
        fadeInPos={0.76}
        activeStart={0.78}
        activeEnd={1.1} // Stays active until end
        title="UX Designer"
        company="Koiostudio"
        date="2025 · Bangalore"
        description="As an early design hire, worked across brand and product design."
        icon={
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-none stroke-white/80 stroke-[1.8]"
          >
            <line x1="7" y1="4" x2="7" y2="20" />
            <polyline points="7,12 17,4" />
            <polyline points="7,12 17,20" />
          </svg>
        }
      />
    </div>
  );
}
