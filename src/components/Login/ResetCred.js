import React from "react";
import "./login.css";
import { Formik } from "formik";
import { postResetPassword } from "../../Services/authServices";
import { Notification } from "../Common/Notification/Notification";
import { Modal, Button, OverlayTrigger, Popover } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import AuthApi from "../../Services/authAPI";

const ResetCred = ({ showState, setShowState, setStateClone }) => {
  const [show, setShow] = React.useState(showState);
  const [submitting, setSubmitting] = React.useState(false);
  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });
  const [inputType, setInputType] = React.useState("password");
  const [iconToggle, setIconToggle] = React.useState(true);
  const [inputTypeOne, setInputTypeOne] = React.useState("password");
  const [iconToggleOne, setIconToggleOne] = React.useState(true);
  const [successSubmit, setSuccessSubmit] = React.useState(false);
  const Auth = React.useContext(AuthApi);
  const profile = localStorage.getItem("profile");

  const handleLogout = () => {
    localStorage.removeItem("token");
    Auth.setAuth(false);
  };

  const popover = (
    <Popover id="popover-basic" style={{ padding: "0px" }}>
      <Popover.Title as="h3">Password Criteria</Popover.Title>
      <Popover.Content style={{ fontSize: "13px" }}>
        Password should be 8 to 15 characters which contain at least{" "}
        <strong>one lowercase letter</strong>,{" "}
        <strong>one uppercase letter</strong>,{" "}
        <strong>one numeric digit</strong>, and{" "}
        <strong>one special character</strong>.
      </Popover.Content>
    </Popover>
  );

  const handleClose = () => {
    setStateClone && setStateClone();
    setShow(!show);
    setShowState(false);
  };

  return (
    <>
      <Modal
        show={showState}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-50w"
      >
        <Modal.Header className="message-popup-custom add-resume-modal-size">
          <Modal.Title>
            <div className="h5 text-white sign-in-color-custom mt-2">
              RESET PASSWORD &nbsp;
              <OverlayTrigger
                trigger="hover"
                placement="bottom"
                overlay={popover}
              >
                <Icon.InfoCircle
                  size="15px"
                  style={{ verticalAlign: "inherit" }}
                />
              </OverlayTrigger>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="font px-4">
          <div className="col-lg border-custom rounded-bottom">
            <div>
              <div>{notify.show && <Notification {...notify} />}</div>
              {!successSubmit ? (
                <Formik
                  initialValues={{ newPassword: "", confirmPassword: "" }}
                  validate={(values) => {
                    const errors = {};
                    var regex =
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
                    console.log(regex.test(values.newPassword));
                    if (!values.newPassword) {
                      errors.newPassword = "Required";
                    } else if (!regex.test(values.newPassword)) {
                      errors.newPassword = "Password doesn't meet the criteria";
                    } else if (!values.confirmPassword) {
                      errors.confirmPassword = "Required";
                    } else if (values.newPassword !== values.confirmPassword) {
                      errors.confirmPassword = "Password Not Match";
                    }
                    return errors;
                  }}
                  onSubmit={(values) => {
                    console.log(values);
                    var FormData = require("form-data");
                    var data = new FormData();
                    data.append("email", JSON.parse(profile)["email"]);
                    data.append("password", values.confirmPassword);
                    postResetPassword(
                      data,
                      setSubmitting,
                      setNotify,
                      setSuccessSubmit
                    );
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="mr-0 py-2">
                        <div className="input-style">
                          <input
                            type={inputType}
                            autoComplete="off"
                            className="form-control mainLoginInput"
                            name="newPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder=" New Password "
                          />
                          {iconToggle ? (
                            <Icon.EyeSlash
                              size="18px"
                              className="eye-icon"
                              onClick={() => {
                                setIconToggle(!iconToggle);
                                setInputType("text");
                              }}
                            />
                          ) : (
                            <Icon.Eye
                              size="18px"
                              className="eye-icon"
                              onClick={() => {
                                setIconToggle(!iconToggle);
                                setInputType("password");
                              }}
                            />
                          )}
                        </div>
                        <span className="danger">
                          {errors.newPassword &&
                            touched.newPassword &&
                            errors.newPassword}
                        </span>
                      </div>
                      <div className="mr-0 py-2">
                        <div className="input-style">
                          <input
                            type={inputTypeOne}
                            autoComplete="off"
                            className="form-control mainLoginInput"
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder=" Confirm Password"
                          />
                          {iconToggleOne ? (
                            <Icon.EyeSlash
                              size="18px"
                              className="eye-icon"
                              onClick={() => {
                                setIconToggleOne(!iconToggleOne);
                                setInputTypeOne("text");
                              }}
                            />
                          ) : (
                            <Icon.Eye
                              size="18px"
                              className="eye-icon"
                              onClick={() => {
                                setIconToggleOne(!iconToggleOne);
                                setInputTypeOne("password");
                              }}
                            />
                          )}
                        </div>
                        <span className="danger">
                          {errors.confirmPassword &&
                            touched.confirmPassword &&
                            errors.confirmPassword}
                        </span>
                      </div>
                      <div
                        className="row mr-0 py-2"
                        style={{ justifyContent: "flex-end" }}
                      >
                        <div className="">
                          <button
                            type="submit"
                            className="btn btn-warning text-black px-5 font-weight-bold text-lg-left"
                          >
                            {!submitting ? "Submit" : "Submitting..."}
                          </button>

                          {JSON.parse(profile)["login_status"] !== 1 && (
                            <Button
                              variant="secondary"
                              className="px-4 ml-4"
                              onClick={handleClose}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              ) : (
                <div>
                  Back to{" "}
                  <Link to="/login" onClick={() => handleLogout()}>
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ResetCred;
