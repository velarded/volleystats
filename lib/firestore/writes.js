import { db } from "../../src/config/firebase.config";
import { collection, addDoc, doc, setDoc, updateDoc, arrayUnion, deleteDoc } from "firebase/firestore"; 

// Users Collection
export const addNewUser = async(uid, displayName) => {
    const usersRef = collection(db, 'users');
    await setDoc(doc(usersRef, uid), { displayName });
    console.log("Created new user.");
}

// Players Collection
export const addNewPlayer = async (newPlayer, uid) => {
    const docRef = await addDoc(collection(db, 'users', uid,'players'), newPlayer).catch(e => console.log('Error with adding new player: ', e));
    console.log("Document written with ID: ", docRef);
    return docRef.id;
};

// Teams Collection
export const addNewTeam = async (newTeam, uid) => {
    const docRef = await addDoc(collection(db, 'users', uid,'teams'), newTeam).catch(e => console.log('Error with adding new team: ', e));
    console.log("Document written with ID: ", docRef);
    return docRef.id;
};

export const updateTeam = async (teamId, player, uid) => {
    const teamRef = doc(db, 'users', uid, 'teams', teamId);
    await updateDoc(teamRef, {
        players: arrayUnion(player)
    });
};

// Matches Collection
export const addNewMatch = async (uid, newMatch) => {
    const docRef = await addDoc(collection(db, 'users', uid,'matches'), newMatch).catch(e => console.log('Error with adding new match: ', e));
    console.log("Document written with ID: ", docRef);
    return docRef.id;
};

export const updateTeamOneMatchStats = async (uid, matchId, teamOneStats) => {
    const matchRef = doc(db, 'users', uid, 'matches', matchId);
    await updateDoc(matchRef, {
        teamOneStats
    }); 
};

export const updateTeamTwoMatchStats = async (uid, matchId, teamTwoStats) => {
    const matchRef = doc(db, 'users', uid, 'matches', matchId);
    await updateDoc(matchRef, {
        teamTwoStats
    }); 
};

export const updateMatchPointsHistory = async (uid, matchId, pointsHistory) => {
    const matchRef = doc(db, 'users', uid, 'matches', matchId);
    await updateDoc(matchRef, {
        pointsHistory
    });
};

// Stats Collection
export const addNewStat = async (uid, newStat) => {
    const docRef = await addDoc(collection(db, 'users', uid, 'stats'), newStat).catch(e => console.log('Error with adding new stat: ', e));
    console.log("Document written with ID: ", docRef);
    return docRef.id;
};

export const updateStat = async (uid, statId, updatedStat) => {
    const statRef = doc(db, 'users', uid, 'stats', statId);
    await updateDoc(statRef, updatedStat);
};

export const deleteStat = async (uid, statId) => {
    const statRef = doc(db, 'users', uid, 'stats', statId);
    await deleteDoc(statRef);
};

// example add
// setDoc(doc(db, 'reviews', review.id, 'hearts', userData.uid), {
//    reviewID: review.id,
//    uid: userData.uid 
// });

// example remove
// deleteDoc(doc(db, 'reviews', review.id, 'hearts', userData.uid));
