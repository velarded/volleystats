import styles from "./HeroContainer.module.css";

export default function HeroContainer(props) {
  return ( 
  <div className={`h-screen w-full ${styles.heroContainer}`}>
    <h1 className={`text-5xl uppercase tracking-widest p-20 ${styles.heroTitle}`}>Volleystats</h1>
    <p className={`${styles.heroParagraph}`}>Record your volleyball statistics and visualize your in-game performances
      to provide insight on areas to improve</p>
  </div>
  );
}
