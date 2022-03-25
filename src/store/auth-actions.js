import { async } from "@firebase/util";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
      dispatch(currentUserActions.setCurrentUser(payload));
    } catch (error) {
      console.log("Error with login", error);
      dispatch(currentUserActions.unsetCurrentUser());
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    await auth.signOut();
    dispatch(currentUserActions.unsetCurrentUser());
  };
};
