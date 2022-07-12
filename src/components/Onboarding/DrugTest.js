import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DocumentStyles.css";
import { Button } from "react-bootstrap";

const DrugTest = () => {
  return (
    <div>
      <form>
        <div className="form-group">
          <label className="text" for="exampleFormControlSelect1">
            <h6>Drug Test</h6>
          </label>
          <select className="form-control" id="exampleFormControlSelect1">
            <option>Initiated</option>
            <option>Link Sent</option>
            <option>Sent</option>
            <option>Scheduled</option>
            <option>Taken - Results Awaited</option>
            <option>Clear</option>
          </select>
        </div>
      </form>
      <div className="BUTTON2">
        <Button
          variant="primary"
          className="btn btn-primary btn-sm px-5 rounded-3"
          id="save_button"
        >
          Save
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
  );
};

export default DrugTest;
