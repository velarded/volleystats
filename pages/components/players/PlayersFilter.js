import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PlayersFilter.module.css'
import { faSliders, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function PlayersFilter(props) {
    return (
    <div className={styles.filterContainer}>
        <FontAwesomeIcon
          className={styles.filterIcon}
          icon={faSliders}
        />
        <input className={styles.playersSearchInput} type="text" />
        <FontAwesomeIcon
          className={styles.playersSearchIcon}
          icon={faMagnifyingGlass}
        />

        <button className={styles.newPlayerButton}>
            <FontAwesomeIcon
                className={styles.addPlayerIcon}
                icon={faPlus}
            />
            <span>New Player</span>
        </button>
    </div>);
};