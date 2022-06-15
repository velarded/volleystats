import { faChartColumn, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../shared/card/Card";
import styles from './MatchCard.module.css';
import { useRouter } from 'next/router';

export default function MatchCard(props) {
    const router = useRouter();
    const matchDate = new Date();
    const matchDateYear = matchDate.getFullYear();
    const matchDateMonth = matchDate.getMonth() + 1 >= 10 ? matchDate.getMonth() + 1: "0" + (matchDate.getMonth() + 1);
    const matchDateDay = matchDate.getDate() >= 10 ? matchDate.getDate(): "0" + matchDate.getDate();
    const matchDateString = matchDateYear + "/" + matchDateMonth + "/" + matchDateDay;
    
    const onClickHandler = () => {
        router.push('/matches/' + props.id);
    };

    const matchStatsClickHandler = () => {

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
                onClick={matchStatsClickHandler}
                />
            </div>
        </Card>
    )
}