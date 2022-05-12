import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import mainStyles from '../../../../styles/Main.module.css';
import styles from './MatchDetails.module.css';

import { getMatchById, getTeamById, getPlayersByIds } from '../../../../lib/firestore/reads';
import PlayerStatsCard from './player-stats/PlayerStatsCard';
import Scoreboard from './Scoreboard';
import LineDivider from './LineDivider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { updateMatchPointsHistory } from '../../../../lib/firestore/writes';
import PlayerStatTable from './PlayerStatTable';

export default function MatchDetails(props) {
    const router = useRouter();    
    const { matchId } = router.query;
    const [match, setMatch] = useState({pointsHistory: [{teamOnePoints: 0, teamTwoPoints: 0}]});
    const [teamOne, setTeamOne] = useState({});
    const [teamTwo, setTeamTwo] = useState({});
    const [teamOnePlayers, setTeamOnePlayers] = useState([]);
    const [teamTwoPlayers, setTeamTwoPlayers] = useState([]);
    const uid = useSelector((state) => state.currentUser.userId);

    useEffect(() => {
        async function fetchData() {
            const match = await getMatchById(uid, matchId);
            console.log('match details: ', match);
            setMatch(match);

            const teamOne = await getTeamById(uid, match.teamOneId);
            setTeamOne(teamOne);
            const teamTwo = await getTeamById(uid, match.teamTwoId);
            setTeamTwo(teamTwo);
            const teamOnePlayersData = await getPlayersByIds(uid, teamOne.players);
            console.log(teamOnePlayersData);
            setTeamOnePlayers(teamOnePlayersData);
            const teamTwoPlayersData = await getPlayersByIds(uid, teamTwo.players);
            setTeamTwoPlayers(teamTwoPlayersData);
            console.log(teamTwoPlayersData);
        };

        fetchData();
    }, [uid, matchId]);


    const pointsUpdateHandler = async(pointsHistory) => {
        // TODO: update in DB
        await updateMatchPointsHistory(uid, matchId, pointsHistory);
        // TODO: update match state
        setMatch((prevState) => {
            return {...prevState, pointsHistory }
        });
    };

    return (
        <div className={styles.matchDetailsContainer}>
            <h1 className={`${mainStyles['component-title']} ${styles.matchName}`}>{match.matchName}</h1> 
            <Scoreboard teamOne={teamOne} teamTwo={teamTwo} pointsHistory={match.pointsHistory} onPointsUpdate={pointsUpdateHandler}/>
            <div className={styles.btnContainer}>
                <button className={`${styles.resetBtn}`}><span>Reset</span></button>
                <button className={styles.saveBtn}>
                    <FontAwesomeIcon
                        className={styles.matchMenuIcon}
                        icon={faSave}
                    />
                    <span>Save</span>
                </button>
            </div>

            <div className={styles.teamOnePlayers}>
                <PlayerStatTable players={teamOnePlayers} match={match}/>
                {/* <PlayerStatsCard />
                <PlayerStatsCard />
                <PlayerStatsCard />
                <PlayerStatsCard />
                <PlayerStatsCard />
                <PlayerStatsCard /> */}
            </div>
            <LineDivider />
            <div className={styles.teamTwoPlayers}>
                <PlayerStatTable players={teamOnePlayers}/>
                {/* <PlayerStatsCard />
                <PlayerStatsCard />
                <PlayerStatsCard />
                <PlayerStatsCard />
                <PlayerStatsCard />
                <PlayerStatsCard /> */}
            </div>
        </div>
    );
}