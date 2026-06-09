import React from 'react'
import Navbar from './Navbar'
import FilterCard from './FilterCard'
import Job1 from './Job1.jsx'
import { useSelector } from 'react-redux'
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = (job) => {
  useGetAllJobs();
  const {allJobs} = useSelector((store) => store.job);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>

          {allJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (<div className="flex-1 h-[88vh] overflow-y-scroll pb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4 ">
            {allJobs.map((job) => <div key={job._id}> <Job1 job={job} /></div>)}
          </div></div>)
          }
        </div>
      </div>
    </div>
  )
}

export default Jobs
