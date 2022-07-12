import React from "react";
import "./viewResume.css";
import Editor from "../Common/editor";
import { Modal, Button } from "react-bootstrap";
import {
  getDefaultTemplate,
  getCreatedTemplates,
  sendEmail,
  createUpdateEmailTemplate,
  getSelectedTemp,
  deleteEmailTemplate,
} from "../../Services/bulkEmailServices";
import { Notification } from "../Common/Notification/Notification";

const BulkEmail = (props) => {
  const [defaultTemplate, setDefaultTemplate] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const profile = localStorage.getItem("profile");
  const user_id = JSON.parse(profile)["id"];
  const [checked, setChecked] = React.useState("default");
  const [emailContent, setEmailContent] = React.useState("");
  const [emailSub, setEmailSub] = React.useState(
    `New Job Opportunity - ${
      typeof props.jobTitle !== "undefined" ? props.jobTitle : ""
    } ${typeof props.jobLocation !== "undefined" ? props.jobLocation : ""}`
  );
  const [sendingEmail, setSendingEmail] = React.useState(false);
  const [tempName, setTempName] = React.useState();
  const [createdTemplates, setCreatedTemplates] = React.useState([]);
  const [selectedTemplate, setSelectedTemplate] = React.useState();
  const [selectedEmailTemp, setSelectedEmailTemp] = React.useState();
  const [loadingTemp, setLoadingTemp] = React.useState();
  const [loadingTempOptions, setLoadingTempOptions] = React.useState(false);
  const [savingTemp, setSavingTemp] = React.useState(false);
  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });
  const [deleteRespLoading, setDeleteRespLoading] = React.useState(false);
  // Call API to get default email template
  React.useEffect(() => {
    setNotify({
      show: false,
      description: "",
      type: "",
    });
    if (props.open) {
      props.closeLikedProfiles();
      getDefaultTemplate(props.reqId, user_id, setDefaultTemplate, setLoading);
      setEmailSub(
        `New Job Opportunity - ${
          typeof props.jobTitle !== "undefined" ? props.jobTitle : ""
        } ${typeof props.jobLocation !== "undefined" ? props.jobLocation : ""}`
      );
    }
  }, [props.reqId, props.open]);
  // Handler for radio button change
  const handleSelectedOption = (event) => {
    setChecked(event.target.value);
    setEmailSub(
      `New Job Opportunity - ${
        typeof props.jobTitle !== "undefined" ? props.jobTitle : ""
      } ${typeof props.jobLocation !== "undefined" ? props.jobLocation : ""}`
    );
    setTempName("");
    setSelectedEmailTemp("");
    setSelectedTemplate("");
    if (event.target.value === "created") {
      getCreatedTemplates(setCreatedTemplates, setLoadingTempOptions);
    }
  };
  // Handler for template name input change
  const handleTemplateInputChange = (event) => {
    setTempName(event.target.value);
  };
  // Handler for subject name input change
  const handleSubInputChange = (event) => {
    setEmailSub(event.target.value);
  };
  // Handler for Save button
  const handleSaveEmailTemplate = (event) => {
    const templateName = (checked === "default" && emailSub) || tempName;
    createUpdateEmailTemplate(
      user_id,
      templateName,
      emailContent,
      (checked === "created" && "update") || "create",
      (checked === "created" && selectedTemplate) || "",
      setNotify,
      setSavingTemp
    );
  };
  // Handler for Send button
  const handleSendEmail = (event) => {
    setSendingEmail(true);
    sendEmail(
      props.resumeIds,
      props.reqId,
      emailSub,
      emailContent,
      setSendingEmail,
      setNotify,
      props.close,
      props.string,
      props.setResumeIds
    );
  };
  // To load selected temp content
  const loadSelectedTemp = (value) => {
    getSelectedTemp(
      value,
      setLoadingTemp,
      setSelectedEmailTemp,
      setEmailContent
    );
  };
  // Handler for Cancel button
  const handleCancel = (event) => {
    props.close();
    setEmailSub("");
    setEmailContent("");
    setChecked("default");
  };

  // To Delete Email Template
  const handleDeleteEmailTemplate = (event) => {
    deleteEmailTemplate(
      selectedTemplate,
      setNotify,
      setDeleteRespLoading,
      setChecked
    );
    getCreatedTemplates(setCreatedTemplates, setLoadingTempOptions);
    setEmailContent("");
  };

  return (
    <Modal
      show={props.open}
      onHide={props.close}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
    >
      <Modal.Header className="message-popup-custom text-white">
        <Modal.Title>Bulk Email</Modal.Title>
      </Modal.Header>
      <Modal.Body className="my-3">
        {(loading && (
          <div class="spinner-border spinnerCentered" role="status"></div>
        )) || (
          <>
            {notify.show && <Notification {...notify} />}
            <div class="row">
              <div class="col-lg">
                <form onChange={(e) => handleSelectedOption(e)}>
                  <label class="radio-inline mx-3">
                    <input
                      type="radio"
                      name="optradio"
                      value="default"
                      checked={checked === "default"}
                    />
                    &nbsp; Default Template
                  </label>
                  <label class="radio-inline mx-3">
                    <input
                      type="radio"
                      name="optradio"
                      value="created"
                      checked={checked === "created"}
                    />
                    &nbsp; Created Template
                  </label>
                  <label class="radio-inline mx-3">
                    <input
                      type="radio"
                      name="optradio"
                      value="create"
                      checked={checked === "create"}
                    />
                    &nbsp; Create New Template
                  </label>
                </form>
              </div>
            </div>
            <div>
              {checked === "create" && (
                <input
                  type="text"
                  placeholder="Template Name"
                  value={tempName}
                  className="form-control my-3"
                  onChange={(e) => handleTemplateInputChange(e)}
                />
              )}
            </div>
            {checked === "created" && (
              <div className="mt-2">
                {(loadingTempOptions && (
                  <div
                    class="spinner-border spinnerCentered"
                    role="status"
                  ></div>
                )) || (
                  <select
                    name="select-type"
                    id="createdTemo"
                    className="form-control "
                    value={selectedTemplate}
                    onChange={(e) => {
                      setSelectedTemplate(e.target.value);
                      loadSelectedTemp(e.target.value);
                    }}
                    required
                  >
                    <option value="">Select Template</option>
                    {createdTemplates &&
                      createdTemplates.map(function (item) {
                        return <option value={item.id}>{item.value}</option>;
                      })}
                  </select>
                )}
              </div>
            )}
            {checked != "create" && (
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={emailSub}
                  className="form-control my-3"
                  onChange={(e) => handleSubInputChange(e)}
                />
              </div>
            )}
            <div>
              {(loadingTemp && (
                <div class="spinner-border spinnerCentered" role="status"></div>
              )) || (
                <Editor
                  defaultTemplate={
                    Object.keys(defaultTemplate).length && defaultTemplate
                  }
                  selectedEmailTemp={selectedEmailTemp}
                  checked={checked}
                  setEmailContent={setEmailContent}
                />
              )}
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer className="pagination justify-content-start">
        {!sendingEmail && (
          <Button
            variant="primary"
            className="px-4"
            data-toggle="modal"
            data-target="#send-email-popup"
            onClick={(e) => handleSendEmail(e)}
            disabled={!emailContent}
          >
            Send Email
          </Button>
        )}
        {sendingEmail && (
          <Button variant="primary" className="px-4" disabled={sendingEmail}>
            Sending...
          </Button>
        )}
        <Button
          variant="primary"
          className="px-4"
          data-toggle="modal"
          data-target="#send-email-popup"
          disabled={!emailContent || savingTemp}
          onClick={(e) => handleSaveEmailTemplate(e)}
        >
          {checked != "created" &&
            ((savingTemp && `Saving...`) || `Save Template`)}
          {checked === "created" &&
            ((savingTemp && `Updating...`) || `Update Template`)}
        </Button>
        {checked === "created" && (
          <Button
            variant="primary"
            className="px-4"
            data-toggle="modal"
            data-target="#send-email-popup"
            disabled={!emailContent || deleteRespLoading}
            onClick={(e) => handleDeleteEmailTemplate(e)}
          >
            {(deleteRespLoading && `Deleting`) || `Delete`}
          </Button>
        )}
        <Button
          variant="secondary"
          className="px-4"
          onClick={(e) => handleCancel(e)}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BulkEmail;
