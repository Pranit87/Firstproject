import React from "react";
import "./Addfromstyles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AddForm = () => {
  return (
    <div>
      <form className="form-group" action="/action_page.php">
        <label className="account-manager" for="exampleInputEmail1">
          Account manager
        </label>
        <select className="dropdown2" id="exampleInputEmail1">
          <option>Select Account Managers</option>
          <option>2</option>
        </select>
        <br />
        <label className="client-used-at" for="exampleInputEmail1">
          Client Used At
        </label>
        <select className="dropdown" id="exampleInputEmail1">
          <option>Select Clients</option>
          <option>2</option>
        </select>
      </form>
    </div>
  );
};

export default AddForm;
