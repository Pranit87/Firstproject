import React from "react";
import { Modal } from "react-bootstrap";

const GotoLoadingModal = ({ callLoading, setCallLoading, callDialogData }) => {
  return (
    <>
      <Modal
        show={callLoading}
        onHide={() => {
          setCallLoading(false);
        }}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>
          Calling <strong>{callLoading && callDialogData}...</strong>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GotoLoadingModal;
