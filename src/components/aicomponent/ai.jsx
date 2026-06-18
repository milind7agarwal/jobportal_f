import React, { useState, useRef } from 'react';
import { UploadCloud, Info, Briefcase, User, FileText, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
            <main className="min-h-screen bg-white flex flex-col items-center justify-center">
                <div className="animate-pulse space-y-4 text-center">
                    <h1 className="text-xl font-bold text-slate-700">Loading your interview plan...</h1>
                    <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
            </main>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-white text-slate-900 pt-4 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
                
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center mb-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                        Create Your Custom <span className="text-purple-600">AI Report</span>
                    </h1>
                    <p className="text-lg text-slate-500">
                        Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                    </p>
                </div>

                {/* Main Content Container */}
                <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                        
                        {/* Left Column: Job Description */}
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2 text-slate-800 font-semibold">
                                    <Briefcase className="w-5 h-5 text-purple-600" />
                                    <h2>Target Job Description</h2>
                                </div>
                                <span className="text-xs font-medium bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                    Required
                                </span>
                            </div>
                            
                            <Textarea 
                                placeholder="Paste the full job description here...&#10;e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'" 
                                className="min-h-[350px] resize-none bg-slate-50 border-slate-200 focus-visible:ring-purple-600"
                                value={jobDescription}
                                onChange={(e) => { setJobDescription(e.target.value) }}
                                maxLength={5000}
                            />
                            <div className="text-right mt-2 text-xs text-slate-400">
                                {jobDescription.length} / 5000 chars
                            </div>
                        </div>

                        {/* Right Column: User Profile */}
                        <div className="p-8 flex flex-col">
                            <div className="flex items-center space-x-2 text-slate-800 font-semibold mb-4">
                                <User className="w-5 h-5 text-purple-600" />
                                <h2>Your Profile</h2>
                            </div>

                            {/* Upload Area */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium text-slate-700">Upload Resume</label>
                                    <span className="text-xs font-medium text-purple-600">Best Results</span>
                                </div>
                                
                                <div 
                                    onClick={() => resumeInputRef.current.click()}
                                    className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group min-h-[162px]"
                                >
                                    <input 
                                        ref={resumeInputRef} 
                                        hidden 
                                        type='file' 
                                        id='resume' 
                                        name='resume' 
                                        accept='.pdf'
                                        onChange={handleFileChange}
                                    />
                                    
                                    {!selectedFileName ? (
                                        <>
                                            <div className="bg-purple-100 p-3 rounded-full mb-3 group-hover:bg-purple-200 transition-colors">
                                                <UploadCloud className="w-6 h-6 text-purple-600" />
                                            </div>
                                            <p className="text-sm font-semibold text-slate-700">Click to upload or drag & drop</p>
                                            <p className="text-xs text-slate-500 mt-1">PDF only (Max 5MB)</p>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center text-center">
                                            <div className="bg-emerald-100 p-3 rounded-full mb-2">
                                                <FileText className="w-6 h-6 text-emerald-600" />
                                            </div>
                                            <p className="text-sm font-bold text-slate-800 max-w-[220px] truncate">
                                                {selectedFileName}
                                            </p>
                                            <button 
                                                onClick={handleClearFile}
                                                className="mt-3 flex items-center space-x-1 text-xs text-red-500 hover:text-red-700 font-semibold transition-colors bg-red-50 hover:bg-red-100 px-2 py-1 rounded-md"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                                <span>Remove file</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="relative flex items-center py-4">
                                <div className="flex-grow border-t border-slate-200"></div>
                                <span className="flex-shrink-0 mx-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">OR</span>
                                <div className="flex-grow border-t border-slate-200"></div>
                            </div>

                            {/* Self Description Area */}
                            <div className="flex-grow flex flex-col">
                                <label className="text-sm font-medium text-slate-700 mb-2">Quick Self-Description</label>
                                <Textarea 
                                    value={selfDescription}
                                    onChange={(e) => { setSelfDescription(e.target.value) }}
                                    id='selfDescription'
                                    name='selfDescription'
                                    placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..." 
                                    className="flex-grow min-h-[120px] resize-none bg-slate-50 border-slate-200 focus-visible:ring-purple-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer Area */}
                    <div className="bg-slate-50 border-t border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center space-x-3 text-sm text-slate-600 bg-blue-50 border border-blue-100 rounded-lg p-3 w-full sm:w-auto">
                            <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required.</p>
                        </div>
                        
                        <Button 
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 px-8 rounded-lg shadow-sm transition-all hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed" 
                            onClick={handleGenerateReport}
                            disabled={loading}
                        >
                            {loading ? "Generating..." : "Generate My Interview Strategy"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeAI;