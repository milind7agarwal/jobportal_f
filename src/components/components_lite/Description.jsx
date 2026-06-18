import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import Navbar from "./Navbar";
import { APPLICATION_API_ENDPOINT } from "../../utils/data";
import { Briefcase, MapPin, DollarSign, Calendar, Users, Layers,ArrowLeft} from "lucide-react";

const Description = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchSingleJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
          // Check if user already applied
          const alreadyApplied = res.data.job?.applications?.some(
            (app) => app.applicant === user?._id || app === user?._id
          );
          setIsApplied(!!alreadyApplied);
        } else {
          setError("Failed to fetch job details.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (jobId) fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);



  const isIntiallyApplied =
    singleJob?.application?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);


  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        console.log(res.data);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  };
  

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50">
        <Navbar />
        <div className="max-w-5xl mx-auto my-20 text-center text-slate-500 animate-pulse">
          Loading job postings...
        </div>
      </div>
    );
  }
    if(!singleJob && !loading) {
    return (
      <div className="min-h-screen bg-slate-50/50">
        <Navbar />
        <div className="max-w-5xl mx-auto my-20 text-center text-slate-500">
          {error ? `Error: ${error}` : "Job not found."}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-3 sm:px-4 mt-4 sm:mt-8">
        
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 relative overflow-hidden">
          {/* Subtle background decorative accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full pointer-events-none" />

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {singleJob?.title || "Job Title"}
              </h1>
              
              <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center mt-3 sm:mt-4">
                <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold px-2 sm:px-3 py-0.5 sm:py-1 border-0 text-[10px] sm:text-xs" variant="outline">
                  {singleJob?.position || 0} Openings
                </Badge>
                <Badge className="bg-orange-50 text-orange-700 hover:bg-orange-100 font-semibold px-2 sm:px-3 py-0.5 sm:py-1 border-0 text-[10px] sm:text-xs" variant="outline">
                  {singleJob?.salary ? `${singleJob.salary} LPA` : "Not Disclosed"}
                </Badge>
                <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 font-semibold px-2 sm:px-3 py-0.5 sm:py-1 border-0 text-[10px] sm:text-xs" variant="outline">
                  {singleJob?.location || "Remote"}
                </Badge>
                <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold px-2 sm:px-3 py-0.5 sm:py-1 border-0 text-[10px] sm:text-xs" variant="outline">
                  {singleJob?.jobType || "Full-Time"}
                </Badge>
              </div>
            </div>

            <div className="w-full md:w-auto shrink-0">
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`w-full md:w-auto px-6 sm:px-8 py-5 sm:py-6 rounded-xl font-medium text-sm sm:text-base ${
                  isApplied
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-not-allowed hover:bg-emerald-100"
                    : "bg-[#6B3AC2] text-white hover:bg-[#552d9b]"
                }`}
              >
                {isApplied ? "✓ Already Applied" : "Apply Now"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          
          <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 md:p-8 order-2 lg:order-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4 pb-2 border-b border-slate-100">
              Job Description
            </h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm sm:text-[15px]">
              {singleJob?.description || "No description provided for this role."}
            </p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 h-fit order-1 lg:order-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4 sm:mb-5">
              Job Overview
            </h2>
            
            <div className="space-y-4">
              
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Briefcase size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Role</p>
                  <p className="text-sm font-semibold text-slate-800">{singleJob?.position || 0} Open Positions</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Location</p>
                  <p className="text-sm font-semibold text-slate-800">{singleJob?.location || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                  <DollarSign size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Salary Package</p>
                  <p className="text-sm font-semibold text-slate-800">{singleJob?.salary ? `${singleJob.salary} ` : "N/A"} $</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Layers size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Experience</p>
                  <p className="text-sm font-semibold text-slate-800">{singleJob?.experienceLevel ? `${singleJob.experienceLevel} Years` : "Flexible"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Applicants</p>
                  <p className="text-sm font-semibold text-slate-800">{singleJob?.applications?.length || 0} applied</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Posted Date</p>
                  <p className="text-sm font-semibold text-slate-800">
                    {singleJob?.createdAt ? singleJob.createdAt.split("T")[0] : "Recent"}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Description;