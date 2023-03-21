import { faChartColumn, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../shared/card/Card";
import styles from './MatchSetCard.module.css';
import { useRouter } from 'next/router';

export default function MatchCard(props) {
    const router = useRouter();

    const onClickHandler = () => {
        router.push('/match-sets/' + props.id);
    };

    const matchSetStatsClickHandler = () => {

    };

    return (
        <Card onClick={onClickHandler} className={styles.matchCard}>
            <div className={styles.nameContainer}>
                <h2>{props.matchName}</h2>
            </div>
            <FontAwesomeIcon
                className={styles.matchMenuIcon}
                icon={faEllipsisVertical}
            />
            <div className={styles.matchTealDetail}>
                <span className={styles.teamOne}>{props.teamOne}</span>
                <span className={styles.versus}>VS</span>
                <span className={styles.teamTwo}>{props.teamTwo}</span>
            </div>
            <div className={styles.matchDate}>
            <FontAwesomeIcon
                className={styles.statsIcon}
                icon={faChartColumn}
                onClick={matchSetStatsClickHandler}
                />
            </div>
        </Card>
    )
}