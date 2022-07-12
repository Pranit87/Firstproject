import React, { useState, useEffect } from "react";
import { Col, Form, FormControl, Row, Table, Spinner } from "react-bootstrap";
import { getAllClients } from "../../Services/jobsService";
import "./Stats.css";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import EmpHiddenRow from "./Common/EmpHiddenRow";
import {
  getEmployees,
  getExportEmployeeList,
} from "../../Services/employeeServices";
import { Formik } from "formik";
import { getDropDownOptions } from "../../Services/dropdownServices";
import ReactPaginate from "react-paginate";
import { Medoptions, EMP, EMP_Type, PayRate, HRapprove } from "../../constants";
import DeleteEmployeeDialog from "./Common/DeleteEmployee";
import { Notification } from "../Common/Notification/Notification";

const Stats = () => {
  const employeeFilterInitialValues = {
    first_name: "",
    last_name: "",
    comments: "",
    client_id: "",
    medical: "",
    employee_status: "",
    employee_type: "",
    pay_rate_type: "",
    approval_status: "",
    work_state: "",
  };

  const [checkAll, setCheckAll] = useState(false);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [allEmployeeDetails, setAllEmployeeDetails] = useState([]);
  const [filtersValue, setFiltersValue] = useState(employeeFilterInitialValues);
  const [submitting, setSubmitting] = useState(false);
  const [options, setOptions] = useState(null);
  const [expandableId, setExpandableId] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [empId, setEmpId] = useState("");
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [tabelLoading, setTabelLoading] = useState(false);
  const [multipleList, setMultipleList] = React.useState([]);
  const [initialMultipleList, setInitialMultipleList] = React.useState([]);
  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });

  let pageClickHandler;

  const handlePageClick = (data) => {
    clearTimeout(pageClickHandler);
    pageClickHandler = setTimeout(() => {
      setPage(parseInt(data.selected) + 1);
    }, 300);
  };

  //Dropdown for Comment Type ------------------------------
  useEffect(() => {
    getAllClients(setClients);
    getDropDownOptions(setOptions, setLoading);
  }, []);

  useEffect(() => {
    getEmployees(
      filtersValue,
      setAllEmployeeDetails,
      setTableLoading,
      setSubmitting,
      page,
      setTotalPage,
      setInitialMultipleList
    );
  }, [filtersValue, page, tabelLoading]);

  const multipleSeleted = (ids) => {
    let result = [];
    ids.split(",").map((row) => {
      var preResult = clients.filter(({ id }) => id === parseInt(row) || "");
      return result.push(preResult[0]);
    });
    return result;
  };

  const handleViewMultiple = () => {
    if (multipleList.length > 0) {
      multipleList.map((row) => {
        return window.open(`/empdetails/${row}`, "_blank");
      });
    }
  };
  const handleUpdateMultiple = () => {
    if (multipleList.length > 0) {
      multipleList.map((row) => {
        return window.open(`/empform/${row}`, "_blank");
      });
    }
  };

  return (
    <>
      <DeleteEmployeeDialog
        confirmationDialog={confirmationDialog}
        setConfirmationDialog={setConfirmationDialog}
        id={empId}
        page="stats"
        setTabelLoading={setTabelLoading}
        tabelLoading={tabelLoading}
      />

      <Formik
        initialValues={employeeFilterInitialValues}
        enableReinitialize={true}
        onSubmit={(values) => {
          setPage(1);
          setFiltersValue(values);
        }}
      >
        {(props) => {
          const { values, handleSubmit, handleChange, handleReset } = props;
          return (
            <Form onSubmit={handleSubmit}>
              {/* FIRST FORM ROW */}
              <Form.Row className={"formRow"}>
                <Form.Group className="inner bg-white my-4 px-4 py-4 mx-4 rounded shadow font">
                  {notify.show && <Notification {...notify} />}
                  {loading ? (
                    <Row className="text-center">
                      <Col>
                        <Spinner
                          className="spinner-border text-dark"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      </Col>
                    </Row>
                  ) : (
                    <>
                      <span className={"common-search"}>EMPLOYEE MUSTER</span>

                      <Row className="my-4">
                        <Col sm={3}>
                          <FormControl
                            type="text"
                            id="first_name"
                            name="first_name"
                            placeholder="First Name"
                            value={values.first_name}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col sm={3}>
                          <FormControl
                            type="text"
                            placeholder="Last Name"
                            id="last_name"
                            name="last_name"
                            value={values.last_name}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col sm={3}>
                          <Typeahead
                            id="basic-typeahead-multiple"
                            multiple
                            name="client_id"
                            options={clients}
                            placeholder="All Clients"
                            selected={
                              (values.client_id &&
                                multipleSeleted(values.client_id)) ||
                              []
                            }
                            labelKey={(option) => `${option.value}`}
                            onChange={(event) => {
                              if (event.length > 0) {
                                let ids = [];
                                event.map((row) => ids.push(row.id));
                                props.setFieldValue("client_id", ids.join(","));
                              }
                            }}
                          />
                        </Col>
                        <Col sm={3}>
                          <Typeahead
                            id="basic-typeahead"
                            name="comments"
                            options={Medoptions}
                            placeholder="Comments"
                            selected={
                              Medoptions &&
                              Medoptions.filter(
                                ({ value }) => value === values.comments || ""
                              )
                            }
                            onChange={(event) => {
                              if (event.length > 0) {
                                const targets = event[0];
                                props.setFieldValue("comments", targets.value);
                              }
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="my-4">
                        <Col sm={3}>
                          <Typeahead
                            id="basic-typeahead"
                            options={options && options["states"]}
                            labelKey={(option) => `${option.value}`}
                            placeholder="State"
                            name="work_state"
                            selected={
                              options &&
                              options["states"] &&
                              options["states"].filter(
                                ({ stateCode }) =>
                                  stateCode === values.work_state || ""
                              )
                            }
                            onChange={(event) => {
                              const targets =
                                (event.length > 0 && event[0]) || [];
                              props.setFieldValue(
                                "work_state",
                                targets.stateCode
                              );
                            }}
                          />
                        </Col>
                        <Col sm={3}>
                          <Typeahead
                            id="basic-typeahead"
                            options={Medoptions}
                            placeholder="Medical"
                            name="medical"
                            selected={
                              Medoptions &&
                              Medoptions.filter(
                                ({ value }) => value === values.medical || ""
                              )
                            }
                            onChange={(event) => {
                              const targets =
                                (event.length > 0 && event[0]) || [];
                              props.setFieldValue("medical", targets.value);
                            }}
                          />
                        </Col>
                        <Col sm={3}>
                          <Typeahead
                            id="basic-typeahead"
                            placeholder="All EMP Status"
                            name="employee_status"
                            options={EMP}
                            selected={
                              EMP &&
                              EMP.filter(
                                ({ value }) =>
                                  value === values.employee_status || ""
                              )
                            }
                            onChange={(event) => {
                              const targets =
                                (event.length > 0 && event[0]) || [];
                              props.setFieldValue(
                                "employee_status",
                                targets.value
                              );
                            }}
                          />
                        </Col>
                        <Col sm={3}>
                          <Typeahead
                            id="basic-typeahead"
                            placeholder="ALL EMP Type"
                            name="employee_type"
                            options={EMP_Type}
                            selected={
                              EMP_Type &&
                              EMP_Type.filter(
                                ({ value }) =>
                                  value === values.employee_type || ""
                              )
                            }
                            onChange={(event) => {
                              const targets =
                                (event.length > 0 && event[0]) || [];
                              props.setFieldValue(
                                "employee_type",
                                targets.value
                              );
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="my-4">
                        <Col sm={3}>
                          <Typeahead
                            id="basic-typeahead"
                            placeholder="All Pay Rate Type"
                            name="pay_rate_type"
                            options={PayRate}
                            selected={
                              PayRate &&
                              PayRate.filter(
                                ({ value }) =>
                                  value === values.pay_rate_type || ""
                              )
                            }
                            onChange={(event) => {
                              const targets =
                                (event.length > 0 && event[0]) || [];
                              props.setFieldValue(
                                "pay_rate_type",
                                targets.value
                              );
                            }}
                          />
                        </Col>
                        <Col sm={3}>
                          <Typeahead
                            id="basic-typeahead"
                            placeholder="All HR Approval Status"
                            name="approval_status"
                            options={HRapprove}
                            selected={
                              HRapprove &&
                              HRapprove.filter(
                                ({ value }) =>
                                  value === values.approval_status || ""
                              )
                            }
                            onChange={(event) => {
                              const targets =
                                (event.length > 0 && event[0]) || [];
                              props.setFieldValue(
                                "approval_status",
                                targets.value
                              );
                            }}
                          />
                        </Col>
                        {/* BUTTONS */}
                        <Row className="col-sm-4 ml-3">
                          <Button
                            variant="primary"
                            type="submit"
                            disabled={submitting}
                          >
                            {!submitting ? "Search" : "Searching..."}
                          </Button>
                          <Button
                            className="ml-3"
                            variant="secondary"
                            type="button"
                            onClick={handleReset}
                          >
                            Reset
                          </Button>
                          <span className={"showOnHover"}>
                            <span className="font font-weight-bold">
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    View Multiple
                                  </Tooltip>
                                }
                              >
                                <Icon.EyeFill
                                  className="ml-4 mt-2"
                                  size="25px"
                                  fontSize="bold"
                                  fill="#666666"
                                  onClick={() => handleViewMultiple()}
                                />
                              </OverlayTrigger>
                            </span>
                          </span>
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
                                    Update Multiple
                                  </Tooltip>
                                }
                              >
                                <Icon.PencilFill
                                  className="ml-4 mt-2"
                                  size="25px"
                                  fontSize="bold"
                                  fill="#666666"
                                  onClick={() => handleUpdateMultiple()}
                                />
                              </OverlayTrigger>
                            </span>
                          </span>
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
                                    Download Report
                                  </Tooltip>
                                }
                              >
                                <Icon.Download
                                  className="ml-4 mt-2"
                                  size="25px"
                                  fontSize="bold"
                                  fill="#666666"
                                  onClick={() =>
                                    getExportEmployeeList(
                                      filtersValue,
                                      setLoading,
                                      setNotify
                                    )
                                  }
                                />
                              </OverlayTrigger>
                            </span>
                          </span>
                        </Row>
                      </Row>
                    </>
                  )}
                </Form.Group>
              </Form.Row>
            </Form>
          );
        }}
      </Formik>
      <div className="inner bg-white my-4 pb-3 mx-4 rounded shadow font">
        <Table className="table-hover d-table">
          <thead className="job-table-head-bg-color">
            <tr className="text-white" width="990">
              <th>
                <Form.Check
                  className="px-0 mt-1"
                  inline
                  onChange={(event) => {
                    setCheckAll(event.target.checked);
                    event.target.checked
                      ? setMultipleList(initialMultipleList)
                      : setMultipleList([]);
                  }}
                />
              </th>
              <th>Name</th>
              <th>Contact</th>
              <th>Client</th>
              <th>W/State</th>
              <th>PR</th>
              <th>BR</th>
              <th>Start to End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableLoading ? (
              <tr className="text-center">
                <td colspan="10">
                  <Spinner className="spinner-border text-dark" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </td>
              </tr>
            ) : allEmployeeDetails.length ? (
              allEmployeeDetails.map((row, idx) => (
                <>
                  <tr className="" key={idx}>
                    <td>
                      <Form.Check
                        className="px-0 mt-1"
                        inline
                        checked={checkAll || undefined}
                        onChange={(event) => {
                          event.target.checked
                            ? setMultipleList([...multipleList, row.id])
                            : setMultipleList(
                                multipleList.filter((value) => value !== row.id)
                              );
                        }}
                      />
                    </td>
                    <td>{row.resume_name}</td>
                    <td>{row.email}</td>
                    <td>{row.client_name}</td>
                    <td>{row.work_state}</td>
                    <td>{row.standard_time_pay_rate}</td>
                    <td>{row.standard_time_bill_rate}</td>
                    <td>
                      {row.start_date} to {row.end_date}
                    </td>
                    <td>
                      {/* <ActionButtons id={row.resume_name.split(" ")[0] + idx} /> */}
                      <>
                        <Col className="d-lg-flex">
                          <span className={"showOnHover"}>
                            <span
                              className="font font-weight-bold"
                              data-toggle="modal"
                              data-target="#addRemark"
                              onClick={() =>
                                setExpandableId(
                                  row.resume_name.split(" ")[0] + idx
                                )
                              }
                            >
                              <Link>
                                <OverlayTrigger
                                  placement="bottom"
                                  overlay={
                                    <Tooltip id="button-tooltip-2">
                                      Expand Details
                                    </Tooltip>
                                  }
                                >
                                  <Icon.CaretDownFill
                                    size="16px"
                                    fill="#666666"
                                    data-toggle="collapse"
                                    data-target={`#${
                                      row.resume_name.split(" ")[0] + idx
                                    }`}
                                    className="accordion-toggle"
                                  />
                                </OverlayTrigger>
                              </Link>
                            </span>
                          </span>
                          <span className={"showOnHover"}>
                            <span
                              className="font font-weight-bold"
                              data-toggle="modal"
                              data-target="#addRemark"
                            >
                              <Link to={`/empdetails/${row.id}`}>
                                <OverlayTrigger
                                  placement="bottom"
                                  overlay={
                                    <Tooltip id="button-tooltip-2">
                                      View Profile
                                    </Tooltip>
                                  }
                                >
                                  <Icon.EyeFill size="16px" fill="#666666" />
                                </OverlayTrigger>
                              </Link>
                            </span>
                          </span>
                          <span className={"showOnHover"}>
                            <span
                              className="font font-weight-bold"
                              data-toggle="modal"
                              data-target="#addRemark"
                            >
                              <Link to={`/empform/${row.id}`}>
                                <OverlayTrigger
                                  placement="bottom"
                                  overlay={
                                    <Tooltip id="button-tooltip-2">
                                      Edit
                                    </Tooltip>
                                  }
                                >
                                  <Icon.PencilFill size="16px" fill="#666666" />
                                </OverlayTrigger>
                              </Link>
                            </span>
                          </span>
                          <span className={"showOnHover"}>
                            <span
                              className="font font-weight-bold"
                              data-toggle="modal"
                              data-target="#addRemark"
                            >
                              <Link>
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
                                    fill="#D50A0A"
                                    onClick={() => {
                                      setEmpId(row.id);
                                      setConfirmationDialog(true);
                                    }}
                                  />
                                </OverlayTrigger>
                              </Link>
                            </span>
                          </span>
                        </Col>
                      </>
                    </td>
                  </tr>
                  <tr key={idx}>
                    <td className="hiddenRow" colSpan="9">
                      <Col
                        className="accordian-body collapse"
                        id={row.resume_name.split(" ")[0] + idx}
                      >
                        {expandableId ===
                        row.resume_name.split(" ")[0] + idx ? (
                          <EmpHiddenRow id={row.id} />
                        ) : null}
                      </Col>
                    </td>
                  </tr>
                </>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan="10">No Record's Available</td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className={`page pt-2 d-flex justify-content-end mr-4`}>
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
      <Col className="text-right" mr={5}>
        <Link to="/empform/add">
          <Button
            className="btn btn-warning btn-lg font-weight-bold px-3 mr-5 mb-3 mb-lg-0 search-input-icon text-right"
            variant="warning"
            type="button"
          >
            Add Employee
          </Button>
        </Link>
      </Col>
    </>
  );
};

export default Stats;
