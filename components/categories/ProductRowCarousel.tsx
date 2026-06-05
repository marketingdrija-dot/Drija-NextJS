"use client";

import { useRef } from "react";
import { CategoryProductRow } from "@/components/categories/CategoryProductRow";
import type { Locale } from "@/lib/i18n/config";
import type { Product } from "@/types/product";

type ProductRowCarouselProps = {
  products: Product[];
  locale: Locale;
  viewProductLabel: string;
};

export function ProductRowCarousel({
  products,
  locale,
  viewProductLabel,
}: ProductRowCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.85;
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  if (products.length === 0) return null;

  const showControls = products.length > 1;

  return (
    <div className="relative">
      {showControls && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute -left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-drija-green text-white transition hover:bg-drija-green-dark sm:-left-4 sm:h-10 sm:w-10"
          aria-label="Anterior"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
      )}

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth px-1 pb-2 scrollbar-none"
      >
        {products.map((product) => (
          <CategoryProductRow
            key={product.id}
            product={product}
            locale={locale}
            viewProductLabel={viewProductLabel}
          />
        ))}
      </div>

      {showControls && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute -right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-drija-green text-white transition hover:bg-drija-green-dark sm:-right-4 sm:h-10 sm:w-10"
          aria-label="Siguiente"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
