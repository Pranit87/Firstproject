import React from "react";
import { Modal, Button } from "react-bootstrap";
import { postEOCStatus } from "../../../Services/employeeServices";
import { format } from "date-fns";

const EOCDialog = ({
  show,
  setShowEOCDialog,
  status,
  id,
  setLoading,
  loading,
}) => {
  var date = new Date();
  const [EOCDate, setEOCDate] = React.useState(new Date(date));
  const [submitting, setSubmitting] = React.useState(false);

  const handleEOC = () => {
    const data = {
      id: id,
      Type: status === 1 ? "Mark" : "Reverse",
      actual_end_date: EOCDate,
    };
    postEOCStatus(data, setSubmitting, setShowEOCDialog, setLoading, loading);
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setShowEOCDialog(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{`${status === 1 ? "Mark" : "Reverse"} EOC`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!submitting ? (
          <>
            <div className="col-lg pt-2 required">End Date</div>
            <div className="col-lg pt-3">
              <input
                type="date"
                required
                className="form-control pt-2"
                onChange={(event) => {
                  setEOCDate(event.target.value);
                }}
                value={EOCDate && format(new Date(EOCDate), "yyyy-MM-dd")}
              />
            </div>
          </>
        ) : (
          <div
            className="text-center add-resume-spinner-background"
            style={{ width: "500px" }}
          >
            <div
              class="spinner-border spinner-border-sm text-primary"
              role="status"
            ></div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShowEOCDialog(false);
          }}
        >
          Close
        </Button>
        <Button
          variant="primary"
          disabled={submitting || !EOCDate}
          onClick={() => handleEOC()}
        >
          {`${status === 1 ? "Mark" : "Reverse"} EOC`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EOCDialog;
