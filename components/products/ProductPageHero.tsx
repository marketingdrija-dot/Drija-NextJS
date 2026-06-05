import { OptimizedImage } from "@/components/ui/OptimizedImage";

type ProductPageHeroProps = {
  image: { src: string; alt: string };
};

export function ProductPageHero({ image }: ProductPageHeroProps) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative aspect-[21/9] min-h-[200px] w-full sm:min-h-[260px] lg:min-h-[320px]">
        <OptimizedImage
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
