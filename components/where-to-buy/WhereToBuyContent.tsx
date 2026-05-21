"use client";

import { useState } from "react";
import { RetailerGrid } from "@/components/where-to-buy/RetailerGrid";
import { TechnicalServiceCta } from "@/components/where-to-buy/TechnicalServiceCta";
import { cn } from "@/lib/utils";
import type { CountryRetailers } from "@/types/retailer";
import styles from "./WhereToBuy.module.css";

export type WhereToBuyLabels = {
  sidebarTitle: string;
  visitWebsite: string;
  technicalService: string;
  expandCountry: string;
  collapseCountry: string;
  noStores: string;
};

type WhereToBuyContentProps = {
  countries: CountryRetailers[];
  labels: WhereToBuyLabels;
  defaultCountryCode?: string;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={cn(
        "h-4 w-4 shrink-0 transition-transform duration-200",
        open && "rotate-180",
      )}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function WhereToBuyContent({
  countries,
  labels,
  defaultCountryCode,
}: WhereToBuyContentProps) {
  const [activeCode, setActiveCode] = useState(
    defaultCountryCode ?? countries[0]?.countryCode ?? "",
  );

  const activeCountry = countries.find((c) => c.countryCode === activeCode);

  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 lg:flex-row lg:gap-10 lg:px-8">
        {/* Sidebar — acordeón de países */}
        <aside className={cn("w-full shrink-0 lg:w-72 xl:w-80", styles.sidebar)}>
          <div className="mb-4 border border-neutral-300 bg-white px-4 py-5">
            <h2 className="text-center text-sm font-bold uppercase tracking-wide text-neutral-900">
              {labels.sidebarTitle}
            </h2>
          </div>

          <nav aria-label={labels.sidebarTitle}>
            <ul className="border border-neutral-200 bg-white">
              {countries.map((country) => {
                const isOpen = activeCode === country.countryCode;

                return (
                  <li
                    key={country.countryCode}
                    className="border-b border-neutral-200 last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveCode(country.countryCode)}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 px-4 py-3.5 text-left text-sm font-semibold uppercase tracking-wide transition",
                        isOpen
                          ? "text-drija-green"
                          : "text-neutral-800 hover:text-drija-green",
                      )}
                      aria-expanded={isOpen}
                      aria-controls={`retailers-panel-${country.countryCode}`}
                    >
                      <span>/ {country.country}</span>
                      <ChevronIcon open={isOpen} />
                    </button>

                    {/* Móvil: grilla debajo del país activo */}
                    <div
                      id={`retailers-panel-${country.countryCode}`}
                      className={cn(
                        "border-t border-neutral-100 px-4 py-4 lg:hidden",
                        !isOpen && "hidden",
                      )}
                    >
                      <RetailerGrid
                        retailers={country.retailers}
                        visitWebsiteLabel={labels.visitWebsite}
                        emptyMessage={labels.noStores}
                      />
                      {country.technicalServiceUrl && (
                        <TechnicalServiceCta
                          url={country.technicalServiceUrl}
                          label={`${labels.technicalService} ${country.country}`}
                        />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Desktop: panel principal */}
        <div className="hidden min-w-0 flex-1 lg:block">
          {activeCountry ? (
            <>
              <RetailerGrid
                retailers={activeCountry.retailers}
                visitWebsiteLabel={labels.visitWebsite}
                emptyMessage={labels.noStores}
              />
              {activeCountry.technicalServiceUrl && (
                <TechnicalServiceCta
                  url={activeCountry.technicalServiceUrl}
                  label={`${labels.technicalService} ${activeCountry.country}`}
                />
              )}
            </>
          ) : (
            <p className="py-12 text-center text-neutral-500">{labels.noStores}</p>
          )}
        </div>
      </div>
    </section>
  );
}
