import React from "react";
import "./navBar.css";
import { AddRequirementDropdown } from "../../Services/dropdownServices";
import { useParams, Link } from "react-router-dom";
import { Notification } from "../Common/Notification/Notification";
import { Formik } from "formik";
import { Typeahead } from "react-bootstrap-typeahead";
import { useUsers } from "../../Services/usersService";
import AccessDenied from "../Common/AccessDenied/AccessDenied";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import {
  SaveAddRequirement,
  getSavedRequirement,
  postUpdateRequirement,
} from "../../Services/CRMServices";

const Requirement = (props) => {
  const [options, setOptions] = React.useState(null);
  const [profileLoading, setProfileLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [clientType, setClientType] = React.useState();
  const [FormValidations, setFormValidations] = React.useState(null);
  const [updateRequirementData, setUpdateRequirementData] = React.useState(
    null
  );
  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });

  const { jobId } = useParams();

  React.useEffect(() => {
    AddRequirementDropdown(setOptions, setLoading);
  }, [setOptions]);

  // Initial Form State --------------------------------------------------
  const [requirementInitialValue, setRequirementInitialValue] = React.useState({
    client: "",
    type: "",
    salary: "",
    billrate: "",
    payrate: "",
    contract: "",
    location: "",
    title: "",
    jobId: "",
    release: "",
    received: "",
    markup: "",
    c2c: "",
    position: "",
    slot: "",
    submission: "",
    jobcategory: "",
    description: "",
    remark: "",
    dhm: "",
    team: [],
    requirementId: "",
  });

  React.useEffect(() => {
    if (jobId) {
      getSavedRequirement(setUpdateRequirementData, jobId, setProfileLoading);
    }
  }, [jobId]);

  React.useEffect(() => {
    if (updateRequirementData) {
      let team = [];

      updateRequirementData.teams &&
        updateRequirementData.teams.forEach((item) => {
          let obj = {};
          obj.id = item.lead_id;
          obj.username = item.title;
          team.push(obj);
        });
      updateRequirementData.type && setClientType(updateRequirementData.type);
      setRequirementInitialValue({
        client: updateRequirementData.client_id
          ? updateRequirementData.client_id
          : "",
        type: updateRequirementData.type ? updateRequirementData.type : "",
        salary: updateRequirementData.salary
          ? updateRequirementData.salary
          : "",
        billrate: updateRequirementData.bill_rate
          ? updateRequirementData.bill_rate
          : "",
        payrate: updateRequirementData.pay_rate
          ? updateRequirementData.pay_rate
          : "",
        contract: updateRequirementData.contract_duration
          ? updateRequirementData.contract_duration
          : "",
        location: updateRequirementData.location
          ? updateRequirementData.location
          : "",
        title: updateRequirementData.job_title
          ? updateRequirementData.job_title
          : "",
        jobId: updateRequirementData.job_id ? updateRequirementData.job_id : "",
        release: updateRequirementData.release_date
          ? updateRequirementData.release_date
          : "",
        received: updateRequirementData.received_date
          ? updateRequirementData.received_date
          : "",
        markup: updateRequirementData.markup
          ? updateRequirementData.markup
          : "",
        c2c: updateRequirementData.corp_to_corp
          ? updateRequirementData.corp_to_corp
          : "",
        position: updateRequirementData.no_of_positions
          ? updateRequirementData.no_of_positions
          : "",
        slot: updateRequirementData.no_slots_filled
          ? updateRequirementData.no_slots_filled
          : "",
        submission: updateRequirementData.maximum_number_of_submission
          ? updateRequirementData.maximum_number_of_submission
          : "",
        jobcategory: updateRequirementData.job_category
          ? updateRequirementData.job_category
          : "",
        description: updateRequirementData.job_description
          ? updateRequirementData.job_description
          : "",
        remark: updateRequirementData.remarks
          ? updateRequirementData.remarks
          : "",
        dhm: updateRequirementData.is_dhm ? updateRequirementData.is_dhm : "",
        team: team,
        requirementId: updateRequirementData.id ? updateRequirementData.id : "",
      });
    }
  }, [updateRequirementData]);

  // Updating Form Validation on the basis of type ------------------------
  React.useEffect(() => {
    if (clientType === "Full Time") {
      setFormValidations(
        Yup.object().shape({
          client: Yup.string().required(),
          type: Yup.string().required(),
          location: Yup.string().required(),
          title: Yup.string().required(),
          release: Yup.string().required(),
          received: Yup.string().required(),
          c2c: Yup.string().required(),
          position: Yup.string().required(),
          jobcategory: Yup.string().required(),
          description: Yup.string().required(),
          salary: Yup.string().required(),
          jobId: Yup.string().required(),
        })
      );
    } else if (clientType === "Contract") {
      setFormValidations(
        Yup.object().shape({
          client: Yup.string().required(),
          type: Yup.string().required(),
          location: Yup.string().required(),
          title: Yup.string().required(),
          release: Yup.string().required(),
          received: Yup.string().required(),
          c2c: Yup.string().required(),
          position: Yup.string().required(),
          jobcategory: Yup.string().required(),
          description: Yup.string().required(),
          billrate: Yup.string().required(),
          markup: Yup.string().required(),
          jobId: Yup.string().required(),
        })
      );
    } else if (clientType === "W2") {
      setFormValidations(
        Yup.object().shape({
          client: Yup.string().required(),
          type: Yup.string().required(),
          location: Yup.string().required(),
          title: Yup.string().required(),
          release: Yup.string().required(),
          received: Yup.string().required(),
          c2c: Yup.string().required(),
          position: Yup.string().required(),
          jobcategory: Yup.string().required(),
          description: Yup.string().required(),
          payrate: Yup.string().required(),
          markup: Yup.string().required(),
          jobId: Yup.string().required(),
        })
      );
    } else if (clientType === "C2H") {
      setFormValidations(
        Yup.object().shape({
          client: Yup.string().required(),
          type: Yup.string().required(),
          location: Yup.string().required(),
          title: Yup.string().required(),
          release: Yup.string().required(),
          received: Yup.string().required(),
          c2c: Yup.string().required(),
          position: Yup.string().required(),
          jobcategory: Yup.string().required(),
          description: Yup.string().required(),
          payrate: Yup.string().required(),
          markup: Yup.string().required(),
          salary: Yup.string().required(),
          jobId: Yup.string().required(),
        })
      );
    } else {
      setFormValidations(
        Yup.object().shape({
          client: Yup.string().required(),
          type: Yup.string().required(),
          location: Yup.string().required(),
          title: Yup.string().required(),
          release: Yup.string().required(),
          received: Yup.string().required(),
          c2c: Yup.string().required(),
          position: Yup.string().required(),
          jobcategory: Yup.string().required(),
          description: Yup.string().required(),
          jobId: Yup.string().required(),
        })
      );
    }
  }, [clientType]);

  const handleCancel = () => {
    if (window.history && window.history.length > 1) {
      window.history.go(-1);
    } else {
      window.close();
    }
  };

  const { currentUser } = useUsers();
  const { permissions } = currentUser;

  return (
    (Object.keys(permissions).length && !permissions.ADD_REQUIREMENT && (
      <AccessDenied />
    )) || (
      <>
        <div className="font">
          <div className="my-4 mx-4 text-white h4">
            {jobId ? (
              <>
                <span>UPDATE REQUIREMENT</span>
              </>
            ) : (
              <>
                {/* <i class="fa fa-angle-left"></i> */}
                <span>ADD REQUIREMENT</span>
              </>
            )}
          </div>
          <div className="my-4 mx-4">
            {notify.show && <Notification {...notify} />}
          </div>
          {loading || profileLoading ? (
            <div className="bg-white my-4 mx-4 px-5 py-5 rounded ">
              <tr className="loadingSearchItem loaders">
                <td colSpan="6" className="text-center">
                  <div class="spinner-border text-black" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </td>
              </tr>
            </div>
          ) : (
            <Formik
              initialValues={requirementInitialValue}
              enableReinitialize={true}
              validationSchema={FormValidations}
              onSubmit={(values) => {
                if (jobId) {
                  postUpdateRequirement(values, setNotify, setSubmitting);
                } else {
                  SaveAddRequirement(values, setNotify, setSubmitting);
                }
              }}
            >
              {(props) => {
                const {
                  values,
                  errors,
                  touched,
                  isValid,
                  dirty,
                  handleSubmit,
                } = props;

                return (
                  <div className="bg-white my-4 mx-4 px-5 py-5 rounded ">
                    <Form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg">
                          <div className="d-flex justify-content-between">
                            <label htmlFor="select-Client" className="required">
                              Client
                            </label>
                            {touched.name && errors.name && (
                              <div style={{ color: "red" }}>{errors.name}</div>
                            )}
                            <div>
                              <Link to={`/add-clients`} target="_blank">
                                <i class="fa fa-plus"></i>
                              </Link>
                            </div>
                          </div>

                          <select
                            name="select-Client"
                            id="select-Client"
                            className="form-control "
                            required
                            value={values.client || ""}
                            onChange={(e) => {
                              const targets = e.target.value;

                              props.setFieldValue("client", targets);
                            }}
                          >
                            <option hidden disabled selected="true" value="">
                              Select Client
                            </option>
                            {options &&
                              options["clientDetails"].map(function (item) {
                                return (
                                  <option value={item.id}>{item.client}</option>
                                );
                              })}
                          </select>
                        </div>
                        <div className="col-lg">
                          <label htmlFor="select-type" className="required">
                            Type
                          </label>
                          {touched.name && errors.name && (
                            <div style={{ color: "red" }}>{errors.name}</div>
                          )}
                          <select
                            name="select-type"
                            id="select-type"
                            className="form-control "
                            required
                            value={values.type || ""}
                            onChange={(e) => {
                              const targets = e.target.value;
                              setClientType(targets);
                              props.setFieldValue("type", targets);
                            }}
                          >
                            <option hidden disabled selected="true" value="">
                              Select Type
                            </option>
                            {options &&
                              options["jobTypeDetails"].map(function (item) {
                                return (
                                  <option value={item.value}>
                                    {item.jobtype}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <div className="col-lg">
                          <label
                            htmlFor="salary"
                            id="salarylabel"
                            className={
                              clientType === "Full Time" || clientType === "C2H"
                                ? "required"
                                : ""
                            }
                          >
                            Salary
                          </label>
                          {touched.salary && errors.salary && (
                            <div style={{ color: "red" }}>{errors.salary}</div>
                          )}
                          <input
                            type="text"
                            id="salary"
                            className="form-control "
                            value={values.salary || ""}
                            onChange={(e) => {
                              props.setFieldValue("salary", e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="row my-4">
                        <div className="col-lg">
                          <label
                            htmlFor="billrate"
                            id="billratelabel"
                            className={
                              clientType === "Contract" ? "required" : ""
                            }
                          >
                            Bill Rate
                          </label>
                          {touched.billrate && errors.billrate && (
                            <div style={{ color: "red" }}>
                              {errors.billrate}
                            </div>
                          )}
                          <input
                            type="text"
                            id="billrate"
                            className="form-control "
                            value={values.billrate || ""}
                            onChange={(e) => {
                              props.setFieldValue("billrate", e.target.value);
                            }}
                          />
                        </div>

                        <div className="col-lg">
                          <label
                            htmlFor="payrate"
                            id="payratelabel"
                            className={
                              clientType === "W2" || clientType === "C2H"
                                ? "required"
                                : ""
                            }
                          >
                            Pay Rate
                          </label>
                          {touched.payrate && errors.payrate && (
                            <div style={{ color: "red" }}>{errors.payrate}</div>
                          )}
                          <input
                            type="text"
                            id="payrate"
                            className="form-control "
                            value={values.payrate || ""}
                            onChange={(e) => {
                              props.setFieldValue("payrate", e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg">
                          <label htmlFor="contract">Contract duration</label>

                          <input
                            type="text"
                            id="contract"
                            className="form-control "
                            value={values.contract || ""}
                            onChange={(e) => {
                              props.setFieldValue("contract", e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="row my-4">
                        <div className="col-lg">
                          <label htmlFor="Location" className="required">
                            Location
                          </label>
                          {touched.name && errors.name && (
                            <div style={{ color: "red" }}>{errors.name}</div>
                          )}

                          <input
                            type="text"
                            id="Location"
                            className="form-control "
                            required
                            value={values.location || ""}
                            onChange={(e) => {
                              props.setFieldValue("location", e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg">
                          <label htmlFor="Job Title" className="required">
                            Job Title
                          </label>
                          {touched.name && errors.name && (
                            <div style={{ color: "red" }}>{errors.name}</div>
                          )}
                          <input
                            type="text"
                            id="Job Title"
                            className="form-control "
                            required
                            value={values.title || ""}
                            onChange={(e) => {
                              props.setFieldValue("title", e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg">
                          <label htmlFor="Job ID" className="required">
                            Job ID
                          </label>
                          {touched.name && errors.name && (
                            <div style={{ color: "red" }}>{errors.name}</div>
                          )}
                          <input
                            type="text"
                            id="Job ID"
                            className="form-control "
                            value={values.jobId || ""}
                            onChange={(e) => {
                              props.setFieldValue("jobId", e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="row my-4">
                        <div className="col-lg">
                          <div>
                            <label
                              htmlFor="No. of Position"
                              className="required"
                            >
                              Release Date
                            </label>
                            {touched.name && errors.name && (
                              <div style={{ color: "red" }}>{errors.name}</div>
                            )}

                            <input
                              type="date"
                              required
                              id="release"
                              className="form-control "
                              value={values.release || ""}
                              onChange={(e) => {
                                props.setFieldValue("release", e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg">
                          <label htmlFor="Received Date" className="required">
                            Received Date
                          </label>
                          {touched.name && errors.name && (
                            <div style={{ color: "red" }}>{errors.name}</div>
                          )}
                          <input
                            type="date"
                            id="received"
                            required
                            className="form-control "
                            value={values.received || ""}
                            onChange={(e) => {
                              props.setFieldValue("received", e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg">
                          <label
                            htmlFor="markup"
                            id="markuplabel"
                            className={
                              clientType === "W2" ||
                              clientType === "C2H" ||
                              clientType === "Contract"
                                ? "required"
                                : ""
                            }
                          >
                            Mark Up
                          </label>
                          {touched.markup && errors.markup && (
                            <div style={{ color: "red" }}>{errors.markup}</div>
                          )}
                          <input
                            type="text"
                            id="markup"
                            className="form-control "
                            value={values.markup || ""}
                            onChange={(e) => {
                              props.setFieldValue("markup", e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="row my-4">
                        <div className="col-lg">
                          <label htmlFor="C2C" className="required">
                            C2C
                          </label>
                          {touched.name && errors.name && (
                            <div style={{ color: "red" }}>{errors.name}</div>
                          )}
                          <select
                            name="C2C"
                            id="C2C"
                            className="form-control"
                            required
                            value={values.c2c || ""}
                            onChange={(e) => {
                              props.setFieldValue("c2c", e.target.value);
                            }}
                          >
                            <option
                              hidden
                              disabled
                              selected="true"
                              value=""
                              className="py-4"
                            >
                              Select
                            </option>
                            <option value="Yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                        <div className="col-lg">
                          <div className="d-flex justify-content-between">
                            <div>
                              <label
                                htmlFor="No. of Position"
                                className="required"
                              >
                                No. of Position
                              </label>
                              {touched.name && errors.name && (
                                <div style={{ color: "red" }}>
                                  {errors.name}
                                </div>
                              )}

                              <input
                                type="text"
                                id="No. of Position"
                                className="form-control mx-n2"
                                required
                                value={values.position || ""}
                                onChange={(e) => {
                                  props.setFieldValue(
                                    "position",
                                    e.target.value
                                  );
                                }}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="No. of slots field"
                                className="ml-lg-2"
                              >
                                No. of slots filled
                              </label>

                              <input
                                type="text"
                                id="No. of slots field"
                                className="form-control"
                                value={values.slot || ""}
                                onChange={(e) => {
                                  props.setFieldValue("slot", e.target.value);
                                }}
                                // required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="Max No. of Submission"
                                className="ml-lg-3"
                              >
                                Max Submission
                              </label>

                              <input
                                type="text"
                                id="Max No. of Submission"
                                className="form-control mx-2"
                                value={values.submission || ""}
                                onChange={(e) => {
                                  props.setFieldValue(
                                    "submission",
                                    e.target.value
                                  );
                                }}
                                // required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg">
                          <label htmlFor="Job Category" className="required">
                            Job Category
                          </label>
                          {touched.name && errors.name && (
                            <div style={{ color: "red" }}>{errors.name}</div>
                          )}
                          <select
                            name="jobcategory"
                            id="jobcategory"
                            className="form-control "
                            required
                            value={values.jobcategory || ""}
                            onChange={(e) => {
                              props.setFieldValue(
                                "jobcategory",
                                e.target.value
                              );
                            }}
                          >
                            <option hidden disabled selected="true" value="">
                              Select Category
                            </option>
                            {options &&
                              options["jobCategory"].map(function (item) {
                                return (
                                  <option value={item.id}>
                                    {item.jobcategory}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>

                      <div className="row my-4">
                        <div className="col-lg">
                          <label htmlFor="description" className="required">
                            Job description
                          </label>
                          {touched.name && errors.name && (
                            <div style={{ color: "red" }}>{errors.name}</div>
                          )}
                          <textarea
                            required
                            maxLength=""
                            name="description"
                            class="form-control resize-custom"
                            rows="4"
                            value={values.description || ""}
                            onChange={(e) => {
                              props.setFieldValue(
                                "description",
                                e.target.value
                              );
                            }}
                          ></textarea>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg">
                          <label htmlFor="Team"> Team </label>
                          <Typeahead
                            id="basic-typeahead-multiple"
                            multiple
                            options={options ? options["teamDetails"] : []}
                            selected={values.team || []}
                            placeholder="Select Team"
                            onChange={(e) => {
                              props.setFieldValue("team", e);
                            }}
                            labelKey={(option) => `${option.username}`}
                          />
                        </div>
                        <div className="col-lg">
                          <div className="col-lg pt-lg-5 pt-md-5">
                            <label htmlFor="DHM"> DHM &nbsp;</label>
                            <input
                              type="checkbox"
                              id="DHM"
                              value={values.dhm || ""}
                              checked={values.dhm || 0}
                              onChange={(e) => {
                                if (document.getElementById("DHM").checked) {
                                  props.setFieldValue("dhm", 1);
                                } else {
                                  props.setFieldValue("dhm", 0);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <hr className="hr-addrequirement" />
                      <div className="pagination justify-content-end mb-2">
                        <button
                          className="px-4 py-2 btn btn-primary mt-2 mr-3"
                          type="submit"
                          id="saveButton"
                          disabled={!dirty || !isValid || submitting}
                        >
                          {!submitting ? "Submit" : "Submitting..."}
                        </button>

                        <button
                          className="px-4 btn btn-secondary mt-2 mr-3"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    </Form>
                  </div>
                );
              }}
            </Formik>
          )}
        </div>
      </>
    )
  );
};

export default Requirement;
