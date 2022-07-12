import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppPage from "../src/components/AppPage";
import "./App.css";
import { AlertProvider } from "./contexts/AlertContext";
import { UsersProvider } from "./Services/usersService";

const App = () => {
  return (
    <div className="App">
      <AlertProvider>
        <UsersProvider>
          <BrowserRouter>
            <AppPage />
          </BrowserRouter>
        </UsersProvider>
      </AlertProvider>
    </div>
  );
};

export default App;
