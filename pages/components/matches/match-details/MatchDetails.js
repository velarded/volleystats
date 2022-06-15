import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import mainStyles from '../../../../styles/Main.module.css';
import styles from './MatchDetails.module.css';

import { getMatchById } from '../../../../lib/firestore/reads';
import MatchStatTablesContainer from './MatchStatTablesContainer';

export default function MatchDetails(props) {
    const router = useRouter();    
    const { matchId } = router.query;
    const [match, setMatch] = useState({matchId, pointsHistory: [{teamOnePoints: 0, teamTwoPoints: 0}], matchStats: []});
    const uid = useSelector((state) => state.currentUser.userId);

    useEffect(() => {
        async function fetchData() {
            const match = await getMatchById(uid, matchId);
            console.log('match details: ', match);
            setMatch(match);
        };

        fetchData();
    }, [uid, matchId]);

    return (
        <div className={styles.matchDetailsContainer}>
            <h1 className={`${mainStyles['component-title']} ${styles.matchName}`}>{match.matchName}</h1> 
            <MatchStatTablesContainer matchId={matchId} teamOneId={match.teamOneId} teamTwoId={match.teamTwoId}/>
        </div>
    );
}