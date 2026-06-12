import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState :{
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
  },
  reducers: {
    setAllJobs(state, action) {
      state.allJobs = action.payload; // Update state with fetched jobs
    },
    setSingleJob(state, action) {
      state.singleJob = action.payload; // Update state with fetched single job
    },
    setAllAdminJobs(state, action) {
      state.allAdminJobs = action.payload; // Update state with fetched admin jobs
    },
    setSearchJobByText(state, action) {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs(state, action) {
      state.allAppliedJobs = action.payload;
    },
  },
});

export const { setAllJobs, setSingleJob, setAllAdminJobs,setSearchJobByText, setAllAppliedJobs } = jobSlice.actions;

export const jobReducer = jobSlice.reducer;

export default jobSlice.reducer;
