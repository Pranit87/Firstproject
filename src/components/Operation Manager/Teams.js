import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import AddTeam from "./AddTeam";
import AssignTarget from "./AssignTarget";
import AddMember from "./AddMember";
import "./Teams.css";
import { fetchTeams, deleteTeam } from "../../Services/teamsServices";
import { useUsers } from "../../Services/usersService";
import AccessDenied from "../Common/AccessDenied/AccessDenied";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactImageFallback from "react-image-fallback";

function Teams() {
  const [clients, setClients] = useState([]);
  const [showAssignTarget, setShowAssignTarget] = useState(false);
  const [leadId, setLeadId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [targets, setTargets] = React.useState([{}]);
  const [loading, setLoading] = React.useState(false);
  const [confirmationDialog, setConfirmationDialog] = React.useState(false);
  const [teamId, setTeamId] = React.useState();
  const [addMemberShow, setAddMemberShow] = React.useState(false);
  const { currentUser } = useUsers();
  const { permissions } = currentUser;
  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    fetchTeams(setClients, setLoading);
  }, [refresh]);

  const AcronymName = (props) => {
    var regular_ex = /\b(\w)/g;
    var matches = props.str.match(regular_ex);
    var acronym = matches.join("");

    return (
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="button-tooltip-2">{props.str}</Tooltip>}
      >
        <div className="containerAcronym">
          <div className="name_acronym-performer text-uppercase">{acronym}</div>
        </div>
      </OverlayTrigger>
    );
  };

  const showDeleteTeam = (teamId) => {
    setTeamId(teamId);
    setConfirmationDialog(true);
  };

  return (
    (Object.keys(permissions).length && !permissions.VIEW_TEAMS && (
      <AccessDenied />
    )) || (
      <>
        <div className="mx-4">
          <div className="h3 text-white my-5">Teams</div>
          <div className="inner">
            <div className="bg-white rounded-lg">
              <div className="pb-5 pt-3 px-3">
                <table className="table table-hover h6 w-100">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col" className="py-3">
                        Lead Name
                      </th>
                      <th scope="col" className="py-3">
                        Clients
                      </th>
                      <th scope="col" className="py-3">
                        Members
                      </th>
                      <th scope="col" className="py-3 text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {loading ? (
                      <tr className="text-center">
                        <td colSpan="9">
                          <div
                            className="spinner-border text-dark"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      Object.keys(clients).map(function (keyName, keyIndex) {
                        return (
                          <tr key={keyIndex}>
                            <td className="py-4" width="20%">
                              {keyName}
                            </td>
                            <td className="py-4" width="10%">
                              {(!clients[keyName]["clientCount"] && "0") ||
                                clients[keyName]["clientCount"]}
                            </td>
                            <td className="py-4" width="40%">
                              <div className="d-flex flex-row flex-wrap">
                                {clients[keyName]["members"].map(function (
                                  imgSrc
                                ) {
                                  return (
                                    (imgSrc.membersImage !== null && (
                                      <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                          <Tooltip id="button-tooltip-2">
                                            {imgSrc.memberName}
                                          </Tooltip>
                                        }
                                      >
                                        <ReactImageFallback
                                          src={`${process.env.REACT_APP_S3_BUCKET_PROFILE}${imgSrc.membersImage}`}
                                          fallbackImage={
                                            <AcronymName
                                              str={imgSrc.memberName}
                                            />
                                          }
                                          alt={imgSrc.memberName}
                                          className="team-members-image sg-back-color mx-1"
                                        />
                                      </OverlayTrigger>
                                    )) || (
                                      <AcronymName str={imgSrc.memberName} />
                                    )
                                  );
                                })}
                              </div>
                            </td>
                            <td className="py-4 text-center">
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    View Team
                                  </Tooltip>
                                }
                              >
                                <Link
                                  to={`/team/${clients[keyName]["leadId"]}`}
                                >
                                  <img src="/images/view-team.png" />
                                </Link>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    Assign Target
                                  </Tooltip>
                                }
                              >
                                <img
                                  src="/images/assign-target.png"
                                  onClick={(e) => {
                                    setLeadId(clients[keyName]["leadId"]);
                                    setRoleId(clients[keyName]["roleId"]);
                                    setShowAssignTarget(true);
                                  }}
                                />
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    Add Member
                                  </Tooltip>
                                }
                              >
                                <img
                                  src="/images/add-member.png"
                                  onClick={() => {
                                    setAddMemberShow(true);
                                    setTeamId(clients[keyName]["teamId"]);
                                  }}
                                />
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    Delete Member
                                  </Tooltip>
                                }
                              >
                                <a
                                  onClick={() =>
                                    showDeleteTeam(clients[keyName]["teamId"])
                                  }
                                >
                                  <img src="/images/delete-team.png" />
                                </a>
                              </OverlayTrigger>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>

                <Modal
                  show={confirmationDialog}
                  onHide={() => setConfirmationDialog(false)}
                  backdrop="static"
                  keyboard={false}
                  centered
                >
                  <Modal.Body>
                    Are you sure you want to delete team ?
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
                        deleteTeam(
                          teamId,
                          setClients,
                          setConfirmationDialog,
                          setLoading
                        )
                      }
                    >
                      {(loading && `Deleting`) || `Delete`}
                    </Button>
                  </Modal.Footer>
                </Modal>
                <AddMember
                  show={addMemberShow}
                  setCloseAddMember={() => setAddMemberShow(false)}
                  teamId={teamId}
                  setClients={setClients}
                  setLoading={setLoading}
                />
                <AssignTarget
                  show={showAssignTarget}
                  setCloseAssignTarget={(e) => setShowAssignTarget(false)}
                  leadId={leadId}
                  roleId={roleId}
                />
              </div>
            </div>
          </div>
          <div className="inner pagination justify-content-end">
            <AddTeam setRefresh={setRefresh} refresh={refresh} />
          </div>
        </div>
      </>
    )
  );
}

export default Teams;
