import styles from './TeamDetail.module.css';
import mainStyles from '../../../../styles/Main.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPlayersByIds, getTeamById } from '../../../../lib/firestore/reads';
import TeamPlayerCard from './TeamPlayerCard';
import TeamDetailFilter from './TeamDetailFilter';
import AddPlayerToTeamForm from './AddPlayerToTeamForm';
import Modal from '../../shared/modal/Modal';
import { updateTeam } from '../../../../lib/firestore/writes';

export default function TeamDetail(props) {
    const router = useRouter(); // to grab teamId
    const [team, setTeam] = useState({});
    const [teamPlayers, setTeamPlayers] = useState([]);
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);

    const { teamId } = router.query;
    const uid = useSelector((state) => state.currentUser.userId);
    const teamPlayersListElement = [];

    useEffect(() => {
        async function fetchData() {
            // get team name
            const teamData = await getTeamById(uid, teamId);
            setTeam(teamData);

            // get players list
            const teamPlayersData = await getPlayersByIds(uid, teamData.players);
            setTeamPlayers(teamPlayersData);
        };
        fetchData();
    }, [uid, teamId]);

    const addPlayerToTeamHandler = async(newTeamPlayer) => {
        setShowAddPlayerModal(false);
        const newPlayersList = [...team.players, newTeamPlayer.id];
        await updateTeam(teamId, newTeamPlayer.id, uid);
        setTeamPlayers([...teamPlayers, newTeamPlayer]);
        setTeam((prevState) => {
            return {...prevState, players: newPlayersList};
        });

    };

    teamPlayers.forEach(teamPlayer => {
        teamPlayersListElement.push(<TeamPlayerCard teamPlayer={teamPlayer}/>)
    });

    return (
        <div className={styles.teamDetailContainer}>
            <h1 className={mainStyles['component-title']}>{team.teamName}</h1>
            <TeamDetailFilter openModal={() => setShowAddPlayerModal(true)}/>
            <div className={styles.teamPlayerListContainer}>
                {teamPlayersListElement}
            </div>
            <Modal show={showAddPlayerModal}
                onClose={() => setShowAddPlayerModal(false)}
                title='Add Player'>
                    <AddPlayerToTeamForm onFormClose={addPlayerToTeamHandler} teamId={teamId}/>
            </Modal>
        </div>
    );
};