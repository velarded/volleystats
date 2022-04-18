import Card from '../shared/card/Card';
import styles from './TeamCard.module.css';
import {useRouter} from 'next/router';

export default function TeamCard(props) {
    const router = useRouter()
    const team = props.team;
    const teamName = team ? team.teamName : "";
    const id = team ? team.id : "";
    const numOfPlayers = team ? team.numOfPlayers : 0;

    const cardOnClick= () => {
        router.push('/teams/' + id);
    };

    return (
        <Card onClick={cardOnClick}>
            <div className={styles.teamNameContainer}>
                <h2>{teamName}</h2>
                <p>{numOfPlayers} Players</p>
            </div>
        </Card>
    );
};