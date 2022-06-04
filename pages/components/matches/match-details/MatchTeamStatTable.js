import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addNewStat, deleteStat, updateStat } from '../../../../lib/firestore/writes';
import MatchStatRow from './MatchStatRow';
import styles from './MatchTeamStatTable.module.css';

export const CONTACT_TYPES = [
    "Attack",
    "Block",
    "Pass",
    "Receive",
    "Serve",
    "Set"
];

export const QUALITY_TYPES = [
    "Ace",
    "Kill",
    "Good",
    "Bad",
    "Error",
    "Touch",
    "Dig"
];

export default function MatchTeamStatTable(props) {
    const uid = useSelector((state) => state.currentUser.userId);

    const match = props.match ? props.match : {};
    const team = props.team ? props.team : {};
    const players = props.players ? props.players : [];
    const [teamMatchStats, setTeamMatchStats] = useState([]);
    const statRows = [];

    useEffect(() => {
        const fetchData = async() => {
            if(team.id) {
                console.log('matchId: ', match.id, 'teamId: ', team.id);
            }
        };

        fetchData();
    }, [uid, match.id, team.id]);

    const addRowHandler = async (event) => {
        console.log('add new match player stat row');
        console.log('match: ', props.match);
        const newStat = { matchId: match.id, teamId: team.id, playerId: players[0] ? players[0].id : '', contactType: CONTACT_TYPES[0], qualityType: QUALITY_TYPES[0], insertTime: new Date()};
        const statId = await addNewStat(uid, newStat);

        setTeamMatchStats((prevState) => [...prevState, {...newStat, id: statId}]);
    };

    const matchStatRowDeleteHandler = async(statId, index) => {
        console.log('MatchStatRow to delete: id=', statId, index);
        await deleteStat(uid, statId);
        setTeamMatchStats((prevState) => {
            prevState.splice(index, 1);
            console.log('prevState after: ', prevState);
            return [...prevState];
        });
    };

    const matchStatRowUpdate = async (stat, index) => {
        console.log(stat, index);
        await updateStat(uid, stat.id, stat);
        setTeamMatchStats((prevState) => {
            prevState[index] = stat;
            console.log('prevState after: ', prevState);
            return [...prevState];
        });
    };

    for(let i = 0; i < teamMatchStats.length; i++) {
        const stat = teamMatchStats[i];
        statRows.push(<MatchStatRow key={i} index={i} matchStatRow={stat} players={players} onRowUpdate={props.onMatchStatUpdate} onDelete={props.onMatchStatDelete}/>);
    }
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th></th>
                    <th>Player</th>
                    <th>Contact Type</th>
                    <th>Quality</th>
                    <th>Point</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {statRows}
                {/* <PlayerStatRow players={players} />
                <PlayerStatRow players={players} />
                <PlayerStatRow players={players} />
                <PlayerStatRow players={players} />
                <PlayerStatRow players={players} /> */}
                <tr>
                    <td colSpan="4">
                        <div className={styles.newRowBtn}>
                            <button onClick={props.onMatchStatAdd}>New Entry</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};