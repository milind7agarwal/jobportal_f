import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="px-4 sm:px-6">
      <div className="text-center max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 sm:gap-5 my-6 sm:my-10">
          <span className="px-3 sm:px-4 mx-auto flex justify-center items-center py-1.5 sm:py-2 gap-2 rounded-full bg-gray-200 text-red-600 text-xs sm:text-sm font-medium">
            <span className="text-[#614232]"><PiBuildingOfficeBold /></span>
            No.1 Job Hunt Website
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Search, Apply & Get Your{" "}
            <span className="text-[#6A38C2]">Dream Job</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 px-2">
            Start your hunt for the best career opportunities in your selected areas and get hired quickly.
          </p>
          <div className="flex w-full max-w-lg shadow-lg border border-gray-300 pl-3 sm:pl-4 rounded-full items-center gap-2 mx-auto">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchjobHandler()}
              placeholder="Find your dream job"
              className="outline-none border-none w-full text-sm sm:text-base py-3 bg-transparent"
            />
            <Button onClick={searchjobHandler} className="rounded-r-full shrink-0" size="icon">
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
