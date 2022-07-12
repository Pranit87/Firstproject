import React from "react";
import TextFiledInput from "./common/textFieldInput";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import {
  getCareerBuilderSearch,
  getCareerResumeDownload,
} from "../../Services/sourceService";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { OverlayTrigger, Tooltip, Popover } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { freshnessDays, freshnessTypes } from "../../constants";
import Checkbox from "./common/checkbox";
import { format } from "date-fns";

const SearchCareerBuilder = ({
  collapse,
  ddOption,
  handleCheckedEvent,
  careerFormData,
  reqId,
  commonCount,
  careerCommonString,
  reqUniqueId,
  options,
  bulkDownload,
  setCareerFormData,
  career,
  bulkDownloadLoader,
  setCareer,
  rowCareerErrorArray,
  setTotalResultsFound,
}) => {
  const [formData, setFormData] = React.useState({
    searchString: "",
    careerbuilderState: "",
    careerbuilderCity: "",
    careerbuilderZipcode: "",
    careerbuilderCBMinimumExperience: "",
    careerbuilderMinimumDegree: "",
    careerbuilderEmploymentType: "",
    careerbuilderJobCategories: "",
    careerbuilderFreshnessInDays: "1YEAR",
    careerbuilderFreshnessType: "lastActivity",
    careerbuilderSearchRadiusInMiles: "",
    careerbuilderCurrentlyEmployed: "",
    careerbuilderRelocationFilter: "",
    careerbuilderWorkStatus: "",
    careerbuilderSecurityClearance: "",
  });
  const [searchData, setSeacrhData] = React.useState(null);
  const [pageNo, setPageNo] = React.useState(1);
  const [checked, setChecked] = React.useState(false);
  const [openLoading, setOpenLoading] = React.useState(false);
  const [spinnerLoading, setSpinnerLoading] = React.useState(false);
  const [vatsSearchCount, setVatsSearchCount] = React.useState(0);
  const [totalPage, setTotalPage] = React.useState(0);
  const [careerLoader, setCareerLoader] = React.useState([]);
  const [careerError, setCareerError] = React.useState();
  const [errorRowID, setErrorRowID] = React.useState(0);
  const [messageCSS, setMessageCSS] = React.useState("");
  const [NoDataMessage, setNoDataMessage] = React.useState(
    "No records available"
  );

  const loaderTrigger = () => {
    setOpenLoading(!openLoading);
    setSpinnerLoading(!spinnerLoading);
  };

  // this useEffect is for saving common search button click count and enabeling loader
  React.useEffect(() => {
    if (commonCount > 0 && careerCommonString === "CAREER") {
      loaderTrigger();
    }
    setVatsSearchCount(commonCount);
  }, [commonCount]);

  const onChangeEvent = (e, name) => {
    setFormData({ ...formData, [name]: e });
    if (name === "careerbuilderZipcode" && e.length > 0) {
      setFormData({
        ...formData,
        [name]: e,
        careerbuilderSearchRadiusInMiles: "30",
      });
    } else if (name === "careerbuilderZipcode" && e.length <= 0) {
      setFormData({
        ...formData,
        [name]: e,
        careerbuilderSearchRadiusInMiles: "",
      });
    }
    if (name === "searchString")
      setCareerFormData({ ...careerFormData, searchString: e });
  };

  const onSubmitFilters = (e) => {
    e.preventDefault();
    loaderTrigger();
    setCareer([]); // clear stored array of checked records
    setChecked(false); // clear checked records
    setVatsSearchCount(vatsSearchCount + 1);
    setPageNo(1);
  };

  // this one is for individual search
  React.useEffect(() => {
    if (vatsSearchCount > 0 && careerCommonString === "CAREER") {
      getCareerBuilderSearch(
        formData,
        setSeacrhData,
        pageNo,
        setOpenLoading,
        setSpinnerLoading,
        setTotalPage,
        setNoDataMessage,
        setMessageCSS,
        reqId,
        setTotalResultsFound
      );
    }
  }, [pageNo, vatsSearchCount, careerCommonString]);

  let pageClickHandler;
  const handlePageClick = (datas) => {
    clearTimeout(pageClickHandler);
    pageClickHandler = setTimeout(() => {
      loaderTrigger();
      setCareer([]); // clear stored array of checked records
      setChecked(false); // clear checked records
      setPageNo(parseInt(datas.selected) + 1);
    }, 300);
  };

  const resumeCareerDownloadEvent = (rows, idx) => {
    setCareerLoader((value) => {
      value.push(idx);
      return value;
    });
    if (typeof rows === "object") {
      rows.map((row) => {
        var FormData = require("form-data");
        var data = new FormData();
        row.Name && data.append("name", `${row.Name}`);
        row.Keywords &&
          data.append(
            "skills",
            `${Object.keys(row.Keywords).map((skills) => skills)}`
          );
        row.Location &&
          data.append("location", `${row.Location["FreeLocation"]}`);
        row.YearsOfExperience && data.append("exp", `${row.YearsOfExperience}`);
        row.Location && data.append("zipcode", `${row.Location["ZipCode"]}`);
        data.append(
          "education",
          row.Educations
            ? `${row.Educations.map((item) => item.DegreeLevel)}`
            : "NULL"
        );
        // data.append("workAuthorization", "US Citizen");
        data.append(
          "resume_job_title",
          row.JobTitle ? `${row.JobTitle}` : "NULL"
        );
        data.append(
          "resume_last_activity",
          row.Attributes["LastAccessed"]
            ? `${row.Attributes["LastAccessed"]}`
            : "NULL"
        );
        data.append(
          "resume_last_updated",
          row.ResumeLastModified ? `${row.ResumeLastModified}` : "NULL"
        );

        const string = formData.searchString || " ";
        const downloadedResumeID = async () => {
          setErrorRowID(row.EdgeID);
          const functioncall = await getCareerResumeDownload(
            row.EdgeID,
            data,
            setCareerError,
            setCareerLoader
          );
          if (functioncall) {
            setCareerLoader((value) => value.filter((i) => i !== idx));
            setCareerError("");
            try {
              return window.open(
                `/resume/${functioncall.data.payload[0].resumeSid}/${string
                  .replaceAll("/", "%2F")
                  .replaceAll("#", "%23")}/${reqId || 0}/career/${
                  reqUniqueId || 0
                }/2`,
                "_blank"
              );
            } catch (err) {
              console.log(err.message);
              setCareerError(
                "Unable to show data, required fields are missing."
              );
              setOpenLoading(false);
              setSpinnerLoading(false);
            }
          } else {
            setOpenLoading(false);
            setSpinnerLoading(false);
          }
        };
        downloadedResumeID();
      });
    }
  };

  React.useEffect(() => {
    setFormData({ ...formData, ...careerFormData });
    if (
      careerFormData &&
      careerFormData.careerbuilderZipcode &&
      careerFormData.careerbuilderZipcode.length > 0
    ) {
      setFormData({
        ...formData,
        ...careerFormData,
        careerbuilderSearchRadiusInMiles: "30",
      });
    } else if (
      careerFormData &&
      careerFormData.careerbuilderZipcode &&
      careerFormData.careerbuilderZipcode.length <= 0
    ) {
      setFormData({
        ...formData,
        ...careerFormData,
        careerbuilderSearchRadiusInMiles: "",
      });
    }
  }, [careerFormData]);

  //functions to get dropdown data for filters
  const filterColors = (inputValue, dropdownKey) => {
    return (
      options[dropdownKey] &&
      options[dropdownKey].filter((i) =>
        i.value.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  };

  const promiseOptions = (inputValue, dropdownKey) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue, dropdownKey));
      }, 1000);
    });

  const statusData = (clients, statusType) => {
    return (
      clients &&
      clients
        .filter((value) => {
          if (value.status) {
            if (statusType == 1) {
              return value.status.includes("Submitted");
            } else if (statusType == 2) {
              return value.status.includes("Interview");
            } else if (statusType == 3) {
              return value.status.includes("Offer");
            } else if (statusType == 4) {
              return value.status.includes("Started");
            } else return null;
          } else return null;
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1))[0]
    );
  };

  const popover = (clients, statusType) => {
    const data = statusData(clients, statusType);
    return (
      <Popover style={{ minWidth: "400px" }}>
        <Popover.Content className="pop-content" style={{ minWidth: "400px" }}>
          <div className="pop-body" style={{ minWidth: "400px" }}>
            <div className="row px-4 pt-2">
              <div className="col-lg-4 mb-4 mb-lg-0 tech-back-color py-2">
                <span className="mr-2 pr-2">
                  <span className={"text-highlight-color font-weight-bold"}>
                    ID
                  </span>
                </span>
              </div>
              <div className="col-lg-8 tech-back-color py-2">
                <span className="mr-2 pr-2">
                  <span className={"text-highlight-color"}>
                    {data ? data.id : null}
                  </span>
                </span>
              </div>
            </div>

            <div className="row px-4 pt-1">
              <div className="col-lg-4 mb-4 mb-lg-0 tech-back-color py-2">
                <span className="mr-2 pr-2">
                  <span className={"text-highlight-color font-weight-bold"}>
                    Job Title
                  </span>
                </span>
              </div>
              <div className="col-lg-8 tech-back-color py-2">
                <span className="mr-2 pr-2">
                  <span className={"text-highlight-color"}>
                    {data ? data.job_title : null}
                  </span>
                </span>
              </div>
            </div>

            <div className="row px-4 pt-1">
              <div className="col-lg-4 mb-4 mb-lg-0 tech-back-color py-2">
                <span className="mr-2 pr-2">
                  <span className={"text-highlight-color font-weight-bold"}>
                    Client
                  </span>
                </span>
              </div>
              <div className="col-lg-8 tech-back-color py-2">
                <span className="mr-2 pr-2">
                  <span className={"text-highlight-color"}>
                    {data ? data.client : null}
                  </span>
                </span>
              </div>
            </div>

            <div className="row px-4 pt-1 pb-2">
              <div className="col-lg-4 mb-4 mb-lg-0 tech-back-color py-2">
                <span className="mr-2 pr-2">
                  <span className={"text-highlight-color font-weight-bold"}>
                    Status
                  </span>
                </span>
              </div>
              <div className="col-lg-8 tech-back-color py-2">
                <span className="mr-2 pr-2">
                  <span className={"text-highlight-color"}>
                    {data ? data.status : null}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    );
  };

  return (
    <React.Fragment>
      <div id="searchfilter" className={collapse ? "collapse" : ""}>
        <div className={`${openLoading ? "spinner" : undefined}`}>
          <div>
            <div className="ml-4 search-filters">Search Filters</div>
          </div>
          <Form>
            <Form.Group>
              <div className="row px-4 py-2">
                <TextFiledInput
                  col="6"
                  type="search"
                  placeholder="Search by Text"
                  value={
                    formData && formData.searchString
                      ? formData.searchString
                      : ""
                  }
                  onChangeEvent={onChangeEvent}
                  formKey="searchString"
                />
                <div className={"col-lg-2 mb-4 mb-lg-0 indexs"}>
                  <AsyncSelect
                    escapeClearsValue
                    isClearable
                    placeholder="Select State"
                    cacheOptions
                    defaultOptions
                    loadOptions={(e) => promiseOptions(e, "states")}
                    value={
                      options["states"] &&
                      options["states"].filter(
                        ({ stateCode }) =>
                          stateCode === formData.careerbuilderState
                      )
                    }
                    onChange={(e) => {
                      onChangeEvent(e && e.stateCode, "careerbuilderState");
                    }}
                    getOptionLabel={({ value }) => value}
                    getOptionValue={({ stateCode }) => stateCode}
                  />
                </div>
                <div className={"col-lg-2 mb-4 mb-lg-0 indexs"}>
                  <AsyncSelect
                    escapeClearsValue
                    isClearable
                    placeholder="Select City"
                    cacheOptions
                    loadOptions={(e) => promiseOptions(e, "cities")}
                    value={
                      options["cities"] &&
                      options["cities"].filter(
                        ({ value }) => value === formData.careerbuilderCity
                      )
                    }
                    onChange={(e) => {
                      onChangeEvent(e && e.value, "careerbuilderCity");
                    }}
                    getOptionLabel={({ value }) => value}
                    getOptionValue={({ value }) => value}
                  />
                </div>
                <TextFiledInput
                  col="2"
                  type="search"
                  placeholder="Experience (in years)"
                  value={
                    formData &&
                    formData.careerbuilderCBMinimumExperience &&
                    /^-?[0-9]+$/.test(formData.careerbuilderCBMinimumExperience)
                      ? formData.careerbuilderCBMinimumExperience
                      : ""
                  }
                  onChangeEvent={onChangeEvent}
                  formKey="careerbuilderCBMinimumExperience"
                />
              </div>
              <div className="row px-4 py-4">
                <div className={"col-lg-3 mb-4 mb-lg-0 indexs"}>
                  <AsyncSelect
                    escapeClearsValue
                    isClearable
                    placeholder="Select Min Education level"
                    cacheOptions
                    defaultOptions
                    loadOptions={(e) =>
                      promiseOptions(e, "educationLevelCareerBuilder")
                    }
                    value={
                      options["educationLevelCareerBuilder"] &&
                      options["educationLevelCareerBuilder"].filter(
                        ({ id }) => id === formData.careerbuilderMinimumDegree
                      )
                    }
                    onChange={(e) => {
                      onChangeEvent(e && e.id, "careerbuilderMinimumDegree");
                    }}
                    getOptionLabel={({ value }) => value}
                    getOptionValue={({ id }) => id}
                  />
                </div>
                <div className={"col-lg-3 mb-4 mb-lg-0 indexs"}>
                  <AsyncSelect
                    escapeClearsValue
                    isClearable
                    placeholder="Select Employment Type"
                    cacheOptions
                    defaultOptions
                    loadOptions={(e) =>
                      promiseOptions(e, "employmentTypeCareerBuilder")
                    }
                    value={
                      options["employmentTypeCareerBuilder"] &&
                      options["employmentTypeCareerBuilder"].filter(
                        ({ id }) => id === formData.careerbuilderEmploymentType
                      )
                    }
                    onChange={(e) => {
                      onChangeEvent(e && e.id, "careerbuilderEmploymentType");
                    }}
                    getOptionLabel={({ value }) => value}
                    getOptionValue={({ id }) => id}
                  />
                </div>
                <TextFiledInput
                  col=""
                  placeholder="Job Title"
                  value={
                    formData && formData.careerbuilderJobCategories
                      ? formData.careerbuilderJobCategories
                      : ""
                  }
                  onChangeEvent={onChangeEvent}
                  formKey="careerbuilderJobCategories"
                />
                <TextFiledInput
                  col="2"
                  placeholder="Zip Code"
                  value={
                    formData &&
                    formData.careerbuilderZipcode &&
                    /^-?[0-9]+$/.test(formData.careerbuilderZipcode)
                      ? formData.careerbuilderZipcode
                      : ""
                  }
                  onChangeEvent={onChangeEvent}
                  formKey="careerbuilderZipcode"
                />
                <TextFiledInput
                  col=""
                  type="search"
                  placeholder="Within Distance (Miles)"
                  value={
                    formData &&
                    formData.careerbuilderSearchRadiusInMiles &&
                    /^-?[0-9]+$/.test(
                      formData.careerbuilderSearchRadiusInMiles
                    ) &&
                    formData.careerbuilderZipcode
                      ? formData.careerbuilderSearchRadiusInMiles
                      : ""
                  }
                  onChangeEvent={onChangeEvent}
                  formKey="careerbuilderSearchRadiusInMiles"
                  disabled={
                    formData &&
                    formData.careerbuilderZipcode &&
                    /^-?[0-9]+$/.test(formData.careerbuilderZipcode)
                      ? false
                      : true
                  }
                />
              </div>
              <div className="row px-4 py-2">
                <div className={"col-lg-3 mb-4 mb-lg-0 index"}>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={freshnessTypes[0]}
                    isSearchable={false}
                    name="careerbuilderFreshnessType"
                    onChange={(e) => {
                      onChangeEvent(e && e.value, "careerbuilderFreshnessType");
                    }}
                    value={
                      freshnessTypes &&
                      freshnessTypes.filter(
                        ({ value }) =>
                          value === formData.careerbuilderFreshnessType
                      )
                    }
                    options={freshnessTypes}
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                  />
                </div>
                <div className={"col-lg-3 mb-4 mb-lg-0 index"}>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={freshnessDays[6]}
                    isSearchable={false}
                    name="careerbuilderFreshnessInDays"
                    onChange={(e) => {
                      onChangeEvent(
                        e && e.value,
                        "careerbuilderFreshnessInDays"
                      );
                    }}
                    value={
                      freshnessDays &&
                      freshnessDays.filter(
                        ({ value }) =>
                          value === formData.careerbuilderFreshnessInDays
                      )
                    }
                    options={freshnessDays}
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                  />
                </div>
                {/* <div className={"col-lg-3 mb-4 mb-lg-0 index"}>
                  <AsyncSelect
                    escapeClearsValue
                    isClearable
                    placeholder="Select Work Authorization"
                    cacheOptions
                    styles={{
                      zIndex: 2,
                    }}
                    defaultOptions
                    loadOptions={(e) =>
                      promiseOptions(e, "careerbuilderWorkStatus")
                    }
                    value={
                      options["careerbuilderWorkStatus"] &&
                      options["careerbuilderWorkStatus"].filter(
                        ({ code }) => code === formData.careerbuilderWorkStatus
                      )
                    }
                    onChange={(e) => {
                      onChangeEvent(e && e.code, "careerbuilderWorkStatus");
                    }}
                    getOptionLabel={({ value }) => value}
                    getOptionValue={({ code }) => code}
                  />
                </div> */}

                <div className="row px-4 py-2">
                  <Checkbox
                    className="check-word"
                    id="careerbuilderSecurityClearance"
                    label="Have Security Clearance"
                    onChangeEvent={onChangeEvent}
                    value={formData.careerbuilderSecurityClearance}
                  />
                  <Checkbox
                    className="check-word"
                    id="careerbuilderCurrentlyEmployed"
                    label="Include results where currently employed"
                    onChangeEvent={onChangeEvent}
                    value={formData.careerbuilderCurrentlyEmployed}
                  />
                  <Checkbox
                    className="check-word"
                    id="careerbuilderRelocationFilter"
                    label="Willing To Relocate"
                    onChangeEvent={onChangeEvent}
                    value={formData.careerbuilderRelocationFilter}
                  />
                </div>
              </div>
            </Form.Group>
            <div className="px-3">
              <button
                type="button"
                className="btn btn-sm text-white px-5 b-color-search-description m-2"
                onClick={(e) => onSubmitFilters(e)}
              >
                Search
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm px-5"
                onClick={() => {
                  setCareer([]); // clear stored array of checked records
                  setChecked(false); // clear checked records
                  setFormData({
                    careerbuilderFreshnessInDays: "1YEAR",
                    careerbuilderFreshnessType: "lastActivity",
                  });
                  setSeacrhData(null);
                }}
              >
                Reset
              </button>
            </div>
          </Form>
        </div>
        <Formik
          initialValues={[]}
          enableReinitialize={true}
          validationSchema={null}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            let editTraineeFormValues = Object.assign({}, values);

            // ** Remove values from object which are null (As requested by API end point) **
            Object.keys(editTraineeFormValues).forEach(
              (key) =>
                (editTraineeFormValues[key] === null ||
                  editTraineeFormValues[key] === "undefined") &&
                delete editTraineeFormValues[key]
            );
            resumeCareerDownloadEvent(values);
            setSubmitting(false);
          }}
        >
          {(props) => {
            const { values, handleChange, handleSubmit } = props;
            return (
              <Form>
                <Form.Group>
                  {!openLoading && searchData && searchData.length > 0
                    ? searchData.map((row, idx) => (
                        <div
                          id={`career-div-${row.EdgeID}`}
                          className={`${
                            careerLoader.indexOf(idx) > -1 ? "spinner" : ""
                          }`}
                        >
                          <div class="inner mx-4 pb-2 mb-3 font">
                            <div class="pt-1 px-2 text-center text-lg-left checkbox-search-result">
                              <hr class="hr" />
                              {Array.isArray(rowCareerErrorArray) &&
                              rowCareerErrorArray.includes(row.EdgeID) ? (
                                <div
                                  class={`no-data font-weight-bold text-danger result-not-found-${row.EdgeID}`}
                                >
                                  Resume is not available with provider
                                </div>
                              ) : (
                                errorRowID === row.EdgeID &&
                                careerError &&
                                !careerLoader.length && (
                                  <>
                                    <div
                                      className={`no-data ${messageCSS} font-weight-bold text-danger result-not-found`}
                                    >
                                      <span>{careerError}</span>
                                    </div>
                                  </>
                                )
                              )}
                              <div class="custom-control custom-checkbox d-lg-flex justify-content-between">
                                <div className="d-lg-flex">
                                  <input
                                    type="checkbox"
                                    key={row.EdgeID}
                                    className={"custom-control-input ml-1"}
                                    name={row.EdgeID}
                                    id={row.EdgeID}
                                    onChange={(e) => {
                                      setChecked({
                                        ...checked,
                                        [row.EdgeID]: e.target.checked,
                                      });
                                      e.target.checked
                                        ? handleCheckedEvent(
                                            "career",
                                            row,
                                            true
                                          )
                                        : handleCheckedEvent(
                                            "career",
                                            row,
                                            false
                                          );
                                    }}
                                    checked={
                                      checked && checked[row.EdgeID]
                                        ? true
                                        : false
                                    }
                                  />
                                  <label
                                    for={row.EdgeID}
                                    class="custom-control-label font-weight-bold text-primary h6 ml-1"
                                  >
                                    &nbsp;{row.Name}
                                  </label>
                                  <span class="small">
                                    &nbsp;
                                    {row.Location
                                      ? `${row.Location["City"]}, ${row.Location["StateCode"]}, ${row.Location["ZipCode"]}, ${row.Location["CountryCode"]}`
                                      : ""}
                                  </span>
                                  {row.isDownloaded &&
                                    row.resumeId &&
                                    Number.isInteger(row.resumeId) && (
                                      <div class="mx-3">
                                        {row.clients &&
                                        statusData(row.clients, 1) ? (
                                          <OverlayTrigger
                                            rootClose
                                            trigger="click"
                                            placement="bottom"
                                            overlay={popover(row.clients, 1)}
                                          >
                                            <button
                                              type="button"
                                              className="btn btn-primary btn-lg font-weight-bold px-0 py-0 mr-2"
                                              style={{
                                                width: "40px",
                                                height: "14px",
                                              }}
                                            ></button>
                                          </OverlayTrigger>
                                        ) : null}
                                        {row.clients &&
                                        statusData(row.clients, 2) ? (
                                          <OverlayTrigger
                                            rootClose
                                            trigger="click"
                                            placement="bottom"
                                            overlay={popover(row.clients, 2)}
                                          >
                                            <button
                                              type="button"
                                              className="btn btn-warning btn-lg font-weight-bold px-0 py-0 mr-2"
                                              style={{
                                                width: "40px",
                                                height: "14px",
                                              }}
                                            ></button>
                                          </OverlayTrigger>
                                        ) : null}
                                        {row.clients &&
                                        statusData(row.clients, 3) ? (
                                          <OverlayTrigger
                                            rootClose
                                            trigger="click"
                                            placement="bottom"
                                            overlay={popover(row.clients, 3)}
                                          >
                                            <button
                                              type="button"
                                              className="btn btn-success btn-lg font-weight-bold px-0 py-0 mr-2"
                                              style={{
                                                width: "40px",
                                                height: "14px",
                                              }}
                                            ></button>
                                          </OverlayTrigger>
                                        ) : null}
                                        {row.clients &&
                                        statusData(row.clients, 4) ? (
                                          <OverlayTrigger
                                            rootClose
                                            trigger="click"
                                            placement="bottom"
                                            overlay={popover(row.clients, 4)}
                                          >
                                            <button
                                              type="button"
                                              className="btn btn-danger btn-lg font-weight-bold px-0 py-0 mr-2"
                                              style={{
                                                width: "40px",
                                                height: "14px",
                                              }}
                                            ></button>
                                          </OverlayTrigger>
                                        ) : null}
                                      </div>
                                    )}
                                </div>
                                <div class="small pr-lg-2">
                                  {row?.Timestamps?.ResumeLastModified
                                    ?.Timestamp &&
                                    row.Timestamps.ResumeLastModified
                                      .Timestamp &&
                                    format(
                                      new Date(
                                        row.Timestamps.ResumeLastModified.Timestamp
                                      ),
                                      "PP"
                                    )}
                                </div>
                              </div>
                              <div class="font-weight-bold pl-lg-4 ml-lg-1 pb-lg-2">
                                {row.JobTitle}
                              </div>
                            </div>
                            <div class="d-lg-flex vats-font-size description-font">
                              <div class="pl-lg-5 ml-lg-n2 flex-fill text-center text-lg-left">
                                <div class="row">
                                  <div class="col-lg">
                                    <span class="description-color">
                                      Experience: &nbsp;
                                    </span>
                                    <span class="ml-lg-5">
                                      &nbsp;
                                      {row.YearsOfExperience
                                        ? row.YearsOfExperience + " Years"
                                        : "N/A"}
                                    </span>
                                  </div>
                                  <div class="col-lg">
                                    <span class="description-color pl-lg-2">
                                      Recent Position: &nbsp;
                                    </span>
                                    <span class="ml-lg-5">
                                      &nbsp;
                                      {row.Employments &&
                                      row.Employments[0].Position
                                        ? row.Employments[0].Position
                                        : "N/A"}
                                    </span>
                                  </div>
                                  <div class="col-lg">
                                    <span class="description-color pl-lg-3">
                                      Relocation: &nbsp;
                                    </span>
                                    <span class="pl-lg-4">
                                      &nbsp;Not Available
                                    </span>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-lg">
                                    <span class="description-color">
                                      Degree Level:{" "}
                                    </span>
                                    <span class="pl-lg-5 ml-lg-n1">
                                      {row.Educations
                                        ? row.Educations.map((row1) => {
                                            return row1.NormalizedEducation &&
                                              row1.NormalizedEducation[
                                                "DegreeLevel"
                                              ]
                                              ? `${row1.NormalizedEducation["DegreeLevel"]}`
                                              : "N/A";
                                          })
                                        : "N/A"}
                                    </span>
                                  </div>
                                  <div class="col-lg">
                                    <span class="description-color pl-lg-2">
                                      Recent Company:{" "}
                                    </span>
                                    <span class="ml-lg-5">
                                      {row.Employments &&
                                      row.Employments[0].Employer
                                        ? row.Employments[0].Employer
                                        : "N/A"}
                                    </span>
                                  </div>
                                  <div class="col-lg">
                                    <span class="description-color pl-lg-3">
                                      Authorization:{" "}
                                    </span>
                                    <span class="pl-lg-4 ml-lg-n2">
                                      Not Available
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="vl"></div>
                              <div class="flex-shrink text-center text-lg-left">
                                <Link
                                  onClick={() =>
                                    !row.isDownloaded
                                      ? resumeCareerDownloadEvent([row], idx)
                                      : undefined
                                  }
                                  to={
                                    row.isDownloaded
                                      ? `/resume/${row.resumeId || ""}/${
                                          (formData &&
                                            formData.commonText &&
                                            formData.commonText
                                              .replaceAll("/", "%2F")
                                              .replaceAll("#", "%23")) ||
                                          (formData &&
                                            formData.searchString &&
                                            formData.searchString
                                              .replaceAll("/", "%2F")
                                              .replaceAll("#", "%23")) ||
                                          " "
                                        }/${reqId || 0}/career/${
                                          reqUniqueId || 0
                                        }/1`
                                      : undefined
                                  }
                                  target={
                                    row.isDownloaded ? "_blank" : undefined
                                  }
                                >
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip id="button-tooltip-2">
                                        View Resume
                                      </Tooltip>
                                    }
                                  >
                                    <img
                                      src={"/images/view.png"}
                                      className="img-fluid px-1"
                                      alt="View Resume"
                                    />
                                  </OverlayTrigger>
                                </Link>
                                {row.isDownloaded &&
                                  row.resumeId &&
                                  Number.isInteger(row.resumeId) && (
                                    <Link
                                      to={`/candidates/${row.resumeId || ""}/${
                                        reqId || 0
                                      }`}
                                      target="_blank"
                                    >
                                      <OverlayTrigger
                                        placement="top"
                                        overlay={
                                          <Tooltip id="button-tooltip-2">
                                            View Candidate Profile
                                          </Tooltip>
                                        }
                                      >
                                        <img
                                          src={
                                            "/images/professional-profile-with-image.png"
                                          }
                                          className="img-fluid px-1"
                                          alt="View Candidate Profile"
                                        />
                                      </OverlayTrigger>
                                    </Link>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : searchData &&
                      !careerError &&
                      totalPage === 0 && (
                        <>
                          <hr class="hr" />
                          <div
                            className={`no-data ${messageCSS} font-weight-bold`}
                          >
                            <span>{NoDataMessage}</span>
                          </div>
                        </>
                      )}
                </Form.Group>
                {searchData && searchData.length > 0 && !openLoading && (
                  <Container fluid={true}>
                    <Row>
                      <Col>
                        {!career.length || (
                          <Button
                            variant="warning"
                            tabIndex={-1}
                            className="ml-4 float-left font-weight-bold px-3 bulkDownloadBtn"
                            onClick={() => bulkDownload()}
                          >
                            {bulkDownloadLoader
                              ? "Downloading (Career Builder) ..."
                              : "Bulk download (Career Builder)"}
                          </Button>
                        )}
                      </Col>
                      <Col className={"rightIcon"}>
                        <ReactPaginate
                          previousLabel={"<"}
                          nextLabel={">"}
                          breakLabel={"..."}
                          breakClassName={"break-me"}
                          pageCount={totalPage}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageClick}
                          forcePage={pageNo - 1}
                          containerClassName={"pagination"}
                          subContainerClassName={"pages pagination"}
                          activeClassName={"activePagination"}
                        />
                      </Col>
                    </Row>
                  </Container>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default SearchCareerBuilder;
