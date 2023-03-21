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

    const matchId = props.matchId ? props.matchId : "";
    const team = props.team ? props.team : {};
    const players = props.players ? props.players : [];
    const stats = props.stats ? props.stats : [];
    const [teamMatchStats, setTeamMatchStats] = useState([]);
    const statRows = [];

    useEffect(() => {
        setTeamMatchStats(stats);
        console.log('table stats: ', stats);
        const fetchData = async() => {
            if(team.id) {
                console.log('matchId: ', matchId, 'teamId: ', team.id);
            }
        };

        fetchData();
    }, [uid, matchId, team.id, stats]);

    const addRowHandler = async (event) => {
        console.log('add new match player stat row');
        console.log('match: ', props.match);
        const newStat = { matchId: matchId, teamId: team.id, playerId: players[0] ? players[0].id : '', contactType: CONTACT_TYPES[0], qualityType: QUALITY_TYPES[0], insertTime: new Date()};
        props.onMatchStatAdd(newStat);
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

    const rowUpdateHandler = (stat, index) => {
        console.log('rowUpdateHandler()');
        props.onMatchStatUpdate(stat, index);
    };

    teamMatchStats.forEach(matchStat => {
        statRows.push(<MatchStatRow key={matchStat.index} index={matchStat.index} matchStatRow={matchStat} players={players} onRowUpdate={rowUpdateHandler} onDelete={props.onMatchStatDelete}/>);
    });

    return (
        <div className={styles.tableContainer}>
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
                        <td colSpan="6">
                            <div className={styles.newRowBtn}>
                                <button onClick={addRowHandler}>New Entry</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};