import React from "react";
import { SendSms } from "../../../Services/candidateServices";
import { Modal, Button } from "react-bootstrap";
import { Notification } from "../../Common/Notification/Notification";

const SMSDialog = ({ show, setShowSMSDialog, smsInfo }) => {
  const [message, setMessage] = React.useState("");
  const [remainingCharacters, setRemainingCharacters] = React.useState(160);
  const [submitting, setSubmitting] = React.useState(false);

  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });

  const sms = new FormData();
  sms.append("ownerPhoneNumber", smsInfo.from);
  sms.append("contactPhoneNumbers", smsInfo.to);
  sms.append("body", message);
  sms.append("userKey", smsInfo.userKey);

  const send = () => {
    setNotify({
      show: false,
      description: "",
      type: "",
    });
    SendSms(sms, setNotify, setSubmitting, setMessage);
    clearFields();
  };

  const clearFields = () => {
    setRemainingCharacters(160);
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setShowSMSDialog(false);
        setNotify({
          show: false,
          description: "",
          type: "",
        });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Send SMS</Modal.Title>
      </Modal.Header>
      {notify.show && <Notification {...notify} />}
      <Modal.Body>
        {!submitting ? (
          <>
            <textarea
              maxlength="160"
              name="message"
              className="form-control resize-custom"
              cols="80"
              rows="4"
              drop-disable
              ondragstart="return false"
              ondrop="return false"
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
              onInput={(event) => {
                setRemainingCharacters(160 - event.target.value.length);
              }}
              value={message}
              disabled={submitting}
            ></textarea>
            <div class="text-secondary feedback">
              Characters remaining {remainingCharacters}, only alphabets &
              numbers allowed.
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
            setShowSMSDialog(false);
            setNotify({
              show: false,
              description: "",
              type: "",
            });
          }}
        >
          Close
        </Button>
        <Button
          variant="primary"
          disabled={message.length === 0 || submitting}
          onClick={() => send()}
        >
          {!submitting ? "Send" : "Sending..."}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SMSDialog;
