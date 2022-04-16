import Card from '../shared/card/Card';
import styles from './TeamCard.module.css';
import {useRouter} from 'next/router';

export default function TeamCard(props) {
    const router = useRouter()
    const team = props.team;

    const cardOnClick= () => {
        console.log('team card clicked', team.teamName);
        router.push('/teams/' + team.id);
    };

    return (
        <Card onClick={cardOnClick}>
            <div className={styles.teamNameContainer}>
                <h2>{team.teamName}</h2>
                <p>{team.numOfPlayers} Players</p>
            </div>
        </Card>
    );
};