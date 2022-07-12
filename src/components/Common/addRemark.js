import React from "react";
import { Modal, Form } from "react-bootstrap";
import { Notification } from "./Notification/Notification";
import { Formik } from "formik";
import {
  getDropDownOptions,
  postRemarkData,
} from "../../Services/dropdownServices";
import { getRequirementDetails } from "../../Services/candidateServices";

export const AddRemark = ({
  confirmationDialog,
  setConfirmationDialog,
  rowData,
  jobId,
}) => {
  const profile = localStorage.getItem("profile");
  const [options, setOptions] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });

  //Dropdown for Comment Type ------------------------------
  React.useEffect(() => {
    getDropDownOptions(setOptions, setLoading);
  }, [setOptions]);

  // Call API to get requirement data -------------------
  React.useEffect(() => {
    getRequirementDetails(jobId, setData);
  }, [jobId]);

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
    if (rowData) {
      setRemarkInitialValue({
        requirementId: data && data.job_id ? data.job_id : null,
        requirementTitle: data && data.job_title ? data.job_title : null,
        remark: "",
        remarkTypeValue: "Candidate Job Send Outs",
        remarkType: "1",
        candidateId: rowData,
        userId: JSON.parse(profile)["id"],
      });
    }
  }, [profile, rowData, data]);

  return (
    <Modal
      show={confirmationDialog}
      onHide={() => {
        setConfirmationDialog(false);
      }}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header>Add Remark</Modal.Header>
      <Modal.Body>
        <div class="rounded font mx-lg-n3 px-3 mb-lg-0 mb-4">
          {notify.show && <Notification {...notify} />}
          <Formik
            initialValues={remarkInitialValue}
            enableReinitialize={true}
            validationSchema={null}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              let editRemarkFormValues = Object.assign([], values);

              // ** Remove values from object which are null and empty (As requested by API end point) **
              Object.keys(editRemarkFormValues).forEach(
                (key) =>
                  (editRemarkFormValues[key] === null ||
                    editRemarkFormValues[key] === "" ||
                    (typeof editRemarkFormValues[key] === "object" &&
                      Object.keys(editRemarkFormValues[key]).length === 0)) &&
                  delete editRemarkFormValues[key]
              );

              postRemarkData(
                editRemarkFormValues,
                resetForm,
                setNotify,
                setSubmitting
              );
              setSubmitting(true);
            }}
          >
            {(props) => {
              const { values, handleSubmit, handleReset, isSubmitting } = props;
              return loading ? (
                <div className="loadingRemark px-3 pb-2">
                  <div colSpan="6" className="text-center">
                    <div class="spinner-border text-dark" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <div className="pb-2 custom-font-size-remark">
                    <div>Requirement/Job ID</div>
                    <input
                      type="text"
                      className="font-weight-bold remark-input"
                      name="requirementId"
                      id="requirementId"
                      value={values.requirementId || ""}
                      disabled
                    />
                    <div className="pt-4">Requirement/Job Title</div>
                    <input
                      type="text"
                      autoComplete="off"
                      className="font-weight-bold remark-input"
                      name="requirementTitle"
                      id="requirementTitle"
                      value={values.requirementTitle || ""}
                      disabled
                    />
                  </div>
                  <div class="text-secondary custom-font-size-remark">
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
                        return <option value={item.id}>{item.value}</option>;
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
                      onClick={handleSubmit}
                      class="btn btn-sm text-white px-5 bg-color-save mr-2"
                      disabled={values.remark === "" || isSubmitting}
                    >
                      {!isSubmitting ? "Save" : "Saving..."}
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary btn-sm px-5 mr-2"
                      onClick={handleReset}
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
                        setConfirmationDialog(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddRemark;
