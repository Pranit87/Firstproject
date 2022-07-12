import React from "react";
import TextFiledInput from "./common/textFieldInput";
import { Form, Button } from "react-bootstrap";
import {
  getVatsSearch,
  getCommonResumeDownload,
  getVatsTotalResume,
} from "../../Services/sourceService";
import "./Dice.css";
import { Link } from "react-router-dom";

import { OverlayTrigger, Tooltip, Popover } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import AsyncSelect from "react-select/async";
import { convertDateStringToLocalDatetime } from "../Common/DateConverter";

//import "semantic-ui-css/semantic.min.css";

const SearchVats = ({
  collapse,
  ddOption,
  handleCheckedEvent,
  vatsFormData,
  reqId,
  commonCount,
  vatsCommonString,
  reqUniqueId,
  bulkDownload,
  setVatsFormData,
  vats,
  bulkDownloadLoader,
  options,
  setVats,
  setTotalResultsFound,
  setTotalRecordsAailable,
}) => {
  const [formData, setFormData] = React.useState({
    text: "",
    databaseCity: "",
    databaseState: "",
    databaseZipcode: "",
    // downloaded_resume: "",
    experience_years: "",
    email: "",
    job_title: "",
    lastActive: "",
    lastUpdated: "",
    MinimumDegree: "",
    WorkAuthorize: "",
  });
  const [searchData, setsearchData] = React.useState(null);
  const [pageNo, setPageNo] = React.useState(1);
  const [checked, setChecked] = React.useState(null);
  const [openLoading, setSpinnerLoading] = React.useState(false);
  const [spinnerLoading, setOpenLoading] = React.useState(false);
  const [vatsSearchCount, setVatsSearchCount] = React.useState(0);
  const [totalPage, setTotalPage] = React.useState(0);
  const [messageCSS, setMessageCSS] = React.useState("");
  const [NoDataMessage, setNoDataMessage] = React.useState(
    "No records available"
  );
  const [toggle, setToggle] = React.useState({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
  });
  const onChangeEvent = (e, name) => {
    setFormData({
      ...formData,
      [name]: e,
    });
    if (name === "text") setVatsFormData({ ...vatsFormData, text: e });
  };

  const loaderTrigger = () => {
    setOpenLoading(!openLoading);
    setSpinnerLoading(!spinnerLoading);
  };

  // this useEffect is for saving common search button click count and enabeling loader
  React.useEffect(() => {
    if (commonCount > 0 && vatsCommonString === "VATS") {
      loaderTrigger();
    }
    setVatsSearchCount(commonCount);
  }, [commonCount]);

  // this useEffect is for changing formData value according to common earch fields
  React.useEffect(() => {
    setFormData({ ...formData, ...vatsFormData });
  }, [vatsFormData]);

  // this is individual search submit function
  const onSubmit = (e) => {
    e.preventDefault();
    loaderTrigger();
    setVats([]);
    setChecked(null);
    setVatsSearchCount(vatsSearchCount + 1);
    setPageNo(1);
  };

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

  // this one is for individual search
  React.useEffect(() => {
    if (vatsSearchCount > 0 && vatsCommonString === "VATS") {
      getVatsSearch(
        formData,
        pageNo,
        setsearchData,
        setOpenLoading,
        setSpinnerLoading,
        setTotalPage,
        setNoDataMessage,
        setMessageCSS,
        reqId,
        setTotalResultsFound
      );
    }
  }, [pageNo, vatsSearchCount]);

  let pageClickHandler;
  const handlePageClick = (datas) => {
    clearTimeout(pageClickHandler);
    pageClickHandler = setTimeout(() => {
      loaderTrigger();
      setPageNo(parseInt(datas.selected) + 1);
      setVats([]);
      setChecked(null);
    }, 300);
  };

  const RowColumn = (props) => {
    let columns = [];
    let data = props.data.split(",");
    let id = props.id;
    data.forEach((item, idx) => {
      // push column
      columns.push(
        <div className={"col-lg-2  mt-lg-0 mt-1 mb-1"} key={idx}>
          <div className="tech-back-color px-2">
            <span className={"d-flex text-center"}>
              <span className={"text-highlight-color"}>{item ? item : ""}</span>
            </span>
          </div>
        </div>
      );

      // force wrap to next row every 6 columns
      if ((idx + 1) % 6 === 0) {
        columns.push(<div className="w-100"></div>);
      }
    });

    return <RenderItems listcolumn={columns} id={id} />;
  };

  const RenderItems = (props) => {
    let list = props.listcolumn;
    let id = props.id;
    let newList = [];
    let text = "";
    let show = true;

    if (list && list.length > 0) {
      if (list.length > 12 && toggle[id] === true) {
        newList = list.slice(0, 12);
        text = "View More";
      } else if (list.length > 12 && toggle[id] === false) {
        newList = list;
        text = "View Less";
      } else {
        newList = list;
        show = false;
      }
    }

    return (
      <div>
        <div className="row px-4">{newList ? newList : ""}</div>
        {show && (
          <div
            className="px-4"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <button
              className="btn btn-primary"
              onClick={() =>
                setToggle({
                  ...toggle,
                  [id]: !toggle[id],
                })
              }
            >
              {text}
            </button>
          </div>
        )}
      </div>
    );
  };

  const AcronymName = (props) => {
    var regular_ex = /\b(\w)/g;
    var matches = props.str.match(regular_ex);
    var acronym = (matches && matches.join("")) || "";

    return (
      <div className={"container_acronym"}>
        <div className={"name_acronym"}>{acronym}</div>
      </div>
    );
  };

  function calcDate(date1, date2) {
    var sdt = new Date(date2);
    var difdt = new Date(new Date() - sdt);

    return difdt.getMonth() + 1;
  }

  const resumeVatsDownloadEvent = (resumeId, row) => {
    var FormData = require("form-data");
    var data = new FormData();
    data.append("name", `${row.name}`);
    data.append("skills", `"${row.skills}"`);
    data.append("location", `${row.location}`);
    data.append("exp", `${row.experience_years}`);
    data.append("zipcode", `${row.zipcode}`);
    // getCommonResumeDownload(resumeId, data);
    const string = formData.text ? formData.text : " ";
    return window.open(
      `/resume/${resumeId}/${string
        .replaceAll("/", "%2F")
        .replaceAll("#", "%23")}/${reqId || 0}/database/${reqUniqueId || 0}/1`,
      "_blank"
    );
  };

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

  React.useEffect(() => {
    getVatsTotalResume(setTotalRecordsAailable);
  }, [setTotalRecordsAailable]);

  return (
    <React.Fragment>
      <div id="searchfilter" className={collapse ? "collapse" : ""}>
        <div className={`${openLoading ? "spinner" : undefined}`}>
          <div>
            <div className="ml-lg-4 ml-3 search-filters">Search Filters</div>
          </div>
          <Form>
            <div className="row px-4 py-2">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <TextFiledInput
                  className="form-control mr-2 pr-5"
                  type="search"
                  placeholder="Search by text"
                  value={formData && formData.text ? formData.text : ""}
                  onChangeEvent={onChangeEvent}
                  formKey="text"
                />
              </div>
              <div className="col-lg-3">
                <TextFiledInput
                  className="form-control mr-2 pr-5"
                  type="search"
                  placeholder="Job Title"
                  onChangeEvent={onChangeEvent}
                  formKey="job_title"
                />
              </div>
              <div className="col-lg-3">
                <TextFiledInput
                  className="form-control mr-2 pr-5"
                  type="search"
                  placeholder="Experience (in Years)"
                  value={
                    formData &&
                    formData.experience_years &&
                    /^-?[0-9]+$/.test(formData.experience_years)
                      ? formData.experience_years
                      : ""
                  }
                  onChangeEvent={onChangeEvent}
                  formKey="experience_years"
                />
              </div>
            </div>
            <div className="row px-4 pb-1 pt-4">
              <div className="col-lg mb-4 mb-lg-0 index">
                <Form.Group>
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
                        ({ value }) => value === formData.databaseState
                      )
                    }
                    onChange={(e) => {
                      onChangeEvent(e && e.value, "databaseState");
                    }}
                    getOptionLabel={({ value }) => value}
                    getOptionValue={({ value }) => value}
                  />
                </Form.Group>
              </div>
              <div className="col-lg mb-4 mb-lg-0 index">
                <Form.Group>
                  <AsyncSelect
                    escapeClearsValue
                    isClearable
                    placeholder="Select City"
                    cacheOptions
                    loadOptions={(e) => promiseOptions(e, "cities")}
                    value={
                      options["cities"] &&
                      options["cities"].filter(
                        ({ value }) => value === formData.databaseCity
                      )
                    }
                    onChange={(e) => {
                      onChangeEvent(e && e.value, "databaseCity");
                    }}
                    getOptionLabel={({ value }) => value}
                    getOptionValue={({ value }) => value}
                  />
                </Form.Group>
              </div>
              <div className="col-lg mb-4 mb-lg-0">
                <TextFiledInput
                  className="form-control mr-2 pr-5"
                  type="search"
                  placeholder="Zip Code"
                  onChangeEvent={onChangeEvent}
                  value={
                    formData &&
                    formData.databaseZipcode &&
                    /^-?[0-9]+$/.test(formData.databaseZipcode)
                      ? formData.databaseZipcode
                      : ""
                  }
                  formKey="databaseZipcode"
                />
              </div>
              <div className="col-lg mb-4 mb-lg-0">
                <TextFiledInput
                  className="form-control mr-2 pr-5"
                  type="search"
                  placeholder="Email"
                  value={formData && formData.email ? formData.email : ""}
                  onChangeEvent={onChangeEvent}
                  formKey="email"
                />
              </div>
              {/* <div className="col-lg">
                <div className="dropdown index">
                  <AsyncSelect
                    escapeClearsValue
                    isClearable
                    placeholder="All Resumes"
                    cacheOptions
                    defaultOptions
                    loadOptions={(e) => promiseOptions(e, "resumeSources")}
                    value={
                      options["resumeSources"] &&
                      options["resumeSources"].filter(
                        ({ id }) => id === formData.downloaded_resume
                      )
                    }
                    onChange={(e) => {
                      onChangeEvent(e && e.id, "downloaded_resume");
                    }}
                    getOptionLabel={({ value }) => value}
                    getOptionValue={({ id }) => id}
                  />
                </div>
              </div> */}
            </div>
            <div className="row px-4 pt-1 pb-4">
              <TextFiledInput
                col="3"
                placeholder="Last Active Days"
                value={
                  formData && formData.lastActive ? formData.lastActive : ""
                }
                onChangeEvent={onChangeEvent}
                formKey="lastActive"
              />
              <TextFiledInput
                col="3"
                placeholder="Last Updated Days"
                value={
                  formData && formData.lastUpdated ? formData.lastUpdated : ""
                }
                onChangeEvent={onChangeEvent}
                formKey="lastUpdated"
              />
              <div className={"col-lg"}>
                <div className="dropdown index">
                  <AsyncSelect
                    escapeClearsValue
                    isClearable
                    placeholder="Education level"
                    cacheOptions
                    defaultOptions
                    loadOptions={(e) => promiseOptions(e, "educationLevelYats")}
                    value={
                      options["educationLevelYats"] &&
                      options["educationLevelYats"].filter(
                        ({ id }) => id === formData.MinimumDegree
                      )
                    }
                    onChange={(e) => {
                      onChangeEvent(e && e.id, "MinimumDegree");
                    }}
                    getOptionLabel={({ value }) => value}
                    getOptionValue={({ id }) => id}
                  />
                </div>
              </div>
              <div className={"col-lg"}>
                <div className="dropdown index">
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
                      promiseOptions(e, "getWorkAuthorisationYats")
                    }
                    value={
                      options["getWorkAuthorisationYats"] &&
                      options["getWorkAuthorisationYats"].filter(
                        ({ code }) => code === formData.WorkAuthorize
                      )
                    }
                    onChange={(e) => {
                      onChangeEvent(e && e.code, "WorkAuthorize");
                    }}
                    getOptionLabel={({ value }) => value}
                    getOptionValue={({ code }) => code}
                  />
                </div>
              </div>
            </div>
            <div className="ml-lg-1 px-3 mb-2">
              <button
                type="button"
                className="btn btn-sm text-white px-5 b-color-search-description mx-2"
                onClick={(e) => onSubmit(e)}
              >
                Search
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm px-5"
                onClick={() => {
                  setVats([]); // clear stored array of checked records
                  setChecked(null); // clear checked records
                  setFormData({});
                  setsearchData(null);
                }}
              >
                Reset
              </button>
            </div>
          </Form>
        </div>
        <>
          <Form>
            <Form.Group>
              {!openLoading && searchData && searchData.length > 0
                ? searchData.map((row, i) => {
                    return (
                      <>
                        <div class="inner mx-2 font py-4">
                          <div class="pt-1 px-2 text-center text-lg-left checkbox-search-result">
                            <hr class="hr" />

                            <div class="custom-control custom-checkbox mt-2 mr-2 ml-3 d-lg-flex">
                              <input
                                type="checkbox"
                                key={row.id}
                                className={"custom-control-input ml-1"}
                                name={row.id}
                                id={row.id}
                                onChange={(e) => {
                                  setChecked({
                                    ...checked,
                                    [row.id]: e.target.checked,
                                  });
                                  e.target.checked
                                    ? handleCheckedEvent("vats", row, true)
                                    : handleCheckedEvent("vats", row, false);
                                }}
                                checked={
                                  checked && checked[row.id] ? true : false
                                }
                              />

                              <label
                                for={row.id}
                                class="custom-control-label font-weight-bold text-primary h6 ml-1"
                              >
                                &nbsp;{row.name}
                              </label>
                              <label class="ml-1 mt-lg-n1 vats-font-size">
                                <span class="font-weight-bold text-highlight-color"></span>
                                <span>
                                  {(row.resume_job_title &&
                                    row.resume_job_title != null &&
                                    row.resume_job_title != "NULL" &&
                                    row.resume_job_title != "None") ||
                                  (row.last_job_title != "None" &&
                                    row.last_job_title != "" &&
                                    row.last_job_title != null &&
                                    row.last_job_title != "NULL")
                                    ? row.resume_job_title
                                      ? row.resume_job_title
                                      : row.last_job_title
                                    : null}
                                  {/* {row.last_job_title
                                    ? row.last_job_title
                                    : "N/A"} */}
                                </span>
                              </label>
                              <div class="mx-3">
                                {statusData(row.clients, 1) ? (
                                  <OverlayTrigger
                                    rootClose
                                    trigger="click"
                                    placement="bottom"
                                    overlay={popover(row.clients, 1)}
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-lg font-weight-bold px-0 py-0 mr-2"
                                      style={{ width: "40px", height: "14px" }}
                                    ></button>
                                  </OverlayTrigger>
                                ) : null}
                                {statusData(row.clients, 2) ? (
                                  <OverlayTrigger
                                    rootClose
                                    trigger="click"
                                    placement="bottom"
                                    overlay={popover(row.clients, 2)}
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-warning btn-lg font-weight-bold px-0 py-0 mr-2"
                                      style={{ width: "40px", height: "14px" }}
                                    ></button>
                                  </OverlayTrigger>
                                ) : null}
                                {statusData(row.clients, 3) ? (
                                  <OverlayTrigger
                                    rootClose
                                    trigger="click"
                                    placement="bottom"
                                    overlay={popover(row.clients, 3)}
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-success btn-lg font-weight-bold px-0 py-0 mr-2"
                                      style={{ width: "40px", height: "14px" }}
                                    ></button>
                                  </OverlayTrigger>
                                ) : null}
                                {statusData(row.clients, 4) ? (
                                  <OverlayTrigger
                                    rootClose
                                    trigger="click"
                                    placement="bottom"
                                    overlay={popover(row.clients, 4)}
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-danger btn-lg font-weight-bold px-0 py-0 mr-2"
                                      style={{ width: "40px", height: "14px" }}
                                    ></button>
                                  </OverlayTrigger>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div class="d-lg-flex vats-font-size">
                            <div class="pl-lg-5 ml-lg-n2 flex-fill text-lg-left">
                              <div class="d-lg-flex justify-content-start">
                                {row.imageUrl ? (
                                  <img
                                    src={row.imageUrl}
                                    className="sg-back sg-back-color"
                                    alt="Responsive"
                                  />
                                ) : row.name ? (
                                  <AcronymName str={row.name} />
                                ) : null}

                                <div class="flex-fill">
                                  {(row.resume_job_title &&
                                    row.resume_job_title != null &&
                                    row.resume_job_title != "NULL" &&
                                    row.resume_job_title != "None") ||
                                  (row.last_job_title != "None" &&
                                    row.last_job_title != "" &&
                                    row.last_job_title != null &&
                                    row.last_job_title != "NULL") ? (
                                    <div class="row ml-1 text-secondary">
                                      <div class="col-lg">
                                        <img
                                          src="/images/tickmark.png"
                                          class="img-fluid"
                                          alt="Responsive"
                                        />
                                        {row.resume_job_title
                                          ? row.resume_job_title
                                          : row.last_job_title}
                                        {/* {row.last_job_title
                                          ? row.last_job_title
                                          : "N/A"} */}
                                      </div>
                                    </div>
                                  ) : null}
                                  <div class="row ml-1 text-secondary">
                                    <div class="col-lg-4">
                                      <img
                                        src="/images/location.png"
                                        class="img-fluid"
                                        alt="Responsive"
                                      />
                                      {row.city
                                        ? `${row.city.replace("Null", "")},`
                                        : ""}{" "}
                                      {row.state
                                        ? `${row.state.replace("Null", "")}`
                                        : ""}{" "}
                                      {row.zipcode
                                        ? `${row.zipcode.replace("Null", "")},`
                                        : ","}{" "}
                                      USA
                                    </div>
                                    <div class="col-lg-4">
                                      <img
                                        src="/images/bag.png"
                                        class="img-fluid"
                                        alt="Responsive"
                                      />
                                      {row.current_exp_years
                                        ? row.current_exp_years + " Years"
                                        : "N/A"}
                                    </div>
                                    {row.workauthorization ||
                                    row.visa != "None" ? (
                                      <div class="col-lg-4">
                                        <img
                                          src="/images/globe.png"
                                          class="img-fluid"
                                          alt="Responsive"
                                        />
                                        {row.workauthorization ||
                                        row.visa != "None"
                                          ? row.visa != "None" &&
                                            row.visa != " "
                                            ? row.visa
                                            : row.workauthorization
                                          : "N/A"}
                                      </div>
                                    ) : null}
                                    <div class="col-lg-4">
                                      <img
                                        src="/images/relocate.png"
                                        class="img-fluid"
                                        alt="Responsive"
                                      />{" "}
                                      Willing to relocate
                                    </div>
                                    {row.rate ? (
                                      <div class="col-lg-4">
                                        <img
                                          src="/images/salary.png"
                                          class="img-fluid"
                                          alt="Responsive"
                                        />
                                        {row.rate ? `${row.rate} $/hr` : "N/A"}
                                      </div>
                                    ) : null}
                                    {row.education &&
                                    row.education != "NULL" ? (
                                      <div class="col-lg-4">
                                        <img
                                          src="/images/bag.png"
                                          class="img-fluid"
                                          alt="Responsive"
                                        />{" "}
                                        {row.education != "NULL"
                                          ? row.education
                                          : "N/A"}
                                      </div>
                                    ) : null}
                                    {row.resume_last_updated ? (
                                      <div class="col-lg-4">
                                        <img
                                          src="/images/calemdar2.png"
                                          class="img-fluid"
                                          alt="Responsive"
                                        />
                                        {row.resume_last_updated ||
                                        row.resume_last_updated != ""
                                          ? convertDateStringToLocalDatetime(
                                              row.resume_last_updated
                                                .split(" ")[0]
                                                .replace(`"`, "")
                                            ).toLocaleDateString()
                                          : "N/A"}
                                        {/* {row.updated_at
                                        ? calcDate(
                                            new Date(),
                                            new Date(row.updated_at)
                                          ) + " Month ago"
                                        : "N/A"} */}
                                      </div>
                                    ) : null}
                                    {row.resume_last_activity ? (
                                      <div class="col-lg-4">
                                        <img
                                          src="/images/watch.png"
                                          class="img-fluid"
                                          alt="Responsive"
                                        />
                                        {row.resume_last_activity ||
                                        row.resume_last_activity != ""
                                          ? convertDateStringToLocalDatetime(
                                              row.resume_last_activity
                                                .split(" ")[0]
                                                .replace(`"`, "")
                                            ).toLocaleDateString()
                                          : "N/A"}
                                        {/* {row.updated_at
                                        ? calcDate(
                                            new Date(),
                                            new Date(row.updated_at)
                                          ) + " Month ago"
                                        : "N/A"} */}
                                      </div>
                                    ) : null}
                                  </div>
                                  {/* <div class="row ml-1 text-secondary">
                                    <div class="col-lg">
                                      <img
                                        src="/images/skills.png"
                                        class="img-fluid"
                                        alt="Responsive"
                                      />
                                      {row.skills ? "  " + row.skills : "N/A"}
                                      
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                            </div>

                            <div class="flex-shrink pl-lg-4 pt-3 pr-lg-4 text-center text-lg-left">
                              {/* onClick={() => resumeDiceDownloadEvent(row.id, row)} */}
                              <Link
                                onClick={() =>
                                  resumeVatsDownloadEvent(row.id, row)
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
                                    src="/images/view.png"
                                    class="img-fluid px-1"
                                    alt="View Resume"
                                  />
                                </OverlayTrigger>
                              </Link>
                              {/* {row.isDownloaded && ( */}
                              <Link
                                to={`/candidates/${row.id}/${reqId || 0}`}
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
                                    alt="Responsive"
                                  />
                                </OverlayTrigger>
                              </Link>
                              {/* )} */}
                            </div>
                          </div>
                          {/* <div className="row">
                            <div className="col-lg-10 skillsTag text-secondary">
                              <img
                                src="/images/skills.png"
                                class="img-fluid"
                                alt="Responsive"
                              />
                              {row.skills ? "  " + row.skills : "N/A"}
                            </div>
                            <div className="col-lg-1"></div>
                          </div> */}
                          {row.skills ? (
                            <div className={"dice-font-size mt-2"}>
                              <RowColumn data={row.skills} id={i} />
                            </div>
                          ) : null}
                        </div>
                      </>
                    );
                  })
                : searchData &&
                  totalPage === 0 && (
                    <>
                      <hr class="hr" />
                      <div className={`no-data ${messageCSS} font-weight-bold`}>
                        <span>{NoDataMessage}</span>
                      </div>
                    </>
                  )}
            </Form.Group>
          </Form>
        </>
        <div>
          {/* font-weight-bold px-3 */}
          {searchData && searchData.length > 0 && !openLoading && (
            <>
              <hr className={"hr mx-4"} />
              {!vats.length || (
                <Button
                  variant="warning"
                  tabIndex={-1}
                  className="ml-4 float-left font-weight-bold px-3 bulkDownloadBtn"
                  onClick={() => bulkDownload()}
                >
                  {bulkDownloadLoader
                    ? "Downloading (YATS) ..."
                    : "Bulk download (YATS)"}
                </Button>
              )}
              <div className={"rightIcon mx-4"}>
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
              </div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchVats;
