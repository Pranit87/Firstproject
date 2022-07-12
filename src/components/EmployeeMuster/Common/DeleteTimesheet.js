import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteTimesheet } from "../../../Services/employeeServices";

const DeleteTimesheetDialog = ({
  TimesheetDialog,
  setTimesheetDialog,
  id,
  timesheet_id,
  page,
  setTabelLoading,
  tabelLoading,
}) => {
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setTimesheetDialog(false);
  };

  const handleDelete = () => {
    deleteTimesheet(
      id,
      timesheet_id,
      setLoading,
      page,
      handleClose,
      setTabelLoading,
      tabelLoading
    );
  };
  return (
    <Modal
      show={TimesheetDialog}
      onHide={() => setTimesheetDialog(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Body>Are you sure you want to delete the Timesheet?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>
          Close
        </Button>
        <Button
          variant="primary"
          className="btn btn-danger"
          onClick={() => handleDelete()}
          disabled={loading}
        >
          {(loading && `Deleting...`) || `Delete`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTimesheetDialog;
