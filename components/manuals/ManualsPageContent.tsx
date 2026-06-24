"use client";

import { ManualsCategorySection } from "@/components/manuals/ManualsCategorySection";
import type { ProductManualSection } from "@/types/product-manual";

import styles from "./ManualsSection.module.css";

type ManualsPageContentProps = {
  sections: ProductManualSection[];
  emptySectionLabel: string;
  downloadManualTemplate: string;
};

export function ManualsPageContent({
  sections,
  emptySectionLabel,
  downloadManualTemplate,
}: ManualsPageContentProps) {
  return (
    <div className={styles.page}>
      <div className={styles.sections}>
        {sections.map((section) => (
          <ManualsCategorySection
            key={section.id}
            section={section}
            emptyLabel={emptySectionLabel}
            downloadManualTemplate={downloadManualTemplate}
          />
        ))}
      </div>
    </div>
  );
}
