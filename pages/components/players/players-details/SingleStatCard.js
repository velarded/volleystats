import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChartCard from "../../shared/card/ChartCard";
import styles from './SingleStatCard.module.css';

export default function SingleStatCard(props) {
    return (
        <ChartCard className={styles.statCard}>
            <div className={styles.mainStat}>
                <FontAwesomeIcon className={styles.statIcon} icon={props.icon}/>
                <p className={styles.statMetric}>{props.statMetric}</p>
            </div>
            <p className={styles.statLabel}>{props.statLabel}</p>
            <p className={styles.bottomLabel}>{props.bottomLabel}</p>
        </ChartCard>
    )
};