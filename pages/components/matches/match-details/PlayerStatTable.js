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
    const [playerStats, setPlayerStats] = useState([]);
    const playerStatRows = [];

    const addRowHandler = (event) => {
        console.log('add new player stat row');
        setPlayerStats((prevState) => {
            return [...prevState, { playerId: '', contactType: '', qualityType: ''}];
        });
    };

    playerStats.forEach(playerStat => {
        playerStatRows.push(<PlayerStatRow playerStat={playerStat} players={players}/>);
    });

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Contact Type</th>
                    <th>Quality</th>
                </tr>
            </thead>
            <tbody>
                {playerStatRows}
                {/* <PlayerStatRow players={players} />
                <PlayerStatRow players={players} />
                <PlayerStatRow players={players} />
                <PlayerStatRow players={players} />
                <PlayerStatRow players={players} /> */}
                <tr>
                    <td colSpan="3">
                        <div className={styles.newRowBtn}>
                            <button onClick={addRowHandler}>New Entry</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};