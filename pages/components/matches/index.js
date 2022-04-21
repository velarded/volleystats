import { useEffect, useState } from "react";
import Modal from "../shared/modal/Modal";
import MatchFilter from "./MatchFilter";
import NewMatchForm from "./NewMatchForm";
import styles from './Matches.module.css';
import mainStyles from '../../../styles/Main.module.css';
import MatchCard from "./MatchCard";
import { useSelector } from "react-redux";
import { getMatches } from "../../../lib/firestore/reads";

export default function Matches(props) {
    const [matches, setMatches] = useState([]);
    const [showNewMatchModal, setShowNewMatchModal] = useState(false);
    const matchesListElement = [];
    const uid = useSelector((state) => state.currentUser.userId);

    useEffect(() => {
      async function fetchData() {
        const matchesData = await getMatches(uid);
        setMatches(matchesData);
      };

      fetchData();
    }, [uid])

    const newMatchHandler = (newMatchDetails) => {
      setShowNewMatchModal(false);
      setMatches([...matches, newMatchDetails]);
    };

    matches.forEach(match => {
      matchesListElement.push(
      <MatchCard key={match.id} id={match.id}
        matchName={match.matchName} teamOne={match.teamOne.teamName} teamTwo={match.teamTwo.teamName} matchDate={match.matchDate}/>
      );
    });

    return (
      <div className={styles.matchesContainer}>
        <h1 className={mainStyles['component-title']}>Matches</h1>
        <MatchFilter openModal={() => setShowNewMatchModal(true)}/>
        <div className={styles.matchesListContainer}>{matchesListElement}</div>
        <Modal show={showNewMatchModal}
          onClose={() => setShowNewMatchModal(false)}
          title='New Match'>
            <NewMatchForm onFormClose={newMatchHandler}/>
        </Modal>
      </div>
    );
}