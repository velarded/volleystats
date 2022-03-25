import styles from './PlayerCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

export default function PlayerCard(props) {
  console.log(props.positions);
  const positionsLabel = props.positions.join(' / ');
  return (
    <div className={styles.playerCard}>
      <div className={styles.nameContainer}>
        <h2>{props.firstName}</h2>
        <h2>{props.lastName}</h2>
      </div>
      <FontAwesomeIcon
          className={styles.playerMenuIcon}
          icon={faEllipsisVertical}
        />
      <div><span className={styles.positionsText}>{positionsLabel}</span></div>
      <FontAwesomeIcon
          className={styles.statsIcon}
          icon={faChartColumn}
        />
    </div>
  );
}
