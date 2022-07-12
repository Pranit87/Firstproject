import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Teams.css";
import {
  TeamMembers,
  getProfileDetails,
  deleteRecruiter,
} from "../../Services/teamsServices";
import { useUsers } from "../../Services/usersService";
import AccessDenied from "../Common/AccessDenied/AccessDenied";
import { Link } from "react-router-dom";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import AssignTarget from "./AssignTarget";

const ViewTeam = (props) => {
  const [team, setTeam] = useState(null);
  const profile = localStorage.getItem("profile");
  const userId = JSON.parse(profile)["id"];
  const { teamIds } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [profileClientData, setProfileClientData] = React.useState(null);
  const [page] = React.useState(1);
  const [pageFor] = React.useState(0);
  const [toggle, setToggle] = React.useState(false);
  const [targetData, setTargetData] = React.useState(null);
  const [profileLoading, setProfileLoading] = React.useState(true);
  const { currentUser } = useUsers();
  const { permissions } = currentUser;
  const [teamLoading, setTeamLoading] = React.useState(true);
  const [confirmationDialog, setConfirmationDialog] = React.useState(false);
  const [teamId, setTeamId] = React.useState();
  const [deleting, setDeleting] = React.useState(false);
  const [showAssignTarget, setShowAssignTarget] = useState(false);
  const [leadId, setLeadId] = useState();
  const [roleId, setRoleId] = useState();

  React.useEffect(() => {
    getProfileDetails(
      teamIds || userId,
      page,
      pageFor,
      setProfileData,
      setProfileClientData,
      setTargetData,
      setProfileLoading
    );
  }, [teamIds, userId, page, pageFor]);

  React.useEffect(() => {
    TeamMembers(teamIds, setTeam, setTeamLoading);
  }, []);

  const RowColumn = (props) => {
    let columns = [];
    let data = props.data;
    data.forEach((item, idx) => {
      // push column
      columns.push(
        <div className="rounded clients-bg-color px-2 m-1 client-data">
          {item ? item.client_name : ""}
        </div>
      );

      // force wrap to next row every 6 columns
      if ((idx + 1) % 6 === 0) {
        columns.push(<div className="w-100"></div>);
      }
    });

    return <RenderItems listcolumn={columns} />;
  };

  const toggleHandler = () => {
    setToggle((prev) => !prev);
  };

  const RenderItems = (props) => {
    let list = props.listcolumn;
    let newList = [];
    let text = "";
    let show = true;

    if (list && list.length > 0) {
      if (list.length > 12 && toggle === false) {
        newList = list.slice(0, 12);
        text = "View More";
      } else if (list.length > 12 && toggle === true) {
        newList = list;
        text = "View Less";
      } else {
        newList = list;
        text = "";
        show = false;
      }
    }

    return (
      <div>
        <div className="row mx-2">{newList ? newList : ""}</div>
        {show && (
          <div
            className="mx-2"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <button className="btn btn-primary" onClick={toggleHandler}>
              {text}
            </button>
          </div>
        )}
      </div>
    );
  };

  const showDeleteTeam = (teamId) => {
    setTeamId(teamId);
    setConfirmationDialog(true);
  };

  return (
    (Object.keys(permissions).length &&
      !permissions.VIEW_MY_TEAMS &&
      !teamIds && <AccessDenied />) || (
      <>
        <div className="d-lg-flex justify-content-between mx-4 text-white pt-4 pb-2 h4 font">
          <div className="py-2">
            {profileData && profileData.username.toUpperCase()}
          </div>
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
              <div className="col-lg">
                <div className="row">
                  <span className="pt-2 ml-3 lead-name">Lead Name:</span>
                  <span className="pt-2 ml-2 lead-data">
                    {profileData && profileData.username}
                  </span>
                </div>
                <div className="row my-4 mx-1">
                  {profileClientData &&
                  typeof profileClientData === "object" ? (
                    <>
                      <span className="lead-name pt-2">Clients:</span>
                      <span className="col-10 pt-2">
                        <RowColumn data={profileClientData} />
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="lead-name pt-2">Clients:</span>
                      <span className="col-10 pt-2 no-client">
                        No clients available.
                      </span>
                    </>
                  )}
                </div>
                {/* <button
              className="px-5 btn btn-primary mt-2 mr-3"
              onClick={console.log(team[0].username)}
            >
              Update
            </button>
            <button className="px-5 btn btn-danger mt-2 mr-3">Delete</button> */}
              </div>
              <div className="col-lg vl-profile-border border-right-0 border-top-0 border-bottom-0">
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
                            {targetData.gpmmonthly ? targetData.gpmmonthly : 0}
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
            </div>
          )}
        </div>

        <div className="mx-4 my-4 text-white h5 pt-4 font">Team Members</div>

        <div className="mx-4 my-4 rounded shadow bg-white p-4 font">
          {teamLoading ? (
            <tr className="loadingSearchItem loaders">
              <td colSpan="6" className="text-center">
                <div class="spinner-border text-dark" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
          ) : (
            <table className="table table-hover h6">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" className="py-3">
                    Name
                  </th>
                  <th scope="col" className="py-3">
                    Email
                  </th>
                  <th scope="col" className="py-3">
                    Mobile
                  </th>
                  <th scope="col" className="py-3">
                    Role
                  </th>
                  <th scope="col" className="py-3"></th>
                </tr>
              </thead>
              <tbody className="">
                {team && team.length ? (
                  team.map(function (item, index) {
                    return (
                      <tr key={index}>
                        <td className="py-3">
                          {item.username ? item.username : "N/A"}
                        </td>
                        <td className="py-3 text-primary">
                          {item.email ? item.email : "N/A"}
                        </td>
                        <td className="py-3 text-primary">
                          {item.mobile ? item.mobile : "N/A"}
                        </td>
                        <td className="py-3">
                          {item.rolename ? item.rolename : "N/A"}
                        </td>
                        <td className="py-3 text-center">
                          <Link className="pr-4">
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="button-tooltip-2">
                                  Assign Target
                                </Tooltip>
                              }
                            >
                              <img
                                src="/images/assign-target.png"
                                onClick={(e) => {
                                  setLeadId(item.user_id);
                                  setRoleId(0);
                                  setShowAssignTarget(true);
                                }}
                              />
                            </OverlayTrigger>
                          </Link>
                          <Link
                            to={`/profile/${item.user_id}`}
                            className="pr-4"
                          >
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="button-tooltip-2">
                                  View Profile
                                </Tooltip>
                              }
                            >
                              <img
                                src="/images/view-team.png"
                                data-hover="tooltip"
                                data-placement="bottom"
                                title="View Profile"
                                alt="view"
                              />
                            </OverlayTrigger>
                          </Link>

                          <Link className="pr-4">
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="button-tooltip-2">
                                  Delete Member
                                </Tooltip>
                              }
                            >
                              <img
                                data-hover="tooltip"
                                data-placement="bottom"
                                title="Delete Member"
                                src="/images/delete-team.png"
                                alt="delete"
                                onClick={() => showDeleteTeam(item.user_id)}
                              />
                            </OverlayTrigger>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="loader">
                    <td colSpan="6" className="text-center">
                      No records available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          <AssignTarget
            show={showAssignTarget}
            setCloseAssignTarget={(e) => setShowAssignTarget(false)}
            leadId={leadId}
            roleId={roleId}
          />
        </div>
        <Modal
          show={confirmationDialog}
          onHide={() => setConfirmationDialog(false)}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Body>
            Are you sure you want to delete the recruiter?
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
                deleteRecruiter(
                  teamId,
                  setTeam,
                  setConfirmationDialog,
                  setTeamLoading,
                  setDeleting,
                  teamIds
                )
              }
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  );
};

export default ViewTeam;
