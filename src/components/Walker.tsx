"use client";

import { useEffect, useState, useCallback } from "react";
import {
  motion,
  MotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

interface WalkerProps {
  progress: MotionValue<number>;
}

// Frame set configurations per color variant
const FRAME_SETS: Record<
  string,
  {
    dir: string;
    walkFrames: number;
    standFrame: number;
    ext: (i: number) => string;
  }
> = {
  white: {
    dir: "/images/Girl Animation/1 White/",
    walkFrames: 42,
    standFrame: 42,
    ext: () => "png",
  },
  mint: {
    dir: "/images/Girl Animation/2 Mint Green/",
    walkFrames: 42,
    standFrame: 42,
    ext: () => "png",
  },
  brown: {
    dir: "/images/Girl Animation/3 Brown/",
    walkFrames: 42,
    standFrame: 42,
    ext: () => "png",
  },
  blue: {
    dir: "/images/Girl Animation/5 Indigo/",
    walkFrames: 42,
    standFrame: 42,
    ext: () => "png",
  },
  indigo: {
    dir: "/images/Girl Animation/4 Blue/",
    walkFrames: 42,
    standFrame: 42,
    ext: () => "png",
  },
  dark: {
    dir: "/images/Girl Animation/6 Dark/",
    walkFrames: 42,
    standFrame: 42,
    ext: () => "png",
  },
};

// Map theme index → frame set key
// 0=white, 1=mint, 2=brown, 3=indigo, 4=blue, 5=dark
const THEME_TO_FRAMESET: Record<number, string> = {
  0: "white",
  1: "mint",
  2: "brown",
  3: "indigo",
  4: "blue",
  5: "dark",
};

// Trail color per frame set
const TRAIL_COLORS: Record<string, { gradient: string; glow: string }> = {
  white: {
    gradient:
      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.005) 20%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.08) 80%, rgba(255,255,255,0.22) 100%)",
    glow: "radial-gradient(ellipse at right center, rgba(255,255,255,0.12) 0%, transparent 70%)",
  },
  mint: {
    gradient:
      "linear-gradient(90deg, transparent 0%, rgba(52,211,153,0.005) 20%, rgba(52,211,153,0.02) 50%, rgba(52,211,153,0.08) 80%, rgba(52,211,153,0.22) 100%)",
    glow: "radial-gradient(ellipse at right center, rgba(52,211,153,0.12) 0%, transparent 70%)",
  },
  brown: {
    gradient:
      "linear-gradient(90deg, transparent 0%, rgba(217,119,6,0.005) 20%, rgba(217,119,6,0.02) 50%, rgba(217,119,6,0.08) 80%, rgba(217,119,6,0.22) 100%)",
    glow: "radial-gradient(ellipse at right center, rgba(217,119,6,0.12) 0%, transparent 70%)",
  },
  blue: {
    gradient:
      "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.005) 20%, rgba(56,189,248,0.02) 50%, rgba(56,189,248,0.08) 80%, rgba(56,189,248,0.22) 100%)",
    glow: "radial-gradient(ellipse at right center, rgba(56,189,248,0.12) 0%, transparent 70%)",
  },
  indigo: {
    gradient:
      "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.005) 20%, rgba(99,102,241,0.02) 50%, rgba(99,102,241,0.08) 80%, rgba(99,102,241,0.22) 100%)",
    glow: "radial-gradient(ellipse at right center, rgba(99,102,241,0.12) 0%, transparent 70%)",
  },
  dark: {
    gradient:
      "linear-gradient(90deg, transparent 0%, rgba(200,255,0,0.005) 20%, rgba(200,255,0,0.02) 50%, rgba(200,255,0,0.08) 80%, rgba(200,255,0,0.22) 100%)",
    glow: "radial-gradient(ellipse at right center, rgba(200,255,0,0.1) 0%, transparent 70%)",
  },
};

function getThemeIndex(): number {
  if (typeof window === "undefined") return 5;
  const saved = localStorage.getItem("projectThemeIndex");
  if (saved !== null && !isNaN(parseInt(saved))) return parseInt(saved);
  return 5;
}

export default function Walker({ progress }: WalkerProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1000);
  const [frameSetKey, setFrameSetKey] = useState<string>("dark");

  const frameSet = FRAME_SETS[frameSetKey];

  // Sync frame set with theme index
  const syncTheme = useCallback(() => {
    const idx = getThemeIndex();
    setFrameSetKey(THEME_TO_FRAMESET[idx] ?? "green");
  }, []);

  useEffect(() => {
    syncTheme();

    // Preload both frame sets
    Object.values(FRAME_SETS).forEach(({ dir, standFrame, ext }) => {
      for (let i = 0; i <= standFrame; i++) {
        const img = new Image();
        img.src = `${dir}${i}.${ext(i)}`;
      }
    });

    setWindowWidth(window.innerWidth);

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 200);
    };

    // Listen for theme changes from ThemeDock
    const handleThemeChange = () => syncTheme();
    document.addEventListener("themeIndexChanged", handleThemeChange);
    window.addEventListener("storage", handleThemeChange);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("themeIndexChanged", handleThemeChange);
      window.removeEventListener("storage", handleThemeChange);
      window.removeEventListener("resize", handleResize);
    };
  }, [syncTheme]);

  // Frame selection logic based on scroll progress
  useMotionValueEvent(progress, "change", (latest) => {
    if (latest >= 0.93) {
      setFrameIndex(frameSet.standFrame);
    } else {
      const frame = Math.min(
        Math.floor((latest / 0.93) * frameSet.walkFrames),
        frameSet.walkFrames - 1,
      );
      setFrameIndex(frame);
    }
  });

  // X position mapped across progress [0, 1]
  const endXValue = windowWidth - 10;
  const x = useTransform(progress, [0, 0.93, 1], [0, endXValue, endXValue]);

  // Subtle scale bounces at 0.18, 0.5, 0.78
  const scaleX = useTransform(
    progress,
    [0, 0.17, 0.18, 0.24, 0.49, 0.5, 0.56, 0.77, 0.78, 0.84, 1],
    [1, 1, 1.06, 1, 1, 1.06, 1, 1, 1.06, 1, 1],
  );
  const scaleY = useTransform(
    progress,
    [0, 0.17, 0.18, 0.24, 0.49, 0.5, 0.56, 0.77, 0.78, 0.84, 1],
    [1, 1, 0.96, 1, 1, 0.96, 1, 1, 0.96, 1, 1],
  );

  // Trail width follows the walker
  const trailWidth = useTransform(
    progress,
    [0, 0.93, 1],
    [0, endXValue + 80, endXValue + 80],
  );

  const trailColors = TRAIL_COLORS[frameSetKey] ?? TRAIL_COLORS.green;
  const frameSrc = `${frameSet.dir}${frameIndex}.${frameSet.ext(frameIndex)}`;
  const isStandFrame = frameIndex === frameSet.standFrame;

  return (
    <>
      {/* Gradient trailing line — anchored at left, width follows the walker */}
      <motion.div
        style={{ width: trailWidth }}
        className="absolute bottom-[30px] left-0 h-[1px] z-[5] max-sm:bottom-[20px]"
      >
        <div
          className="w-full h-full transition-all duration-700"
          style={{ background: trailColors.gradient }}
        />
        {/* Soft glow at the leading edge */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[80px] h-[10px] max-sm:w-[40px] max-sm:h-[6px] transition-all duration-700"
          style={{ background: trailColors.glow }}
        />
      </motion.div>

      {/* Walker character */}
      <motion.div
        style={{ x, scaleX, scaleY }}
        className="absolute bottom-[30px] -left-[180px] z-10 w-[200px] h-[420px] origin-bottom max-md:w-[150px] max-md:h-[320px] max-sm:w-[100px] max-sm:h-[220px] max-sm:bottom-[20px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frameSrc}
          alt="Walking character"
          className="w-full h-full object-contain object-bottom mix-blend-screen"
          style={{
            transform: isStandFrame ? "scale(1.6)" : "scale(1)",
            transformOrigin: "bottom center"
          }}
        />
      </motion.div>
    </>
  );
}
