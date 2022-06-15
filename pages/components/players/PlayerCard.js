import styles from './PlayerCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Card from '../shared/card/Card';
import {useRouter} from 'next/router';

export default function PlayerCard(props) {
  const router = useRouter();
  const id = props.id ? props.id : "";
  const positions = props.positions ? props.positions : [];
  const positionsLabel = positions.join(' / ');

  const playerStatsIconClickHandler = (event) => {
    console.log('player stats icon clicked');
    router.push('/players/' + id);
  };

  return (
    <Card>
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
          onClick={playerStatsIconClickHandler}
        />
    </Card>
  );
}
