import React from "react";
import SubmitPopup from "../SubmitPopup";
import {
  getSourcedList,
  getResumeDetails,
  postChangeStatus,
} from "../../../Services/jobsService";
import { useParams, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { clicktocal } from "../../Common/GotoConnectCall.js";
import { OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import { EyeFill, PlusCircleFill } from "react-bootstrap-icons";
import SMSDialog from "./SMSDialog";
import MailMergeDialog from "./MailMergeDialog";
import ActionBar from "./ActionBar";
import BulkEmail from "../../Resumes/BulkEmail";
import "../jobDetails.css";
import AddRemark from "../../Common/addRemark";
// import clicktocallLog from "../../Common/callLog";
import { convertDateStringToLocalDatetime } from "../../Common/DateConverter";
import GotoLoadingModal from "../../Common/GotoCallingNotification";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { interviewTypes } from "../../../constants";
import { format } from "date-fns";

const Sourced = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [sourced, setSourced] = React.useState([]);
  const [resumeDetails, setResumeDetails] = React.useState();
  const [resumeLoading, setResumeLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [selectedRow, setSelectedRow] = React.useState(-1);
  const [show, setShow] = React.useState(false);
  const [clickedRow, setClickedRow] = React.useState(null);
  const [showSMSDialog, setShowSMSDialog] = React.useState(false);
  const [smsInfo, setSmsInfo] = React.useState({
    from: "",
    to: "",
    userKey: "",
  });
  const [checkAll, setCheckAll] = React.useState(false);
  const [mailMergeList, setMailMergeList] = React.useState([]);
  const [initialMailMergeList, setInitialMailMergeList] = React.useState([]);
  const [showMailMergeDialog, setShowMailMergeDialog] = React.useState(false);
  const [requisitionId, setRequisitionId] = React.useState();
  const [openBulkEmail, setOpenBulkEmail] = React.useState(false);
  const [bulkEmailResumeIds, setBulkEmailResumeIds] = React.useState([]);
  const [resumeUrl, setResumeUrl] = React.useState();
  const [data, setData] = React.useState(null);
  const [filters, setFilters] = React.useState({
    candidateName: "",
    recruiterName: "",
  });
  const [confirmationDialog, setConfirmationDialog] = React.useState(false);
  const [callLoading, setCallLoading] = React.useState(false);
  const [callDialogData, setCallDialogData] = React.useState(null);

  const { jobId } = useParams();

  const profile = localStorage.getItem("profile");

  React.useEffect(() => {
    if (jobId || props.reloadInterview) {
      getSourcedList(
        jobId,
        page,
        setSourced,
        setTotalPage,
        setLoading,
        setError,
        setInitialMailMergeList,
        setRequisitionId,
        filters
      );
    }
  }, [jobId, page, props.reloadInterview, filters]);

  let pageClickHandler, fullNameTimer, recruiterTimer;

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

  const handleShortlisted = (data) => {
    document
      .getElementById("qualify_row-" + data.resume_requirement_map_id)
      .setAttribute("class", "text-decoration-none isDisabled");

    let interview_type_code = null;
    if (data.interview_mode) {
      interview_type_code =
        data.interview_mode &&
        interviewTypes.filter(
          ({ label }) => label === data.interview_mode || ""
        );
    }
    const statusData = {
      status: "55",
      updatedAt: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      payRate: data.pay_rate || 0,
      billRate: data.bill_rate || 0,
      closingRemark: data.closing_remarks
        ? data.closing_remarks.replace(/&quot;/g, '"').replace(/&amp;/g, "&")
        : "",
      interviewScheduled:
        (data.interview_date &&
          format(new Date(data.interview_date), "yyyy-MM-dd'T'HH:mm")) ||
        "",
      resumeRequirementMapId: data.resume_requirement_map_id,
      authorId: JSON.parse(profile)["id"],
      interview_type:
        (interview_type_code &&
          interview_type_code[0] &&
          interview_type_code[0]["value"]) ||
        "",
      onDate: "",
    };

    var FormData = require("form-data");
    var formData = new FormData();
    formData.append(
      "resumeRequirementMapId",
      statusData.resumeRequirementMapId
    );
    formData.append("status", statusData.status);
    formData.append("payRate", statusData.payRate);
    formData.append("billRate", statusData.billRate);
    formData.append("updatedAt", statusData.updatedAt);
    formData.append("closingRemark", statusData.closingRemark);
    formData.append("authorId", statusData.authorId);
    formData.append("interviewTime", statusData.interviewScheduled || "");
    formData.append("interview_type", statusData.interview_type || "");
    formData.append("onDate", statusData.onDate || "");

    postChangeStatus(
      formData,
      props.setReloadInterview,
      props.reloadInterview,
      setShow
    );
  };

  return (
    <div className="bg-white py-4 mx-4 font">
      <div className="row">
        <div className="col-lg-8">
          <div className="tableWrapper">
            <BulkEmail
              open={openBulkEmail}
              closeLikedProfiles={(e) => setShowMailMergeDialog(false)}
              close={(e) => setOpenBulkEmail(false)}
              reqId={jobId}
              resumeIds={bulkEmailResumeIds.map((row) => row.resume_id)}
              jobTitle={props.jobTitle}
              jobLocation={props.location}
            />
            {callLoading && (
              <GotoLoadingModal
                callLoading={callLoading}
                setCallLoading={setCallLoading}
                callDialogData={callDialogData}
              />
            )}
            <SMSDialog
              show={showSMSDialog}
              setShowSMSDialog={setShowSMSDialog}
              smsInfo={smsInfo}
            />
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
                type="SOURCED"
                show={show}
                setReloadInterview={props.setReloadInterview}
                reloadInterview={props.reloadInterview}
              />
            )}
            {showMailMergeDialog && (
              <MailMergeDialog
                showMailMergeDialog={showMailMergeDialog}
                setShowMailMergeDialog={setShowMailMergeDialog}
                senderList={mailMergeList}
                requisitionId={requisitionId}
                setOpenBulkEmail={setOpenBulkEmail}
                setBulkEmailResumeIds={setBulkEmailResumeIds}
              />
            )}
            <table className="table table-hover change-table-hover-color-sourced h6">
              <thead className="thead-dark">
                <tr>
                  <th className="py-2">
                    {" "}
                    {sourced.length > 0 && (
                      <Form.Check
                        type="checkbox"
                        onChange={(event) => {
                          setCheckAll(event.target.checked);
                          event.target.checked
                            ? setMailMergeList(initialMailMergeList)
                            : setMailMergeList([]);
                        }}
                      />
                    )}
                  </th>
                  <th scope="col" className="py-2">
                    Full Name
                  </th>
                  <th scope="col" className="py-2">
                    Date
                  </th>
                  <th scope="col" className="py-2">
                    Status
                  </th>
                  <th scope="col" className="py-2">
                    Recruiters
                  </th>
                  <th scope="col" className="py-2">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-color-submit-tab">
                <tr className={"selectedRow"}>
                  <td colSpan="1"></td>
                  <td colSpan="1">
                    <input
                      type="search"
                      placeholder="Search Full Name"
                      className="form-control"
                      onChange={(event) => {
                        const value = event.target.value;
                        clearTimeout(fullNameTimer);
                        fullNameTimer = setTimeout(() => {
                          setFilters({
                            ...filters,
                            candidateName: value,
                          });
                          setPage(1);
                        }, 1200);
                      }}
                    />
                  </td>
                  <td colSpan="1"></td>
                  <td colSpan="1"></td>
                  <td colSpan="1">
                    <input
                      type="search"
                      placeholder="Search Recruiter"
                      className="form-control"
                      onChange={(event) => {
                        const value = event.target.value;
                        clearTimeout(recruiterTimer);
                        recruiterTimer = setTimeout(() => {
                          setFilters({
                            ...filters,
                            recruiterName: value,
                          });
                          setPage(1);
                        }, 1200);
                      }}
                    />
                  </td>
                  <td colSpan="1"></td>
                </tr>
                {loading ? (
                  <tr className="loader">
                    <td colSpan="6" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  sourced.map((row, index) => (
                    <tr
                      key={index}
                      className={selectedRow === index && "selectedRow"}
                    >
                      <td className="py-2">
                        {" "}
                        <Form.Check
                          type="checkbox"
                          checked={checkAll || undefined}
                          onChange={(event) => {
                            event.target.checked
                              ? setMailMergeList([
                                  ...mailMergeList,
                                  row.resume_id,
                                ])
                              : setMailMergeList(
                                  mailMergeList.filter(
                                    (value) => value !== row.resume_id
                                  )
                                );
                          }}
                        />
                      </td>
                      <td className="py-2" style={{ cursor: "pointer" }}>
                        <Link
                          to={`/candidates/${row.resume_id}/${jobId || 0}`}
                          target="_blank"
                        >
                          {row.candidate_name}
                        </Link>
                      </td>
                      <td className="py-2">
                        {row.sourced_date &&
                          convertDateStringToLocalDatetime(
                            row.sourced_date.split(" ")[0]
                          ).toLocaleDateString()}
                      </td>
                      <td className="py-2">
                        {" "}
                        <a
                          href="/"
                          data-toggle="modal"
                          data-target="#changeStatusSourced"
                          onClick={(e) => {
                            setShow(true);
                            setClickedRow(row);
                          }}
                        >
                          Sourced
                          {/* {show && clickedRow === row ? (
                      <SourcedPopup
                        data={row}
                        setShow={setShow}
                        type="SOURCED"
                      />
                    ) : null} */}
                        </a>
                      </td>
                      <td className="py-2">{row.recruiter_name}</td>
                      <td className="py-2">
                        <span
                          id={"qualify_row-" + row.resume_requirement_map_id}
                        >
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="button-tooltip-2">
                                Qualify Candidate
                              </Tooltip>
                            }
                          >
                            <BsHandThumbsUpFill
                              className="viewThumbsUpIcon"
                              fill="dimgray"
                              onClick={() => handleShortlisted(row)}
                            />
                          </OverlayTrigger>
                        </span>
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
                                userKey: JSON.parse(profile)["externalUserID"],
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
                  ))
                )}
                {!loading && !sourced.length && (
                  <tr className="loader">
                    <td colSpan="6" className="text-center">
                      No records available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div
              className={`pt-2 d-flex justify-content-end mr-4 ${
                loading && "invisible"
              }`}
            >
              {totalPage > 1 && (
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
              )}
            </div>
          </div>
          {sourced.length > 0 && (
            <button
              disabled={mailMergeList.length === 0}
              type="button"
              className="btn btn-sm text-white px-4 py-2 mt-1 b-color-search-description"
              onClick={() => setShowMailMergeDialog(true)}
            >
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    {mailMergeList.length === 0
                      ? "Select candidates from the list above to send email."
                      : "Click to send emails to selected candidates."}
                  </Tooltip>
                }
              >
                <span className="h6">Mail Merge</span>
              </OverlayTrigger>
            </button>
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
                "Click on an eye icon to view resume of corresponding candidate."}
              {error && <div className="noResume">{JSON.stringify(error)}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sourced;
