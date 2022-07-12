import React from "react";
import "./Addfromstyles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AddForm = () => {
  return (
    <div className="rounded-rectangle-631">
      <div></div>
      <form className="form">
        <label className="name" for="name">
          Name*
        </label>
        <input className="rounded-rectangle-2-copy-1 " type="text" id="name" />
        {/* <small id="name" className="text-muted">
          Msp/name of account
        </small> */}
        <br />

        <label className="url" for="exampleInputEmail1">
          URL*
        </label>
        <input className="rounded-rectangle-2-copy-2" type="text" name="url" />
        <br />

        <label className="renewal-date" for="exampleInputEmail1">
          Renewal Date*
        </label>
        <input
          className="rounded-rectangle-2-copy-3"
          type="text"
          name="email"
        />
        <br />

        <label className="username" for="exampleInputEmail1">
          Username*
        </label>
        <input
          className="rounded-rectangle-2-copy-4"
          type="text"
          name="email"
        />
        <br />
        <label className="password" for="exampleInputEmail1">
          Password*
        </label>
        <input
          className="rounded-rectangle-2-copy-5 "
          type="text"
          name="email"
        />
        <br />
        <label className="account-manager" for="exampleInputEmail1">
          Account manager
        </label>
        <input
          className="rounded-rectangle-2-copy-6 "
          type="text"
          name="email"
          placeholder="Select Account Manager"
        />
        <br />
        <label className="client-used-at" for="exampleInputEmail1">
          Client Used At
        </label>
        <input
          className="rounded-rectangle-2-copy-7"
          type="text"
          name="email"
          placeholder="Select Clients"
        />
      </form>
    </div>
  );
};

export default AddForm;
