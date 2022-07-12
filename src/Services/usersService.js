import React from "react";
import axios from "axios";
import { useAlertContext } from "../contexts/AlertContext";

const UsersContext = React.createContext();

export const UsersProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState({
    permissions: {},
  });
  const { setAlert } = useAlertContext();

  React.useEffect(() => {
    (async () => {
      try {
        if (localStorage.getItem("token")) {
          const response = await axios({
            url: `${process.env.REACT_APP_API_BASEURL}/users/permission`,
          });
          setCurrentUser({
            permissions: response?.data?.payload?.permissions || {},
          });
        }
      } catch (error) {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
        }
      }
    })();
  }, [setAlert]);

  return (
    <UsersContext.Provider value={{ currentUser }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  return React.useContext(UsersContext);
};
