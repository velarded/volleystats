import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PlayerStat.module.css';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function PlayerStat(props) {
    const statName = props.statName;
    const endOfSection = props.endOfSection;
    const statCount = props.statCount ? props.statCount : 0;

    return (
        <div className={styles.playerStat}>
            <h3 className={styles.statName}>{statName}</h3>
            <div className={styles.statControl}>
                <button className={styles.minusBtn}>
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className={styles.statCount}>{statCount}</span>
                <button className={styles.plusBtn}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            {endOfSection && <div className={styles.lineDivider}></div>}
        </div>
    )
};