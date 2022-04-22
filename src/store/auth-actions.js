import { async } from "@firebase/util";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getUserById } from "../../lib/firestore/reads";
import { addNewUser } from "../../lib/firestore/writes";
import { auth } from "../config/firebase.config";
import { currentUserActions } from "./currentUser-slice";

const provider = new GoogleAuthProvider();

export const login = () => {
  return async (dispatch) => {
    console.log("called login authactions");
    try {
      const response = await signInWithPopup(auth, provider);
      console.log(response);
      const payload = {
        name: response.user.displayName,
        email: response.user.email,
        token: response.user.accessToken,
        userId: response.user.uid,
        photoUrl: response.user.photoURL,
      };
      console.log(payload);
      await checkIfFirstTimeUser(payload.userId, payload.name);
      dispatch(currentUserActions.setCurrentUser(payload));
    } catch (error) {
      console.log("Error with login", error);
      dispatch(currentUserActions.unsetCurrentUser());
    }
  };
};

const checkIfFirstTimeUser = async(userId, displayName) => {
  const userExistsInDb = await getUserById(userId);
  console.log(userExistsInDb);
  if (!userExistsInDb) {
    console.log('First time user. adding record to DB')
    await addNewUser(userId, displayName);
  }
}

export const logout = () => {
  return async (dispatch) => {
    await auth.signOut();
    dispatch(currentUserActions.unsetCurrentUser());
  };
};
