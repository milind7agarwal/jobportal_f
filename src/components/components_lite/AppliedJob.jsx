import React from "react";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  if (!allAppliedJobs || allAppliedJobs.length === 0) {
    return (
      <p className="text-center text-slate-500 text-sm py-6">
        You have not applied to any jobs yet.
      </p>
    );
  }

  return (
    <>
      {/* Mobile: card layout */}
      <div className="space-y-3 md:hidden">
        {allAppliedJobs.map((appliedJob) => (
          <div key={appliedJob._id} className="border border-slate-200 rounded-lg p-3 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-sm text-slate-800 truncate">{appliedJob.job?.title}</p>
                <p className="text-xs text-slate-500">{appliedJob.job?.company?.name}</p>
              </div>
              <Badge
                className={`shrink-0 text-[10px] ${
                  appliedJob?.status === "rejected"
                    ? "bg-red-600"
                    : appliedJob?.status === "accepted"
                    ? "bg-green-600"
                    : "bg-gray-600"
                }`}
              >
                {appliedJob?.status}
              </Badge>
            </div>
            <p className="text-xs text-slate-400">
              Applied: {appliedJob?.createdAt?.split("T")[0] || "N/A"}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block overflow-x-auto -mx-2 px-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="py-2 pr-4 font-medium">Date</th>
              <th className="py-2 pr-4 font-medium">Job Title</th>
              <th className="py-2 pr-4 font-medium">Company</th>
              <th className="py-2 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {allAppliedJobs.map((appliedJob) => (
              <tr key={appliedJob._id} className="border-b border-slate-100">
                <td className="py-3 pr-4">{appliedJob?.createdAt?.split("T")[0] || "N/A"}</td>
                <td className="py-3 pr-4">{appliedJob.job?.title}</td>
                <td className="py-3 pr-4">{appliedJob.job?.company?.name}</td>
                <td className="py-3 text-right">
                  <Badge
                    className={
                      appliedJob?.status === "rejected"
                        ? "bg-red-600"
                        : appliedJob?.status === "accepted"
                        ? "bg-green-600"
                        : "bg-gray-600"
                    }
                  >
                    {appliedJob?.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AppliedJob;
