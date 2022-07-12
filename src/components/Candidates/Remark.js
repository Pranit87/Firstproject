import React from "react";
import formatDate from "../Common/formatDate";
import { Form } from "react-bootstrap";
import { Formik } from "formik";
import { getDropDownOptions } from "../../Services/dropdownServices";
import {
  getRequirementDetails,
  postRemarkData,
} from "../../Services/candidateServices";
import { Notification } from "../Common/Notification/Notification";

function Remarks({
  data,
  setRemarkCount,
  remarkCount,
  setRemarkRespone,
  props,
  remarkLoading,
}) {
  const [options, setOptions] = React.useState(null);
  const [reqData, setReqData] = React.useState(null);
  const profile = localStorage.getItem("profile");
  const { id } = props.match.params;
  const { reqId } = props.match.params;
  const [loading, setLoading] = React.useState(false);
  const [resumeRemarksData, setResumeRemarksData] = React.useState([]);
  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });

  // Call API to get requirement data -------------------
  React.useEffect(() => {
    getRequirementDetails(reqId, setReqData);
  }, [reqId]);

  // Initial Form State --------------------------------------------------
  const [remarkInitialValue, setRemarkInitialValue] = React.useState({
    requirementId: "",
    requirementTitle: "",
    remark: "",
    remarkTypeValue: "Candidate Job Send Outs",
    remarkType: "1",
    candidateId: null,
    userId: null,
  });

  React.useEffect(() => {
    if (id) {
      setRemarkInitialValue({
        requirementId: reqData && reqData.job_id ? reqData.job_id : null,
        requirementTitle:
          reqData && reqData.job_title ? reqData.job_title : null,
        remark: "",
        remarkTypeValue: "Candidate Job Send Outs",
        remarkType: "1",
        candidateId: id,
        userId: JSON.parse(profile)["id"],
      });
    }
  }, [id, reqData, data.total]);

  //Dropdown for Comment Type ------------------------------
  React.useEffect(() => {
    getDropDownOptions(setOptions, setLoading);
  }, [setOptions]);

  return (
    <div className=" bg-white py-4 mx-4 font">
      <a className="float-right h6" href="javascript:;">
        <i className="fa fa-plus text-primary">
          &nbsp;{" "}
          <span
            className="font font-weight-bold"
            data-toggle="modal"
            data-target="#addRemark"
          >
            Add Remark
          </span>
        </i>
      </a>
      <div
        className="modal fade"
        id="addRemark"
        data-backdrop="static"
        data-keyboard="false"
        tabindex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div class="rounded font mx-lg-n3 px-3 mb-lg-0 mb-4">
                <div class="text-primary h5 font-weight-bold">Add Remark</div>
                <div class="hr-remarks py-2"></div>
                {loading ? (
                  <div className="loadingRemark px-3 pb-2">
                    <div colSpan="6" className="text-center">
                      <div class="spinner-border text-dark" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Formik
                    initialValues={remarkInitialValue}
                    enableReinitialize={true}
                    validationSchema={null}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      let editRemarkFormValues = Object.assign([], values);

                      // ** Remove values from object which are null (As requested by API end point) **
                      Object.keys(editRemarkFormValues).forEach(
                        (key) =>
                          (editRemarkFormValues[key] === null ||
                            editRemarkFormValues[key] === "" ||
                            (typeof editRemarkFormValues[key] === "object" &&
                              Object.keys(editRemarkFormValues[key]).length ===
                                0)) &&
                          delete editRemarkFormValues[key]
                      );
                      postRemarkData(
                        editRemarkFormValues,
                        remarkCount,
                        setRemarkRespone,
                        setRemarkCount,
                        resetForm,
                        setNotify,
                        resumeRemarksData,
                        setResumeRemarksData,
                        setSubmitting
                      );
                      setSubmitting(true);
                    }}
                  >
                    {(props) => {
                      const {
                        values,
                        handleChange,
                        handleSubmit,
                        handleReset,
                        isSubmitting,
                      } = props;
                      return (
                        <Form onSubmit={handleSubmit}>
                          <div class="custom-font-size-remark">
                            {notify.show && <Notification {...notify} />}
                            <div>Requirement/Job ID</div>
                            <input
                              type="text"
                              className="font-weight-bold remark-input"
                              name="requirementId"
                              id="requirementdataId"
                              value={values.requirementId || ""}
                              onChange={handleChange}
                              disabled
                            />
                            <div class="pt-4">Requirement/Job Title</div>
                            <input
                              type="text"
                              autoComplete="off"
                              className="font-weight-bold remark-input"
                              name="requirementTitle"
                              id="requirementTitle"
                              value={values.requirementTitle || ""}
                              onChange={handleChange}
                              disabled
                            />
                          </div>
                          <div class="text-secondary pt-4 custom-font-size-remark">
                            Comment Type
                          </div>
                          <select
                            name="remarkType"
                            id="remarkType"
                            className="form-control"
                            value={values.remarkType || ""}
                            onChange={(e) => {
                              const targets = e.target.value;
                              props.setFieldValue(
                                "remarkTypeValue",
                                options.remarkType[targets - 1].value
                              );
                              props.setFieldValue("remarkType", targets);
                            }}
                          >
                            {options &&
                              options["remarkType"].map(function (item, index) {
                                return (
                                  <option value={item.id}>{item.value}</option>
                                );
                              })}
                          </select>
                          <div class="text-secondary custom-font-size-remark pt-2">
                            Remark
                          </div>
                          <textarea
                            name="remark"
                            id="remark"
                            cols="60"
                            rows="4"
                            tabIndex="0"
                            onKeyDown={(e) => {
                              if (e.key === "Tab") {
                                e.preventDefault();
                              }
                            }}
                            class="form-control resize-custom"
                            value={values.remark || ""}
                            onChange={(e) => {
                              props.setFieldValue(
                                "remark",
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
                          ></textarea>
                          <div class="pt-3">
                            <button
                              type="button"
                              // data-dismiss="modal"
                              // aria-label="Close"
                              onClick={() => {
                                handleSubmit();
                                setNotify({
                                  show: false,
                                  description: "",
                                  type: "",
                                });
                              }}
                              class="btn btn-sm text-white px-5 bg-color-save mr-2"
                              disabled={values.remark === "" || isSubmitting}
                            >
                              {!isSubmitting ? "Save" : "Saving..."}
                            </button>
                            <button
                              type="button"
                              class="btn btn-secondary btn-sm px-5 mr-2"
                              onClick={() => {
                                handleReset();
                                setNotify({
                                  show: false,
                                  description: "",
                                  type: "",
                                });
                              }}
                            >
                              Reset
                            </button>
                            <button
                              type="button"
                              data-dismiss="modal"
                              aria-label="Close"
                              class="btn btn-secondary btn-sm px-5"
                              onClick={() => {
                                handleReset();
                                setNotify({
                                  show: false,
                                  description: "",
                                  type: "",
                                });
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {remarkLoading ? (
        <div className="loadingRemark px-3 pb-2">
          <div colSpan="6" className="text-center">
            <div class="spinner-border text-dark" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      ) : data && data.data ? (
        data.data.map((row) => (
          <>
            <div className="pt-5 pb-3 vats-font-size">
              <div className="font-weight-bold">
                {row.action.match(/{([^}]+)}/)
                  ? JSON.parse(row.action)["remarks"]
                  : row.action}
              </div>
              <div>
                <span className="description-color">
                  <strong>Requirement ID: </strong>
                  {row.action.match(/{([^}]+)}/)
                    ? JSON.parse(row.action)["requirement_id"]
                    : "N/A"}
                </span>
                &nbsp;&nbsp;
                <span className="description-color">
                  <strong>Requirement Title: </strong>
                  {row.action.match(/{([^}]+)}/)
                    ? JSON.parse(row.action)["requirement_name"]
                    : "N/A"}
                </span>
                &nbsp;&nbsp;
                <span className="description-color">
                  <strong>Comment Type: </strong>
                  {row.action.match(/{([^}]+)}/)
                    ? JSON.parse(row.action)["remark_type_str"]
                    : "N/A"}
                </span>
              </div>
              <div>
                <span className="description-color">By:</span>{" "}
                {row.user ? row.user["username"] : "N/A"}
                <span className="description-color">
                  | &nbsp;{formatDate(row.created_at ? row.created_at : "")}
                </span>
              </div>
            </div>
            <div className="hr-remark"></div>
          </>
        ))
      ) : null}
    </div>
  );
}

export default Remarks;
