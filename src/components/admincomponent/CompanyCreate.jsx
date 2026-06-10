import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice"; //  FIXED: Capitalized 'S' to match typical naming
import axios from "axios";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [companyName, setCompanyName] = useState(""); 

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name cannot be empty!");
      return;
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      // Added error toast notification so the user knows if the server rejected it
      toast.error(error.response?.data?.message || "Failed to register company.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Create Your Company</h1>
          <p className="text-gray-600">Give your company a temporary name. You can change this later.</p>
        </div>
        
        <Label htmlFor="company-name">Company Name</Label>
        <Input
          id="company-name"
          type="text"
          value={companyName} 
          placeholder="e.g., Microsoft, Google, Acme Corp"
          className="my-2"
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;