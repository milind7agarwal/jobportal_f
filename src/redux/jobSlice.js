import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState :{
    allJobs: [],
  },
  reducers: {
    setAllJobs(state, action) {
      state.allJobs = action.payload; // Update state with fetched jobs
    },
  },
});

export const { setAllJobs } = jobSlice.actions;

export const jobReducer = jobSlice.reducer;

export default jobSlice.reducer;
