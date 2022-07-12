import axios from "axios";

export const getDropDownOptions = async (setOptions, setLoading) => {
  const token = localStorage.getItem("token");
  try {
    setLoading(true);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/dropdown`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios(request);
    if (response.status === 200) {
      setOptions(response.data.payload);
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
  } finally {
    setLoading(false);
  }
};

export const getDashboardResumeSearchData = async (
  data,
  pageNo,
  setDashboardResumeData,
  setResumePageNoTotal,
  setResumeLoading
) => {
  try {
    setResumeLoading(true);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/resume/search/${data}`,
      params: {
        page: pageNo,
      },
    };
    const response = await axios(request);
    if (response.status === 200) {
      setDashboardResumeData(response.data.payload.resumes.data);
      setResumePageNoTotal(
        Math.ceil(
          response.data.payload.resumes.total /
            response.data.payload.resumes.per_page
        )
      );
    }
  } catch (error) {
    console.log(error);
  } finally {
    setResumeLoading(false);
  }
};

export const getDashboardRequirementSearchData = async (
  data,
  pageNo,
  setDashboardRequirementData,
  setRequirementPageNoTotal,
  setRequirementLoading
) => {
  try {
    setRequirementLoading(true);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/resume/search/${data}`,
      params: {
        page: pageNo,
      },
    };
    const response = await axios(request);
    if (response.status === 200) {
      setDashboardRequirementData(response.data.payload.requirements);
      setRequirementPageNoTotal(
        Math.ceil(
          response.data.payload.requirements.total /
            response.data.payload.requirements.per_page
        )
      );
    }
  } catch (error) {
    console.log(error);
  } finally {
    setRequirementLoading(false);
  }
};

export const RecruiterDropdown = async (setRecruiterOptions) => {
  try {
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/recruitersDropdown`,
    };
    const response = await axios(request);
    if (response.status === 200) {
      setRecruiterOptions(response.data.payload);
    }
  } catch (error) {
    console.log(error);
  }
};

export const postRemarkData = async (
  formData,
  resetForm,
  setNotify,
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
      resetForm({});
      setNotify &&
        setNotify({
          show: true,
          description: "Remark Added successfully.",
          type: "success",
        });

      setTimeout(function () {
        setNotify({
          show: false,
          description: "",
          type: "",
        });
      }, 5000);
    }
  } catch (error) {
    console.log(error);
    setNotify({
      show: true,
      description: "Remark Added failed",
      type: "danger",
    });
  } finally {
    setSubmitting(false);
  }
};

/**
 * API call to view resume
 */
export const getCandidateDetails = async (
  id,
  setProfileInitialValue,
  profileInitialValue,
  setProfileLoading,
  setResumeURL
) => {
  try {
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/candidate/profile/${id}/1`,
    };
    const response = await axios(request);
    if (response.data.payload.resume) {
      const values = response.data.payload.resume;
      const chips = [];
      values.skills.split(",").forEach((element) => {
        chips.push(element);
      });
      setProfileInitialValue({
        ...profileInitialValue,
        resumeId: values.id,
        name: values.name,
        email: values.email,
        location: values.location,
        zipcode: values.zipcode,
        city: values.city,
        state: values.state,
        mobile: values.mobile,
        visa: values.visa,
        rate: values.rate,
        experienceYears: values.experience_years,
        experienceMonths: values.experience_months,
        uploadResume: null,
        skills: chips,
      });
      setResumeURL(process.env.REACT_APP_S3_BUCKET + values.resume_path);
      setProfileLoading(true);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSkillsOptions = async (query, setOption, setIsLoading) => {
  try {
    if (query) {
      const request = {
        url: `${process.env.REACT_APP_API_BASEURL}/candidate/skillsAutocomplete/${query}`,
      };
      const response = await axios(request);
      if (response.data.payload) {
        const ddOption = () => {
          return (
            (response.data.payload &&
              response.data.payload.map((obj) => obj.name)) ||
            []
          );
        };
        setOption(ddOption());
        setIsLoading(false);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    // setOpenLoading(false);
    // setSpinnerLoading(false);
  }
};

export const postCandidateDetails = async (
  values,
  setNotify,
  setSubmitting
) => {
  try {
    setSubmitting(true);
    setNotify({
      show: false,
      description: "",
      type: "",
    });
    var FormData = require("form-data");
    var candidateFormData = new FormData();
    candidateFormData.append(
      "resumeId",
      values.resumeId ? values.resumeId : ""
    );
    candidateFormData.append("email", values.email ? values.email : "");
    candidateFormData.append("name", values.name ? values.name : "");
    candidateFormData.append(
      "location",
      values.location ? values.location : ""
    );
    candidateFormData.append("zipcode", values.zipcode ? values.zipcode : "");
    candidateFormData.append("city", values.city ? values.city : "");
    candidateFormData.append("state", values.state ? values.state : "");
    candidateFormData.append("mobile", values.mobile ? values.mobile : "");
    candidateFormData.append("visa", values.visa ? values.visa : "");
    candidateFormData.append("rate", values.rate ? values.rate : "");
    candidateFormData.append(
      "experienceYears",
      values.experienceYears ? values.experienceYears : ""
    );
    candidateFormData.append(
      "experienceMonths",
      values.experienceMonths ? values.experienceMonths : ""
    );
    candidateFormData.append(
      "uploadResume",
      values.uploadResume ? values.uploadResume : ""
    );
    candidateFormData.append("skills", values.skills);

    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/resume/candidateUpdate`,
      method: "POST",
      data: candidateFormData,
    };
    const response = await axios(request);
    if (response.data.payload) {
      setNotify &&
        setNotify({
          show: true,
          description: "Candidate updated successfully.",
          type: "success",
        });
    }
  } catch (error) {
    console.log(error);
    setNotify({
      show: true,
      description: "Error in updating record.",
      type: "danger",
    });
  } finally {
    setSubmitting(false);
  }
};

export const patchDeleteCandidate = async (
  candidate,
  userId,
  setConfirmationDialog,
  dashboardResumeData,
  setDashboardResumeData,
  setDeleting,
  setNotify
) => {
  setDeleting(true);
  try {
    if (candidate) {
      const request = {
        method: "patch",
        url: `${process.env.REACT_APP_API_BASEURL}/resume/candidateDelete/${candidate.id}/${userId}`,
      };
      const response = await axios(request);
      if (response.data.payload) {
        setConfirmationDialog(false);
        setDeleting(false);

        const newList = dashboardResumeData.filter(
          (item) => item.id !== candidate.id
        );
        setDashboardResumeData(newList);
      }
    }
  } catch (error) {
    console.log(error);
    setDeleting(false);
    setNotify({
      show: true,
      description: "Candidate deletion failed.",
      type: "danger",
    });
  } finally {
    setDeleting(false);
  }
};

export const AddRequirementDropdown = async (setOptions, setLoading) => {
  try {
    setLoading(true);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/getRequirementDropdowns`,
    };
    const response = await axios(request);
    if (response.status === 200) {
      setOptions(response.data.payload);
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

export const patchDeleteCandidateFromProfile = async (
  id,
  userId,
  setConfirmationDialog,
  setNotify
) => {
  try {
    if (id) {
      const request = {
        method: "patch",
        url: `${process.env.REACT_APP_API_BASEURL}/resume/candidateDelete/${id}/${userId}`,
      };
      const response = await axios(request);
      console.log(response.data.status);
      if (response.data.status === 200) {
        setConfirmationDialog(false);
        window.history.go(-1);
      }
    }
  } catch (error) {
    console.log(error.response.data.success.message);
    setNotify({
      show: true,
      description: error.response.data.success.message,
      type: "danger",
    });
  }
};
