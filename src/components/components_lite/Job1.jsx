import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar.jsx";
import { Badge } from "../ui/badge";

const Job1 = ({ job }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const daysAgo = daysAgoFunction(job?.createdAt);

  return (
    <div className="border border-slate-200 p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md hover:border-purple-200 transition-all bg-white h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-500">
          {daysAgo === 0 ? "Today" : `${daysAgo} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full h-8 w-8"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            setIsBookmarked(!isBookmarked);
          }}
        >
          <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 shrink-0">
          <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
        </Avatar>
        <div className="min-w-0">
          <h1 className="text-sm sm:text-base font-semibold truncate">{job?.company?.name}</h1>
          <p className="text-xs sm:text-sm text-gray-500 truncate">{job?.location || "India"}</p>
        </div>
      </div>

      <h2 className="font-bold text-base sm:text-lg mb-1 line-clamp-2">{job?.title}</h2>
      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed flex-grow mb-3">
        {job?.description?.length > 100 ? `${job.description.substring(0, 100)}...` : job?.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        <Badge className="text-[10px] sm:text-xs">{job.jobType}</Badge>
        <Badge className="text-[10px] sm:text-xs">{job.location}</Badge>
        <Badge className="text-[10px] sm:text-xs">${job.salary?.toLocaleString?.() ?? job.salary}</Badge>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-auto">
        <Button
          onClick={() => navigate(`/description/${job._id}`)}
          className="w-full sm:flex-1"
          size="sm"
        >
          View Details
        </Button>
        <Button variant="outline" className="w-full sm:flex-1" size="sm">
          Save
        </Button>
      </div>
    </div>
  );
};

export default Job1;
