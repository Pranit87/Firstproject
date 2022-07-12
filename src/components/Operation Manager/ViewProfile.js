import React from "react";
import "./Teams.css";
// import { Tab, Tabs } from "react-bootstrap";
import Logs from "./Log";
import Requirement from "./Requirement";
import AccessLog from "./AccessLog";
import {
  getProfileDetails,
  getProfileAccessLog,
  getProfileActivityLog,
  getProfileRequirement,
} from "../../Services/teamsServices";
import { format } from "date-fns";
import { useUsers } from "../../Services/usersService";
import AccessDenied from "../Common/AccessDenied/AccessDenied";

function ViewProfile(props) {
  const { userId } = props.match.params;
  const [profileData, setProfileData] = React.useState(null);
  const [profileClientData, setProfileClientData] = React.useState(null);
  const [accessLogData, setAccessLogData] = React.useState(null);
  const [accessLogDataCount, setAccessLogDataCount] = React.useState(0);
  const [activityLogData, setActivityLogData] = React.useState(null);
  const [activityLogDataCount, setActivityLogDataCount] = React.useState(0);
  const [requirementData, setRequirementData] = React.useState(null);
  const [requirementDataCount, setRequirementDataCount] = React.useState(0);
  const [targetData, setTargetData] = React.useState(null);
  const [page] = React.useState(1);
  const [pageFor] = React.useState(0);
  const [PageForAccesslog, setPageForAccesslog] = React.useState(1);
  const [PageForActivityLog, setPageForActivityLog] = React.useState(1);
  const [PageForRequirement, setPageForRequirement] = React.useState(1);
  const [profileLoading, setProfileLoading] = React.useState(true);
  const [profileAccessLoading, setProfileAccessLoading] = React.useState(true);
  const [profileActivityLoading, setProfileActivityLoading] = React.useState(
    true
  );
  const [profileError, setProfileError] = React.useState(null);
  const [logError, setLogError] = React.useState(null);
  const [requirementError, setRequirementError] = React.useState(null);
  const [accessLogError, setAccessLogError] = React.useState(null);
  const [showTargets, setShowTargets] = React.useState(false);

  const [
    profileRequirementLoading,
    setProfileRequirementLoading,
  ] = React.useState(true);

  React.useEffect(() => {
    getProfileAccessLog(
      userId,
      PageForAccesslog,
      setAccessLogData,
      setProfileAccessLoading,
      setAccessLogDataCount,
      setAccessLogError
    );
  }, [userId, PageForAccesslog]);

  React.useEffect(() => {
    getProfileActivityLog(
      userId,
      PageForActivityLog,
      setActivityLogData,
      setProfileActivityLoading,
      setActivityLogDataCount,
      setLogError
    );
  }, [userId, PageForActivityLog]);

  React.useEffect(() => {
    getProfileRequirement(
      userId,
      PageForRequirement,
      setRequirementData,
      setProfileRequirementLoading,
      setRequirementDataCount,
      setRequirementError
    );
  }, [userId, PageForRequirement]);

  React.useEffect(() => {
    getProfileDetails(
      userId,
      page,
      pageFor,
      setProfileData,
      setProfileClientData,
      setTargetData,
      setProfileLoading,
      setProfileError,
      setShowTargets
    );
  }, [userId, page, pageFor]);

  const RowColumn = (props) => {
    let columns = [];
    let data = props.data;
    data.forEach((item, idx) => {
      // push column
      columns.push(
        <div className="rounded clients-bg-color px-2 m-1">
          {item ? item.client_name : ""}
        </div>
      );

      // force wrap to next row every 6 columns
      if ((idx + 1) % 4 === 0) {
        columns.push(<div className="w-100"></div>);
      }
    });

    return <div className="row mx-2">{columns}</div>;
  };

  const AcronymName = (props) => {
    var regular_ex = /\b(\w)/g;
    var matches = props.str.match(regular_ex);
    var acronym = matches.join("");

    return (
      <div className={"t-container_acronym-performer"}>
        <div className={"t-name_acronym-performer"}>{acronym}</div>
      </div>
    );
  };

  const { currentUser } = useUsers();
  const { permissions } = currentUser;

  return (
    (Object.keys(permissions).length && !permissions.VIEW_MY_PROFILE && (
      <AccessDenied />
    )) || (
      <>
        <div className="d-lg-flex justify-content-between mx-4 text-white pt-5 pb-2 h4 font">
          {profileData && (
            <>
              <div>{profileData.username.toUpperCase()}</div>
              <div>Email: {profileData.email}</div>
              <div>
                VoIP Direct:{" "}
                {profileData.voip_direct ? profileData.voip_direct : "N/A"}{" "}
                &emsp;&emsp; VoIP Ext.{" "}
                {profileData.voip_extension
                  ? profileData.voip_extension
                  : "N/A"}
              </div>
            </>
          )}
        </div>

        <div className="bg-white py-4 my-4 mx-4 rounded px-3 font">
          {profileLoading ? (
            <tr className="loadingSearchItem loaders">
              <td colSpan="6" className="text-center">
                <div class="spinner-border text-dark" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
          ) : (
            <div className="row">
              {profileError && (
                <p className="p-3 text-danger">{`ERROR: ${profileError}`}</p>
              )}
              <div className="col-lg">
                {profileData && (
                  <div className="row">
                    <div className="col-sm-2">
                      {profileData.avatar ? (
                        <img
                          src={`${
                            process.env.REACT_APP_S3_BUCKET_PROFILE +
                            (profileData.avatar ? profileData.avatar : "")
                          }`}
                          className="lead-image sg-back-color"
                          alt="Profile"
                        />
                      ) : (
                        <AcronymName str={profileData.username.toUpperCase()} />
                      )}
                    </div>
                    <div className="col-lg display-grid">
                      <span className="heading-color">Team:</span>
                      <span>
                        {profileData.hasOwnProperty("leadName")
                          ? profileData.leadName
                          : profileData.username}
                      </span>
                    </div>
                    <div className="col-lg display-grid vl-profile-border border-right-0 border-top-0 border-bottom-0">
                      <span className="heading-color">ID:</span>
                      <span>{profileData.id}</span>
                    </div>
                    <div className="col-lg display-grid vl-profile-border border-right-0 border-top-0 border-bottom-0">
                      <span className="heading-color">Role:</span>
                      <span>{profileData.rolename}</span>
                    </div>
                    <div className="col-lg display-grid vl-profile-border border-right-0 border-top-0 border-bottom-0">
                      <span className="heading-color">Signup Date:</span>
                      <span>
                        {profileData.created_at
                          ? format(
                              new Date(profileData.created_at),
                              "MMM-dd-yyyy"
                            )
                          : "N/A"}{" "}
                      </span>
                    </div>
                  </div>
                )}

                <div className="row my-4 mx-1" style={{ display: "flex" }}>
                  {profileClientData &&
                  typeof profileClientData === "object" ? (
                    <>
                      <span className="col-2 h6 pt-2">Clients:</span>
                      <span className="col-10 h6 pt-2">
                        <RowColumn data={profileClientData} />
                      </span>
                    </>
                  ) : (
                    !profileError && (
                      <>
                        <span className="col-2 h6 pt-2">Clients:</span>
                        <span className="col-10 pt-2 no-client">
                          No clients available.
                        </span>
                      </>
                    )
                  )}
                </div>
                {/* <button className="px-5 btn btn-primary mt-2 mr-3">Update</button>
            <button className="px-5 btn btn-danger mt-2 mr-3">Delete</button> */}
              </div>
              {showTargets && (
                <div className="col-md-6 vl-profile-border border-right-0 border-top-0 border-bottom-0">
                  <table className="table table-bordered h6">
                    <thead className="">
                      <tr>
                        <th scope="col" className="py-2 bg-primary text-white">
                          TARGETS
                        </th>
                        <th
                          scope="col"
                          className="py-2 text-center target-color text-white"
                        >
                          Weekly
                        </th>
                        <th
                          scope="col"
                          className="py-2 text-center target-color text-white"
                        >
                          Monthly
                        </th>
                        <th
                          scope="col"
                          className="py-2 text-center target-color text-white"
                        >
                          Quarterly
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {targetData ? (
                        <>
                          <tr>
                            <td className="py-2 bg-color-submit-tab">
                              Submissions
                            </td>
                            <td className="py-2 text-center">
                              {targetData.submissionsweekly
                                ? targetData.submissionsweekly
                                : 0}
                            </td>
                            <td className="py-2 text-center">
                              {targetData.submissionsmonthly
                                ? targetData.submissionsmonthly
                                : 0}
                            </td>
                            <td className="py-2 text-center">
                              {targetData.submissionsquarterly
                                ? targetData.submissionsquarterly
                                : 0}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 bg-color-submit-tab">
                              Interviews
                            </td>
                            <td className="py-2 text-center">
                              {targetData.interviewsweekly
                                ? targetData.interviewsweekly
                                : 0}
                            </td>
                            <td className="py-2 text-center">
                              {targetData.interviewsmonthly
                                ? targetData.interviewsmonthly
                                : 0}
                            </td>
                            <td className="py-2 text-center">
                              {targetData.interviewsquarterly
                                ? targetData.interviewsquarterly
                                : 0}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 bg-color-submit-tab">Offers</td>
                            <td className="py-2 text-center">
                              {targetData.offersweekly
                                ? targetData.offersweekly
                                : 0}
                            </td>
                            <td className="py-2 text-center">
                              {targetData.offersmonthly
                                ? targetData.offersmonthly
                                : 0}
                            </td>
                            <td className="py-2 text-center">
                              {targetData.offersquarterly
                                ? targetData.offersquarterly
                                : 0}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 bg-color-submit-tab">Start</td>
                            <td className="py-2 text-center">
                              {targetData.startweekly
                                ? targetData.startweekly
                                : 0}
                            </td>
                            <td className="py-2 text-center">
                              {targetData.startmonthly
                                ? targetData.startmonthly
                                : 0}
                            </td>
                            <td className="py-2 text-center">
                              {targetData.startquarterly
                                ? targetData.startquarterly
                                : 0}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 bg-color-submit-tab">
                              Net Profit
                            </td>
                            <td className="py-2 text-center">
                              {targetData.gpmweekly ? targetData.gpmweekly : 0}
                            </td>
                            <td className="py-2 text-center">
                              {targetData.gpmmonthly
                                ? targetData.gpmmonthly
                                : 0}
                            </td>
                            <td className="py-2 text-center">
                              {targetData.gpmquarterly
                                ? targetData.gpmquarterly
                                : 0}
                            </td>
                          </tr>
                        </>
                      ) : (
                        <tr className="loader loader-height">
                          <td colSpan="6" className="text-center">
                            No records available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mx-4 my-4 rounded shadow">
          <ul className="nav nav-tabs rounded" id="myTab" role="tablist">
            <li
              className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
              role="presentation"
              id="submitted-li"
            >
              <a
                className="nav-link text-white mx-2 px-5 active show"
                id="submitted-tab"
                data-toggle="tab"
                href="#Logs"
                role="tab"
                aria-controls="Logs"
                aria-selected="false"
              >
                Log
              </a>
            </li>
            <li
              className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
              role="presentation"
              id="sourced-li"
            >
              <a
                className="nav-link text-white mx-2 px-2"
                id="sourced-tab"
                data-toggle="tab"
                href="#Requirements"
                role="tab"
                aria-controls="Requirements"
                aria-selected="false"
              >
                Requirements
              </a>
            </li>
            <li
              className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
              role="presentation"
              id="recruiter-li"
            >
              <a
                className="nav-link text-white mx-2 px-4"
                id="recruiters-tab"
                data-toggle="tab"
                href="#AccessLog"
                role="tab"
                aria-controls="recruiters"
                aria-selected="false"
              >
                Access Log
              </a>
            </li>
          </ul>
          <div
            className="tab-content bg-white rounded history-font-size"
            id="myTabContent"
          >
            <div
              className="tab-pane fade show active"
              id="Logs"
              role="tabpanel"
              aria-labelledby="Logs"
            >
              {
                <Logs
                  data={activityLogData}
                  setPageForActivityLog={setPageForActivityLog}
                  profileActivityLoading={profileActivityLoading}
                  setProfileActivityLoading={setProfileActivityLoading}
                  activityLogDataCount={activityLogDataCount}
                  error={logError}
                />
              }
            </div>
            <div
              className="tab-pane fade"
              id="Requirements"
              role="tabpanel"
              aria-labelledby="Requirements"
            >
              {
                <Requirement
                  data={requirementData}
                  setPageForRequirement={setPageForRequirement}
                  profileRequirementLoading={profileRequirementLoading}
                  setProfileRequirementLoading={setProfileRequirementLoading}
                  requirementDataCount={requirementDataCount}
                  error={requirementError}
                />
              }
            </div>
            <div
              className="tab-pane fade"
              id="AccessLog"
              role="tabpanel"
              aria-labelledby="AccessLog"
            >
              {
                <AccessLog
                  data={accessLogData}
                  setPageForAccesslog={setPageForAccesslog}
                  profileAccessLoading={profileAccessLoading}
                  setProfileAccessLoading={setProfileAccessLoading}
                  accessLogDataCount={accessLogDataCount}
                  error={accessLogError}
                />
              }
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default ViewProfile;
