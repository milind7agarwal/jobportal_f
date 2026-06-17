import axios from "axios";
import { AI_API_ENDPOINT } from "@/utils/data"; 

// ── 1. Create/Generate a New Report ───────────────────────────────────────────
// export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
//     const formData = new FormData();
//     formData.append("jobDescription", jobDescription);
//     formData.append("selfDescription", selfDescription);
    
//     if (resumeFile) {
//         formData.append("file", resumeFile);
//     }

//     try {
//         const res = await axios.post(
//             `${AI_API_ENDPOINT}/`,
//             formData,
//             {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//                 withCredentials: true,
//             }
//         );       
//         return res.data;  
//     } catch (error) {
//         console.error("Error generating interview report:", error);
//         throw error; // Let useInterview hook know something went wrong
//     }
// };

// ── Temporary Mock API for Frontend Development ──
export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    // 1. Pretend we are waiting for the AI (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 2. Return fake data that perfectly matches your Report.jsx structure
    return {
        status: true,
        message: "Mock report generated",
        interviewReport: {
            _id: "mock-id-999",
            matchScore: 85,
            resume: "This is fake extracted resume text for testing.",
            technicalQuestions: [
                { question: "Explain React Context.", intention: "Testing state management", answer: "Context provides a way to pass data..." },
                { question: "What is a closure?", intention: "Testing JS fundamentals", answer: "A closure is the combination of a function bundled together..." }
            ],
            behavioralQuestions: [
                { question: "Tell me about a time you failed.", intention: "Assess accountability", answer: "I once missed a deadline and learned to over-communicate..." }
            ],
            preparationPlan: [
                { day: 1, focus: "React Basics", tasks: ["Review Context API", "Build a small app"] },
                { day: 2, focus: "JS Fundamentals", tasks: ["Study closures", "Practice promises"] }
            ],
            skillGaps: [
                { skill: "System Design", severity: "high" },
                { skill: "TypeScript", severity: "medium" }
            ]
        }
    };
};

// ── 2. Fetch a Single Report by ID ────────────────────────────────────────────
export const getInterviewReportById = async (interviewId) => {
    try {
        const res = await axios.get(`${AI_API_ENDPOINT}/report/${interviewId}`, {
            withCredentials: true, 
        });
        return res.data;
    } catch (error) {
        console.error(`Error fetching report ${interviewId}:`, error);
        throw error;
    }
};

// ── 3. Fetch All Reports for the User ─────────────────────────────────────────
export const getAllInterviewReports = async () => {
    try {
        const res = await axios.get(`${AI_API_ENDPOINT}/`, {
            withCredentials: true, 
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching all interview reports:", error);
        throw error;
    }
};