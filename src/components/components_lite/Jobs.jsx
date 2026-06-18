import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./FilterCard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "../ui/button";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!searchedQuery || searchedQuery.trim() === "") {
      setFilterJobs(allJobs);
      return;
    }
    const query = searchedQuery.toLowerCase();
    const filteredJobs = allJobs.filter((job) =>
      job.title?.toLowerCase().includes(query) ||
      job.description?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query) ||
      job.experience?.toLowerCase().includes(query) ||
      job.salary?.toString().toLowerCase().includes(query)
    );
    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-3 sm:mt-5 px-3 sm:px-6 pb-8">
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <h1 className="text-lg font-bold text-slate-800">Browse Jobs</h1>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setShowFilters((v) => !v)}
          >
            {showFilters ? <X className="w-4 h-4" /> : <SlidersHorizontal className="w-4 h-4" />}
            {showFilters ? "Close" : "Filters"}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <aside className={`lg:w-64 xl:w-72 shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm lg:sticky lg:top-20 max-h-[70vh] lg:max-h-[calc(100vh-6rem)] overflow-y-auto">
              <FilterCard />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            {filterJobs.length <= 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
                No jobs found matching your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-5">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job1 job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
