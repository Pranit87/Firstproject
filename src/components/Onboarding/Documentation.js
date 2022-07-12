import * as Icon from "react-bootstrap-icons";
import React from "react";
import "./StepIndicatorStyles.css";
import StepIndicator from "./StepIndicator";
import { Route, Link } from "react-router-dom";
import Document from "../Onboarding/Document";
import "./DocumentStyles.css";
import { Button } from "react-bootstrap";
import Background from "../Onboarding/BackgroundCheck";
import DrugTest from "../Onboarding/DrugTest";
import Compliance from "../Onboarding/Compliance";
import Start from "../Onboarding/Start";

const Onboarding = () => {
  return (
    <div className="main">
      <div>
        <span className="VMS"> Girish - Software Engineer</span>
        <span className="VMS">Loremipsum@gmail.com</span>
        <span className="VMS">9172318292</span>
      </div>

      <div className="white-container">
        <StepIndicator />
        <div className="output">
          <Route exact path="/Onboarding">
            <Document />
          </Route>
          <Route exact path="/Onboarding/step2">
            <Background />
          </Route>
          <Route exact path="/Onboarding/step3">
            <DrugTest />
          </Route>
          <Route exact path="/Onboarding/step4">
            <Compliance />
          </Route>
          <Route exact path="/Onboarding/step5">
            <Start />
          </Route>
        </div>
      </div>
      <div className="flex-direction">
        <div className="bottom-box">
          <span className="text2">All Remark</span> <hr />
          <p className="description">
            H1B candidate looking to transfer his visa current employeer is not
            doing C2C, he is looking for opportunites on his own
          </p>
          <span className="title">
            Requirement title : Business System Analyst || Remark Type: Do not
            pursue
          </span>
          <br />
          <span className="d-section">By : Kunal Sharma | 22 days ago</span>
          <br />
          <p className="description">
            H1B candidate looking to transfer his visa current employeer is not
            doing C2C, he is looking for opportunites on hs own
          </p>
          <span className="title">
            Requirement title : Business System Analyst || Remark Type: Do not
            pursue
          </span>
          <br />
          <span className="d-section">By : Kunal Sharma | 22 days ago</span>
        </div>

        <div className="b">
          <span className="text2">+ Add Remark</span> <hr />
          <div className="flex-direction-box2">
            <span className="second-text">
              Requirement/Job Id <br />
              <span className="code">GEJ000187763</span>
            </span>
            <div>
              <span className="second-text">
                Requirement/Job Title <br />
                <span className="code">Software Engineer</span>
              </span>
            </div>
          </div>
          <div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">
                <span className="second-text">Remark</span>
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="4"
              ></textarea>
            </div>
          </div>
          <div className="flex-direction-box3 ">
            <div className="down_button">
              <Button
                variant="primary"
                className="btn btn-primary btn-sm px-5 rounded-3"
                id="save_button"
              >
                Update
              </Button>
              <Button
                variant="secondary"
                className="btn btn-primary btn-sm px-5 rounded-3"
                id="save_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
