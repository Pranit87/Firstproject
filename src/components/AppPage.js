import React from "react";
import AuthApi from "../Services/authAPI";
import Routes from "../Routes/routes";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AppPage = () => {
  const [auth, setAuth] = React.useState(false);
  const [authData, setAuthData] = React.useState(false);
  const history = useHistory();
  const readCookie = () => {
    const user = localStorage.getItem("token");
    if (user) {
      setAuth(true);
      axios.defaults.headers.common["Authorization"] = `Bearer ${user}`;
    }
  };

  React.useEffect(() => {
    readCookie();
    if (history.location.pathname === "/") {
      history.push("/login");
    }
  }, [history]);
  return (
    <>
      <AuthApi.Provider value={{ auth, setAuth, authData, setAuthData }}>
        <Routes />
      </AuthApi.Provider>
    </>
  );
};

export default AppPage;
