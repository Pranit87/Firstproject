import React, { useState } from "react";
import { Link } from "react-router-dom";
import Document from "./Document";
import History from "./History";
import Remarks from "./Remark";
import Vcare from "./Vcare";
import "./candidates.css";
import formatPhone from "../Common/formatPhone";
import formatDate from "../Common/formatDate";
import firstLetterUppercase from "../Common/firstLetterUppercase";
import {
  getCandidateResumeDetails,
  getCandidateRemarkDetails,
} from "../../Services/candidateServices";
import LoadingModal from "../Common/LoadingModal";
import { Modal, Button } from "react-bootstrap";
import { patchDeleteCandidateFromProfile } from "../../Services/dropdownServices";
import { useUsers } from "../../Services/usersService";
import AccessDenied from "../Common/AccessDenied/AccessDenied";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SMSDialog from "../JobDetails/Sourced/SMSDialog";
import { Notification } from "../Common/Notification/Notification";
import { clicktocal } from "../Common/GotoConnectCall.js";
// import clicktocallLog from "../Common/callLog";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import * as Icon from "react-bootstrap-icons";
import GotoLoadingModal from "../Common/GotoCallingNotification";

function Candidates(props) {
  const [isOpen, setisOpen] = useState(false);
  const { id, reqUniqueId } = props.match.params;
  const [resumeData, setResumeData] = React.useState(null);
  const [vcareData, setVcareData] = React.useState([]);
  const [historyData, setHistoryData] = React.useState(null);
  const [statusData, setStatusData] = React.useState(null);
  const [resumeRemarksData, setResumeRemarksData] = React.useState([]);
  const [openLoading, setSpinnerLoading] = React.useState(false);
  const [spinnerLoading, setOpenLoading] = React.useState(false);
  const [alertLoading, setAlertLoading] = React.useState(false);
  const [, setRemarkRespone] = React.useState(null);
  const [remarkCount, setRemarkCount] = React.useState(0);
  const [confirmationDialog, setConfirmationDialog] = React.useState(false);
  const [loadings, setLoadings] = React.useState(false);
  const [showSMSDialog, setShowSMSDialog] = React.useState(false);
  const [smsInfo, setSmsInfo] = React.useState({
    from: "",
    to: "",
    userKey: "",
  });
  const [remarkLoading, setRemarkLoading] = React.useState(false);
  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });
  const [htmlData, setHtmlData] = React.useState(null);
  const [callLoading, setCallLoading] = React.useState(false);
  const [callDialogData, setCallDialogData] = React.useState(null);

  const windows = new JSDOM("").window;
  const DOMPurify = createDOMPurify(windows);

  const profile = localStorage.getItem("profile");
  const { currentUser } = useUsers();
  const { permissions } = currentUser;

  const loaderTrigger = () => {
    setOpenLoading(!openLoading);
    setSpinnerLoading(!spinnerLoading);
  };

  function toggleResume(e) {
    setisOpen(!isOpen);
  }
  React.useEffect(() => {
    loaderTrigger();
    getCandidateResumeDetails(
      id,
      setHtmlData,
      setResumeData,
      setOpenLoading,
      setSpinnerLoading,
      setAlertLoading,
      setVcareData,
      setHistoryData,
      setStatusData,
      setLoadings,
      {
        requirementId: reqUniqueId,
        sourcingFor: "database",
        dbOrApi: 1,
      }
    );
  }, [id]);

  React.useEffect(() => {
    getCandidateRemarkDetails(id, setResumeRemarksData, setRemarkLoading);
  }, [id, remarkCount]);

  let file = "";
  let type = "";
  file = `${
    process.env.REACT_APP_S3_BUCKET +
    (resumeData && resumeData.resume_path ? resumeData.resume_path : "")
  }`;
  const getType = file.split(".");
  type = getType[getType.length - 1];

  React.useEffect(() => {
    setOpenLoading(false);
    setSpinnerLoading(false);
  }, [resumeData]);

  const AlertModal = ({ alertLoading }) => {
    return (
      <Modal show={alertLoading} size="sm">
        <Modal.Body>
          <div align="center" style={{ color: "red" }}>
            Error processing your request.
          </div>
          <div align="center" style={{ paddingTop: "15px" }}>
            <Button onClick={() => setAlertLoading(false)}>Ok</Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  function reloadIFrame() {
    if (resumeData) {
      const iframeObj = document.getElementById("iframeID");
      if (iframeObj) {
        const iframeDoc = iframeObj.contentDocument;
        if (iframeDoc !== null) {
          document.getElementById("iframeID").src =
            document.getElementById("iframeID").src;
        }
      }
    }
  }

  let pageClickHandler;
  clearTimeout(pageClickHandler);
  pageClickHandler = setTimeout(() => {
    reloadIFrame();
  }, 5000);

  const onClickHandler = (e) => {
    window.open(
      `${process.env.REACT_APP_S3_BUCKET}${resumeData.resume_path}`,
      "_blank"
    );
  };

  let calling;
  const handleCalling = (data) => {
    clearTimeout(calling);
    calling = setTimeout(() => {
      setCallLoading(false);
    }, 10000);
  };

  return (
    (Object.keys(permissions).length && !permissions.VIEW_CANDIDATE_PAGE && (
      <AccessDenied />
    )) || (
      <>
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
        <LoadingModal
          openLoading={openLoading}
          spinnerLoading={spinnerLoading}
        />
        <AlertModal alertLoading={alertLoading} />
        <div className="inner font py-4 mx-4 text-center text-white h4">
          <div className="row">
            <div className="col-lg">
              {resumeData && resumeData.name ? resumeData.name : null}
            </div>
            <div className="col-lg">
              {resumeData && resumeData.mobile ? (
                <span>
                  {formatPhone(resumeData.mobile)}
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        Call {resumeData && resumeData.name}
                      </Tooltip>
                    }
                  >
                    <span
                      className="ml-1 mr-1"
                      onClick={() => {
                        setCallDialogData(resumeData.name);
                        setCallLoading(true);
                        clicktocal(
                          resumeData.mobile,
                          JSON.parse(profile)["externalUserID"]
                        );
                        handleCalling();
                      }}
                    >
                      <img src="/images/call-icon-white.png" alt="Call" />
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        Message {resumeData && resumeData.name}
                      </Tooltip>
                    }
                  >
                    <a
                      className="text-decoration-none"
                      href="/"
                      onClick={(event) => {
                        event.preventDefault();
                        setSmsInfo({
                          from: JSON.parse(profile)["mobile"],
                          to: resumeData.mobile,
                          userKey: JSON.parse(profile)["externalUserID"],
                        });
                        setShowSMSDialog(true);
                      }}
                    >
                      <img src="/images/message-icon-white.png" alt="Message" />
                    </a>
                  </OverlayTrigger>
                </span>
              ) : null}
            </div>
            <div className="col-lg">
              {resumeData && resumeData.email ? resumeData.email : null}
            </div>
          </div>
        </div>

        {loadings ? (
          <div className="inner bg-white pt-4 pb-2 mx-4 rounded shadow font">
            <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-row">
                  <div className="ph-col-2 big"></div>
                  <div className="ph-col-1 empty"></div>
                  <div className="ph-col-2 big"></div>
                  <div className="ph-col-1 empty"></div>
                  <div className="ph-col-2 big"></div>
                  <div className="ph-col-1 empty"></div>
                  <div className="ph-col-2 big"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="inner bg-white py-3 mx-4 rounded shadow font">
            <div className="row description-font">
              <div className="col-lg border-right pl-lg-5 pb-lg-4 text-center text-lg-left">
                <span className="description-color">Visa: </span>
                <span className="ml-lg-5 pl-lg-5 font-weight-bold">
                  {resumeData && resumeData.visa ? resumeData.visa : "N/A"}
                </span>
              </div>

              <div className="col-lg border-right pl-lg-2 text-center text-lg-left">
                <span className="description-color">Rate: </span>
                <span className="ml-lg-3 pl-lg-5 font-weight-bold">
                  {resumeData && resumeData.rate
                    ? "$ " + resumeData.rate
                    : "N/A"}
                </span>
              </div>

              <div className="col-lg border-right pl-lg-2 text-center text-lg-left">
                <span className="description-color">Zip Code: </span>
                <span className="ml-lg-3 font-weight-bold">
                  {resumeData && resumeData.zipcode
                    ? resumeData.zipcode
                    : "N/A"}
                </span>
              </div>

              <div className="col-lg pl-lg-2 text-center text-lg-left">
                <span className="description-color">City: </span>
                <span className="ml-lg-3 pl-lg-2 font-weight-bold">
                  {resumeData && resumeData.city ? resumeData.city : "N/A"}
                </span>
              </div>
            </div>
            <div className="row description-font">
              <div className="col-lg border-right pl-lg-5 pb-lg-2 text-center text-lg-left">
                <span className="description-color">Last updated date: </span>
                <span className="ml-lg-3 font-weight-bold">
                  {resumeData && resumeData.last_resume_updated_date
                    ? formatDate(resumeData.last_resume_updated_date)
                    : "N/A"}
                </span>
              </div>

              <div className="col-lg border-right pl-lg-2 text-center text-lg-left">
                <span className="description-color">Experience: </span>
                <span className="ml-lg-3 font-weight-bold">
                  {resumeData && resumeData.experience_years
                    ? resumeData.experience_years + " Years"
                    : "N/A"}
                </span>
              </div>
              <div className="col-lg border-right pl-lg-2 text-center text-lg-left">
                <span className="description-color">Location: </span>
                <span className="ml-lg-3 font-weight-bold">
                  {resumeData && resumeData.location
                    ? resumeData.location
                    : "N/A"}
                </span>
              </div>
              <div className="col-lg pl-lg-2 text-center text-lg-left">
                <span className="description-color">State: </span>
                <span className="ml-lg-3 font-weight-bold">
                  {resumeData && resumeData.state ? resumeData.state : "N/A"}
                </span>
              </div>
            </div>
          </div>
        )}

        {loadings ? (
          <div className="bg-white my-4 py-4 mx-4 rounded shadow font">
            <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white my-4 py-4 mx-4 rounded shadow font">
            <div className="row pb-lg-2 pl-lg-0">
              <div className="col-lg-1 pl-5 description-color description-font">
                Skills:
              </div>

              <div className="col-lg-11 description-font px-5 pl-lg-0">
                <div className="pr-lg-5">
                  {firstLetterUppercase(
                    resumeData && resumeData.skills ? resumeData.skills : "N/A"
                  )}
                </div>
                {resumeData && (
                  <div className="py-3">
                    <a
                      href="#Resume"
                      className="pb-lg-2"
                      data-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="Resume"
                    >
                      <u className="font-weight-bold" onClick={toggleResume}>
                        {isOpen ? "Hide Resume" : "Show Resume"}{" "}
                        <i
                          className={
                            isOpen ? "fa fa-chevron-up" : "fa fa-chevron-down"
                          }
                        ></i>
                      </u>
                    </a>
                  </div>
                )}

                <div className="pr-5 font resume-font-size font-weight-bold">
                  {resumeData && (
                    <div id="Resume" className="collapse">
                      <div className="resume-scroll-custom">
                        {resumeData &&
                        htmlData &&
                        resumeData.resume_path.includes("txt") ? (
                          <div
                            style={{
                              overflow: "auto",
                              maxHeight: "100%",
                              border: "2px solid darkgrey",
                              padding: "8px",
                            }}
                          >
                            <div className={"float-right"}>
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    Download Resume
                                  </Tooltip>
                                }
                              >
                                <Link to="#" onClick={(e) => onClickHandler(e)}>
                                  <Icon.Download
                                    size="25px"
                                    fontSize="bold"
                                    color="black"
                                  />
                                </Link>
                              </OverlayTrigger>
                            </div>
                            <div
                              id="inputText"
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                  htmlData
                                    .replaceAll("<h2>", "<h5>")
                                    .replaceAll("</h2>", "</h5>")
                                    .replaceAll("<h1>", "<h5>")
                                    .replaceAll("</h1>", "</h5>")
                                ),
                              }}
                            />
                          </div>
                        ) : (
                          <div
                            style={{
                              position: "relative",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <iframe
                              title="Resume Viewer"
                              id="iframeID"
                              width="100%"
                              height="100%"
                              src={`https://docs.google.com/viewer?url=${
                                process.env.REACT_APP_S3_BUCKET
                              }${
                                resumeData && resumeData.resume_path
                                  ? resumeData.resume_path
                                  : ""
                              }&embedded=true`}
                            ></iframe>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {loadings ? (
          <div className="bg-white my-4 py-4 mx-4 rounded shadow font">
            <div className="ph-item">
              <div className="ph-col-12">
                <div className="ph-picture"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mx-4 my-4 rounded shadow">
              <ul className="nav nav-tabs rounded" role="tablist">
                {/* <li
            className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
            role="presentation"
            id="document-li"
          >
            <a
              className="nav-link text-white active show mx-2 px-5 font-weight-bolder"
              id="document-tab"
              data-toggle="tab"
              href="#document"
              role="tab"
              aria-controls="document"
              aria-selected="true"
            >
              Document
            </a>
          </li> */}
                <li
                  className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
                  role="presentation"
                  id="history-li"
                >
                  <a
                    className="nav-link text-white mx-2 active show px-5 font-weight-bolder"
                    id="history-tab"
                    data-toggle="tab"
                    href="#history"
                    role="tab"
                    aria-controls="history"
                    aria-selected="false"
                  >
                    History
                  </a>
                </li>
                <li
                  className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
                  role="presentation"
                  id="remarks-li"
                >
                  <a
                    className="nav-link text-white mx-2 px-5 font-weight-bolder"
                    id="remarks-tab"
                    data-toggle="tab"
                    href="#remarks"
                    role="tab"
                    aria-controls="remarks"
                    aria-selected="false"
                  >
                    Remarks
                  </a>
                </li>
                <li
                  className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
                  role="presentation"
                  id="vcare-li"
                >
                  <a
                    className="nav-link mx-2 px-5 text-white font-weight-bolder"
                    id="vcare-tab"
                    data-toggle="tab"
                    href="#vcare"
                    role="tab"
                    aria-controls="vcare"
                    aria-selected="false"
                  >
                    VCare
                  </a>
                </li>
              </ul>
              <div
                className="tab-content bg-white rounded history-font-size"
                id="myTabContent"
              >
                <div
                  className="tab-pane fade show active p-4"
                  id="history"
                  role="tabpanel"
                  aria-labelledby="history"
                >
                  {
                    <History
                      data={historyData}
                      id={id}
                      statusData={statusData}
                    />
                  }
                </div>
                {/* <div
            className="tab-pane fade show active"
            id="document"
            role="tabpanel"
            aria-labelledby="document"
          >
            {<Document />}
          </div> */}
                <div
                  className="tab-pane fade"
                  id="remarks"
                  role="tabpanel"
                  aria-labelledby="remarks"
                >
                  {
                    <Remarks
                      data={resumeRemarksData}
                      setRemarkCount={setRemarkCount}
                      remarkCount={remarkCount}
                      setRemarkRespone={setRemarkRespone}
                      props={props}
                      remarkLoading={remarkLoading}
                    />
                  }
                </div>
                <div
                  className="tab-pane fade"
                  id="vcare"
                  role="tabpanel"
                  aria-labelledby="vcare"
                >
                  {<Vcare data={vcareData} />}
                </div>
              </div>
            </div>

            <div className="inner font pt-3 pb-5 mb-5 text-center h4">
              <Link to={`/candidate/edit/${id}`}>
                <button className="btn btn-warning btn-lg font-weight-bold px-4 mr-2 mb-3 mb-lg-0">
                  UPDATE
                </button>
              </Link>

              <button
                className="btn btn-warning btn-lg font-weight-bold px-4 mx-1"
                onClick={() => {
                  setConfirmationDialog(true);
                  setNotify({
                    show: false,
                    description: "",
                    type: "",
                  });
                }}
              >
                DELETE
              </button>
              <Modal
                show={confirmationDialog}
                onHide={() => setConfirmationDialog(false)}
                backdrop="static"
                keyboard={false}
                centered
              >
                {notify.show && <Notification {...notify} />}
                <Modal.Body>
                  Are you sure you want to delete candidate{" "}
                  <strong>{resumeData && resumeData.name}</strong> ?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setConfirmationDialog(false)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    className="btn btn-danger"
                    onClick={() =>
                      patchDeleteCandidateFromProfile(
                        id,
                        JSON.parse(profile)["id"],
                        setConfirmationDialog,
                        setNotify
                      )
                    }
                  >
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </>
        )}
      </>
    )
  );
}
export default Candidates;
