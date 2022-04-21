import styles from './PlayerStatsCard.module.css';
import Card from "../../../shared/card/Card";
import PlayerStat from './PlayerStat';


export default function PlayerStatsCard(props) {
    return (
        <Card className={styles.card}>
            <h1 className={styles.playerName}>
                <p>Yu</p>
                <p>Nishinoya</p>
                <div className={styles.lineDivider}></div>
            </h1>
            <PlayerStat statName="Blocks" endOfSection={true}/>
            <PlayerStat statName="# of Spikes"/>
            <PlayerStat statName="Kills" endOfSection={true}/>
            <PlayerStat statName="# of Serves"/>
            <PlayerStat statName="Aces"/>
        </Card>
    )
};