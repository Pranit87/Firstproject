import axios from "axios";

//Employee api with filters (emp muster section) //
export const getEmployees = async (
  filtersValue,
  setAllEmployeeDetails,
  setTableLoading,
  setSubmitting,
  page,
  setTotalPage,
  setInitialMultipleList
) => {
  try {
    setTableLoading(true);

    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_BASEURL}/employeeMuster/list?page=${page}`,
      params: filtersValue,
    });
    setAllEmployeeDetails(response.data.payload.data);
    setInitialMultipleList(response.data.payload.data.map((item) => item.id));
    setTotalPage(
      Math.ceil(
        response.data.payload.pagination.total /
          response.data.payload.pagination.per_page
      )
    );
  } catch (err) {
    console.log(err);
  } finally {
    setTableLoading(false);
    setSubmitting && setSubmitting(false);
  }
};

//Hidden rows for the table (emp muster section)
export const getExtendedDetails = async (
  id,
  setExtendedDetails,
  setLoading
) => {
  try {
    setLoading(true);
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/employeeMuster/EmployeeExtend?id=${id}`
    );
    setExtendedDetails(response.data.payload || null);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

//tax info api
export const getAllTax = async (id, setTaxID) => {
  try {
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/employeeMuster/TaxDetails?id=${id}`
    );
    setTaxID(response.data.payload);
  } catch (err) {
    console.log(err);
  }
};

// individual Employee info api
export const getEmployeeDetails = async (id, setEmpID, setLoading) => {
  try {
    setLoading(true);
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/employeeMuster/view?id=${id}`
    );
    setEmpID(response.data.payload);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

//Citizenship
export const getAllCitizenship = async (setCitizenship) => {
  try {
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/employeeMuster/CitizenList`
    );
    setCitizenship(response.data.payload);
  } catch (err) {
    console.log(err);
  }
};
//Visa Status
export const getAllVisaStatus = async (setVisaStatus) => {
  try {
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/employeeMuster/VisaList`
    );
    setVisaStatus(response.data.payload);
  } catch (err) {
    console.log(err);
  }
};
//Federal Holiday List
export const getAllHolidays = async (setFedHolidays) => {
  try {
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/employeeMuster/HolidaysList`
    );
    setFedHolidays(response.data.payload);
  } catch (err) {
    console.log(err);
  }
};
//Resume Search dropdown
export const getResumes = async (queries, setResumes, setIsLoading) => {
  try {
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/employeeMuster/ResumeSearchList?search=${queries}`
    );
    setResumes(response.data.payload);
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
  }
};
//Job Title Dropdown
export const getJobTitle = async (clientId, setJobTitle) => {
  try {
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/employeeMuster/ClientJobList?client_id=${clientId}`
    );

    setJobTitle(response.data.payload);
  } catch (err) {
    console.log(err);
  }
};
//Staff Company Dropdown
export const getStaffCompany = async (setStaffCompany) => {
  try {
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/employeeMuster/EmployeeDropdown?lookup_name=STAFF_COMPANY`
    );
    setStaffCompany(response.data.payload);
  } catch (err) {
    console.log(err);
  }
};
//Staff Type Dropdown
export const getStaffType = async (setStaffType) => {
  try {
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/employeeMuster/EmployeeDropdown?lookup_name=STAFF_TYPE`
    );
    setStaffType(response.data.payload);
  } catch (err) {
    console.log(err);
  }
};

//posting add employee data
export const saveEmployee = async (values, setSubmitting, setErrorMessage) => {
  try {
    setSubmitting(true);
    var FormData = require("form-data");
    var data = new FormData();
    Object.keys(values).forEach((key) => data.append(key, values[key]));

    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/employeeMuster/EmployeeSubmit`,
      data: data,
    });
    if (response.status === 200) {
      setSubmitting(false);
      window.history.go(-1);
    }
  } catch (error) {
    var validation = error.response.data.success.message.email;
    setSubmitting(false);
    setErrorMessage(validation ? validation : "Something went wrong");
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
};

//Employee Muster User Details
export const getEmployeeLogs = async (id, setEmployeeLogs, setLoading) => {
  try {
    setLoading(true);
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/employeeMuster/LogList?id=${id}`
    );
    setEmployeeLogs(response.data.payload);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

//Employee Muster User HR Approval Details
export const getEmployeeHRApproval = async (
  id,
  setHrApprovalData,
  setHrApprovalLoading
) => {
  try {
    setHrApprovalLoading(true);
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/employeeMuster/HrApprovalStatus?id=${id}`
    );
    setHrApprovalData(response.data.payload);
  } catch (err) {
    console.log(err);
  } finally {
    setHrApprovalLoading(false);
  }
};
//Employee Muster User HR Approval Update
export const postEmployeeHRApproval = async (
  updatedValues,
  setNotify,
  hrApprovalRefreshLoading,
  setHrApprovalRefreshLoading,
  setSubmitting
) => {
  try {
    setSubmitting(true);
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/employeeMuster/UpdateHrApproval`,
      data: updatedValues,
    });
    if (response) {
      setSubmitting(false);
      setHrApprovalRefreshLoading(!hrApprovalRefreshLoading);
      setNotify({
        show: true,
        title: "Success",
        description: response.data.success.message,
        type: "success",
      });
    }
  } catch (err) {
    console.log(err);
    setSubmitting(false);
    setNotify({
      show: true,
      description: "Something went wrong",
      type: "danger",
    });
  }
};

//Employee Muster User HR Approval Update
export const postEOCStatus = async (
  data,
  setSubmitting,
  setShowEOCDialog,
  setLoading,
  loading
) => {
  try {
    setSubmitting(true);
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/employeeMuster/UpdateEOC`,
      data: data,
    });
    if (response) {
      setShowEOCDialog(false);
      setLoading(!loading);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setSubmitting(false);
  }
};

// individual Employee info api
export const getExistingEmployeeDetails = async (
  id,
  setEmployeeInitialValue,
  setLoading,
  setClientId,
  setQueries
) => {
  try {
    setLoading(true);
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/employeeMuster/EmployeeDetails?id=${id}`
    );

    if (response.data.payload) {
      setEmployeeInitialValue(response.data.payload);
      setClientId(response.data.payload.client_id);
      setQueries(response.data.payload.resume_id);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

//Employee Muster User VCare
export const postVCareData = async (
  data,
  setRefreshVCare,
  refreshVCare,
  setDataSaveLoading
) => {
  try {
    setDataSaveLoading(true);
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/employeeMuster/VcareAdd`,
      data: data,
    });
    if (response.data.status === 200) setRefreshVCare(!refreshVCare);
  } catch (err) {
    console.log(err);
  } finally {
    setDataSaveLoading(false);
  }
};

export const getVCareData = async (id, setVCareData, setLoading) => {
  try {
    setLoading(true);
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/employeeMuster/VcareList?id=${id}`
    );

    if (response.data.payload) {
      setVCareData(response.data.payload);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

//Employee Muster User CGS
export const postCGSData = async (
  data,
  setRefreshVCare,
  refreshVCare,
  setDataSaveLoading
) => {
  try {
    setDataSaveLoading(true);
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_BASEURL}/employeeMuster/CGSAdd`,
      data: data,
    });
    if (response.data.status === 200) setRefreshVCare(!refreshVCare);
  } catch (err) {
    console.log(err);
  } finally {
    setDataSaveLoading(false);
  }
};

export const getCGSData = async (id, setCGSData, setLoading) => {
  try {
    setLoading(true);
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/employeeMuster/CGSList?id=${id}`
    );

    if (response.data.payload) {
      setCGSData(response.data.payload);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

//Employee Muster Delete API
export const deleteWorkerEmployee = async (
  id,
  setLoading,
  page,
  handleClose,
  setTabelLoading,
  tabelLoading
) => {
  try {
    setLoading(true);
    const response = await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_BASEURL}/employeeMuster/DeleteEmployee?id=${id}`,
    });

    if (response.data.status === 200 && page === "details") {
      handleClose();
      window.history.go(-1);
    } else if (response.data.status === 200 && page === "stats") {
      handleClose();
      setTabelLoading && setTabelLoading(!tabelLoading);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

export const getExportEmployeeList = async (values, setLoading, setNotify) => {
  try {
    setLoading(true);
    const response = await axios({
      url: `${process.env.REACT_APP_API_BASEURL}/employeeMuster/EmployeListDownload`,
      method: "GET",
      params: values,
    });
    if (response) {
      setNotify({
        show: true,
        title: "Success",
        description: response.data.success.message,
        type: "success",
      });
    }
  } catch (err) {
    console.log(err);
    setNotify({
      show: true,
      title: "Error",
      description: err.response.data.success.message,
      type: "danger",
    });
  } finally {
    setLoading(false);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
};

//Timesheet Delete Api

export const deleteTimesheet = async (
  id,
  timesheet_id,
  setLoading,
  page,
  handleClose,
  setTabelLoading,
  tabelLoading
) => {
  try {
    setLoading(true);
    const response = await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_BASEURL}/employeeMuster/DeleteTimesheet?user_id=${id}&timesheet_id=${timesheet_id}`,
    });
    if (response.data.status === 200) {
      handleClose();
      // setTabelLoading(true);
      window.location.reload(true);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
