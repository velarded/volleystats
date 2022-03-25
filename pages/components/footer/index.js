import styles from "./Footer.module.css";

export default function Footer(props) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerContainer}>
      <p className={styles.copyright}>&copy; {currentYear} Danica Velarde</p>
    </footer>
  );
}
