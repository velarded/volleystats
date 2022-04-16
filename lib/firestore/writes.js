import { db } from "../../src/config/firebase.config";
import { collection, addDoc } from "firebase/firestore"; 

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