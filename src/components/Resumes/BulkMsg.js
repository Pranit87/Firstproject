/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number   Developer     Description
 * ------------------------------------------------------------------
 * 19-Oct-2020    -                     Esha Joshi     Created
 * 3 Nov 2020     master                Esha            Bulk msg api
 *
 *
 *
 *********************************************************************/
import React from "react";
import "./viewResume.css";
import { SendSms } from "../../Services/candidateServices";
import { Modal } from "react-bootstrap";

const BulkMsg = (props) => {
  const { data } = props;
  const [bodySMS, setBodySMS] = React.useState("");
  const [remainingChar, setRemainingChar] = React.useState(160);
  const recruiterData = localStorage.getItem("profile");
  var FormData = require("form-data");
  var smsdata = new FormData();
  smsdata.append("ownerPhoneNumber", JSON.parse(recruiterData)["mobile"]);
  smsdata.append("contactPhoneNumbers", data);
  smsdata.append("body", bodySMS);
  smsdata.append("userKey", JSON.parse(recruiterData)["externalUserID"]);
  const sendMessage = () => {
    SendSms(smsdata);
    clearFields();
    showMessage();
  };

  const clearFields = () => {
    setBodySMS("");
    setRemainingChar(160);
  };

  const showMessage = () => {
    alert("Your message has been sent");
  };

  return (
    <>
      <div
        class="modal fade"
        id="send-message-popup"
        data-backdrop="static"
        data-keyboard="false"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg font">
          <div class="modal-content">
            <div class="modal-header message-popup-custom">
              <h5 class="modal-title text-white" id="send-message-popup">
                Send SMS
              </h5>
            </div>
            <div class="modal-body">
              <textarea
                maxlength="160"
                name="message"
                class="form-control resize-custom"
                cols="80"
                rows="4"
                drop-disable
                ondragstart="return false"
                ondrop="return false"
                placeholder="Message"
                onChange={(e) => setBodySMS(e.target.value)}
                onInput={(event) => {
                  setRemainingChar(160 - event.target.value.length);
                }}
                value={bodySMS}
              ></textarea>
              <div class="text-secondary feedback">
                Characters remaining {remainingChar}, only alphabets & numbers
                allowed
              </div>
              <div class="py-4">
                <button
                  type="button"
                  class="btn btn-sm text-white px-3 bg-color-save mr-2"
                  onClick={() => sendMessage()}
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  Send SMS
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                  class="btn btn-sm btn-secondary px-4"
                  onClick={() => clearFields()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkMsg;
