import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Form,
  Modal,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "./search.css";
import * as Icon from "react-bootstrap-icons";
import {
  getDashboardResumeSearchData,
  getDashboardRequirementSearchData,
  postRemarkData,
  getDropDownOptions,
  patchDeleteCandidate,
} from "../../Services/dropdownServices";
import ShowMoreText from "react-show-more-text";
import { Formik } from "formik";
import { Notification } from "../Common/Notification/Notification";
import ReactPaginate from "react-paginate";
import SMSDialog from "../JobDetails/Sourced/SMSDialog";
import { clicktocal } from "../Common/GotoConnectCall.js";
import clicktocallLog from "../Common/callLog";
import GotoLoadingModal from "../Common/GotoCallingNotification";

const EnhancedResumeTableHead = () => {
  return (
    <thead className={"experience"}>
      <tr className={"text-black"}>
        <th scope="col" width="100">
          Full Name
        </th>
        <th scope="col" width="100">
          Contact
        </th>
        <th scope="col" width="100">
          Location
        </th>
        <th scope="col" width="300">
          Skills
        </th>
        <th scope="col" width="50">
          Experience
        </th>
        <th scope="col" width="170"></th>
      </tr>
    </thead>
  );
};

const EnhancedRequirementTableHead = () => {
  return (
    <thead className={"experience"}>
      <tr className={"text-black"}>
        <th scope="col" width="100">
          Type
        </th>
        <th scope="col" width="100">
          Client
        </th>
        <th scope="col" width="100">
          Job ID
        </th>
        <th scope="col" width="200">
          Job Title
        </th>
        <th scope="col" width="100">
          Location
        </th>
        <th scope="col" width="120"></th>
      </tr>
    </thead>
  );
};

export const Search = (props) => {
  const { string } = props.match.params;
  const [dashboardResumeData, setDashboardResumeData] = React.useState([]);
  const [dashboardRequirementData, setDashboardRequirementData] =
    React.useState([]);
  const [data, setData] = React.useState(null);
  const [resumePageNo, setResumePageNo] = React.useState(1);
  const [resumePageNoTotal, setResumePageNoTotal] = React.useState(0);
  const [requirementPageNo, setRequirementPageNo] = React.useState(1);
  const [requirementPageNoTotal, setRequirementPageNoTotal] = React.useState(0);
  const [resumeLoading, setResumeLoading] = React.useState(false);
  const [requirementLoading, setRequirementLoading] = React.useState(false);
  const [options, setOptions] = React.useState(null);
  const profile = localStorage.getItem("profile");
  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });
  const [confirmationDialog, setConfirmationDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState(null);
  const [, setLoading] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [showSMSDialog, setShowSMSDialog] = React.useState(false);
  const [smsInfo, setSmsInfo] = React.useState({
    from: "",
    to: "",
    userKey: "",
  });
  const [callLoading, setCallLoading] = React.useState(false);
  const [callDialogData, setCallDialogData] = React.useState(null);

  // Initial Form State --------------------------------------------------
  const [remarkInitialValue, setRemarkInitialValue] = React.useState({
    remark: "",
    remarkTypeValue: "Candidate Job Send Outs",
    remarkType: "1",
    candidateId: null,
    userId: null,
  });

  //Dropdown for Comment Type ------------------------------
  React.useEffect(() => {
    getDropDownOptions(setOptions, setLoading);
  }, [setOptions]);

  React.useEffect(() => {
    if (data && data.id) {
      setRemarkInitialValue({
        remark: "",
        remarkTypeValue: "Candidate Job Send Outs",
        remarkType: "1",
        candidateId: data && data.id,
        userId: JSON.parse(profile)["id"],
      });
    }
  }, [profile, data]);

  let pageResumeClickHandler;
  let pageRequirementClickHandler;
  let calling;

  const handleResumePageClick = (data) => {
    clearTimeout(pageResumeClickHandler);
    pageResumeClickHandler = setTimeout(() => {
      setResumePageNo(parseInt(data.selected) + 1);
    }, 300);
  };

  const handleRequirementPageClick = (data) => {
    clearTimeout(pageRequirementClickHandler);
    pageRequirementClickHandler = setTimeout(() => {
      setRequirementPageNo(parseInt(data.selected) + 1);
    }, 300);
  };

  React.useEffect(() => {
    getDashboardResumeSearchData(
      string,
      resumePageNo,
      setDashboardResumeData,
      setResumePageNoTotal,
      setResumeLoading
    );
  }, [string, resumePageNo]);

  React.useEffect(() => {
    getDashboardRequirementSearchData(
      string,
      requirementPageNo,
      setDashboardRequirementData,
      setRequirementPageNoTotal,
      setRequirementLoading
    );
  }, [string, requirementPageNo]);

  const handleCalling = (data) => {
    clearTimeout(calling);
    calling = setTimeout(() => {
      setCallLoading(false);
    }, 10000);
  };

  return (
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
      <Modal
        show={confirmationDialog}
        onHide={() => {
          setConfirmationDialog(false);
        }}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Notification {...notify} />
        <Modal.Body>
          Are you sure you want to delete candidate{" "}
          <strong>{confirmationDialog && dialogData.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setConfirmationDialog(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            className="btn btn-danger"
            onClick={() =>
              patchDeleteCandidate(
                dialogData,
                JSON.parse(profile)["id"],
                setConfirmationDialog,
                dashboardResumeData,
                setDashboardResumeData,
                setDeleting,
                setNotify
              )
            }
            disabled={deleting}
          >
            {!deleting ? "Delete" : "Deleting..."}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={"p-4"}>
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
                  {notify.show && <Notification {...notify} />}
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
                        resetForm,
                        setNotify,
                        setSubmitting
                      );
                      setSubmitting(true);
                    }}
                  >
                    {(props) => {
                      const {
                        values,
                        handleSubmit,
                        handleReset,
                        isSubmitting,
                      } = props;
                      return (
                        <Form onSubmit={handleSubmit}>
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
                              onClick={handleReset}
                            >
                              Cancel
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"font bg-white resume-wrapper"}>
          <div className={"res-Text"}>Resume</div>
          <Table
            hover
            style={{ padding: "20px" }}
            width="720"
            className="tableFixedLayout"
          >
            <EnhancedResumeTableHead />
            <tbody>
              {resumeLoading ? (
                <tr className="loadingSearchItem">
                  <td colSpan="6" className="text-center">
                    <div class="spinner-border text-dark" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                dashboardResumeData &&
                dashboardResumeData.map((row, i) => (
                  <tr>
                    <td>
                      {" "}
                      <Link to={`/candidates/${row.id}/0`}>{row.name}</Link>
                    </td>
                    <td className={"wordWrap"}>
                      {row.mobile && (
                        <>
                          {row.mobile}
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="button-tooltip-2">
                                Call {row && row.name}
                              </Tooltip>
                            }
                          >
                            <span
                              onClick={() => {
                                setCallDialogData(row.name);
                                setCallLoading(true);
                                clicktocal(
                                  row.mobile,
                                  JSON.parse(profile)["externalUserID"]
                                );
                                handleCalling();
                              }}
                            >
                              <img src="/images/call-small.png" alt="Call" />
                            </span>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="button-tooltip-2">
                                Message {row && row.name}
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
                                  to: row.mobile,
                                  userKey:
                                    JSON.parse(profile)["externalUserID"],
                                });
                                setShowSMSDialog(true);
                              }}
                            >
                              <img src="/images/text-small.png" alt="Message" />
                            </a>
                          </OverlayTrigger>
                        </>
                      )}
                      {row.email && (
                        <Link>
                          <span className={"contact"}>{row.email}</span>
                        </Link>
                      )}
                    </td>
                    <td>{row.location}</td>
                    <td>
                      <ShowMoreText
                        lines={2}
                        more="Show more"
                        less="Show less"
                        expanded={false}
                      >
                        {row.skills}
                      </ShowMoreText>
                    </td>
                    <td>{row.experience_years}</td>
                    <td>
                      <span className={"showOnHover"}>
                        <span
                          className="font font-weight-bold"
                          data-toggle="modal"
                          data-target="#addRemark"
                        >
                          <OverlayTrigger
                            placement="bottom"
                            overlay={
                              <Tooltip id="button-tooltip-2">
                                Add Remark
                              </Tooltip>
                            }
                          >
                            <Icon.ChatSquareFill
                              size="16px"
                              fill="#666666"
                              onClick={() => {
                                setData(row);
                                setNotify({
                                  show: false,
                                  description: "",
                                  type: "",
                                });
                              }}
                            />
                          </OverlayTrigger>
                        </span>

                        <Link to={`/candidates/${row.id}/0`}>
                          <OverlayTrigger
                            placement="bottom"
                            overlay={
                              <Tooltip id="button-tooltip-2">
                                View Profile
                              </Tooltip>
                            }
                          >
                            <Icon.EyeFill size="16px" fill="#666666" />
                          </OverlayTrigger>
                        </Link>

                        <Link to={`/search/${row.name}/edit/${row.id}`}>
                          <OverlayTrigger
                            placement="bottom"
                            overlay={
                              <Tooltip id="button-tooltip-2">Edit</Tooltip>
                            }
                          >
                            <Icon.PencilFill size="16px" fill="#666666" />
                          </OverlayTrigger>
                        </Link>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">Delete</Tooltip>
                          }
                        >
                          <Icon.TrashFill
                            size="16px"
                            fill="#D50A0A"
                            onClick={() => {
                              setConfirmationDialog(true);
                              setDialogData(row);
                              setNotify({
                                show: false,
                                description: "",
                                type: "",
                              });
                            }}
                          />
                        </OverlayTrigger>
                      </span>
                    </td>
                  </tr>
                ))
              )}
              {!resumeLoading &&
                dashboardResumeData &&
                !dashboardResumeData.length && (
                  <tr className="loadingSearchItem">
                    <td colSpan="6" className="text-center">
                      No records available.
                    </td>
                  </tr>
                )}
            </tbody>
          </Table>
          <div className={`page mx-4 ${!resumePageNoTotal && "invisible"}`}>
            {resumePageNoTotal > 1 && (
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={resumePageNoTotal}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handleResumePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"activePagination"}
              />
            )}
          </div>
        </div>
      </div>
      <div className={"p-4"}>
        <div className={"font bg-white resume-wrapper"}>
          <div className={"res-Text"}>Requirement</div>
          <Table
            hover
            style={{ padding: "20px" }}
            width="720"
            className="tableFixedLayout"
          >
            <EnhancedRequirementTableHead />
            <tbody>
              {requirementLoading ? (
                <tr className="loadingSearchItem">
                  <td colSpan="6" className="text-center">
                    <div class="spinner-border text-dark" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                dashboardRequirementData &&
                dashboardRequirementData.data &&
                dashboardRequirementData.data.map((row) => (
                  <tr class="">
                    <td>{row.type}</td>
                    <td>{row.client["name"]}</td>
                    <td>
                      <Link to={`/job-details/${row.id}`} target="_blank">
                        {row.job_id}
                      </Link>
                    </td>
                    <td>{row.job_title}</td>
                    <td>{row.location}</td>
                    <td>
                      <span className={"showOnHover"}>
                        <Link to={`/job-details/${row.id}`} target="_blank">
                          <OverlayTrigger
                            placement="bottom"
                            overlay={
                              <Tooltip id="button-tooltip-2">
                                View Requirement
                              </Tooltip>
                            }
                          >
                            <Icon.EyeFill size="16px" fill="#666666" />
                          </OverlayTrigger>
                        </Link>
                        <Link to={`/requirement/${row.id}`} target="_blank">
                          <OverlayTrigger
                            placement="bottom"
                            overlay={
                              <Tooltip id="button-tooltip-2">
                                Update Requirement
                              </Tooltip>
                            }
                          >
                            <Icon.PencilFill size="16px" fill="#666666" />
                          </OverlayTrigger>
                        </Link>
                        <Icon.TrashFill size="16px" fill="#D50A0A" />
                      </span>
                    </td>
                  </tr>
                ))
              )}
              {!requirementLoading &&
                dashboardRequirementData.data &&
                !dashboardRequirementData.data.length && (
                  <tr className="loadingSearchItem">
                    <td colSpan="6" className="text-center">
                      No records available.
                    </td>
                  </tr>
                )}
            </tbody>
          </Table>
          <div
            className={`page mx-4 ${!requirementPageNoTotal && "invisible"}`}
          >
            {requirementPageNoTotal > 1 && (
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={requirementPageNoTotal}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handleRequirementPageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"activePagination"}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
