"use client";

import { useState } from "react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/product";

import styles from "./ProductImageSlider.module.css";

type ProductImageSliderProps = {
  images: ProductImage[];
  prevLabel: string;
  nextLabel: string;
};

export function ProductImageSlider({
  images,
  prevLabel,
  nextLabel,
}: ProductImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = images.length;

  if (count === 0) return null;

  const active = images[activeIndex] ?? images[0];
  const showControls = count > 1;

  function goTo(index: number) {
    setActiveIndex((index + count) % count);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.main}>
        <div className={styles.viewport}>
          <OptimizedImage
            src={active.src}
            alt={active.alt}
            fill
            priority={activeIndex === 0}
            loading={activeIndex === 0 ? undefined : "eager"}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain object-center p-4"
          />
        </div>

        {showControls && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className={cn(styles.nav, styles.navPrev)}
              aria-label={prevLabel}
            >
              <svg
                className={styles.navIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path
                  d="M15 6l-6 6 6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className={cn(styles.nav, styles.navNext)}
              aria-label={nextLabel}
            >
              <svg
                className={styles.navIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path
                  d="M9 6l6 6-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {showControls && (
        <div className={styles.thumbs} role="tablist" aria-label={prevLabel}>
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={image.alt}
              onClick={() => setActiveIndex(index)}
              className={cn(
                styles.thumb,
                index === activeIndex && styles.thumbActive,
              )}
            >
              <OptimizedImage
                src={image.src}
                alt=""
                fill
                loading="eager"
                sizes="80px"
                className="object-contain object-center p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
