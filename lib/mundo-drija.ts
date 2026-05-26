import slidesData from "@/data/mundo-drija-slides.json";
import type { MundoDrijaSlide } from "@/types/mundo-drija";

const data = slidesData as { slides: MundoDrijaSlide[] };

export function getMundoDrijaSlides(): MundoDrijaSlide[] {
  return data.slides;
}
