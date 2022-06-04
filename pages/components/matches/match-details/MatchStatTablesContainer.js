import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMatchStats, getPlayersByIds, getTeamById } from "../../../../lib/firestore/reads";
import { addNewStat } from "../../../../lib/firestore/writes";
import LineDivider from "./LineDivider";
import MatchTeamStatTable from "./MatchTeamStatTable";
import Scoreboard from "./Scoreboard";

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

    const matchStatUpdateHandler = async(updatedStat) => {
        console.log('updating stat: ', updatedStat);
    };
    
    const matchStatDeleteHandler = async(deleteStatId) => {
        console.log('deleting statId: ', deleteStatId);
    };

    matchStats.forEach(matchStat => {
        if (matchStat.teamId === teamOneId) {
            teamOneStats.push(matchStat);
        } else if (matchStat.teamId === teamTwoId) {
            teamTwoStats.push(matchStat);
        }
    });

    return (
        <Fragment>
            <Scoreboard matchStats={matchStats} teamOne={teamOne} teamTwo={teamTwo}/>
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
                players={teamOnePlayers}
                stats={teamTwoStats} 
                onMatchStatUpdate={matchStatUpdateHandler} 
                onMatchStatAdd={matchStatAddHandler}
                onMatchStatDelete={matchStatDeleteHandler}/>
        </Fragment>
    );
};