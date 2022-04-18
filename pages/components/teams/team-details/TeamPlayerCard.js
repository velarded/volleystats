import Card from '../../shared/card/Card';
import styles from './TeamPlayerCard.module.css';

export default function TeamPlayerCard (props) {
    const teamPlayer = props.teamPlayer ? props.teamPlayer : {};
    const positionsLabel = teamPlayer.positions.join(" / ");

    return (
        <Card>
            <div className={styles.nameContainer}>
                <h2>{teamPlayer.firstName}</h2>
                <h2>{teamPlayer.lastName}</h2>
            </div>
            <div>
                <span className={styles.positionsText}>{positionsLabel}</span>
            </div>
        </Card>
    );
};