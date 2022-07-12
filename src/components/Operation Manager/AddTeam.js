/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number    Developer       Description
 * -----------------------------------------------------------------
 * 22-Oct-2020    -    TEAMS_HTML_STABLE                  Esha Joshi      Created
 *
 *
 *
 *********************************************************************/
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import { getTeamLeadOptions, postTeam } from "../../Services/teamsServices";
import { Notification } from "../Common/Notification/Notification";

function AddTeam(props) {
  const [show, setShow] = useState(false);
  const [teamLeadOptions, setTeamLeadOptions] = React.useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });

  const [formDataResponse, setFormDataResponse] = React.useState({
    submissionsWeekly: "",
    submissionsMonthly: "",
    submissionsQuarterly: "",
    interviewsWeekly: "",
    interviewsMonthly: "",
    interviewsQuarterly: "",
    offersWeekly: "",
    offersMonthly: "",
    offersQuarterly: "",
    startWeekly: "",
    startMonthly: "",
    startQuarterly: "",
    gpmWeekly: "",
    gpmMonthly: "",
    gpmQuarterly: "",
    teamLead: "",
  });

  const validationSchema = Yup.object().shape({
    teamLead: Yup.string().required(),
    submissionsWeekly: Yup.number().required().min(0),
    submissionsMonthly: Yup.number().required().min(0),
    submissionsQuarterly: Yup.number().required().min(0),
    interviewsWeekly: Yup.number().required().min(0),
    interviewsMonthly: Yup.number().required().min(0),
    interviewsQuarterly: Yup.number().required().min(0),
    offersWeekly: Yup.number().required().min(0),
    offersMonthly: Yup.number().required().min(0),
    offersQuarterly: Yup.number().required().min(0),
    startWeekly: Yup.number().required().min(0),
    startMonthly: Yup.number().required().min(0),
    startQuarterly: Yup.number().required().min(0),
    gpmWeekly: Yup.number().required().min(0),
    gpmMonthly: Yup.number().required().min(0),
    gpmQuarterly: Yup.number().required().min(0),
  });

  React.useEffect(() => {
    getTeamLeadOptions(setNotify,setTeamLeadOptions);
    setFormDataResponse({
      teamLead: "",
      submissionsWeekly: "",
      submissionsMonthly: "",
      submissionsQuarterly: "",
      interviewsWeekly: "",
      interviewsMonthly: "",
      interviewsQuarterly: "",
      offersWeekly: "",
      offersMonthly: "",
      offersQuarterly: "",
      startWeekly: "",
      startMonthly: "",
      startQuarterly: "",
      gpmWeekly: "",
      gpmMonthly: "",
      gpmQuarterly: "",
    });
  }, []);

  return (
    <Formik
      initialValues={formDataResponse}
      enableReinitialize={true}
      // Hooks up our validationSchema to Formik
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        const recruiterData = localStorage.getItem("profile");
        const userId = JSON.parse(recruiterData)["id"];
        var targetData = new FormData();
        targetData.append("operationManagerId", userId);
        targetData.append("submissionsWeekly", values.submissionsWeekly);
        targetData.append("submissionsMonthly", values.submissionsMonthly);
        targetData.append("submissionsQuarterly", values.submissionsQuarterly);
        targetData.append("interviewsWeekly", values.interviewsWeekly);
        targetData.append("interviewsMonthly", values.interviewsMonthly);
        targetData.append("interviewsQuarterly", values.interviewsQuarterly);
        targetData.append("offersWeekly", values.offersWeekly);
        targetData.append("offersMonthly", values.offersMonthly);
        targetData.append("offersQuarterly", values.offersQuarterly);
        targetData.append("startWeekly", values.startWeekly);
        targetData.append("startMonthly", values.startMonthly);
        targetData.append("startQuarterly", values.startQuarterly);
        targetData.append("gpmWeekly", values.gpmWeekly);
        targetData.append("gpmMonthly", values.gpmMonthly);
        targetData.append("gpmQuarterly", values.gpmQuarterly);

        postTeam(
          targetData,
          values.teamLead,
          setShow,
          props.setRefresh,
          props.refresh
        );
      }}
      validationSchema={validationSchema}
    >
      {/* Callback function containing Formik state and helpers that handle common form actions */}
      {({ values, handleSubmit, dirty, isValid, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Button
            variant="primary"
            className="btn btn-warning btn-lg font-weight-bold px-4 my-4"
            onClick={handleShow}
          >
            Add Team
          </Button>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header className="message-popup-custom text-white">
              <Modal.Title>Add Team</Modal.Title>
            </Modal.Header>
            <Notification {...notify} />
            <Modal.Body>
              <select
                name="add-member"
                className="form-control my-2"
                onChange={(e, value) => {
                  setFieldValue("teamLead", e.target.value);
                }}
              >
                <option hidden disabled selected value className="py-4">
                  Select Team Lead
                </option>
                {teamLeadOptions &&
                  teamLeadOptions.map(function (item, index) {
                    return <option value={item.id}>{item.username}</option>;
                  })}
              </select>
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">TARGETS</th>
                    <th scope="col">Weekly</th>
                    <th scope="col">Monthly</th>
                    <th scope="col">Quarterly</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="add-team-table-bg-color">
                    <th scope="row">Submissions</th>
                    <td>
                      <Field
                        type="text"
                        name="submissionsWeekly"
                        id="submissionsWeekly"
                        value={values.submissionsWeekly}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <Field
                        type="text"
                        name="submissionsMonthly"
                        id="submissionsMonthly"
                        value={values.submissionsMonthly}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <Field
                        type="text"
                        name="submissionsQuarterly"
                        id="submissionsQuarterly"
                        value={values.submissionsQuarterly}
                        className="form-control"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Interviews</th>
                    <td>
                      <Field
                        type="text"
                        name="interviewsWeekly"
                        value={values.interviewsWeekly}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <Field
                        type="text"
                        name="interviewsMonthly"
                        value={values.interviewsMonthly}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <Field
                        type="text"
                        name="interviewsQuarterly"
                        value={values.interviewsQuarterly}
                        className="form-control"
                      />
                    </td>
                  </tr>
                  <tr className="add-team-table-bg-color">
                    <th scope="row">Offers</th>
                    <td>
                      <Field
                        type="text"
                        name="offersWeekly"
                        value={values.offersWeekly}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <Field
                        type="text"
                        name="offersMonthly"
                        value={values.offersMonthly}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <Field
                        type="text"
                        name="offersQuarterly"
                        value={values.offersQuarterly}
                        className="form-control"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Start</th>
                    <td>
                      <Field
                        type="text"
                        name="startWeekly"
                        value={values.startWeekly}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <Field
                        type="text"
                        name="startMonthly"
                        value={values.startMonthly}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <Field
                        type="text"
                        name="startQuarterly"
                        value={values.startQuarterly}
                        className="form-control"
                      />
                    </td>
                  </tr>
                  <tr className="add-team-table-bg-color">
                    <th scope="row">GPM</th>
                    <td>
                      <Field
                        type="text"
                        name="gpmWeekly"
                        value={values.gpmWeekly}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <Field
                        type="text"
                        name="gpmMonthly"
                        value={values.gpmMonthly}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <Field
                        type="text"
                        name="gpmQuarterly"
                        value={values.gpmQuarterly}
                        className="form-control"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer className="pagination justify-content-start">
              <Button
                variant="primary"
                className="px-4"
                onClick={handleSubmit}
                disabled={!dirty || !isValid || values.teamLead === ""}
              >
                Save
              </Button>
              <Button
                variant="secondary"
                className="px-4"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      )}
    </Formik>
  );
}

export default AddTeam;
