import styles from "./Players.module.css";
import PlayerCard from "./PlayerCard";
import PlayersFilter from "./PlayersFilter";

export default function Players(props) {
  return (
    <div className={styles.playersContainer}>
      <h1 className={styles.playersTitle}>Players</h1>
      <PlayersFilter />
      <PlayerCard firstName="Tobio" lastName="Kageyama" positions={["S"]} />
      <PlayerCard firstName="Daichi" lastName="Sawamura" positions={["C", "WS", "OH"]} />
    </div>
  );
}
