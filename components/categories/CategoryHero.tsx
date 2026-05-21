import { OptimizedImage } from "@/components/ui/OptimizedImage";

type CategoryHeroProps = {
  title: string;
  image: { src: string; alt: string };
};

export function CategoryHero({ title, image }: CategoryHeroProps) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative aspect-[21/9] min-h-[220px] w-full sm:min-h-[280px] lg:min-h-[340px]">
        <OptimizedImage
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-center text-3xl font-bold uppercase tracking-[0.2em] text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
