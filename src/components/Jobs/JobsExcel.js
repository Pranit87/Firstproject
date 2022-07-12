import React from "react";
import { downloadExcel } from "../../Services/jobsService";
import { Modal, Button } from "react-bootstrap";

export const JobsExcel = ({
  filters,
  startDate,
  endDate,
  downloadDataResponse,
  setDownloadDataResponse,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = React.useState(
    false
  );

  const handleClose = () => {
    setShowEmailConfirmation(false);
  };

  return (
    <div className="inner font pb-4 pr-3 text-lg-right text-center h4">
      <button
        className="btn btn-warning btn-lg font-weight-bold px-3 mr-2 mb-3 mb-lg-0 search-input-icon"
        onClick={() =>
          !loading &&
          downloadExcel(
            setLoading,
            startDate,
            endDate,
            filters,
            setShowEmailConfirmation
          )
        }
      >
        {loading ? (
          <div class="spinner-border text-dark" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            <img src="./images/download-black.png" alt="Download Excel" />{" "}
            <span>Download Excel</span>
          </>
        )}
      </button>
      <Modal show={showEmailConfirmation && true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Download Excel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showEmailConfirmation === "success"
            ? "A download link has been sent to you over email."
            : "Error in generating download link, please try again later."}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
