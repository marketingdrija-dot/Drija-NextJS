import { HeroSlider } from "@/components/home/HeroSlider";
import type { HeroSlide } from "@/types/hero";

type HeroSectionProps = {
  slides: HeroSlide[];
};

export function HeroSection({ slides }: HeroSectionProps) {
  return (
    <section className="hero-banner relative w-full overflow-hidden border-b border-neutral-200">
      <HeroSlider slides={slides} />
    </section>
  );
}
