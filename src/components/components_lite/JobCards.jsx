import React from "react";
import { Badge } from "../ui/badge";

const JobCards = ({job}) => {
 
  return (
    <div className="border p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <div>
            <h1 className = "text-lg font-md">{job.company.name}</h1>
            <p className="text-md text-gray-600">India</p>
        </div>
        <div>
            <h2 className="font-bold text-lg my-2">{job?.title}</h2>
            <p className="text-sm text-gray-600">
                {job.description.length > 100 ? job.description.substring(0, 100) + "..." : job.description}
            </p>
        </div>
        <div className="flex items-center gap-2 my-2 flex-wrap">
            <Badge  className="text-white font-bold">{job.jobType}</Badge>
            <Badge  className="text-white font-bold">{job.location}</Badge>
            <Badge  className="text-white font-bold">${job.salary?.toLocaleString()}</Badge>
            <Badge  className="text-white font-bold">3 days ago</Badge>
        </div>
    </div>
  );
};

export default JobCards;