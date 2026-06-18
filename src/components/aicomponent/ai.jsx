import React, { useState, useRef } from 'react';
import { UploadCloud, Info, Briefcase, User, FileText, X, History } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useInterview } from "@/hooks/useInterview";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Navbar from '../components_lite/Navbar';

const ResumeAI = () => {
    const { loading, generateReport } = useInterview();
    const { user } = useSelector((store) => store.auth);
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [selectedFileName, setSelectedFileName] = useState("");
    
    const resumeInputRef = useRef();
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFileName(file.name);
        }
    };

    const handleClearFile = (e) => {
        e.stopPropagation(); 
        setSelectedFileName("");
        if (resumeInputRef.current) {
            resumeInputRef.current.value = "";
        }
    };

    const handleGenerateReport = async () => {
        if (!user) {
            toast.error("Please log in to generate an AI report.");
            navigate("/login");
            return;
        }

        const resumeFile = resumeInputRef.current?.files[0] || null;

        if (!jobDescription.trim()) {
            toast.error("Job description is required.");
            return;
        }
        
        if (!resumeFile && !selfDescription.trim()) {
            toast.error("Please provide either a resume file or a short self-description.");
            return;
        }

        try {
            const data = await generateReport({ jobDescription, selfDescription, resumeFile });
            if (data?._id) {
                toast.success("Interview strategy created successfully!");
                navigate(`/interview/${data._id}`);
                return;
            }
            toast.error("Report was created but could not be opened. Please try again.");
        } catch (error) {
            console.error("Failed to generate report:", error);
            const backendMessage = error?.response?.data?.message;
            toast.error(backendMessage || "Failed to generate report. Please try again later.");
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
                <div className="animate-pulse space-y-4 text-center">
                    <h1 className="text-lg sm:text-xl font-bold text-slate-700">Generating your interview plan...</h1>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
            </main>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="text-slate-900 pt-4 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-8 font-sans">
                <div className="max-w-4xl mx-auto text-center mb-5 sm:mb-6">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 sm:mb-4 leading-tight">
                        Create Your Custom <span className="text-purple-600">AI Report</span>
                    </h1>
                    <p className="text-sm sm:text-lg text-slate-500 px-2">
                        Let our AI analyze the job requirements and your profile to build a winning strategy.
                    </p>
                    {user && (
                        <Link
                            to="/ai/reports"
                            className="inline-flex items-center gap-2 mt-3 sm:mt-4 text-sm font-semibold text-purple-600 hover:text-purple-700"
                        >
                            <History className="w-4 h-4" />
                            View my previous reports
                        </Link>
                    )}
                </div>

                <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                        <div className="p-4 sm:p-6 lg:p-8">
                            <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                                <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm sm:text-base">
                                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 shrink-0" />
                                    <h2>Target Job Description</h2>
                                </div>
                                <span className="text-[10px] sm:text-xs font-medium bg-red-100 text-red-600 px-2 py-0.5 sm:py-1 rounded-full shrink-0">
                                    Required
                                </span>
                            </div>
                            
                            <Textarea 
                                placeholder="Paste the full job description here..."
                                className="min-h-[200px] sm:min-h-[280px] lg:min-h-[350px] resize-none bg-slate-50 border-slate-200 focus-visible:ring-purple-600 text-sm sm:text-base"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                maxLength={5000}
                            />
                            <div className="text-right mt-1.5 sm:mt-2 text-xs text-slate-400">
                                {jobDescription.length} / 5000
                            </div>
                        </div>

                        <div className="p-4 sm:p-6 lg:p-8 flex flex-col">
                            <div className="flex items-center gap-2 text-slate-800 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                                <User className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 shrink-0" />
                                <h2>Your Profile</h2>
                            </div>

                            <div className="mb-4 sm:mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs sm:text-sm font-medium text-slate-700">Upload Resume</label>
                                    <span className="text-[10px] sm:text-xs font-medium text-purple-600">Best Results</span>
                                </div>
                                
                                <div 
                                    onClick={() => resumeInputRef.current.click()}
                                    className="border-2 border-dashed border-slate-300 rounded-xl p-5 sm:p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group min-h-[130px] sm:min-h-[162px]"
                                >
                                    <input 
                                        ref={resumeInputRef} 
                                        hidden 
                                        type="file" 
                                        id="resume" 
                                        name="resume" 
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                    />
                                    
                                    {!selectedFileName ? (
                                        <>
                                            <div className="bg-purple-100 p-2.5 sm:p-3 rounded-full mb-2 sm:mb-3 group-hover:bg-purple-200 transition-colors">
                                                <UploadCloud className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                                            </div>
                                            <p className="text-xs sm:text-sm font-semibold text-slate-700 text-center">Tap to upload resume</p>
                                            <p className="text-[10px] sm:text-xs text-slate-500 mt-1">PDF only (Max 5MB)</p>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center text-center w-full px-2">
                                            <div className="bg-emerald-100 p-2.5 sm:p-3 rounded-full mb-2">
                                                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                                            </div>
                                            <p className="text-xs sm:text-sm font-bold text-slate-800 max-w-full truncate">
                                                {selectedFileName}
                                            </p>
                                            <button 
                                                type="button"
                                                onClick={handleClearFile}
                                                className="mt-2 sm:mt-3 flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-semibold bg-red-50 hover:bg-red-100 px-2 py-1 rounded-md"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                                <span>Remove</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="relative flex items-center py-3 sm:py-4">
                                <div className="flex-grow border-t border-slate-200" />
                                <span className="flex-shrink-0 mx-3 text-[10px] sm:text-xs font-semibold text-slate-400 uppercase">OR</span>
                                <div className="flex-grow border-t border-slate-200" />
                            </div>

                            <div className="flex-grow flex flex-col">
                                <label className="text-xs sm:text-sm font-medium text-slate-700 mb-2">Quick Self-Description</label>
                                <Textarea 
                                    value={selfDescription}
                                    onChange={(e) => setSelfDescription(e.target.value)}
                                    id="selfDescription"
                                    name="selfDescription"
                                    placeholder="Briefly describe your experience and key skills..."
                                    className="flex-grow min-h-[100px] sm:min-h-[120px] resize-none bg-slate-50 border-slate-200 focus-visible:ring-purple-600 text-sm sm:text-base"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
                        <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 bg-blue-50 border border-blue-100 rounded-lg p-3">
                            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required.</p>
                        </div>
                        
                        <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5 sm:py-6 text-sm sm:text-base rounded-lg shadow-sm"
                            onClick={handleGenerateReport}
                            disabled={loading}
                        >
                            {loading ? "Generating..." : "Generate Interview Strategy"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeAI;
