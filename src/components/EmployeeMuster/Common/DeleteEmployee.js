import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteWorkerEmployee } from "../../../Services/employeeServices";

const DeleteEmployeeDialog = ({
  confirmationDialog,
  setConfirmationDialog,
  id,
  page,
  setTabelLoading,
  tabelLoading,
}) => {
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setConfirmationDialog(false);
  };

  const handleDelete = () => {
    deleteWorkerEmployee(
      id,
      setLoading,
      page,
      handleClose,
      setTabelLoading,
      tabelLoading
    );
  };
  return (
    <Modal
      show={confirmationDialog}
      onHide={() => setConfirmationDialog(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Body>Are you sure you want to delete the employee?</Modal.Body>
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

export default DeleteEmployeeDialog;
