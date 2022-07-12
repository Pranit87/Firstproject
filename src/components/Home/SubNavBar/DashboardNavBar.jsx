import React from "react";
import { Route, NavLink } from "react-router-dom";
import { Calendar } from "../SubNavBar/Calendar";
import MyJobs from "../MyJobs";
import Closures from "./Closures";
import IncentiveCalculator from "./IncentiveCalculator";
import { useUsers } from "../../../Services/usersService";

const DashBoardNavbar = (props) => {
  const { currentUser } = useUsers();
  const { permissions } = currentUser;
  return (
    <>
      <div className="mx-5 my-4 rounded">
        <ul className="nav nav-tabs rounded" role="tablist">
          {permissions && permissions.VIEW_HOME_CALENDER && (
            <li
              className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
              role="presentation"
              id="jobs-tab-li"
            >
              <a
                className="nav-link mx-2 px-5 text-white active show font-weight-bolder"
                id="jobs-tab"
                data-toggle="tab"
                href="#jobs"
                role="tab"
                aria-controls="jobs"
                aria-selected="false"
              >
                Calendar
              </a>
            </li>
          )}
          {permissions && permissions.VIEW_HOME_MY_JOBS && (
            <li
              id="calendar-tab-li"
              className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
              role="presentation"
            >
              <a
                className="nav-link mx-2 px-5 text-white font-weight-bolder"
                id="calendar-tab"
                data-toggle="tab"
                href="#calendar"
                role="tab"
                aria-controls="calendar"
                aria-selected="true"
              >
                My Jobs
              </a>
            </li>
          )}
          {permissions && permissions.VIEW_HOME_INCENTIVE_CALCULATOR && (
            <li
              className="nav-item d-sm-block mx-auto mx-lg-0 mx-md-0 interview-tabs"
              role="presentation"
              id="GPM-tab-li"
            >
              <a
                className="nav-link mx-2 px-5 text-white font-weight-bolder"
                id="gpm-tab"
                data-toggle="tab"
                href="#gpm"
                role="tab"
                aria-controls="gpm"
                aria-selected="false"
              >
                $$ Calculator
              </a>
            </li>
          )}
        </ul>

        <div className="tab-content bg-white rounded font" id="myTabContent">
          {" "}
          <div
            className="tab-pane fade show active  p-4"
            id="jobs"
            role="tabpanel"
            aria-labelledby="jobs-tab"
          >
            {<Calendar />}
          </div>
          {permissions && permissions.VIEW_HOME_MY_JOBS && (
            <div
              className="tab-pane fade p-4"
              id="calendar"
              role="tabpanel"
              aria-labelledby="calendar-tab"
            >
              {<MyJobs />}
            </div>
          )}
          {/* <div
            className="tab-pane fade p-4"
            id="closures"
            role="tabpanel"
            aria-labelledby="closures-tab"
          >
            {<Closures />}
          </div> */}
          <div
            className="tab-pane fade p-4"
            id="gpm"
            role="tabpanel"
            aria-labelledby="gpm-tab"
          >
            {<IncentiveCalculator />}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardNavbar;
