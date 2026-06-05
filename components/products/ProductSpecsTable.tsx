import type { ProductSpec } from "@/types/product";

import styles from "./ProductSpecsTable.module.css";

type ProductSpecsTableProps = {
  title: string;
  specs?: ProductSpec[];
  specsHtml?: string;
};

export function ProductSpecsTable({
  title,
  specs,
  specsHtml,
}: ProductSpecsTableProps) {
  if (specsHtml) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>{title}</h2>
        <div
          className={styles.htmlTable}
          dangerouslySetInnerHTML={{ __html: specsHtml }}
        />
      </section>
    );
  }

  if (!specs?.length) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <table className={styles.table}>
        <tbody>
          {specs.map((spec) => (
            <tr key={spec.label}>
              <th scope="row">{spec.label}</th>
              <td>{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
