import React from "react";
import DropDownUI from "./common/dropdown";
import TextFiledInput from "./common/textFieldInput";
import Checkbox from "./common/checkbox";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import {
  getMonsterSearch,
  getMonsterResumeDownload,
} from "../../Services/sourceService";
import "./monster.css";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { format } from "date-fns";
import { OverlayTrigger, Tooltip, Popover } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import AsyncSelect from "react-select/async";

const SearchMonster = ({
  collapse,
  ddOption,
  handleCheckedEvent,
  monsterFormData,
  reqId,
  commonCount,
  monsterCommonString,
  options,
  reqUniqueId,
  bulkDownload,
  setMonsterFormData,
  monster,
  bulkDownloadLoader,
  setMonster,
  rowMonsterErrorArray,
  setTotalResultsFound,
}) => {
  const [formData, setFormData] = React.useState({
    commonText: "",
    monsterState: "",
    monsterCity: "",
    monsterPostalCode: "",
    distanceMiles: "",
    lastActive: "",
    lastUpdated: "",
    monsterNiceToHave: "",
    monster_exp: "",
    minSalary: "",
    maxSalary: "",
    educationLevel: "",
    jobType: "",
    wa: "",
    willingToTravel: "",
    relocateStatus: "",
    // willingToTravel: "",
    includeWithoutSalary: "",
  });
  const [searchData, setSeacrhData] = React.useState(null);
  const [pageNo, setPageNo] = React.useState(1);
  const [checked, setChecked] = React.useState(false);
  const [openLoading, setOpenLoading] = React.useState(false);
  const [spinnerLoading, setSpinnerLoading] = React.useState(false);
  const [vatsSearchCount, setVatsSearchCount] = React.useState(0);
  const [totalPage, setTotalPage] = React.useState(0);
  // const [options, setOptions] = React.useState(null);
  const loaderTrigger = () => {
    setOpenLoading(!openLoading);
    setSpinnerLoading(!spinnerLoading);
  };
  const [monsterLoader, setMonsterLoader] = React.useState([]);
  const [monsterError, setMonsterError] = React.useState();
  const [errorRowID, setErrorRowID] = React.useState(0);

  const [messageCSS, setMessageCSS] = React.useState("");
  const [NoDataMessage, setNoDataMessage] = React.useState(
    "No records available"
  );

  //Dropdown for remark type ------------------------------
  // React.useEffect(() => {
  //   getDropDownOptions(setOptions);
  // }, [setOptions]);

  // this useEffect is for saving common search button click count and enabeling loader
  React.useEffect(() => {
    if (commonCount > 0 && monsterCommonString === "MONSTER") {
      loaderTrigger();
    }
    setVatsSearchCount(commonCount);
  }, [commonCount]);

  //The type is added to distinguish the input string from dropdown.
  //Alternatively, if we were to pass just e, at the server side, the API needs to parse dropdown value from array.
  const onChangeEvent = (e, name) => {
    setFormData({ ...formData, [name]: e });
    if (name === "monsterPostalCode" && e.length > 0) {
      setFormData({
        ...formData,
        [name]: e,
        distanceMiles: "30",
      });
    } else if (name === "monsterPostalCode" && e.length <= 0) {
      setFormData({
        ...formData,
        [name]: e,
        distanceMiles: "",
      });
    }
    if (name === "commonText") {
      setMonsterFormData({ ...monsterFormData, commonText: e });
    }
  };

  const onSubmitFilters = (e) => {
    e.preventDefault();
    loaderTrigger();
    setMonster([]); // clear stored array of checked records
    setChecked(false); // clear checked records
    setVatsSearchCount(vatsSearchCount + 1);
    setPageNo(1);
  };

  // this one is for individual search
  React.useEffect(() => {
    if (vatsSearchCount > 0 && monsterCommonString === "MONSTER") {
      getMonsterSearch(
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
  }, [pageNo, vatsSearchCount, monsterCommonString]);

  let pageClickHandler;
  const handlePageClick = (datas) => {
    clearTimeout(pageClickHandler);
    pageClickHandler = setTimeout(() => {
      loaderTrigger();
      setMonster([]); // clear stored array of checked records
      setChecked(false); // clear checked records
      setPageNo(parseInt(datas.selected) + 1);
      setChecked(false);
    }, 300);
  };

  const resumeMonsterDownloadEvent = (rows, idx) => {
    if (typeof rows === "object") {
      setMonsterLoader((value) => {
        value.push(idx);
        return value;
      });
      rows.map((row) => {
        var FormData = require("form-data");
        var data = new FormData();
        data.append("name", `${row.identity["name"]}`);
        data.append(
          "skills",
          `${
            row.relevance && row.relevance.skills.map((skills) => skills.name)
          }`
        );
        data.append(
          "location",
          `${row.location["city"]}, ${row.location["state"]} ${row.location["postalCode"]}, ${row.location["country"]}`
        );
        data.append("exp", `${row.yearsOfExperience}`);
        data.append("zipcode", `${row.location["postalCode"]}`);
        data.append("education", row.degree ? `${row.degree}` : "NULL");
        data.append(
          "resume_job_title",
          row.relevance.experience.title.name
            ? `${row.relevance.experience.title.name}`
            : "NULL"
        );
        data.append(
          "resume_last_updated",
          row.identity["resumeModifiedDate"]
            ? `${row.identity["resumeModifiedDate"]}`
            : "NULL"
        );
        // data.append(
        //   "workAuthorization",
        //   row.location
        //     ? `${row.location["workAuthorizations"].map(
        //         (item) => item.country
        //       )}`
        //     : "NULL"
        //   // `${JSON.stringify(row.location["workAuthorizations"].country)}`  TO send complete array
        // );

        const string = formData.commonText || " ";
        const downloadedResumeID = async () => {
          setErrorRowID(row.identity["textResumeID"]);
          const functioncall = await getMonsterResumeDownload(
            row.identity["textResumeID"],
            data,
            setMonsterError,
            setMonsterLoader
          );
          if (functioncall) {
            setMonsterLoader((value) => value.filter((i) => i !== idx));
            return window.open(
              `/resume/${functioncall.data.payload[0].ResumeId}/${string
                .replaceAll("/", "%2F")
                .replaceAll("#", "%23")}/${reqId || 0}/monster/${
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
    setFormData({ ...formData, ...monsterFormData });
    if (
      monsterFormData &&
      monsterFormData.monsterPostalCode &&
      monsterFormData.monsterPostalCode.length > 0
    ) {
      setFormData({
        ...formData,
        ...monsterFormData,
        distanceMiles: "30",
      });
    } else if (
      monsterFormData &&
      monsterFormData.monsterPostalCode &&
      monsterFormData.monsterPostalCode.length <= 0
    ) {
      setFormData({
        ...formData,
        ...monsterFormData,
        distanceMiles: "",
      });
    }
  }, [monsterFormData]);

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
          <Formik
            initialValues={[]}
            enableReinitialize={true}
            validationSchema={null}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              setSubmitting(false);
            }}
          >
            {(props) => {
              return (
                <Form>
                  <Form.Group>
                    <div className="monster-row">
                      <TextFiledInput
                        col="4"
                        placeholder="Search by Text"
                        value={
                          formData && formData.commonText
                            ? formData.commonText
                            : ""
                        }
                        onChangeEvent={onChangeEvent}
                        formKey="commonText"
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
                              ({ value }) => value === formData.monsterState
                            )
                          }
                          onChange={(e) => {
                            onChangeEvent(e && e.value, "monsterState");
                          }}
                          getOptionLabel={({ value }) => value}
                          getOptionValue={({ value }) => value}
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
                              ({ value }) => value === formData.monsterCity
                            )
                          }
                          onChange={(e) => {
                            onChangeEvent(e && e.value, "monsterCity");
                          }}
                          getOptionLabel={({ value }) => value}
                          getOptionValue={({ value }) => value}
                        />
                      </div>
                      <TextFiledInput
                        col="2"
                        placeholder="Postal Code"
                        formKey="monsterPostalCode"
                        value={
                          formData &&
                          formData.monsterPostalCode &&
                          /^-?[0-9]+$/.test(formData.monsterPostalCode)
                            ? formData.monsterPostalCode
                            : ""
                        }
                        onChangeEvent={onChangeEvent}
                      />
                      <TextFiledInput
                        col="2"
                        type="search"
                        placeholder="Distance in Miles"
                        onChangeEvent={onChangeEvent}
                        value={
                          formData &&
                          formData.distanceMiles &&
                          /^-?[0-9]+$/.test(formData.distanceMiles) &&
                          formData.monsterPostalCode
                            ? formData.distanceMiles
                            : ""
                        }
                        formKey="distanceMiles"
                        disabled={
                          formData &&
                          formData.monsterPostalCode &&
                          /^-?[0-9]+$/.test(formData.monsterPostalCode)
                            ? false
                            : true
                        }
                      />
                    </div>
                    <div className="monster-row">
                      <TextFiledInput
                        col="2"
                        placeholder="Last Active Days"
                        onChangeEvent={onChangeEvent}
                        value={
                          formData && formData.lastActive
                            ? formData.lastActive
                            : ""
                        }
                        formKey="lastActive"
                      />
                      <TextFiledInput
                        col="2"
                        placeholder="Last Updated Days"
                        onChangeEvent={onChangeEvent}
                        value={
                          formData && formData.lastUpdated
                            ? formData.lastUpdated
                            : ""
                        }
                        formKey="lastUpdated"
                      />
                      <Checkbox
                        className="check-word"
                        id="monsterNiceToHave"
                        label="Nice To Have"
                        onChangeEvent={onChangeEvent}
                        value={
                          formData && formData.monsterNiceToHave
                            ? formData.monsterNiceToHave
                            : ""
                        }
                      />
                      <TextFiledInput
                        col="2"
                        type="search"
                        placeholder="Experience in Years"
                        onChangeEvent={onChangeEvent}
                        value={
                          formData &&
                          formData.monster_exp &&
                          /^-?[0-9]+$/.test(formData.monster_exp)
                            ? formData.monster_exp
                            : ""
                        }
                        formKey="monster_exp"
                        disabled={
                          formData && formData.monsterNiceToHave ? false : true
                        }
                      />

                      <TextFiledInput
                        col="2"
                        placeholder="Min Salary"
                        onChangeEvent={onChangeEvent}
                        value={
                          formData && formData.minSalary
                            ? formData.minSalary
                            : ""
                        }
                        formKey="minSalary"
                      />
                      <TextFiledInput
                        col="2"
                        placeholder="Max Salary"
                        onChangeEvent={onChangeEvent}
                        value={
                          formData && formData.maxSalary
                            ? formData.maxSalary
                            : ""
                        }
                        formKey="maxSalary"
                      />
                    </div>
                    <div className="monster-row">
                      <div className={"col-lg-4 mb-4 mb-lg-0 index"}>
                        <AsyncSelect
                          escapeClearsValue
                          isClearable
                          placeholder="Select Education Level"
                          cacheOptions
                          defaultOptions
                          loadOptions={(e) =>
                            promiseOptions(e, "educationLevelMonster")
                          }
                          value={
                            options["educationLevelMonster"] &&
                            options["educationLevelMonster"].filter(
                              ({ id }) => id === formData.educationLevel
                            )
                          }
                          onChange={(e) => {
                            onChangeEvent(e && e.id, "educationLevel");
                          }}
                          getOptionLabel={({ value }) => value}
                          getOptionValue={({ id }) => id}
                        />
                      </div>
                      <div className={"col-lg-4 mb-4 mb-lg-0 index"}>
                        <AsyncSelect
                          escapeClearsValue
                          isClearable
                          placeholder="Select Job Type"
                          cacheOptions
                          defaultOptions
                          loadOptions={(e) =>
                            promiseOptions(e, "employmentTypeMonster")
                          }
                          value={
                            options["employmentTypeMonster"] &&
                            options["employmentTypeMonster"].filter(
                              ({ id }) => id === formData.jobType
                            )
                          }
                          onChange={(e) => {
                            onChangeEvent(e && e.id, "jobType");
                          }}
                          getOptionLabel={({ value }) => value}
                          getOptionValue={({ id }) => id}
                        />
                      </div>
                      {/* <div className={"col-lg-3 mb-4 mb-lg-0 index"}>
                        <AsyncSelect
                          escapeClearsValue
                          isClearable
                          placeholder="Select Work Authorization"
                          cacheOptions
                          defaultOptions
                          loadOptions={(e) =>
                            promiseOptions(e, "getWorkAuthorisationMonster")
                          }
                          value={
                            options["getWorkAuthorisationMonster"] &&
                            options["getWorkAuthorisationMonster"].filter(
                              ({ code }) => code === formData.wa
                            )
                          }
                          onChange={(e) => {
                            onChangeEvent(e && e.code, "wa");
                          }}
                          getOptionLabel={({ value }) => value}
                          getOptionValue={({ code }) => code}
                        />
                      </div> */}
                      <Checkbox
                        className="check-word"
                        id="includeWithoutSalary"
                        label="Include results where salary not specified"
                        onChangeEvent={onChangeEvent}
                        value={
                          formData && formData.includeWithoutSalary
                            ? formData.includeWithoutSalary
                            : ""
                        }
                      />
                    </div>
                    <div className="monster-row">
                      <div className="mt-3">
                        <Checkbox
                          className="check-word"
                          id="relocateStatus"
                          label="Willing to Relocate"
                          onChangeEvent={onChangeEvent}
                          value={
                            formData && formData.relocateStatus
                              ? formData.relocateStatus
                              : ""
                          }
                        />
                      </div>
                      <div className="col-lg-3 mt-3 mb-4 mb-lg-0 index">
                        {/* Boolean(formData && formData.relocateStatus) &&  */}
                        <AsyncSelect
                          escapeClearsValue
                          isClearable
                          placeholder="Select Willing to Travel"
                          cacheOptions
                          defaultOptions
                          loadOptions={(e) =>
                            promiseOptions(e, "getWillingToTraverMonster")
                          }
                          value={
                            options["getWillingToTraverMonster"] &&
                            options["getWillingToTraverMonster"].filter(
                              ({ code }) => code === formData.willingToTravel
                            )
                          }
                          onChange={(e) => {
                            onChangeEvent(e && e.code, "willingToTravel");
                          }}
                          getOptionLabel={({ value }) => value}
                          getOptionValue={({ code }) => code}
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
                        setFormData({});
                        setSeacrhData(null);
                        setMonster([]); // clear stored array of checked records
                        setChecked(false); // clear checked records
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <>
          <Formik
            initialValues={[]}
            enableReinitialize={true}
            validationSchema={null}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              setSubmitting(false);
            }}
          >
            {(props) => {
              return (
                <Form>
                  <Form.Group>
                    {!openLoading && searchData && searchData.length > 0
                      ? searchData.map((row, idx) => (
                          <div
                            id={`monster-div-${row.identity["textResumeID"]}`}
                            className={`${
                              monsterLoader.indexOf(idx) > -1 ? "spinner" : ""
                            }`}
                          >
                            <div className={"inner mx-4 font"}>
                              <div
                                className={
                                  "px-2 text-center text-lg-left checkbox-search-result"
                                }
                              >
                                <hr className={"hr"} />
                                {Array.isArray(rowMonsterErrorArray) &&
                                rowMonsterErrorArray.includes(
                                  row.identity["textResumeID"]
                                ) ? (
                                  <div
                                    class={`no-data font-weight-bold text-danger result-not-found-${row.identity["textResumeID"]}`}
                                  >
                                    Resume is not available with provider
                                  </div>
                                ) : (
                                  errorRowID === row.identity["textResumeID"] &&
                                  monsterError &&
                                  !monsterLoader.length && (
                                    <>
                                      <div
                                        className={`no-data ${messageCSS} font-weight-bold text-danger result-not-found`}
                                      >
                                        <span>{monsterError}</span>
                                      </div>
                                    </>
                                  )
                                )}

                                <div
                                  className={
                                    "custom-control custom-checkbox d-lg-flex justify-content-start"
                                  }
                                >
                                  <input
                                    type="checkbox"
                                    key={row.identity["textResumeID"]}
                                    className={"custom-control-input ml-1 mt-1"}
                                    name={row.identity["textResumeID"]}
                                    id={row.identity["textResumeID"]}
                                    onChange={(e) => {
                                      setChecked({
                                        ...checked,
                                        [row.identity["textResumeID"]]:
                                          e.target.checked,
                                      });
                                      e.target.checked
                                        ? handleCheckedEvent(
                                            "monster",
                                            row,
                                            true
                                          )
                                        : handleCheckedEvent(
                                            "monster",
                                            row,
                                            false
                                          );
                                    }}
                                    checked={
                                      checked &&
                                      checked[row.identity["textResumeID"]]
                                        ? true
                                        : false
                                    }
                                  />
                                  <label
                                    for={row.identity["textResumeID"]}
                                    className={
                                      "custom-control-label font-weight-bold text-primary h6 ml-1"
                                    }
                                  >
                                    &nbsp;{row.identity["name"]}
                                  </label>
                                  <div className={"small ml-1 mt-lg-n1"}>
                                    &nbsp;
                                    {`${row.location["city"]}, ${row.location["state"]}, ${row.location["postalCode"]}, ${row.location["country"]}`}{" "}
                                    | {row.degree}
                                  </div>
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
                            </div>
                            <div
                              className={
                                "d-lg-flex mx-4 vats-font-size description-font"
                              }
                            >
                              <div
                                className={
                                  "pl-lg-5 ml-lg-n2 flex-fill text-center text-lg-left"
                                }
                              >
                                <div className={"d-lg-flex"}>
                                  <table
                                    className={
                                      "table table-sm table-borderless center table-responsive table-source-monster text-left pl-md-5 pl-lg-0"
                                    }
                                  >
                                    <thead>
                                      <tr>
                                        <th className={"description-color"}>
                                          Top Skills
                                        </th>
                                        <th
                                          className={
                                            "description-color pl-lg-5 pl-md-5"
                                          }
                                        >
                                          Experience
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {row.relevance &&
                                        row.relevance.skills &&
                                        row.relevance.skills.map((tab, i) => (
                                          <tr key={i}>
                                            <td
                                              className={"text-wrap"}
                                              style={{ width: "19rem" }}
                                            >
                                              {tab.name ? tab.name : "N/A"}
                                            </td>
                                            <td className={"pl-lg-5 pl-md-5"}>
                                              {tab.yearsOfExperience
                                                ? tab.yearsOfExperience + " yrs"
                                                : "N/A"}
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                  <div className={"flex-fill typo"}>
                                    <div className={"row"}>
                                      <div className={"col-lg pb-lg-2"}>
                                        <span className={"description-color"}>
                                          Resume updated:{" "}
                                        </span>
                                        <span className={"pl-lg-4"}>
                                          {row.identity["resumeModifiedDate"]
                                            ? format(
                                                new Date(
                                                  row.identity[
                                                    "resumeModifiedDate"
                                                  ]
                                                ),
                                                "dd-MM-yyyy"
                                              )
                                            : "N/A"}
                                        </span>
                                      </div>
                                      <div className={"col-lg"}>
                                        <span
                                          className={
                                            "description-color pl-lg-4"
                                          }
                                        >
                                          Relocaton:{" "}
                                        </span>
                                        <span className={"pl-lg-5"}>
                                          {row.location["willRelocate"] === true
                                            ? "Will Relocate"
                                            : "Will not relocate"}
                                        </span>
                                      </div>
                                    </div>
                                    <div className={"row"}>
                                      <div className={"col-lg pb-lg-2"}>
                                        <span className={"description-color"}>
                                          Total Experience:{" "}
                                        </span>
                                        <span className={"pl-lg-4 ml-lg-1"}>
                                          {row.yearsOfExperience
                                            ? row.yearsOfExperience + " yrs"
                                            : "N/A"}
                                        </span>
                                      </div>
                                      <div className={"col-lg"}>
                                        <span
                                          className={
                                            "description-color pl-lg-4"
                                          }
                                        >
                                          Authorization:{" "}
                                        </span>
                                        {row.location.workAuthorizations &&
                                          row.location.workAuthorizations.map(
                                            (auth) => (
                                              <span
                                                className={"pl-lg-4 ml-lg-1"}
                                              >
                                                {auth.country}
                                              </span>
                                            )
                                          )}
                                      </div>
                                    </div>
                                    <div className={"row"}>
                                      <div className={"col-lg"}>
                                        <span className={"description-color"}>
                                          Desired Salary:{" "}
                                        </span>
                                        <span className={"pl-lg-5"}>-</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className={"vl"}></div>
                              <div class="flex-shrink text-center text-lg-left">
                                <Link
                                  onClick={() =>
                                    !row.isDownloaded
                                      ? resumeMonsterDownloadEvent([row], idx)
                                      : undefined
                                  }
                                  to={
                                    row.isDownloaded
                                      ? `/resume/${row.resumeId || ""}/${
                                          (formData && formData.commonText)
                                            .replaceAll("/", "%2F")
                                            .replaceAll("#", "%23") || " "
                                        }/${reqId || 0}/monster/${
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
                                          alt="Responsive"
                                        />
                                      </OverlayTrigger>
                                    </Link>
                                  )}
                              </div>
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
                  {searchData && (
                    <Container fluid={true}>
                      <Row>
                        <Col>
                          {!monster.length || (
                            <Button
                              variant="warning"
                              tabIndex={-1}
                              className="ml-4 float-left font-weight-bold px-3 bulkDownloadBtn"
                              onClick={() => bulkDownload()}
                            >
                              {bulkDownloadLoader
                                ? "Downloading (Monster) ..."
                                : "Bulk download (Monster)"}
                            </Button>
                          )}
                        </Col>
                        <Col className={"rightIcon"}>
                          {searchData &&
                            searchData.length > 0 &&
                            !openLoading && (
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
                            )}
                        </Col>
                      </Row>
                    </Container>
                  )}
                </Form>
              );
            }}
          </Formik>
        </>
      </div>
    </React.Fragment>
  );
};

export default SearchMonster;
