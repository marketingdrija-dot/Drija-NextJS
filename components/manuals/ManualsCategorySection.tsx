"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ProductManualGroup, ProductManualSection } from "@/types/product-manual";
import { cn } from "@/lib/utils";

import styles from "./ManualsSection.module.css";

type ManualsCategorySectionProps = {
  section: ProductManualSection;
  emptyLabel: string;
  downloadManualTemplate: string;
};

export function ManualsCategorySection({
  section,
  emptyLabel,
  downloadManualTemplate,
}: ManualsCategorySectionProps) {
  const defaultGroupId = section.groups[0]?.id ?? "";
  const [activeGroupId, setActiveGroupId] = useState(defaultGroupId);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const activeGroup = useMemo(
    () => section.groups.find((group) => group.id === activeGroupId) ?? section.groups[0],
    [activeGroupId, section.groups],
  );

  const visibleItems = activeGroup?.items ?? [];

  const toggleItem = (slug: string) => {
    setOpenSlug((current) => (current === slug ? null : slug));
  };

  const handleGroupChange = (group: ProductManualGroup) => {
    setActiveGroupId(group.id);
    setOpenSlug(null);
  };

  if (section.groups.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby={`manuals-${section.slug}`}>
      <h2 id={`manuals-${section.slug}`} className={styles.sectionTitle}>
        {section.name}
      </h2>

      <div className={styles.filters} role="tablist" aria-label={section.name}>
        {section.groups.map((group) => (
          <button
            key={group.id}
            type="button"
            role="tab"
            aria-selected={activeGroupId === group.id}
            className={cn(
              styles.filterButton,
              activeGroupId === group.id && styles.filterButtonActive,
            )}
            onClick={() => handleGroupChange(group)}
          >
            {group.name}
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
  item: {
    id: string;
    slug: string;
    name: string;
    pdf: { src: string; filename: string };
  };
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
          </a>
        </div>
      ) : null}
    </li>
  );
}
