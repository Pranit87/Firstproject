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
import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

const DropDownUI = ({
  col,
  label,
  onChangeEvent,
  formKey,
  fieldName,
  ddOption,
  value,
}) => {
  const colSpan = "col-lg";
  if (col === "") {
    col = colSpan;
  } else {
    col = `col-lg-${col}`;
  }

  return (
    <React.Fragment>
      <div className={`${col} mb-4 mb-lg-0`}>
        <Form.Group>
          <Typeahead
            id="basic-typeahead-single"
            labelKey="name"
            onChange={(e) => onChangeEvent(e, formKey)}
            options={ddOption ? ddOption(fieldName) : []}
            placeholder={label}
            clearButton
          />
        </Form.Group>
      </div>
    </React.Fragment>
  );
};

export default DropDownUI;
