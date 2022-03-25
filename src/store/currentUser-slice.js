import { createSlice } from "@reduxjs/toolkit";

// User Slice
const initialCurrentUserState = {
  name: "",
  email: "",
  token: "",
  userId: "",
  photoUrl: "",
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: initialCurrentUserState,
  reducers: {
    setCurrentUser(state, action) {
      console.log(action);

      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.photoUrl = action.payload.photoUrl;

      console.log(state.name);
    },
    unsetCurrentUser(state, action) {
      state.name = "";
      state.email = "";
      state.token = "";
      state.userId = "";
      state.photoUrl = "";
    },
  },
});

export const currentUserActions = currentUserSlice.actions;

export default currentUserSlice;
