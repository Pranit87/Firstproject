import React from "react";
import "./Addfromstyles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AddForm2 = () => {
  return (
    <div className="rounded-rectangle-631">
      <form className="form-group" action="/action_page.php">
        <label for="name">Name*</label>
        <input className="B" type="text" id="name" aria-describedby="name" />
        <div className="form-text text-muted">
          <small id="name" className=" text-primary">
            MSP/Name Of Account
          </small>
        </div>

        <br />

        <label className="url" for="exampleInputEmail1">
          URL*
        </label>
        <input
          className="rounded-rectangle-2-copy-2"
          type="text"
          name="url"
          placeholder="https://www.fieldglass.net/login.jsp"
        />
        <br />

        <label className="renewal-date" for="exampleInputEmail1">
          Renewal Date*
        </label>
        <input
          className="rounded-rectangle-2-copy-3"
          type="date"
          name="exampleInputEmail1"
          placeholder="Jul-19-2019"
        />
        <br />

        <label className="username" for="exampleInputEmail1">
          Username*
        </label>
        <input
          className="rounded-rectangle-2-copy-4"
          type="text"
          name="email"
          placeholder="morganstanely@vertisystem.com"
        />
        <br />
        <label className="password" for="exampleInputEmail1">
          Password*
        </label>
        <input
          className="rounded-rectangle-2-copy-5 "
          type="text"
          name="email"
          placeholder="recrutingteam01"
        />
        <br />
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
          <option>Select Account Managers</option>
          <option>2</option>
        </select>
      </form>
    </div>
  );
};

export default AddForm2;
