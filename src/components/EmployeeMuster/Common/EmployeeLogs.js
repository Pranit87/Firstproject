import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Col, Form, Table } from "react-bootstrap";
import "./EmployeeLogs.css";
import { getWorkerWeeklyDetails } from "../../../Services/timesheetServices";
import ReactPaginate from "react-paginate";
import DeleteTimesheetDialog from "./DeleteTimesheet";
import { BsHandThumbsDownFill, BsFillHandThumbsUpFill } from "react-icons/bs";

const EmployeeLogs = ({ id }) => {
  const userID = id;
  const history = useHistory();
  const [tableLoading, setTableLoading] = React.useState(false);
  const [workerWeeklyDetails, setWorkerWeeklyDetails] = useState([]);
  const [workerManagerDetails, setWorkerManagerDetails] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const params = {};
  const [TimesheetDialog, setTimesheetDialog] = useState(false);
  const [TimesheetId, setTimesheetId] = useState(0);

  useEffect(() => {
    if (userID)
      getWorkerWeeklyDetails(
        setWorkerManagerDetails,
        setWorkerWeeklyDetails,
        setTableLoading,
        params,
        page,
        setTotalPage,
        userID
      );
  }, [userID, page]);

  const totalOverAllRow = (row) => {
    let total = 0.0;
    total =
      parseFloat(row.ot ? row.ot : 0.0) + parseFloat(row.dbl ? row.dbl : 0.0);
    return parseFloat(Math.round((total + Number.EPSILON) * 100) / 100);
  };

  let pageClickHandler;

  const handlePageClick = (data) => {
    clearTimeout(pageClickHandler);
    pageClickHandler = setTimeout(() => {
      setPage(parseInt(data.selected) + 1);
    }, 300);
  };

  const goToDailySheet = (row) => {
    if (row)
      history.push({
        pathname: "/worker",
        state: { weekly: row, manager: workerManagerDetails, edit: false },
      });
  };

  return (
    <>
      <DeleteTimesheetDialog
        TimesheetDialog={TimesheetDialog}
        setTimesheetDialog={setTimesheetDialog}
        id={id}
        timesheet_id={TimesheetId}
        page="details"
      />
      <Form.Group className="inner bg-white pb-2 mx-4 rounded shadow font">
        <div className="pb-5 pt-3 px-3">
          <Table className="table table-hover">
            <thead className="table-head-bg-color">
              <tr className="text-black" width="990">
                <th className="py-2">From</th>
                <th className="py-2">To</th>
                <th className="py-2">Working Hours</th>
                <th className="py-2">Extra Hours</th>
                <th className="py-2">Approver</th>
                <th className="py-2">Approver Email</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {tableLoading ? (
                <tr className="text-center">
                  <td colspan="11">
                    <div class="spinner-border text-dark" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : workerWeeklyDetails.length ? (
                workerWeeklyDetails.map((row) => (
                  <tr className="">
                    <td className="py-2">{row.week_starting}</td>
                    <td className="py-2">{row.week_ending}</td>
                    <td className="py-2">{row.total}</td>
                    <td className="py-2">
                      {(workerManagerDetails.overtime_exempt === 2 &&
                        totalOverAllRow(row)) ||
                        0.0}
                    </td>
                    <td className="py-2">{row.approver}</td>
                    <td className="py-2">
                      {row.approver_email ? row.approver_email : "NA"}
                    </td>
                    <td className="py-2">
                      <Col className="d-lg-flex">
                        <span className={"showOnHover"}>
                          <span
                            className="font font-weight-bold"
                            data-toggle="modal"
                            data-target="#addRemark"
                          >
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip id="button-tooltip-2">View</Tooltip>
                              }
                            >
                              <Icon.EyeFill
                                size="16px"
                                fill="#666666"
                                onClick={() => goToDailySheet(row)}
                              />
                            </OverlayTrigger>
                          </span>
                        </span>
                        {row.timesheet_status == 1 ? (
                          <span className={"showOnHover"}>
                            <span
                              className="font font-weight-bold"
                              data-toggle="modal"
                              data-target="#timesheetDelete"
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
                        ) : null}
                        {row.timesheet_status == 2 ? (
                          <span className={"showOnHover"}>
                            <span
                              className="font font-weight-bold"
                              data-toggle="modal"
                              data-target="#timesheetDelete"
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
                        ) : null}
                        {row.timesheet_status == 3 ? (
                          <span className={"showOnHover"}>
                            <span
                              className="font font-weight-bold"
                              data-toggle="modal"
                              data-target="#timesheetDelete"
                            >
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    Delete
                                  </Tooltip>
                                }
                              >
                                <Icon.TrashFill
                                  size="16px"
                                  fill="#666666"
                                  onClick={() => {
                                    setTimesheetDialog(true);
                                    setTimesheetId(row.timesheet_id);
                                  }}
                                />
                              </OverlayTrigger>
                            </span>
                          </span>
                        ) : null}
                      </Col>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="py-4 text-center h6 font-weight-bold">
                  <td colspan="11">No records available.</td>
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
        </div>
      </Form.Group>
    </>
  );
};

export default EmployeeLogs;
