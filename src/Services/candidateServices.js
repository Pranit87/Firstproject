import axios from "axios";

export const getRequirementDetails = async (reqId, setData) => {
  try {
    if (reqId !== "null") {
      const request = {
        url: `${process.env.REACT_APP_API_BASEURL}/requirement/${reqId}`,
      };
      const response = await axios(request);
      if (response.status === 200) {
        setData(response.data.payload);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCandidateResumeDetails = async (
  id,
  setHtmlData,
  setResumeData,
  setOpenLoading,
  setSpinnerLoading,
  setAlertLoading,
  setVcareData,
  setHistoryData,
  setStatusData,
  setLoadings,
  sourceParams,
  setError
) => {
  try {
    setLoadings(true);
    setSpinnerLoading(true);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/candidate/profile/${id}/${
        sourceParams.dbOrApi || 2
      }`,
    };
    const response = await axios(request);
    if (response.data.payload) {
      setError && setError(null);
      const payload = response.data.payload;

      setHtmlData(payload.resumeHtmlData);
      setResumeData(payload.resume);
      if (payload.resume.length && payload.resume.resumes_values) {
        setOpenLoading(false);
        setSpinnerLoading(false);
      }
      setVcareData(payload.vCareComment);
      setHistoryData(payload.historyLog);
      setStatusData(payload.statusData);

      // Sourcing a candidate
      if (Boolean(parseInt(sourceParams.requirementId))) {
        // only if requirement id is available
        const data = {
          resumeSid:
            sourceParams.sourcingFor === "database"
              ? id
              : payload?.resume?.monster_sid,
          requirementId: sourceParams.requirementId,
          sourcingFor: sourceParams.sourcingFor === "database" ? 0 : 1,
        };

        const sourceRequest = {
          url: `${process.env.REACT_APP_API_BASEURL}/candidates/sourceCandidatesAgainstRequirement`,
          method: "post",
          data,
        };
        await axios(sourceRequest);
      }
      setOpenLoading(false);
      setSpinnerLoading(false);
      setLoadings(false);
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.status === 404) {
        setResumeData({ resumes_values: "" });
      } else if (error.response.status === 400) {
        setAlertLoading(true);
        setError &&
          setError(
            error.response?.data?.success?.message ||
              "Internal Server Error Occurred"
          );
      }
    } else {
      setError &&
        setError(JSON.stringify(error) || "Internal Server Error Occurred");
      setOpenLoading(false);
      setSpinnerLoading(false);
      setLoadings(false);
    }
  }
};

export const getResume = async (
  id,
  setResumeData,
  setOpenLoading,
  setSpinnerLoading,
  setAlertLoading,
  setVcareData,
  setHistoryData,
  setStatusData,
  setLoadings,
  sourceParams,
  setResumeRemarksData,
  setRemarkLoading,
  setError,
  setResumeHtmlData
) => {
  try {
    setLoadings(true);
    setSpinnerLoading(true);
    setRemarkLoading(true);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/candidate/profile/${id}/${
        sourceParams.dbOrApi || 2
      }`,
    };
    const response = await axios(request);
    if (response.data.payload) {
      setError(null);
      const payload = response.data.payload;
      setResumeHtmlData(payload.resumeHtmlData);
      setResumeData(payload.resume);
      if (payload.resume.length && payload.resume.resumes_values) {
        setOpenLoading(false);
        setSpinnerLoading(false);
      }
      setVcareData(payload.vCareComment);
      setHistoryData(payload.historyLog);
      setStatusData(payload.statusData);
      setResumeRemarksData(payload.resumeRemark.data || []);
      // Sourcing a candidate
      if (Boolean(parseInt(sourceParams.requirementId))) {
        // only if requirement id is available
        const data = {
          resumeSid:
            sourceParams.sourcingFor === "database"
              ? id
              : payload?.resume?.monster_sid,
          requirementId: sourceParams.requirementId,
          sourcingFor: sourceParams.sourcingFor === "database" ? 0 : 1,
        };

        const sourceRequest = {
          url: `${process.env.REACT_APP_API_BASEURL}/candidates/sourceCandidatesAgainstRequirement`,
          method: "post",
          data,
        };
        await axios(sourceRequest);
      }
      setOpenLoading(false);
      setSpinnerLoading(false);
      setLoadings(false);
      setRemarkLoading(false);
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        setResumeData({ resumes_values: "" });
        setResumeHtmlData(null);
      } else if (error.response.status === 400) {
        setAlertLoading(true);
        setError(
          error.response?.data?.success?.message ||
            "Internal Server Error Occurred"
        );
      }
    } else {
      setError(JSON.stringify(error) || "Internal Server Error Occurred");
      setOpenLoading(false);
      setSpinnerLoading(false);
      setLoadings(false);
    }
  }
};

export const getCategoryById = async (catId, setDataCategory) => {
  try {
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/category/${catId}`,
    };
    const response = await axios(request);
    if (response.status === 200) {
      setDataCategory(response.data.payload.category);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (userId, setDataUser) => {
  try {
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/user/${userId}`,
    };
    const response = await axios(request);
    if (response.status === 200) {
      setDataUser(response.data.payload.username);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getHistoryData = async (
  id,
  pageNo,
  setHistoryData,
  setTotalPage,
  setLoading
) => {
  try {
    setLoading(true);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/candidate/profile/${id}/1?page=${pageNo}`,
    };
    const response = await axios(request);
    if (response.data.payload) {
      setHistoryData(response.data.payload.historyLog.data);
      setTotalPage(
        Math.ceil(
          response.data.payload.historyLog.total /
            response.data.payload.historyLog.per_page
        )
      );
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const SendSms = async (
  smsdata,
  setNotify,
  setSubmitting,
  setMessage
) => {
  try {
    setSubmitting(true);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/SendGoToConnectMsg`,
      method: "POST",
      data: smsdata,
    };
    const response = await axios(request);
    if (response.status === 200) {
      setNotify &&
        setNotify({
          show: true,
          description: "SMS sent successfully.",
          type: "success",
        });
      setMessage("");
    }
  } catch (error) {
    setSubmitting(false);
    setNotify &&
      setNotify({
        show: true,
        description: "Got error in sending SMS, please try again later.",
        type: "danger",
      });
    setMessage("");
  } finally {
    setSubmitting(false);
  }
};

export const postRemarkData = async (
  formData,
  remarkCount,
  setRemarkRespone,
  setRemarkCount,
  resetForm,
  setNotify,
  resumeRemarksData,
  setResumeRemarksData,
  setSubmitting
) => {
  try {
    var FormData = require("form-data");
    var reamrkFormData = new FormData();
    reamrkFormData.append(
      "requirementId",
      formData.requirementId ? formData.requirementId : null
    );
    reamrkFormData.append(
      "requirementTitle",
      formData.requirementTitle ? formData.requirementTitle : null
    );
    reamrkFormData.append(
      "remarkTypeValue",
      formData.remarkTypeValue ? formData.remarkTypeValue : null
    );
    reamrkFormData.append(
      "remarkType",
      formData.remarkType ? formData.remarkType : null
    );
    reamrkFormData.append("remark", formData.remark ? formData.remark : null);
    reamrkFormData.append(
      "candidateId",
      formData.candidateId ? formData.candidateId : null
    );
    reamrkFormData.append("userId", formData.userId ? formData.userId : null);

    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/resume/addRemark`,
      method: "POST",
      data: reamrkFormData,
    };
    const response = await axios(request);
    if (response.data.status === 201) {
      setRemarkRespone(response.data.success.message);
      setRemarkCount(remarkCount + 1);
      setResumeRemarksData([response.data.payload, ...resumeRemarksData]);
      setNotify({
        show: true,
        description: "Remark added successfully",
        type: "success",
      });
      resetForm({});
    }
  } catch (error) {
    console.log(error);
    setNotify({
      show: true,
      description: "Failed to add remark.",
      type: "danger",
    });
  } finally {
    setSubmitting(false);
  }
};

export const getCandidateRemarkDetails = async (
  id,
  setResumeRemarksData,
  setRemarkLoading
) => {
  try {
    setRemarkLoading(true);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/candidate/profile/${id}/2`,
    };
    const response = await axios(request);
    if (response.data.payload) {
      const payload = response.data.payload;
      setResumeRemarksData(payload.resumeRemark);
      setRemarkLoading(false);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setRemarkLoading(false);
  }
};

export const postShortlistCandidate = async (id, sourceParams, rowData) => {
  try {
    // Shortlisting a candidate
    if (Boolean(parseInt(sourceParams.requirementId))) {
      // only if requirement id is available
      const data = {
        resumeSid:
          sourceParams.sourcingFor === "database" ? id : rowData.monster_sid,
        requirementId: sourceParams.requirementId,
        sourcingFor: sourceParams.sourcingFor === "database" ? 0 : 1,
      };

      const sourceRequest = {
        url: `${process.env.REACT_APP_API_BASEURL}/candidates/qualifyCandidatesAgainstRequirement`,
        method: "post",
        data,
      };
      const response = await axios(sourceRequest);
      console.log(response);
    }
  } catch (error) {
    console.log(error.response);
  }
};
