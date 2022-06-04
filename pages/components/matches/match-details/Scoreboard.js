import { faLeftLong, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styles from './Scoreboard.module.css';

export default function Scoreboard(props) {
    const teamOne = props.teamOne ? props.teamOne : {};
    const teamTwo = props.teamTwo ? props.teamTwo : {};
    const matchStats = props.matchStats ? props.matchStats : [];
    const teamOneStats = matchStats.filter(matchStat => matchStat.teamId === teamOne.id && matchStat.pointScored);
    const teamTwoStats = matchStats.filter(matchStat => matchStat.teamId === teamTwo.id && matchStat.pointScored);

    const teamOnePoints = teamOneStats.length;
    const teamTwoPoints = teamTwoStats.length;

    return (
        <div className={styles.scoreboard}>
            <div className={styles.teamOneInfo}>
                <h2 className={styles.teamName}>{teamOne.teamName}</h2>
                <h1 className={styles.teamPoints}>{teamOnePoints}</h1>
            </div>
            <div className={styles.teamTwoInfo}>
                <h2 className={styles.teamName}>{teamTwo.teamName}</h2>
                <h1 className={styles.teamPoints}>{teamTwoPoints}</h1>
            </div>
        </div>
    )
};