import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany = companies?.filter((company) => {
      if (!searchCompanyByText) return true;
      return company.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    }) || [];
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  if (!companies) {
    return <div className="text-center py-8 text-slate-500">Loading...</div>;
  }

  if (filterCompany.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-sm">
        No companies added yet.
      </div>
    );
  }

  return (
    <>
      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {filterCompany.map((company) => (
          <div key={company._id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage src={company.logo} alt={company.name} />
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{company.name}</p>
              <p className="text-xs text-slate-500">{company.createdAt?.split("T")[0]}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => navigate(`/admin/companies/${company._id}`)}>
              <Edit2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto bg-white border border-slate-200 rounded-xl">
        <table className="w-full text-sm min-w-[500px]">
          <caption className="caption-bottom py-3 text-slate-500">Your registered companies</caption>
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="p-3 font-medium">Logo</th>
              <th className="p-3 font-medium">Company Name</th>
              <th className="p-3 font-medium">Date</th>
              <th className="p-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterCompany.map((company) => (
              <tr key={company._id} className="border-b border-slate-100">
                <td className="p-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={company.logo} alt={company.name} />
                  </Avatar>
                </td>
                <td className="p-3">{company.name}</td>
                <td className="p-3">{company.createdAt?.split("T")[0]}</td>
                <td className="p-3 text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button type="button" className="p-1 hover:bg-slate-100 rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 text-sm w-full"
                      >
                        <Edit2 className="w-4 h-4" /> Edit
                      </button>
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

export default CompaniesTable;
