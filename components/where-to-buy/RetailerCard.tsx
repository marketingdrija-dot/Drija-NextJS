import { OptimizedImage } from "@/components/ui/OptimizedImage";
import type { Retailer } from "@/types/retailer";

type RetailerCardProps = {
  retailer: Retailer;
  visitWebsiteLabel: string;
};

function ArrowDownRightIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M4 4h8v8M12 4L4 12" />
    </svg>
  );
}

export function RetailerCard({ retailer, visitWebsiteLabel }: RetailerCardProps) {
  const logoSrc = retailer.logo ?? "/images/retailers/placeholder.png";

  return (
    <a
      href={retailer.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-sm border border-neutral-200 bg-neutral-100 transition hover:border-drija-green hover:shadow-md"
    >
      <div className="relative aspect-square">
        <OptimizedImage
          src={logoSrc}
          alt={retailer.name}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-contain p-4"
        />
      </div>
      <div className="flex items-center justify-center gap-1.5 border-t border-neutral-200 bg-white px-2 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-800 transition group-hover:text-drija-green sm:text-xs">
        <span>{visitWebsiteLabel}</span>
        <ArrowDownRightIcon />
      </div>
    </a>
  );
}
