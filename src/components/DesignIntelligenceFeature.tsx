import { motion } from "framer-motion";
import Image from "next/image";

interface Tag {
  label: string;
  color: "red" | "orange" | "yellow" | "green";
}

interface FeatureSectionProps {
  tag: string;
  title: string;
  highlightText: string;
  description?: string;
  tags?: Tag[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

const tagColorMap: Record<string, string> = {
  red: "bg-tag-red/15 text-tag-red",
  orange: "bg-tag-orange/15 text-tag-orange",
  yellow: "bg-tag-yellow/15 text-tag-yellow",
  green: "bg-accent/15 text-accent",
};

const tagBgMap: Record<string, string> = {
  red: "bg-tag-red/20 text-tag-red",
  orange: "bg-tag-orange/20 text-tag-orange",
  yellow: "bg-tag-yellow/20 text-tag-yellow",
  green: "bg-accent/20 text-accent",
};

const FeatureSection = ({
  tag,
  title,
  highlightText,
  description,
  tags,
  image,
  imageAlt,
}: FeatureSectionProps) => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Tag pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium ${tagColorMap[tags?.[0]?.color || "green"]}`}>
            {tag}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-muted-foreground text-lg md:text-xl">{title}</p>
          <p className="text-accent text-lg md:text-xl font-medium">{highlightText}</p>
        </motion.div>

        {/* Optional tags row */}
        {tags && tags.length > 1 && (
          <motion.div
            className="mt-6 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {tags.map((t) => (
              <span
                key={t.label}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:brightness-125 ${tagBgMap[t.color]}`}
              >
                {t.label}
              </span>
            ))}
          </motion.div>
        )}

        {description && (
          <motion.p
            className="mt-4 text-muted-foreground text-sm max-w-xl leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>
        )}

        {/* Image */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="group rounded-2xl border border-border overflow-hidden bg-card">
            <Image
              src={image}
              alt={imageAlt}
              width={1600}
              height={900}
              className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
