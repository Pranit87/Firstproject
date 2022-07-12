import React from "react";
import SubmitPopup from "./SubmitPopup";
import { getSubmittedList, getResumeDetails } from "../../Services/jobsService";
import { useParams, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { clicktocal } from "../Common/GotoConnectCall.js";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { SendSms } from "../../Services/candidateServices";
import { EyeFill, PlusCircleFill } from "react-bootstrap-icons";
import { Notification } from "../Common/Notification/Notification";
import AddRemark from "../Common/addRemark";
// import clicktocallLog from "../Common/callLog";
import ActionBar from "./Sourced/ActionBar";
import { convertDateStringToLocalDatetime } from "../Common/DateConverter";
import GotoLoadingModal from "../Common/GotoCallingNotification";

function Submitted(props) {
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState([]);
  const [resumeDetails, setResumeDetails] = React.useState();
  const [resumeLoading, setResumeLoading] = React.useState(false);
  const [totalPage, setTotalPage] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [error, setError] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(-1);
  const [showSMSDialog, setShowSMSDialog] = React.useState(false);
  const [smsInfo, setSmsInfo] = React.useState({
    from: "",
    to: "",
    userKey: "",
  });
  const [show, setShow] = React.useState(false);
  const [clickedRow, setClickedRow] = React.useState(null);
  const [confirmationDialog, setConfirmationDialog] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [resumeUrl, setResumeUrl] = React.useState();
  const [callLoading, setCallLoading] = React.useState(false);
  const [callDialogData, setCallDialogData] = React.useState(null);

  const { jobId } = useParams();

  const profile = localStorage.getItem("profile");

  React.useEffect(() => {
    if (jobId || props.reloadInterview) {
      getSubmittedList(jobId, page, setSubmitted, setTotalPage, setLoading);
    }
  }, [jobId, page, props.reloadInterview]);

  let pageClickHandler;

  const handlePageClick = (data) => {
    clearTimeout(pageClickHandler);
    pageClickHandler = setTimeout(() => {
      setPage(parseInt(data.selected) + 1);
      setSelectedRow(-1);
      setResumeDetails("");
    }, 300);
  };

  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);

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
        <div className="row">
          <div className="col-lg-8">
            <div className="tableWrapper">
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
                  type="SUBMITTED"
                  show={show}
                  setReloadInterview={props.setReloadInterview}
                  reloadInterview={props.reloadInterview}
                />
              )}
              <table className="table table-hover change-table-hover-color-sourced h6">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col" className="py-2">
                      Full Name
                    </th>
                    <th scope="col" className="py-2">
                      Bill Rate
                    </th>
                    <th scope="col" className="py-2">
                      Pay Rate
                    </th>
                    <th
                      style={{ minWidth: "100px" }}
                      scope="col"
                      className="py-2"
                    >
                      Date
                    </th>
                    <th scope="col" className="py-2">
                      Status
                    </th>
                    <th scope="col" className="py-2">
                      Recruiters
                    </th>
                    <th
                      style={{ minWidth: "150px" }}
                      scope="col"
                      className="py-2"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-color-submit-tab">
                  {loading && (
                    <tr className="loader">
                      <td colSpan="7" className="text-center">
                        <div class="spinner-border text-dark" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {!loading &&
                    submitted.map((row, index) => (
                      <tr
                        key={index}
                        className={selectedRow === index && "selectedRow"}
                      >
                        <td className="py-2">
                          <Link
                            to={`/candidates/${row.resume_id}/${jobId || 0}`}
                            target="_blank"
                          >
                            {row.candidate_name}
                          </Link>
                        </td>
                        <td className="py-2">{row.bill_rate}</td>
                        <td className="py-2">{row.pay_rate}</td>
                        <td className="py-2">
                          {row.scheduled_date &&
                            convertDateStringToLocalDatetime(
                              row.scheduled_date.split(" ")[0].replace(`"`, "")
                            ).toLocaleDateString()}
                        </td>
                        <td className="py-2">
                          {" "}
                          <a
                            href="/"
                            data-toggle="modal"
                            data-target="#changeStatus"
                            onClick={(e) => {
                              setShow(true);
                              setClickedRow(row);
                            }}
                          >
                            {row.label}
                          </a>
                        </td>
                        <td className="py-2">{row.recruiter_name}</td>
                        <td className="py-2">
                          {row.resume_phone ? (
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="button-tooltip-2">
                                  Call Candidate
                                </Tooltip>
                              }
                            >
                              <span
                                onClick={() => {
                                  setCallDialogData(row.candidate_name);
                                  setCallLoading(true);
                                  clicktocal(
                                    row.resume_phone,
                                    JSON.parse(profile)["externalUserID"]
                                  );
                                  handleCalling();
                                  // clicktocallLog(
                                  //   JSON.parse(profile)["mobile"],
                                  //   data.resume_phone,
                                  //   data.resume_id,
                                  //   data.resume_requirement_map_id,
                                  //   data.requirement_id
                                  // );
                                }}
                              >
                                <img src="/images/call-small.png" alt="Call" />
                              </span>
                            </OverlayTrigger>
                          ) : (
                            <span className="text-decoration-none isDisabled">
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    Call Candidate
                                  </Tooltip>
                                }
                              >
                                <img src="/images/call-small.png" alt="" />
                              </OverlayTrigger>
                            </span>
                          )}
                          &nbsp; &nbsp;
                          {row.resume_phone ? (
                            <a
                              href="/"
                              onClick={(event) => {
                                event.preventDefault();
                                setSmsInfo({
                                  from: JSON.parse(profile)["mobile"],
                                  to: row.resume_phone,
                                  userKey:
                                    JSON.parse(profile)["externalUserID"],
                                });
                                setShowSMSDialog(true);
                              }}
                            >
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    SMS Candidate
                                  </Tooltip>
                                }
                              >
                                <img src="/images/text-small.png" alt="" />
                              </OverlayTrigger>
                            </a>
                          ) : (
                            <span className="text-decoration-none isDisabled">
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    SMS Candidate
                                  </Tooltip>
                                }
                              >
                                <img src="/images/text-small.png" alt="" />
                              </OverlayTrigger>
                            </span>
                          )}
                          <a
                            href="/"
                            onClick={(event) => {
                              event.preventDefault();
                              getResumeDetails(
                                row.resume_id,
                                setResumeDetails,
                                setResumeLoading,
                                setError,
                                setResumeUrl
                              );
                              setSelectedRow(index);
                            }}
                          >
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="button-tooltip-2">
                                  View Candidate Resume
                                </Tooltip>
                              }
                            >
                              <EyeFill className="viewResumeIcon" />
                            </OverlayTrigger>
                          </a>
                          <a
                            href="/"
                            onClick={(event) => {
                              event.preventDefault();
                              setConfirmationDialog(true);
                              setData(row.resume_id);
                            }}
                          >
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="button-tooltip-2">
                                  Add Remark
                                </Tooltip>
                              }
                            >
                              <PlusCircleFill className="viewResumeIcon" />
                            </OverlayTrigger>
                          </a>
                        </td>
                      </tr>
                    ))}
                  {!loading && !submitted.length && (
                    <tr className="loader">
                      <td colSpan="7" className="text-center">
                        No records available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {totalPage > 1 && (
              <div className="pt-2 d-flex justify-content-end">
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
          <div className="col-lg-4 scroll-job-details font">
            <div className="pt-2 resumeWrapper">
              {resumeLoading ? (
                <div className="noResume">
                  <div class="spinner-border text-dark" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  {resumeDetails && <ActionBar resumeURl={resumeUrl} />}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(resumeDetails),
                    }}
                  />
                </>
              )}

              <div className="noResume">
                {!resumeLoading &&
                  !resumeDetails &&
                  selectedRow === -1 &&
                  "Click on a record to preview resume."}
                {error && <div className="noResume">{error}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

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
        <div class="text-secondary feedback">
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

export default Submitted;
