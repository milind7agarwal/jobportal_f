import React from "react";
import { Badge } from "../ui/badge";

const JobCards = ({job}) => {
 
  return (
    <div className="border p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <div>
            <h1 className = "text-lg font-md">Company Name</h1>
            <p className="text-md text-gray-600">India</p>
        </div>
        <div>
            <h2 className="font-bold text-lg my-2">Job Title</h2>
            <p className="text-sm text-gray-600">
                Job description will appear here.
            </p>
        </div>
        <div className="flex items-center gap-2 my-2 flex-wrap">
            <Badge  className="text-white font-bold">Full Time</Badge>
            <Badge  className="text-white font-bold">Remote</Badge>
            <Badge  className="text-white font-bold">$2000</Badge>
            <Badge  className="text-white font-bold">3 days ago</Badge>
        </div>
    </div>
  );
};

export default JobCards;