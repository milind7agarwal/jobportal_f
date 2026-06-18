import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Mumbai", "Dubai", "Pune", "Bangalore", "Hyderabad", "Surat", "Remote"],
  },
  {
    filterType: "Technology",
    array: ["Mern", "React", "Data Scientist", "Fullstack", "Node", "Python", "Java", "frontend", "backend", "mobile", "desktop"],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full">
      <h1 className="font-bold text-base sm:text-lg">Filter Jobs</h1>
      <hr className="mt-3 mb-4" />
      <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <h2 className="font-semibold text-sm sm:text-base text-slate-800 mb-2">{data.filterType}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1">
              {data.array.map((item, indx) => {
                const itemId = `filter-${index}-${indx}`;
                return (
                  <div key={itemId} className="flex items-center gap-2 py-1">
                    <RadioGroupItem value={item} id={itemId} />
                    <label htmlFor={itemId} className="text-xs sm:text-sm cursor-pointer">{item}</label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
      {selectedValue && (
        <button
          type="button"
          onClick={() => setSelectedValue("")}
          className="mt-3 text-xs text-purple-600 font-semibold hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
};

export default FilterCard;
