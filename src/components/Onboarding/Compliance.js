import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DocumentStyles.css";
import { Button } from "react-bootstrap";

const Compliance = () => {
  return (
    <div>
      <form>
        <div className="form-group">
          <label className="text" for="exampleFormControlSelect1">
            <h6>Client Documents</h6>
          </label>
          <select class="form-control" id="exampleFormControlSelect1">
            <option>Sent</option>
            <option>2</option>
          </select>
        </div>
        <div className="form-group">
          <label className="text" for="exampleFormControlSelect1">
            <h6>Onboarding Docuemnts</h6>
          </label>
          <select className="form-control" id="exampleFormControlSelect1">
            <option>Pending</option>
            <option>2</option>
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

export default Compliance;
