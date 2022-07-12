/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number       Developer       Description
 * ------------------------------------------------------------------
 * 24 Nov 2020    SHOW_RESUME_FILE_STABLE   Vikas Saxena    Created
 *
 *
 *
 *
 *
 *********************************************************************/
import React from "react";
import "./addClient.styles.css";
import { Form } from "react-bootstrap";
import { Formik } from "formik";
import { getDropDownOptions } from "../../Services/dropdownServices";
import { postAddClients } from "../../Services/CRMServices";
import { useUsers } from "../../Services/usersService";
import AccessDenied from "../Common/AccessDenied/AccessDenied";
import { Notification } from "../Common/Notification/Notification";
import * as Yup from "yup";

const AddClient = () => {
  const [options, setOptions] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });

  //Dropdown for remark type ------------------------------
  React.useEffect(() => {
    getDropDownOptions(setOptions, setLoading);
  }, [setOptions]);

  // Initial Form State --------------------------------------------------
  const [clientInitialValue] = React.useState({
    clientName: "",
    clientType: "",
    mspId: "",
    industryBusinessType: "",
    city: "",
    state: "",
    address: "",
    region: "",
    scheduledDate: "",
    emailAlias: "",
    vmo: "0",
    vms: "",
    msa: "1",
  });

  const { currentUser } = useUsers();
  const { permissions } = currentUser;

  const FormValidations = Yup.object().shape({
    clientName: Yup.string().required("Required"),
    clientType: Yup.string().required("Required"),
    industryBusinessType: Yup.string().required("Required"),
  });

  const scrollTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleCancel = () => {
    if (window.history && window.history.length > 1) {
      window.history.go(-1);
    } else {
      window.close();
    }
  };

  return (
    (Object.keys(permissions).length && !permissions.ADD_CLIENT && (
      <AccessDenied />
    )) || (
      <>
        <div className="font">
          <div className="my-4 mx-4 text-white h4">
            {/* <i class="fa fa-angle-left"></i> */}
            <span> &nbsp;Add Client</span>
          </div>
          <div className="my-4 mx-4">
            {notify.show && <Notification {...notify} />}
          </div>
          <div className="bg-white my-4 mx-4 px-5 py-5 rounded ">
            {loading ? (
              <tr className="loadingSearchItem loaders">
                <td colSpan="6" className="text-center">
                  <div class="spinner-border text-dark" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                <Formik
                  initialValues={clientInitialValue}
                  enableReinitialize={true}
                  validationSchema={FormValidations}
                  onSubmit={(values) => {
                    postAddClients(values, setNotify, setSubmitting);
                  }}
                >
                  {(props) => {
                    const {
                      values,
                      errors,
                      touched,
                      isValid,
                      dirty,
                      handleChange,
                      handleSubmit,
                      handleReset,
                    } = props;

                    return (
                      <Form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-lg">
                            <div className="d-flex justify-content-between">
                              <label htmlFor="Client Name" className="required">
                                Client Name
                              </label>
                              {touched.name && errors.name && (
                                <div style={{ color: "red" }}>
                                  {errors.name}
                                </div>
                              )}
                            </div>

                            <input
                              type="text"
                              id="clientName"
                              className="form-control form-control-custom"
                              value={values.clientName || ""}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-lg">
                            <label htmlFor="Client-type" className="required">
                              Client Type
                            </label>
                            {touched.name && errors.name && (
                              <div style={{ color: "red" }}>{errors.name}</div>
                            )}
                            <select
                              name="select-type"
                              id="clientType"
                              className="form-control form-control-custom"
                              value={values.clientType || ""}
                              onChange={(e) => {
                                const targets = e.target.value;
                                props.setFieldValue("clientType", targets);
                              }}
                            >
                              <option value="">Select a client type</option>
                              {options &&
                                options["clientType"].map(function (item) {
                                  return (
                                    <option value={item.id}>
                                      {item.value}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                          <div className="col-lg">
                            <label
                              htmlFor="client Category"
                              className="required"
                            >
                              Industry/Business Type
                            </label>
                            {touched.name && errors.name && (
                              <div style={{ color: "red" }}>{errors.name}</div>
                            )}
                            <select
                              name="select-type"
                              id="industryBusinessType"
                              className="form-control form-control-custom"
                              value={values.industryBusinessType || ""}
                              onChange={(e) => {
                                const targets = e.target.value;
                                console.log("type", targets);
                                props.setFieldValue(
                                  "industryBusinessType",
                                  targets
                                );
                              }}
                            >
                              <option value="">Select a type</option>
                              {options &&
                                options["clientCategory"].map(function (item) {
                                  return (
                                    <option value={item.id}>
                                      {item.value}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                        </div>
                        <div className="row my-4">
                          <div className="col-lg">
                            <label htmlFor="MSP Name">MSP Name</label>

                            <select
                              name="select-type"
                              id="mspId"
                              className="form-control form-control-custom"
                              value={values.mspId || ""}
                              onChange={(e) => {
                                const targets = e.target.value;
                                console.log("type", targets);
                                props.setFieldValue("mspId", targets);
                              }}
                            >
                              <option value="">Select a msp</option>
                              {options &&
                                options["msp"].map(function (item) {
                                  return (
                                    <option value={item.id}>
                                      {item.value}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                          <div className="col-lg">
                            <label htmlFor="city">City</label>
                            <input
                              type="text"
                              id="city"
                              className="form-control form-control-custom"
                              value={values.city || ""}
                              onChange={(e) => {
                                props.setFieldValue("city", e.target.value);
                              }}
                            />
                          </div>
                          <div className="col-lg">
                            <label htmlFor="address">Address</label>
                            <textarea
                              name="address"
                              id="address"
                              cols="60"
                              rows="4"
                              class="form-control resize-custom form-control-custom"
                              value={values.address || ""}
                              onChange={(e) => {
                                props.setFieldValue("address", e.target.value);
                              }}
                            ></textarea>
                          </div>
                        </div>
                        <div className="row my-4">
                          <div className="col-lg">
                            <label htmlFor="State">State</label>

                            <select
                              name="select-type"
                              id="state"
                              className="form-control form-control-custom"
                              value={values.state || ""}
                              onChange={(e) => {
                                const targets = e.target.value.split(",");
                                console.log("type", targets);
                                props.setFieldValue("state", targets);
                                if (targets[1] !== "null") {
                                  props.setFieldValue("region", targets[1]);
                                }
                              }}
                            >
                              <option value="">Select a state</option>
                              {options &&
                                options["states"].map(function (item) {
                                  return (
                                    <option
                                      value={item.value + "," + item.region}
                                    >
                                      {item.value}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                          <div className="col-lg">
                            <label htmlFor="region">Region</label>
                            <input
                              type="text"
                              id="region"
                              className="form-control form-control-custom"
                              value={values.region || ""}
                              onChange={(e) => {
                                props.setFieldValue("region", e.target.value);
                              }}
                            />
                          </div>
                          <div className="col-lg">
                            <label htmlFor="scheduledDate">
                              Scheduled Date
                            </label>
                            <input
                              type="date"
                              className="form-control pt-2 form-control-custom"
                              placeholder="16-01-2020"
                              value={values.scheduledDate || ""}
                              onChange={(e) => {
                                props.setFieldValue(
                                  "scheduledDate",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div className="row my-4">
                          <div className="col-lg">
                            <label htmlFor="emailAlias">Email Alias</label>
                            <input
                              type="email"
                              id="emailAlias"
                              className="form-control form-control-custom"
                              value={values.emailAlias || ""}
                              onChange={(e) =>
                                props.setFieldValue(
                                  "emailAlias",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-lg">
                            <label htmlFor="VMO">VMO</label>
                            <input
                              type="number"
                              id="vmo"
                              className="form-control form-control-custom"
                              value={values.vmo || ""}
                              onChange={(e) =>
                                props.setFieldValue("vmo", e.target.value)
                              }
                            />
                          </div>
                          <div className="col-lg">
                            <label htmlFor="VMS">VMS</label>
                            <select
                              name="select-type"
                              id="vms"
                              className="form-control form-control-custom"
                              value={values.vms || ""}
                              onChange={(e) => {
                                const targets = e.target.value;
                                console.log("type", targets);
                                props.setFieldValue("vms", targets);
                              }}
                            >
                              <option value="">Select VMS</option>
                              {options &&
                                options["vms"].map(function (item) {
                                  return (
                                    <option value={item.id}>
                                      {item.value}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                        </div>
                        <div className="row my-4">
                          <div className="col-md">
                            <label htmlFor="MSA">MSA</label>
                            <select
                              name="msa"
                              id="msa"
                              className="form-control form-control-custom"
                              value={values.msa || ""}
                              onChange={(e) => {
                                const targets = e.target.value;
                                console.log("type", targets);
                                props.setFieldValue("msa", targets);
                              }}
                            >
                              <option value="1">Yes</option>
                              <option value="0">No</option>
                            </select>
                          </div>
                        </div>
                        <div className="pagination">
                          <button
                            type="submit"
                            className="px-4 py-2 btn b-color-search-description text-white mt-2 mr-3"
                            disabled={submitting || !dirty || !isValid}
                            onClick={() => scrollTop()}
                          >
                            {!submitting ? "Save" : "Saveing..."}
                          </button>
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 btn btn-secondary mt-2 mr-3"
                          >
                            Cancel
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </>
            )}
          </div>
        </div>
      </>
    )
  );
};

export default AddClient;
