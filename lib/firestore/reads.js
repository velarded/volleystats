import { db } from "../../src/config/firebase.config";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore"; 

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