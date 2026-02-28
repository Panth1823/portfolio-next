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

  return (
    <motion.div
      style={{ x, scaleX, scaleY }}
      className="absolute bottom-[69px] -left-[180px] z-10 w-[110px] h-[260px] origin-bottom max-md:w-[90px] max-md:h-[210px] max-sm:w-[65px] max-sm:h-[150px] max-sm:bottom-[51px]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${FRAMES_DIR}${frameIndex}.png`}
        alt="Walking character"
        className="w-full h-full object-contain object-bottom mix-blend-screen"
      />
    </motion.div>
  );
}
