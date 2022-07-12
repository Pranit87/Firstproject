import React, { useState, useEffect } from "react";
import {
  Form,
  Table,
  Col,
  Row,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { BsHandThumbsDownFill, BsFillHandThumbsUpFill } from "react-icons/bs";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "./TimeCard.styles.css";
import { useHistory } from "react-router-dom";
import { getWorkerWeeklyDetails } from "../../Services/timesheetServices";
import { TimesheetStatus } from "../../constants";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import ResetCred from "../Login/ResetCred";

const TimeCard = (props) => {
  const { userId } = useParams();
  const { id } =
    localStorage.getItem("profile") &&
    JSON.parse(localStorage.getItem("profile"));
  const fetchId = userId ? userId : id;

  const history = useHistory();
  const [tableLoading, setTableLoading] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [workerWeeklyDetails, setWorkerWeeklyDetails] = useState([]);
  const [workerManagerDetails, setWorkerManagerDetails] = useState([]);
  const [status, setStatus] = useState(null);
  const [weekendDate, setWeekendDate] = useState(null);
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [initialLogin, setInitialLogin] = useState(false);
  const [showResetPassword, setShowResetPassword] = React.useState(false);
  const [showStateClone, setShowStateClone] = React.useState(false);
  const profile = localStorage.getItem("profile");

  useEffect(() => {
    if (fetchId)
      getWorkerWeeklyDetails(
        setWorkerManagerDetails,
        setWorkerWeeklyDetails,
        setTableLoading,
        params,
        page,
        setTotalPage,
        fetchId
      );
  }, [params, page, fetchId, refreshList]);

  useEffect(() => {
    if (initialLogin) {
      setShowStateClone(true);
      setShowResetPassword(true);
    }
  }, [initialLogin]);

  useEffect(() => {
    setInitialLogin(JSON.parse(profile)["login_status"] === 1 ? true : false);
  }, [profile]);

  function convertTZ(date, tzString) {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  }

  const goToDailySheet = (row) => {
    if (row)
      history.push({
        pathname: "/worker",
        state: { weekly: row, manager: workerManagerDetails, edit: true },
      });
  };
  const handleSubmit = () => {
    setParams({
      weekend: weekendDate && format(new Date(weekendDate), "yyyy-MM-dd"),
      status: status,
    });
  };

  let pageClickHandler;

  const handlePageClick = (data) => {
    clearTimeout(pageClickHandler);
    pageClickHandler = setTimeout(() => {
      setPage(parseInt(data.selected) + 1);
    }, 300);
  };

  return (
    <>
      {showStateClone && (
        <ResetCred
          showState={showResetPassword}
          setShowState={setShowResetPassword}
        />
      )}
      <Col
        className="p-4"
        style={{
          minHeight: "600px",
        }}
      >
        <Form.Group className="mx-4 my-4">
          <div className="timecard-table-head-bg-color-1" width="990">
            <div class="row no-gutters">
              <div className="col-3 my-2">
                <div class="col-4">Status</div>
                <div class="col-8">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isSearchable={false}
                    isClearable={true}
                    name="interview_type"
                    onChange={(e) => {
                      setStatus(e && e.value);
                    }}
                    value={TimesheetStatus.filter(
                      ({ value }) => value === status
                    )}
                    options={TimesheetStatus}
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                  />
                </div>
              </div>
              <div className="col-3 my-2">
                <div class="col-4">Weekend</div>
                <div class="col-8">
                  <DatePicker
                    dateFormat="MM/dd/yyyy"
                    isClearable
                    selected={weekendDate}
                    placeholderText="MM/DD/YYYY"
                    onChange={(date) => setWeekendDate(date)}
                  />
                </div>
              </div>
              <div className="col-2 my-2 align-self-center">
                <Button
                  className="my-1"
                  variant="primary"
                  onClick={() => handleSubmit()}
                >
                  Find
                </Button>
              </div>
            </div>
          </div>
        </Form.Group>
        <Form.Group className="inner bg-white my-4 pb-3 mx-4 rounded shadow font">
          <Table className="table-hover d-table">
            <thead className="job-table-head-bg-color">
              <tr className="text-white" width="990">
                <th>Status</th>
                <th>View</th>
                <th>Name</th>
                <th>Total</th>
                <th>Regular</th>
                {workerManagerDetails.overtime_exempt === 1 && (
                  <th>Over-Time</th>
                )}
                {workerManagerDetails.overtime_exempt === 1 && (
                  <th>Double-Time</th>
                )}
                <th>Report To</th>
                <th>Job ID</th>
                <th>Week Ending</th>
              </tr>
            </thead>

            <tbody>
              {tableLoading ? (
                <tr className="text-center">
                  <td colspan="10">
                    <div class="spinner-border text-dark" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : workerWeeklyDetails.length > 0 ? (
                workerWeeklyDetails.map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <Col style={{ display: "flex" }}>
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
                                <Icon.Check2Square size="20px" fill="#00000" />
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
                                <Icon.ClockFill size="20px" fill="#000000" />
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
                                <Icon.CashStack size="20px" fill="#FFD700" />
                              </OverlayTrigger>
                            </span>
                          </span>
                        )} */}
                      </Col>
                    </td>
                    <td>
                      <Icon.Table
                        size="20px"
                        fill="#007bff"
                        className="accordion-toggle"
                        onClick={() => goToDailySheet(row)}
                      />
                    </td>
                    <td>{row.worker_name}</td>
                    <td>{row.total}</td>
                    <td>{row.reg}</td>
                    {workerManagerDetails.overtime_exempt === 1 && (
                      <td>{row.ot}</td>
                    )}
                    {workerManagerDetails.overtime_exempt === 1 && (
                      <td>{row.dbl}</td>
                    )}
                    <td>{row.approver}</td>
                    <td>{row.job_id}</td>
                    <td>
                      {/* {row.week_ending}{" "} */}
                      {format(
                        convertTZ(row.week_ending, "Asia/Jakarta"),
                        "MM/dd/yyyy"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center">
                    {"No Record's Available"}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <div
            className={`pt-2 d-flex justify-content-end mr-4 ${
              tableLoading && "invisible"
            }`}
          >
            {totalPage > 1 && (
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"activePagination"}
              />
            )}
          </div>
        </Form.Group>
        <Row className="my-4 mx-4">
          <Col lg={2} className="mr-2">
            <Button
              className="text-left btn btn-warning btn-lg font-weight-bold px-3 mb-3 search-input-icon"
              variant="warning"
              type="button"
              onClick={() => setRefreshList(!refreshList)}
            >
              Refresh List
            </Button>
          </Col>
          <Col lg className="text-white mr-1">
            <Row>
              <Col lg={2} className="h4">
                <span>Legends:</span>
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
              {/* <Col lg="2">
                <Icon.CashStack size="20px" fill="#FFD700" /> : Billed
              </Col> */}
              {/* <Col>
                <Icon.Check2Square size="20px" fill="#00000" /> : Submitted
              </Col> */}
              <Col lg={3}>
                <Icon.ClockFill size="20px" fill="#000000" /> : Submitted For
                Approval
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default TimeCard;
