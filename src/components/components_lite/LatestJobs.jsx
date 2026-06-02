import React from "react";
import JobCards from "./JobCards";
const RandomJobs = [1,2,3,4,5,6,7,8,9,10]
// import { useSelector } from "react-redux";

const LatestJobs = () => {
  // const allJobs = useSelector((state) => state.jobs?.allJobs || []); // Safely access allJobs

  return (
    <div className="max-w-7xl mx-auto my-20 ">
      <h2 className="text-4xl font-bold text-center">
        <span className="text-[#6A38C2] ">Latest & Top </span>Job Openings
      </h2>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5 place-items-center">
        {RandomJobs.slice(0,6).map((job, index) => (
            <JobCards/>
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;