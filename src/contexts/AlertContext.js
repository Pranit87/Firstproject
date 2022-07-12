import React from "react";

const AlertContext = React.createContext();

export const AlertProvider = ({ children }) => {
  const initialState = {
    exists: false,
    type: null,
    message: null,
    isTemporary: null,
    scrollWindow: null,
  };

  const [state, setState] = React.useState(initialState);

  const setAlert = React.useCallback(
    (type, message, isTemporary = false, scrollWindow = true) => {
      setState({
        exists: true,
        type,
        message,
        isTemporary,
        scrollWindow,
      });
    },
    []
  );

  const clearAlert = React.useCallback(() => {
    setState(initialState);
  }, [initialState]);

  return (
    <AlertContext.Provider value={{ alert: state, setAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  return React.useContext(AlertContext);
};
