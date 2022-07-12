import React from "react";
import "./DailyReport.styles.css";
import {
  getActivityReport,
  getActivityReportData,
} from "../../Services/dailyReportService";
import { Formik } from "formik";
import {
  Form,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { ActivityPeriod } from "../../constants";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const EmployeesActivityReport = () => {
  var date = new Date();

  var currentDate = new Date();

  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [initialFormData] = React.useState({
    startdDate: startDate,
    endDate: endDate,
  });
  const [activityReportData, setActivityReportData] = React.useState(null);
  const [period, setPeriod] = React.useState(0);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleDownload = () => {
    getActivityReport(setError, startDate, endDate);
  };

  const handleDateChange = (periodValue) => {
    if (periodValue === "1") {
      var todayStartDate = date.setDate(date.getDate());

      setStartDate(format(new Date(todayStartDate), "yyyy-MM-dd"));
    } else if (periodValue === "2") {
      date.setDate(date.getDate() - 1);

      setStartDate(format(new Date(date), "yyyy-MM-dd"));
    } else if (periodValue === "3") {
      date.setDate(date.getDate() - 7);

      setStartDate(format(new Date(date), "yyyy-MM-dd"));

      currentDate.setDate(currentDate.getDate());

      setEndDate(format(new Date(currentDate), "yyyy-MM-dd"));
    } else if (periodValue === "4") {
      date.setDate(date.getDate() - 14);

      setStartDate(format(new Date(date), "yyyy-MM-dd"));

      currentDate.setDate(currentDate.getDate() - 7);

      setEndDate(format(new Date(currentDate), "yyyy-MM-dd"));
    }
  };

  console.log(startDate, endDate);

  return (
    <div className="inner font mx-4 mt-3 py-3 my-3">
      <div>
        <text className="font fontTitle text-white">
          Employees Activity Report
        </text>
      </div>
      <Formik
        initialValues={initialFormData}
        enableReinitialize={true}
        onSubmit={() => {
          getActivityReportData(
            setLoading,
            setError,
            startDate,
            endDate,
            period,
            setActivityReportData
          );
        }}
      >
        {(props) => {
          const { handleSubmit } = props;
          return (
            <Form onSubmit={handleSubmit}>
              <div
                style={{ justifyContent: "space-between" }}
                className="d-lg-flex bg-white px-3 mx-0  py-4 my-3 text-black rounded row"
              >
                <div className="d-lg-flex col-lg row">
                  <select
                    className="form-control pt-2 mr-3 col-lg"
                    value={period || 0}
                    onChange={(e) => {
                      const targets = e.target.value;
                      setPeriod(targets);
                      handleDateChange(targets);
                    }}
                  >
                    {ActivityPeriod.map((row) => {
                      return <option value={row.value}>{row.label}</option>;
                    })}
                  </select>
                  <span className="col-lg">
                    <input
                      type="date"
                      className="form-control pt-2"
                      onChange={(event) => setStartDate(event.target.value)}
                      value={startDate}
                    />
                  </span>
                  <span className="mx-2 pt-2">To</span>
                  <span className="col-lg">
                    <input
                      type="date"
                      className="form-control pt-2"
                      onChange={(event) => setEndDate(event.target.value)}
                      value={endDate}
                    />
                  </span>
                </div>
                {/* className="btn btn-warning text-black px-5 mx-2 font-weight-bold" */}
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
                    class="text-white clearFilter"
                    className="btn btn-secondary btn-sm px-5 mx-2"
                    onClick={(event) => {
                      setStartDate("");
                      setEndDate("");
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              {error && (
                <div
                  className="py-4 text-center h6 font-weight-bold"
                  style={{ color: "red" }}
                >
                  <span>{error}</span>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>

      {(startDate || endDate) && (
        <div className="mt-4">
          <text className="font text-white">
            Showing Record from {startDate} {startDate && endDate ? "to" : ""}{" "}
            {endDate}
          </text>
          <Link onClick={() => handleDownload()}>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="button-tooltip-2">Download Report</Tooltip>}
            >
              <img
                src="/images/download-white.png"
                alt="download"
                className="img-fluid"
              />
            </OverlayTrigger>
          </Link>
        </div>
      )}
      <Container className="customContainer">
        <Row className="pb-3">
          <Col>
            <div className="pt-3 pb-3 bg-white rounded mr-3">
              <div className="pb-2 px-2 customTableNameFont">Resume Report</div>
              <table className="table table-hover">
                <thead className="table-head-bg-color">
                  <tr>
                    <th scope="col" className="py-2">
                      Activities of Resumes
                    </th>
                    <th scope="col" className="py-2">
                      Total Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr className="text-center">
                      <td colspan="10">
                        <div class="spinner-border text-dark" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      <tr>
                        <td className="py-2">{"Total Resume Created"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.totalActiveResumeCount) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          {"Total Resume Created By API"}
                        </td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.totalActiveResumeByAPI) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Total Direct Resume"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.totalActiveResumeWithoutAPI) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Total Remarks"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.totalActiveRemarkCount) ||
                            0}
                        </td>
                      </tr>
                    </>
                  )}
                  {error && (
                    <tr
                      className="py-4 text-center h6 font-weight-bold"
                      style={{ color: "red" }}
                    >
                      <td colspan="10">No records available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Col>
          <Col>
            <div className="pt-3 pb-3 bg-white rounded">
              <div className="pb-2 px-2 customTableNameFont">
                Offer Activity Report
              </div>
              <table className="table table-hover bg-white">
                <thead className="table-head-bg-color">
                  <tr>
                    <th scope="col" className="py-2">
                      Activities of Resumes
                    </th>
                    <th scope="col" className="py-2">
                      Total Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr className="text-center">
                      <td colspan="10">
                        <div class="spinner-border text-dark" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      <tr>
                        <td className="py-2">{"Offer Requested"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "offerRequested"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Offer Declined"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "offerDeclined"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Offer Cancelled"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "offerCancelled"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Offer Accepted"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "offerAccepted"
                            ]) ||
                            0}
                        </td>
                      </tr>
                    </>
                  )}
                  {error && (
                    <tr
                      className="py-4 text-center h6 font-weight-bold"
                      style={{ color: "red" }}
                    >
                      <td colspan="10">No records available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="colMaxHeight">
            <div className="pt-3 pb-3 bg-white rounded mr-3 divOverflow">
              <div className="pb-2 px-2 customTableNameFont">
                Interview Activity Report
              </div>
              <table className="table table-hover bg-white table-fixed">
                <thead className="table-head-bg-color">
                  <tr>
                    <th scope="col" className="py-2">
                      Activities of Resumes
                    </th>
                    <th scope="col" className="py-2">
                      Total Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr className="text-center">
                      <td colspan="10">
                        <div class="spinner-border text-dark" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      <tr>
                        <td className="py-2">{"Interview Requested"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "interviewRequestedScheduled"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Interview Accepted"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "interviewAcceptedScheduled"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Phone Interview Requested"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "phoneInterviewRequested"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Phone Interview Accepted"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "phoneInterviewAccepted"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          {"Video Conference Interview Requested"}
                        </td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "videoConferenceInterviewRequested"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          {"Video Conference Interview Accepted"}
                        </td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "videoConferenceInterviewAccepted"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Onsite Interview Requested"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "onsiteInterviewRequested"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Onsite Interview Accepted"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "onsiteInterviewAccepted"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          {"Second Round Interview Requested"}
                        </td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "secondRoundInterviewRequested"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          {"Second Round Interview Accepted"}
                        </td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "secondRoundInterviewAccepted"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Interview Completed"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "interviewCompleted"
                            ]) ||
                            0}
                        </td>
                      </tr>
                    </>
                  )}
                  {error && (
                    <tr
                      className="py-4 text-center h6 font-weight-bold"
                      style={{ color: "red" }}
                    >
                      <td colspan="10">No records available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Col>
          <Col className="colMaxHeight">
            <div className="pt-3 pb-3 bg-white rounded divOverflow">
              <div className="pb-2 px-2 customTableNameFont">
                Activity Report
              </div>
              <table className="table table-hover bg-white table-fixed">
                <thead className="table-head-bg-color">
                  <tr>
                    <th scope="col" className="py-2">
                      Activities of Resumes
                    </th>
                    <th scope="col" className="py-2">
                      Total Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr className="text-center">
                      <td colspan="10">
                        <div class="spinner-border text-dark" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      <tr>
                        <td className="py-2">{"Sourced"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity["sourced"]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Submitted"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity["submitted"]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Interview Scheduled"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "interviewedScheduled"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Started"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity["started"]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Rejected"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "rejectedFromRequirement"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Hold"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity["holdFrom"]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Closed"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity["closed"]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Approved"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity["approved"]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Pipelined"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity["pipelined"]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Withdrawn"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "withdrawnFromRequirement"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Rejected by MSP"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "rejectedByMSP"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Rejected by Manager"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "rejectedByManager"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Interview Declined"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "interviewDeclinedScheduled"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Interview Rescheduled"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "interviewRescheduledScheduled"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Onboarding Initiated"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "onboardingInitiated"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Onboarding completed"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "onboardingCompleted"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Onboarding terminated"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "onboardingTerminated"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Current Employee"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "currentEmployee"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Backed Out"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity["backedOut"]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          {"Interview Cancelled by Client"}
                        </td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "interviewCancelled"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          {"Interview Declined by Resource"}
                        </td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "interviewDeclinedByResource"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">{"Rejected After Interview"}</td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "rejectedAfterInterview"
                            ]) ||
                            0}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          {"End Of Contact / Project Ended"}
                        </td>
                        <td className="py-2">
                          {(activityReportData &&
                            activityReportData.sumOfActivity[
                              "endOfContract"
                            ]) ||
                            0}
                        </td>
                      </tr>
                    </>
                  )}
                  {error && (
                    <tr
                      className="py-4 text-center h6 font-weight-bold"
                      style={{ color: "red" }}
                    >
                      <td colspan="10">No records available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EmployeesActivityReport;
