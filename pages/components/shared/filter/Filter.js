import styles from './Filter.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Filter(props) {
    return (
        <div className={styles.filterContainer}>
        <FontAwesomeIcon
          className={styles.filterIcon}
          icon={faSliders}
        />
        <input className={styles.searchInput} type="text" />
        <FontAwesomeIcon
          className={styles.searchIcon}
          icon={faMagnifyingGlass}
        />

        <button className={styles.newEntityButton} onClick={props.onAddBtnClick}>
            <FontAwesomeIcon
                className={styles.addIcon}
                icon={faPlus}
            />
            <span>{props.newBtnLabel}</span>
        </button>
    </div>
    );
};