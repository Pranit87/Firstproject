/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number   Developer       Description
 * -------------------------------------------------------------------
 * 05-Oct-2020    -                     Abhishek Datar  Created
 * 27-oct-2020    master                Vikas Saxena    value attribute added to
 *                                                      support common search feature
 *
 *
 *
 *********************************************************************/

import React from "react";

const TextFiledInput = ({
  col,
  placeholder,
  formKey,
  onChangeEvent,
  value,
  type,
  disabled,
}) => {
  const colSpan = "col-lg";
  if (col === "") {
    col = colSpan;
  } else {
    col = `col-lg-${col}`;
  }
  //console.log("formKey ", formKey, " placeholder ", placeholder);
  return (
    <React.Fragment>
      <div className={`${col} mb-4 mb-lg-0`}>
        <input
          className="form-control mr-2"
          type={type ? type : "search"}
          placeholder={placeholder}
          value={value}
          aria-label="Search"
          onChange={(e) => {
            onChangeEvent(
              e.target.value ? e.target.value : "",
              formKey,
              "string"
            );
          }}
          disabled={disabled ? disabled : false}
        />
      </div>
    </React.Fragment>
  );
};

export default TextFiledInput;
