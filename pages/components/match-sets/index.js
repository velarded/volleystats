import { useEffect, useState } from "react";
import Modal from "../shared/modal/Modal";
import MatchSetFilter from "./MatchSetFilter";
import NewMatchSetForm from "./NewMatchSetForm";
import styles from './MatchSets.module.css';
import mainStyles from '../../../styles/Main.module.css';
import MatchSetCard from "./MatchSetCard";
import { useSelector } from "react-redux";
import { getMatchSets } from "../../../lib/firestore/reads";

export default function MatchSets(props) {
    const [matchSets, setMatchSets] = useState([]);
    const [showNewMatchSetModal, setShowNewMatchSetModal] = useState(false);
    const matchSetsListElement = [];
    const uid = useSelector((state) => state.currentUser.userId);

    useEffect(() => {
      async function fetchData() {
        const matchSetsData = await getMatchSets(uid);
        setMatchSets(matchSetsData);
      };

      fetchData();
    }, [uid])

    const newMatchSetHandler = (newMatchSetDetails) => {
      setShowNewMatchSetModal(false);
      setMatchSet([...matchSets, newMatchSetDetails]);
    };

    matchSets.forEach(matchSet => {
      matchSetsListElement.push(
      <MatchSetCard key={matchSet.id} id={matchSet.id}
        matchSetName={matchSet.setName} team={matchSet.teamName}/>
      );
    });

    return (
      <div className={styles.matchSetsContainer}>
        <h1 className={mainStyles['component-title']}>Match Sets</h1>
        <MatchSetFilter openModal={() => setShowNewMatchSetModal(true)}/>
        <div className={styles.matchSetsListContainer}>{matchSetsListElement}</div>
        <Modal show={showNewMatchSetModal}
          onClose={() => setShowNewMatchSetModal(false)}
          title='New Match Set'>
            <NewMatchSetForm onFormClose={newMatchSetHandler}/>
        </Modal>
      </div>
    );
}