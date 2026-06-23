"use client";

import { useState } from "react";
import { SupportFaqAccordion } from "@/components/support/SupportFaqAccordion";
import { SupportHelpSection } from "@/components/support/SupportHelpSection";
import { SupportPageHero } from "@/components/support/SupportPageHero";
import { SupportPageSearch } from "@/components/support/SupportPageSearch";
import { useSupportSearch } from "@/hooks/useSupportSearch";
import type { SupportHelpItem } from "@/components/support/SupportHelpSection";
import type { SupportCategory } from "@/types/support";
import { useI18n } from "@/lib/i18n/context";

import styles from "./SupportFaqAccordion.module.css";

type SupportPageContentProps = {
  categories: SupportCategory[];
  helpTitle: string;
  helpItems: SupportHelpItem[];
};

export function SupportPageContent({
  categories,
  helpTitle,
  helpItems,
}: SupportPageContentProps) {
  const { locale, dict } = useI18n();
  const [query, setQuery] = useState("");
  const { filteredCategories, hasQuery, resultCount } = useSupportSearch(
    categories,
    locale,
    query,
  );

  return (
    <>
      <SupportPageHero title={dict.support.pageTitle}>
        <SupportPageSearch
          value={query}
          onChange={setQuery}
          placeholder={dict.support.searchPlaceholder}
          ariaLabel={dict.support.searchPlaceholder}
        />
      </SupportPageHero>

      {hasQuery && resultCount === 0 ? (
        <p className={styles.noResults} role="status">
          {dict.support.noSearchResults}
        </p>
      ) : null}

      {(!hasQuery || resultCount > 0) && (
        <SupportFaqAccordion
          categories={filteredCategories}
          expandAll={hasQuery}
        />
      )}

      <SupportHelpSection title={helpTitle} items={helpItems} />
    </>
  );
}
