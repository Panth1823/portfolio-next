"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";

const TILES = [
  {
    poster:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=400&q=70",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    poster:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=70",
    video: "https://vjs.zencdn.net/v/oceans.mp4",
  },
  {
    poster:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=400&q=70",
    video: "https://vjs.zencdn.net/v/oceans.mp4",
  },
  {
    poster:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=400&q=70",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    poster:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=70",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    poster:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=70",
    video: "https://vjs.zencdn.net/v/oceans.mp4",
  },
  {
    poster:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=70",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
];

// Triplicate for infinite look
const DISPLAY_TILES = [...TILES, ...TILES, ...TILES];
const OFFSET = TILES.length;

function HeroTile({
  tile,
  isCentered,
  isNear,
  isLCP,
  width,
  height,
  opacity,
  diff,
  isTransitioning,
}: {
  tile: (typeof TILES)[0];
  isCentered: boolean;
  isNear: boolean;
  isLCP: boolean;
  width: string;
  height: string;
  opacity: number;
  diff: number;
  isTransitioning: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isCentered && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isCentered]);

  return (
    <div
      className="shrink-0 flex items-center justify-center group/tile"
      style={{
        width: `clamp(240px, 30vw, 400px)`,
        height: "515px",
        transition: isTransitioning ? "all 1000ms ease-in-out" : "none",
      }}
    >
      <div
        className="bg-tile rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl cursor-pointer group-hover/tile:scale-[1.05] group-hover/tile:border-[var(--accent)]/40 group-hover/tile:shadow-[0_20px_80px_-20px_rgba(200,255,0,0.2)] group-hover/tile:z-30"
        style={{
          width,
          height,
          opacity,
          filter: `grayscale(${Math.min(0.5, diff * 0.5)})`,
          transition: isTransitioning ? "all 700ms ease-out" : "none",
        }}
      >
        <div className="w-full h-full relative group-hover/tile:grayscale-0 transition-all duration-700">
          <Image
            src={tile.poster}
            alt=""
            fill
            sizes="400px"
            priority={isLCP}
            className={`object-cover pointer-events-none transition-opacity duration-700 ${isCentered ? "opacity-0" : "opacity-100"}`}
          />
          {/* Video — only load src when active or adjacent to avoid fetching 21 videos upfront */}
          <video
            ref={videoRef}
            src={isNear ? tile.video : undefined}
            poster={tile.poster}
            muted
            loop
            playsInline
            crossOrigin="anonymous"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isCentered ? "opacity-100" : "opacity-0"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/tile:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(OFFSET + 3);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(currentIndex);

  // Keep ref in sync with state
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const TILE_WIDTH =
    typeof window !== "undefined" && window.innerWidth < 640 ? 260 : 440; // responsive tile width

  const moveToIndex = useCallback((index: number) => {
    setIsTransitioning(true);
    setDragOffset(0);
    setCurrentIndex(index);
  }, []);

  // Stable callbacks that read from ref instead of closing over currentIndex
  const next = useCallback(
    () => moveToIndex(currentIndexRef.current + 1),
    [moveToIndex],
  );
  const prev = useCallback(
    () => moveToIndex(currentIndexRef.current - 1),
    [moveToIndex],
  );

  const handleTransitionEnd = () => {
    if (!isTransitioning) return;
    // seamless jump
    if (currentIndex >= OFFSET + TILES.length) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - TILES.length);
    } else if (currentIndex < OFFSET) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + TILES.length);
    }
  };

  // Drag Handlers
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsPlaying(false);
    setIsDragging(true);
    setIsTransitioning(false);
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStart(x);
  };

  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(x - dragStart);
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Calculate how many tiles we've dragged
    const tilesMoved = Math.round(dragOffset / TILE_WIDTH);
    const newIndex = currentIndex - tilesMoved;

    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    setDragOffset(0);
  };

  useEffect(() => {
    if (isPlaying && !isDragging) {
      timerRef.current = setInterval(next, 4000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isDragging, next]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content-inner", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen mx-auto bg-[var(--bg-primary)] flex flex-col items-center justify-center overflow-hidden font-manrope cursor-grab active:cursor-grabbing"
      style={{ height: "100dvh" }}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onTouchStart={onDragStart}
      onTouchMove={onDragMove}
      onTouchEnd={onDragEnd}
    >
      {/* Background Tiles Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          onTransitionEnd={handleTransitionEnd}
          className="relative flex items-center justify-center opacity-30 grayscale-[0.5] pointer-events-auto"
          style={{
            width: `${DISPLAY_TILES.length * TILE_WIDTH}px`,
            transform: `translateX(${(OFFSET + 3 - currentIndex) * TILE_WIDTH + dragOffset}px)`,
            transition: isTransitioning
              ? "transform 1000ms cubic-bezier(0.2, 0, 0, 1)"
              : "none",
            gap: "40px",
            willChange: "transform",
          }}
        >
          {DISPLAY_TILES.map((tile, i) => {
            const diff = Math.abs(i - currentIndex);
            const isCentered = diff === 0;

            // Width stays constant for equal spacing!
            const width = "400px";
            let height = "515px";
            let opacity = 1;

            if (diff === 1) {
              height = "451px";
              opacity = 0.8;
            } else if (diff >= 2) {
              height = "390px";
              opacity = 0.4;
            }

            return (
              <HeroTile
                key={i}
                tile={tile}
                isCentered={isCentered}
                isNear={diff <= 1}
                isLCP={i === OFFSET + 3}
                width={width}
                height={height}
                opacity={opacity}
                diff={diff}
                isTransitioning={isTransitioning}
              />
            );
          })}
        </div>
      </div>

      {/* Central Content */}
      <div className="relative z-10 w-[calc(100%-2rem)] sm:w-[90vw] md:w-[737px] max-w-[737px] min-h-[200px] sm:h-[268px] flex items-center justify-center pointer-events-none px-2 sm:px-0">
        <div className="hero-content-inner bg-[var(--bg-card)]/60 backdrop-blur-xl border border-[var(--border)] w-full h-full rounded-[24px] sm:rounded-[40px] flex flex-col items-center justify-center px-5 sm:px-12 py-8 sm:py-0 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/5 mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-[var(--text-primary)] text-xs font-medium tracking-wide">
              Open to Opportunities
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[var(--text-primary)] mb-3 sm:mb-4 tracking-tight text-center">
            Product Designer
          </h1>
          <p className="text-sm sm:text-lg text-[var(--text-secondary)] font-light text-center">
            Turning user insights into real product decisions for{" "}
            <span className="text-[var(--accent)] font-medium">3+ years</span>
          </p>
        </div>
      </div>

      {/* Controls Widget — bottom-center on mobile, bottom-right on desktop */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-10 sm:bottom-8 z-20 flex items-center gap-3 pointer-events-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--bg-card)] flex items-center justify-center hover:bg-[var(--bg-secondary)] transition-all duration-200 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          aria-label="Previous Slide"
        >
          <svg
            className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.8]"
            viewBox="0 0 24 24"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPlaying(!isPlaying);
          }}
          className="w-9 h-9 rounded-full border border-[var(--accent)]/40 bg-[var(--bg-card)] flex items-center justify-center hover:bg-[var(--bg-secondary)] transition-all duration-200"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg
              className="w-3.5 h-3.5 text-[var(--accent)] fill-current"
              viewBox="0 0 24 24"
            >
              <rect x="6" y="4" width="3.5" height="16" rx="1" />
              <rect x="14.5" y="4" width="3.5" height="16" rx="1" />
            </svg>
          ) : (
            <svg
              className="w-3.5 h-3.5 text-[var(--accent)] fill-current ml-0.5"
              viewBox="0 0 24 24"
            >
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--bg-card)] flex items-center justify-center hover:bg-[var(--bg-secondary)] transition-all duration-200 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          aria-label="Next Slide"
        >
          <svg
            className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.8]"
            viewBox="0 0 24 24"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
