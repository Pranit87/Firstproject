import React from "react";
import { getOffers } from "../../Services/jobsService";
import ReactPaginate from "react-paginate";
import { clicktocal } from "../Common/GotoConnectCall.js";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SMSDialog from "../JobDetails/Sourced/SMSDialog";
import BulkEmail from "../Resumes/BulkEmail";
import SubmitPopup from "./SubmitPopup";
import { Link } from "react-router-dom";
import AddRemark from "../Common/addRemark";
import { PlusCircleFill } from "react-bootstrap-icons";
// import clicktocallLog from "../Common/callLog";
import GotoLoadingModal from "../Common/GotoCallingNotification";

function Offers(props) {
  const [loading, setLoading] = React.useState(false);
  const [offers, setOffers] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [smsInfo, setSmsInfo] = React.useState({
    from: "",
    to: "",
    userKey: "",
  });
  const [showSMSDialog, setShowSMSDialog] = React.useState(false);
  const [openBulkEmail, setOpenBulkEmail] = React.useState(false);
  const [bulkResumeId, setEmailResumeId] = React.useState([]);
  const [, setShowLikedProfiles] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [clickedRow, setClickedRow] = React.useState(null);
  const [confirmationDialog, setConfirmationDialog] = React.useState(false);
  const [rowData, setRowData] = React.useState(null);
  const [callLoading, setCallLoading] = React.useState(false);
  const [callDialogData, setCallDialogData] = React.useState(null);
  // Call to get job details API
  React.useEffect(() => {
    getOffers(props.jobId, page, setOffers, setTotalPage, setLoading);
  }, [props.jobId, page, props.reloadInterview]);

  const profile = localStorage.getItem("profile");

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
    (loading && (
      <div class="spinner-border spinnerCentered" role="status"></div>
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
        <BulkEmail
          open={openBulkEmail}
          closeLikedProfiles={(e) => setShowLikedProfiles(false)}
          close={(e) => setOpenBulkEmail(false)}
          reqId={props.jobId}
          resumeIds={bulkResumeId}
          jobTitle={props.jobTitle}
          jobLocation={props.location}
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
        <AddRemark
          confirmationDialog={confirmationDialog}
          setConfirmationDialog={setConfirmationDialog}
          rowData={rowData}
          jobId={props.jobId}
        />
        <div className="pb-5 pt-3 px-3">
          <table className="table table-hover h6">
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
              {offers.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="py-2">
                      <Link
                        to={`/candidates/${data.resumeId}/${props.jobId || 0}`}
                        target="_blank"
                      >
                        {data.name}
                      </Link>
                    </td>
                    <td className="py-2">{data.bill_rate}</td>
                    <td className="py-2">{data.pay_rate}</td>
                    <td className="py-2">
                      {data.status === "Offer Accepted" ||
                      data.status === "Offer Extended" ||
                      data.status === "Background Initiated" ? (
                        <a
                          href="/"
                          data-toggle="modal"
                          data-target="#changeStatus"
                          onClick={(e) => {
                            setShow(true);
                            setClickedRow(data);
                          }}
                        >
                          {data.status.charAt(0).toUpperCase() +
                            data.status.slice(1)}
                        </a>
                      ) : (
                        data.status.charAt(0).toUpperCase() +
                        data.status.slice(1)
                      )}
                    </td>
                    <td className="py-2">{data.username}</td>
                    <td className="py-2">
                      {data.resume_phone ? (
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
                              setCallDialogData(data.name);
                              setCallLoading(true);
                              clicktocal(
                                data.resume_phone,
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
                      {data.resumeId ? (
                        <a
                          href="/"
                          onClick={(event) => {
                            event.preventDefault();
                            setEmailResumeId([data.resumeId]);
                            setOpenBulkEmail(true);
                          }}
                        >
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="button-tooltip-2">
                                Mail Candidate
                              </Tooltip>
                            }
                          >
                            <img src="/images/email-small.png" alt="" />
                          </OverlayTrigger>
                        </a>
                      ) : (
                        <span className="text-decoration-none isDisabled">
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="button-tooltip-2">
                                Mail Candidate
                              </Tooltip>
                            }
                          >
                            <img src="/images/email-small.png" alt="" />
                          </OverlayTrigger>
                        </span>
                      )}
                      &nbsp; &nbsp;
                      {data.resume_phone ? (
                        <a
                          href="/"
                          onClick={(event) => {
                            event.preventDefault();
                            setSmsInfo({
                              from: JSON.parse(profile)["mobile"],
                              to: data.resume_phone,
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
                          setConfirmationDialog(true);
                          setRowData(data.resumeId);
                        }}
                      >
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="button-tooltip-2">Add Remark</Tooltip>
                          }
                        >
                          <PlusCircleFill className="viewResumeIcon" />
                        </OverlayTrigger>
                      </a>
                    </td>
                  </tr>
                );
              })}
              {!loading && !offers.length && (
                <tr>
                  <td colSpan="6" className="text-center">
                    No records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
        <div className="py-5"></div>
        <div className="py-5"></div>
        <div className="py-5"></div>
      </>
    )
  );
}

export default Offers;
