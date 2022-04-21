import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addNewMatch } from '../../../lib/firestore/writes';
import { getTeams } from '../../../lib/firestore/reads';
import formStyles from '../../../styles/Forms.module.css';
import styles from './NewMatchForm.module.css'

export default function NewMatchForm(props) {
    const [teamOneOptions, setTeamOneOptions] = useState([]);
    const [teamTwoOptions, setTeamTwoOptions] = useState([]);
    const [teamOneSelected, setTeamOneSelected] = useState("");
    const [teamTwoSelected, setTeamTwoSelected] = useState("");
    const [matchName, setMatchName] = useState("");
    const [matchDate, setMatchDate] = useState(new Date());
    const uid = useSelector((state) => state.currentUser.userId);

    const teamOneOptionsElement = [];
    const teamTwoOptionsElement = [];

    useEffect(() => {
        async function fetchData() {
            const teams = await getTeams(uid);
            setTeamOneOptions(teams);
            setTeamTwoOptions(teams);
            if (teams.length >= 2) {
                setTeamOneSelected(teams[0].id);
                setTeamTwoSelected(teams[1].id);
            }
        };
        fetchData();
    }, [uid]);

    teamOneOptions.forEach(teamOneOption => {
        teamOneOptionsElement.push(<option value={teamOneOption.id}>{teamOneOption.teamName}</option>)
    });

    teamTwoOptions.forEach(teamTwoOption => {
        teamTwoOptionsElement.push(<option value={teamTwoOption.id}>{teamTwoOption.teamName}</option>)
    });

    const onSelectInputChange = (event) => {
        console.log('onSelectInputChange', event.target.name);
        const name = event.target.name;
        const value = event.target.value;
        if (name === 'teamOne') {
            setTeamOneSelected(value);
        } else if (name === 'teamTwo') {
            setTeamTwoSelected(value);
        }
    };

    const onTextInputChange = (event) => {
        setMatchName(event.target.value);
    };

    const onDateInputChange = (event) => {
        const [year, month, day] = event.target.value.split('-');
        console.log(event.target.value);
        const value = new Date();
        value.setUTCFullYear(year);
        value.setUTCMonth(month - 1);
        value.setUTCDate(day);
        console.log(value);
        setMatchDate(value);
    };

    const onSubmitHandler = async(event) => {
        event.preventDefault();
        if (teamOneSelected !== teamTwoSelected) {
            const newMatchDetails = {matchName, matchDate, teamOneId: teamOneSelected, teamTwoId: teamTwoSelected, uid};
            const newMatchId = await addNewMatch(newMatchDetails);
            props.onFormClose({...newMatchDetails, id: newMatchId, teamOne: teamOneOptions.find(t => t.id = teamOneSelected), teamTwo: teamTwoOptions.find(t => t.id === teamTwoSelected)});
        }
    }
    
    return (
        <form className={styles.formContainer} onSubmit={onSubmitHandler}>
            <div className={`${styles.flexCol} ${styles.matchNameField}`}>
                <label className={formStyles.label}>Match Name</label>
                <input className={formStyles.input} type="text" name="matchName" onChange={onTextInputChange} required/>
            </div>
            <div className={styles.flexCol}>
                <label className={formStyles.label}>Select Team #1</label>
                <select value={teamOneSelected} className={formStyles.select} name="teamOne" onChange={onSelectInputChange} required>
                    {teamOneOptionsElement}
                </select>
            </div>
            <div className={styles.flexCol}>
                <label className={formStyles.label}>Select Team #2</label>
                <select value={teamTwoSelected} className={formStyles.select} name="teamTwo" onChange={onSelectInputChange} required>
                    {teamTwoOptionsElement}
                </select>
            </div>
            <div className={`${styles.flexCol} ${styles.dateField}`}>
                <label className={formStyles.label}>Match Date</label>
                <input className={formStyles.input} type="date" name="matchDate" onChange={onDateInputChange} required/>
            </div>
            <button className={`${formStyles.createBtn} ${styles.newMatchBtn}`} type="submit">Create New Match</button>
        </form>
    )
};