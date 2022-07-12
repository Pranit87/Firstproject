/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number      Developer       Description
 * -------------------------------------------------------------------
 * 30-Oct-2020    LOADING_COMMON_STABLE    Abhishek Datar  Created
 *
 *
 *********************************************************************/

import React from "react";
import { Modal } from "react-bootstrap";
import Loader from "react-loader-spinner";

const LoadingModal = ({ openLoading, spinnerLoading, showMessage }) => {
  const defaultMessage = "Retrieving data. Please wait.";
  const [message, setMessage] = React.useState(defaultMessage);

  // if (openLoading && message === defaultMessage) {
  //   setTimeout(() => {
  //     setMessage("Oops! It's taking longer than expected.");
  //   }, 7000);
  // }

  return (
    <>
      <Modal show={openLoading} size="sm" backdrop="static" keyboard={false}>
        <Modal.Body>
          <div align="center">{showMessage || message}</div>
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={75}
            width={75}
            visible={spinnerLoading}
            style={{ paddingLeft: "35%" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoadingModal;
