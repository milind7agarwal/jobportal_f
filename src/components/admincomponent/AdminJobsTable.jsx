import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { companies } = useSelector((store) => store.company);
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();

  //  FIXED: Fallback to an empty array so filterJobs is never 'undefined' on initial render
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    //  FIXED: Wrapped with a safe array fallback checker
    const jobsToFilter = allAdminJobs || [];
    
    const filteredJobs = jobsToFilter.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      
      const jobTitle = job?.title?.toLowerCase() || "";
      //  FIXED: Added safety optional chaining to avoid crashing if company name is null
      const companyName = job?.company?.name?.toLowerCase() || ""; 
      const searchTarget = searchJobByText.toLowerCase();

      return jobTitle.includes(searchTarget) || companyName.includes(searchTarget);
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  console.log("COMPANIES", companies);
  
  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table>
        <TableCaption>Your recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/*  FIXED: Safe array check to ensure no crashing if data is processing */}
          {filterJobs?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                No Job Added
              </TableCell>
            </TableRow>
          ) : (
            filterJobs?.map((job) => (
              <TableRow key={job._id || job.id}>
                <TableCell>{job?.company?.name || "N/A"}</TableCell>
                <TableCell>{job?.title}</TableCell>
                {/*  FIXED: Safeguarded split if createdAt is missing temporarily */}
                <TableCell>{job?.createdAt ? job.createdAt.split("T")[0] : "Recent"}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer mb-1"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <hr />
                      <div 
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                        className="flex items-center gap-2 w-fit cursor-pointer mt-1"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;