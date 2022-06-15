import { Fragment, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import { getPlayerById, getPlayerStats } from "../../../../lib/firestore/reads";
import styles from './PlayerStatDetails.module.css';
import mainStyles from '../../../../styles/Main.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import PlayerRadar from "../../../dashboards/PlayerRadar";
import PlayerMatchStats from "./PlayerMatchStats";
import SingleStats from "./SingleStats";
import PlayerStatsBarGraph from "./PlayerStatsBarGraph";
import HighlightsCard from "./HighlightsCard";

export default function PlayerStatDetails(props) {
    const router = useRouter(); // to grab playerId
    const { playerId } = router.query;
    const [isLoading, setIsLoading] = useState(true);
    const [player, setPlayer] = useState({});
    const [playerStats, setPlayerStats] = useState([]);
    const uid = useSelector((state) => state.currentUser.userId);

    useEffect(() => {
        async function fetchData() {
            const playerData = await getPlayerById(uid, playerId);
            setPlayer(playerData);
            const playerStatsData = await getPlayerStats(uid, playerId);
            setPlayerStats(playerStatsData);
            setIsLoading(false);
        };

        fetchData();
    }, [uid, playerId]);

    return (
        <div className={styles.detailsContainer}>
            <nav className={styles.playerNav}>
                <ul>
                    <li><Link href="/players"><h1 className={`${mainStyles['component-title']} ${styles.playerTitle}`}>Players</h1></Link></li>
                    <li><FontAwesomeIcon className={styles.navArrow} icon={faAngleRight}/></li>
                    <li className={styles.playerName}>{player.firstName} {player.lastName}</li>
                </ul>
            </nav>
            {!isLoading && 
                <div className={styles.chartsContainer}>
                    <div className={styles.playerStatsContainer}>
                        <h2 className={`${mainStyles.statsSectionHeading} ${styles.performanceHeading}`}>Performance</h2>
                        <PlayerRadar playerStats={playerStats}/>
                        <SingleStats playerStats={playerStats} />
                        <PlayerStatsBarGraph playerStats={playerStats}/>
                    </div>
                    <PlayerMatchStats playerStats={playerStats} />
                </div>
            }
            {!isLoading &&
                <div className={styles.highlightsContainer}>
                    <h2 className={`${mainStyles.statsSectionHeading} ${styles.highlightsHeading}`}>Highlights Gallery</h2>
                    <HighlightsCard label="Attacks"/>
                    <HighlightsCard label="Serves"/>
                    <HighlightsCard label="Blocks & Digs"/>
                    <HighlightsCard label="Assists"/>
                </div>

            }
        </div>
    );
};