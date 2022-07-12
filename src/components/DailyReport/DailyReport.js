import "./DailyReport.styles.css";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import Select from "react-select";
import React, { useState, useEffect } from "react";

import Submissions from "./Submissions";
import Interviews from "./Interviews";
import Offers from "./Offers";
import Starts from "./Starts";
import Performances from "./Performances";
import Master from "./MasterTab";
import ModalDrs from "./ModalDrs";

import { useUsers } from "../../Services/usersService";
import { getAllClients } from "../../Services/jobsService";
import { Link } from "react-router-dom";
import { Col, FormControl, Row, Table, Modal } from "react-bootstrap";

import { Button } from "react-bootstrap";

import {
  getMySubmissions,
  getMyInterviews,
  getMyOffers,
  getMyStarts,
  getMyPerformances,
  getRecruiterList,
  getAmList,
  getSdmList,
  getMyMasterData,
  downloadMyReport,
} from "../../Services/dailyReportService";

const DailyReport = () => {
  var date = new Date();
  date.setDate(date.getDate() - 7);
  date =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);

  var currentDate = new Date();
  currentDate =
    currentDate.getFullYear() +
    "-" +
    ("0" + (currentDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + currentDate.getDate()).slice(-2);

  const [startDate, setStartDate] = React.useState(date);
  const [endDate, setEndDate] = React.useState(currentDate);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const { currentUser } = useUsers();
  const { permissions } = currentUser;
  const [initialFormData, setInitialFormData] = React.useState({
    startDate: date,
    endDate: currentDate,
  });

  const user = localStorage.getItem("profile");
  const id = JSON.parse(user)["id"];

  const [filters, setFilters] = React.useState({
    clientId: "",
    sdmId: "",
    recruiterId: "",
    accMgrId: "",
    filterUpdated: false,
  });

  const [activeTab, setActiveTab] = React.useState("submission");

  const [mySubmissions, setMySubmissions] = React.useState([]);
  const [mySubmissionsLoading, setMySubmissionsLoading] = React.useState(false);
  const [mySubmissionsError, setMySubmissionsError] = React.useState(null);
  const [totalSubmissionsPage, setSubmissionsTotalPage] = React.useState(0);
  const [pageSubmissions, setSubmissionsPage] = React.useState(1);

  const [myInterviews, setMyInterviews] = React.useState([]);
  const [myInterviewsLoading, setMyInterviewsLoading] = React.useState(false);
  const [myInterviewsError, setMyInterviewsError] = React.useState(null);
  const [totalInterviewsPage, setInterviewsTotalPage] = React.useState(0);
  const [pageInterviews, setInterviewsPage] = React.useState(1);

  const [myOffers, setMyOffers] = React.useState([]);
  const [myOffersLoading, setMyOffersLoading] = React.useState(false);
  const [myOffersError, setMyOffersError] = React.useState(null);
  const [totalOffersPage, setOffersTotalPage] = React.useState(0);
  const [pageOffers, setOffersPage] = React.useState(1);

  const [myOffersDownloadLoading, setMyOffersDownloadLoading] =
    React.useState(false);
  const [myOffersDownloadError, setMyOffersDownloadError] =
    React.useState(null);

  const [myStarts, setMyStarts] = React.useState([]);
  const [myStartsLoading, setMyStartsLoading] = React.useState(false);
  const [myStartsError, setMyStartsError] = React.useState(null);
  const [totalStartsPage, setStartsTotalPage] = React.useState(0);
  const [pageStarts, setStartsPage] = React.useState(1);

  const [myPerformances, setMyPerformances] = React.useState([]);
  const [myPerformancesLoading, setMyPerformancesLoading] =
    React.useState(false);
  const [myPerformancesError, setMyPerformancesError] = React.useState(null);
  const [totalPerformancesPage, setPerformancesTotalPage] = React.useState(0);
  const [pagePerformances, setPerformancesPage] = React.useState(1);

  const [myMasterData, setMyMasterData] = React.useState([]);
  const [myMasterDataLoading, setMyMasterDataLoading] = React.useState(false);
  const [myMasterDataError, setMyMasterDataError] = React.useState(null);
  const [totalMasterDataPage, setMasterDataTotalPage] = React.useState(0);
  const [pageMasterData, setMasterDataPage] = React.useState(1);

  const userType = (() => {
    if (permissions) {
      if (
        permissions.VIEW_CLIENT_NAMES &&
        permissions.VIEW_AM_NAMES &&
        permissions.VIEW_RECRUITER_NAMES &&
        permissions.VIEW_SDM_NAMES
      ) {
        return "om";
      }
      if (
        permissions.VIEW_CLIENT_NAMES &&
        permissions.VIEW_AM_NAMES &&
        permissions.VIEW_RECRUITER_NAMES
      ) {
        return "sdm";
      }
      if (
        permissions.VIEW_CLIENT_NAMES &&
        permissions.VIEW_SDM_NAMES &&
        permissions.VIEW_RECRUITER_NAMES
      ) {
        return "am";
      }
      return "recruiter";
    }
    return null;
  })();

  const getHeading = (userType) => {
    switch (userType) {
      case "om":
        return (
          <text className="font fontTitle"> Reports for Operation Manager</text>
        );

      case "am":
        return (
          <text className="font fontTitle"> Reports for Account Manager</text>
        );

      case "recruiter":
        return <text className="font fontTitle"> Reports for Recruiter</text>;

      case "sdm":
        return <text className="font fontTitle"> Reports for SDM</text>;
      default:
        break;
    }
  };

  const [clientsLoading, setClientsLoading] = React.useState(false);
  const [clients, setClients] = React.useState([]);
  React.useEffect(() => {
    getAllClients(setClients, setClientsLoading);
  }, []);

  const [recruiterLoading, setRecruiterLoading] = React.useState(false);
  const [sdmLoading, setSdmLoading] = React.useState(false);
  const [amLoading, setAmLoading] = React.useState(false);
  const [recruiterList, setRecruiterList] = React.useState([]);
  const [sdmList, setSdmList] = React.useState([]);
  const [amList, setAmList] = React.useState([]);
  React.useEffect(() => {
    if (permissions && permissions.VIEW_RECRUITER_NAMES) {
      getRecruiterList(setRecruiterList, setRecruiterLoading);
    }
  }, []);
  React.useEffect(() => {
    if (permissions && permissions.VIEW_SDM_NAMES) {
      getSdmList(setSdmList, setSdmLoading);
    }
  }, []);
  React.useEffect(() => {
    if (permissions && permissions.VIEW_AM_NAMES) {
      getAmList(setAmList, setAmLoading);
    }
  }, []);

  React.useEffect(() => {
    if (clientsLoading) {
      getMySubmissions(
        id,
        setMySubmissions,
        setMySubmissionsLoading,
        setMySubmissionsError,
        startDate,
        endDate,
        userType,
        pageSubmissions,
        setSubmissionsPage,
        setSubmissionsTotalPage,
        filters,
        setFilters,
        clients
      );
    }
  }, [pageSubmissions, clientsLoading]);

  React.useEffect(() => {
    if (clientsLoading) {
      getMyInterviews(
        id,
        setMyInterviews,
        setMyInterviewsLoading,
        setMyInterviewsError,
        startDate,
        endDate,
        userType,
        pageInterviews,
        setInterviewsPage,
        setInterviewsTotalPage,
        filters,
        setFilters,
        clients
      );
    }
  }, [pageInterviews, clientsLoading]);

  React.useEffect(() => {
    if (clientsLoading) {
      getMyOffers(
        id,
        setMyOffers,
        setMyOffersLoading,
        setMyOffersError,
        startDate,
        endDate,
        userType,
        pageOffers,
        setOffersPage,
        setOffersTotalPage,
        filters,
        setFilters,
        clients
      );
    }
  }, [pageOffers, clientsLoading]);

  React.useEffect(() => {
    if (clientsLoading) {
      getMyStarts(
        id,
        setMyStarts,
        setMyStartsLoading,
        setMyStartsError,
        startDate,
        endDate,
        userType,
        pageStarts,
        setStartsPage,
        setStartsTotalPage,
        filters,
        setFilters,
        clients
      );
    }
  }, [pageStarts, clientsLoading]);

  React.useEffect(() => {
    if (clientsLoading) {
      getMyPerformances(
        id,
        setMyPerformances,
        setMyPerformancesLoading,
        setMyPerformancesError,
        startDate,
        endDate,
        userType,
        pagePerformances,
        setPerformancesPage,
        setPerformancesTotalPage,
        filters,
        setFilters,
        clients
      );
    }
  }, [pagePerformances, clientsLoading]);

  React.useEffect(() => {
    if (clientsLoading && userType === "sdm") {
      getMyMasterData(
        id,
        setMyMasterData,
        setMyMasterDataLoading,
        setMyMasterDataError,
        startDate,
        endDate,
        userType,
        pageMasterData,
        setMasterDataPage,
        setMasterDataTotalPage,
        filters,
        setFilters,
        clients
      );
    }
  }, [pageMasterData, clientsLoading]);

  var datesPeriodList = [
    {
      value: 1,
      label: "All Period",
    },
    {
      value: 2,
      label: "1 Week",
    },
    {
      value: 3,
      label: "1 Month",
    },
    {
      value: 4,
      label: "6 Months",
    },
    {
      value: 5,
      label: "1 year",
    },
  ];

  const onClickHandler = (e) => {
    downloadMyReport(
      id,
      setMyOffersDownloadLoading,
      setMyOffersDownloadError,
      startDate,
      endDate,
      userType,
      pageOffers,
      filters,
      clients,
      activeTab
    );
  };

  return (
    <div className="inner font mx-4 text-white mt-3 py-3 my-3">
      <div>{getHeading(userType)}</div>
      {!clientsLoading &&
      (permissions && permissions.VIEW_RECRUITER_NAMES
        ? !recruiterLoading
        : true) &&
      (permissions && permissions.VIEW_AM_NAMES ? !amLoading : true) &&
      (permissions && permissions.VIEW_SDM_NAMES ? !sdmLoading : true) ? (
        <div className="inner bg-white pt-5 pb-2 my-4 rounded shadow font">
          <div class="ph-item">
            <div class="ph-col-12">
              <div class="ph-row">
                <div class="ph-col-2 big"></div>
                <div class="ph-col-1 empty"></div>
                <div class="ph-col-2 big"></div>
                <div class="ph-col-1 empty"></div>
                <div class="ph-col-2 big"></div>
                <div class="ph-col-1 empty"></div>
                <div class="ph-col-2 big"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={initialFormData}
          enableReinitialize={true}
          onSubmit={() => {
            if (clientsLoading) {
              getMySubmissions(
                id,
                setMySubmissions,
                setMySubmissionsLoading,
                setMySubmissionsError,
                startDate,
                endDate,
                userType,
                pageSubmissions,
                setSubmissionsPage,
                setSubmissionsTotalPage,
                filters,
                setFilters,
                clients
              );
              getMyInterviews(
                id,
                setMyInterviews,
                setMyInterviewsLoading,
                setMyInterviewsError,
                startDate,
                endDate,
                userType,
                pageInterviews,
                setInterviewsPage,
                setInterviewsTotalPage,
                filters,
                setFilters,
                clients
              );
              getMyOffers(
                id,
                setMyOffers,
                setMyOffersLoading,
                setMyOffersError,
                startDate,
                endDate,
                userType,
                pageOffers,
                setOffersPage,
                setOffersTotalPage,
                filters,
                setFilters,
                clients
              );
              getMyStarts(
                id,
                setMyStarts,
                setMyStartsLoading,
                setMyStartsError,
                startDate,
                endDate,
                userType,
                pageStarts,
                setStartsPage,
                setStartsTotalPage,
                filters,
                setFilters,
                clients
              );
              getMyPerformances(
                id,
                setMyPerformances,
                setMyPerformancesLoading,
                setMyPerformancesError,
                startDate,
                endDate,
                userType,
                pagePerformances,
                setPerformancesPage,
                setPerformancesTotalPage,
                filters,
                setFilters,
                clients
              );
              if (userType === "sdm") {
                getMyMasterData(
                  id,
                  setMyMasterData,
                  setMyMasterDataLoading,
                  setMyMasterDataError,
                  startDate,
                  endDate,
                  userType,
                  pageMasterData,
                  setMasterDataPage,
                  setMasterDataTotalPage,
                  filters,
                  setFilters,
                  clients
                );
              }
            }
          }}
        >
          {(props) => {
            const { handleSubmit } = props;
            return (
              <Form onSubmit={handleSubmit}>
                {userType != "recruiter" ? (
                  <div className="bg-white px-3  py-4 my-3 text-black rounded">
                    {/* <div className="row px-3">
                      <Select
                        className="form-control mr-2 px-0 py-0 col-lg"
                        options={datesPeriodList}
                        placeholder={<div>Select Time Period</div>}
                      ></Select>
                      <span className="col-lg">
                        <input
                          type="date"
                          className="form-control pt-2"
                          onChange={(event) => setStartDate(event.target.value)}
                          max={currentDate}
                          value={startDate}
                        />
                      </span>
                      <span className="mx-2 pt-2">To</span>
                      <span className="col-lg">
                        <input
                          type="date"
                          className="form-control pt-2"
                          onChange={(event) => setEndDate(event.target.value)}
                          max={currentDate}
                          value={endDate}
                        />
                      </span>
                    </div> */}

                    <div
                      className="d-lg-flex mt-4 row"
                      style={{ justifyContent: "space-between" }}
                    >
                      <div className="d-lg-flex col-lg">
                        {permissions && permissions.VIEW_CLIENT_NAMES && (
                          <Select
                            classNamePrefix="mySelect"
                            isMulti
                            options={clients}
                            className="form-control col-lg mr-2 px-0 py-0"
                            getOptionLabel={({ value }) => value}
                            getOptionValue={({ id }) => id}
                            onChange={(event) => {
                              const filterList = event
                                ? event.map((item) => item.id).join(", ")
                                : "";
                              console.log(filterList);
                              setFilters({
                                ...filters,
                                clientId: filterList,
                                filterUpdated: true,
                              });
                            }}
                            placeholder={<div>Client Name</div>}
                          ></Select>
                        )}
                        {permissions && permissions.VIEW_RECRUITER_NAMES && (
                          <Select
                            isMulti
                            options={recruiterList}
                            className="form-control col-lg mx-2 px-0 py-0"
                            getOptionLabel={({ username }) => username}
                            getOptionValue={({ id }) => id}
                            onChange={(event) => {
                              const filterList = event
                                ? event.map((item) => item.id).join(", ")
                                : "";
                              setFilters({
                                ...filters,
                                recruiterId: filterList,
                                filterUpdated: true,
                              });
                            }}
                            placeholder={<div>Recruiter Name</div>}
                          ></Select>
                        )}
                      </div>
                    </div>
                    <div
                      className="d-lg-flex mt-4 row"
                      style={{ justifyContent: "space-between" }}
                    >
                      <div className="d-lg-flex col-lg mt-3">
                        {permissions && permissions.VIEW_SDM_NAMES && (
                          <Select
                            isMulti
                            options={sdmList}
                            className="form-control col-lg mr-2 px-0 py-0"
                            getOptionLabel={({ username }) => username}
                            getOptionValue={({ id }) => id}
                            onChange={(event) => {
                              const filterList = event
                                ? event.map((item) => item.id).join(", ")
                                : "";
                              setFilters({
                                ...filters,
                                sdmId: filterList,
                                filterUpdated: true,
                              });
                            }}
                            placeholder={<div>SDM</div>}
                          ></Select>
                        )}
                        {permissions && permissions.VIEW_AM_NAMES && (
                          <Select
                            isMulti
                            options={amList}
                            className="form-control col-lg mx-2 px-0 py-0"
                            getOptionLabel={({ username }) => username}
                            getOptionValue={({ id }) => id}
                            onChange={(event) => {
                              const filterList = event
                                ? event.map((item) => item.id).join(", ")
                                : "";
                              setFilters({
                                ...filters,
                                accMgrId: filterList,
                                filterUpdated: true,
                              });
                            }}
                            placeholder={<div>Account Manager</div>}
                          ></Select>
                        )}
                      </div>
                    </div>
                    <div
                      style={{ justifyContent: "space-between" }}
                      className="d-lg-flex mx-0 my-3 text-black  row"
                    >
                      <div className="d-lg-flex col-lg row">
                        <Select
                          className="form-control mr-2 px-0 py-0 col-lg"
                          options={datesPeriodList}
                          placeholder={<div>Select Time Period</div>}
                        ></Select>
                        <span className="col-lg">
                          <input
                            type="date"
                            className="form-control pt-2"
                            onChange={(event) =>
                              setStartDate(event.target.value)
                            }
                            max={currentDate}
                            value={startDate}
                          />
                        </span>
                        <span className="mx-2 pt-2">To</span>
                        <span className="col-lg">
                          <input
                            type="date"
                            className="form-control pt-2"
                            onChange={(event) => setEndDate(event.target.value)}
                            max={currentDate}
                            value={endDate}
                          />
                        </span>
                      </div>
                      <div className="mx-3">
                        <button
                          style={{ height: "100%" }}
                          type="submit"
                          className="btn btn-sm text-white px-5 b-color-search-description mx-2"
                        >
                          Search
                        </button>
                        <button
                          style={{ height: "100%" }}
                          type="button"
                          className="btn btn-secondary btn-sm px-5 mx-2"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{ justifyContent: "space-between" }}
                    className="d-lg-flex bg-white px-3 mx-0  py-4 my-3 text-black rounded row"
                  >
                    <div className="d-lg-flex col-lg row ">
                      <select className="form-control pt-2 mr-3 col-lg border border-dark">
                        <option hidden disabled selected="true" value="">
                          All Period
                        </option>
                      </select>
                      <span className="col-lg">
                        <input
                          type="date"
                          className="form-control pt-2 border border-dark"
                          onChange={(event) => setStartDate(event.target.value)}
                          max={currentDate}
                          value={startDate}
                        />
                      </span>
                      <span className="mx-2 pt-2">To</span>
                      <span className="col-lg">
                        <input
                          type="date"
                          className="form-control pt-2 border border-dark"
                          onChange={(event) => setEndDate(event.target.value)}
                          max={currentDate}
                          value={endDate}
                        />
                      </span>
                    </div>
                    <div className="mx-3">
                      <button
                        style={{ height: "100%" }}
                        type="submit"
                        className="btn btn-sm text-white px-5 b-color-search-description mx-2"
                      >
                        Search
                      </button>
                      <button
                        style={{ height: "100%" }}
                        type="button"
                        className="btn btn-secondary btn-sm px-5 mx-2"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      )}
      {!clientsLoading ? (
        <div className="inner bg-white my-4 rounded shadow font">
          <div class="ph-item">
            <div class="ph-col-12">
              <div className="ph-picture" style={{ height: "500px" }}></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-4 rounded ">
          <div className="d-lg-flex justify-content-between">
            <ul className="nav nav-tabs rounded" id="myTab" role="tablist">
              <li
                className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
                role="presentation"
                id="sourced-li"
              >
                <a
                  className="nav-link text-white mx-2 px-2 py-1 active show"
                  id="sourced-tab"
                  data-toggle="tab"
                  href="#sourced"
                  role="tab"
                  aria-controls="sourced"
                  aria-selected="false"
                  onClick={() => {
                    setActiveTab("submission");
                  }}
                >
                  Submissions
                </a>
              </li>
              <li
                className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
                role="presentation"
                id="submitted-li"
              >
                <a
                  className="nav-link text-white mx-2 px-4 py-1"
                  id="submitted-tab"
                  data-toggle="tab"
                  href="#submitted"
                  role="tab"
                  aria-controls="submitted"
                  aria-selected="false"
                  onClick={() => {
                    setActiveTab("interview");
                  }}
                >
                  Interviews
                </a>
              </li>
              <li
                className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
                role="presentation"
                id="interview-li"
              >
                <a
                  className="nav-link text-white mx-2 px-4 py-1 "
                  id="interviews-tab"
                  data-toggle="tab"
                  href="#interviews"
                  role="tab"
                  aria-controls="interviews"
                  aria-selected="false"
                  onClick={() => {
                    setActiveTab("offer");
                  }}
                >
                  Offers
                </a>
              </li>
              <li
                className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
                role="presentation"
                id="log-li"
              >
                <a
                  className="nav-link text-white mx-2 px-4 py-1"
                  id="offers-tab"
                  data-toggle="tab"
                  href="#offers"
                  role="tab"
                  aria-controls="offers"
                  aria-selected="true"
                  onClick={() => {
                    setActiveTab("starts");
                  }}
                >
                  Starts
                </a>
              </li>
              <li
                className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
                role="presentation"
                id="log-li"
              >
                <a
                  className="nav-link text-white mx-2 px-3 py-1"
                  id="log-tab"
                  data-toggle="tab"
                  href="#log"
                  role="tab"
                  aria-controls="log"
                  aria-selected="true"
                  onClick={() => {
                    setActiveTab("performance");
                  }}
                >
                  Performance
                </a>
              </li>
              {permissions.VIEW_AM_NAMES && !permissions.VIEW_SDM_NAMES ? (
                <li
                  className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
                  role="presentation"
                  id="master-li"
                >
                  <a
                    className="nav-link text-white mx-2 px-3 py-1"
                    id="master-tab"
                    data-toggle="tab"
                    href="#master"
                    role="tab"
                    aria-controls="master"
                    aria-selected="true"
                    onClick={() => {
                      setActiveTab("master");
                    }}
                  >
                    Master
                  </a>
                </li>
              ) : null}
            </ul>
            <div className="px-1">
              <Link to="#" onClick={(e) => onClickHandler(e)}>
                <img
                  src="./images/download-white.png"
                  className="img-fluid px-1"
                  alt="Icon Unavailable"
                />
              </Link>
            </div>
          </div>
          <div
            className="tab-content bg-white rounded history-font-size"
            id="myTabContent"
          >
            <div
              className="tab-pane fade"
              id="submitted"
              role="tabpanel"
              aria-labelledby="submitted"
            >
              {
                <Interviews
                  loading={myInterviewsLoading}
                  error={myInterviewsError}
                  myInterviews={myInterviews}
                  totalPage={totalInterviewsPage}
                  page={pageInterviews}
                  setPage={setInterviewsPage}
                />
              }
            </div>
            <div
              className="tab-pane fade show active"
              id="sourced"
              role="tabpanel"
              aria-labelledby="sourced"
            >
              {
                <Submissions
                  loading={mySubmissionsLoading}
                  error={mySubmissionsError}
                  mySubmissions={mySubmissions}
                  totalPage={totalSubmissionsPage}
                  page={pageSubmissions}
                  setPage={setSubmissionsPage}
                />
              }
            </div>
            <div
              className="tab-pane fade "
              id="interviews"
              role="tabpanel"
              aria-labelledby="interviews"
            >
              {
                <Offers
                  loading={myOffersLoading}
                  error={myOffersError}
                  myOffers={myOffers}
                  totalPage={totalOffersPage}
                  page={pageOffers}
                  setPage={setOffersPage}
                />
              }
            </div>
            <div
              className="tab-pane fade"
              id="log"
              role="tabpanel"
              aria-labelledby="log"
            >
              {
                <Performances
                  loading={myPerformancesLoading}
                  error={myPerformancesError}
                  myPerformances={myPerformances}
                  totalPage={totalPerformancesPage}
                  page={pagePerformances}
                  setPage={setPerformancesPage}
                  userType={userType}
                />
              }
            </div>
            <div
              className="tab-pane fade"
              id="offers"
              role="tabpanel"
              aria-labelledby="offers"
            >
              {
                <Starts
                  loading={myStartsLoading}
                  error={myStartsError}
                  myStarts={myStarts}
                  totalPage={totalStartsPage}
                  page={pageStarts}
                  setPage={setStartsPage}
                />
              }
            </div>
            {permissions.VIEW_AM_NAMES && !permissions.VIEW_SDM_NAMES ? (
              <div
                className="tab-pane fade"
                id="master"
                role="tabpanel"
                aria-labelledby="master"
              >
                {
                  <Master
                    loading={myMasterDataLoading}
                    error={myMasterDataError}
                    myMasterData={myMasterData}
                    totalPage={totalMasterDataPage}
                    page={pageMasterData}
                    setPage={setMasterDataPage}
                  />
                }
              </div>
            ) : null}
          </div>
        </div>
      )}
      <div className="d-flex justify-content start">
        <Button
          variant="warning"
          className="btn btn-warning btn-sm px-5 rounded-4"
          onClick={handleShow}
        >
          <span className="innerbtn">Create DSR</span>
        </Button>
        <Button
          variant="warning"
          className="btn btn-warning btn-sm px-5 rounded-4 ml-3"
        >
          <span className="innerbtn">View DSR</span>
        </Button>
      </div>
      <div className="new-sec">
        <Table bordered size="sm">
          <thead className="head-bg">
            <tr className="height-row">
              <th>Submission Date</th>
              <th>Client</th>
              <th>Job ID</th>
              <th>Job Title</th>
              <th>Recruiter's Name</th>
              <th>Candidate Name/Submission</th>
              <th>Candidate Rating</th>
              <th>Reason for No Submission</th>
              <th>BR</th>
              <th>PR</th>
              <th>Team Lead</th>
              <th>Am Name</th>
              <th>Location</th>
              <th>Sourcing Tool</th>
            </tr>
          </thead>
          <tbody>
            <tr className="height-row">
              <td> 8/3/2020</td>
              <td>tesla</td>
              <td>605178</td>
              <td>Web Developer</td>
              <td>Ayushi Mahajan</td>
              <td>Randall Bowles</td>
              <td>B+</td>
              <td>Submitted</td>
              <td>106.26</td>
              <td>77.00</td>
              <td>Azhar Khan</td>
              <td>Nicola Jacobs</td>
              <td>San Diego, CA</td>
              <td>Dice</td>
            </tr>

            <tr className="height-row">
              <td>8/3/2020</td>
              <td>tesla</td>
              <td>605178</td>
              <td>Web Developer</td>
              <td>Ayushi Mahajan</td>
              <td>Randall Bowles</td>
              <td>B+</td>
              <td>Submitted</td>
              <td>106.26</td>
              <td>77.00</td>
              <td>Azhar Khan</td>
              <td>Nicola Jacobs</td>
              <td>San Diego, CA</td>
              <td>Dice</td>
            </tr>
            <tr className="height-row">
              <td>8/3/2020</td>
              <td>tesla</td>
              <td>605178</td>
              <td>Web Developer</td>
              <td>Ayushi Mahajan</td>
              <td>Randall Bowles</td>
              <td>B+</td>
              <td>Submitted</td>
              <td>106.26</td>
              <td>77.00</td>
              <td>Azhar Khan</td>
              <td>Nicola Jacobs</td>
              <td>San Diego, CA</td>
              <td>Dice</td>
            </tr>
          </tbody>
        </Table>
        <div className="d-flex justify-content-end">
          <Button
            variant="primary"
            className="btn btn-primary btn-sm px-4 rounded-4 "
          >
            <span className="innerbtn2">Submit </span>
          </Button>
          <Button
            variant="secondary"
            className="btn btn-secondary btn-sm px-4 rounded-4 ml-2"
            onClick={handleShow}
          >
            <span className="innerbtn2">Update DSR</span>
          </Button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Update DSR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalDrs />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="btn btn-primary btn-sm px-5 rounded-3"
          >
            Update
          </Button>
          <Button
            variant="secondary"
            className="btn btn-primary btn-sm px-5 rounded-3"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DailyReport;
