import React from "react";
import { getAllInterviews } from "../../Services/jobsService";
import { useParams, Link } from "react-router-dom";
import { clicktocal } from "../Common/GotoConnectCall.js";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { SendSms } from "../../Services/candidateServices";
import SubmitPopup from "./SubmitPopup";
import ReactPaginate from "react-paginate";
import { PlusCircleFill } from "react-bootstrap-icons";
import AddRemark from "../Common/addRemark";
// import clicktocallLog from "../Common/callLog";
import GotoLoadingModal from "../Common/GotoCallingNotification";

const Interview = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [, setError] = React.useState(null);
  const [interviews, setInterviews] = React.useState([]);
  const [showSMSDialog, setShowSMSDialog] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [smsInfo, setSmsInfo] = React.useState({
    from: "",
    to: "",
    userKey: "",
  });
  const [show, setShow] = React.useState(false);
  const [clickedRow, setClickedRow] = React.useState(null);
  const [confirmationDialog, setConfirmationDialog] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [callLoading, setCallLoading] = React.useState(false);
  const [callDialogData, setCallDialogData] = React.useState(null);

  const { jobId } = useParams();

  const profile = localStorage.getItem("profile");

  React.useEffect(() => {
    if (jobId || props.reloadInterview) {
      getAllInterviews(
        jobId,
        setInterviews,
        setLoading,
        setError,
        page,
        setTotalPage
      );
    }
  }, [jobId, props.reloadInterview, page]);

  let pageClickHandler;

  const handlePageClick = (data) => {
    clearTimeout(pageClickHandler);
    pageClickHandler = setTimeout(() => {
      setPage(parseInt(data.selected) + 1);
    }, 300);
  };

  let calling;
  const handleCalling = (data) => {
    clearTimeout(calling);
    calling = setTimeout(() => {
      setCallLoading(false);
    }, 10000);
  };

  return (
    <>
      <div className="bg-white py-4 mx-4 font">
        <SMSDialog
          show={showSMSDialog}
          setShowSMSDialog={setShowSMSDialog}
          smsInfo={smsInfo}
        />
        {callLoading && (
          <GotoLoadingModal
            callLoading={callLoading}
            setCallLoading={setCallLoading}
            callDialogData={callDialogData}
          />
        )}
        <AddRemark
          confirmationDialog={confirmationDialog}
          setConfirmationDialog={setConfirmationDialog}
          rowData={data}
          jobId={jobId}
        />
        {show && (
          <SubmitPopup
            data={clickedRow}
            setShow={setShow}
            type={clickedRow.status_code}
            show={show}
            setReloadInterview={props.setReloadInterview}
            reloadInterview={props.reloadInterview}
          />
        )}
        {loading && (
          <div className="h6 text-center">
            <div className="spinner-border text-dark text-center" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {!loading && !interviews.length && (
          <div className="text-center fixedContainer">
            No records available.
          </div>
        )}
        <div className="row">
          {!loading &&
            interviews.map((row) => (
              <div className="cardWrapper">
                <div className="card shadow rounded">
                  <div className="card-header bg-white">
                    <div className="row">
                      <div className="col-3">
                        <img
                          src="/images/profile-photo.png"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                      <div className="col-7">
                        <div className="text-primary h5">
                          {row.candidate_name}
                        </div>
                        <div className="h6">{row.job_title}</div>
                        <div className="h6">{row.interview_date}</div>
                      </div>
                      <div className="col-2">
                        <div className="dropdown">
                          <img
                            src="/images/nav-icon.png"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            data-display="static"
                            alt=""
                          />
                          <div
                            className="dropdown-menu dropdown-menu-right"
                            aria-labelledby="dropdownMenu2"
                          >
                            {row.candidate_contact ? (
                              <>
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  onClick={() => {
                                    setCallDialogData(row.candidate_name);
                                    setCallLoading(true);
                                    clicktocal(
                                      row.candidate_contact,
                                      JSON.parse(profile)["externalUserID"]
                                    );
                                    handleCalling();
                                    // clicktocallLog(
                                    //   JSON.parse(profile)["mobile"],
                                    //   row.candidate_contact,
                                    //   row.resume_id,
                                    //   row.resume_requirement_map_id,
                                    //   row.requirement_id
                                    // );
                                  }}
                                >
                                  <img src="/images/call-small.png" alt="" />
                                  &nbsp; Call
                                </button>
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  onClick={() => {
                                    setSmsInfo({
                                      from: JSON.parse(profile)["mobile"],
                                      to: row.candidate_contact,
                                      userKey:
                                        JSON.parse(profile)["externalUserID"],
                                    });
                                    setShowSMSDialog(true);
                                  }}
                                >
                                  <img src="/images/text-small.png" alt="" />
                                  &nbsp; Text
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="dropdown-item isDisabled"
                                  type="button"
                                  disabled
                                >
                                  <img src="/images/call-small.png" alt="" />
                                  &nbsp; Call
                                </button>
                                <button
                                  className="dropdown-item isDisabled"
                                  type="button"
                                  disabled
                                >
                                  <img src="/images/text-small.png" alt="" />
                                  &nbsp; Text
                                </button>
                              </>
                            )}
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() => {
                                setConfirmationDialog(true);
                                setData(row.resume_id);
                              }}
                            >
                              <PlusCircleFill className="viewResumeIcon" />
                              &nbsp; Add Remark
                            </button>
                            {row.interview_status ===
                            "Rejected After Interview" ? null : (
                              <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => {
                                  setShow(true);
                                  setClickedRow(row);
                                }}
                              >
                                <img src="/images/change-status.png" alt="" />
                                &nbsp; Change status
                              </button>
                            )}
                          </div>
                        </div>
                        <Link
                          to={`/candidates/${row.resume_id}/${jobId || 0}`}
                          target="_blank"
                        >
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="button-tooltip-2">
                                View Candidate Profile
                              </Tooltip>
                            }
                          >
                            <img
                              src="/images/resume-icon.png"
                              className="mt-2"
                              alt="resume"
                            />
                          </OverlayTrigger>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div className="h6 font-weight-bold">
                        {row.interview_status}
                      </div>
                      <div className="h5 font-weight-bold">
                        {row.interview_mode &&
                          row.interview_mode !== "N/A" &&
                          row.interview_mode}
                      </div>
                    </div>
                    <div className="d-flex justify-content-start mt-2">
                      <div>
                        <div className="h6 font-weight-bold">Scheduler</div>
                        <div>{row.recruiter_name}</div>
                      </div>
                      <div className="ml-5">
                        <div className="h6 font-weight-bold">Location</div>
                        <div>{row.candidate_location}</div>
                      </div>
                    </div>
                    <div className="h6 font-weight-bold mt-2">Details</div>
                    <div>{row.interview_info}</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {totalPage > 1 && (
          <div className="px-3 py-2 d-flex justify-content-end">
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
          </div>
        )}
      </div>
    </>
  );
};

const SMSDialog = ({ show, setShowSMSDialog, smsInfo }) => {
  const [message, setMessage] = React.useState("");
  const [remainingCharacters, setRemainingCharacters] = React.useState(160);
  const [submitting, setSubmitting] = React.useState(false);

  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });

  const sms = new FormData();
  sms.append("ownerPhoneNumber", smsInfo.from);
  sms.append("contactPhoneNumbers", smsInfo.to);
  sms.append("body", message);
  sms.append("userKey", smsInfo.userKey);

  const send = () => {
    setNotify({
      show: false,
      description: "",
      type: "",
    });
    SendSms(sms, setNotify, setSubmitting, setMessage);
    clearFields();
  };

  const clearFields = () => {
    setRemainingCharacters(160);
  };

  return (
    <Modal show={show} onHide={() => setShowSMSDialog(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Send SMS</Modal.Title>
      </Modal.Header>
      {notify.show && <Notification {...notify} />}
      <Modal.Body>
        <textarea
          maxlength="160"
          name="message"
          className="form-control resize-custom"
          cols="80"
          rows="4"
          drop-disable
          ondragstart="return false"
          ondrop="return false"
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          onInput={(event) => {
            setRemainingCharacters(160 - event.target.value.length);
          }}
          value={message}
          disabled={submitting}
        ></textarea>
        <div className="text-secondary feedback">
          Characters remaining {remainingCharacters}, only alphabets & numbers
          allowed.
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShowSMSDialog(false);
            setNotify({
              show: false,
              description: "",
              type: "",
            });
          }}
        >
          Close
        </Button>
        <Button
          variant="primary"
          disabled={message.length === 0 || submitting}
          onClick={() => send()}
        >
          {!submitting ? "Send" : "Sending..."}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Notification = ({ show, type, description }) =>
  show && (
    <div
      className={`alert alert-${type} alert-dismissible fade show`}
      role="alert"
    >
      {description}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );

export default Interview;
