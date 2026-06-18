import { useCallback, useContext } from "react";
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

  const generateReport = useCallback(async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setReport]);

  const getReportById = useCallback(async (interviewId) => {
    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setReport]);

  const getReports = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAllInterviewReports();
      setReports(response.interviewReports);
      return response.interviewReports;
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setReports]);

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
