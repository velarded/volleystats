import { useRouter } from "next/router";
import styles from "./HighlightsCard.module.css";

export default function HighlightsCard(props) {
  const router = useRouter();

  const onHighlightCardClick = () => {
    console.log("Highlights card", props.label);
    console.log(props.pathParam);
    router.push(`${router.asPath}/${props.pathParam}`);
  };

  return (
    <div className={styles.highlightsCard} onClick={onHighlightCardClick}>
      <p className={styles.label}>{props.label}</p>
    </div>
  );
}
