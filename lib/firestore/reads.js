import firebaseConfig, { db } from "../../src/config/firebase.config";
import { collection, getDocs, query, orderBy, where, getDoc, setDoc, doc, FieldPath } from "firebase/firestore"; 

// ==================== Users ====================
export const getUserById = async(uid) => {
    const user = (await getDoc(doc(db, 'users', uid))).data();
    return user;
};

// ==================== Players ====================
export const getAllPlayersForCurrentUser = async(uid) => {
    const playersRef = collection(db, "users", uid, 'players');
    console.log('playersRef', playersRef);

    const players = (await getDocs(
            query(
                playersRef,
                orderBy('firstName', 'asc')
            ),
        )).docs.map((docSnap) => ({id: docSnap.id, ...docSnap.data()}));

    console.log('players: ', players);
    return players;
}

export const getPlayersByIds = async(uid, playerIds) => {
    if (!playerIds) {
        return [];
    }
    const allPlayers = await getAllPlayersForCurrentUser(uid);
    const players = allPlayers.filter(player => playerIds.includes(player.id));
    return players;
};

const getPlayersByUidAndPlayerIds = async(uid, playerIds) => {
    const playersRef = collection(db, "players");
    const q = query(playersRef, where('uid', '==', uid), orderBy("firstName"));

    const playersData = await queryPlayersCollection(q);
    const players = [];
    playerIds.forEach(playerId => {
        const player = playersData.find(p => p.id === playerId);
        players.push(player);
    })
    return players;
};

const queryPlayersCollection = async(q) => {
    const players = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const playerData = {...doc.data(), id: doc.id}
        players.push(playerData);
    });
    console.log('finish fetch players:', players);
    return players;
};
// ==================== Teams ====================

export const getAllTeamsForCurrentUser = async(uid) => {
    const teamsRef = collection(db, "users", uid, 'teams');
    console.log('teamsRef', teamsRef);

    const teams = (await getDocs(
            query(
                teamsRef,
                orderBy('teamName', 'asc'),
            ),
        )).docs.map((docSnap) => mapTeamData(docSnap));

    console.log('teams: ', teams);
    return teams;
}

const mapTeamData = (teamDocSnap) => {
    console.log('teamDocSnap', teamDocSnap)
    const teamData = teamDocSnap.data();
    console.log('teamData', teamData);
    const team = {id: teamDocSnap.id, ...teamData }
    console.log(team);
    return team;
};

export const getTeamById = async(uid, teamId) => {
    const teamDoc = (await getDoc(doc(db, 'users', uid, 'teams', teamId)));
    return mapTeamData(teamDoc);
};

export const getTeamByIds = async(uid, teamIds) => {
    const teamsData = await getAllTeamsForCurrentUser(uid);

    const teams = [];
    teamIds.forEach(teamId => {
        const team = teamsData.find(t => t.id === teamId);
        teams.push(team);
    })
    return teams;
};

const queryTeamsCollection = async(q) => {
    const teams = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const teamData = {...doc.data(), id: doc.id}
        teams.push(teamData);
    });
    console.log('finish fetch teams:', teams);
    return teams;
};

// Matches Collection
export const getMatches = async(uid) => {
    const matchesRef = collection(db, 'users', uid, "matches");

    const matchesData = (await getDocs(
        query(
            matchesRef,
            orderBy('matchName', 'asc'),
        ),
    )).docs.map((docSnap) => mapMatchData(docSnap));
    
    console.log('matchesData', matchesData);
    const teamOneIds = matchesData.map(m => m.teamOneId);
    const teamTwoIds = matchesData.map(m => m.teamTwoId);
    const teamIds = [...new Set(teamOneIds.concat(teamTwoIds))];
    console.log('teamIds', teamIds);

    const teams = await getTeamByIds(uid, teamIds);
    console.log('teams', teams);
    const matches = matchesData.map(matchData => {
        matchData.teamOne = teams.find(t => t.id === matchData.teamOneId);
        matchData.teamTwo = teams.find(t => t.id === matchData.teamTwoId);
        return matchData;
    });

    console.log('matches', matches);
    return matches;
};

const convertFirestoreTimestampToDate = (firestoreTimestamp) => {
    const fireBaseTime = new Date(
        firestoreTimestamp.seconds * 1000 + firestoreTimestamp.nanoseconds / 1000000,
    );
    
    return fireBaseTime; 
}

export const getMatchById = async(uid, matchId) => {
    const matchDoc = (await getDoc(doc(db, 'users', uid, 'matches', matchId)));
    return mapMatchData(matchDoc);
};

const mapMatchData = (docSnap) => {
    return {id: docSnap.id, ...docSnap.data()};
};

// export const getMatchById = async(uid, matchId) => {
//     const matches = await getMatches(uid);
//     const match = matches.find(m => m.id === matchId);
//     return match;
// }

// Match Collection




// example read getDoc
// (await getDoc(doc(db, 'forum', schoolID))).data()

// (await getDocs(
//     query(
//         collection(db, 'add-dorm'),
//         orderBy('date', 'desc'),
//         where('uid', '==', userData.uid),
//     ),
// )).docs.map((docSnap) => ({id: docSnap.id, ...docSnap.data()}));
