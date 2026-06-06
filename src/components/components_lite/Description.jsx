import React from 'react'
import { Badge } from "../ui/badge";
import Navbar from "./Navbar";
const Description = () => {
  return (
    <div>
    <Navbar />
      <div className="max-w-7xl mx-auto my-10 ">
        <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl ">I will make it later</h1>
        <div className="flex items-center gap-2 my-2 flex-wrap">
                <Badge  className="text-white font-bold">Full Time</Badge>
                <Badge  className="text-white font-bold">Remote</Badge>
                <Badge  className="text-white font-bold">$2000</Badge>
                <Badge  className="text-white font-bold">3 days ago</Badge>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Description
