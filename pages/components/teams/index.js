import TeamCard from './TeamCard';
import styles from './Teams.module.css';
import mainStyles from '../../../styles/Main.module.css';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllTeamsForCurrentUser, getTeams } from '../../../lib/firestore/reads';
import TeamsFilter from './TeamsFilter';
import Modal from '../shared/modal/Modal';
import NewTeamForm from './NewTeamForm';
import { addNewTeam } from '../../../lib/firestore/writes';

export default function Teams(props) {
  const teamsListElement = [];
  const [teams, setTeams] = useState([]);
  const [showNewTeamModal, setShowNewTeamModal] = useState(false);
  const uid = useSelector((state) => state.currentUser.userId);


  useEffect(() => {
    async function fetchData() {
      const teamsList = await getAllTeamsForCurrentUser(uid);
      setTeams(teamsList);
    };
    fetchData();
  }, [uid]);

  const newTeamHandler = async(newTeam) => {
    setShowNewTeamModal(false);
    const newTeamId = await addNewTeam(newTeam, uid);
    const newTeamData = {...newTeam, players: [], id: newTeamId, uid};
    console.log(newTeamData);
    setTeams([...teams, newTeamData]);
  };

  teams.forEach((team) => {
    teamsListElement.push(<TeamCard key={team.id} team={team}/>);
  });

  return (
    <div className={styles.teamsContainer}>
      <h1 className={mainStyles['component-title']}>Teams</h1>
      <TeamsFilter openModal={() => setShowNewTeamModal(true)}/>
      <div className={styles.teamsListContainer}>{teamsListElement}</div>
      <Modal show={showNewTeamModal}
        onClose={() => setShowNewTeamModal(false)}
        title='Create New Team'>
          <NewTeamForm onFormClose={newTeamHandler}/>
      </Modal>
    </div>
  );
}
