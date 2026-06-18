import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    const jobsToFilter = allAdminJobs || [];
    const filteredJobs = jobsToFilter.filter((job) => {
      if (!searchJobByText) return true;
      const jobTitle = job?.title?.toLowerCase() || "";
      const companyName = job?.company?.name?.toLowerCase() || "";
      const searchTarget = searchJobByText.toLowerCase();
      return jobTitle.includes(searchTarget) || companyName.includes(searchTarget);
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  if (filterJobs.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-sm">
        No jobs posted yet.
      </div>
    );
  }

  return (
    <>
      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {filterJobs.map((job) => (
          <div key={job._id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
            <div>
              <p className="font-semibold text-sm">{job?.title}</p>
              <p className="text-xs text-slate-500">{job?.company?.name || "N/A"}</p>
              <p className="text-xs text-slate-400 mt-1">{job?.createdAt?.split("T")[0] || "Recent"}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}>
                <Eye className="w-3.5 h-3.5 mr-1" /> Applicants
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto bg-white border border-slate-200 rounded-xl">
        <table className="w-full text-sm min-w-[560px]">
          <caption className="caption-bottom py-3 text-slate-500">Your posted jobs</caption>
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="p-3 font-medium">Company</th>
              <th className="p-3 font-medium">Role</th>
              <th className="p-3 font-medium">Date</th>
              <th className="p-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterJobs.map((job) => (
              <tr key={job._id} className="border-b border-slate-100">
                <td className="p-3">{job?.company?.name || "N/A"}</td>
                <td className="p-3">{job?.title}</td>
                <td className="p-3">{job?.createdAt?.split("T")[0] || "Recent"}</td>
                <td className="p-3 text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button type="button" className="p-1 hover:bg-slate-100 rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 space-y-2">
                      <button type="button" onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-2 text-sm w-full">
                        <Eye className="w-4 h-4" /> Applicants
                      </button>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminJobsTable;
