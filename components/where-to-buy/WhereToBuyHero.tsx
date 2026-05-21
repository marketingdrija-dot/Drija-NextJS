import { OptimizedImage } from "@/components/ui/OptimizedImage";

type WhereToBuyHeroProps = {
  title: string;
  image: { src: string; alt: string };
};

export function WhereToBuyHero({ title, image }: WhereToBuyHeroProps) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative aspect-[21/9] min-h-[220px] w-full sm:min-h-[300px] lg:min-h-[380px]">
        <OptimizedImage
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center">
          <h1 className="px-6 text-3xl font-bold uppercase tracking-[0.15em] text-white sm:px-10 sm:text-4xl lg:px-16 lg:text-5xl">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
