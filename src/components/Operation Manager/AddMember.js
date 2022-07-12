import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./Teams.css";
import {
  getTeamMembersList,
  addTeamMembers,
} from "../../Services/teamsServices";
import { Typeahead } from "react-bootstrap-typeahead";

const AddMember = (props) => {
  const [teamMembersList, setTeamMembersList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  let teamMembers = [];
  const [selectedMembers, setSelectedMembers] = React.useState([]);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (props.show) {
      getTeamMembersList(props.teamId, setTeamMembersList, setLoading);
    }
  }, [props.teamId]);

  const saveMembers = () => {
    addTeamMembers(
      props.teamId,
      selectedMembers,
      setSaving,
      props.setClients,
      props.setLoading,
      props.setCloseAddMember
    );
  };

  if (teamMembersList.length) {
    teamMembersList.map((data) => {
      teamMembers.push(`${data.recruiter_name}(${data.lead_name})`);
    });
  }
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.setCloseAddMember}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header className="message-popup-custom text-white">
          <Modal.Title>Add Member</Modal.Title>
        </Modal.Header>
        <Modal.Body className="my-3">
          {(loading && (
            <div class="spinner-border spinnerCentered" role="status"></div>
          )) || (
            <Typeahead
              id="basic-typeahead-multiple"
              labelKey="name"
              multiple
              onChange={(e)=>setSelectedMembers(e)}
              options={teamMembersList}
              placeholder="Select Team"
              labelKey={option => `${option.recruiter_name}(${option.lead_name})`}
            />
          )}
        </Modal.Body>

        <Modal.Footer className="pagination justify-content-start">
          <Button
            variant="primary"
            className="px-4"
            disabled={!selectedMembers.length || saving}
            onClick={() => saveMembers()}
          >
            {!saving && `Save` || `Saving...`}
          </Button>
          <Button
            variant="secondary"
            className="px-4"
            onClick={props.setCloseAddMember}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddMember;
