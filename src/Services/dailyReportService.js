import axios from "axios";
import { format } from "date-fns";

export const getMySubmissions = async (
  id,
  setSubmissions,
  setLoading,
  setError,
  startDate,
  endDate,
  userType,
  pageSubmissions,
  setSubmissionsPage,
  setSubmissionsTotalPage,
  filters,
  setFilters,
  clients
) => {
  try {
    setLoading(true);
    setError(null);
    let filterList;
    if (!filters.clientId) {
      filterList = clients ? clients.map((item) => item.id).join(", ") : "";
    }
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/report/selectCandidatesForReports`,
      data: {
        userId: `${id}`,
        page: filters.filterUpdated ? 1 : pageSubmissions,
        userType: userType,
        dateFrom: startDate,
        dateTo: endDate,
        reportType: "submission",
        clientId: !filters.clientId ? filterList : filters.clientId,
        recruiterId: filters.recruiterId || null,
        accMgrId: filters.accMgrId || null,
        sdmId: filters.sdmId || null,
      },
    });
    setSubmissions(response.data.payload[0] || []);
    setSubmissionsTotalPage(response.data.payload[1].pageSize);
    setFilters({
      ...filters,
      filterUpdated: false,
    });
    setSubmissionsPage(filters.filterUpdated ? 1 : pageSubmissions);
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.status === 422) {
        setError("Something went wrong");
        setSubmissions([]);
      } else {
        setError(error.response.data.success.message);
        setSubmissions([]);
      }
    }
  } finally {
    setLoading(false);
  }
};

export const getMyInterviews = async (
  id,
  setInterviews,
  setLoading,
  setError,
  startDate,
  endDate,
  userType,
  pageInterviews,
  setInterviewsPage,
  setInterviewsTotalPage,
  filters,
  setFilters,
  clients
) => {
  try {
    setLoading(true);
    setError(null);
    let filterList;
    if (!filters.clientId) {
      filterList = clients ? clients.map((item) => item.id).join(", ") : "";
    }
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/report/selectCandidatesForReports`,
      data: {
        userId: `${id}`,
        page: filters.filterUpdated ? 1 : pageInterviews,
        userType: userType,
        dateFrom: startDate,
        dateTo: endDate,
        reportType: "interview",
        clientId: !filters.clientId ? filterList : filters.clientId,
        recruiterId: filters.recruiterId || null,
        accMgrId: filters.accMgrId || null,
        sdmId: filters.sdmId || null,
      },
    });
    setInterviews(response.data.payload[0] || []);
    setInterviewsTotalPage(response.data.payload[1].pageSize);
    setFilters({
      ...filters,
      filterUpdated: false,
    });
    setInterviewsPage(filters.filterUpdated ? 1 : pageInterviews);
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.status === 422) {
        setError("Something went wrong");
        setInterviews([]);
      } else {
        setError(error.response.data.success.message);
        setInterviews([]);
      }
    }
  } finally {
    setLoading(false);
  }
};

export const downloadMyReport = async (
  id,
  setLoading,
  setError,
  startDate,
  endDate,
  userType,
  pageStarts,
  filters,
  clients,
  activeTab
) => {
  try {
    setLoading(true);
    setError(null);
    let filterList;
    if (!filters.clientId) {
      filterList = clients ? clients.map((item) => item.id).join(", ") : "";
    }
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/report/downloadCandidateReports`,
      data: {
        userId: `${id}`,
        page: filters.filterUpdated ? 1 : pageStarts,
        userType: activeTab == "master" ? "all" : userType,
        dateFrom: startDate,
        dateTo: endDate,
        reportType: activeTab,
        clientId: !filters.clientId ? filterList : filters.clientId,
        recruiterId: filters.recruiterId || null,
        accMgrId: filters.accMgrId || null,
        sdmId: filters.sdmId || null,
      },
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.status === 422) {
        setError("Something went wrong");
      } else {
        setError(error.response.data.success.message);
      }
    }
  } finally {
    setLoading(false);
  }
};

export const getMyOffers = async (
  id,
  setOffers,
  setLoading,
  setError,
  startDate,
  endDate,
  userType,
  pageOffers,
  setOffersPage,
  setOffersTotalPage,
  filters,
  setFilters,
  clients
) => {
  try {
    setLoading(true);
    setError(null);
    let filterList;
    if (!filters.clientId) {
      filterList = clients ? clients.map((item) => item.id).join(", ") : "";
    }
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/report/selectCandidatesForReports`,
      data: {
        userId: `${id}`,
        page: filters.filterUpdated ? 1 : pageOffers,
        userType: userType,
        dateFrom: startDate,
        dateTo: endDate,
        reportType: "offer",
        clientId: !filters.clientId ? filterList : filters.clientId,
        recruiterId: filters.recruiterId || null,
        accMgrId: filters.accMgrId || null,
        sdmId: filters.sdmId || null,
      },
    });
    setOffers(response.data.payload[0] || []);
    setOffersTotalPage(response.data.payload[1].pageSize);
    setFilters({
      ...filters,
      filterUpdated: false,
    });
    setOffersPage(filters.filterUpdated ? 1 : pageOffers);
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.status === 422) {
        setError("Something went wrong");
        setOffers([]);
      } else {
        setError(error.response.data.success.message);
        setOffers([]);
      }
    }
  } finally {
    setLoading(false);
  }
};

export const getMyStarts = async (
  id,
  setStarts,
  setLoading,
  setError,
  startDate,
  endDate,
  userType,
  pageStarts,
  setStartsPage,
  setStartsTotalPage,
  filters,
  setFilters,
  clients
) => {
  try {
    setLoading(true);
    setError(null);
    let filterList;
    if (!filters.clientId) {
      filterList = clients ? clients.map((item) => item.id).join(", ") : "";
    }
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/report/selectCandidatesForReports`,
      data: {
        userId: `${id}`,
        page: filters.filterUpdated ? 1 : pageStarts,
        userType: userType,
        dateFrom: startDate,
        dateTo: endDate,
        reportType: "starts",
        clientId: !filters.clientId ? filterList : filters.clientId,
        recruiterId: filters.recruiterId || null,
        accMgrId: filters.accMgrId || null,
        sdmId: filters.sdmId || null,
      },
    });
    setStarts(response.data.payload[0] || []);
    setStartsTotalPage(response.data.payload[1].pageSize);
    setFilters({
      ...filters,
      filterUpdated: false,
    });
    setStartsPage(filters.filterUpdated ? 1 : pageStarts);
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.status === 422) {
        setError("Something went wrong");
        setStarts([]);
      } else {
        setError(error.response.data.success.message);
        setStarts([]);
      }
    }
  } finally {
    setLoading(false);
  }
};

export const getMyPerformances = async (
  id,
  setPerformances,
  setLoading,
  setError,
  startDate,
  endDate,
  userType,
  pagePerformances,
  setPerformancesPage,
  setPerformancesTotalPage,
  filters,
  setFilters,
  clients
) => {
  try {
    setLoading(true);
    setError(null);
    let filterList;
    if (!filters.clientId) {
      filterList = clients ? clients.map((item) => item.id).join(", ") : "";
    }
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/report/selectCandidatesForReports`,
      data: {
        userId: `${id}`,
        page: filters.filterUpdated ? 1 : pagePerformances,
        userType: userType,
        dateFrom: startDate,
        dateTo: endDate,
        reportType: "performance",
        clientId: !filters.clientId ? filterList : filters.clientId,
        recruiterId: filters.recruiterId || null,
        accMgrId: filters.accMgrId || null,
        sdmId: filters.sdmId || null,
      },
    });
    setPerformances(response.data.payload[0] || []);
    setPerformancesTotalPage(response.data.payload[1].pageSize);
    setFilters({
      ...filters,
      filterUpdated: false,
    });
    setPerformancesPage(filters.filterUpdated ? 1 : pagePerformances);
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.status === 422) {
        setError("Something went wrong");
        setPerformances([]);
      } else {
        setError(error.response.data.success.message);
        setPerformances([]);
      }
    }
  } finally {
    setLoading(false);
  }
};

export const getMyMasterData = async (
  id,
  setMasterData,
  setLoading,
  setError,
  startDate,
  endDate,
  userType,
  pageMasterData,
  setMasterDataPage,
  setMasterDataTotalPage,
  filters,
  setFilters,
  clients
) => {
  try {
    setLoading(true);
    setError(null);
    let filterList;
    if (!filters.clientId) {
      filterList = clients ? clients.map((item) => item.id).join(", ") : "";
    }
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/report/selectCandidatesForReports`,
      data: {
        userId: `${id}`,
        page: filters.filterUpdated ? 1 : pageMasterData,
        userType: "all",
        dateFrom: startDate,
        dateTo: endDate,
        reportType: "master",
        clientId: !filters.clientId ? filterList : filters.clientId,
        recruiterId: filters.recruiterId || null,
        accMgrId: filters.accMgrId || null,
        sdmId: filters.sdmId || null,
      },
    });
    setMasterData(response.data.payload[0] || []);
    setMasterDataTotalPage(response.data.payload[1].pageSize);
    setFilters({
      ...filters,
      filterUpdated: false,
    });
    setMasterDataPage(filters.filterUpdated ? 1 : pageMasterData);
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.status === 422) {
        setError("Something went wrong");
        setMasterData([]);
      } else {
        setError(error.response.data.success.message);
        setMasterData([]);
      }
    }
  } finally {
    setLoading(false);
  }
};

export const getActivityReport = async (setError, startDate, endDate) => {
  try {
    setError(null);
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/dailyProgressReport/download`,
      data: {
        dateFrom: startDate,
        dateTo: endDate,
      },
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.status === 404) {
        setError(error.response.data.success.message);
      } else if (error.response.status === 422) {
        setError("Something went wrong");
      }
    }
  }
};

export const getRecruiterList = async (
  setRecruiterList,
  setRecruiterLoading
) => {
  try {
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/users/selectUsers/${3}`
    );
    setRecruiterList(response.data.payload.users);
    setRecruiterLoading(true);
  } catch (error) {
    console.log(error);
  }
};

export const getSdmList = async (setSdmList, setSdmLoading) => {
  try {
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/users/selectUsers/${5}`
    );
    setSdmList(response.data.payload.users);
    setSdmLoading(true);
  } catch (error) {
    console.log(error);
  }
};

export const getAmList = async (setAmList, setAmLoading) => {
  try {
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/users/selectUsers/${7}`
    );
    setAmList(response.data.payload.users);
    setAmLoading(true);
  } catch (error) {
    console.log(error);
  }
};

export const getActivityReportData = async (
  setLoading,
  setError,
  startDate,
  endDate,
  period,
  setActivityReportData
) => {
  try {
    setLoading(true);
    setError(null);
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_BASEURL}/Reports/activityReport`,
      params: {
        from: startDate && format(new Date(startDate), "MMM-dd-yyyy"),
        to: endDate && format(new Date(endDate), "MMM-dd-yyyy"),
        period: period,
      },
    });

    setActivityReportData(response.data.payload);
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.status === 404) {
        setError(error.response.data.success.message);
      } else if (error.response.status === 422) {
        setError("Something went wrong");
      }
    }
  } finally {
    setLoading(false);
  }
};
