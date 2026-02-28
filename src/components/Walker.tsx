"use client";

import { useEffect, useState } from "react";
import {
  motion,
  MotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

interface WalkerProps {
  progress: MotionValue<number>;
}

const WALK_FRAMES = 42;
const STAND_FRAME = 42;
const FRAMES_DIR = "/frames/";

export default function Walker({ progress }: WalkerProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1000); // Decent default

  useEffect(() => {
    // Preload frames
    for (let i = 0; i <= STAND_FRAME; i++) {
      const img = new Image();
      img.src = `${FRAMES_DIR}${i}.png`;
    }

    setWindowWidth(window.innerWidth);

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Frame selection logic based on scroll progress
  useMotionValueEvent(progress, "change", (latest) => {
    if (latest >= 0.93) {
      setFrameIndex(STAND_FRAME);
    } else {
      const frame = Math.min(
        Math.floor((latest / 0.93) * WALK_FRAMES),
        WALK_FRAMES - 1,
      );
      setFrameIndex(frame);
    }
  });

  // X position mapped across progress [0, 1]
  // Originally: x = () => endX() + 180 = window.innerWidth - 160 + 180 = window.innerWidth + 20
  // Starts left -180px so it enters the screen.
  const endXValue = windowWidth + 60; // Just slightly past right edge

  const x = useTransform(progress, [0, 1], [0, endXValue]);

  // Subtle scale bounces at 0.18, 0.5, 0.78
  // Each sequence is: base(1) -> arrive(1.06) -> leave(1)
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

  // Trail width follows the walker's x position (offset by ~100px for center of character)
  const trailWidth = useTransform(progress, [0, 1], [0, endXValue + 100]);

  return (
    <>
      {/* Gradient trailing line — anchored at left, width follows the walker */}
      <motion.div
        style={{ width: trailWidth }}
        className="absolute bottom-[30px] left-0 h-[2px] z-[5] max-sm:bottom-[20px]"
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(200,255,0,0.03) 20%, rgba(200,255,0,0.1) 50%, rgba(200,255,0,0.4) 80%, #c8ff00 100%)",
          }}
        />
        {/* Soft glow at the leading edge */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[120px] h-[16px] max-sm:w-[60px] max-sm:h-[10px]"
          style={{
            background:
              "radial-gradient(ellipse at right center, rgba(200,255,0,0.2) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Walker character */}
      <motion.div
        style={{ x, scaleX, scaleY }}
        className="absolute bottom-[30px] -left-[180px] z-10 w-[200px] h-[420px] origin-bottom max-md:w-[150px] max-md:h-[320px] max-sm:w-[100px] max-sm:h-[220px] max-sm:bottom-[20px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${FRAMES_DIR}${frameIndex}.png`}
          alt="Walking character"
          className="w-full h-full object-contain object-bottom mix-blend-screen"
        />
      </motion.div>
    </>
  );
}
