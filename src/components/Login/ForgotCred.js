import React, { Fragment } from "react";
import "./login.css";
import { Formik } from "formik";
import {
  postForgotPassword,
  getVerifyCode,
  postChangePassword,
} from "../../Services/authServices";
import { Notification } from "../Common/Notification/Notification";
import { OverlayTrigger, Popover } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const ForgotCred = () => {
  const [forgotDiv, setForgotDiv] = React.useState(true);
  const [forgotPasswordDiv, setForgotPasswordDiv] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [codeDiv, setCodeDiv] = React.useState(true);
  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });
  const [emailAddress, setEmailAddress] = React.useState(null);
  const [verficationCode, setVerficationCode] = React.useState(null);
  const [inputType, setInputType] = React.useState("password");
  const [iconToggle, setIconToggle] = React.useState(true);
  const [inputTypeOne, setInputTypeOne] = React.useState("password");
  const [iconToggleOne, setIconToggleOne] = React.useState(true);
  const [successSubmit, setSuccessSubmit] = React.useState(false);

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

  return (
    <Fragment>
      <div className="login">
        <div className="container-fluid pb-3 pt-lg-5 mt-lg-5 sign-in-custom">
          <img src={"/img/yatslogo.png"} alt="Logo" />
          <div className="">
            <div className="row">
              <div className="col-lg-7 back-color-custom font px-5 border-custom1">
                <div className="text-center px-1 pt-4 pb-2 text-white">
                  YourATS is a comprehensive staffing solution covering all
                  aspects of staffing business to empower recruiters towards
                  <br />
                  <i className="h5 font-weight-bold">
                    Efficient & Smart Recruitment
                  </i>{" "}
                  <br />
                  <div className="d-flex ">
                    <hr className="flex-grow-1" />
                    <span className="text-center my-3  px-2">Powered By:</span>
                    <hr className="flex-grow-1" />
                  </div>
                  <div className="row text-left login-font-size">
                    <div className="col-lg">
                      <ul className="pl-0 mb-0 ul-style-login">
                        <li className="li-style-login">VMS Integration</li>
                        <li className="li-style-login">Unlimited Emails</li>
                        <li className="li-style-login">
                          Unlimited Calling and Texting
                        </li>
                        <li className="li-style-login">Business Analytics</li>
                      </ul>
                    </div>
                    <div className="col-lg">
                      <ul className="pl-0 mb-0 ul-style-login">
                        <li className="li-style-login">
                          Real time performance monitoring
                        </li>
                        <li className="li-style-login">
                          Source from all Job Boards in one go!
                        </li>
                        <li className="li-style-login">
                          Keep track of your consultants
                        </li>
                        <li className="li-style-login">
                          Advanced User Experience
                        </li>
                      </ul>
                    </div>
                  </div>{" "}
                  <br />
                  <i className="h6 font-weight-bold text-warning">
                    Built by Recruiters for Recruiters
                  </i>
                  <div className="row py-2"></div>
                </div>
              </div>
              {forgotDiv && (
                <div className="col-lg-5 bg-white border-custom rounded-bottom">
                  <div className="h5 sign-in-color-custom pl-3 pl-lg-3 pt-3 pt-lg-4 mt-lg-3">
                    FORGOT PASSWORD?
                  </div>
                  <div className="pl-3 pt-2">
                    <div>
                      <Notification {...notify} />
                    </div>
                    <Formik
                      initialValues={{ email: "" }}
                      validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                          errors.email = "Required";
                        } else if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.email
                          )
                        ) {
                          errors.email = "Invalid email address";
                        }
                        return errors;
                      }}
                      onSubmit={(values) => {
                        setEmailAddress(values.email);
                        postForgotPassword(
                          values.email,
                          setForgotDiv,
                          setCodeDiv,
                          setSubmitting,
                          setNotify
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
                          <div className="form-group mr-lg-2 pr-4 mr-0 py-2">
                            <input
                              type="email"
                              autoComplete="off"
                              className="form-control mainLoginInput"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              placeholder="&#xf0e0;    Email ID"
                              aria-describedby="emailHelp"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="This is the text of the tooltip"
                            />
                            <span className="danger">
                              {errors.email && touched.email && errors.email}
                            </span>
                          </div>
                          <div
                            className="row mr-lg-2 pr-4 mr-0 py-2"
                            style={{ justifyContent: "flex-end" }}
                          >
                            <div className="">
                              <button
                                type="submit"
                                className="btn btn-warning text-black px-5 font-weight-bold text-lg-left ml-4"
                                disabled={
                                  values.email.length === 0 || submitting
                                }
                              >
                                {!submitting ? "Submit" : "Submitting..."}
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </Formik>
                    <div className="hr-login ml-lg-n3"></div>
                    <div className="sign-in-color-custom py-3 ml-lg-n3 px-3 px-lg-0 h6">
                      Back to&nbsp;
                      <Link to="/login">
                        <u>Sign In</u>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              {!codeDiv && (
                <div className="col-lg-5 bg-white border-custom rounded-bottom">
                  <div className="h5 sign-in-color-custom pl-3 pl-lg-3 pt-3 pt-lg-4 mt-lg-3">
                    Enter Verification Code
                  </div>
                  <div className="pl-3 pt-2">
                    <Notification {...notify} />
                    <span>Code sent to your email.</span>
                    <Formik
                      initialValues={{ code: "" }}
                      onSubmit={(values) => {
                        setVerficationCode(values.code);
                        getVerifyCode(
                          emailAddress,
                          values.code,
                          setCodeDiv,
                          setSubmitting,
                          setNotify,
                          setForgotPasswordDiv
                        );
                      }}
                    >
                      {({ values, handleChange, handleBlur, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                          <div className="form-group mr-lg-2 pr-4 mr-0 py-2">
                            <input
                              type="text"
                              autoComplete="off"
                              className="form-control mainLoginInput"
                              name="code"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.code}
                              placeholder="Enter Code"
                            />
                          </div>
                          <div
                            className="row mr-lg-2 pr-4 mr-0 py-2"
                            style={{ justifyContent: "flex-end" }}
                          >
                            <div className="">
                              <button
                                type="submit"
                                className="btn btn-warning text-black px-5 font-weight-bold text-lg-left ml-4"
                                disabled={
                                  values.code.length === 0 || !submitting
                                }
                              >
                                {!submitting ? "Verifying..." : "Verify"}
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              )}
              {!forgotPasswordDiv && (
                <div className="col-lg-5 bg-white border-custom rounded-bottom">
                  <div className="h5 sign-in-color-custom pl-3 pl-lg-3 pt-3 pt-lg-4 mt-lg-3">
                    CHANGE PASSWORD &nbsp;
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
                  <div className="pl-3 pt-2">
                    <div>
                      <Notification {...notify} />
                    </div>
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
                          errors.newPassword =
                            "Password doesn't meet the criteria";
                        } else if (!values.confirmPassword) {
                          errors.confirmPassword = "Required";
                        } else if (
                          values.newPassword !== values.confirmPassword
                        ) {
                          errors.confirmPassword = "Password Not Match";
                        }
                        return errors;
                      }}
                      onSubmit={(values) => {
                        var qs = require("qs");
                        var data = qs.stringify({
                          email: emailAddress,
                          password: values.confirmPassword,
                          verificationCode: verficationCode,
                        });
                        postChangePassword(
                          data,
                          setSubmitting,
                          setNotify,
                          setSuccessSubmit,
                          setForgotPasswordDiv
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
                          <div className="form-group mr-lg-2 pr-4 mr-0 py-2">
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
                          <div className="form-group mr-lg-2 pr-4 mr-0 py-2">
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
                            className="row mr-lg-2 pr-4 mr-0 py-2"
                            style={{ justifyContent: "flex-end" }}
                          >
                            <div className="">
                              <button
                                type="submit"
                                className="btn btn-warning text-black px-5 font-weight-bold text-lg-left ml-4"
                              >
                                {!submitting ? "Submit" : "Submitting..."}
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              )}
              {successSubmit && (
                <div className="col-lg-5 bg-white border-custom rounded-bottom">
                  <div className="h5 sign-in-color-custom pl-3 pl-lg-3 pt-3 pt-lg-4 mt-lg-3">
                    PASSWORD CHANGED
                  </div>
                  <div className="pl-3 pt-2">
                    Password Changed Successfully&nbsp;{" "}
                    <Icon.CheckCircleFill size="15px" fill="green" />
                  </div>
                  <div className="pl-3 pt-4">
                    Back to <Link to="/login">Sign In</Link>
                  </div>
                </div>
              )}
            </div>
            <div className="text-white py-2 pt-lg-2 vats-com-custom h6">
              &#169;{new Date().getFullYear()} Yats.com
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotCred;
