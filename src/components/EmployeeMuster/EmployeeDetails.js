import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Col, Form, Row } from "react-bootstrap";
import EmployeeLogs from "./Common/EmployeeLogs";
import Tax from "./Common/Tax";
import HRAprroval from "./Common/HRAprroval";
import VCare from "./Common/VCare";
import CGS from "./Common/CGS";
import "./EmployeeDetails.css";
import {
  getEmployeeDetails,
  getEmployeeHRApproval,
} from "../../Services/employeeServices";
import { useParams } from "react-router-dom";
import {
  EmployeeStatus,
  EmployeeType,
  PayFrequency,
  GenderValue,
} from "./Common/commonFilters";

import EOCDialog from "./Common/markNReverseEoc";
import DeleteEmployeeDialog from "./Common/DeleteEmployee";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [empdata, setEmpData] = useState(null);
  const [hrApprovalData, setHrApprovalData] = useState(null);
  const [hrApprovalLoading, setHrApprovalLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hrApprovalRefreshLoading, setHrApprovalRefreshLoading] =
    useState(false);
  const [detailsRefreshLoading, setDetailsRefreshLoading] = useState(false);

  const [showEOCDialog, setShowEOCDialog] = React.useState(false);
  const [eocStatus, setEocStatus] = useState("");
  const [confirmationDialog, setConfirmationDialog] = useState(false);

  useEffect(() => {
    getEmployeeDetails(id, setEmpData, setLoading);
  }, [id, detailsRefreshLoading]);

  useEffect(() => {
    getEmployeeHRApproval(id, setHrApprovalData, setHrApprovalLoading);
  }, [id, hrApprovalRefreshLoading]);

  return (
    <>
      <DeleteEmployeeDialog
        confirmationDialog={confirmationDialog}
        setConfirmationDialog={setConfirmationDialog}
        id={id}
        page="details"
      />
      <EOCDialog
        show={showEOCDialog}
        setShowEOCDialog={setShowEOCDialog}
        status={eocStatus}
        id={id}
        setLoading={setDetailsRefreshLoading}
        loading={detailsRefreshLoading}
      />
      <Form className="inner font py-4 mx-4 text-center text-white h4">
        <Row>
          <Col lg className="text-uppercase">
            {empdata && empdata.resumes.name}
          </Col>
          <Col lg className="text-uppercase">
            {empdata && empdata.requirement.job_title}
          </Col>
          <Col lg className="text-uppercase">
            {empdata && empdata.requirement.id}
          </Col>
        </Row>
      </Form>

      <Form className="inner bg-white pt-4 pb-2 mx-4 my-4 rounded shadow font">
        {loading ? (
          <div className="inner bg-white pt-4 pb-2 mx-4 rounded shadow font">
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
            <div class="ph-item">
              <div class="ph-col-12">
                <div className="ph-picture"></div>
                <div className="ph-picture"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Row className="description-font pl-lg-5">
              <Col lg className="text-center text-lg-left">
                <span className="description-color">Name: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.resumes.name}
                  {empdata && empdata.status === 3 ? (
                    <Button
                      className="btn btn-warning btn-sm px-2 py-0 mr-2 text-light rounded-pill"
                      type="button"
                    >
                      EOC
                    </Button>
                  ) : null}
                </span>
              </Col>

              <Col lg className="text-center text-lg-left">
                <span className="description-color ">Email: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.resumes.email}
                </span>
              </Col>
              <Col lg className="text-center text-lg-left">
                <span className="description-color ">Mobile: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.resumes.mobile}
                </span>
              </Col>
            </Row>
            <Row className="description-font py-2 pl-lg-5">
              <Col lg className="text-center text-lg-left">
                <span className="description-color">Gender: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && <GenderValue id={empdata.resumes.gender} />}
                </span>
              </Col>

              <Col lg className="text-center text-lg-left">
                <span className="description-color ">DOB: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.resumes.dob}
                </span>
              </Col>
              <Col lg className="text-center text-lg-left">
                <span className="description-color ">VISA: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.resumes.visa}
                </span>
              </Col>
            </Row>
            <Row className="description-font py-2 pl-lg-5">
              <Col lg className="text-center text-lg-left">
                <span className="description-color">SSN: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.resumes.ssn}
                </span>
              </Col>
              <Col lg className="text-center text-lg-left">
                <span className="description-color ">Approver Name: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.hiring_manager}
                </span>
              </Col>
              <Col lg className="text-center text-lg-left">
                <span className="description-color ">Approver Email: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.hiring_manager_email}
                </span>
              </Col>
            </Row>
            <Col className="hr-jobs"></Col>

            <Row className="description-font py-2 pl-lg-5">
              <Col lg className="text-center text-lg-left">
                <span className="description-color ">ADP Number: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.adp_number}
                </span>
              </Col>
              <Col lg className="text-center text-lg-left">
                <span className="description-color">Job Title: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.requirement.job_title}
                </span>
              </Col>

              <Col lg className="text-center text-lg-left">
                <span className="description-color ">Client: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.client.client_name}
                </span>
              </Col>
            </Row>
            <Row className="description-font py-2 pl-lg-5">
              <Col lg className="text-center text-lg-left">
                <span className="description-color ">Start Date: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.start_date}
                </span>
              </Col>
              <Col lg className="text-center text-lg-left">
                <span className="description-color">Expected End Date: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.expected_end_date}
                </span>
              </Col>

              <Col lg className="text-center text-lg-left">
                <span className="description-color ">Actual End Date: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.actual_end_date}
                </span>
              </Col>
            </Row>
            <Row className="description-font py-2 pl-lg-5">
              <Col lg className="text-center text-lg-left">
                <span className="description-color ">Employee Type: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && <EmployeeType id={empdata.employee_type} />}
                </span>
              </Col>
              <Col lg className="text-center text-lg-left">
                <span className="description-color">Employee Status: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && <EmployeeStatus id={empdata.employee_status} />}
                </span>
              </Col>

              <Col lg className="text-center text-lg-left">
                <span className="description-color ">Pay Frequency: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && <PayFrequency id={empdata.pay_frequency} />}
                </span>
              </Col>
            </Row>
            <Row className="description-font py-2 pl-lg-5">
              <Col lg className="text-center text-lg-left">
                <span className="description-color ">
                  Standard Time Pay Rate:{" "}
                </span>
                {empdata ? (
                  empdata.standard_time_pay_rate ? (
                    <span className=" text-break-all font-weight-bold">
                      {empdata.standard_time_pay_rate}
                    </span>
                  ) : (
                    <span>{`Rate-1: ${empdata.st1},Rate-2: ${empdata.st2},Rate-3: ${empdata.st3}`}</span>
                  )
                ) : null}
              </Col>
              <Col lg className="text-center text-lg-left">
                <span className="description-color">
                  Double Time Pay Percentage:{" "}
                </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.double_time_pay_percentage}
                </span>
              </Col>

              <Col lg className="text-center text-lg-left">
                <span className="description-color ">Overtime Pay Rate: </span>
                {empdata ? (
                  empdata.overtime_pay_rate ? (
                    <span className=" text-break-all font-weight-bold">
                      {empdata.overtime_pay_rate}
                    </span>
                  ) : (
                    <span>{`Rate-1: ${empdata.ot1},Rate-2: ${empdata.ot2},Rate-3: ${empdata.ot3}`}</span>
                  )
                ) : null}
              </Col>
            </Row>
            <Row className="description-font py-2 pl-lg-5">
              <Col lg className="text-center text-lg-left">
                <span className="description-color ">
                  Overtime Pay Percentage:{" "}
                </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.mobile}
                </span>
              </Col>
              <Col lg className="text-center text-lg-left">
                <span className="description-color">
                  Double Time Pay Rate:{" "}
                </span>
                {empdata ? (
                  empdata.double_time_pay_rate ? (
                    <span className=" text-break-all font-weight-bold">
                      {empdata.double_time_pay_rate}
                    </span>
                  ) : (
                    <span>{`Rate-1: ${empdata.dt1},Rate-2: ${empdata.dt2},Rate-3: ${empdata.dt3}`}</span>
                  )
                ) : null}
              </Col>

              <Col lg className="text-center text-lg-left">
                <span className="description-color ">
                  Standard Time Bill Rate:{" "}
                </span>
                {empdata ? (
                  empdata.standard_time_bill_rate ? (
                    <span className=" text-break-all font-weight-bold">
                      {empdata.standard_time_bill_rate}
                    </span>
                  ) : (
                    <span>{`Rate-1: ${empdata.stb1},Rate-2: ${empdata.stb2},Rate-3: ${empdata.stb3}`}</span>
                  )
                ) : null}
              </Col>
            </Row>
            <Row className="description-font py-2 pl-lg-5">
              <Col lg className="text-center text-lg-left">
                <span className="description-color ">
                  Double Time Bill Percentage:{" "}
                </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.double_time_bill_percentage}
                </span>
              </Col>
              <Col lg className="text-center text-lg-left">
                <span className="description-color">Overtime Bill Rate: </span>
                {empdata ? (
                  empdata.overtime_bill_rate ? (
                    <span className=" text-break-all font-weight-bold">
                      {empdata.overtime_bill_rate}
                    </span>
                  ) : (
                    <span>{`Rate-1: ${empdata.otb1},Rate-2: ${empdata.otb2},Rate-3: ${empdata.otb3}`}</span>
                  )
                ) : null}
              </Col>

              <Col lg className="text-center text-lg-left">
                <span className="description-color ">
                  Overtime Bill Percentage:{" "}
                </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.overtime_bill_percentage}
                </span>
              </Col>
            </Row>
            <Row className="description-font py-2 pl-lg-5">
              <Col lg className="text-center text-lg-left">
                <span className="description-color ">
                  Double Time Bill Rate:{" "}
                </span>
                {empdata ? (
                  empdata.double_time_bill_rate ? (
                    <span className=" text-break-all font-weight-bold">
                      {empdata.double_time_bill_rate}
                    </span>
                  ) : (
                    <span>{`Rate-1: ${empdata.dtb1},Rate-2: ${empdata.dtb2},Rate-3: ${empdata.dtb3}`}</span>
                  )
                ) : null}
              </Col>
              <Col lg className="text-center text-lg-left">
                <span className="description-color">Overtime Allowed: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata
                    ? empdata.overtime_exempt === 2
                      ? "No"
                      : "Yes"
                    : null}
                </span>
              </Col>

              <Col lg className="text-center text-lg-left">
                <span className="description-color ">Approval Required: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata
                    ? empdata.approval_required === 2
                      ? "No"
                      : "Yes"
                    : null}
                </span>
              </Col>
            </Row>
            <Row className="description-font py-2 pl-lg-5">
              <Col lg className="text-center text-lg-left">
                <span className="description-color ">Approval Email: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.approved_by ? empdata.approved_by : "N/A"}
                </span>
              </Col>
              <Col lg className="text-center text-lg-left">
                <span className="description-color">HR Approval: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata ? (empdata.hr_approved === 2 ? "No" : "Yes") : null}
                </span>
              </Col>

              <Col lg className="text-center text-lg-left">
                <span className="description-color ">Annual Salary: </span>
                <span className=" text-break-all font-weight-bold">
                  {empdata && empdata.annual_salary}
                </span>
              </Col>
            </Row>
          </>
        )}
      </Form>

      <Tabs
        defaultActiveKey="Employee Logs"
        className="nav-tabs rounded mx-4 "
        id="myTab"
        role="tablist"
        style={{ justifyContent: "space-around", width: "40%" }}
      >
        <Tab eventKey="Employee Logs" title="Timesheet">
          <EmployeeLogs id={empdata && empdata.user_id} />
        </Tab>
        <Tab eventKey="Tax" title="Tax">
          <Tax id={id} />
        </Tab>
        <Tab eventKey="HR Approval" title={"HR Approval"}>
          <HRAprroval
            hrApprovalData={hrApprovalData}
            hrApprovalLoading={hrApprovalLoading}
            id={id}
            setHrApprovalRefreshLoading={setHrApprovalRefreshLoading}
            hrApprovalRefreshLoading={hrApprovalRefreshLoading}
          />
        </Tab>
        <Tab eventKey="VCare" title="VCare">
          <VCare id={id} />
        </Tab>
        <Tab eventKey="CGS" title="CSG">
          <CGS id={id} />
        </Tab>
      </Tabs>

      {!loading && (
        <Form className="text-center mr-5 my-4">
          <Link to={`/empform/${id}`}>
            <Button className="btn btn-primary btn-lg text-break-all font-weight-bold px-3 mr-2 mb-3 mb-lg-0 search-input-icon text-right">
              <Col>
                <span>Update</span>
              </Col>
            </Button>
          </Link>
          <Button
            onClick={() => setConfirmationDialog(true)}
            className="btn btn-danger btn-lg text-break-all font-weight-bold px-3 mr-2 mb-3 mb-lg-0 search-input-icon text-right"
          >
            <Col>
              <span>Delete</span>
            </Col>
          </Button>
          <Button className="btn btn-warning btn-lg text-break-all font-weight-bold px-3 mr-2 mb-3 mb-lg-0 search-input-icon text-right">
            <Col>
              <span
                onClick={() => {
                  setShowEOCDialog(true);
                  setEocStatus(empdata.status);
                }}
              >{`${
                empdata && empdata.status === 1 ? "Mark" : "Reverse"
              } EOC`}</span>
            </Col>
          </Button>
        </Form>
      )}
    </>
  );
};

export default EmployeeDetails;
