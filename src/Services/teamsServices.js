import axios from "axios";

export const getProfileDetails = async (
  id,
  page,
  pageFor,
  setProfileData,
  setProfileClientData,
  setTargetData,
  setProfileLoading,
  setError,
  setShowTargets
) => {
  try {
    var FormData = require("form-data");
    var data = new FormData();
    data.append("userid", id);
    data.append("page", page);
    data.append("paginationFor", pageFor);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/user/getUserProfile`,
      method: "POST",
      data: data,
    };
    const response = await axios(request);

    if (response.status === 200) {
      setProfileData(response.data.payload.userDetails);
      setProfileClientData(response.data.payload.userClients);
      setTargetData(response.data.payload.targetsOfUser[0]);
      setShowTargets &&
        setShowTargets(response.data.payload.userDetails?.showTargets || false);
    }
  } catch (error) {
    console.log(error);
    const commonMessage = "Error occurred in data response.";
    setError(
      error && error.response
        ? error.response?.data?.success?.message || commonMessage
        : commonMessage
    );
  } finally {
    setProfileLoading(false);
  }
};

export const TeamMembers = async (teamId, setTeam, setTeamLoading) => {
  try {
    setTeamLoading(true);
    const recruiterData = localStorage.getItem("profile");
    const id = JSON.parse(recruiterData)["id"];

    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/teams/viewTeam/${
        teamId || id
      }`,
    };
    const response = await axios(request);
    if (response.status === 200) {
      setTeam(response.data.payload.membersList);
      setTeamLoading(false);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchTeams = async (setTeams, setLoading) => {
  try {
    setLoading(true);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/teams/teamClientRecruiterCount`,
    };
    const response = await axios(request);
    if (response.status === 200) {
      setTeams(response.data.payload);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const getTargets = async (
  setLoading,
  setSubmissionWeekly,
  setSubmissionMonthly,
  setSubmissionQuarterly,
  setInterviewsWeekly,
  setInterviewsMonthly,
  setInterviewsQuarterly,
  setOffersWeekly,
  setOffersMonthly,
  setOffersQuarterly,
  setStartWeekly,
  setStartMonthly,
  setStartQuarterly,
  setGpmWeekly,
  setGpmMonthly,
  setGpmQuarterly,
  leadId
  // setIsCreated
) => {
  try {
    setLoading(true);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/user/selectTargetsForUser/${leadId}/1`,
    };

    const response = await axios(request);
    if (response.status === 200) {
      if (response.data.payload.targetsOfUser[0]) {
        setSubmissionWeekly(
          response.data.payload.targetsOfUser[0].submissionsweekly
        );

        setSubmissionMonthly(
          response.data.payload.targetsOfUser[0].submissionsmonthly
        );
        setSubmissionQuarterly(
          response.data.payload.targetsOfUser[0].submissionsquarterly
        );

        setInterviewsWeekly(
          response.data.payload.targetsOfUser[0].interviewsweekly
        );
        setInterviewsMonthly(
          response.data.payload.targetsOfUser[0].interviewsmonthly
        );
        setInterviewsQuarterly(
          response.data.payload.targetsOfUser[0].interviewsquarterly
        );

        setOffersWeekly(response.data.payload.targetsOfUser[0].offersweekly);
        setOffersMonthly(response.data.payload.targetsOfUser[0].offersmonthly);
        setOffersQuarterly(
          response.data.payload.targetsOfUser[0].offersquarterly
        );

        setStartWeekly(response.data.payload.targetsOfUser[0].startweekly);
        setStartMonthly(response.data.payload.targetsOfUser[0].startmonthly);
        setStartQuarterly(
          response.data.payload.targetsOfUser[0].startquarterly
        );

        setGpmWeekly(response.data.payload.targetsOfUser[0].gpmweekly);
        setGpmMonthly(response.data.payload.targetsOfUser[0].gpmmonthly);
        setGpmQuarterly(response.data.payload.targetsOfUser[0].gpmquarterly);
      }
      // if (response.data.payload.targetsOfUser.length === 0) {
      //   setIsCreated(0);
      // } else {
      //   setIsCreated(1);
      // }
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const getProfileAccessLog = async (
  id,
  PageForAccesslog,
  setAccessLogData,
  setProfileAccessLoading,
  setAccessLogDataCount,
  setAccessLogError
) => {
  try {
    var FormData = require("form-data");
    var data = new FormData();
    data.append("userid", id);
    data.append("page", PageForAccesslog);
    data.append("paginationFor", "3");
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/user/getUserProfile`,
      method: "POST",
      data: data,
    };
    const response = await axios(request);

    if (response.status === 200) {
      setAccessLogData(response.data.payload.accessLogOfUser);
      setAccessLogDataCount(
        Math.ceil(response.data.payload.accessLogOfUserCount[0].totalCount / 10)
      );
    }
  } catch (error) {
    console.log(error);
    const commonMessage = "Error occurred in data response.";
    setAccessLogError(
      error && error.response
        ? error.response?.data?.success?.message || commonMessage
        : commonMessage
    );
  } finally {
    setProfileAccessLoading(false);
  }
};

export const getProfileActivityLog = async (
  id,
  PageForActivitylog,
  setActivityLogData,
  setProfileActivityLoading,
  setActivityLogDataCount,
  setLogError
) => {
  try {
    var FormData = require("form-data");
    var data = new FormData();
    data.append("userid", id);
    data.append("page", PageForActivitylog);
    data.append("paginationFor", "1");
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/user/getUserProfile`,
      method: "POST",
      data: data,
    };
    const response = await axios(request);

    if (response.status === 200) {
      setActivityLogData(response.data.payload.activityLogOfUser);
      setActivityLogDataCount(
        Math.ceil(response.data.payload.activityLogOfUserCount / 10)
      );
    }
  } catch (error) {
    console.log(error);
    const commonMessage = "Error occurred in data response.";
    setLogError(
      error && error.response
        ? error.response?.data?.success?.message || commonMessage
        : commonMessage
    );
  } finally {
    setProfileActivityLoading(false);
  }
};

export const getProfileRequirement = async (
  id,
  PageForRequirement,
  setRequirementData,
  setProfileRequirementLoading,
  setRequirementDataCount,
  setRequirementError
) => {
  try {
    var FormData = require("form-data");
    var data = new FormData();
    data.append("userid", id);
    data.append("page", PageForRequirement);
    data.append("paginationFor", "2");
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/user/getUserProfile`,
      method: "POST",
      data: data,
    };
    const response = await axios(request);

    if (response.status === 200) {
      setRequirementData(response.data.payload.requirmentOfUser);
      setRequirementDataCount(
        Math.ceil(
          response.data.payload.requirmentOfUserCount[0].totalCount / 10
        )
      );
    }
  } catch (error) {
    console.log(error);
    const commonMessage = "Error occurred in data response.";
    setRequirementError(
      error && error.response
        ? error.response?.data?.success?.message || commonMessage
        : commonMessage
    );
  } finally {
    setProfileRequirementLoading(false);
  }
};

export const deleteTeam = async (
  teamId,
  setClients,
  setConfirmationDialog,
  setLoading
) => {
  try {
    setLoading(true);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/teams/${teamId}`,
      method: "DELETE",
    };
    const response = await axios(request);
    if (response.status === 200) {
      fetchTeams(setClients, setLoading);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setConfirmationDialog(false);
  }
};

export const deleteRecruiter = async (
  teamId,
  setTeam,
  setConfirmationDialog,
  setTeamLoading,
  setDeleting,
  userId
) => {
  try {
    setDeleting(true);

    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/recruiters/${teamId}`,
      method: "DELETE",
    };
    const response = await axios(request);
    if (response.status === 200) {
      TeamMembers(userId, setTeam, setTeamLoading);
      setDeleting(false);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setConfirmationDialog(false);
    setDeleting(false);
  }
};

export const getTeamLeadOptions = async (setNotify, setTeamLeadOptions) => {
  const token = localStorage.getItem("token");

  try {
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/leads`,
      // headers: `"Authorization": Bearer ${token}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        // ...data.getHeaders(),
      },
    };
    const response = await axios(request);
    if (response.status === 200) {
      setTeamLeadOptions(response.data.payload);
    }
  } catch (error) {
    console.log(error);
    setNotify({
      show: true,
      title: "Error",
      description: "Error occurs while fetching lead information.",
      type: "danger",
    });
  }
};

export const postTeam = async (
  targetData,
  leadId,
  setShow,
  setRefresh,
  refresh
) => {
  try {
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/teams/add/${leadId}`,
      method: "POST",
      data: targetData,
    };
    const response = await axios(request);
    if (response.status === 200) {
      setShow(false);
      console.log(response.data.success.message);
      setRefresh(!refresh);
    }
  } catch (error) {
    console.log(error);
  }
};

export const putTeam = async (
  targetData,
  leadId,
  setCloseAssignTarget,
  setIsLoading,
  showAlert
) => {
  try {
    setIsLoading(true);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/teams/update/${leadId}`,
      method: "PUT",
      data: targetData,
    };
    const response = await axios(request);
    if (response.status === 200) {
      setIsLoading(false);
      showAlert();
      // setCloseAssignTarget();
      console.log(response.data.success.message);
    }
  } catch (error) {
    setIsLoading(false);
    console.log(error);
  }
};

export const getTeamMembersList = async (
  teamId,
  setTeamMembersList,
  setLoading
) => {
  try {
    setLoading(true);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/teams/listOfMember/${teamId}`,
    };
    const response = await axios(request);
    if (response.status === 200) {
      setTeamMembersList(response.data.payload);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const addTeamMembers = async (
  teamId,
  selectedMembers,
  setSaving,
  setClients,
  setLoading,
  setCloseAddMember
) => {
  try {
    setSaving(true);
    const recruiterId = selectedMembers.map((data) => data.recruiter_id);
    const data = { teamId, recruiterId };
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/teams/addMember`,
      data: data,
    });
    if (response.data.status === 200) {
      fetchTeams(setClients, setLoading);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setCloseAddMember(false);
    setSaving(false);
  }
};
