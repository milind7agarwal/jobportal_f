import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const JobCards = ({ job }) => {
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };
  const navigate = useNavigate();
  const daysAgo = daysAgoFunction(job?.createdAt);

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="border border-slate-200 p-4 sm:p-5 rounded-xl shadow-sm cursor-pointer hover:shadow-md hover:border-purple-200 transition-all active:scale-[0.99]"
    >
      <div>
        <h1 className="text-base sm:text-lg font-semibold truncate">{job.company?.name}</h1>
        <p className="text-xs sm:text-sm text-gray-600">{job.location || "India"}</p>
      </div>
      <div className="mt-2">
        <h2 className="font-bold text-base sm:text-lg my-1 line-clamp-1">{job?.title}</h2>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {job.description?.length > 100 ? `${job.description.substring(0, 100)}...` : job.description}
        </p>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2 my-3 flex-wrap">
        <Badge className="text-[10px] sm:text-xs">{job.jobType}</Badge>
        <Badge className="text-[10px] sm:text-xs">{job.location}</Badge>
        <Badge className="text-[10px] sm:text-xs">${job.salary?.toLocaleString?.() ?? job.salary}</Badge>
        <Badge className="text-[10px] sm:text-xs">
          {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
        </Badge>
      </div>
    </div>
  );
};

export default JobCards;
