import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import { Button } from "../ui/button";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const applications = applicants?.applications || [];

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`, { status });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  if (!applications.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-sm">
        No applicants yet.
      </div>
    );
  }

  return (
    <>
      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {applications.map((item) => (
          <div key={item._id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
            <p className="font-semibold text-sm">{item?.applicant?.fullname}</p>
            <p className="text-xs text-slate-500 truncate">{item?.applicant?.email}</p>
            <p className="text-xs text-slate-500">{item?.applicant?.phoneNumber}</p>
            {item.applicant?.profile?.resume ? (
              <a className="text-blue-600 text-xs font-medium" href={item.applicant.profile.resume} target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
            ) : (
              <span className="text-xs text-slate-400">No resume</span>
            )}
            <div className="flex gap-2 pt-2">
              {shortlistingStatus.map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant="outline"
                  className="flex-1 text-xs"
                  onClick={() => statusHandler(status, item._id)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto bg-white border border-slate-200 rounded-xl">
        <table className="w-full text-sm min-w-[640px]">
          <caption className="caption-bottom py-3 text-slate-500">Recent applicants</caption>
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Email</th>
              <th className="p-3 font-medium">Contact</th>
              <th className="p-3 font-medium">Resume</th>
              <th className="p-3 font-medium">Date</th>
              <th className="p-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((item) => (
              <tr key={item._id} className="border-b border-slate-100">
                <td className="p-3">{item?.applicant?.fullname}</td>
                <td className="p-3">{item?.applicant?.email}</td>
                <td className="p-3">{item?.applicant?.phoneNumber}</td>
                <td className="p-3">
                  {item.applicant?.profile?.resume ? (
                    <a className="text-blue-600 hover:underline" href={item.applicant.profile.resume} target="_blank" rel="noopener noreferrer">
                      Download
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="p-3">{item?.applicant?.createdAt?.split("T")[0]}</td>
                <td className="p-3 text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button type="button" className="p-1 hover:bg-slate-100 rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 space-y-2">
                      {shortlistingStatus.map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => statusHandler(status, item._id)}
                          className="flex items-center gap-2 text-sm w-full"
                        >
                          {status}
                        </button>
                      ))}
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

export default ApplicantsTable;
