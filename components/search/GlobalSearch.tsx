"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { useProductSearch } from "@/hooks/useProductSearch";
import { useProductSearchCatalog } from "@/hooks/useProductSearchCatalog";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

import styles from "./GlobalSearch.module.css";

type GlobalSearchContextValue = {
  open: boolean;
  toggle: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const GlobalSearchContext = createContext<GlobalSearchContextValue | null>(
  null,
);

function useGlobalSearchContext() {
  const context = useContext(GlobalSearchContext);
  if (!context) {
    throw new Error("GlobalSearch components must be used within GlobalSearchRoot");
  }
  return context;
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 37 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M22.665 23.6599L28.515 30.0399"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M16.655 26.3C21.1672 26.3 24.825 22.6421 24.825 18.13C24.825 13.6178 21.1672 9.95996 16.655 9.95996C12.1429 9.95996 8.48505 13.6178 8.48505 18.13C8.48505 22.6421 12.1429 26.3 16.655 26.3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

export function GlobalSearchRoot({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <GlobalSearchContext.Provider
      value={{ open, toggle, close, triggerRef }}
    >
      {children}
    </GlobalSearchContext.Provider>
  );
}

export function GlobalSearchTrigger() {
  const { dict } = useI18n();
  const { open, toggle, triggerRef } = useGlobalSearchContext();

  return (
    <button
      ref={triggerRef}
      type="button"
      className={styles.trigger}
      aria-expanded={open}
      aria-label={open ? dict.search.closeLabel : dict.search.openLabel}
      onClick={toggle}
    >
      <SearchIcon className={styles.triggerIcon} />
      <span
        className={cn(styles.chevron, open && styles.chevronOpen)}
        aria-hidden
      />
    </button>
  );
}

export function GlobalSearchPanel() {
  const router = useRouter();
  const { dict, href, locale } = useI18n();
  const listboxId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { open, close, triggerRef } = useGlobalSearchContext();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const { catalog, loading, error } = useProductSearchCatalog(locale, open);
  const { results, hasHydrated } = useProductSearch(
    catalog?.products ?? [],
    catalog?.categories ?? [],
    href,
    query,
  );

  const showResults =
    open &&
    query.trim().length > 0 &&
    hasHydrated &&
    !loading &&
    !error;

  const handleClose = useCallback(() => {
    close();
    setQuery("");
    setActiveIndex(-1);
  }, [close]);

  const navigateTo = useCallback(
    (url: string) => {
      handleClose();
      router.push(url);
    },
    [handleClose, router],
  );

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(-1);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      handleClose();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [handleClose, open, triggerRef]);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResults || results.length === 0) {
      if (event.key === "Escape") handleClose();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        index >= results.length - 1 ? 0 : index + 1,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        index <= 0 ? results.length - 1 : index - 1,
      );
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const target = results[activeIndex] ?? results[0];
      if (target) navigateTo(target.url);
    }
  };

  if (!open) return null;

  return (
    <div className={styles.panel} ref={panelRef}>
      <div className={styles.panelInner}>
        <div className={styles.inputWrap}>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
            className={styles.input}
            placeholder={dict.search.placeholder}
            role="combobox"
            aria-expanded={showResults && results.length > 0}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={
              activeIndex >= 0
                ? `${listboxId}-option-${activeIndex}`
                : undefined
            }
            autoComplete="off"
          />
          <SearchIcon className={styles.inputIcon} />

          {showResults ? (
            <div className={styles.results}>
              {results.length === 0 ? (
                <p className={styles.status} role="status">
                  {dict.search.noResults}
                </p>
              ) : (
                <ul
                  id={listboxId}
                  className={styles.resultList}
                  role="listbox"
                  aria-label={dict.search.resultsLabel}
                >
                  {results.map((result, index) => (
                    <li
                      key={result.id}
                      id={`${listboxId}-option-${index}`}
                      className={styles.resultItem}
                      role="presentation"
                    >
                      <Link
                        href={result.url}
                        role="option"
                        aria-selected={index === activeIndex}
                        className={cn(
                          styles.resultLink,
                          index === activeIndex && styles.resultLinkActive,
                        )}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={handleClose}
                      >
                        <div className={styles.thumb}>
                          {result.imageSrc ? (
                            <OptimizedImage
                              src={result.imageSrc}
                              alt={result.imageAlt}
                              fill
                              sizes="48px"
                              className="object-contain"
                            />
                          ) : (
                            <span className={styles.thumbFallback}>
                              DRIJA
                            </span>
                          )}
                        </div>
                        <div className={styles.resultBody}>
                          <p className={styles.resultName}>{result.name}</p>
                          <p className={styles.resultCategory}>
                            {result.categoryName}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}

          {loading ? (
            <p className={styles.status} role="status">
              {dict.search.loading}
            </p>
          ) : null}

          {error ? (
            <p className={styles.status} role="alert">
              {dict.search.error}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
