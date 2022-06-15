import { faCrosshairs, faHand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SingleStatCard from './SingleStatCard';
import styles from './SingleStats.module.css';

export default function SingleStats(props) {
    const touchIcon = faHand;
    const attackIcon = faCrosshairs;

    return (
        <div className={styles.singleStatsContainer}>
            <SingleStatCard icon={touchIcon} statMetric="77.3%" statLabel="Consistency" bottomLabel="107 Touches"/>
            <SingleStatCard icon={attackIcon} statMetric="0.2" statLabel="Consistency" bottomLabel="52 Total Attacks"/>
        </div>
    );
};