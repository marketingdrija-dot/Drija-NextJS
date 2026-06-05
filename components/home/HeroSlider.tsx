"use client";

import { useCallback, useEffect, useState } from "react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/types/hero";

const INTERVAL_MS = 4000;

type HeroSliderProps = {
  slides: HeroSlide[];
};

export function HeroSlider({ slides }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      setActiveIndex(((index % count) + count) % count);
    },
    [count],
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (count <= 1 || paused) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => ((current + 1) % count + count) % count);
    }, INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, count, paused]);

  if (count === 0) return null;

  return (
    <div
      className="hero-slider relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-700",
            index === activeIndex
              ? "opacity-100"
              : "pointer-events-none opacity-0",
          )}
          aria-hidden={index !== activeIndex}
        >
          <OptimizedImage
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ))}

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="hidden absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-drija-green sm:left-6"
            aria-label="Imagen anterior"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={next}
            className="hidden absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-drija-green sm:right-6"
            aria-label="Siguiente imagen"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => goTo(index)}
                className={cn(
                  "h-2 w-10 shrink-0 rounded-full transition-colors duration-300",
                  index === activeIndex
                    ? "bg-drija-green"
                    : "bg-white/75 hover:bg-white",
                )}
                aria-label={`Ir a imagen ${index + 1}`}
                aria-current={index === activeIndex}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
