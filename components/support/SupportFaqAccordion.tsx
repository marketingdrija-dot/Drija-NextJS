"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupportArticlePath } from "@/lib/support/paths";
import { useI18n } from "@/lib/i18n/context";
import type { SupportCategory } from "@/types/support";
import { cn } from "@/lib/utils";

import styles from "./SupportFaqAccordion.module.css";

type SupportFaqAccordionProps = {
  categories: SupportCategory[];
  expandAll?: boolean;
};

export function SupportFaqAccordion({
  categories,
  expandAll = false,
}: SupportFaqAccordionProps) {
  const { locale, dict } = useI18n();
  const [openSlug, setOpenSlug] = useState<string | null>(
    categories[0]?.slug ?? null,
  );

  useEffect(() => {
    if (expandAll) return;

    setOpenSlug((current) => {
      if (current && categories.some((category) => category.slug === current)) {
        return current;
      }
      return categories[0]?.slug ?? null;
    });
  }, [categories, expandAll]);

  const toggleCategory = (slug: string) => {
    if (expandAll) return;
    setOpenSlug((current) => (current === slug ? null : slug));
  };

  return (
    <section className={styles.accordionSection} aria-label={dict.support.faq}>
      <ul className={styles.list}>
        {categories.map((category) => {
          const isOpen = expandAll || openSlug === category.slug;
          const panelId = `support-panel-${category.slug}`;

          return (
            <li key={category.id} className={styles.item}>
              <button
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleCategory(category.slug)}
              >
                <span className={styles.iconWrap}>
                  <Image
                    src={category.icon.src}
                    alt={category.icon.alt}
                    width={32}
                    height={32}
                    className={styles.icon}
                  />
                </span>
                <span className={styles.label}>
                  {category.name}{" "}
                  <span className={styles.count}>
                    ({category.articles.length})
                  </span>
                </span>
                <span
                  className={cn(styles.chevron, isOpen && styles.chevronOpen)}
                  aria-hidden
                />
              </button>

              {isOpen ? (
                <div id={panelId} className={styles.panel}>
                  <ul className={styles.questions}>
                    {category.articles.map((article) => (
                      <li key={article.id} className={styles.questionItem}>
                        <Link
                          href={getSupportArticlePath(
                            category.slug,
                            article.slug,
                            locale,
                          )}
                          className={styles.questionLink}
                        >
                          {article.question}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
