import { faCrosshairs, faHand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SingleStatCard from "./SingleStatCard";
import styles from "./SingleStats.module.css";

export default function SingleStats(props) {
  const touchIcon = faHand;
  const attackIcon = faCrosshairs;
  const playerStats = props.playerStats ? props.playerStats : [];
  const successfulTouches = playerStats.filter(
    (playerStat) =>
      playerStat.qualityType === "Ace" ||
      playerStat.qualityType === "Kill" ||
      playerStat.qualityType === "Good" ||
      playerStat.qualityType === "Touch"
  );

  const attackStats = playerStats.filter(
    (playerStat) => playerStat.contactType === "Attack"
  );

  let touchConsistency = 0;

  const attackKills = playerStats.filter(
    (playerStat) => playerStat.qualityType === "Kill"
  ).length;

  const attackErrors = playerStats.filter(
    (playerStat) => playerStat.qualityType === "Error"
  ).length;

  // (Kills - Errors)/Total Attempts (Total Attempts = Kills + Errors + Zeroes)
  let attackConsistency = 0;

  if (playerStats.length !== 0) {
    touchConsistency = Math.round(
      (successfulTouches.length / playerStats.length) * 100,
      2
    );
  }

  if (attackStats.length !== 0) {
    attackConsistency = (
      (attackKills - attackErrors) /
      attackStats.length
    ).toFixed(2);
  }

  console.log("touchConsistency", touchConsistency);
  console.log("attackConsistency", attackConsistency);

  return (
    <div className={styles.singleStatsContainer}>
      <SingleStatCard
        icon={touchIcon}
        statMetric={`${touchConsistency}%`}
        statLabel="Consistency"
        bottomLabel={`${playerStats.length} Touches`}
      />
      <SingleStatCard
        icon={attackIcon}
        statMetric={attackConsistency}
        statLabel="Consistency"
        bottomLabel={`${attackStats.length} Total Attacks`}
      />
    </div>
  );
}
