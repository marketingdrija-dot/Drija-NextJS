import styles from "./SupportFaqAccordion.module.css";

type SupportPageSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  ariaLabel: string;
};

export function SupportPageSearch({
  value,
  onChange,
  placeholder,
  ariaLabel,
}: SupportPageSearchProps) {
  return (
    <div className={styles.searchWrap}>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={styles.searchInput}
        autoComplete="off"
      />
    </div>
  );
}
