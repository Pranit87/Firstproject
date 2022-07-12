import React from "react";
import "./submittedPopup.css";
import { Form, Formik } from "formik";
import { postChangeStatus } from "../../Services/jobsService";
import { Modal } from "react-bootstrap";
import { Notification } from "../Common/Notification/Notification";
import { interviewTypes } from "../../constants";
import { format } from "date-fns";
import Select from "react-select";

const SubmitPopup = ({
  data,
  setShow,
  type,
  show,
  setReloadInterview,
  reloadInterview,
}) => {
  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });
  const user = localStorage.getItem("profile");
  const [submitting, setSubmitting] = React.useState(false);

  // Initial Form State --------------------------------------------------
  const [remarkInitialValue, setRemarkInitialValue] = React.useState({
    status: "",
    updatedAt: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    interviewScheduled: null,
    payRate: 0,
    billRate: 0,
    closingRemark: "",
    resumeRequirementMapId: null,
    authorId: null,
    interview_type: "",
    onDate: "",
  });

  React.useEffect(() => {
    let interview_type_code = null;
    if (data.interview_mode) {
      interview_type_code =
        data.interview_mode &&
        interviewTypes.filter(
          ({ label }) => label === data.interview_mode || ""
        );
    }

    setRemarkInitialValue({
      status: data.status_code || data.status || "",
      updatedAt: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      payRate: data.pay_rate || 0,
      billRate: data.bill_rate || 0,
      closingRemark: data.closing_remarks
        ? data.closing_remarks.replace(/&quot;/g, '"').replace(/&amp;/g, "&")
        : "",
      interviewScheduled:
        (data.interview_date &&
          format(new Date(data.interview_date), "yyyy-MM-dd'T'HH:mm")) ||
        "",
      resumeRequirementMapId: data.resume_requirement_map_id,
      authorId: JSON.parse(user)["id"],
      interview_type:
        (interview_type_code &&
          interview_type_code[0] &&
          interview_type_code[0]["value"]) ||
        "",
      onDate: "",
    });
  }, [data, user]);

  //Function to get Radio button according to type --------------------
  const StatusCloumn = ({ props }) => {
    let columns = [];

    if (type === "SOURCED") {
      columns.push(
        <>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 1 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 1 : ""
                );
              }}
            />
            &nbsp;Sourced
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 55 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 55 : ""
                );
              }}
            />
            &nbsp;Qualified
          </label>
        </>
      );
    } else if (type === "QUALIFIED") {
      columns.push(
        <>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 55 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 55 : ""
                );
              }}
            />
            &nbsp;Qualified
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 3 ? true : false}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 3 : ""
                );
              }}
            />
            &nbsp;Submitted
          </label>
        </>
      );
    } else if (type === "SUBMITTED") {
      columns.push(
        <>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 3 ? true : false}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 3 : ""
                );
              }}
            />
            &nbsp;Submitted
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 48 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 48 : ""
                );
              }}
            />
            &nbsp;Shortlisted
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 14 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 14 : ""
                );
              }}
            />
            &nbsp;Interview Requested
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === "11" ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? "11" : ""
                );
              }}
            />
            &nbsp;Withdrawn
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 6 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 6 : ""
                );
              }}
            />
            &nbsp;Rejected
          </label>
        </>
      );
    } else if (type === 14) {
      columns.push(
        <>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 14 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 14 : ""
                );
              }}
            />
            &nbsp;Interview Requested
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 15 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 15 : ""
                );
              }}
            />
            &nbsp;Interview Accepted
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 16 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 16 : ""
                );
              }}
            />
            &nbsp;Interview Declined
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 49 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 49 : ""
                );
              }}
            />
            &nbsp;Rescheduled Request
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 50 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 50 : ""
                );
              }}
            />
            &nbsp;Interview Cancelled
          </label>
        </>
      );
    } else if (type === 49) {
      columns.push(
        <>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 49 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 49 : ""
                );
              }}
            />
            &nbsp;Rescheduled Request
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 15 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 15 : ""
                );
              }}
            />
            &nbsp;Interview Accepted
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 16 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 16 : ""
                );
              }}
            />
            &nbsp;Interview Declined
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 11 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 11 : ""
                );
              }}
            />
            &nbsp;Withdrawn
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 50 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 50 : ""
                );
              }}
            />
            &nbsp;Interview Cancelled
          </label>
        </>
      );
    } else if (type === 15) {
      columns.push(
        <>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 15 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 15 : ""
                );
              }}
            />
            &nbsp;Interview Accepted
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 51 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 51 : ""
                );
              }}
            />
            &nbsp;Interview no show
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 49 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 49 : ""
                );
              }}
            />
            &nbsp;Rescheduled Request
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 18 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 18 : ""
                );
              }}
            />
            &nbsp;Interview Completed
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 50 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 50 : ""
                );
              }}
            />
            &nbsp;Interview Cancelled
          </label>
        </>
      );
    } else if (type === 51) {
      columns.push(
        <>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 51 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 51 : ""
                );
              }}
            />
            &nbsp;Interview no show
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 38 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 38 : ""
                );
              }}
            />
            &nbsp;Rejected after interview
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 49 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 49 : ""
                );
              }}
            />
            &nbsp;Rescheduled Request
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 11 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 11 : ""
                );
              }}
            />
            &nbsp;Withdrawn
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 50 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 50 : ""
                );
              }}
            />
            &nbsp;Interview Cancelled
          </label>
        </>
      );
    } else if (type === 18) {
      columns.push(
        <>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 18 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 18 : ""
                );
              }}
            />
            &nbsp;Interview Completed
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 14 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 14 : ""
                );
              }}
            />
            &nbsp;Schedule Another Round
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 38 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 38 : ""
                );
              }}
            />
            &nbsp;Rejected after interview
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 54 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 54 : ""
                );
              }}
            />
            &nbsp;Offer Extended
          </label>
        </>
      );
    } else if (type === 54) {
      columns.push(
        <>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 54 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 54 : ""
                );
              }}
            />
            &nbsp;Offer Extended
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 21 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 21 : ""
                );
              }}
            />
            &nbsp;Offer Accepted
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 20 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 20 : ""
                );
              }}
            />
            &nbsp;Offer Declined
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 27 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 27 : ""
                );
              }}
            />
            &nbsp;Offer Cancelled
          </label>
        </>
      );
    } else if (type === 21) {
      columns.push(
        <>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 21 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 21 : ""
                );
              }}
            />
            &nbsp;Offer Accepted
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 53 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 53 : ""
                );
              }}
            />
            &nbsp;Background Initiated
          </label>
        </>
      );
    } else if (type === 53) {
      columns.push(
        <>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 53 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 53 : ""
                );
              }}
            />
            &nbsp;Background Initiated
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 5 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 5 : ""
                );
              }}
            />
            &nbsp;Started
          </label>
        </>
      );
    } else if (type === 50) {
      columns.push(
        <>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 50 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 50 : ""
                );
              }}
            />
            &nbsp;Interview Cancelled
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 49 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 49 : ""
                );
              }}
            />
            &nbsp;Rescheduled Request
          </label>

          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 14 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 14 : ""
                );
              }}
            />
            &nbsp;Schedule Another Round
          </label>
        </>
      );
    } else if (type === 16) {
      columns.push(
        <>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 16 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 16 : ""
                );
              }}
            />
            &nbsp;Interview Declined
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 49 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 49 : ""
                );
              }}
            />
            &nbsp;Rescheduled Request
          </label>
          <label>
            <input
              type="radio"
              name="status"
              id="status"
              checked={props.values.status === 14 ? true : false || ""}
              onChange={(e) => {
                props.setFieldValue(
                  "status",
                  e.target.checked === true ? 14 : ""
                );
              }}
            />
            &nbsp;Schedule Another Round
          </label>
        </>
      );
    }

    return (
      <div class="radio" style={{ display: "grid" }}>
        {columns}
      </div>
    );
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Status</Modal.Title>
      </Modal.Header>
      {notify.show && <Notification {...notify} />}
      <Modal.Body className="max">
        <Formik
          initialValues={remarkInitialValue}
          enableReinitialize={true}
          validationSchema={null}
          onSubmit={(values) => {
            var FormData = require("form-data");
            var formData = new FormData();
            formData.append(
              "resumeRequirementMapId",
              values.resumeRequirementMapId
            );
            formData.append("status", values.status);
            formData.append("payRate", values.payRate);
            formData.append("billRate", values.billRate);
            formData.append("updatedAt", values.updatedAt);
            formData.append("closingRemark", values.closingRemark);
            formData.append("authorId", values.authorId);
            formData.append("interviewTime", values.interviewScheduled || "");
            formData.append("interview_type", values.interview_type || "");
            formData.append("onDate", values.onDate || "");

            postChangeStatus(
              formData,
              setReloadInterview,
              reloadInterview,
              setShow,
              setNotify,
              setSubmitting
            );
          }}
        >
          {(props) => {
            const { values, handleSubmit, handleReset } = props;
            return (
              <Form onSubmit={handleSubmit}>
                <div class="row no-gutters">
                  <div class="col-lg">
                    <div class="row no-gutters">
                      <div class="col-3 ml-lg-3 h6 font-weight-bold">
                        Status
                      </div>
                      <div class="col mr-lg-5">
                        <StatusCloumn props={props} />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg h6 font-weight-bold">
                    {(type === "SOURCED" ||
                      type === "SUBMITTED" ||
                      type === "SHORTLISTED" ||
                      type === "QUALIFIED" ||
                      values.status === 14) && (
                      <div class="row no-gutters">
                        <div class="col-4 my-2">Updated at</div>
                        <div class="col-8">
                          <div class="mb-2">
                            <input
                              type="datetime-local"
                              className="form-control py-4 form-control-custom"
                              value={values.updatedAt || ""}
                              onChange={(e) => {
                                console.log("updatedt", e.target.value);
                                props.setFieldValue(
                                  "updatedAt",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {(values.status === 14 ||
                      values.status === 49 ||
                      values.status === 52) && (
                      <div class="row no-gutters">
                        <div class="col-4 my-2">Interview Schedule</div>
                        <div class="col-8">
                          <div class="mb-2">
                            <input
                              type="datetime-local"
                              className="form-control py-4 form-control-custom"
                              value={values.interviewScheduled || ""}
                              onChange={(e) => {
                                props.setFieldValue(
                                  "interviewScheduled",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {values.status === 5 && (
                      <div class="row no-gutters">
                        <div class="col-4 my-2">Start Date</div>
                        <div class="col-8">
                          <div class="mb-2">
                            <input
                              type="datetime-local"
                              className="form-control py-4 form-control-custom"
                              value={values.onDate || ""}
                              onChange={(e) => {
                                props.setFieldValue("onDate", e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div class="row no-gutters">
                      <div class="col-4 my-2">Pay Rate</div>
                      <div class="col-8">
                        <input
                          className="form-control py-1 mb-2"
                          type="number"
                          name="payRate"
                          id="payRate"
                          value={values.payRate}
                          onChange={(e) => {
                            props.setFieldValue("payRate", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div class="row no-gutters">
                      <div class="col-4 my-3">Bill Rate</div>
                      <div class="col-8">
                        <input
                          className="form-control py-1 mb-2"
                          type="number"
                          name="billRate"
                          id="billRate"
                          value={values.billRate}
                          onChange={(e) => {
                            props.setFieldValue("billRate", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    {values.status === 14 && (
                      <div class="row no-gutters">
                        <div class="col-4 my-2">Interview Mode</div>
                        <div class="col-8">
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable={false}
                            name="interview_type"
                            onChange={(e) => {
                              props.setFieldValue(
                                "interview_type",
                                e && e.value
                              );
                            }}
                            value={interviewTypes.filter(
                              ({ value }) => value === values.interview_type
                            )}
                            options={interviewTypes}
                            getOptionLabel={({ label }) => label}
                            getOptionValue={({ value }) => value}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <hr></hr>
                <div class="row no-gutters">
                  <div class="col-2 h6 font-weight-bold">Closing Remarks</div>
                  <div class="col-10">
                    <textarea
                      name="closing-remarks"
                      id="closingRemark"
                      value={values.closingRemark || ""}
                      tabIndex="0"
                      onKeyDown={(e) => {
                        if (e.key === "Tab") {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        props.setFieldValue(
                          "closingRemark",
                          e.target.value
                            .replace(/(\t)/g, " ")
                            .replace(/[\\]/gi, "")
                            .replace(/(\r\n|\n|\r)/gm, "")
                            .replace(
                              /[^a-zA-Z0-9 \/\"\“\”\_\.\:\$\-\*\#\+\_\(\)\%\&]/g,
                              ""
                            )
                        );
                      }}
                      className="form-control"
                      cols="90"
                      rows="3"
                      draggable="false"
                    ></textarea>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    class="btn b-color-search-description text-white btn-lg mt-2 mr-3"
                    onClick={handleSubmit}
                    disabled={values.status === "" || submitting}
                  >
                    {!submitting ? "Update" : "Updating..."}
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary btn-lg mt-2 mr-3"
                    onClick={() => {
                      handleReset();
                      setShow(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default SubmitPopup;
