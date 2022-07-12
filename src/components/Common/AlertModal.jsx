/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 * Description: Common component to return a modal with genric error message.
 *
 * Date           Branch/Issue Number      Developer       Description
 * -------------------------------------------------------------------
 * 01-Nov-2020    master                   Abhishek Datar  Created
 *
 *
 *********************************************************************/

import React from "react";
import { Modal, Button } from "react-bootstrap";
import Loader from "react-loader-spinner";

const AlertModal = ({ alertLoading }) => {
  console.log("modal alert loading ", alertLoading);
  const [alert, setAlert] = React.useState(alertLoading);
  console.log("aert ", alert);
  //<div align="center" style={{ paddingTop: "15px" }}>
  const handleClose = (e) => {
    setAlert(false);
  };
  return (
    <Modal show={alertLoading} size="sm" backdrop="static" keyboard={false}>
      <Modal show={alertLoading} size="sm">
        <Modal.Body>
          <div align="center" style={{ color: "red" }}>
            Error processing your request.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => handleClose(e)}>Ok</Button>
        </Modal.Footer>
      </Modal>
    </Modal>
  );
};

export default AlertModal;
