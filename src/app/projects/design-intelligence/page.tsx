"use client";

import Nav from "@/components/Nav";
import DesignIntelligenceHero from "@/components/DesignIntelligenceHero";
import FeatureSection from "@/components/DesignIntelligenceFeature";
import ProblemSection from "@/components/DesignIntelligenceProblem";
import featureConsistency from "../../../../public/images/feature-consistency.png";
import featureDetection from "../../../../public/images/feature-detection.png";
import featureFunctionality from "../../../../public/images/feature-functionality.png";
import featureGuidance from "../../../../public/images/feature-guidance.png";
import Footer from "@/components/Footer";

export default function DesignIntelligencePage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-32 px-6 sm:px-16">
        <DesignIntelligenceHero />
        <ProblemSection />
        <FeatureSection
          tag="Detection"
          title="Catch issues the moment they appear,"
          highlightText="not after the design is done."
          description="Real-time scanning highlights problems as you design, so nothing slips through."
          tags={[{ label: "Real-time", color: "red" }]}
          image={featureDetection.src}
          imageAlt="Feature detection interface"
        />
        <FeatureSection
          tag="Consistency"
          title="Keep your design system tight,"
          highlightText="across every screen and every component."
          description="Automatically flags spacing, color, and type inconsistencies before they compound."
          tags={[
            { label: "Spacing", color: "orange" },
            { label: "Color", color: "yellow" },
            { label: "Typography", color: "green" },
          ]}
          image={featureConsistency.src}
          imageAlt="Feature consistency checks"
          reverse={true}
        />
        <FeatureSection
          tag="Functionality"
          title="Designs that don't just look right,"
          highlightText="but actually work right."
          description="Checks interactions, flows, and component states so functional gaps are visible early."
          tags={[{ label: "Interactions", color: "green" }]}
          image={featureFunctionality.src}
          imageAlt="Feature functionality validation"
        />
        <FeatureSection
          tag="Guidance"
          title="Not just flagging problems,"
          highlightText="giving you the fix too."
          description="Each issue comes with context-aware suggestions so you spend less time guessing."
          tags={[{ label: "Suggestions", color: "yellow" }]}
          image={featureGuidance.src}
          imageAlt="Feature guidance and suggestions"
          reverse={true}
        />
        <Footer />
      </main>
    </>
  );
}
