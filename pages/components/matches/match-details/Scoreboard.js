import { faLeftLong, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styles from './Scoreboard.module.css';

export default function Scoreboard(props) {
    const teamOne = props.teamOne;
    const teamTwo = props.teamTwo;
    const [pointsHistory, setPointsHistory] = useState([]);
    const [teamOnePoints, setTeamOnePoints] = useState(0);
    const [teamTwoPoints, setTeamTwoPoints] = useState(0);
    
    useEffect(() => {
        const propsPointHistory = props.pointsHistory;
        const pointHistoryLength = propsPointHistory.length;
        if (pointHistoryLength > 0) {
            setPointsHistory(propsPointHistory);
            setTeamOnePoints(propsPointHistory[pointHistoryLength - 1].teamOnePoints);
            setTeamTwoPoints(propsPointHistory[pointHistoryLength - 1].teamTwoPoints);
        }
    }, [props.pointsHistory]);

    const teamOnePointScore = async() => {
        const newTeamOnePoints = teamOnePoints + 1;
        const newPointHistory = { teamOnePoints: newTeamOnePoints, teamTwoPoints };
        console.log('newPointHistory', newPointHistory);
        await props.onPointsUpdate([...pointsHistory, newPointHistory]);

        // update states
        setTeamOnePoints(newTeamOnePoints);
    };

    const teamTwoPointScore = async() => {
        const newTeamTwoPoints = teamTwoPoints + 1;
        const newPointHistory = { teamOnePoints, teamTwoPoints: newTeamTwoPoints };
        console.log('newPointHistory', newPointHistory);
        await props.onPointsUpdate([...pointsHistory, newPointHistory]);

        setTeamTwoPoints(newTeamTwoPoints);
    };

    const undoHandler = async() => {
        if (pointsHistory.length === 0)
            return;
        
        const newPointsHistory = [...pointsHistory];
        newPointsHistory.pop();

        // DB call
        await props.onPointsUpdate(newPointsHistory);

        if (newPointsHistory.length > 1) {
            const lastItem = newPointsHistory.length - 1;
            setTeamOnePoints(newPointsHistory[lastItem].teamOnePoints);
            setTeamTwoPoints(newPointsHistory[lastItem].teamTwoPoints);
        } else {
            setTeamOnePoints(0);
            setTeamTwoPoints(0);
        }
    };

    return (
        <div className={styles.scoreboard}>
            <div className={styles.teamOneInfo}>
                <h2 className={styles.teamName}>{teamOne.teamName}</h2>
                <h1 className={styles.teamPoints}>{teamOnePoints}</h1>
            </div>
            <div className={styles.btnContainer}>
                <button className={`${styles.plusOneBtn} ${styles.leftBtn}`} onClick={teamOnePointScore}>
                <FontAwesomeIcon
                    className={styles.matchMenuIcon}
                    icon={faLeftLong}
                />
                    <span>+1</span>
                </button>
                <button className={`${styles.plusOneBtn} ${styles.rightBtn}`} onClick={teamTwoPointScore}>
                    <span>+1</span>
                    <FontAwesomeIcon
                        className={styles.matchMenuIcon}
                        icon={faRightLong}
                    />
                </button>
                <button className={styles.undoBtn} onClick={undoHandler}>Undo</button>
            </div>
            <div className={styles.teamTwoInfo}>
                <h2 className={styles.teamName}>{teamTwo.teamName}</h2>
                <h1 className={styles.teamPoints}>{teamTwoPoints}</h1>
            </div>
        </div>
    )
};