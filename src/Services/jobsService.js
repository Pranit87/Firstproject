import axios from "axios";
import { format } from "date-fns";

// GET - Jobs by Page
export const getJobsByPage = async (
  page,
  setJobs,
  setTotalPage,
  setPage,
  setLoading,
  startDate,
  endDate,
  filters
) => {
  try {
    setLoading(true);
    if ((startDate || endDate) && (!startDate || !endDate)) return false;
    const params = {
      page,
      jobReleaseDate:
        startDate && endDate
          ? `${format(new Date(startDate), "yyyy/MM/dd")}-${format(
              new Date(endDate),
              "yyyy/MM/dd"
            )}`
          : undefined,
      jobId: filters.jobId || undefined,
      jobTitle: filters.jobTitle || undefined,
      jobLocation: filters.jobLocation || undefined,
      status: filters.status || undefined,
      jobCoverage: filters.jobCoverage || undefined,
      duration: filters.duration || undefined,
      clientId: filters.clientId || undefined,
    };
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_BASEURL}/job/list`,
      params,
    });
    setJobs(response.data.payload.data);
    setTotalPage(
      Math.ceil(response.data.payload.total / response.data.payload.per_page)
    );
    setPage(page);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

// GET Sourced List
export const getSourcedList = async (
  jobId,
  page,
  setSourced,
  setTotalPage,
  setLoading,
  setError,
  setInitialMailMergeList,
  setRequisitionId,
  filters
) => {
  try {
    setLoading(true);
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/job/${jobId}/sourced?page=${page}&candidateName=${filters.candidateName}&recruiterName=${filters.recruiterName}`
    );
    setSourced(response.data.payload.data || []);
    setRequisitionId(
      (response.data.payload.data.length &&
        response.data.payload.data[0].requirement_id) ||
        0
    );
    setInitialMailMergeList(
      response.data.payload.data.map((item) => item.resume_id)
    );
    setTotalPage(
      Math.ceil(response.data.payload.total / response.data.payload.per_page)
    );
  } catch (err) {
    setError(err);
    setSourced([]);
    setRequisitionId(0);
    setInitialMailMergeList([]);
    setTotalPage(0);
  } finally {
    setLoading(false);
  }
};

// Service to fetch Job Details
export const getJobsDetails = async (jobId, setJobDetails, setLoading) => {
  try {
    setLoading(true);
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/job/${jobId}`
    );
    setJobDetails(response.data.payload);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

// GET - Submitted List
export const getSubmittedList = async (
  jobId,
  page,
  setSubmitted,
  setTotalPage,
  setLoading
) => {
  try {
    setLoading(true);
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/job/${jobId}/submitted?page=${page}`
    );
    setSubmitted(response.data.payload.data || []);
    setTotalPage(
      Math.ceil(response.data.payload.total / response.data.payload.per_page)
    );
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

// GET - getAllClients

export const getAllClients = async (setClients, setClientsLoading) => {
  try {
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/job/list/clients`
    );
    setClients(response.data.payload);
    setClientsLoading(true);
  } catch (err) {
    console.log(err);
  }
};

// Service to fetch Job Logs
export const getLogs = async (
  jobId,
  setLogs,
  setLoading,
  page,
  setTotalPage
) => {
  try {
    setLoading(true);
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/job/${jobId}/log?page=${page}`
    );
    setLogs(response.data.payload.data);
    setTotalPage(Math.ceil(response.data.payload.total / 10));
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

// Service to fetch Job Offers
export const getOffers = async (
  jobId,
  page,
  setOffers,
  setTotalPage,
  setLoading
) => {
  try {
    setLoading(true);
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/job/${jobId}/offer?page=${page}`
    );
    setOffers(response.data.payload.data);
    setTotalPage(
      Math.ceil(response.data.payload.total / response.data.payload.per_page)
    );
  } catch (err) {
    console.log(err);
    setTotalPage(0);
  } finally {
    setLoading(false);
  }
};

export const getResumeDetails = async (
  resumeId,
  setResumeDetails,
  setResumeLoading,
  setError,
  setResumeUrl
) => {
  try {
    setResumeLoading(true);
    setError(null);
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/resume/getResumeForSourcedAndSubmittedCandidates/${resumeId}`
    );
    const resumeMarkup = response.data.payload.resumeHtmlData;
    // const resume = await getResume(resumeUrl);
    setResumeDetails(resumeMarkup);
    setResumeUrl && setResumeUrl(response.data.payload.resumeUrl);
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      if (error.response.data.status === 404) {
        setError("No preview available.");
      } else {
        setError(
          "Error occurred while fetching resume. Please try again later."
        );
      }
    }
    setResumeDetails("");
    setResumeUrl && setResumeUrl("");
  } finally {
    setResumeLoading(false);
  }
};

export const downloadExcel = async (
  setLoading,
  startDate,
  endDate,
  filters,
  setShowEmailConfirmation
) => {
  try {
    setLoading(true);
    const params = {
      jobReleaseDate:
        startDate && endDate
          ? `${format(new Date(startDate), "yyyy/MM/dd")}-${format(
              new Date(endDate),
              "yyyy/MM/dd"
            )}`
          : undefined,
      jobId: filters.jobId || undefined,
      jobTitle: filters.jobTitle || undefined,
      jobLocation: filters.jobLocation || undefined,
      status: filters.status || undefined,
      jobCoverage: filters.jobCoverage || undefined,
      duration: filters.duration || undefined,
      clientId: filters.clientId || undefined,
    };
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_BASEURL}/job/list/download`,
      params,
    });
    setShowEmailConfirmation("success");
  } catch (err) {
    console.log(err);
    setShowEmailConfirmation("error");
  } finally {
    setLoading(false);
  }
};

export const getAllInterviews = async (
  jobId,
  setInterviews,
  setLoading,
  setError,
  page,
  setTotalPage
) => {
  try {
    setLoading(true);
    const params = {};
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_BASEURL}/job/${jobId}/interview?page=${page}`,
      params,
    });
    setInterviews(response.data.payload.data);
    setTotalPage(Math.ceil(response.data.payload.total / 10));
  } catch (error) {
    console.log(error);
    setError(error);
    setTotalPage(0);
  } finally {
    setLoading(false);
  }
};
//API call to change status
export const postChangeStatus = async (
  formdata,
  setReloadInterview,
  reloadInterview,
  setShow,
  setNotify,
  setSubmitting
) => {
  try {
    setSubmitting && setSubmitting(true);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/job/updateStatusShortlistedCandidate`,
      method: "POST",
      data: formdata,
    };
    const response = await axios(request);
    if (response.status === 200) {
      setNotify &&
        setNotify({
          show: true,
          title: "Success",
          description: "Status updated successfully.",
          type: "success",
        });
      setShow && setShow(false);
    }
    if (response.status === 201) {
      setNotify &&
        setNotify({
          show: true,
          title: "Success",
          description: "Status updated successfully.",
          type: "success",
        });
      setShow && setShow(false);
    }
    setReloadInterview(reloadInterview + 1);
  } catch (error) {
    console.log(error);
    setSubmitting && setSubmitting(false);
    setNotify &&
      setNotify({
        show: true,
        title: "Error",
        description:
          error.response?.data?.error?.message ||
          error.response?.data?.success?.message ||
          "Error in updating status, please try again later.",
        type: "danger",
      });
  } finally {
    setSubmitting && setSubmitting(false);
  }
};

// GET Candidate Status
export const getCandidateStatus = async (
  senderList,
  requisitionId,
  setCandidates,
  setSubmitting,
  setNotify,
  setResumeIds
) => {
  try {
    setSubmitting(true);
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/emailTemplates/candidateStatusForSendBulkEmail`,
      data: {
        userId: senderList.join(","),
        reqId: requisitionId,
      },
    });
    const emailSendOrNot = response.data.payload.emailSendOrNot;
    setCandidates(emailSendOrNot || []);
    setResumeIds(
      emailSendOrNot.length
        ? emailSendOrNot.filter((value) => value.isStatus)
        : []
    );
  } catch (error) {
    console.log(error);
    setNotify({
      show: true,
      title: "Error",
      description:
        "Error in fetching required information, please try again later.",
      type: "danger",
    });
  } finally {
    setSubmitting(false);
  }
};

// Update Requirement Status
export const updateRequirementStatus = async (
  requirementId,
  status,
  setJobDetails,
  setLoading,
  jobId
) => {
  try {
    setLoading(true);
    const response = await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_BASEURL}/requirement/updateRequirementStatus/${requirementId}`,
      data: {
        status,
      },
    });
    if (response.data.success.message) {
      getJobsDetails(requirementId, setJobDetails, setLoading);
    }
  } catch (error) {
    console.log(error);
  }
};

// Home

export const getMyJobs = async (
  page,
  setJobs,
  setTotal,
  setLoading,
  setError
) => {
  try {
    setLoading(true);
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_BASEURL}/myJobs?page=${page}`,
    });
    setJobs(response.data.payload.data || []);
    setTotal(
      Math.ceil(response.data.payload.total / response.data.payload.per_page)
    );
  } catch (error) {
    console.log(error);
    setError(error);
  } finally {
    setLoading(false);
  }
};

// Call Candidate
export const postCallAPI = async (callLogData) => {
  try {
    console.log("callLogData", callLogData);
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/saveCallLogs`,
      data: callLogData,
    });
    const emailSendOrNot = response.data.payload.emailSendOrNot;
  } catch (error) {
    console.log(error);
  }
};

export const postGotoCallAPI = async (callLogData) => {
  try {
    console.log("callLogData", callLogData);
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/GoToConnectCall`,
      data: callLogData,
    });
  } catch (error) {
    console.log(error);
  }
};

// GET Shortlisted List
export const getShortlisted = async (
  jobId,
  page,
  setShortlisted,
  setTotalPage,
  setLoading
) => {
  try {
    setLoading(true);
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/job/${jobId}/qualified?page=${page}`
    );
    setShortlisted(response.data.payload.data || []);
    setTotalPage(
      Math.ceil(response.data.payload.total / response.data.payload.per_page)
    );
  } catch (err) {
    console.log(err);
    setShortlisted([]);
    setTotalPage(0);
  } finally {
    setLoading(false);
  }
};
