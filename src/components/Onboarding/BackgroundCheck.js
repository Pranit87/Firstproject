import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DocumentStyles.css";
import { Button } from "react-bootstrap";

const Background = () => {
  return (
    <div>
      <form className="row">
        <div className="form-group">
          <label className="text" for="exampleFormControlSelect1">
            <h6>Criminal Check</h6>
          </label>
          <select class="form-control" id="exampleFormControlSelect1">
            <option>Link Sent</option>
            <option>2</option>
          </select>
        </div>
        <div className="form-group">
          <label className="text" for="exampleFormControlSelect1">
            <h6>Employement Check</h6>
          </label>
          <select className="form-control" id="exampleFormControlSelect1">
            <option>Initiated</option>
            <option>2</option>
          </select>
        </div>
        <div className="form-group">
          <label className="text" for="exampleFormControlSelect1">
            <h6>Education Check</h6>
          </label>
          <select className="form-control" id="exampleFormControlSelect1">
            <option>Pending</option>
            <option>2</option>
          </select>
        </div>
        <div className="form-group">
          <label className="text" for="exampleFormControlSelect1">
            <h6>Other Checks</h6>
          </label>
          <select className="form-control" id="exampleFormControlSelect1">
            <option>Clear</option>
            <option>2</option>
          </select>
        </div>
      </form>
      <div className="BUTTONBG">
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

export default Background;
