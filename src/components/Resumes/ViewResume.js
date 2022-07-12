import React from "react";
import { Link } from "react-router-dom";
import {
  Modal,
  Container,
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
  Button,
  Form,
} from "react-bootstrap";
import {
  getRequirementDetails,
  postRemarkData,
  getResume,
  postShortlistCandidate,
} from "../../Services/candidateServices";
import { getDropDownOptions } from "../../Services/dropdownServices";
import Highlighter from "react-highlight-words";
import BulkEmail from "./BulkEmail";
import LikedProfiles from "./LikedProfiles";
import "./viewResume.css";
import * as Icon from "react-bootstrap-icons";
import formatDate from "../Common/formatDate";
import parseSearchString from "../Common/parseSearchString";
import { clicktocal } from "../Common/GotoConnectCall.js";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import { useUsers } from "../../Services/usersService";
import AccessDenied from "../Common/AccessDenied/AccessDenied";
import { SendSms } from "../../Services/candidateServices";
import { Notification } from "../Common/Notification/Notification";
import { encrypt } from "../Common/encDec";
import isJSON from "is-json";
import clicktocallLog from "../Common/callLog";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import GotoLoadingModal from "../Common/GotoCallingNotification";

const ViewResume = (props) => {
  const [resumeData, setResumeData] = React.useState(null);
  const [resumeHtmlData, setResumeHtmlData] = React.useState(null);
  const [resumeRemarksData, setResumeRemarksData] = React.useState(null);
  const { string, id, dbOrApi } = props.match.params;
  const [openLoading, setSpinnerLoading] = React.useState(false);
  const [spinnerLoading, setOpenLoading] = React.useState(false);
  const [alertLoading, setAlertLoading] = React.useState(false);
  const [, setVcareData] = React.useState(null);
  const [, setHistoryData] = React.useState(null);
  const [, setStatusData] = React.useState(null);
  const [options, setOptions] = React.useState(null);
  const [data, setData] = React.useState(null);
  const splitString = parseSearchString(string);
  const [, setRemarkRespone] = React.useState(null);
  const [remarkCount, setRemarkCount] = React.useState(0);
  const profile = localStorage.getItem("profile");
  const { reqId } = props.match.params;
  const [showLikedProfiles, setShowLikedProfiles] = React.useState(false);
  const [liked, setLiked] = React.useState();
  const { sourceType, reqUniqueId } = useParams();
  const [openBulkEmail, setOpenBulkEmail] = React.useState(false);
  const [resumeIds, setResumeIds] = React.useState([]);
  const [, setLoadings] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [remarkLoading, setRemarkLoading] = React.useState(false);
  const [showSMSDialog, setShowSMSDialog] = React.useState(false);
  const [smsInfo, setSmsInfo] = React.useState({
    from: "",
    to: "",
    userKey: "",
  });
  const [error, setError] = React.useState();
  const [loopCount, setLoopCount] = React.useState(0);
  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });
  const [callLoading, setCallLoading] = React.useState(false);
  const [callDialogData, setCallDialogData] = React.useState(null);

  const windows = new JSDOM("").window;
  const DOMPurify = createDOMPurify(windows);

  /**
   * Highlight keywords inside a DOM element
   * @param {string} elem Element to search for keywords in
   * @param {string[]} keywords Keywords to highlight
   * @param {boolean} caseSensitive Differenciate between capital and lowercase letters
   * @param {string} cls Class to apply to the highlighted keyword
   */
  const highlight = (
    elem,
    keywords,
    caseSensitive = true,
    cls = "highlight"
  ) => {
    const flags = caseSensitive ? "gi" : "g";
    // Sort longer matches first to avoid
    // highlighting keywords within keywords.
    keywords.sort((a, b) => b.length - a.length);
    Array.from(elem.childNodes).forEach((child) => {
      const keywordRegex = RegExp(keywords.join("|"), flags);
      if (child.nodeType !== 3) {
        // not a text node
        highlight(child, keywords, caseSensitive, cls);
      } else if (keywordRegex.test(child.textContent)) {
        const frag = document.createDocumentFragment();
        let lastIdx = 0;
        child.textContent.replace(keywordRegex, (match, idx) => {
          const part = document.createTextNode(
            child.textContent.slice(lastIdx, idx)
          );
          const highlighted = document.createElement("span");
          highlighted.textContent = match;
          highlighted.classList.add(cls);
          frag.appendChild(part);
          frag.appendChild(highlighted);
          lastIdx = idx + match.length;
        });
        const end = document.createTextNode(child.textContent.slice(lastIdx));
        frag.appendChild(end);
        child.parentNode.replaceChild(frag, child);
      }
    });
  };

  React.useEffect(() => {
    if (resumeHtmlData && string !== " ") {
      highlight(document.getElementById("inputText"), splitString);
    }
  }, [resumeHtmlData]);

  // Call API to get requirement data -------------------
  React.useEffect(() => {
    getRequirementDetails(reqId, setData);
  }, [reqId]);

  //Dropdown for Comment Type ------------------------------
  React.useEffect(() => {
    getDropDownOptions(setOptions, setLoading);
  }, [setOptions]);

  //Call API to get data for candidate --------------------------------------
  React.useEffect(() => {
    getResume(
      id,
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
        sourcingFor: sourceType,
        dbOrApi,
      },
      setResumeRemarksData,
      setRemarkLoading,
      setError,
      setResumeHtmlData
    );
  }, [id]);

  // React.useEffect(() => {
  //   getCandidateRemarkDetails(id, setResumeRemarksData, setRemarkLoading);
  // }, [id, remarkCount]);

  const getResumeDetails = () => {
    setLoopCount((value) => value + 1);
    getResume(
      id,
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
        sourcingFor: sourceType,
        dbOrApi,
      },
      setResumeRemarksData,
      setRemarkLoading,
      setError,
      setResumeHtmlData
    );
  };

  React.useEffect(() => {
    // clear timeout, if got data.
    if (
      resumeData &&
      resumeData.is_resumefile_available &&
      resumeData.resumes_values
    ) {
      clearAllTimeouts();
      return;
    }
    // clear timeout, if don't have file available.
    if (
      resumeData &&
      resumeData.hasOwnProperty("is_resumefile_available") &&
      !parseInt(resumeData.is_resumefile_available) &&
      sourceType &&
      sourceType == "database"
    ) {
      clearAllTimeouts();
      return;
    }

    if (loopCount === 9) {
      clearAllTimeouts();
      setOpenLoading(false);
      setSpinnerLoading(false);
      setLoadings(false);
      setRemarkLoading(false);
      return;
    }

    if (resumeData && !resumeData.resumes_values) {
      if (resumeData.hasOwnProperty("is_resumefile_available")) {
        if (Boolean(!parseInt(resumeData.is_resumefile_available))) {
          clearAllTimeouts();
          setTimeout(getResumeDetails, 5000);
        }
      } else {
        clearAllTimeouts();
        setTimeout(getResumeDetails, 5000);
      }
    }
  }, [resumeData]);

  // Use Effect to call function to set Liked Profiles in cookie
  React.useEffect(() => {
    if (liked !== undefined) {
      setLikedProfilesList();
    }
  }, [liked]);

  // React.useEffect(() => {
  //   if (resumeData) {
  //     setLiked(false);
  //     setLikedProfilesList();
  //     // setLocalLikedprofileList();
  //   }
  // }, [resumeData]);
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

  const [likedRefresh, setLikedRefresh] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      setRemarkInitialValue({
        requirementId: data && data.job_id ? data.job_id : null,
        requirementTitle: data && data.job_title ? data.job_title : null,
        remark: "",
        remarkTypeValue: "Candidate Job Send Outs",
        remarkType: "1",
        candidateId: id,
        userId: JSON.parse(profile)["id"],
      });
    }
  }, [id, data, remarkCount]);
  // Like click handler
  const handleLikeClick = (e) => {
    setLiked(!liked);
  };
  const setLikedProfilesList = () => {
    const localString =
      localStorage.getItem(encrypt(string + "," + reqId)) &&
      localStorage.getItem(encrypt(string + "," + reqId)).split(";");
    var existingLikedProfiles = [];
    //check if cookie exist
    if (localString && localString.length) {
      const likedProfiles = localString.find((row) => row);
      if (isJSON(likedProfiles)) {
        existingLikedProfiles = [
          ...existingLikedProfiles,
          ...JSON.parse(likedProfiles),
        ];
      }
      localStorage.setItem(
        encrypt(string + "," + reqId),
        JSON.stringify(existingLikedProfiles)
      );
    }
    // Check if current profile is liked or not
    if (liked) {
      let addNewProfiles = existingLikedProfiles.filter(
        (item) => item.email !== resumeData.email
      );
      addNewProfiles.push({
        name: resumeData.name,
        email: resumeData.email,
        sourceType: sourceType,
        resumeId: resumeData.id,
      });
      localStorage.setItem(
        encrypt(string + "," + reqId),
        JSON.stringify(addNewProfiles)
      );
    } else {
      if (existingLikedProfiles.length) {
        const remainingProfiles =
          resumeData &&
          existingLikedProfiles.filter(
            (item) => item.email !== resumeData.email
          );
        localStorage.setItem(
          encrypt(string + "," + reqId),
          JSON.stringify(remainingProfiles)
        );
      } else {
        localStorage.removeItem(encrypt(string + "," + reqId));
      }
    }
  };

  const closeLikedProfiles = () => {
    setShowLikedProfiles(false);
  };

  const onClickHandler = (e) => {
    window.open(
      `${process.env.REACT_APP_S3_BUCKET}${resumeData.resume_path}`,
      "_blank"
    );
  };

  const { currentUser } = useUsers();
  const { permissions } = currentUser;

  let calling;
  const handleCalling = (data) => {
    clearTimeout(calling);
    calling = setTimeout(() => {
      setCallLoading(false);
    }, 10000);
  };

  const handleShortlistCandidate = (rowData) => {
    postShortlistCandidate(
      id,
      {
        requirementId: reqUniqueId,
        sourcingFor: sourceType,
        dbOrApi,
      },
      rowData
    );
  };
  return (
    (Object.keys(permissions).length &&
      !permissions.VIEW_OPEN_RESUME_IN_NEW_TAB && <AccessDenied />) || (
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
        <div className="inner font py-2 m-4 text-white rounded-lg shadow name-bg-color-custom">
          {openLoading && resumeData && !Object.keys(resumeData).length && (
            <div colSpan="6" className="text-center">
              <div class="spinner-border text-dark" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          )}
          {resumeData && (
            <div className="d-lg-flex justify-content-between px-3 py-1">
              <div className="ml-lg-0 ml-n2">
                {/* <i className="fa fa-angle-left fa-lg"></i> &nbsp; &nbsp; &nbsp;{" "} */}
                {resumeData.name}
              </div>
              <div className="ml-lg-0 ml-4">{resumeData.mobile}</div>
              <div className="ml-lg-0 ml-4">{resumeData.email}</div>
            </div>
          )}
        </div>

        <div className="row no-gutters">
          <div className="col-lg-7 ml-lg-4 mt-2 px-3 px-lg-0">
            <Container>
              <Row>
                {!error && (
                  <Col className={"leftIcon"}>
                    {resumeData && resumeData.mobile && (
                      <span className={"span-right"}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">
                              Call {resumeData && resumeData.name}
                            </Tooltip>
                          }
                        >
                          <span
                            onClick={() => {
                              setCallDialogData(resumeData.name);
                              setCallLoading(true);
                              clicktocal(
                                resumeData.mobile,
                                JSON.parse(profile)["externalUserID"]
                              );
                              handleCalling();
                              // clicktocallLog(
                              //   JSON.parse(profile)["mobile"],
                              //   resumeData.mobile,
                              //   resumeData.id,
                              //   reqUniqueId
                              // );
                            }}
                          >
                            <Icon.TelephoneFill size="25px" fill="white" />
                          </span>
                        </OverlayTrigger>
                      </span>
                    )}
                    {resumeData && resumeData.mobile && (
                      <span className={"span-right"}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">
                              Message {resumeData && resumeData.name}
                            </Tooltip>
                          }
                        >
                          <a
                            href="/"
                            onClick={(event) => {
                              event.preventDefault();
                              setSmsInfo({
                                from: JSON.parse(profile)["mobile"] || "",
                                to: resumeData.mobile,
                                userKey: JSON.parse(profile)["externalUserID"],
                              });
                              setShowSMSDialog(true);
                            }}
                          >
                            <Icon.ChatLeftDotsFill size="25px" fill="white" />
                          </a>
                        </OverlayTrigger>
                      </span>
                    )}
                    {reqId !== "0" && resumeData && (
                      <span className={"span-right"}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">
                              Email {resumeData && resumeData.name}
                            </Tooltip>
                          }
                        >
                          <a
                            href="/"
                            onClick={(event) => {
                              event.preventDefault();
                              setOpenBulkEmail(true);
                              setResumeIds([resumeData.id]);
                            }}
                          >
                            <Icon.EnvelopeFill
                              size="25px"
                              fill="white"
                              data-toggle="modal"
                              data-target="#send-email-popup"
                            />
                          </a>
                        </OverlayTrigger>
                      </span>
                    )}
                    {!(
                      resumeData &&
                      resumeData.resumes_values &&
                      resumeData.hasOwnProperty("is_resumefile_available") &&
                      parseInt(resumeData.is_resumefile_available)
                    ) || (
                      <span className={"span-right"}>
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
                              color="white"
                            />
                          </Link>
                        </OverlayTrigger>
                      </span>
                    )}
                  </Col>
                )}

                {reqId !== "0" && resumeData && (
                  <Col className={"rightIcon"}>
                    <span className={"span-left"}>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip id="button-tooltip-2">Like</Tooltip>}
                      >
                        <Icon.HandThumbsUp
                          id="thumbs up"
                          size="25px"
                          fontSize="bold"
                          color={(liked && "yellow") || "white"}
                          onClick={(e) => {
                            handleLikeClick(e);
                            handleShortlistCandidate(resumeData);
                          }}
                        />
                      </OverlayTrigger>
                    </span>
                    <span className={"span-left"}>
                      <Icon.ThreeDotsVertical
                        size="25px"
                        fontSize="bold"
                        color="white"
                        onClick={(e) => {
                          setShowLikedProfiles(true);
                          setLikedRefresh(!likedRefresh);
                        }}
                      />
                      <LikedProfiles
                        show={showLikedProfiles}
                        showBulkEmail={setOpenBulkEmail}
                        closeLikedProfiles={closeLikedProfiles}
                        reqId={reqId}
                        reqUniqueId={reqUniqueId}
                        setResumeIds={setResumeIds}
                        string={string + "," + reqId}
                        likedRefresh={likedRefresh}
                      />
                      <BulkEmail
                        open={openBulkEmail}
                        closeLikedProfiles={(e) => setShowLikedProfiles(false)}
                        close={(e) => setOpenBulkEmail(false)}
                        reqId={reqId}
                        resumeIds={resumeIds}
                        jobTitle={data && data.job_title}
                        jobLocation={data && data.location}
                        string={string + "," + reqId}
                        setResumeIds={setResumeIds}
                      />
                    </span>
                  </Col>
                )}
              </Row>
            </Container>
            <div
              className="inner bg-white font rounded-lg shadow"
              style={{
                padding: "30px",
                marginTop: "15px",
              }}
            >
              {openLoading && (
                <div colSpan="6" className="text-center">
                  <div className="h5">
                    Resume is being processed. Please wait...
                  </div>
                  <div class="spinner-border text-dark" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              {sourceType && sourceType == "database"
                ? !openLoading &&
                  resumeData &&
                  resumeData.hasOwnProperty("is_resumefile_available") &&
                  !resumeData.resumes_values &&
                  !parseInt(resumeData.is_resumefile_available) && (
                    <div colSpan="6" className="text-center">
                      <div className="h5">Resume not available.</div>
                    </div>
                  )
                : !openLoading &&
                  resumeData &&
                  resumeData.hasOwnProperty("is_resumefile_available") &&
                  !resumeData.resumes_values &&
                  !parseInt(resumeData.is_resumefile_available) &&
                  loopCount == 9 && (
                    <div colSpan="6" className="text-center">
                      <div className="h5">Resume not available.</div>
                    </div>
                  )}
              {!openLoading &&
                resumeData &&
                !resumeData.hasOwnProperty("is_resumefile_available") &&
                loopCount === 9 && (
                  <div colSpan="6" className="text-center">
                    <div className="h5">Candidate not found.</div>
                  </div>
                )}
              {error && (
                <div className="text-center text-danger">
                  SERVICE ERROR: {error}
                </div>
              )}
              {!error && resumeHtmlData && (
                <div style={{ height: "842px", overflow: "auto" }}>
                  <div
                    id="inputText"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(resumeHtmlData),
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-4 ml-lg-5  px-3 px-lg-0">
            <div className="inner bg-white all-remarks rounded-lg shadow font py-2 mt-lg-5 mt-1 mx-lg-n3">
              <div className="text-primary font-weight-bold px-3 pb-2">
                All Remarks
              </div>

              {remarkLoading ? (
                <div className="loadingRemark px-3 pb-2">
                  <div colSpan="6" className="text-center">
                    <div class="spinner-border text-dark" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
              ) : resumeRemarksData ? (
                resumeRemarksData.map((row, index) => (
                  <React.Fragment key={index}>
                    <div className="hr-remarks py-1"></div>
                    <div className="custom-font-size-remark px-3">
                      <div>
                        <div className="font-weight-bold">
                          {row.action.match(/{([^}]+)}/)
                            ? JSON.parse(row.action)["remarks"]
                            : row.action}
                        </div>
                        <div>
                          <span>
                            <strong>Requirement ID: </strong>
                            {row.action.match(/{([^}]+)}/)
                              ? JSON.parse(row.action)["requirement_id"]
                              : "N/A"}{" "}
                            &nbsp;&nbsp;
                            <strong>Requirement Title: </strong>
                            {row.action.match(/{([^}]+)}/)
                              ? JSON.parse(row.action)["requirement_name"]
                              : "N/A"}{" "}
                            &nbsp;&nbsp;
                            <strong>Comment Type: </strong>
                            {row.action.match(/{([^}]+)}/)
                              ? JSON.parse(row.action)["remark_type_str"]
                              : "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-secondary">By:</span>
                          <span>
                            {row.user
                              ? row.user["username"]
                              : row.username
                              ? row.username
                              : "N/A"}
                          </span>
                          <span className="text-secondary">
                            {" "}
                            | &nbsp;
                            {formatDate(row.created_at ? row.created_at : "")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))
              ) : null}
            </div>

            <div className="inner bg-white rounded-lg shadow font pt-2 pb-3 mt-4 mx-lg-n3 px-3 mb-lg-0 mb-4">
              <div className="text-primary font-weight-bold pb-2">
                <Link className="h6" to="#">
                  <i className="fa fa-plus text-primary">
                    <span className="font font-weight-bold"> Add Remark</span>
                  </i>
                </Link>
              </div>
              <div className="hr-remarks py-2"></div>
              {loading ? (
                <div className="loadingRemark px-3 pb-2">
                  <div colSpan="6" className="text-center">
                    <div class="spinner-border text-dark" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
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
                          {notify.show && <Notification {...notify} />}
                          <div className="custom-font-size-remark">
                            <div>Requirement/Job ID</div>
                            <input
                              type="text"
                              className="font-weight-bold remark-input"
                              name="requirementId"
                              id="requirementId"
                              value={data ? data.job_id : null || ""}
                              onChange={handleChange}
                              disabled
                            />
                            <div className="pt-4">Requirement/Job Title</div>
                            <input
                              type="text"
                              autoComplete="off"
                              className="font-weight-bold remark-input"
                              name="requirementTitle"
                              id="requirementTitle"
                              value={data ? data.job_title : null || ""}
                              onChange={handleChange}
                              disabled
                            />
                          </div>
                          <div className="text-secondary pt-4 custom-font-size-remark">
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
                                  <option value={item.id} key={index}>
                                    {item.value}
                                  </option>
                                );
                              })}
                          </select>
                          <div className="text-secondary custom-font-size-remark pt-2">
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
                            className="form-control resize-custom"
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
                          <div className="pt-3">
                            <button
                              type="submit"
                              className="btn btn-sm text-white px-5 bg-color-save mr-2"
                              disabled={values.remark === "" || isSubmitting}
                              onClick={() =>
                                setNotify({
                                  show: false,
                                  description: "",
                                  type: "",
                                })
                              }
                            >
                              {!isSubmitting ? "Save" : "Saving..."}
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm px-5"
                              onClick={handleReset}
                            >
                              Reset
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
        </div>
      </>
    )
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

const clearAllTimeouts = () => {
  let id = window.setTimeout(function () {}, 0);
  while (id--) {
    window.clearTimeout(id);
  }
};

export default ViewResume;
