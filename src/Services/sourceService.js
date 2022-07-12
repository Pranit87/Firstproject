import axios from "axios";
import { encrypt } from "../components/Common/encDec";

export const getRequirementDetails = async (
  reqId,
  setData,
  setLoader,
  setError
) => {
  try {
    setLoader(true);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/requirement/${reqId}`,
    };
    const response = await axios(request);
    if (response.status === 200) {
      setLoader(false);
      setData(response.data.payload);
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    }
  } catch (error) {
    console.log(error);
    setLoader(false);
    setError(
      error.response.data.payload.message || error.response.data.success.message
    );
  }
};

export const getMonsterSearch = async (
  formdata,
  setSeacrhData,
  pageNo,
  setOpenLoading,
  setSpinnerLoading,
  setTotalPage,
  setNoDataMessage,
  setMessageCSS,
  reqId,
  setTotalResultsFound
) => {
  try {
    if (formdata) {
      // if (!Boolean(formdata.relocateStatus)) {
      //   formdata.willingToTravel = "";
      // }
      if (!formdata.monsterPostalCode) {
        formdata.distanceMiles = "";
      }
      if (localStorage.getItem("monsterString")) {
        if (
          localStorage.getItem("monsterString") !==
          encrypt(formdata.commonText + "," + reqId)
        ) {
          const string = localStorage.getItem("monsterString");
          localStorage.removeItem(string);
        }
      }
      const request = {
        url: `${process.env.REACT_APP_API_BASEURL}/resume/search/monster`,
        method: "POST",
        params: {
          page: pageNo,
        },
        data: formdata,
      };
      const response = await axios(request);
      if (response.status === 200) {
        setSeacrhData(response.data.payload[0] || []);
        response.data.payload[1] &&
          setTotalResultsFound(response.data.payload[1]["totalCount"]);
        setTotalPage(
          (response.data.payload[1] &&
            Math.ceil(response.data.payload[1]["totalCount"] / 10)) ||
            0
        );
        setOpenLoading(false);
        setSpinnerLoading(false);
        localStorage.setItem(
          "monsterString",
          encrypt(formdata.commonText + "," + reqId)
        );
      }
    }
  } catch (error) {
    console.log(error.response);
    setSeacrhData([]);
    setTotalPage(0);
    setMessageCSS("text-danger");
    setNoDataMessage(
      error.response?.data?.success?.message
        ? error.response.data.success.message.replace(
            /\s[q]\s+/g,
            " search text "
          )
        : "Some error occurred in API service."
    );
  } finally {
    setOpenLoading(false);
    setSpinnerLoading(false);
  }
};

export const getDiceSearch = async (
  formdata,
  pageNo,
  setSearchData,
  setOpenLoading,
  setSpinnerLoading,
  setTotalPage,
  setNoDataMessage,
  setMessageCSS,
  reqId,
  setTotalResultsFound
) => {
  try {
    if (formdata) {
      if (!formdata.diceLocation) {
        formdata.distanceMiles = "";
      }
      if (localStorage.getItem("diceString")) {
        if (
          localStorage.getItem("diceString") !==
          encrypt(formdata.commonText + "," + reqId)
        ) {
          const string = localStorage.getItem("diceString");
          localStorage.removeItem(string);
        }
      }
      const request = {
        url: `${process.env.REACT_APP_API_BASEURL}/resume/search/dice`,
        method: "POST",
        params: {
          page: pageNo,
        },
        data: formdata,
      };
      const response = await axios(request);
      if (response.status === 200) {
        setSearchData(response.data.payload[0] || []);
        response.data.payload[1] &&
          setTotalResultsFound(response.data.payload[1]["totalCount"]);
        response.data.payload[1] &&
          setTotalPage(Math.ceil(response.data.payload[1]["totalCount"] / 10));
        setOpenLoading(false);
        setSpinnerLoading(false);
        localStorage.setItem(
          "diceString",
          encrypt(formdata.commonText + "," + reqId)
        );
      }
    }
  } catch (error) {
    // console.log(error);
    setSearchData([]);
    setTotalPage(0);
    setMessageCSS("text-danger");
    setNoDataMessage(
      error.response.data.success.message
        ? error.response.data.payload.message.replace(
            /\s[q]\s+/g,
            " search text "
          )
        : "Invalid access token."
    );
  } finally {
    setOpenLoading(false);
    setSpinnerLoading(false);
  }
};

export const postLogout = async (setLogoutData) => {
  try {
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/site/logout`,
      withCredentials: true,
      method: "post",
    };

    const response = await axios(request);
    setLogoutData(response);
  } catch (error) {
    console.log(error);
  }
};

/**
 * API Call to download monster & dice candidate resume
 */
export const getMonsterResumeDownload = async (
  resumeId,
  data,
  setMonsterError,
  setMonsterLoader
) => {
  try {
    if (resumeId) {
      const request = {
        url: `${process.env.REACT_APP_API_BASEURL}/resume/download/monster/${resumeId}`,
        method: "POST",
        data: data,
        timeout: 180000,
      };
      const response = await axios(request);
      if (response.status === 200) {
        return response;
      }
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      setMonsterError &&
        setMonsterError(
          error.response?.data?.success?.message ||
            "Internal Server Error occurred."
        );
    } else {
      setMonsterError && setMonsterError("Internal Server Error occurred.");
    }
  } finally {
    setMonsterLoader([]);
  }
};

export const getDiceResumeDownload = async (
  resumeId,
  data,
  setDiceError,
  setDiceLoader
) => {
  try {
    if (resumeId) {
      const request = {
        url: `${process.env.REACT_APP_API_BASEURL}/resume/download/dice/${resumeId}`,
        method: "POST",
        data: data,
        timeout: 180000,
      };
      const response = await axios(request);
      if (response.status === 200) {
        return response;
      }
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      setDiceError &&
        setDiceError(
          error.response?.data?.success?.message ||
            "Internal Server Error occurred."
        );
    } else {
      setDiceError && setDiceError("Internal Server Error occurred.");
    }
  } finally {
    setDiceLoader([]);
  }
};

export const getVatsSearch = async (
  formdata,
  pageNo,
  setSearchData,
  setOpenLoading,
  setSpinnerLoading,
  setTotalPage,
  setNoDataMessage,
  setMessageCSS,
  reqId,
  setTotalResultsFound
) => {
  console.log(formdata);
  try {
    if (formdata) {
      if (localStorage.getItem("vatsString")) {
        if (
          localStorage.getItem("vatsString") !==
          encrypt(formdata.text + "," + reqId)
        ) {
          const string = localStorage.getItem("vatsString");
          localStorage.removeItem(string);
        }
      }
      const request = {
        url: `${process.env.REACT_APP_API_BASEURL}/resume/search/vats`,
        method: "POST",
        params: {
          page: pageNo,
        },
        data: formdata,
      };
      const response = await axios(request);
      if (response.status === 200) {
        // console.log(response.data.payload);
        setSearchData(response.data.payload[0] || []);
        response.data.payload[1] &&
          setTotalResultsFound(response.data.payload[1]["totalCount"]);
        setTotalPage(Math.ceil(response.data.payload[1]["totalCount"] / 10));
        setOpenLoading(false);
        setSpinnerLoading(false);
        localStorage.setItem(
          "vatsString",
          encrypt(formdata.text + "," + reqId)
        );
      }
    }
  } catch (error) {
    console.log(error);
    setSearchData([]);
    setTotalPage(0);
    setMessageCSS("text-danger");
    setNoDataMessage(
      error.response.data.payload.message.replace(/\s[q]\s+/g, " search text ")
    );
  } finally {
    setOpenLoading(false);
    setSpinnerLoading(false);
  }
};

export const getCommonResumeDownload = async (
  resumeId,
  data,
  setSubmitting
) => {
  try {
    if (resumeId) {
      const request = {
        url: `${process.env.REACT_APP_API_BASEURL}/resume/download/${resumeId}`,
        method: "POST",
        data: data,
        timeout: 180000,
      };
      const response = await axios(request);
      if (response.status === 200) {
        setSubmitting && setSubmitting(false);
        return response;
      }
    }
  } catch (error) {
    console.log(error);
    setSubmitting && setSubmitting(false);
  }
};

export const getCareerBuilderSearch = async (
  formdata,
  setSeacrhData,
  pageNo,
  setOpenLoading,
  setSpinnerLoading,
  setTotalPage,
  setNoDataMessage,
  setMessageCSS,
  reqId,
  setTotalResultsFound
) => {
  try {
    if (formdata) {
      if (!formdata.careerbuilderZipcode) {
        formdata.careerbuilderSearchRadiusInMiles = "";
      }
      if (localStorage.getItem("carrerString")) {
        if (
          localStorage.getItem("carrerString") !==
          encrypt(formdata.searchString + "," + reqId)
        ) {
          const string = localStorage.getItem("carrerString");
          localStorage.removeItem(string);
        }
      }
      const request = {
        url: `${process.env.REACT_APP_API_BASEURL}/resume/search/careerBuilder`,
        method: "POST",
        params: {
          page: pageNo,
        },
        data: formdata,
      };
      const response = await axios(request);
      if (response.status === 200) {
        setSeacrhData(response.data.payload[0] || []);
        setTotalResultsFound(response.data.payload[1]["totalCount"]);
        setTotalPage(
          (response.data.payload[1] &&
            Math.ceil(response.data.payload[1]["totalCount"] / 10)) ||
            0
        );
        setOpenLoading(false);
        setSpinnerLoading(false);
        localStorage.setItem(
          "carrerString",
          encrypt(formdata.searchString + "," + reqId)
        );
      }
    }
  } catch (error) {
    console.log(error);
    setSeacrhData([]);
    setTotalPage(0);
    setMessageCSS("text-danger");
    if (
      error.response?.data?.success?.message ==
      "Service - Something went wrong - Undefined index: access_token"
    ) {
      setNoDataMessage(
        "Daily limit of downloads have been exhausted. Please change the account."
      );
    } else {
      setNoDataMessage(
        error.response?.data?.success?.message ||
          error.response?.data?.payload?.message.replace(
            /\s[q]\s+/g,
            " search text "
          )
      );
    }
  } finally {
    setOpenLoading(false);
    setSpinnerLoading(false);
  }
};

export const getCareerResumeDownload = async (
  resumeId,
  data,
  setCareerError,
  setCareerLoader
) => {
  try {
    if (resumeId) {
      const request = {
        url: `${process.env.REACT_APP_API_BASEURL}/resume/download/cb/${resumeId}`,
        method: "POST",
        data: data,
        timeout: 180000,
      };
      const response = await axios(request);
      if (response.status === 200) {
        return response;
      }
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      setCareerError &&
        (error.response?.data?.success?.message ==
        "Career Builder - Profile not found"
          ? setCareerError(
              "Daily limit of downloads have been exhausted. Please change the account."
            )
          : setCareerError(
              error.response?.data?.success?.message ||
                "Internal Server Error occurred."
            ));
    } else {
      setCareerError && setCareerError("Internal Server Error occurred.");
    }
  } finally {
    setCareerLoader([]);
  }
};

export const getJobListById = async (reqId, setJobList, setLoading) => {
  try {
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/job/searchJobsById/${reqId}`,
    };
    const response = await axios(request);
    if (response.status === 200) {
      setLoading(false);
      setJobList(response.data.payload);
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

// Getting total resume available in YATS
export const getVatsTotalResume = async (setTotalRecordsAailable) => {
  try {
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/totalResumeCount`,
      method: "GET",
    };
    const response = await axios(request);
    if (response.data.payload) {
      setTotalRecordsAailable(response.data.payload);
    }
  } catch (error) {
    console.log(error);
  }
};
