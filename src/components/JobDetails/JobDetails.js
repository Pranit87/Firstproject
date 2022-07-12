import React from "react";
import { useParams, Link } from "react-router-dom";
import Log from "./Log";
import Interview from "./Interview";
import Submitted from "./Submitted";
import Shortlisted from "./Shortlisted";
import Offers from "./Offers";
import Sourced from "./Sourced/Sourced";
import "./jobDetails.css";
import {
  getJobsDetails,
  updateRequirementStatus,
} from "../../Services/jobsService";
import { Status, JobCategory } from "../../constants";
import "./placeholder-loading.css";
import ShowMoreText from "react-show-more-text";
import isJSON from "is-json";
import { useUsers } from "../../Services/usersService";
import AccessDenied from "../Common/AccessDenied/AccessDenied";

const JobDetails = () => {
  const { jobId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [jobDetails, setJobDetails] = React.useState([]);
  const [reloadInterview, setReloadInterview] = React.useState(0);
  const { currentUser } = useUsers();
  const { permissions } = currentUser;

  // Call to get job details API
  React.useEffect(() => {
    getJobsDetails(jobId, setJobDetails, setLoading);
  }, [jobId]);

  const [reqStatus, setReqStatus] = React.useState(Status[jobDetails.status]);
  const changeRequirementStatus = (statusValue) => {
    setReqStatus(statusValue);
    updateRequirementStatus(
      jobDetails.id,
      statusValue,
      setJobDetails,
      setLoading,
      jobDetails.job_id
    );
  };

  return (
    (Object.keys(permissions).length && !permissions.VIEW_JOB_DETAILS_PAGE && (
      <AccessDenied />
    )) || (
      <>
        <div className="inner font py-4 mx-4 text-center text-white h4">
          <div className="row">
            <div className="col-lg text-uppercase">
              {jobDetails.client && jobDetails.client.name}
            </div>
            <div className="col-lg text-uppercase">{jobDetails.job_title}</div>
            <div className="col-lg text-uppercase">{jobDetails.job_id}</div>
          </div>
        </div>

        {loading ? (
          <div className="inner bg-white pt-4 pb-2 mx-4 rounded shadow font">
            <div class="ph-item">
              <div class="ph-col-12">
                <div class="ph-row">
                  <div class="ph-col-2 big"></div>
                  <div class="ph-col-1 empty"></div>
                  <div class="ph-col-2 big"></div>
                  <div class="ph-col-1 empty"></div>
                  <div class="ph-col-2 big"></div>
                  <div class="ph-col-1 empty"></div>
                  <div class="ph-col-2 big"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="inner bg-white pt-4 pb-2 mx-4 rounded shadow font">
            <div className="row description-font pl-lg-5">
              <div className="col-lg  text-center text-lg-left">
                <span className="description-color">Bill Rate: </span>
                <span className=" font-weight-bold">
                  ${jobDetails.bill_rate}/hr
                </span>
              </div>

              <div className="col-lg  text-center text-lg-left">
                <span className="description-color ">Duration: </span>
                <span className=" font-weight-bold">
                  {jobDetails.contract_duration} months
                </span>
              </div>

              <div className="col-lg  text-center text-lg-left">
                <span className="description-color ">Job Category: </span>
                <span className=" font-weight-bold">
                  {JobCategory[jobDetails.job_category]}
                </span>
              </div>

              <div className="col-lg  text-center text-lg-left">
                <span className="description-color ">Status: </span>
                <span className=" font-weight-bold">
                  {Status[jobDetails.status]}
                </span>
              </div>
            </div>
            <div className="row description-font py-2 pl-lg-5">
              <div className="col-lg   text-center text-lg-left">
                <span className="description-color">Received Date: </span>
                <span className=" font-weight-bold">
                  {jobDetails.received_date}
                </span>
              </div>

              <div className="col-lg  text-center text-lg-left">
                <span className="description-color ">Max Submissions: </span>
                <span className=" font-weight-bold">
                  {jobDetails.maximum_number_of_submission}
                </span>
              </div>
              <div className="col-lg text-center text-lg-left">
                <span className="description-color">Location: </span>
                <span className=" font-weight-bold">{jobDetails.location}</span>
              </div>
              <div className="col-lg  text-center text-lg-left">
                <span className="description-color ">Mark Up: </span>
                <span className=" font-weight-bold">{jobDetails.markup}</span>
              </div>
            </div>
            <div className="hr-jobs"></div>
            <div className="row description-font pt-3 pl-lg-5">
              <div className="col-lg-3   text-center text-lg-left">
                <span className="description-color">Type: </span>
                <span className=" font-weight-bold">
                  {jobDetails.type &&
                    jobDetails.type.charAt(0).toUpperCase() +
                      jobDetails.type.slice(1)}
                </span>
              </div>

              <div className="col-lg-3  text-center text-lg-left">
                <span className="description-color ">Pay Rate: </span>
                <span className="ml-lg-2 font-weight-bold">
                  ${jobDetails.pay_rate}
                </span>
              </div>
              <div className="col-lg-3  text-center text-lg-left">
                <span className="description-color ">Slots: </span>
                <span className=" font-weight-bold">
                  {jobDetails.no_slots_filled}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white my-4 py-4 mx-4 rounded shadow font">
          {loading ? (
            <div class="ph-item">
              <div class="ph-col-12">
                <div className="ph-picture"></div>
                <div className="ph-picture"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="pl-4 ml-2 pb-2 description-color description-font">
                Description:
              </div>
              <div className="px-4 mx-2 job-description-font-custom text-justify">
                <ShowMoreText
                  lines={3}
                  more="Show more"
                  less="Show less"
                  expanded={false}
                >
                  {jobDetails.job_description}
                </ShowMoreText>
              </div>
            </>
          )}
        </div>

        {loading ? (
          <div className="bg-white my-4 py-4 mx-4 rounded shadow font">
            <div class="ph-item">
              <div class="ph-col-12">
                <div className="ph-picture"></div>
              </div>
            </div>
          </div>
        ) : (
          jobDetails.update_comments && (
            <div className="bg-white my-4 py-4 mx-4 rounded shadow font">
              <div className="pl-4 ml-2 pb-2 description-color description-font">
                Comments:
              </div>
              <div className="px-4 mx-2 job-description-font-custom text-justify">
                {isJSON(jobDetails.update_comments) && (
                  <ShowMoreText
                    lines={1}
                    more="Show more"
                    less="Show less"
                    expanded={false}
                  >
                    {JSON.parse(jobDetails.update_comments).map((item) => (
                      <div className="mt-2 mb-2">
                        <div>{item.Comments}</div>
                        <small class="text-muted">
                          Created By: {item.CommentBy}
                        </small>
                        <br />
                        <small class="text-muted">
                          Updated By: {item.updatedBy}
                        </small>
                        <br />
                        <small class="text-muted">
                          Date/Time: {item.DateTime}
                        </small>
                        <br />
                      </div>
                    ))}
                  </ShowMoreText>
                )}
              </div>
            </div>
          )
        )}

        <div className="mx-4 my-4 rounded shadow">
          <ul className="nav nav-tabs rounded" id="myTab" role="tablist">
            <li
              className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
              role="presentation"
              id="sourced-li"
            >
              <a
                className="nav-link text-white mx-2 px-2 active show"
                id="sourced-tab"
                data-toggle="tab"
                href="#sourced"
                role="tab"
                aria-controls="sourced"
                aria-selected="false"
              >
                Sourced Resumes
              </a>
            </li>
            <li
              className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
              role="presentation"
              id="shortlisted-li"
            >
              <a
                className="nav-link text-white mx-2 px-4"
                id="shortlisted-tab"
                data-toggle="tab"
                href="#shortlisted"
                role="tab"
                aria-controls="shortlisted"
                aria-selected="false"
              >
                Qualified
              </a>
            </li>
            <li
              className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
              role="presentation"
              id="submitted-li"
            >
              <a
                className="nav-link text-white mx-2 px-4"
                id="submitted-tab"
                data-toggle="tab"
                href="#submitted"
                role="tab"
                aria-controls="submitted"
                aria-selected="false"
              >
                Submitted
              </a>
            </li>
            <li
              className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
              role="presentation"
              id="interview-li"
            >
              <a
                className="nav-link text-white mx-2 px-4 "
                id="interviews-tab"
                data-toggle="tab"
                href="#interviews"
                role="tab"
                aria-controls="interviews"
                aria-selected="false"
              >
                Interviews
              </a>
            </li>
            <li
              className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
              role="presentation"
              id="log-li"
            >
              <a
                className="nav-link text-white mx-2 px-5"
                id="offers-tab"
                data-toggle="tab"
                href="#offers"
                role="tab"
                aria-controls="offers"
                aria-selected="true"
              >
                Offers
              </a>
            </li>
            {/* <li
            className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
            role="presentation"
            id="recruiter-li"
          >
            <a
              className="nav-link text-white mx-2 px-4"
              id="recruiters-tab"
              data-toggle="tab"
              href="#recruiters"
              role="tab"
              aria-controls="recruiters"
              aria-selected="false"
            >
              Recruiters
            </a>
          </li> */}
            <li
              className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
              role="presentation"
              id="log-li"
            >
              <a
                className="nav-link text-white mx-2 px-5"
                id="log-tab"
                data-toggle="tab"
                href="#log"
                role="tab"
                aria-controls="log"
                aria-selected="true"
              >
                Log
              </a>
            </li>
          </ul>
          <div
            className="tab-content bg-white rounded history-font-size"
            id="myTabContent"
          >
            <div
              className="tab-pane fade"
              id="submitted"
              role="tabpanel"
              aria-labelledby="submitted"
            >
              {
                <Submitted
                  setReloadInterview={setReloadInterview}
                  reloadInterview={reloadInterview}
                />
              }
            </div>
            <div
              className="tab-pane fade"
              id="shortlisted"
              role="tabpanel"
              aria-labelledby="shortlisted"
            >
              {
                <Shortlisted
                  setReloadInterview={setReloadInterview}
                  reloadInterview={reloadInterview}
                />
              }
            </div>
            <div
              className="tab-pane fade show active"
              id="sourced"
              role="tabpanel"
              aria-labelledby="sourced"
            >
              {
                <Sourced
                  jobTitle={jobDetails.job_title}
                  jobLocation={jobDetails.location}
                  setReloadInterview={setReloadInterview}
                  reloadInterview={reloadInterview}
                />
              }
            </div>
            {/* <div
            className="tab-pane fade"
            id="recruiters"
            role="tabpanel"
            aria-labelledby="recruiters"
          >
            {<Recruiters />}
          </div> */}
            <div
              className="tab-pane fade "
              id="interviews"
              role="tabpanel"
              aria-labelledby="interviews"
            >
              {
                <Interview
                  reloadInterview={reloadInterview}
                  setReloadInterview={setReloadInterview}
                />
              }
            </div>

            <div
              className="tab-pane fade"
              id="log"
              role="tabpanel"
              aria-labelledby="log"
            >
              {<Log jobId={jobId} />}
            </div>

            <div
              className="tab-pane fade"
              id="offers"
              role="tabpanel"
              aria-labelledby="offers"
            >
              {
                <Offers
                  jobTitle={jobDetails.job_title}
                  jobLocation={jobDetails.location}
                  reloadInterview={reloadInterview}
                  setReloadInterview={setReloadInterview}
                  jobId={jobId}
                />
              }
            </div>
          </div>
        </div>

        <div className="inner font pt-3 pb-5 mb-5 text-center h4">
          {!permissions.UPDATE_REQUIREMENT ||
            (jobDetails.status === 1 && (
              <Link to={`/requirement/${jobDetails.id}`}>
                <button className="btn btn-warning btn-lg font-weight-bold px-4 mr-2 mb-3 mb-lg-0">
                  UPDATE
                </button>
              </Link>
            ))}
          <select
            name="select-type"
            id="reqStatus"
            className="btn btn-warning btn-lg font-weight-bold px-3 py-2 mb-3 mr-1 mb-lg-0"
            value={reqStatus}
            onChange={(e) => {
              changeRequirementStatus(e.target.value);
            }}
            required
          >
            {reqStatus === "Inactive" && (
              <option
                value=""
                className="btn btn-warning btn-lg font-weight-bold px-3 mb-3 mr-1 mb-lg-0"
              >
                ACTION
              </option>
            )}
            <option
              value="Active"
              selected={jobDetails.status === 1 || undefined}
              className="btn btn-warning btn-lg font-weight-bold px-3 mb-3 mr-1 mb-lg-0"
            >
              ACTIVE
            </option>
            <option
              value="Hold"
              selected={jobDetails.status === 4 || undefined}
              className="btn btn-warning btn-lg font-weight-bold px-3 mb-3 mr-1 mb-lg-0"
            >
              HOLD
            </option>
            <option
              value="Closed"
              selected={jobDetails.status === 3 || undefined}
              className="btn btn-warning btn-lg font-weight-bold px-3 mb-3 mr-1 mb-lg-0"
            >
              CLOSED
            </option>
            <option
              value="Deleted"
              selected={jobDetails.status === 2 || undefined}
              className="btn btn-warning btn-lg font-weight-bold px-3 mb-3 mr-1 mb-lg-0"
            >
              DELETE
            </option>
          </select>
          <Link to={`/source/${jobId}`} target="_blank">
            <button className="btn btn-warning btn-lg font-weight-bold px-4 mx-1">
              SOURCE
            </button>
          </Link>
        </div>
      </>
    )
  );
};

export default JobDetails;
