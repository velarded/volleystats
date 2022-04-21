import { faLeftLong, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Scoreboard.module.css';

export default function Scoreboard(props) {
    return (
        <div className={styles.scoreboard}>
            <div className={styles.teamOneInfo}>
                <h2 className={styles.teamName}>Team A</h2>
                <h1 className={styles.teamPoints}>04</h1>
            </div>
            <div className={styles.btnContainer}>
                <button className={`${styles.plusOneBtn} ${styles.leftBtn}`}>
                <FontAwesomeIcon
                    className={styles.matchMenuIcon}
                    icon={faLeftLong}
                />
                    <span>+1</span>
                </button>
                <button className={`${styles.plusOneBtn} ${styles.rightBtn}`}>
                    <span>+1</span>
                    <FontAwesomeIcon
                        className={styles.matchMenuIcon}
                        icon={faRightLong}
                    />
                </button>
                <button className={styles.undoBtn}>Undo</button>
            </div>
            <div className={styles.teamTwoInfo}>
                <h2 className={styles.teamName}>Team B</h2>
                <h1 className={styles.teamPoints}>02</h1>
            </div>
        </div>
    )
};