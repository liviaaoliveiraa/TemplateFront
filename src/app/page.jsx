import { crud, examples } from "@/data/crud";
import Card from "@components/Card";
import styles from "./page.module.css";

export default function Page() {
  return (
    <>
      <main className={styles.main}>
        {examples.map(({ id, method, verb, description, color, Icon }) => (
          <Card
            key={`example-${id}`}
            id={id}
            verb={verb}
            method={method}
            description={description}
            color={color}
            Icon={Icon}
          />
        ))}
        {crud.map(({ id, method, verb, description, color, Icon }) => (
          <Card
            key={`crud-${id}`}
            id={id}
            verb={verb}
            method={method}
            description={description}
            color={color}
            Icon={Icon}
          />
        ))}
      </main>
      <footer className={styles.footer}>
        <p>CodeVerse &copy; {new Date().getFullYear()}</p>
        <p>Next.js - Axios - Ant Design - Lucide</p>
      </footer>
    </>
  );
}
