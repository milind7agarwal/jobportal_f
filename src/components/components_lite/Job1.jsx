import React from 'react'
import { useNavigate } from "react-router-dom";
import {Button} from '../ui/Button';
import {Bookmark} from 'lucide-react';
import { Avatar, AvatarImage } from "../ui/avatar.jsx";
import { Badge } from "../ui/badge";

const Job1 = ({job}) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  return (
    <div className="flex items-center justify-center gap-4 my-2">
    <div className="border p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300" >
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-600'>3 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon" onClick={() => setIsBookmarked(!isBookmarked)}><Bookmark/></Button>
      </div>
      <div className="flex items-center gap-4 my-2">
        <Button className="p-6" variant="outline" size="icon">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
          </Button>
          <div>
              <h1 className = "text-lg font-md">{job?.company?.name}</h1>
              <p className="text-md text-gray-600">India</p>
          </div>
        </div>
        <div>
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
              <div className="flex items-center justify-end gap-4 my-2">
            <Button onClick={() => navigate(`/description/${job.id}`) } variant="outline">Details</Button>
            <Button variant="outline">Save for later</Button>
          </div>
          </div>

        </div>
 
      </div>

    </div>
  )
}

export default Job1;