import axios from "axios";
import { AI_API_ENDPOINT } from "@/utils/data";

export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);

    if (resumeFile) {
        formData.append("file", resumeFile);
    }

    try {
        const res = await axios.post(
            `${AI_API_ENDPOINT}/`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );
        return res.data;
    } catch (error) {
        console.error("Error generating interview report:", error);
        throw error;
    }
};

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
