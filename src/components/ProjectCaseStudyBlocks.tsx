import Image from "next/image";

type SectionHeadingProps = {
  title: string;
  className?: string;
  titleClassName?: string;
  lineClassName?: string;
};

export function SectionHeading({
  title,
  className = "",
  titleClassName = "",
  lineClassName = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2
        className={`text-[32px] md:text-[32px] font-medium mb-3 tracking-tight text-[var(--theme-text-hi)] ${titleClassName}`}
      >
        {title}
      </h2>
      <div
        className={`w-[50px] h-[3px] rounded-full bg-[var(--theme-accent)] ${lineClassName}`}
      />
    </div>
  );
}

type ConceptBlockProps = {
  title: string;
  description: string;
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
};

export function ConceptBlock({
  title,
  description,
  bullets,
  imageSrc,
  imageAlt,
}: ConceptBlockProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-11 gap-10 lg:gap-16 items-start">
      <div className="col-span-1 lg:col-span-11 xl:col-span-5 flex flex-col pt-1 h-auto xl:h-[260px] justify-between">
        <div>
          <h3 className="text-[22px] font-medium mb-6 tracking-tight text-[var(--theme-text-hi)]">
            {title}
          </h3>
          <p className="text-[16px] leading-[1.6] mb-6 text-[var(--theme-text-lo)]">
            {description}
          </p>
          <ul className="flex flex-col gap-3.5 pl-1">
            {bullets.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-[16px] leading-none text-[var(--theme-text-lo)]"
              >
                <div className="w-1.5 h-1.5 rounded-sm shrink-0 bg-[#FAFAFA]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-span-1 lg:col-span-11 xl:col-span-6 xl:pl-10 flex items-start justify-end">
        <div className="w-full xl:w-[408px] h-auto aspect-[4/3] xl:aspect-auto xl:h-[260px] border rounded-[24px] p-2 relative overflow-hidden bg-[var(--theme-surface)] border-[var(--theme-border)]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover rounded-[16px]"
          />
        </div>
      </div>
    </div>
  );
}

type MetricGridProps = {
  items: Array<[string, string]>;
  className?: string;
};

export function MetricGrid({ items, className = "" }: MetricGridProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-10 ${className}`}>
      {items.map(([value, label]) => (
        <div key={label} className="flex flex-col items-start">
          <span className="text-[36px] md:text-[44px] font-medium mb-3 leading-none text-[var(--theme-text-hi)]">
            {value}
          </span>
          <span className="text-[14px] font-medium tracking-wide uppercase opacity-80 text-[var(--theme-text-lo)]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

type TwoColumnBulletListProps = {
  leftItems: string[];
  rightItems: string[];
  className?: string;
};

export function TwoColumnBulletList({
  leftItems,
  rightItems,
  className = "",
}: TwoColumnBulletListProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 ${className}`}>
      <ul className="flex flex-col gap-6">
        {leftItems.map((item) => (
          <li
            key={item}
            className="flex items-start gap-4 text-[16px] leading-[1.65] text-[var(--theme-text-lo)]"
          >
            <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-[var(--theme-text-lo)] opacity-50" />
            {item}
          </li>
        ))}
      </ul>
      <ul className="flex flex-col gap-6">
        {rightItems.map((item) => (
          <li
            key={item}
            className="flex items-start gap-4 text-[16px] leading-[1.65] text-[var(--theme-text-lo)]"
          >
            <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-[var(--theme-text-lo)] opacity-50" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

type CheckerboardFrameProps = {
  label: string;
};

export function CheckerboardFrame({ label }: CheckerboardFrameProps) {
  return (
    <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#1A1A1A] border border-[#FAFAFA] rounded-[12px] p-[8px]">
      <div
        className="relative w-full h-full rounded-[4px] overflow-hidden border border-black/20 bg-white"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #e5e5e5 25%, transparent 25%), linear-gradient(-45deg, #e5e5e5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e5e5 75%), linear-gradient(-45deg, transparent 75%, #e5e5e5 75%)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0px",
          backgroundColor: "#fff",
        }}
        aria-label={label}
      />
    </div>
  );
}