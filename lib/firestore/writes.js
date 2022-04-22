import { db } from "../../src/config/firebase.config";
import { collection, addDoc, doc } from "firebase/firestore"; 

// Users Collection
export const addNewUser = async(uid, displayName) => {
    const docRef = await addDoc(collection(db, 'users'), {uid, displayName}).catch(e => console.log('Error with adding new user: ', e));
    
    console.log("Created new user. ", docRef);
}

// Players Collection

export const addNewPlayer = async (newPlayer) => {
    const docRef = await addDoc(collection(db, 'players'), newPlayer).catch(e => console.log('Error with adding new player: ', e));
    
    console.log("Document written with ID: ", docRef);
    return docRef.id;
};

// Teams Collection
export const addNewTeam = async (newTeam) => {
    const docRef = await addDoc(collection(db, 'teams'), newTeam).catch(e => console.log('Error with adding new team: ', e));
    
    console.log("Document written with ID: ", docRef);
    return docRef.id;
};

// PlayerTeamsMapping Collection
export const addNewTeamPlayer = async (newTeamPlayer) => {
    const docRef = await addDoc(collection(db, 'playerTeamsMapping'), newTeamPlayer).catch(e => console.log('Error with adding new player to team: ', e));
    
    console.log("Document written with ID: ", docRef);
    return docRef.id;
};

// Matches Collection
export const addNewMatch = async (newMatch) => {
    const docRef = await addDoc(collection(db, 'matches'), newMatch).catch(e => console.log('Error with adding new match: ', e));
    
    console.log("Document written with ID: ", docRef);
    return docRef.id;
};


// example add
// setDoc(doc(db, 'reviews', review.id, 'hearts', userData.uid), {
//    reviewID: review.id,
//    uid: userData.uid 
// });

// example remove
// deleteDoc(doc(db, 'reviews', review.id, 'hearts', userData.uid));
