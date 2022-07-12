import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ModalDrsStyles.css";

const ModalDrs = () => {
  return (
    <form>
      <div>
        <input className="Bc" type="text" id="name2" placeholder="Job Id" />
      </div>

      <div>
        <input
          className="B"
          type="text"
          id="name"
          placeholder="Reason For No Submission"
        />
      </div>
    </form>
  );
};

export default ModalDrs;
