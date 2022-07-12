import React, { Fragment, useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import { postLoginAuth } from "../../Services/authServices";
import AuthApi from "../../Services/authAPI";
import { Link } from "react-router-dom";
import "./login.css";
import { Notification } from "../Common/Notification/Notification";

const Login = (props) => {
  const Auth = React.useContext(AuthApi);
  const [authData, setAuthData] = React.useState(null);
  const [formData, setFormData] = useState({
    loginEmail: localStorage.getItem("yatsEmail") || "",
    loginPassword: localStorage.getItem("yatsPassword") || "",
    rememberMe: localStorage.getItem("yatsRememberMe") || false,
  });
  const [notificationMessage, setNotificationMessage] = React.useState(null);

  const [showSpinner, setShowSpinner] = React.useState("d-none");
  const [showLoginText, setShowLoginText] = React.useState("");
  const { loginEmail, loginPassword, rememberMe } = formData;
  const [showMessage, setShowMessage] = React.useState("");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (loginEmail !== "" && loginPassword !== "") {
      postLoginAuth(
        loginEmail,
        loginPassword,
        setAuthData,
        setNotificationMessage,
        setShowSpinner,
        setShowLoginText,
        setShowMessage,
        rememberMe
      );
    }
  };

  React.useEffect(() => {
    if (authData) {
      Auth.setAuthData(authData);
      Auth.setAuth(true);
    }
  }, [authData]);

  return (
    <Fragment>
      <div className="login">
        <div className="container-fluid pb-3 pt-lg-5 mt-lg-5 sign-in-custom">
          <img src={"/img/yatslogo.png"} />
          <div className="">
            <div className="row">
              <div className="col-lg-7 back-color-custom font px-5 border-custom1">
                <div className="text-center px-1 pt-4 pb-2 text-white">
                  YourATS is a comprehensive staffing solution covering all
                  aspects of staffing business to empower recruiters towards
                  <br />
                  <i className="h5 font-weight-bold">
                    Efficient &amp; Smart Recruitment
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
              <div className="col-lg-5 bg-white border-custom rounded-bottom">
                <div className="h5 sign-in-color-custom pl-3 pl-lg-3 pt-3 pt-lg-4 mt-lg-3">
                  SIGN IN
                </div>
                <div className="pl-3 pl-lg-3">
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group mr-lg-2 pr-4 mr-0 py-2">
                      <input
                        type="email"
                        name="loginEmail"
                        className="form-control mainLoginInput py-2"
                        id="loginEmail"
                        value={loginEmail}
                        onChange={(e) => onChange(e)}
                        placeholder="&#xf0e0;     Email ID"
                        style={{ fontSize: "16px" }}
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mr-lg-2 pr-4 mr-0">
                      <input
                        type="password"
                        name="loginPassword"
                        id="loginPassword"
                        value={loginPassword}
                        onChange={(e) => onChange(e)}
                        className="form-control mainLoginInput"
                        placeholder="&#xf023;     Password"
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                    <div className={`invalid-feedback ${showMessage}`}>
                      {notificationMessage}
                    </div>
                    <small>
                      <Link to="/forgot-password">Forgot password?</Link>
                    </small>
                    <div className="row py-3">
                      <div className="col-lg-6">
                        <div className="form-group form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe"
                            checked={formData.rememberMe}
                            onChange={(event) =>
                              setFormData({
                                ...formData,
                                rememberMe: event.target.checked,
                              })
                            }
                          />
                          <label className="form-check-label" for="rememberMe">
                            <small className="sign-in-color-custom pl-1">
                              Remember me
                            </small>
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 px-lg-0">
                        <button
                          type="submit"
                          className="btn btn-warning text-black px-4 py-2 mx-1 ml-lg-5 font-weight-bold"
                        >
                          <span
                            className={`spinner-border spinner-border-sm ${showSpinner}`}
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span className={`${showLoginText}`}>LOGIN</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
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
export default Login;
