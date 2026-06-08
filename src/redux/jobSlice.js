import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
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

// Named export for environments/bundlers that don't resolve default exports reliably
export const jobReducer = jobSlice.reducer;

export default jobSlice.reducer;
