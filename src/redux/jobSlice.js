import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState :{
    allJobs: [],
    singleJob: null,
  },
  reducers: {
    setAllJobs(state, action) {
      state.allJobs = action.payload; // Update state with fetched jobs
    },
    setSingleJob(state, action) {
      state.singleJob = action.payload; // Update state with fetched single job
    },
  },
});

export const { setAllJobs, setSingleJob } = jobSlice.actions;

export const jobReducer = jobSlice.reducer;

export default jobSlice.reducer;
