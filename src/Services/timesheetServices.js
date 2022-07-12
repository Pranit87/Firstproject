import axios from "axios";

// Get Worker Weekly data
export const getWorkerWeeklyDetails = async (
  setWorkerManagerDetails,
  setWorkerWeeklyDetails,
  setTableLoading,
  params,
  page,
  setTotalPage,
  id
) => {
  try {
    setTableLoading(true);
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_BASEURL}/employeeMuster/getWeeklyTimesheetData?page=${page}&userId=${id}`,
      params: params,
    });

    if (response.data.payload) {
      setWorkerManagerDetails(response.data.payload.managerDetails);
      setWorkerWeeklyDetails(response.data.payload.data);
      setTotalPage(
        Math.ceil(response.data.payload.total / response.data.payload.per_page)
      );
    }
  } catch (err) {
    console.log(err);
    setWorkerWeeklyDetails([]);
    setTotalPage(1);
  } finally {
    setTableLoading(false);
  }
};

function formatDate(date) {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  date = mm + "/" + dd + "/" + yyyy;
  return date;
}

function getDateOfISOWeek(w, y, userData, setWorkerDailyData, setTableLoading) {
  var simple = new Date(y, 0, 1 + (w - 1) * 7);
  var dow = simple.getDay();
  var ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay());
  else ISOweekStart.setDate(simple.getDate() + 7 - simple.getDay());
  const allSevenDays = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date(ISOweekStart);
    d.setDate(d.getDate() + i);
    allSevenDays.push(formatDate(d));
  }
  const emptyRows = [];
  allSevenDays.map((row) => {
    const jObject = {
      date: row.toString(),
      description: "",
      reg: 0,
      ot: 0,
      dt: 0,
      total: 0,
      user_id: userData.user_id,
      time_in: null,
      time_out: null,
      start_lunch: null,
      end_lunch: null,
      timesheet_id: userData.timesheet_id,
      week_number: userData.week_number,
    };
    return emptyRows.push(jObject);
  });
  setWorkerDailyData(emptyRows);
  setTableLoading(false);
}
// Get Worker Daily data
export const getWorkerDailyDetails = async (
  userData,
  setWorkerDailyData,
  setTableLoading
) => {
  try {
    setTableLoading(true);
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_BASEURL}/employeeMuster/getDailyTimesheetData?week_number=${userData.week_number}&timesheet_id=${userData.timesheet_id}&userId=${userData.user_id}`,
    });

    if (response.data.payload) {
      setWorkerDailyData(response.data.payload);
    }
  } catch (err) {
    console.log(err.response);
    if (err.response.status === 404) {
      getDateOfISOWeek(
        userData.week_number,
        new Date(userData.week_starting).getFullYear(),
        userData,
        setWorkerDailyData,
        setTableLoading
      );
    }
  } finally {
    setTableLoading(false);
  }
};

// Get Worker Daily data
export const postWorkerDailyDetails = async (
  values,
  setWorkerDailyData,
  setTableLoading,
  setSuccessMessage,
  setErrorMessage,
  setSubmitToManager
) => {
  try {
    setTableLoading(true);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/employeeMuster/addDailyTimesheetData`,
      data: values,
    });

    if (response.data.payload) {
      setWorkerDailyData(response.data.payload);
      setSuccessMessage(response.data.success.message);
      setSubmitToManager(true);
    }
  } catch (err) {
    console.log(err.response);
    setErrorMessage("Something went wrong");
    setSubmitToManager(false);
  } finally {
    setTableLoading(false);
  }
};

// Submitting Worker Daily data to Manager
export const getSubmitToManager = async (
  userData,
  refreshTable,
  setRefreshTable,
  history,
  setErrorMessage,
  setTableLoading
) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_BASEURL}/employeeMuster/submitTimesheet?week_number=${userData.week_number}&timesheet_id=${userData.timesheet_id}&userId=${userData.user_id}`,
    });

    console.log(response.data);
    if (response.data.status == 200) {
      console.log(response.data);
      setRefreshTable(!refreshTable);
      history.push({
        pathname: "/timecard",
      });
    }
  } catch (err) {
    console.log(err.response);
    setErrorMessage("Something went wrong");
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  } finally {
    setTableLoading(false);
  }
};
