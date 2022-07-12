/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number   Developer       Description
 * -------------------------------------------------------------------
 * 05-Oct-2020    -                     Abhishek Datar  Created
 * 27-oct-2020    master                Vikas Saxena    Bootstrap class change to
 *                                                      maintain consistency in UI
 *
 *
 *
 *********************************************************************/

import React from "react";

const Checkbox = ({ id, label, onChangeEvent, value }) => {
  return (
    <React.Fragment>
      <div class="custom-control custom-checkbox mt-2 mr-2 ml-3">
        <input
          type="checkbox"
          id={id}
          class="custom-control-input"
          onChange={(e) => {
            onChangeEvent(e.target.checked ? 1 : 0, id, "string");
          }}
          checked={value && value === 1 ? true : false}
        />
        <label class="custom-control-label" for={id}>
          {label}
        </label>
      </div>
    </React.Fragment>
  );
};

export default Checkbox;
