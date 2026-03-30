import { motion } from "framer-motion";
import { AlertCircle, Zap, Sparkles } from "lucide-react";

const steps = ["Design", "Open plugin", "Analyze", "Go back", "Fix", "Repeat"];

const devPoints = [
  "Developers have AI that…",
  "— writes code for them",
  "— find patterns for them",
  "— fix bugs instantly",
  "Figma has no equivalent AI for design quality.",
];

const designerPoints = [
  "But designers still…",
  "— Check every text manually",
  "— Try to remember where they used which",
  "  component. Default? Or something…",
  "— Need separate plugins for separate problems",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ProblemSection = () => {
  return (
    <section className="py-28 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-[11px] uppercase tracking-widest text-muted-foreground">
            The problem
          </span>

          <h2 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">
            Checking design quality isn&apos;t seamless
          </h2>
        </motion.div>

        {/* Pill Flow */}
        <motion.div
          className="mt-10 inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {steps.map((step, i) => (
            <span
              key={step}
              className="px-4 py-1.5 rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {step}
              {i < steps.length - 1 && (
                <span className="ml-3 text-muted-foreground/40">→</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <motion.div
            className="group relative rounded-2xl p-8 cursor-default overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, hsl(82 100% 54% / 0.12), hsl(120 60% 40% / 0.08))",
              boxShadow: "inset 0 1px 0 0 hsl(82 100% 54% / 0.1)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{
              boxShadow: "0 0 40px -10px hsl(82 100% 54% / 0.3), inset 0 1px 0 0 hsl(82 100% 54% / 0.1)",
            }}
          >
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
            <AlertCircle className="h-7 w-7 text-accent mb-5 relative z-10" />
            <h3 className="text-foreground font-semibold text-lg relative z-10">
              Every switch breaks focus
            </h3>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed relative z-10">
              Context switching between tools disrupts creative flow.
            </p>
          </motion.div>

          <motion.div
            className="group relative rounded-2xl p-8 cursor-default overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, hsl(82 100% 54% / 0.12), hsl(120 60% 40% / 0.08))",
              boxShadow: "inset 0 1px 0 0 hsl(82 100% 54% / 0.1)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{
              boxShadow: "0 0 40px -10px hsl(82 100% 54% / 0.3), inset 0 1px 0 0 hsl(82 100% 54% / 0.1)",
            }}
          >
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
            <Zap className="h-7 w-7 text-accent mb-5 relative z-10" />
            <h3 className="text-foreground font-semibold text-lg relative z-10">
              Every extra step slows us down
            </h3>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed relative z-10">
              Manual reviews add friction and delay delivery.
            </p>
          </motion.div>
        </div>

        {/* Dot indicators */}
        <div className="mt-10 flex items-center gap-4">
          <div className="h-2 w-2 rounded-full bg-accent" />
          <div className="h-2 w-2 rounded-full bg-tag-red" />
        </div>

        {/* Bottom callout */}
        <motion.div
          className="mt-16 max-w-xl rounded-2xl border border-accent/30 bg-card p-10 glow-green-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Sparkles className="h-6 w-6 text-accent mb-4" />
          <p className="text-accent text-base font-medium leading-relaxed">
            It&apos;s that they don&apos;t exist inside the workflow.
          </p>
        </motion.div>

        {/* --- Comparison / Missing Link --- */}
        <motion.div
          className="mt-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-[11px] uppercase tracking-widest text-muted-foreground">
            Missing link
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">
            Developers have AI.
            <br />
            Why don&apos;t designers?
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl">
          {/* Developers */}
          <motion.ul
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {devPoints.map((point, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className={`text-sm leading-relaxed ${
                  i === 0
                    ? "text-foreground font-semibold text-base"
                    : "text-muted-foreground"
                }`}
              >
                {i > 0 && (
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent mr-2.5 align-middle" />
                )}
                {point}
              </motion.li>
            ))}
          </motion.ul>

          {/* Designers */}
          <motion.ul
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {designerPoints.map((point, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className={`text-sm leading-relaxed ${
                  i === 0
                    ? "text-foreground font-semibold text-base"
                    : "text-muted-foreground"
                }`}
              >
                {i > 0 && (
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-tag-red mr-2.5 align-middle" />
                )}
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Bottom Box */}
        <motion.div
          className="mt-16 max-w-3xl rounded-2xl border border-accent/40 bg-card p-10"
          style={{
            boxShadow: "0 0 30px -5px hsl(82 100% 54% / 0.15)",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Sparkles className="h-5 w-5 text-accent mb-3" />
          <p className="text-accent text-base font-medium leading-relaxed">
            That&apos;s where the idea started.
            <br />
            To build this as a real-time assistant workflow.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
