import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./currentUser-slice";
import volleystatsSlice from "./volleystatsSlice";

const store = configureStore({
  reducer: {
    currentUser: currentUserSlice.reducer,
    volleystats: volleystatsSlice.reducer,
  },
});

export default store;
