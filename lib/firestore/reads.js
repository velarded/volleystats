import firebaseConfig, { db } from "../../src/config/firebase.config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  getDoc,
  setDoc,
  doc,
  FieldPath,
} from "firebase/firestore";

// ==================== Users ====================
export const getUserById = async (uid) => {
  const user = (await getDoc(doc(db, "users", uid))).data();
  return user;
};

// ==================== Players ====================
export const getAllPlayersForCurrentUser = async (uid) => {
  const playersRef = collection(db, "users", uid, "players");
  console.log("playersRef", playersRef);

  const players = (
    await getDocs(query(playersRef, orderBy("firstName", "asc")))
  ).docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));

  console.log("players: ", players);
  return players;
};

export const getPlayerById = async (uid, playerId) => {
  const playerDoc = await getDoc(doc(db, "users", uid, "players", playerId));
  return mapPlayerData(playerDoc);
};

export const getPlayersByIds = async (uid, playerIds) => {
  if (!playerIds) {
    return [];
  }
  const allPlayers = await getAllPlayersForCurrentUser(uid);
  const players = allPlayers.filter((player) => playerIds.includes(player.id));
  return players;
};

const mapPlayerData = (playerDocSnap) => {
  console.log("playerDocSnap", playerDocSnap);
  const playerData = playerDocSnap.data();
  console.log("playerData", playerData);
  const player = { id: playerDocSnap.id, ...playerData };
  console.log(player);
  return player;
};

// ==================== Teams ====================

export const getAllTeamsForCurrentUser = async (uid) => {
  const teamsRef = collection(db, "users", uid, "teams");
  console.log("teamsRef", teamsRef);

  const teams = (
    await getDocs(query(teamsRef, orderBy("teamName", "asc")))
  ).docs.map((docSnap) => mapTeamData(docSnap));

  console.log("teams: ", teams);
  return teams;
};

const mapTeamData = (teamDocSnap) => {
  console.log("teamDocSnap", teamDocSnap);
  const teamData = teamDocSnap.data();
  console.log("teamData", teamData);
  const team = { id: teamDocSnap.id, ...teamData };
  console.log(team);
  return team;
};

export const getTeamById = async (uid, teamId) => {
  const teamDoc = await getDoc(doc(db, "users", uid, "teams", teamId));
  return mapTeamData(teamDoc);
};

export const getTeamByIds = async (uid, teamIds) => {
  const teamsData = await getAllTeamsForCurrentUser(uid);

  const teams = [];
  teamIds.forEach((teamId) => {
    const team = teamsData.find((t) => t.id === teamId);
    teams.push(team);
  });
  return teams;
};

// Matches Collection
export const getMatchSets = async (uid) => {
  const matchSetsRef = collection(db, "users", uid, "matchSets");

  const matchSetsData = (
    await getDocs(query(matchSetsRef, orderBy("matchSetName", "asc")))
  ).docs.map((docSnap) => mapMatchSetData(docSnap));

  console.log("matchSetsData", matchSetsData);
  const teamIds = matchSetsData.map((m) => m.teamId);
  console.log("teamIds", teamIds);

  const teams = await getTeamByIds(uid, teamIds);
  console.log("teams", teams);
  const matchSets = matchSetsData.map((matchSetData) => {
    matchSetData.teamName = teams.find((t) => t.id === matchSetData.teamOneId);
    return matchSetData;
  });

  console.log("match sets", matchSets);
  return matchSets;
};

const convertFirestoreTimestampToDate = (firestoreTimestamp) => {
  const fireBaseTime = new Date(
    firestoreTimestamp.seconds * 1000 + firestoreTimestamp.nanoseconds / 1000000
  );

  return fireBaseTime;
};

export const getMatchById = async (uid, matchId) => {
  const matchDoc = await getDoc(doc(db, "users", uid, "matches", matchId));
  return mapMatchData(matchDoc);
};

const mapMatchData = (docSnap) => {
  return { id: docSnap.id, ...docSnap.data() };
};

// Stats Collection
export const getTeamMatchStats = async (uid, match, teamId) => {
  const statsRef = collection(db, "users", uid, "stats");
  console.log("statsRef", statsRef);

  const teamMatchStats = (
    await getDocs(
      query(
        statsRef,
        where("matchId", "==", match.id),
        where("teamId", "==", teamId),
        orderBy("insertTime", "asc")
      )
    )
  ).docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));

  console.log("teamMatchStats: ", teamMatchStats);
  return teamMatchStats;
};

// Stats Collection
export const getMatchStats = async (uid, matchId) => {
  const statsRef = collection(db, "users", uid, "stats");
  console.log("statsRef", statsRef);

  const matchStats = (
    await getDocs(
      query(
        statsRef,
        where("matchId", "==", matchId),
        orderBy("insertTime", "asc")
      )
    )
  ).docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));

  console.log("matchStats: ", matchStats);
  return matchStats;
};

export const getPlayerStats = async (uid, playerId) => {
  const statsRef = collection(db, "users", uid, "stats");
  console.log("statsRef", statsRef);

  const playerStats = (
    await getDocs(
      query(
        statsRef,
        where("playerId", "==", playerId),
        orderBy("insertTime", "asc")
      )
    )
  ).docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));

  console.log("playerStats: ", playerStats);
  return playerStats;
};

// Highlights Collection
export const getPlayerHighlights = async (uid, playerId, highlightType) => {
  const highlightsRef = collection(db, "users", uid, "highlights");

  console.log("uid", uid);
  console.log("playerId", playerId);
  console.log("highlightType", highlightType);

  const playerHighlights = (
    await getDocs(
      query(
        highlightsRef,
        where("playerId", "==", playerId),
        where("highlightType", "==", highlightType),
        orderBy("clipTitle", "asc")
      )
    )
  ).docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));

  console.log("playerHighlights: ", playerHighlights);
  return playerHighlights;
};

// Highlights Collection
export const getHighlights = async (uid) => {
  const highlightsRef = collection(db, "users", uid, "highlights");
  console.log("uid", uid);

  const highlights = (await getDocs(query(highlightsRef))).docs.map(
    (docSnap) => ({ id: docSnap.id, ...docSnap.data() })
  );

  console.log("highlights: ", highlights);
  return highlights;
};
// example read getDoc
// (await getDoc(doc(db, 'forum', schoolID))).data()

// (await getDocs(
//     query(
//         collection(db, 'add-dorm'),
//         orderBy('date', 'desc'),
//         where('uid', '==', userData.uid),
//     ),
// )).docs.map((docSnap) => ({id: docSnap.id, ...docSnap.data()}));
