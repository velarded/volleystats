import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addNewMatchSet } from '../../../lib/firestore/writes';
import { getAllTeamsForCurrentUser } from '../../../lib/firestore/reads';
import formStyles from '../../../styles/Forms.module.css';
import styles from './NewMatchSetForm.module.css'

export default function NewMatchForm(props) {
    const [teamOptions, setTeamOptions] = useState([]);
    const [teamSelected, setTeamSelected] = useState("");
    const [matchSetName, setMatchName] = useState("");
    const uid = useSelector((state) => state.currentUser.userId);

    const teamOptionsElement = [];

    useEffect(() => {
        async function fetchData() {
            const teams = await getAllTeamsForCurrentUser(uid);
            setTeamOptions(teams);
            if (teams.length >= 1) {
                setTeamSelected(teams[0].id);
            }
        };
        fetchData();
    }, [uid]);

    teamOptions.forEach(teamOneOption => {
        teamOptionsElement.push(<option value={teamOption.id}>{teamOption.teamName}</option>)
    });

    const onSelectInputChange = (event) => {
        console.log('onSelectInputChange', event.target.name);
        const name = event.target.name;
        const value = event.target.value;
        if (name === 'team') {
            setTeamSelected(value);
        }
    };

    const onTextInputChange = (event) => {
        setMatchName(event.target.value);
    };

    const onSubmitHandler = async(event) => {
        event.preventDefault();
        const newMatchSetDetails = {matchSetName, matchDate, teamId: teamSelected};
        const newMatchSetId = await addNewMatchSet(uid, newMatchSetDetails);
        props.onFormClose({...newMatchSetDetails, id: newMatchSetId, team: teamOptions.find(t => t.id = teamSelected)});
    }
    
    return (
        <form className={styles.formContainer} onSubmit={onSubmitHandler}>
            <div className={`${styles.flexCol} ${styles.matchSetNameField}`}>
                <label className={formStyles.label}>Match Set Name</label>
                <input className={formStyles.input} type="text" name="matchSetName" onChange={onTextInputChange} required/>
            </div>
            <div className={styles.flexCol}>
                <label className={formStyles.label}>Select Team #1</label>
                <select value={teamSelected} className={formStyles.select} name="team" onChange={onSelectInputChange} required>
                    {teamOptionsElement}
                </select>
            </div>
            <button className={`${formStyles.createBtn} ${styles.newMatchSetBtn}`} type="submit">Create New Match Set</button>
        </form>
    )
};