import React from "react";
import TextFiledInput from "./common/textFieldInput";
import Checkbox from "./common/checkbox";
import {
  Form,
  Container,
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
  Button,
  Popover,
} from "react-bootstrap";
import {
  getDiceSearch,
  getDiceResumeDownload,
} from "../../Services/sourceService";
import "./Dice.css";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import ReactPaginate from "react-paginate";
import AsyncSelect from "react-select/async";

const SearchDice = ({
  collapse,
  ddOption,
  handleCheckedEvent,
  diceFormData,
  reqId,
  commonCount,
  diceCommonString,
  options,
  reqUniqueId,
  bulkDownload,
  setDiceFormData,
  dice,
  bulkDownloadLoader,
  setDice,
  rowDiceErrorArray,
  setTotalResultsFound,
}) => {
  const [formData, setFormData] = React.useState({
    commonText: "",
    jobTitle: "",
    diceLocation: "",
    distanceMiles: "",
    degree: "",
    workPermit: "",
    lastActive: "",
    lastUpdated: "",
    employmentType: "",
    diceExperienceFrom: "",
    diceExperienceTo: "",
    excludeThirdParty: "",
    likelyToSwitch: "",
    willingToRelocate: "",
  });
  const [searchData, setsearchData] = React.useState(null);
  const [pageNo, setPageNo] = React.useState(1);
  const [checked, setChecked] = React.useState(null);
  const [openLoading, setSpinnerLoading] = React.useState(false);
  const [spinnerLoading, setOpenLoading] = React.useState(false);
  const [vatsSearchCount, setVatsSearchCount] = React.useState(0);
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
  const [diceLoader, setDiceLoader] = React.useState([]);
  const [diceError, setDiceError] = React.useState();
  const [errorRowID, setErrorRowID] = React.useState(0);

  const onChangeEvent = (e, name) => {
    setFormData({ ...formData, [name]: e });
    if (name === "diceLocation" && e.length > 0) {
      setFormData({
        ...formData,
        [name]: e,
        distanceMiles: "30",
      });
    } else if (name === "diceLocation" && e.length <= 0) {
      setFormData({
        ...formData,
        [name]: e,
        distanceMiles: "",
      });
    }
    if (name === "commonText") {
      setDiceFormData({ ...diceFormData, commonText: e });
    }
  };
  const [message, setMessage] = React.useState();
  const [messageCSS, setMessageCSS] = React.useState("");
  const [NoDataMessage, setNoDataMessage] = React.useState(
    "No records available"
  );
  const [totalPage, setTotalPage] = React.useState(0);

  const loaderTrigger = () => {
    setOpenLoading(!openLoading);
    setSpinnerLoading(!spinnerLoading);
  };

  // this useEffect is for saving common search button click count and enabeling loader
  React.useEffect(() => {
    if (commonCount > 0 && diceCommonString === "DICE") {
      loaderTrigger();
    }
    setVatsSearchCount(commonCount);
  }, [commonCount]);

  const onSubmit = (e) => {
    e.preventDefault();
    loaderTrigger();
    setDice([]); // clear stored array of checked records
    setChecked(null); // clear checked records
    setVatsSearchCount(vatsSearchCount + 1);
    setPageNo(1);
  };

  // this one is for individual search
  React.useEffect(() => {
    if (vatsSearchCount > 0 && diceCommonString === "DICE") {
      getDiceSearch(
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
      setDice([]); // clear stored array of checked records
      setChecked(null); // clear checked records
      setPageNo(parseInt(datas.selected) + 1);
      setChecked(false);
    }, 300);
  };

  const RowColumn = (props) => {
    let columns = [];
    let id = props.id;
    props.data.forEach((item, idx) => {
      // push column
      columns.push(
        <div className={"col-lg-3 pr-lg-4 mt-lg-0 mt-1 mb-1"} key={idx}>
          <div className="tech-back-color px-2">
            <span className={"d-flex justify-content-between"}>
              <span className={"text-highlight-color"}>
                {item.skill ? item.skill : ""}
              </span>
              <span className={"text-secondary"}>
                {" "}
                {item.yearsUsed ? item.yearsUsed + " years" : ""}
              </span>
            </span>
          </div>
        </div>
      );

      // force wrap to next row every 4 columns
      if ((idx + 1) % 4 === 0) {
        columns.push(<div className="w-100"></div>);
      }
    });
    return <RenderItems listcolumn={columns} id={id} />;
    // return <div className="row px-2">{columns}</div>;
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
        <div className="row px-2">{newList ? newList : ""}</div>
        {show && (
          <div
            className="px-2"
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

  const resumeDiceDownloadEvent = (rows, i) => {
    if (typeof rows === "object") {
      setDiceLoader((value) => {
        value.push(i);
        return value;
      });
      rows.map((row) => {
        var FormData = require("form-data");
        var data = new FormData();
        data.append("name", `${row.fullName}`);
        data.append("skills", `${row.skills.map((item) => item.skill)}`);
        // data.append("skills", "web development"); //NEEDS ATTENTION
        data.append("location", `${row.city}, ${row.region}, ${row.country}`);
        data.append("exp", `${row.yearsOfExperience}`);
        data.append(
          "education",
          row.education ? `${row.education.map((item) => item.degree)}` : "NULL"
        );
        data.append(
          "workAuthorization",
          row.workPermitDocuments ? `${row.workPermitDocuments}` : "NULL"
        );
        data.append(
          "resume_job_title",
          row.currentJobTitle ? `${row.currentJobTitle}` : "NULL"
        );
        data.append(
          "resume_last_activity",
          row.dateLastActive ? `${row.dateLastActive}` : "NULL"
        );
        data.append(
          "resume_last_updated",
          row.dateResumeLastUpdated ? `${row.dateResumeLastUpdated}` : "NULL"
        );
        // data.append("zipcode", ""); //NEEDS ATTENTION

        const string = formData.commonText || " ";
        const downloadedResumeID = async () => {
          setErrorRowID(row.id);
          const functioncall = await getDiceResumeDownload(
            row.id,
            data,
            setDiceError,
            setDiceLoader
          );
          if (functioncall) {
            // setOpenLoading(false);
            // setSpinnerLoading(false);
            // setMessage("");
            setDiceLoader((value) => value.filter((j) => j !== i));
            return window.open(
              `/resume/${functioncall.data.payload[0].ResumeId}/${string
                .replaceAll("/", "%2F")
                .replaceAll("#", "%23")}/${reqId || 0}/dice/${
                reqUniqueId || 0
              }/2`,
              "_blank"
            );
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
    setFormData({ ...formData, ...diceFormData });
    if (
      diceFormData &&
      diceFormData.diceLocation &&
      diceFormData.diceLocation.length > 0
    ) {
      setFormData({
        ...formData,
        ...diceFormData,
        distanceMiles: "30",
      });
    } else if (
      diceFormData &&
      diceFormData.diceLocation &&
      diceFormData.diceLocation.length <= 0
    ) {
      setFormData({
        ...formData,
        ...diceFormData,
        distanceMiles: "",
      });
    }
  }, [diceFormData]);

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
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group>
              <div className="dice-row">
                <TextFiledInput
                  col="4"
                  placeholder="Search by Text"
                  value={
                    formData && formData.commonText ? formData.commonText : ""
                  }
                  onChangeEvent={onChangeEvent}
                  formKey="commonText"
                />
                <TextFiledInput
                  col="3"
                  placeholder="Job Title"
                  value={formData && formData.jobTitle ? formData.jobTitle : ""}
                  onChangeEvent={onChangeEvent}
                  formKey="jobTitle"
                />
                <TextFiledInput
                  col="3"
                  placeholder="Location"
                  onChangeEvent={onChangeEvent}
                  value={
                    formData && formData.diceLocation
                      ? formData.diceLocation
                      : ""
                  }
                  formKey="diceLocation"
                />
                <TextFiledInput
                  col="2"
                  type="search"
                  placeholder="Within Distance in Miles"
                  value={
                    formData &&
                    formData.distanceMiles &&
                    /^-?[0-9]+$/.test(formData.distanceMiles) &&
                    formData.diceLocation
                      ? formData.distanceMiles
                      : ""
                  }
                  onChangeEvent={onChangeEvent}
                  formKey="distanceMiles"
                  disabled={formData && formData.diceLocation ? false : true}
                />
              </div>
              <div className="dice-row">
                <div className={"col-lg-2 mb-4 mb-lg-0 index"}>
                  <AsyncSelect
                    escapeClearsValue
                    isClearable
                    placeholder="Select Degree"
                    cacheOptions
                    defaultOptions
                    loadOptions={(e) => promiseOptions(e, "educationLevelDice")}
                    value={
                      options["educationLevelDice"] &&
                      options["educationLevelDice"].filter(
                        ({ id }) => id === formData.degree
                      )
                    }
                    onChange={(e) => {
                      onChangeEvent(e && e.id, "degree");
                    }}
                    getOptionLabel={({ value }) => value}
                    getOptionValue={({ id }) => id}
                  />
                </div>

                <div className={"col-lg-3 mb-4 mb-lg-0 index"}>
                  <AsyncSelect
                    escapeClearsValue
                    isClearable
                    placeholder="Select Work Authorization"
                    cacheOptions
                    defaultOptions
                    loadOptions={(e) =>
                      promiseOptions(e, "getWorkAuthorisationDice")
                    }
                    value={
                      options["getWorkAuthorisationDice"] &&
                      options["getWorkAuthorisationDice"].filter(
                        ({ code }) => code === formData.workPermit
                      )
                    }
                    onChange={(e) => {
                      onChangeEvent(e && e.code, "workPermit");
                    }}
                    getOptionLabel={({ value }) => value}
                    getOptionValue={({ code }) => code}
                  />
                </div>
                <TextFiledInput
                  col="2"
                  placeholder="Last Active Days"
                  value={
                    formData && formData.lastActive ? formData.lastActive : ""
                  }
                  onChangeEvent={onChangeEvent}
                  formKey="lastActive"
                />
                <TextFiledInput
                  col="2"
                  placeholder="Last Updated Days"
                  value={
                    formData && formData.lastUpdated ? formData.lastUpdated : ""
                  }
                  onChangeEvent={onChangeEvent}
                  formKey="lastUpdated"
                />
                <div className={"col-lg-3 mb-4 mb-lg-0 index"}>
                  <AsyncSelect
                    escapeClearsValue
                    isClearable
                    placeholder="Select Employment Type"
                    cacheOptions
                    defaultOptions
                    loadOptions={(e) => promiseOptions(e, "employmentTypeDice")}
                    value={
                      options["employmentTypeDice"] &&
                      options["employmentTypeDice"].filter(
                        ({ id }) => id === formData.employmentType
                      )
                    }
                    onChange={(e) => {
                      onChangeEvent(e && e.id, "employmentType");
                    }}
                    getOptionLabel={({ value }) => value}
                    getOptionValue={({ id }) => id}
                  />
                </div>
              </div>
              <div className="dice-row">
                <TextFiledInput
                  col="3"
                  type="search"
                  placeholder="Experience From (in Years)"
                  value={
                    formData &&
                    formData.diceExperienceFrom &&
                    /^-?[0-9]+$/.test(formData.diceExperienceFrom)
                      ? formData.diceExperienceFrom
                      : ""
                  }
                  onChangeEvent={onChangeEvent}
                  formKey="diceExperienceFrom"
                />
                <TextFiledInput
                  col="3"
                  type="search"
                  placeholder="Experience To (in Years)"
                  value={
                    formData &&
                    formData.diceExperienceTo &&
                    /^-?[0-9]+$/.test(formData.diceExperienceTo)
                      ? formData.diceExperienceTo
                      : ""
                  }
                  onChangeEvent={onChangeEvent}
                  formKey="diceExperienceTo"
                />
                <Checkbox
                  id="excludeThirdParty"
                  label="Exclude 3rd Party"
                  className="px-4"
                  value={
                    formData && formData.excludeThirdParty
                      ? formData.excludeThirdParty
                      : ""
                  }
                  onChangeEvent={onChangeEvent}
                />
                <Checkbox
                  id="likelyToSwitch"
                  label="Likely to Switch"
                  className="px-4"
                  value={
                    formData && formData.likelyToSwitch
                      ? formData.likelyToSwitch
                      : ""
                  }
                  onChangeEvent={onChangeEvent}
                />
                <Checkbox
                  id="willingToRelocate"
                  label="Only Willing to Relocate"
                  value={
                    formData && formData.willingToRelocate
                      ? formData.willingToRelocate
                      : ""
                  }
                  onChangeEvent={onChangeEvent}
                />
              </div>
            </Form.Group>
            <div className="ml-lg-3 mb-2">
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
                  setFormData({});
                  setsearchData(null);
                  setDice([]); // clear stored array of checked records
                  setChecked(null); // clear checked records
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
            resumeDiceDownloadEvent(values);
            setSubmitting(false);
          }}
        >
          {(props) => {
            const { values, handleChange, handleSubmit } = props;
            return (
              <Form>
                <Form.Group>
                  {!openLoading && searchData && searchData.length > 0
                    ? searchData.map((row, i) => (
                        <div
                          id={`dice-div-${row.id}`}
                          className={`${
                            diceLoader.indexOf(i) > -1 ? "spinner" : ""
                          }`}
                        >
                          <div class="inner mx-2 font py-4">
                            <div class="pt-1 px-2 text-center text-lg-left checkbox-search-result">
                              <hr class="hr" />
                              {Array.isArray(rowDiceErrorArray) &&
                              rowDiceErrorArray.includes(row.id) ? (
                                <div
                                  class={`no-data font-weight-bold text-danger result-not-found-${row.id}`}
                                >
                                  Resume is not available with provider
                                </div>
                              ) : (
                                errorRowID === row.id &&
                                diceError &&
                                !diceLoader.length && (
                                  <>
                                    <div
                                      className={`no-data ${messageCSS} font-weight-bold text-danger result-not-found`}
                                    >
                                      <span>{diceError}</span>
                                    </div>
                                  </>
                                )
                              )}

                              <div class="custom-control custom-checkbox d-lg-flex">
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
                                      ? handleCheckedEvent("dice", row, true)
                                      : handleCheckedEvent("dice", row, false);
                                  }}
                                  checked={
                                    checked && checked[row.id] ? true : false
                                  }
                                />

                                <label
                                  for={row.id}
                                  class="custom-control-label font-weight-bold text-primary h6 ml-1"
                                >
                                  &nbsp;{row.fullName}
                                </label>
                                <span class="ml-1 mt-lg-n1 vats-font-size">
                                  <span class="font-weight-bold text-highlight-color"></span>
                                  <span> {row.currentJobTitle}</span>
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
                                  ) : (
                                    <AcronymName str={row.fullName} />
                                  )}

                                  <div class="flex-fill">
                                    <div class="row ml-1 text-secondary">
                                      <div class="col-lg">
                                        <img
                                          src="/images/tickmark.png"
                                          class="img-fluid"
                                          alt="Responsive"
                                        />
                                        {row.desiredJobTitles}
                                      </div>
                                    </div>
                                    <div class="row ml-1 text-secondary">
                                      <div class="col-lg">
                                        <img
                                          src="/images/location.png"
                                          class="img-fluid"
                                          alt="Responsive"
                                        />
                                        {row.locations &&
                                          row.locations.map((auth) => (
                                            <span>{auth.text}</span>
                                          ))}
                                      </div>
                                      <div class="col-lg">
                                        <img
                                          src="/images/bag.png"
                                          class="img-fluid"
                                          alt="Responsive"
                                        />
                                        {row.yearsOfExperience
                                          ? row.yearsOfExperience + " Years exp"
                                          : "N/A"}
                                      </div>
                                      <div class="col-lg">
                                        <img
                                          src="/images/globe.png"
                                          class="img-fluid"
                                          alt="Responsive"
                                        />
                                        {row.workPermitDocuments}
                                      </div>
                                    </div>
                                    <div class="row ml-1 text-secondary">
                                      <div class="col-lg">
                                        <img
                                          src="/images/relocate.png"
                                          class="img-fluid"
                                          alt="Responsive"
                                        />
                                        {row.workPreferences &&
                                          row.workPreferences.map((auth) => (
                                            <span>
                                              {auth.willingToRelocate
                                                ? "Willing to relocate"
                                                : "Not willing to relocate"}
                                            </span>
                                          ))}
                                      </div>
                                      <div class="col-lg">
                                        <img
                                          src="/images/salary.png"
                                          class="img-fluid"
                                          alt="Responsive"
                                        />
                                        No desired salary disclosed
                                      </div>
                                      <div class="col-lg">
                                        <img
                                          src="/images/calemdar2.png"
                                          class="img-fluid"
                                          alt="Responsive"
                                        />
                                        {row.dateResumeLastUpdated
                                          ? calcDate(
                                              new Date(),
                                              new Date(
                                                row.dateResumeLastUpdated
                                              )
                                            ) + " Month ago"
                                          : "N/A"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="flex-shrink pl-lg-4 pt-3 text-center text-lg-left">
                                <Link
                                  onClick={() =>
                                    !row.isDownloaded
                                      ? resumeDiceDownloadEvent([row], i)
                                      : undefined
                                  }
                                  to={
                                    row.isDownloaded
                                      ? `/resume/${row.resumeId || ""}/${
                                          (formData && formData.commonText)
                                            .replaceAll("/", "%2F")
                                            .replaceAll("#", "%23") || " "
                                        }/${reqId || 0}/dice/${
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
                                      src="/images/view.png"
                                      class="img-fluid px-1"
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
                            {row.skills ? (
                              <div className={"dice-font-size mt-2"}>
                                <RowColumn data={row.skills} id={i} />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      ))
                    : searchData &&
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
                        {!dice.length || (
                          <Button
                            variant="warning"
                            tabIndex={-1}
                            className="ml-4 float-left font-weight-bold px-3 bulkDownloadBtn"
                            onClick={() => bulkDownload()}
                          >
                            {bulkDownloadLoader
                              ? "Downloading (Dice) ..."
                              : "Bulk download (Dice)"}
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

export default SearchDice;
