import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Calendar, ChevronRight, FileText, Plus, Sparkles } from "lucide-react";
import { useInterview } from "@/hooks/useInterview";
import Navbar from "../components_lite/Navbar";
import { Button } from "@/components/ui/button";

const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
};

const truncateText = (text, maxLength = 120) => {
    if (!text) return "No job description";
    const trimmed = text.trim();
    if (trimmed.length <= maxLength) return trimmed;
    return `${trimmed.slice(0, maxLength)}...`;
};

const getScoreStyles = (score) => {
    if (score >= 80) return "bg-emerald-50 text-emerald-700 border-emerald-100";
    if (score >= 60) return "bg-amber-50 text-amber-700 border-amber-100";
    return "bg-red-50 text-red-700 border-red-100";
};

const PreviousReports = () => {
    const { user } = useSelector((store) => store.auth);
    const { reports, loading, error, getReports } = useInterview();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        getReports();
    }, [user, navigate, getReports]);

    if (!user) {
        return null;
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
                <div className="animate-pulse space-y-4 text-center">
                    <h1 className="text-lg sm:text-xl font-bold text-slate-700">Loading your reports...</h1>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
            </main>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="text-slate-900 pt-4 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-8 font-sans">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col gap-4 mb-6 sm:mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                                My <span className="text-purple-600">AI Reports</span>
                            </h1>
                            <p className="text-sm sm:text-base text-slate-500 mt-1.5 sm:mt-2">
                                Tap any report to reopen your interview strategy.
                            </p>
                        </div>
                        <Link to="/ai" className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white gap-2">
                                <Plus className="w-4 h-4" />
                                New Report
                            </Button>
                        </Link>
                    </div>

                    {error && (
                        <div className="mb-4 sm:mb-6 rounded-xl border border-red-200 bg-red-50 p-3 sm:p-4 text-xs sm:text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {!reports?.length ? (
                        <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl shadow-sm p-6 sm:p-10 text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-purple-50">
                                <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-purple-600" />
                            </div>
                            <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">No reports yet</h2>
                            <p className="text-sm text-slate-500 mb-5 sm:mb-6 max-w-md mx-auto">
                                Generate your first AI interview strategy to see it saved here.
                            </p>
                            <Link to="/ai">
                                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                                    Create Your First Report
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3 sm:space-y-4">
                            {reports.map((item) => (
                                <button
                                    key={item._id}
                                    type="button"
                                    onClick={() => navigate(`/interview/${item._id}`)}
                                    className="w-full text-left bg-white border border-slate-200 rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-5 hover:border-purple-200 hover:shadow-md transition-all group active:scale-[0.99]"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                                        <div className="flex items-start gap-3 min-w-0">
                                            <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug">
                                                    {truncateText(item.jobDescription, 100)}
                                                </p>
                                                <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500">
                                                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                                                    <span className="truncate">{formatDate(item.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 pl-[52px] sm:pl-0">
                                            <span className={`inline-flex items-center rounded-full border px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-bold ${getScoreStyles(item.matchScore ?? 0)}`}>
                                                {item.matchScore ?? 0}% match
                                            </span>
                                            <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-purple-500 transition-colors shrink-0" />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PreviousReports;
