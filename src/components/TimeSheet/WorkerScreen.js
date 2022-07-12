import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Col,
  Row,
  OverlayTrigger,
  Tooltip,
  Button,
  FormControl,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "./WorkerScreen.styles.css";
import * as Icon from "react-bootstrap-icons";
import { BsHandThumbsDownFill, BsFillHandThumbsUpFill } from "react-icons/bs";
import { Formik, FieldArray } from "formik";
import {
  getWorkerDailyDetails,
  postWorkerDailyDetails,
  getSubmitToManager,
} from "../../Services/timesheetServices";
import { Weekday } from "../../constants";
import { format, addHours } from "date-fns";
import { useHistory } from "react-router-dom";

const WorkerScreen = (props) => {
  const { state } = props.location;
  const history = useHistory();
  const [userData] = useState(state && state.weekly ? state.weekly : []);
  const [userManagerData] = useState(
    state && state.manager ? state.manager : []
  );
  const { edit } = state;
  const [workerDailyData, setWorkerDailyData] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [submitToManager, setSubmitToManager] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(0);

  useEffect(() => {
    getWorkerDailyDetails(userData, setWorkerDailyData, setTableLoading);
  }, [userData, refreshTable]);

  const otCalculation = (reg) => {
    return reg - 8;
  };
  const dtCalculation = (ot) => {
    return ot - 4;
  };

  const regCalculation = (timeIn, timeOut, startLunch, endLunch) => {
    //calculating normal In-Out time
    var diff;
    if (
      timeOut &&
      new Date(timeOut).getTime() &&
      timeIn &&
      new Date(timeIn).getTime()
    ) {
      diff = (new Date(timeOut).getTime() - new Date(timeIn).getTime()) / 1000;
      diff /= 60 * 60;
      if (diff < 0) {
        var diff = 24 + diff;
      }
    }

    //calculating sunch time
    var diffLunch;
    if (
      timeOut &&
      timeIn &&
      endLunch &&
      new Date(endLunch).getTime() &&
      startLunch &&
      new Date(startLunch).getTime()
    ) {
      diffLunch =
        (new Date(endLunch).getTime() - new Date(startLunch).getTime()) / 1000;
      diffLunch /= 60 * 60;
      if (diffLunch < 0) {
        var diffLunch = 24 + diffLunch;
      }
    }

    //Rounding off the reult In-Out time
    var result;
    if (new Date(timeOut).getTime() && new Date(timeIn).getTime()) {
      result = (diff * 100) / 100; //+ Number.EPSILON
    } else {
      result = 0.0;
    }

    //Rounding off the reult In-Out time including lunch time
    var resultLunchTime;
    if (
      timeOut &&
      timeIn &&
      endLunch &&
      new Date(endLunch).getTime() &&
      startLunch &&
      new Date(startLunch).getTime()
    ) {
      resultLunchTime = result - (diffLunch * 100) / 100; //+ Number.EPSILON
    } else {
      resultLunchTime = 0.0;
    }
    //returning result based on above data
    return !resultLunchTime
      ? (result && parseFloat(result)) || 0.0
      : (resultLunchTime && parseFloat(resultLunchTime)) || 0.0;
  };

  const totalREG = (values) => {
    let total = 0.0;
    values.map((row) => (total += (row.reg && parseFloat(row.reg)) || 0.0));
    return parseFloat(Math.round((total + Number.EPSILON) * 100) / 100);
  };
  const totalDT = (values) => {
    let total = 0.0;
    values.map((row) => (total += (row.dt && parseFloat(row.dt)) || 0.0));
    return parseFloat(Math.round((total + Number.EPSILON) * 100) / 100);
  };
  const totalOT = (values) => {
    let total = 0.0;
    values.map((row) => (total += (row.ot && parseFloat(row.ot)) || 0.0));
    return parseFloat(Math.round((total + Number.EPSILON) * 100) / 100);
  };
  const totalOverAll = (values) => {
    let total = 0.0;
    values.map((row) => (total += (row.total && parseFloat(row.total)) || 0.0));
    return parseFloat(Math.round((total + Number.EPSILON) * 100) / 100);
  };

  const totalOverAllRow = (row) => {
    let total = 0.0;
    total =
      parseFloat(row.ot ? row.ot : 0.0) +
      parseFloat(row.dt ? row.dt : 0.0) +
      parseFloat(row.reg ? row.reg : 0.0);
    return parseFloat(Math.round((total + Number.EPSILON) * 100) / 100);
  };

  const handleSubmitToManager = () => {
    setErrorMessage(false);
    setTableLoading(true);
    getSubmitToManager(
      userData,
      refreshTable,
      setRefreshTable,
      history,
      setErrorMessage,
      setTableLoading
    );
  };

  function convertTZ(date, tzString) {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  }
  function disableDate(date) {
    if (new Date().getTimezoneOffset() > 0) {
      return (
        convertTZ(date, "Asia/Jakarta").setDate(
          convertTZ(date, "Asia/Jakarta").getDate()
        ) <
        convertTZ(userData.start_date, "Asia/Jakarta").setDate(
          convertTZ(userData.start_date, "Asia/Jakarta").getDate()
        )
      );
    }
    return (
      convertTZ(date, "Asia/Jakarta").setDate(
        convertTZ(date, "Asia/Jakarta").getDate() + 1
      ) <
      convertTZ(userData.start_date, "Asia/Jakarta").setDate(
        convertTZ(userData.start_date, "Asia/Jakarta").getDate()
      )
    );
  }
  return (
    <>
      <div className="inner font py-4 mx-4 text-center text-white h4">
        <Row>
          <Col lg className="text-uppercase" style={{ fontSize: "large" }}>
            {`Name: ${userData.worker_name}`}
          </Col>
          <Col lg className="text-uppercase" style={{ fontSize: "large" }}>
            Week Ending: {""}
            {format(
              convertTZ(userData.week_ending, "Asia/Jakarta"),
              "MM/dd/yyyy"
            )}
          </Col>
          <Col lg className="text-uppercase" style={{ fontSize: "large" }}>
            {`Job Id: ${userData.job_id}`}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg className="text-uppercase" style={{ fontSize: "large" }}>
            Manager Name: {userData.approver}
          </Col>
          <Col lg className="text-uppercase" style={{ fontSize: "large" }}>
            Manager Email: {userData.approver_email}
          </Col>
          <Col lg className="text-uppercase" style={{ fontSize: "large" }}>
            Client: {userManagerData.client_name}
          </Col>
        </Row>
      </div>
      <div className="inner pb-3 mx-4 rounded font">
        <Formik
          initialValues={{ workerDailyData }}
          enableReinitialize={true}
          validationSchema={null}
          onSubmit={(values, { setSubmitting }) => {
            setSuccessMessage(false);
            postWorkerDailyDetails(
              values.workerDailyData,
              setWorkerDailyData,
              setTableLoading,
              setSuccessMessage,
              setErrorMessage,
              setSubmitToManager
            );
            setSubmitting(true);
          }}
        >
          {(props) => {
            const { values, handleSubmit } = props;
            return (
              <Form onSubmit={handleSubmit}>
                {errorMessage && (
                  <div
                    className="h4 bg-white"
                    style={{ color: "red", padding: "10px" }}
                  >
                    {errorMessage}
                  </div>
                )}
                {successMessage && (
                  <div
                    className="h4 bg-white"
                    style={{ color: "green", padding: "10px" }}
                  >
                    {successMessage}
                  </div>
                )}
                <FieldArray name="workerDailyData">
                  {({ insert, replace, push }) => (
                    <Table className="table-hover d-table bg-white align-middle">
                      <thead className="job-table-head-bg-color">
                        <tr className="text-white" width="990">
                          <th style={{ width: "100px" }}>Status</th>
                          <th>Date</th>
                          <th>Time IN</th>
                          <th>Time OUT</th>
                          <th>Start Lunch</th>
                          <th>End Lunch</th>
                          <th>Regular</th>
                          {userManagerData &&
                            userManagerData.overtime_exempt === 1 && (
                              <th>Overtime</th>
                            )}
                          {userManagerData &&
                            userManagerData.overtime_exempt === 1 && (
                              <th>Double-Time</th>
                            )}
                          <th>Total</th>
                          <th>Comment</th>
                        </tr>
                      </thead>

                      <tbody>
                        {tableLoading ? (
                          <tr className="text-center">
                            <td colspan="15">
                              <div
                                className="spinner-border text-dark"
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          <>
                            {values.workerDailyData.length > 0 &&
                              values.workerDailyData.map((row, idx) => (
                                <tr
                                  key={idx}
                                  className={`${
                                    idx === 0 || idx === 6 ? "disabledRow" : ""
                                  }`}
                                >
                                  <td>
                                    <Col style={{ display: "flex" }}>
                                      {row.save_status === 1 && (
                                        <span className={"showOnHover"}>
                                          <span
                                            className="font font-weight-bold"
                                            data-toggle="modal"
                                            data-target="#addRemark"
                                          >
                                            <OverlayTrigger
                                              placement="bottom"
                                              overlay={
                                                <Tooltip id="button-tooltip-2">
                                                  Saved
                                                </Tooltip>
                                              }
                                            >
                                              <Icon.BookmarkFill
                                                size="20px"
                                                fill="#00000"
                                              />
                                            </OverlayTrigger>
                                          </span>
                                        </span>
                                      )}
                                      {/* {row.submission_status === 4 && (
                                        <span className={"showOnHover"}>
                                          <span
                                            className="font font-weight-bold"
                                            data-toggle="modal"
                                            data-target="#addRemark"
                                          >
                                            <OverlayTrigger
                                              placement="bottom"
                                              overlay={
                                                <Tooltip id="button-tooltip-2">
                                                  Submitted
                                                </Tooltip>
                                              }
                                            >
                                              <Icon.Check2Square
                                                size="20px"
                                                fill="#00000"
                                              />
                                            </OverlayTrigger>
                                          </span>
                                        </span>
                                      )} */}
                                      {row.timesheet_status === 1 && (
                                        <span className={"showOnHover"}>
                                          <span
                                            className="font font-weight-bold"
                                            data-toggle="modal"
                                            data-target="#addRemark"
                                          >
                                            <OverlayTrigger
                                              placement="bottom"
                                              overlay={
                                                <Tooltip id="button-tooltip-2">
                                                  Approved
                                                </Tooltip>
                                              }
                                            >
                                              <BsFillHandThumbsUpFill
                                                size="20px"
                                                fill="green"
                                                className="accordion-toggle"
                                              />
                                            </OverlayTrigger>
                                          </span>
                                        </span>
                                      )}
                                      {row.timesheet_status === 2 && (
                                        <span className={"showOnHover"}>
                                          <span
                                            className="font font-weight-bold"
                                            data-toggle="modal"
                                            data-target="#addRemark"
                                          >
                                            <OverlayTrigger
                                              placement="bottom"
                                              overlay={
                                                <Tooltip id="button-tooltip-2">
                                                  Rejected
                                                </Tooltip>
                                              }
                                            >
                                              <BsHandThumbsDownFill
                                                size="20px"
                                                fill="red"
                                                className="accordion-toggle"
                                              />
                                            </OverlayTrigger>
                                          </span>
                                        </span>
                                      )}
                                      {row.timesheet_status === 3 && (
                                        <span className={"showOnHover"}>
                                          <span
                                            className="font font-weight-bold"
                                            data-toggle="modal"
                                            data-target="#addRemark"
                                          >
                                            <OverlayTrigger
                                              placement="bottom"
                                              overlay={
                                                <Tooltip id="button-tooltip-2">
                                                  Submitted For Approval
                                                </Tooltip>
                                              }
                                            >
                                              <Icon.ClockFill
                                                size="20px"
                                                fill="#000000"
                                              />
                                            </OverlayTrigger>
                                          </span>
                                        </span>
                                      )}
                                      {/* {row.billing_status === 5 && (
                                        <span className={"showOnHover"}>
                                          <span
                                            className="font font-weight-bold"
                                            data-toggle="modal"
                                            data-target="#addRemark"
                                          >
                                            <OverlayTrigger
                                              placement="bottom"
                                              overlay={
                                                <Tooltip id="button-tooltip-2">
                                                  Billed
                                                </Tooltip>
                                              }
                                            >
                                              <Icon.CashStack
                                                size="20px"
                                                fill="#FFD700"
                                              />
                                            </OverlayTrigger>
                                          </span>
                                        </span>
                                      )} */}
                                    </Col>
                                  </td>
                                  <td>
                                    {`${
                                      Weekday[
                                        new Date(
                                          convertTZ(row.date, "Asia/Jakarta")
                                        ).getDay()
                                      ]
                                    }  ${format(
                                      convertTZ(row.date, "Asia/Jakarta"),
                                      "MM/dd/yyyy"
                                    )}`}
                                  </td>
                                  <td>
                                    <DatePicker
                                      name="time_in"
                                      id="time_in"
                                      selected={
                                        row.time_in && new Date(row.time_in)
                                      }
                                      isClearable={
                                        edit && row.submission_status !== 4
                                      }
                                      autoComplete="off"
                                      disabled={
                                        row.timesheet_status === 1 ||
                                        row.timesheet_status === 3 ||
                                        disableDate(row.date) ||
                                        !edit
                                      }
                                      onChange={(date) => {
                                        const data =
                                          values.workerDailyData.filter(
                                            (newRow, index) => index === idx
                                          );
                                        var timeString;
                                        var combined;
                                        if (date) {
                                          timeString =
                                            date.getHours() +
                                            ":" +
                                            date.getMinutes() +
                                            ":00";
                                          combined = new Date(
                                            row.date + " " + timeString
                                          );
                                        }
                                        data[0].time_in =
                                          date &&
                                          format(
                                            new Date(combined),
                                            "yyyy-MM-dd HH:mm"
                                          );
                                        data[0].reg =
                                          regCalculation(
                                            data[0].time_in,
                                            data[0].time_out,
                                            data[0].start_lunch,
                                            data[0].end_lunch
                                          ) || 0;
                                        if (
                                          userManagerData &&
                                          userManagerData.overtime_exempt === 1
                                        )
                                          data[0].ot =
                                            data[0].reg > 8
                                              ? otCalculation(data[0].reg)
                                              : 0.0;
                                        if (
                                          userManagerData &&
                                          userManagerData.overtime_exempt === 1
                                        )
                                          data[0].dt =
                                            data[0].ot > 4
                                              ? dtCalculation(data[0].ot)
                                              : 0.0;
                                        if (
                                          data[0].ot > 0 &&
                                          data[0].ot < 4 &&
                                          userManagerData &&
                                          userManagerData.overtime_exempt === 1
                                        ) {
                                          data[0].reg = 8.0;
                                        } else if (
                                          data[0].ot >= 4 &&
                                          userManagerData &&
                                          userManagerData.overtime_exempt === 1
                                        ) {
                                          data[0].reg = 8.0;
                                          data[0].ot = 4.0;
                                        }
                                        data[0].total = totalOverAllRow(
                                          data[0]
                                        );
                                        replace(idx, data[0]);
                                        totalREG(values.workerDailyData);
                                      }}
                                      showTimeSelect
                                      showTimeSelectOnly
                                      timeIntervals={15}
                                      timeCaption="Time"
                                      placeholderText="Time In"
                                      dateFormat="h:mm aa"
                                    />
                                  </td>
                                  <td>
                                    <DatePicker
                                      name="time_out"
                                      id="time_out"
                                      selected={
                                        row.time_out && new Date(row.time_out)
                                      }
                                      isClearable={
                                        edit && row.submission_status !== 4
                                      }
                                      autoComplete="off"
                                      disabled={
                                        row.timesheet_status === 1 ||
                                        row.timesheet_status === 3 ||
                                        disableDate(row.date) ||
                                        !edit
                                      }
                                      onChange={(date) => {
                                        const data =
                                          values.workerDailyData.filter(
                                            (newRow, index) => index === idx
                                          );
                                        var timeString;
                                        var combined;
                                        if (date) {
                                          timeString =
                                            date.getHours() +
                                            ":" +
                                            date.getMinutes() +
                                            ":00";
                                          combined = new Date(
                                            row.date + " " + timeString
                                          );
                                        }
                                        data[0].time_out =
                                          date &&
                                          format(
                                            new Date(combined),
                                            "yyyy-MM-dd HH:mm"
                                          );
                                        data[0].reg =
                                          regCalculation(
                                            data[0].time_in,
                                            data[0].time_out,
                                            data[0].start_lunch,
                                            data[0].end_lunch
                                          ) || 0;
                                        if (
                                          userManagerData &&
                                          userManagerData.overtime_exempt === 1
                                        )
                                          data[0].ot =
                                            data[0].reg > 8
                                              ? otCalculation(data[0].reg)
                                              : 0.0;
                                        if (
                                          userManagerData &&
                                          userManagerData.overtime_exempt === 1
                                        )
                                          data[0].dt =
                                            data[0].ot > 4
                                              ? dtCalculation(data[0].ot)
                                              : 0.0;
                                        if (
                                          data[0].ot > 0 &&
                                          data[0].ot < 4 &&
                                          userManagerData &&
                                          userManagerData.overtime_exempt === 1
                                        ) {
                                          data[0].reg = 8.0;
                                        } else if (
                                          data[0].ot >= 4 &&
                                          userManagerData &&
                                          userManagerData.overtime_exempt === 1
                                        ) {
                                          data[0].reg = 8.0;
                                          data[0].ot = 4.0;
                                        }
                                        data[0].total = totalOverAllRow(
                                          data[0]
                                        );
                                        replace(idx, data[0]);
                                        totalREG(values.workerDailyData);
                                      }}
                                      showTimeSelect
                                      showTimeSelectOnly
                                      timeIntervals={15}
                                      minTime={
                                        row.time_in &&
                                        addHours(new Date(row.time_in), 0)
                                      }
                                      maxTime={
                                        row.time_in &&
                                        addHours(new Date(row.time_in), 18)
                                      }
                                      timeCaption="Time"
                                      placeholderText="Time Out"
                                      dateFormat="h:mm aa"
                                    />
                                  </td>
                                  <td>
                                    <DatePicker
                                      name="start_lunch"
                                      id="start_lunch"
                                      selected={
                                        row.start_lunch &&
                                        new Date(row.start_lunch)
                                      }
                                      isClearable={
                                        edit && row.submission_status !== 4
                                      }
                                      autoComplete="off"
                                      disabled={
                                        row.timesheet_status === 1 ||
                                        row.timesheet_status === 3 ||
                                        disableDate(row.date) ||
                                        !edit
                                      }
                                      onChange={(date) => {
                                        const data =
                                          values.workerDailyData.filter(
                                            (newRow, index) => index === idx
                                          );

                                        var timeString;
                                        var combined;
                                        if (date) {
                                          timeString =
                                            date.getHours() +
                                            ":" +
                                            date.getMinutes() +
                                            ":00";
                                          combined = new Date(
                                            row.date + " " + timeString
                                          );
                                        }
                                        data[0].start_lunch =
                                          date &&
                                          format(
                                            new Date(combined),
                                            "yyyy-MM-dd HH:mm"
                                          );
                                        data[0].reg =
                                          regCalculation(
                                            data[0].time_in,
                                            data[0].time_out,
                                            data[0].start_lunch,
                                            data[0].end_lunch
                                          ) || 0;
                                        if (
                                          userManagerData &&
                                          userManagerData.overtime_exempt === 1
                                        )
                                          data[0].ot =
                                            data[0].reg > 8
                                              ? otCalculation(data[0].reg)
                                              : 0.0;
                                        if (
                                          userManagerData &&
                                          userManagerData.overtime_exempt === 1
                                        )
                                          data[0].dt =
                                            data[0].ot > 4
                                              ? dtCalculation(data[0].ot)
                                              : 0.0;
                                        if (
                                          data[0].ot > 0 &&
                                          data[0].ot < 4 &&
                                          userManagerData &&
                                          userManagerData.overtime_exempt === 1
                                        ) {
                                          data[0].reg = 8.0;
                                        } else if (
                                          data[0].ot >= 4 &&
                                          userManagerData &&
                                          userManagerData.overtime_exempt === 1
                                        ) {
                                          data[0].reg = 8.0;
                                          data[0].ot = 4.0;
                                        }
                                        data[0].total = totalOverAllRow(
                                          data[0]
                                        );
                                        replace(idx, data[0]);
                                        totalREG(values.workerDailyData);
                                      }}
                                      showTimeSelect
                                      showTimeSelectOnly
                                      minTime={
                                        row.time_in &&
                                        addHours(new Date(row.time_in), 0)
                                      }
                                      maxTime={
                                        row.time_in &&
                                        addHours(new Date(row.time_in), 18)
                                      }
                                      timeIntervals={15}
                                      timeCaption="Time"
                                      placeholderText="Start Lunch"
                                      dateFormat="h:mm aa"
                                    />
                                  </td>
                                  <td>
                                    <DatePicker
                                      name="end_lunch"
                                      id="end_lunch"
                                      selected={
                                        row.end_lunch && new Date(row.end_lunch)
                                      }
                                      isClearable={
                                        edit && row.submission_status !== 4
                                      }
                                      autoComplete="off"
                                      disabled={
                                        row.timesheet_status === 1 ||
                                        row.timesheet_status === 3 ||
                                        disableDate(row.date) ||
                                        !edit
                                      }
                                      onChange={(date) => {
                                        const data =
                                          values.workerDailyData.filter(
                                            (newRow, index) => index === idx
                                          );

                                        var timeString;
                                        var combined;
                                        if (date) {
                                          timeString =
                                            date.getHours() +
                                            ":" +
                                            date.getMinutes() +
                                            ":00";
                                          combined = new Date(
                                            row.date + " " + timeString
                                          );
                                        }
                                        data[0].end_lunch =
                                          date &&
                                          format(
                                            new Date(combined),
                                            "yyyy-MM-dd HH:mm"
                                          );
                                        data[0].reg =
                                          regCalculation(
                                            data[0].time_in,
                                            data[0].time_out,
                                            data[0].start_lunch,
                                            data[0].end_lunch
                                          ) || 0;
                                        if (
                                          userManagerData &&
                                          userManagerData.overtime_exempt === 1
                                        )
                                          data[0].ot =
                                            data[0].reg > 8
                                              ? otCalculation(data[0].reg)
                                              : 0.0;
                                        if (
                                          userManagerData &&
                                          userManagerData.overtime_exempt === 1
                                        )
                                          data[0].dt =
                                            data[0].ot > 4
                                              ? dtCalculation(data[0].ot)
                                              : 0.0;
                                        if (
                                          data[0].ot > 0 &&
                                          data[0].ot < 4 &&
                                          userManagerData &&
                                          userManagerData.overtime_exempt === 1
                                        ) {
                                          data[0].reg = 8.0;
                                        } else if (
                                          data[0].ot >= 4 &&
                                          userManagerData &&
                                          userManagerData.overtime_exempt === 1
                                        ) {
                                          data[0].reg = 8.0;
                                          data[0].ot = 4.0;
                                        }
                                        data[0].total = totalOverAllRow(
                                          data[0]
                                        );
                                        replace(idx, data[0]);
                                        totalREG(values.workerDailyData);
                                      }}
                                      showTimeSelect
                                      showTimeSelectOnly
                                      minTime={
                                        row.time_in &&
                                        addHours(new Date(row.time_in), 0)
                                      }
                                      maxTime={
                                        row.time_in &&
                                        addHours(new Date(row.time_in), 18)
                                      }
                                      timeIntervals={15}
                                      timeCaption="Time"
                                      placeholderText="End Lunch"
                                      dateFormat="h:mm aa"
                                    />
                                  </td>
                                  <td>{parseFloat(row.reg)}</td>
                                  {userManagerData &&
                                    userManagerData.overtime_exempt === 1 && (
                                      <td>{parseFloat(row.ot)}</td>
                                    )}
                                  {userManagerData &&
                                    userManagerData.overtime_exempt === 1 && (
                                      <td>{parseFloat(row.dt)}</td>
                                    )}
                                  <td>{parseFloat(row.total)}</td>
                                  <td>
                                    <FormControl
                                      className="align-middle"
                                      as="textarea"
                                      rows={3}
                                      type="text"
                                      maxLength="150"
                                      placeholder="Comment"
                                      name="description"
                                      id="description"
                                      defaultValue={row.description || ""}
                                      disabled={
                                        row.timesheet_status === 1 ||
                                        row.timesheet_status === 3 ||
                                        disableDate(row.date) ||
                                        !edit
                                      }
                                      onChange={(event) => {
                                        const targets = event.target.value;

                                        const data =
                                          values.workerDailyData.filter(
                                            (newRow, index) => index === idx
                                          );
                                        data[0].description = targets;
                                      }}
                                    />
                                  </td>
                                </tr>
                              ))}
                            {values.workerDailyData.length > 0 &&
                              values.workerDailyData && (
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td className="font-weight-bold">Total:</td>
                                  <td className="font-weight-bold">
                                    {totalREG(values.workerDailyData)}
                                  </td>
                                  {userManagerData &&
                                    userManagerData.overtime_exempt === 1 && (
                                      <td className="font-weight-bold">
                                        {totalOT(values.workerDailyData)}
                                      </td>
                                    )}
                                  {userManagerData &&
                                    userManagerData.overtime_exempt === 1 && (
                                      <td className="font-weight-bold">
                                        {totalDT(values.workerDailyData)}
                                      </td>
                                    )}
                                  <td className="font-weight-bold">
                                    {totalOverAll(values.workerDailyData)}
                                  </td>
                                  <td></td>
                                </tr>
                              )}
                          </>
                        )}
                      </tbody>
                    </Table>
                  )}
                </FieldArray>
                <Row className="ml-2">
                  <Col lg className="text-white">
                    <Row>
                      <Col lg={2} className="h4">
                        <span> &nbsp;Legends: </span>
                      </Col>
                      <Col lg={2}>
                        <BsFillHandThumbsUpFill
                          size="20px"
                          fill="green"
                          className="accordion-toggle"
                        />{" "}
                        : Approved
                      </Col>
                      <Col lg={2}>
                        <BsHandThumbsDownFill
                          size="20px"
                          fill="red"
                          className="accordion-toggle"
                        />{" "}
                        : Rejected
                      </Col>
                      {/* <Col lg={2}>
                        <Icon.CashStack size="20px" fill="#FFD700" /> : Billed
                      </Col> */}
                      {/* <Col lg={2}>
                        <Icon.Check2Square size="20px" fill="#00000" /> :
                        Submitted
                      </Col> */}
                    </Row>
                    <Row>
                      <Col lg={2} />
                      <Col lg={2}>
                        <Icon.BookmarkFill size="20px" fill="#000000" /> : Saved
                      </Col>
                      <Col lg={3}>
                        <Icon.ClockFill size="20px" fill="#000000" /> :
                        Submitted For Approval
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={4}>
                    <Button
                      className="btn btn-warning font-weight-bold btn-lg px-3 mr-2 mb-3 search-input-icon"
                      variant="warning"
                      type="submit"
                      disabled={
                        tableLoading ||
                        userData.submission_status === 4 ||
                        !edit
                      }
                    >
                      Save Timecard
                    </Button>
                    {workerDailyData.map((row) => {
                      if (row.save_status === 1) {
                        setButtonEnable(1);
                      }
                    })}
                    {buttonEnable !== 1 ? (
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="tooltip-disabled">
                            {userData.submission_status !== 4 &&
                            !submitToManager
                              ? "Save Timecard first"
                              : ""}
                          </Tooltip>
                        }
                      >
                        <span className="d-inline-block">
                          <Button
                            className="btn btn-primary btn-lg px-3 ml-2 mr-2 mb-3 search-input-icon"
                            variant="primary"
                            type="button"
                            disabled={
                              tableLoading ||
                              userData.submission_status === 4 ||
                              !submitToManager
                            }
                            onClick={handleSubmitToManager}
                          >
                            Submit to Manager
                          </Button>
                        </span>
                      </OverlayTrigger>
                    ) : (
                      <span className="d-inline-block">
                        <Button
                          className="btn btn-primary btn-lg px-3 ml-2 mr-2 mb-3 search-input-icon"
                          variant="primary"
                          type="button"
                          disabled={
                            tableLoading || userData.submission_status === 4
                          }
                          onClick={handleSubmitToManager}
                        >
                          Submit to Manager
                        </Button>
                      </span>
                    )}
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default WorkerScreen;
