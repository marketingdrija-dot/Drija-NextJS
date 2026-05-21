import { RetailerCard } from "@/components/where-to-buy/RetailerCard";
import type { Retailer } from "@/types/retailer";

type RetailerGridProps = {
  retailers: Retailer[];
  visitWebsiteLabel: string;
  emptyMessage?: string;
};

export function RetailerGrid({
  retailers,
  visitWebsiteLabel,
  emptyMessage = "No stores available.",
}: RetailerGridProps) {
  if (retailers.length === 0) {
    return (
      <p className="py-12 text-center text-neutral-500">{emptyMessage}</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {retailers.map((retailer) => (
        <RetailerCard
          key={retailer.id}
          retailer={retailer}
          visitWebsiteLabel={visitWebsiteLabel}
        />
      ))}
    </div>
  );
}
