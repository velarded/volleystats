import styles from "./Players.module.css";
import PlayerCard from "./PlayerCard";
import PlayersFilter from "./PlayersFilter";
import { useEffect, useState } from "react";
import { addNewPlayer } from "../../../lib/firestore/writes";
import { getAllPlayersForCurrentUser, getPlayers } from "../../../lib/firestore/reads";
import { useSelector } from "react-redux";
import Modal from "../shared/modal/Modal";
import NewPlayerForm from "./NewPlayerForm";
import mainStyles from '../../../styles/Main.module.css';

export default function Players(props) {
  const playersListElement = [];
  const [players, setPlayers] = useState([]);
  const [showNewPlayerModal, setShowNewPlayerModal] = useState(false);
  const uid = useSelector((state) => state.currentUser.userId);

  useEffect(() => {
    console.log('players component');
    async function fetchData() {
      const playersList = await getAllPlayersForCurrentUser(uid);
      setPlayers(playersList);
      console.log('Players Component - Players: ', playersList);
    };
    fetchData();
  }, [uid]);

  const newPlayerHandler = async(newPlayer) => {
    setShowNewPlayerModal(false);
    const newPlayerId = await addNewPlayer(newPlayer, uid);
    setPlayers([...players, {...newPlayer, id: newPlayerId}]);
  };

  players.forEach((player) => {
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
      <h1 className={mainStyles['component-title']}>Players</h1>
      <PlayersFilter openModal={() => setShowNewPlayerModal(true)}/>
      <div className={styles.playersListContainer}>{playersListElement}</div>
      <Modal show={showNewPlayerModal}
        onClose={() => setShowNewPlayerModal(false)}
        title='Create New Player'>
          <NewPlayerForm onFormClose={newPlayerHandler}/>
      </Modal>
    </div>
  );
}
