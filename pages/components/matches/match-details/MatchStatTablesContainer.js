import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMatchStats, getPlayersByIds, getTeamById } from "../../../../lib/firestore/reads";
import { addNewStat, deleteStat, updateStat } from "../../../../lib/firestore/writes";
import LineDivider from "./LineDivider";
import MatchTeamStatTable from "./MatchTeamStatTable";
import Scoreboard from "./Scoreboard";
import styles from './MatchStatTablesContainer.module.css'

export default function MatchStatTablesContainer(props) {
    const [matchStats, setMatchStats] = useState([]);
    const [teamOne, setTeamOne] = useState({});
    const [teamTwo, setTeamTwo] = useState({});
    const [teamOnePlayers, setTeamOnePlayers] = useState([]);
    const [teamTwoPlayers, setTeamTwoPlayers] = useState([]);
    const teamOneStats = [];
    const teamTwoStats = [];
    const matchId = props.matchId ? props.matchId : "";
    const teamOneId = props.teamOneId ? props.teamOneId : "";
    const teamTwoId = props.teamTwoId ? props.teamTwoId : "";
    const uid = useSelector((state) => state.currentUser.userId);
    
    useEffect(() => {
        async function fetchData() {
            if (matchId) {
                const matchStatsData = await getMatchStats(uid, matchId);
                setMatchStats(matchStatsData);
            }
            if (teamOneId) {
                const teamOneData = await getTeamById(uid, teamOneId);
                setTeamOne(teamOneData);
                const teamOnePlayersData = await getPlayersByIds(uid, teamOneData.players);
                setTeamOnePlayers(teamOnePlayersData);
            }
            if (teamTwoId) {
                const teamTwoData = await getTeamById(uid, teamTwoId);
                setTeamTwo(teamTwoData);
                const teamTwoPlayersData = await getPlayersByIds(uid, teamTwoData.players);
                setTeamTwoPlayers(teamTwoPlayersData);
            }
        };

        fetchData();
    }, [uid, matchId, teamOneId, teamTwoId]);

    const matchStatAddHandler = async(newStat) => {
        const id = await addNewStat(uid, newStat);
        setMatchStats((prevState) => {
            return [...prevState, {...newStat, id}];
        });
    };

    const matchStatUpdateHandler = async(updatedStat, index) => {
        console.log('updating stat: ', updatedStat, index);
        await updateStat(uid, updatedStat.id, updatedStat);
        setMatchStats((prevState) => {
            const updatedMatchStats = [...prevState];
            updatedMatchStats[index] = {...updatedStat, index};
            return updatedMatchStats;
        });        
    };
    
    const matchStatDeleteHandler = async(deleteStatId) => {
        console.log('deleting statId: ', deleteStatId);
        await deleteStat(uid, deleteStatId);
        setMatchStats((prevState) => {
            return prevState.filter(stat => stat.id !== deleteStatId);
        });   
    };

    for (let i = 0; i < matchStats.length; i++) {
        const matchStat = matchStats[i];
        if (matchStat.teamId === teamOneId) {
            teamOneStats.push({...matchStat, index: i});
        } else if (matchStat.teamId === teamTwoId) {
            teamTwoStats.push({...matchStat, index: i});
        }
    }

    return (
        <div className={styles.container}>
            <Scoreboard matchStats={matchStats} teamOne={teamOne} teamTwo={teamTwo}/>
            <div className={styles.tablesContainer}>
                <MatchTeamStatTable
                    matchId={matchId} 
                    team={teamOne} 
                    players={teamOnePlayers}
                    stats={teamOneStats} 
                    onMatchStatUpdate={matchStatUpdateHandler} 
                    onMatchStatAdd={matchStatAddHandler}
                    onMatchStatDelete={matchStatDeleteHandler}/>
                <LineDivider />
                <MatchTeamStatTable
                    matchId={matchId}
                    team={teamTwo} 
                    players={teamTwoPlayers}
                    stats={teamTwoStats} 
                    onMatchStatUpdate={matchStatUpdateHandler} 
                    onMatchStatAdd={matchStatAddHandler}
                    onMatchStatDelete={matchStatDeleteHandler}/>
            </div>
        </div>
    );
};