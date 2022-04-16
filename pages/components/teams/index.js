import TeamCard from './TeamCard';
import styles from './Teams.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTeams } from '../../../lib/firestore/reads';
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
    console.log('players component');
    async function fetchData() {
      const teamsList = await getTeams(uid);
      setTeams(teamsList);
      console.log('Teams Component - Teams: ', teamsList);
    };
    fetchData();
  }, [uid]);

  const newTeamHandler = async(newTeam) => {
    console.log('newTeam: ', newTeam);
    setShowNewTeamModal(false);
    const newTeamId = await addNewTeam({...newTeam, uid: uid});
    console.log('new team response: ', newTeamId);
    
    setTeams([...teams, {...newTeam, numOfPlayers: 0}]);
  };

  teams.forEach((team) => {
    teamsListElement.push(<TeamCard team={team}/>);
  });

  return (
    <div className={styles.teamsContainer}>
      <h1 className={styles.teamsTitle}>Teams</h1>
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
