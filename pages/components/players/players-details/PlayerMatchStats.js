import styles from "./PlayerMatchStats.module.css";
import mainStyles from "../../../../styles/Main.module.css";
import ChartCard from "../../shared/card/ChartCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faTrophy } from "@fortawesome/free-solid-svg-icons";
import SingleStatCard from "./SingleStatCard";

export default function PlayerMatchStats(props) {
  const matchesPlayedIcon = faGamepad;
  const winRatioIcon = faTrophy;

  return (
    <div className={styles.playerMatchStatsContainer}>
      <h2 className={mainStyles.statsSectionHeading}>Match Statistics</h2>
      <SingleStatCard
        statMetric="--"
        bottomLabel="Matches Played"
        icon={matchesPlayedIcon}
      />
      <SingleStatCard
        statMetric="--%"
        bottomLabel="Win Ratio"
        icon={winRatioIcon}
      />
    </div>
  );
}
