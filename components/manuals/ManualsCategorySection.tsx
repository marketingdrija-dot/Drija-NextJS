"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ProductManualItem, ProductManualSection } from "@/types/product-manual";
import { cn } from "@/lib/utils";

import styles from "./ManualsSection.module.css";

type ManualsCategorySectionProps = {
  section: ProductManualSection;
  allFilterLabel: string;
  emptyLabel: string;
  downloadManualTemplate: string;
};

export function ManualsCategorySection({
  section,
  allFilterLabel,
  emptyLabel,
  downloadManualTemplate,
}: ManualsCategorySectionProps) {
  const [activeFilterId, setActiveFilterId] = useState("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const filters = useMemo(
    () =>
      section.filters.map((filter) =>
        filter.id === "all" ? { ...filter, label: allFilterLabel } : filter,
      ),
    [allFilterLabel, section.filters],
  );

  const visibleItems = useMemo(() => {
    if (activeFilterId === "all") return section.items;
    return section.items.filter((item) => item.filterId === activeFilterId);
  }, [activeFilterId, section.items]);

  const toggleItem = (slug: string) => {
    setOpenSlug((current) => (current === slug ? null : slug));
  };

  const handleFilterChange = (filterId: string) => {
    setActiveFilterId(filterId);
    setOpenSlug(null);
  };

  return (
    <section className={styles.section} aria-labelledby={`manuals-${section.slug}`}>
      <h2 id={`manuals-${section.slug}`} className={styles.sectionTitle}>
        {section.name}
      </h2>

      <div className={styles.filters} role="tablist" aria-label={section.name}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={activeFilterId === filter.id}
            className={cn(
              styles.filterButton,
              activeFilterId === filter.id && styles.filterButtonActive,
            )}
            onClick={() => handleFilterChange(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {visibleItems.length === 0 ? (
        <p className={styles.empty} role="status">
          {emptyLabel}
        </p>
      ) : (
        <ul className={styles.list}>
          {visibleItems.map((item) => (
            <ManualsAccordionItem
              key={item.id}
              item={item}
              isOpen={openSlug === item.slug}
              onToggle={() => toggleItem(item.slug)}
              downloadLabel={downloadManualTemplate.replace("{product}", item.name)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

type ManualsAccordionItemProps = {
  item: ProductManualItem;
  isOpen: boolean;
  onToggle: () => void;
  downloadLabel: string;
};

function ManualsAccordionItem({
  item,
  isOpen,
  onToggle,
  downloadLabel,
}: ManualsAccordionItemProps) {
  const panelId = `manual-panel-${item.id}`;

  return (
    <li className={styles.item}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span
          className={cn(styles.chevron, isOpen && styles.chevronOpen)}
          aria-hidden
        />
        <span className={styles.itemName}>{item.name}</span>
      </button>

      {isOpen ? (
        <div id={panelId} className={styles.panel}>
          <a
            href={item.pdf.src}
            download={item.pdf.filename}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadLink}
            aria-label={downloadLabel}
          >
            <Image
              src="/images/manuals/pdf-icon.png"
              alt=""
              width={48}
              height={48}
              className={styles.pdfIcon}
              aria-hidden
            />
            <span className={styles.itemName}>{item.name}</span>
          </a>
        </div>
      ) : null}
    </li>
  );
}
