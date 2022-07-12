/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number   Developer       Description
 * -------------------------------------------------------------------
 * 05-Oct-2020    -                     Abhishek Datar  Created
 *
 *
 *
 *
 *********************************************************************/

import React from "react";

const ActionButton = (props) => {
  return (
    <React.Fragment>
      <div className="px-3">
        <button
          type="button"
          className="btn btn-sm text-white px-5 b-color-search-description m-2"
        >
          Search
        </button>
        <button type="button" className="btn btn-secondary btn-sm px-5">
          Reset
        </button>
      </div>
    </React.Fragment>
  );
};

export default ActionButton;
