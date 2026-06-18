import React, { useState, useEffect } from 'react';
import { useInterview } from '@/hooks/useInterview';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, Code, MessageSquare, Compass, ArrowLeft, AlertTriangle, CheckCircle2, History } from 'lucide-react';
import Navbar from '../components_lite/Navbar';

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical', fullLabel: 'Technical Questions', icon: Code },
    { id: 'behavioral', label: 'Behavioral', fullLabel: 'Behavioral Questions', icon: MessageSquare },
    { id: 'roadmap', label: 'Road Map', fullLabel: 'Preparation Road Map', icon: Compass },
];

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false);
    
    return (
        <div className="border border-slate-200 rounded-lg sm:rounded-xl overflow-hidden bg-white mb-2 sm:mb-3 shadow-sm">
            <button
                type="button"
                className="w-full flex items-start justify-between gap-2 p-3 sm:p-4 text-left hover:bg-slate-50/50"
                onClick={() => setOpen((o) => !o)}
            >
                <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-purple-600 bg-purple-50 px-1.5 sm:px-2 py-0.5 rounded shrink-0">
                        Q{index + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                        {item.question}
                    </p>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 mt-0.5 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            
            {open && (
                <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-100 space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-600">
                    <div>
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold bg-purple-100 text-purple-700 mb-1">
                            Intention
                        </span>
                        <p className="leading-relaxed">{item.intention}</p>
                    </div>
                    <div>
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold bg-blue-100 text-blue-700 mb-1">
                            Model Answer
                        </span>
                        <p className="leading-relaxed">{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const RoadMapDay = ({ day, isLast }) => (
    <div className="relative pl-5 sm:pl-6 pb-6 sm:pb-8 last:pb-0">
        {!isLast && <div className="absolute left-[7px] top-4 bottom-0 w-0.5 bg-slate-200" />}
        <span className="absolute left-0 top-1.5 bg-white border-2 border-purple-600 rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 ring-4 ring-white" />
        <div className="ml-1 sm:ml-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide bg-purple-50 text-purple-700 px-2 py-0.5 rounded w-fit">
                    Day {day.day}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-800">{day.focus}</h3>
            </div>
            <ul className="space-y-1.5 sm:space-y-2 pl-3 sm:pl-4">
                {day.tasks.map((task, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-600 list-disc leading-relaxed">
                        {task}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const MatchScoreCard = ({ matchScore, compact = false }) => {
    const isHigh = matchScore >= 80;
    const isMid = matchScore >= 60;
    const scoreColorClass = isHigh ? 'text-emerald-500' : isMid ? 'text-amber-500' : 'text-red-500';
    const scoreBgClass = isHigh ? 'bg-emerald-50 text-emerald-700' : isMid ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700';
    const size = compact ? 'w-20 h-20' : 'w-24 h-24 sm:w-28 sm:h-28';
    const textSize = compact ? 'text-xl' : 'text-2xl';

    return (
        <div className={`bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col items-center text-center ${compact ? 'p-4' : 'p-4 sm:p-6'}`}>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 sm:mb-4 self-start w-full">
                Match Score
            </p>
            <div className={`relative ${size} flex items-center justify-center mb-2 sm:mb-3`}>
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className={`transition-all duration-500 ease-out ${scoreColorClass}`} strokeDasharray={`${matchScore}, 100`} strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className={`absolute ${textSize} font-extrabold text-slate-800`}>
                    {matchScore}<span className="text-xs sm:text-sm font-semibold text-slate-400">%</span>
                </div>
            </div>
            <div className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${scoreBgClass}`}>
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span className="text-left leading-tight">
                    {isHigh ? 'Strong match' : isMid ? 'Good match' : 'Needs improvement'}
                </span>
            </div>
        </div>
    );
};

const SkillGapsCard = ({ skillGaps, compact = false }) => (
    <div className={`bg-white border border-slate-200 rounded-xl shadow-sm ${compact ? 'p-4' : 'p-4 sm:p-6'}`}>
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 sm:mb-4">
            Skill Gaps
        </p>
        <div className="space-y-2">
            {skillGaps?.map((gap, i) => {
                let badgeStyle = "bg-slate-50 text-slate-700 border-slate-200";
                if (gap.severity === "high") badgeStyle = "bg-red-50 text-red-700 border-red-100";
                else if (gap.severity === "medium") badgeStyle = "bg-amber-50 text-amber-700 border-amber-100";
                else if (gap.severity === "low") badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-100";

                return (
                    <div key={i} className={`w-full border p-2.5 sm:p-3 rounded-lg text-[10px] sm:text-xs font-medium flex items-center justify-between gap-2 ${badgeStyle}`}>
                        <span className="min-w-0 break-words">{gap.skill}</span>
                        {gap.severity === 'high' && <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />}
                    </div>
                );
            })}
        </div>
    </div>
);

const SectionTabs = ({ activeNav, setActiveNav, mobile = false }) => (
    <div className={mobile ? 'flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide' : 'space-y-1'}>
        {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
                <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveNav(item.id)}
                    className={
                        mobile
                            ? `flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                                isActive ? 'bg-purple-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                              }`
                            : `w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                                isActive ? 'bg-purple-50 text-purple-700' : 'text-slate-600 hover:bg-slate-50'
                              }`
                    }
                >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{mobile ? item.label : item.fullLabel}</span>
                </button>
            );
        })}
    </div>
);

const ReportContent = ({ activeNav, report }) => {
    if (activeNav === 'technical') {
        return (
            <section>
                <div className="flex items-center justify-between mb-4 sm:mb-6 border-b border-slate-100 pb-3 sm:pb-4 gap-2">
                    <h2 className="text-base sm:text-xl font-bold text-slate-900">Technical Questions</h2>
                    <span className="text-[10px] sm:text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shrink-0">
                        {report.technicalQuestions?.length || 0}
                    </span>
                </div>
                {report.technicalQuestions?.map((q, i) => (
                    <QuestionCard key={i} item={q} index={i} />
                ))}
            </section>
        );
    }

    if (activeNav === 'behavioral') {
        return (
            <section>
                <div className="flex items-center justify-between mb-4 sm:mb-6 border-b border-slate-100 pb-3 sm:pb-4 gap-2">
                    <h2 className="text-base sm:text-xl font-bold text-slate-900">Behavioral Questions</h2>
                    <span className="text-[10px] sm:text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shrink-0">
                        {report.behavioralQuestions?.length || 0}
                    </span>
                </div>
                {report.behavioralQuestions?.map((q, i) => (
                    <QuestionCard key={i} item={q} index={i} />
                ))}
            </section>
        );
    }

    return (
        <section>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8 border-b border-slate-100 pb-3 sm:pb-4">
                <h2 className="text-base sm:text-xl font-bold text-slate-900">Preparation Road Map</h2>
                <span className="text-[10px] sm:text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shrink-0">
                    {report.preparationPlan?.length || 0} days
                </span>
            </div>
            <div className="relative pl-1 sm:pl-2">
                {report.preparationPlan?.map((day, idx) => (
                    <RoadMapDay
                        key={day.day}
                        day={day}
                        isLast={idx === report.preparationPlan.length - 1}
                    />
                ))}
            </div>
        </section>
    );
};

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
            <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
                <div className="animate-pulse space-y-4 text-center">
                    <h1 className="text-lg sm:text-xl font-bold text-slate-700">Loading your interview plan...</h1>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
            </main>
        );
    }

    if (error && !report) {
        return (
            <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
                <div className="max-w-md text-center space-y-4">
                    <AlertTriangle className="w-10 h-10 text-red-500 mx-auto" />
                    <h1 className="text-lg sm:text-xl font-bold text-slate-800">Could not load report</h1>
                    <p className="text-sm text-slate-600">{error}</p>
                    <Link to="/ai" className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
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
                    <h1 className="text-lg sm:text-xl font-bold text-slate-800">Report not found</h1>
                    <p className="text-sm text-slate-600">This report does not exist or you do not have access.</p>
                    <Link to="/ai" className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                        Create a New Report
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="text-slate-900 font-sans py-4 sm:py-8 lg:py-10 px-3 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">

                    {/* Mobile: section tabs */}
                    <div className="lg:hidden">
                        <SectionTabs activeNav={activeNav} setActiveNav={setActiveNav} mobile />
                    </div>

                    {/* Mobile: stats row */}
                    <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <MatchScoreCard matchScore={report.matchScore} compact />
                        <SkillGapsCard skillGaps={report.skillGaps} compact />
                    </div>

                    {/* Desktop: left sidebar */}
                    <nav className="hidden lg:flex lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex-col gap-4 sticky top-20">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-3">Sections</p>
                            <SectionTabs activeNav={activeNav} setActiveNav={setActiveNav} />
                        </div>
                        <Link to="/ai/reports" className="w-full flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium text-sm py-2.5 px-4 rounded-lg">
                            <History className="w-4 h-4" />
                            <span>My Previous Reports</span>
                        </Link>
                        <Link to="/ai" className="w-full flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium text-sm py-2.5 px-4 rounded-lg">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Create Another Report</span>
                        </Link>
                    </nav>

                    {/* Main content */}
                    <main className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm min-h-0 lg:min-h-[500px]">
                        <ReportContent activeNav={activeNav} report={report} />
                    </main>

                    {/* Desktop: right sidebar */}
                    <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-20">
                        <MatchScoreCard matchScore={report.matchScore} />
                        <SkillGapsCard skillGaps={report.skillGaps} />
                    </aside>

                    {/* Mobile: action links */}
                    <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-2 pb-4">
                        <Link to="/ai/reports" className="flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-medium text-sm py-3 px-4 rounded-lg">
                            <History className="w-4 h-4" />
                            Previous Reports
                        </Link>
                        <Link to="/ai" className="flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-medium text-sm py-3 px-4 rounded-lg">
                            <ArrowLeft className="w-4 h-4" />
                            New Report
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
