import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllPlayersForCurrentUser, getPlayersByIds, getTeamById } from "../../../../lib/firestore/reads";
import styles from '../../../../styles/Forms.module.css';

export default function AddPlayerToTeamForm(props) {
    const teamId = props.teamId;
    const uid = useSelector((state) => state.currentUser.userId);
    const [newTeamPlayerId, setNewTeamPlayerId] = useState("");
    const [teamPlayersOptions, setTeamPlayersOptions] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const team = await getTeamById(uid, teamId);
            const currentTeamPlayers = await getPlayersByIds(uid, team.players);
            console.log('currentTeamPlayers', currentTeamPlayers);
            const currentTeamPlayersIds = currentTeamPlayers.map(c => c.id);
            const players = await getAllPlayersForCurrentUser(uid);
            const playerOptions = players.filter(p => !currentTeamPlayersIds.includes(p.id));
            setTeamPlayersOptions(playerOptions);
            if (playerOptions.length > 0) {
                setNewTeamPlayerId(playerOptions[0].id);
            }
        };
        fetchData();
    }, [teamId, uid]);

    const onInputChange = (event) => {
        const fieldValue = event.target.value;
        setNewTeamPlayerId((prevState) => {
            const state = fieldValue;
            return state;
        });
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const newTeamPlayer = teamPlayersOptions.find(p => p.id === newTeamPlayerId);
        props.onFormClose(newTeamPlayer);
    };

    const teamPlayersOptionsElement = [];
    teamPlayersOptions.forEach(teamPlayersOption => {
        teamPlayersOptionsElement.push(<option value={teamPlayersOption.id}>{teamPlayersOption.firstName} {teamPlayersOption.lastName}</option>)
    });

    return (
        <form className={styles.form} onSubmit={onSubmitHandler}>
        <label className={styles.label}>Players</label>
        <select name="teamPlayerSelected" onChange={onInputChange} required>
            {teamPlayersOptionsElement}
        </select>

        <div className={styles.formFooter}>
            <button className={styles.createBtn} type="submit">Create</button>
        </div>
    </form>
    );
}