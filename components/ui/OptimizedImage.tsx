"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type OptimizedImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  loading?: "lazy" | "eager";
};

export function OptimizedImage({
  src,
  alt,
  fill,
  width = 800,
  height = 600,
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
  loading,
}: OptimizedImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-drija-green/20 to-neutral-100 text-neutral-500",
          fill && "absolute inset-0",
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <span className="text-sm font-medium">DRIJA</span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("object-contain", className)}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : loading}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("object-cover", className)}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : loading}
      onError={() => setError(true)}
    />
  );
}
