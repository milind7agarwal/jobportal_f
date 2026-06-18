import React, { useState, useEffect } from 'react';
import { useInterview } from '@/hooks/useInterview';
import { useParams, Link } from 'react-router-dom';

import { ChevronDown, Code, MessageSquare, Compass, ArrowLeft, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Navbar from '../components_lite/Navbar';

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: <Code className="w-4 h-4" /> },
    { id: 'behavioral', label: 'Behavioral Questions', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'roadmap', label: 'Road Map', icon: <Compass className="w-4 h-4" /> },
];

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false);
    
    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white mb-3 shadow-sm hover:border-slate-300 transition-colors">
            <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50/50 select-none" 
                onClick={() => setOpen(o => !o)}
            >
                <div className="flex items-start space-x-3 pr-4">
                    <span className="text-sm font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded mt-0.5">
                        Q{index + 1}
                    </span>
                    <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                        {item.question}
                    </p>
                </div>
                <span className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                </span>
            </div>
            
            {open && (
                <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-4 text-sm text-slate-600">
                    <div>
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-700 mb-1.5">
                            Intention
                        </span>
                        <p className="leading-relaxed pl-1">{item.intention}</p>
                    </div>
                    <div>
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-700 mb-1.5">
                            Model Answer
                        </span>
                        <p className="leading-relaxed pl-1">{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

// FIXED: Handles timeline rendering dynamically without double lines or trailing hangers
const RoadMapDay = ({ day, isLast }) => (
    <div className="relative pl-6 pb-8 last:pb-0">
        {/* Timeline Line Connector */}
        {!isLast && <div className="absolute left-[7px] top-4 bottom-0 w-0.5 bg-slate-200" />}
        
        {/* Timeline Purple Ring Indicator */}
        <span className="absolute left-0 top-1.5 bg-white border-2 border-purple-600 rounded-full w-4 h-4 flex items-center justify-center ring-4 ring-white" />
        
        <div className="ml-2">
            <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wide bg-purple-50 text-purple-700 px-2 py-0.5 rounded">
                    Day {day.day}
                </span>
                <h3 className="text-sm font-bold text-slate-800">{day.focus}</h3>
            </div>
            
            <ul className="space-y-2 pl-4">
                {day.tasks.map((task, i) => (
                    <li key={i} className="text-sm text-slate-600 list-disc leading-relaxed">
                        {task}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const Report = () => {
    const [activeNav, setActiveNav] = useState('technical');
    const { report, getReportById, loading, error } = useInterview();
    const { interviewId } = useParams();

    useEffect(() => {
        if (!interviewId) return;
        if (String(report?._id) === String(interviewId)) return;
        getReportById(interviewId);
    }, [interviewId, report?._id, getReportById]);

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

    if (error && !report) {
        return (
            <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
                <div className="max-w-md text-center space-y-4">
                    <AlertTriangle className="w-10 h-10 text-red-500 mx-auto" />
                    <h1 className="text-xl font-bold text-slate-800">Could not load report</h1>
                    <p className="text-slate-600">{error}</p>
                    <Link
                        to="/ai"
                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        Back to AI Report
                    </Link>
                </div>
            </main>
        );
    }

    if (!report) {
        return (
            <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
                <div className="max-w-md text-center space-y-4">
                    <h1 className="text-xl font-bold text-slate-800">Report not found</h1>
                    <p className="text-slate-600">This interview report does not exist or you do not have access to it.</p>
                    <Link
                        to="/ai"
                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        Create a New Report
                    </Link>
                </div>
            </main>
        );
    }

    const isHigh = report.matchScore >= 80;
    const isMid = report.matchScore >= 60;
    
    const scoreColorClass = isHigh ? 'text-emerald-500' : isMid ? 'text-amber-500' : 'text-red-500';
    const scoreBgClass = isHigh ? 'bg-emerald-50 text-emerald-700' : isMid ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700';

    return (
        <div>
            <Navbar/>
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* ── Left Sidebar Navigation ── */}
                    <nav className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-3">
                                Sections
                            </p>
                            <div className="space-y-1">
                                {NAV_ITEMS.map(item => (
                                    <button
                                        key={item.id}
                                        className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                                            activeNav === item.id
                                                ? 'bg-purple-50 text-purple-700'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                        onClick={() => setActiveNav(item.id)}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Link 
                            to="/ai" 
                            className="w-full flex items-center justify-center space-x-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium text-sm py-2.5 px-4 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Create Another Report</span>
                        </Link>
                    </nav>

                    {/* ── Center Dynamic Main Content ── */}
                    <main className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm min-h-[500px]">
                        {activeNav === 'technical' && (
                            <section>
                                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                                    <h2 className="text-xl font-bold text-slate-900">Technical Questions</h2>
                                    <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                                        {report.technicalQuestions?.length || 0} questions
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    {report.technicalQuestions?.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeNav === 'behavioral' && (
                            <section>
                                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                                    <h2 className="text-xl font-bold text-slate-900">Behavioral Questions</h2>
                                    <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                                        {report.behavioralQuestions?.length || 0} questions
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    {report.behavioralQuestions?.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeNav === 'roadmap' && (
                            <section>
                                <div className="flex items-center space-x-3 mb-8 border-b border-slate-100 pb-4">
                                    <h2 className="text-xl font-bold text-slate-900">Preparation Road Map</h2>
                                    <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">
                                        {report.preparationPlan?.length || 0}-day plan
                                    </span>
                                </div>
                                {/* FIXED: Removed parent border-l side effects */}
                                <div className="relative pl-2 space-y-2">
                                    {report.preparationPlan?.map((day, idx) => (
                                        <RoadMapDay 
                                            key={day.day} 
                                            day={day} 
                                            isLast={idx === report.preparationPlan.length - 1} 
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </main>

                    {/* ── Right Status Sidebar Metrics ── */}
                    <aside className="lg:col-span-3 space-y-6">

                        {/* Match Score Progress Arc Card */}
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 self-start">
                                Match Score
                            </p>
                            
                            <div className="relative w-28 h-28 flex items-center justify-center mb-3">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                    <path
                                        className="text-slate-100"
                                        strokeWidth="3"
                                        stroke="currentColor"
                                        fill="none"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path
                                        className={`transition-all duration-500 ease-out ${scoreColorClass}`}
                                        strokeDasharray={`${report.matchScore}, 100`}
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        stroke="currentColor"
                                        fill="none"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                </svg>
                                <div className="absolute text-2xl font-extrabold text-slate-800">
                                    {report.matchScore}<span className="text-sm font-semibold text-slate-400">%</span>
                                </div>
                            </div>

                            <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium ${scoreBgClass}`}>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>
                                    {isHigh ? 'Strong match for this role' : isMid ? 'Good match for this role' : 'Requires additional skills'}
                                </span>
                            </div>
                        </div>

                        {/* Skill Gaps Card */}
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                                Skill Gaps
                            </p>
                            <div className="space-y-2.5">
                                {report.skillGaps?.map((gap, i) => {
                                    let badgeStyle = "bg-slate-50 text-slate-700 border-slate-200";
                                    if (gap.severity === "high") badgeStyle = "bg-red-50 text-red-700 border-red-100";
                                    else if (gap.severity === "medium") badgeStyle = "bg-amber-50 text-amber-700 border-amber-100";
                                    else if (gap.severity === "low") badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-100";

                                    return (
                                        <div key={i} className={`w-full border p-3 rounded-lg text-xs font-medium flex items-center justify-between ${badgeStyle}`}>
                                            <span>{gap.skill}</span>
                                            {gap.severity === 'high' && <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 ml-2" />}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Report;