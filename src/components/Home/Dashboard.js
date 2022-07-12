import React, { useEffect, useState } from "react";
import PerformerOfTheWeek from "./PerformerOfTheWeek";
import Graphs from "./Graphs";
import DashBoardNavbar from "./SubNavBar/DashboardNavBar";
import "./home.css";
import { useUsers } from "../../Services/usersService";
import AccessDenied from "../Common/AccessDenied/AccessDenied";
import ResetCred from "../Login/ResetCred";

const Dashboard = () => {
  const { currentUser } = useUsers();
  const { permissions } = currentUser;
  const [initialLogin, setInitialLogin] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showStateClone, setShowStateClone] = useState(false);
  const profile = localStorage.getItem("profile");

  useEffect(() => {
    if (initialLogin) {
      setShowStateClone(true);
      setShowResetPassword(true);
    }
  }, [initialLogin]);

  useEffect(() => {
    setInitialLogin(JSON.parse(profile)["login_status"] === 1 ? true : false);
  }, [profile]);

  if (Object.keys(permissions).length && !permissions.VIEW_HOME)
    return <AccessDenied />;
  return (
    <>
      {showStateClone && (
        <ResetCred
          showState={showResetPassword}
          setShowState={setShowResetPassword}
        />
      )}
      <PerformerOfTheWeek />
      <DashBoardNavbar />
      <Graphs />
    </>
  );
};

export default Dashboard;
