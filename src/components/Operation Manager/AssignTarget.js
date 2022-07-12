import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { getTargets, putTeam } from "../../Services/teamsServices";

function AssignTarget(props) {
  // console.log(props.targets[0].submissionsweekly);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [submissionWeekly, setSubmissionWeekly] = React.useState("");

  const [submissionMonthly, setSubmissionMonthly] = React.useState("");
  const [submissionQuarterly, setSubmissionQuarterly] = React.useState("");

  const [interviewsWeekly, setInterviewsWeekly] = React.useState("");
  const [interviewsMonthly, setInterviewsMonthly] = React.useState("");
  const [interviewsQuarterly, setInterviewsQuarterly] = React.useState("");

  const [offersWeekly, setOffersWeekly] = React.useState("");
  const [offersMonthly, setOffersMonthly] = React.useState("");
  const [offersQuarterly, setOffersQuarterly] = React.useState("");

  const [startWeekly, setStartWeekly] = React.useState("");
  const [startMonthly, setStartMonthly] = React.useState("");
  const [startQuarterly, setStartQuarterly] = React.useState("");

  const [gpmWeekly, setGpmWeekly] = React.useState("");
  const [gpmMonthly, setGpmMonthly] = React.useState("");
  const [gpmQuarterly, setGpmQuarterly] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const [assignTargetDisable, setAssignTargetDisable] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  function showAlert() {
    document.getElementById("broadcast-success").classList.remove("d-none");
    console.log(document.getElementById("broadcast-success"));
  }
  function showFailureAlert() {
    document.getElementById("broadcast-failure").classList.remove("d-none");
    console.log(document.getElementById("broadcast-failure"));
  }

  React.useEffect(() => {
    setAssignTargetDisable(true);
    if (props.show) {
      getTargets(
        setLoading,
        setSubmissionWeekly,
        setSubmissionMonthly,
        setSubmissionQuarterly,
        setInterviewsWeekly,
        setInterviewsMonthly,
        setInterviewsQuarterly,
        setOffersWeekly,
        setOffersMonthly,
        setOffersQuarterly,
        setStartWeekly,
        setStartMonthly,
        setStartQuarterly,
        setGpmWeekly,
        setGpmMonthly,
        setGpmQuarterly,
        props.leadId
      );
    }
  }, [props.leadId, props.show]);

  const clearFields = () => {
    setSubmissionWeekly("");
    setSubmissionMonthly("");
    setSubmissionQuarterly("");

    setInterviewsWeekly("");
    setInterviewsMonthly("");
    setInterviewsQuarterly("");

    setOffersWeekly("");
    setOffersMonthly("");
    setOffersQuarterly("");

    setStartWeekly("");
    setStartMonthly("");
    setStartQuarterly("");

    setGpmWeekly("");
    setGpmMonthly("");
    setGpmQuarterly("");

    props.setCloseAssignTarget();
  };

  const Targets = async (e) => {
    e.preventDefault();

    const recruiterData = localStorage.getItem("profile");
    const userId = JSON.parse(recruiterData)["id"];

    const targetData = {
      operationManagerId: userId,
      submissionsWeekly: submissionWeekly,
      submissionsMonthly: submissionMonthly,
      submissionsQuarterly: submissionQuarterly,
      interviewsWeekly: interviewsWeekly,
      interviewsMonthly: interviewsMonthly,
      interviewsQuarterly: interviewsQuarterly,
      offersWeekly: offersWeekly,
      offersMonthly: offersMonthly,
      offersQuarterly: offersQuarterly,
      startWeekly: startWeekly,
      startMonthly: startMonthly,
      startQuarterly: startQuarterly,
      gpmWeekly: gpmWeekly,
      gpmMonthly: gpmMonthly,
      gpmQuarterly: gpmQuarterly,
    };

    putTeam(
      targetData,
      props.leadId,
      props.setCloseAssignTarget,
      setIsLoading,
      showAlert,
      showFailureAlert
    );
  };

  const updateSubmissionWeekly = (e) => {
    setSubmissionWeekly(e.target.value);
    e.target.value !== "" && setAssignTargetDisable(false);
    e.target.value === "" && setAssignTargetDisable(true);
    // console.log(submissionWeekly);
  };
  const updateSubmissionMonthly = (e) => {
    setSubmissionMonthly(e.target.value);
    e.target.value !== "" && setAssignTargetDisable(false);
    e.target.value === "" && setAssignTargetDisable(true);
  };
  const updateSubmissionQuarterly = (e) => {
    setSubmissionQuarterly(e.target.value);
    e.target.value !== "" && setAssignTargetDisable(false);
    e.target.value === "" && setAssignTargetDisable(true);
  };

  const updateInterviewsWeekly = (e) => {
    setInterviewsWeekly(e.target.value);
    e.target.value !== "" && setAssignTargetDisable(false);
    e.target.value === "" && setAssignTargetDisable(true);
  };
  const updateInterviewsMonthly = (e) => {
    setInterviewsMonthly(e.target.value);
    e.target.value !== "" && setAssignTargetDisable(false);
    e.target.value === "" && setAssignTargetDisable(true);
  };
  const updateInterviewsQuarterly = (e) => {
    setInterviewsQuarterly(e.target.value);
    e.target.value !== "" && setAssignTargetDisable(false);
    e.target.value === "" && setAssignTargetDisable(true);
  };

  const updateOffersWeekly = (e) => {
    setOffersWeekly(e.target.value);
    e.target.value !== "" && setAssignTargetDisable(false);
    e.target.value === "" && setAssignTargetDisable(true);
  };
  const updateOffersMonthly = (e) => {
    setOffersMonthly(e.target.value);
    e.target.value !== "" && setAssignTargetDisable(false);
    e.target.value === "" && setAssignTargetDisable(true);
  };
  const updateOffersQuarterly = (e) => {
    setOffersQuarterly(e.target.value);
    e.target.value !== "" && setAssignTargetDisable(false);
    e.target.value === "" && setAssignTargetDisable(true);
  };

  const updateStartWeekly = (e) => {
    setStartWeekly(e.target.value);
    e.target.value !== "" && setAssignTargetDisable(false);
    e.target.value === "" && setAssignTargetDisable(true);
  };
  const updateStartMonthly = (e) => {
    setStartMonthly(e.target.value);
    e.target.value !== "" && setAssignTargetDisable(false);
    e.target.value === "" && setAssignTargetDisable(true);
  };
  const updateStartQuarterly = (e) => {
    setStartQuarterly(e.target.value);
    e.target.value !== "" && setAssignTargetDisable(false);
    e.target.value === "" && setAssignTargetDisable(true);
  };

  const updateGpmWeekly = (e) => {
    setGpmWeekly(e.target.value);
    e.target.value !== "" && setAssignTargetDisable(false);
    e.target.value === "" && setAssignTargetDisable(true);
  };
  const updateGpmMonthly = (e) => {
    setGpmMonthly(e.target.value);
    e.target.value !== "" && setAssignTargetDisable(false);
    e.target.value === "" && setAssignTargetDisable(true);
  };
  const updateGpmQuarterly = (e) => {
    setGpmQuarterly(e.target.value);
    e.target.value !== "" && setAssignTargetDisable(false);
    e.target.value === "" && setAssignTargetDisable(true);
  };

  return (
    <>
      <form>
        <Modal
          show={props.show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header className="message-popup-custom text-white">
            <Modal.Title>Assign Target</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {(loading && (
              <div class="spinner-border spinnerCentered" role="status"></div>
            )) || (
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
                      <input
                        type="number"
                        className="form-control"
                        onChange={updateSubmissionWeekly}
                        value={submissionWeekly}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        onChange={updateSubmissionMonthly}
                        value={submissionMonthly}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        onChange={updateSubmissionQuarterly}
                        value={submissionQuarterly}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Interviews</th>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        onChange={updateInterviewsWeekly}
                        value={interviewsWeekly}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        onChange={updateInterviewsMonthly}
                        value={interviewsMonthly}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        onChange={updateInterviewsQuarterly}
                        value={interviewsQuarterly}
                      />
                    </td>
                  </tr>
                  <tr className="add-team-table-bg-color">
                    <th scope="row">Offers</th>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        onChange={updateOffersWeekly}
                        value={offersWeekly}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        onChange={updateOffersMonthly}
                        value={offersMonthly}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        onChange={updateOffersQuarterly}
                        value={offersQuarterly}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Start</th>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        onChange={updateStartWeekly}
                        value={startWeekly}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        onChange={updateStartMonthly}
                        value={startMonthly}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        onChange={updateStartQuarterly}
                        value={startQuarterly}
                      />
                    </td>
                  </tr>
                  <tr className="add-team-table-bg-color">
                    <th scope="row">GPM</th>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        onChange={updateGpmWeekly}
                        value={gpmWeekly}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        onChange={updateGpmMonthly}
                        value={gpmMonthly}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        onChange={updateGpmQuarterly}
                        value={gpmQuarterly}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </Modal.Body>
          <Modal.Footer className="pagination justify-content-start">
            {isLoading ? (
              <Button
                variant="primary"
                className="px-4"
                onClick={(e) => Targets(e)}
                disabled={assignTargetDisable}
              >
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ml-1">Assigning Target</span>
              </Button>
            ) : (
              <Button
                variant="primary"
                className="px-4"
                onClick={(e) => Targets(e)}
                disabled={assignTargetDisable}
              >
                Assign Target
              </Button>
            )}

            <Button variant="secondary" className="px-4" onClick={clearFields}>
              Cancel
            </Button>
            <div
              className="alert alert-success alert-dismissible fade show mt-3 mx-5 d-none"
              role="alert"
              id="broadcast-success"
            >
              Records inserted!
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="alert alert-danger alert-dismissible fade show mt-3 mx-5 d-none"
              role="alert"
              id="broadcast-failure"
            >
              Records not inserted!
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
}

export default AssignTarget;
