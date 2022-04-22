import { db } from "../../src/config/firebase.config";
import { collection, getDocs, query, orderBy, where, getDoc, setDoc, doc } from "firebase/firestore"; 

// ==================== Users ====================
export const getUserById = async(uid) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where('uid', '==', uid));

    const users = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => users.push(doc.data()));
    return users.length === 1 ? users[0] : undefined;
};

// ==================== Players ====================
export const getPlayers = async(uid) => {
    console.log('getPlayers()', uid);
    const playersRef = collection(db, "players");
    const q = query(playersRef, where('uid', '==', uid), orderBy("firstName"));

    const players = await queryPlayersCollection(q);
    return players;
}

export const getPlayersByUIdAndTeamId = async(uid, teamId) => {
    const teamPlayerMappings = await readPlayerTeamsMappingByUIdAndTeamId(uid, teamId);
    console.log('teamPlayerMappings: ', teamPlayerMappings);
    const playerIds = teamPlayerMappings.map(mapping => mapping.playerId);
    console.log('playerIds: ', playerIds);
    const players = await getPlayersByUidAndPlayerIds(uid, playerIds);
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

export const getTeams = async(uid) => {
    console.log('getTeams()', uid);
    let teams = await readTeamsCollection(uid);
    const playerTeamMappings = await readPlayerTeamsMappingByUId(uid);

    console.log(playerTeamMappings);
    teams = teams.map(team => {
        const players = playerTeamMappings.filter(t => t.teamId === team.id);
        return {...team, numOfPlayers: players.length};
    });
    console.log('finish fetch teams:', teams);
    return teams;
}

export const getTeamById = async(uid, teamId) => {
    const teams = await getTeams(uid);
    const team = teams.find(t => t.id === teamId);
    return team;
};

export const getTeamByIds = async(uid, teamIds) => {
    const teamsRef = collection(db, "teams");
    const q = query(teamsRef, where('uid', '==', uid), orderBy("teamName"));

    const teamsData = await queryTeamsCollection(q);
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

const readTeamsCollection = async(uid) => {
    const teamsRef = collection(db, "teams");
    const q = query(teamsRef, where('uid', '==', uid), orderBy("teamName"));
    const teams = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const teamData = {...doc.data(), id: doc.id}
        teams.push(teamData);
    });
    return teams;
};


// PlayerTeamsMapping Collection 

const readPlayerTeamsMappingByUId = async(uid) => {
    const playerTeamsMappingRef = collection(db, "playerTeamsMapping");
    const q = query(playerTeamsMappingRef, where('uid', '==', uid));
    return readPlayerTeamsMapping(q);
};

const readPlayerTeamsMappingByUIdAndTeamId = async(uid, teamId) => {
    const playerTeamsMappingRef = collection(db, "playerTeamsMapping");
    const q = query(playerTeamsMappingRef, where('uid', '==', uid), where('teamId', '==', teamId));
    return readPlayerTeamsMapping(q);
};

const readPlayerTeamsMapping = async(query) => {
    const playerTeamsMapping = [];

    const querySnapshot = await getDocs(query);
    querySnapshot.forEach((doc) => {
        const playerTeamMappingData = {...doc.data(), id: doc.id}
        playerTeamsMapping.push(playerTeamMappingData);
    });

    return playerTeamsMapping;
}

// Matches Collection
export const getMatches = async(uid) => {
    const matchesRef = collection(db, "matches");
    const q = query(matchesRef, where('uid', '==', uid), orderBy('matchName'));
    const matchData = await readMatchesCollection(q);
    const teamOneIds = matchData.map(m => m.teamOneId);
    const teamTwoIds = matchData.map(m => m.teamTwoId);
    const teamIds = [...new Set(teamOneIds.concat(teamTwoIds))];

    const teams = await getTeamByIds(uid, teamIds);

    const matches = matchData.map(match => {
        const teamOne = teams.find(t => t.id === match.teamOneId);
        const teamTwo = teams.find(t => t.id === match.teamTwoId);
        return {...match, teamOne, teamTwo, matchDate: convertFirestoreTimestampToDate(match.matchDate)};
    });
    console.log('finish fetch matches:', matches);
    return matches;
};

const readMatchesCollection = async(query) => {
    const matches = [];

    const querySnapshot = await getDocs(query);
    querySnapshot.forEach((doc) => {
        const matchData = {...doc.data(), id: doc.id}
        matches.push(matchData);
    });

    return matches;
};

const convertFirestoreTimestampToDate = (firestoreTimestamp) => {
    const fireBaseTime = new Date(
        firestoreTimestamp.seconds * 1000 + firestoreTimestamp.nanoseconds / 1000000,
    );
    
    return fireBaseTime; 
}

export const getMatchById = async(uid, matchId) => {
    const matches = await getMatches(uid);
    const match = matches.find(m => m.id === matchId);
    return match;
}

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