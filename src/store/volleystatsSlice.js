import { createSlice } from "@reduxjs/toolkit";

// User Slice
const initialState = { name: "Danica", email: "danica@test.com" };

const volleystatsSlice = createSlice({
  name: "volleystats",
  initialState: initialState,
  reducers: {},
});

export const volleystatsActions = volleystatsSlice.actions;

export default volleystatsSlice;
