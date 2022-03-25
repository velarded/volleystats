import styles from "./Players.module.css";
import PlayerCard from "./PlayerCard";

export default function Players(props) {
  return (
    <div>
      <h1>Players</h1>
      <PlayerCard firstName="Tobio" lastName="Kageyama" positions={["S"]} />
    </div>
  );
}
