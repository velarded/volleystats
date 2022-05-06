import Card from '../shared/card/Card';
import styles from './TeamCard.module.css';
import {useRouter} from 'next/router';

export default function TeamCard(props) {
    const router = useRouter()
    const team = props.team;
    const teamName = team ? team.teamName : "";
    const id = team ? team.id : "";
    let players = [];

    if (team && team.players) {
        players = team.players;
    }

    const cardOnClick= () => {
        router.push('/teams/' + id);
    };

    return (
        <Card key={id} onClick={cardOnClick} className={styles.teamCard}>
            <div className={styles.teamNameContainer}>
                <h2>{teamName}</h2>
                <p>{players.length} Players</p>
            </div>
        </Card>
    );
};