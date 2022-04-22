import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PlayerStat.module.css';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export default function PlayerStat(props) {
    const statName = props.statName;
    const endOfSection = props.endOfSection;
    const [statCount, setStatCount] = useState(props.statCount ? props.statCount : 0);    

    const statCountBtnClicked = (point) => {
        if (statCount === 0 && point < 0) {
            return;
        }
        setStatCount(statCount + point);
    };

    return (
        <div className={styles.playerStat}>
            <h3 className={styles.statName}>{statName}</h3>
            <div className={styles.statControl}>
                <button className={styles.minusBtn} onClick={() => statCountBtnClicked(-1)}>
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className={styles.statCount}>{statCount}</span>
                <button className={styles.plusBtn} onClick={() => statCountBtnClicked(1)}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            {endOfSection && <div className={styles.lineDivider}></div>}
        </div>
    )
};