import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const LatestJobs = () => {
  useGetAllJobs();
  const allJobs = useSelector((state) => state.job?.allJobs || []);

  return (
    <div className="max-w-7xl mx-auto my-10 sm:my-20 px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
        <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 my-5 sm:my-8">
        {allJobs.length === 0 ? (
          <p className="text-slate-500 col-span-full text-center py-8">No jobs available</p>
        ) : (
          allJobs.slice(0, 6).map((job) =>
            job?._id ? (
              <JobCards key={job._id} job={job} />
            ) : null
          )
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
