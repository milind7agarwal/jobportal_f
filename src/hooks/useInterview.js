import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import {
  generateInterviewReport,
  getInterviewReportById,
  getAllInterviewReports,
} from "../services/ai.api";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const {
    loading,
    setLoading,
    report,
    setReport,
    reports,
    setReports,
    error, 
    setError
  } = context;

  const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true);
    setError(null);

    let response = null;
    try {
      response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
      setReport(response.interviewReport);
    } catch (error) {
      console.log(error);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong."
    );
    } finally {
      setLoading(false);
    }
    return response?.interviewReport;
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    setError(null);
    let response = null;
    try {
      response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
    } catch (error) {
      console.log(error);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong."
    );
    } finally {
      setLoading(false);
    }
    return response?.interviewReport;
  };

  const getReports = async () => {
    setLoading(true);
    setError(null);
    let response = null;
    try {
      response = await getAllInterviewReports();
      // backend returns: { message, interviewReports, status: true }
      setReports(response.interviewReports);
    } catch (error) {
      console.log(error);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong."
    );
    } finally {
      setLoading(false);
    }
    return response?.interviewReports;
  };

  return {
    loading,
    error,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
  };
};

