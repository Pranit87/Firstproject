import React from "react";
import { getCandidateStatus } from "../../../Services/jobsService";
import { Modal, Button, Form } from "react-bootstrap";
import { Notification } from "../../Common/Notification/Notification";

const MailMergeDialog = ({
  showMailMergeDialog,
  setShowMailMergeDialog,
  senderList,
  requisitionId,
  setOpenBulkEmail,
  setBulkEmailResumeIds,
}) => {
  const [candidates, setCandidates] = React.useState([]);
  const [resumeIds, setResumeIds] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });

  React.useEffect(() => {
    getCandidateStatus(
      senderList,
      requisitionId,
      setCandidates,
      setLoading,
      setNotify,
      setResumeIds
    );
  }, [senderList, requisitionId]);

  const handleClick = () => {
    setOpenBulkEmail(true);
    setBulkEmailResumeIds(resumeIds);
  };

  return (
    <Modal
      show={showMailMergeDialog}
      onHide={() => setShowMailMergeDialog(false)}
    >
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Mail Merge</Modal.Title>
        </Modal.Header>
        <Notification {...notify} />
        <Modal.Body>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-dark" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <Form.Group controlId="resumeIds">
              <Form.Label>
                List of users mentioned below with checkbox enabled will only
                receive emails:
              </Form.Label>
              {candidates.map((item) => (
                <Form.Check
                  id={`item-${item.resume_id}`}
                  key={item.name}
                  disabled={!item.isStatus}
                  checked={item.isStatus || undefined}
                  label={
                    <span className={`${!item.isStatus && `lineThrough`}`}>
                      {item.name} - {item.email}
                    </span>
                  }
                />
              ))}
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowMailMergeDialog(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={!resumeIds.length}
            variant="primary"
            onClick={() => handleClick(resumeIds)}
          >
            {!submitting ? "Send" : "Sending..."}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default MailMergeDialog;
