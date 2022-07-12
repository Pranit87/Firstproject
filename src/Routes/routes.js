import React from "react";
import { Route, Switch } from "react-router-dom";
import Source from "../components/Source/Source";
import Login from "../components/Login/login";
import NavBarWrapper from "../components/Wrapper/NavbarWrapper";
import AuthApi from "../Services/authAPI";
import "font-awesome/css/font-awesome.min.css";
import Dashboard from "../components/Home/Dashboard";
import Candidates from "../components/Candidates/Candidates";
import ViewResume from "../components/Resumes/ViewResume";
import JobDetails from "../components/JobDetails/JobDetails";
import { Search } from "../components/Search/searchPage";
import Teams from "../components/Operation Manager/Teams";
import ViewProfile from "../components/Operation Manager/ViewProfile";
import Footer from "../components/Wrapper/Footer";
import ViewTeam from "../components/Operation Manager/ViewTeam";
import ForgotCred from "../components/Login/ForgotCred";
import TopPerformer from "../components/Performer/Performer";
import Jobs from "../components/Jobs/Jobs";
import AddClient from "../components/CRM/Add_Client";
import { useUsers } from "../Services/usersService";
import { useHistory } from "react-router-dom";
import EditCandidate from "../components/Search/editCandidate";
import "../components/Common/Common.styles.css";
import Requirement from "../components/Wrapper/Requirement";
import DailyReport from "../components/DailyReport/DailyReport";
import EmployeesActivityReport from "../components/DailyReport/EmployeesActivityReport";
import Stats from "../components/EmployeeMuster/Stats";
import EmployeeForm from "../components/EmployeeMuster/EmployeeForm";
import EmployeeDetails from "../components/EmployeeMuster/EmployeeDetails";
import TimeCard from "../components/TimeSheet/TimeCard";
import WorkerScreen from "../components/TimeSheet/WorkerScreen";
// import VMS from "../components/VMS/Vms";
// import Supplier from "../components/SupplierCred/Supplier";
import Documentation from "../components/Onboarding/Documentation";

const Routes = () => {
  const Auth = React.useContext(AuthApi);
  const { currentUser } = useUsers();
  const permissions = currentUser.permissions;
  const history = useHistory();

  if (
    Object.keys(permissions).length === 0 &&
    history.location.pathname !== "/login" &&
    history.location.pathname !== "/"
  ) {
    if (localStorage.getItem("token")) {
      return (
        <div className="activityContainer">
          <div className="linear-activity">
            <div className="indeterminate"></div>
          </div>
        </div>
      );
    } else {
      window.location.href = "/login";
    }
  }

  return (
    <>
      <ProtectedRoute
        path="/login"
        auth={Auth.auth}
        component={NavBarWrapper}
      />
      <div className={"content"}>
        <Switch>
          <ProtectedLogin
            path="/login"
            auth={Auth.auth}
            authData={Auth.authData}
            component={Login}
          />
          <ProtectedRoute path="/home" auth={Auth.auth} component={Dashboard} />
          <ProtectedRoute
            path="/source/:jobId?"
            auth={Auth.auth}
            component={Source}
          />
          <ProtectedRoute path="/teams" auth={Auth.auth} component={Teams} />
          <ProtectedRoute
            path="/profile/:userId"
            auth={Auth.auth}
            component={ViewProfile}
          />
          <ProtectedRoute path="/jobs" auth={Auth.auth} component={Jobs} />
          <ProtectedRoute
            path="/dailyReport"
            auth={Auth.auth}
            component={DailyReport}
          />
          <ProtectedRoute
            path="/activityReport"
            auth={Auth.auth}
            component={EmployeesActivityReport}
          />
          <ProtectedRoute
            path="/job-details/:jobId"
            auth={Auth.auth}
            component={JobDetails}
          />

          <ProtectedRoute
            path="/candidates/:id/:reqId"
            auth={Auth.auth}
            component={Candidates}
          />
          <ProtectedRoute
            path="/resume/:id/:string/:reqId/:sourceType/:reqUniqueId/:dbOrApi"
            auth={Auth.auth}
            component={ViewResume}
            exact
          />
          <ProtectedRoute
            path="/resume/:id/:reqId"
            auth={Auth.auth}
            component={ViewResume}
            exact
          />
          <ProtectedRoute
            path="/search/:string"
            auth={Auth.auth}
            component={Search}
            exact
          />
          <ProtectedRoute
            path="/my-team"
            auth={Auth.auth}
            component={ViewTeam}
            exact
          />
          <ProtectedRoute
            path="/team/:teamIds"
            auth={Auth.auth}
            component={ViewTeam}
            exact
          />
          <ProtectedLogin
            path="/forgot-password"
            auth={Auth.auth}
            component={ForgotCred}
          />
          <ProtectedRoute
            path="/top-performers"
            auth={Auth.auth}
            component={TopPerformer}
            exact
          />
          <ProtectedRoute
            path="/add-clients"
            auth={Auth.auth}
            component={AddClient}
          />
          <ProtectedRoute
            path="/requirement/:jobId?"
            auth={Auth.auth}
            component={Requirement}
          />
          <ProtectedRoute
            path="/candidate/edit/:id"
            auth={Auth.auth}
            component={EditCandidate}
            exact
          />
          <ProtectedRoute
            path="/search/:name/edit/:id"
            auth={Auth.auth}
            component={EditCandidate}
            exact
          />
          <ProtectedRoute
            path="/candidates/:id"
            auth={Auth.auth}
            component={Candidates}
          />

          <ProtectedRoute path="/stats" auth={Auth.auth} component={Stats} />

          <ProtectedRoute
            path="/empform/:id"
            auth={Auth.auth}
            component={EmployeeForm}
          />
          <ProtectedRoute
            path="/empdetails/:id"
            auth={Auth.auth}
            component={EmployeeDetails}
          />
          <ProtectedRoute
            path="/timecard"
            auth={Auth.auth}
            component={TimeCard}
            exact
          />
          <ProtectedRoute
            path="/timecard/:userId"
            auth={Auth.auth}
            component={TimeCard}
            exact
          />
          <ProtectedRoute
            path="/worker"
            auth={Auth.auth}
            component={WorkerScreen}
          />
          {/* <ProtectedRoute path="/VMS" auth={Auth.auth} component={VMS} />
          <ProtectedRoute
            path="/Supplier"
            auth={Auth.auth}
            component={Supplier}
          /> */}

          <ProtectedRoute
            path="/Onboarding"
            auth={Auth.auth}
            component={Documentation}
          />
        </Switch>
      </div>
      <ProtectedRoute path="/login" auth={Auth.auth} component={Footer} />
    </>
  );
};

const ProtectedRoute = ({ auth, path, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Route path={path} />
      } //to={path}
    />
  );
};

const ProtectedLogin = ({ auth, authData, component: Component, ...rest }) => {
  if (auth && authData) {
    window.location.href = authData.role === 12 ? "/timecard" : "/home";
  }
  return <Route {...rest} render={() => (!auth ? <Component /> : "")} />;
};

export default Routes;
