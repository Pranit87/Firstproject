import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Button,
  InputGroup,
  NavDropdown,
  Image,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import "./navBar.css";
import AuthApi from "../../Services/authAPI";
import AddResume from "./AddResume";
import ResetCred from "../Login/ResetCred";
import NavBar from "./NavBar";
import { useUsers } from "../../Services/usersService";

const NavBarWrapper = () => {
  const URL = window.location.pathname.split("/");
  const isSearchPage = URL[1] === "search";
  const urlString =
    isSearchPage && typeof URL.indexOf(2) !== "undefined" ? URL[2] : "";
  const [stringData, setStringData] = React.useState(urlString);
  const [showState, setShowState] = React.useState(false);
  const [showResume, setShowResume] = React.useState(false);
  const [showResetPassword, setShowResetPassword] = React.useState(false);
  const [showStateClone, setShowStateClone] = React.useState(false);
  const [stateClone, setStateClone] = React.useState();
  const [state, setState] = React.useState();
  const Auth = React.useContext(AuthApi);
  const history = useHistory();
  const { currentUser } = useUsers();
  const { permissions } = currentUser;

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      stringData && history.push(`/search/${stringData}`);
    }
  };

  const handleSearch = () => {
    stringData && history.push(`/search/${stringData}`);
  };

  const user = localStorage.getItem("profile");
  const userId = JSON.parse(user)["id"];

  const handleLogout = () => {
    localStorage.removeItem("token");
    Auth.setAuth(false);
  };

  React.useEffect(() => {
    if (state !== "addResume") {
      let pageClickHandler;
      clearTimeout(pageClickHandler);
      pageClickHandler = setTimeout(() => {
        setShowState(false);
        setState();
      }, 300);
    }
  }, [showState, state]);

  const popover = (
    <Popover id="popover-positioned-bottom" style={{ padding: "0px" }}>
      <Popover.Content className="pop-content">
        <div className="pop-body">
          {permissions?.ADD_REQUIREMENT && (
            <Link
              className="plus-icon"
              to="/requirement"
              onClick={() => {
                setShowState(true);
                setState("addRequirement");
              }}
            >
              Add Requirement
            </Link>
          )}
          {permissions?.ADD_RESUME && (
            <span
              className="plus-icon"
              onClick={() => {
                setShowState(true);
                setShowResume(true);
                setState("addResume");
              }}
            >
              Add Resume
            </span>
          )}
          {permissions.ADD_CLIENT && (
            <Link
              className="plus-icon"
              to="/add-clients"
              onClick={() => {
                setShowState(true);
                setState("addClient");
              }}
            >
              Add Client
            </Link>
          )}
        </div>
      </Popover.Content>
    </Popover>
  );

  const reportPopover = (
    <Popover id="popover-positioned-bottom" style={{ padding: "0px" }}>
      <Popover.Content className="pop-content">
        <div className="pop-body">
          {permissions?.VIEW_REPORT_ICON && (
            <Link
              className="plus-icon"
              to="/dailyReport"
              onClick={() => {
                setShowState(true);
                setState("dailyReport");
              }}
            >
              Daily Status Report
            </Link>
          )}
          {permissions?.VIEW_REPORT_ACTIVITY && (
            <Link
              className="plus-icon"
              to="/activityReport"
              onClick={() => {
                setShowState(true);
                setState("dailyReport");
              }}
            >
              Activity Report
            </Link>
          )}
        </div>
      </Popover.Content>
    </Popover>
  );

  return (
    <nav id="navbar" className="navbar navbar-expand-lg navbar-dark bg-blue">
      {showState && state === "addResume" && (
        <AddResume
          showState={showResume}
          setShowState={setShowResume}
          setState={setState}
        />
      )}
      {showStateClone && stateClone === "resetPassword" && (
        <ResetCred
          showState={showResetPassword}
          setShowState={setShowResetPassword}
          setStateClone={setStateClone}
        />
      )}
      <Link id="vats" className="navbar-brand font-weight-bold" to="/home">
        <img src="/images/yats-logo-small.png" alt="" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <NavBar />
      <Form inline>
        {permissions?.VIEW_REPORT_ACTIVITY ? (
          !state ? (
            <OverlayTrigger
              rootClose
              trigger="click"
              placement="bottom"
              overlay={reportPopover}
            >
              <Button variant="link">
                <Image src="/images/bar-icon.png" className="img-fluid"></Image>
              </Button>
            </OverlayTrigger>
          ) : (
            <Button variant="link">
              <Image src="/images/bar-icon.png" className="img-fluid"></Image>
            </Button>
          )
        ) : (
          permissions?.VIEW_REPORT_ICON && (
            <Button variant="link">
              <Link to="/dailyReport">
                <Image src="/images/bar-icon.png" className="img-fluid"></Image>
              </Link>
            </Button>
          )
        )}

        {permissions?.ADD_RESUME ||
        permissions?.ADD_REQUIREMENT ||
        permissions?.ADD_CLIENT ? (
          !state ? (
            <OverlayTrigger
              rootClose
              trigger="click"
              placement="bottom"
              overlay={popover}
            >
              <Button variant="link">
                <Image
                  src="/images/plus-icon.png"
                  className="img-fluid"
                ></Image>
              </Button>
            </OverlayTrigger>
          ) : (
            <Button variant="link">
              <Image src="/images/plus-icon.png" className="img-fluid"></Image>
            </Button>
          )
        ) : null}
        {permissions?.VIEW_CANDIDATE_PAGE && (
          <InputGroup className="">
            <Form.Control
              type="email"
              id="stringData"
              value={stringData}
              placeholder="Search Req ID or Name"
              onChange={(event) => setStringData(event.target.value)}
              onKeyPress={handleKeyPress}
              className="rounded-left"
            />
            <InputGroup.Append>
              <Button className="btn btn-light bg-white" onClick={handleSearch}>
                <i className="fa fa-search" aria-hidden="true"></i>
              </Button>
            </InputGroup.Append>
          </InputGroup>
        )}

        <div className="text-white ml-2 mt-1">
          {JSON.parse(user)["username"].split(" ")[0]}
        </div>

        <NavDropdown id="collasible-nav-dropdown" title="">
          {permissions?.VIEW_MY_PROFILE && (
            <NavDropdown.Item>
              <Link to={`/profile/${userId}`}>My Profile</Link>
            </NavDropdown.Item>
          )}
          <NavDropdown.Item>
            <Link
              to="#"
              onClick={(e) => {
                setShowStateClone(true);
                setStateClone("resetPassword");
                setShowResetPassword(true);
              }}
            >
              Reset Password
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to={`/login`} onClick={() => handleLogout()}>
              Logout
            </Link>
          </NavDropdown.Item>
        </NavDropdown>
      </Form>
    </nav>
  );
};

export default NavBarWrapper;
