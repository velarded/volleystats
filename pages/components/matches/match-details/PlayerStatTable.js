import { useState } from 'react';
import PlayerStatRow from './PlayerStatRow';
import styles from './PlayerStatTable.module.css';
const players = [
    { firstName: 'Danica', lastName: 'Velarde' },
    { firstName: 'Davis', lastName: 'Cruz' },
    { firstName: 'Carter', lastName: ' ' },
    { firstName: 'Lenette', lastName: 'S' },
    { firstName: 'Randall', lastName: 'Cruz' },
    { firstName: 'Romeo', lastName: 'Cruz' },
    { firstName: 'Katie', lastName: ' ' },
];
export default function PlayerStatTable(props) {
    const match = props.match ? props.match : {};
    const players = props.players ? props.players : [];
    const statRows = [];
    const [matchPlayerStats, setMatchPlayerStats] = useState([]);

    const addRowHandler = (event) => {
        console.log('add new match player stat row');
        setPlayerStats((prevState) => {
            return [...prevState, { matchId: match.id, teamId: '', playerId: '', contactType: '', qualityType: ''}];
        });
    };

    matchPlayerStats.forEach(stat => {
        statRows.push(<PlayerStatRow stat={stat} players={players}/>);
    });

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Contact Type</th>
                    <th>Quality</th>
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
                            <button onClick={addRowHandler}>New Entry</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};