import styles from "./Players.module.css";
import PlayerCard from "./PlayerCard";
import PlayersFilter from "./PlayersFilter";
import useHttp from "../hooks/use-http";
import { getPlayers } from "../../api/api";

export default function Players(props) {
  const {
    sendRequest,
    status,
    data: loadedPlayers,
    error,
  } = useHttp(getPlayers, true);
  const playersList = [
    { firstName: "Tobio", lastName: "Kageyama", positions: ["S"] },
    { firstName: "Daichi", lastName: "Sawamura", positions: ["C", "WS", "OH"] },
    { firstName: "Koshi", lastName: "Sugawara", positions: ["S", "PS"] },
    { firstName: "Asahi", lastName: "Azumane", positions: ["WS", "OH", "A"] },
    { firstName: "Ryunosuke", lastName: "Tanaka", positions: ["WS", "OH"] },
    { firstName: "Yu", lastName: "Nishonoya", positions: ["L"] },
    { firstName: "Shoyo", lastName: "Hinata", positions: ["MB"] },
    { firstName: "Kei", lastName: "Tsukishima", positions: ["MB"] },
    { firstName: "Tadashi", lastName: "Yamaguchi", positions: ["MB", "PS"] },
  ];

  const playersListElement = [];
  playersList.forEach((player) => {
    playersListElement.push(
      <PlayerCard
        firstName={player.firstName}
        lastName={player.lastName}
        positions={player.positions}
      />
    );
  });
  return (
    <div className={styles.playersContainer}>
      <h1 className={styles.playersTitle}>Players</h1>
      <PlayersFilter />
      <div className={styles.playersListContainer}>{playersListElement}</div>
    </div>
  );
}
