/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number    Developer       Description
 * -----------------------------------------------------------------
 * 15-Oct-2020    -                      Esha Joshi      Created
 *
 *
 *
 *********************************************************************/
import React from "react";
import { Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postChangeStatus } from "../../Services/jobsService";

function SourcedPopup({ data, setShow, type }) {
  const user = localStorage.getItem("profile");

  // Initial Form State --------------------------------------------------
  const [remarkInitialValue, setRemarkInitialValue] = React.useState({
    status: "",
    updatedAt: new Date(),
    payRate: 0,
    billRate: 0,
    closingRemark: "",
    resumeRequirementMapId: null,
    authorId: null,
  });

  React.useEffect(() => {
    setRemarkInitialValue({
      status: "",
      updatedAt: new Date(),
      payRate: 0,
      billRate: 0,
      closingRemark: "",
      resumeRequirementMapId: data.resume_requirement_map_id,
      authorId: JSON.parse(user)["id"],
    });
  }, [data, user]);

  //Function to get Radio button according to type --------------------
  const StatusCloumn = ({ props }) => {
    let columns = [];

    if (type === "SOURCED") {
      columns.push(
        <label>
          <input
            type="radio"
            name="status"
            value={props.values.status === "1" ? true : false || ""}
            onChange={(e) => {
              console.log("change", e.target.checked);
              props.setFieldValue(
                "status",
                e.target.checked === true ? "1" : ""
              );
            }}
          />
          &nbsp;Submited
        </label>
      );
    }

    return <div class="radio my-1">{columns}</div>;
  };

  return (
    <>
      <div
        className="modal fade"
        id="changeStatusSourced"
        data-backdrop="static"
        data-keyboard="false"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog  modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title font-weight-bold">Update Status</h3>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setShow(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <Formik
                initialValues={remarkInitialValue}
                enableReinitialize={true}
                validationSchema={null}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  console.log("vallues", values);
                  var FormData = require("form-data");
                  var data = new FormData();
                  data.append(
                    "resumeRequirementMapId",
                    values.resumeRequirementMapId
                  );
                  data.append("status", values.status);
                  data.append("payRate", values.payRate);
                  data.append("billRate", values.billRate);
                  data.append("updatedAt", values.updatedAt);
                  data.append("closingRemark", values.closingRemark);
                  data.append("authorId", values.authorId);
                  postChangeStatus(data);
                  setSubmitting(false);
                }}
              >
                {(props) => {
                  const { values, handleSubmit, handleReset } = props;
                  return (
                    <Form onSubmit={handleSubmit}>
                      <div class="row no-gutters">
                        <div class="col-lg-5">
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
                          <div class="row no-gutters">
                            <div class="col-4 my-2">Updated at</div>
                            <div class="col-8">
                              <div class="mb-2">
                                <DatePicker
                                  selected={values.updatedAt || ""}
                                  onChange={(date) =>
                                    props.setFieldValue("updatedAt", date)
                                  }
                                  filterDate={(date) =>
                                    date.getDay() !== 6 && date.getDay() !== 0
                                  }
                                  className="form-control"
                                  required
                                  placeholderText="&#xf133;"
                                  showTimeInput
                                  timeFormat="HH:mm"
                                  timeIntervals={15}
                                  timeCaption="time"
                                  dateFormat="MMMM d, yyyy h:mm aa"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="row no-gutters">
                            <div class="col-4 my-2">Pay Rate</div>
                            <div class="col-8">
                              <input
                                className="form-control py-1 mb-2"
                                type="number"
                                name="payRate"
                                id="payRate"
                                value={values.payRate || ""}
                                onChange={(e) =>
                                  props.setFieldValue("payRate", e.target.value)
                                }
                                required
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
                                value={values.billRate || ""}
                                onChange={(e) =>
                                  props.setFieldValue(
                                    "billRate",
                                    e.target.value
                                  )
                                }
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row no-gutters">
                        <div class="col-2 h6 font-weight-bold">
                          Closing Remarks
                        </div>
                        <div class="col-10">
                          <textarea
                            name="closing-remarks"
                            id="closingRemark"
                            value={values.closingRemark || ""}
                            onChange={(e) =>
                              props.setFieldValue(
                                "closingRemark",
                                e.target.value
                              )
                            }
                            className="form-control"
                            cols="90"
                            rows="3"
                            draggable="false"
                          ></textarea>
                        </div>
                      </div>
                      <button
                        type="submit"
                        data-dismiss="modal"
                        class="btn b-color-search-description text-white btn-lg mt-2 mr-3"
                        onClick={handleReset}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        class="btn btn-secondary btn-lg mt-2 mr-3"
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SourcedPopup;
