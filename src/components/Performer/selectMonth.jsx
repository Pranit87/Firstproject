/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number   Developer         Description
 * ------------------------------------------------------------------
 * 05-Oct-2020    -                     Abhishek Datar    Created
 * 9 nov-2020     master                Esha              top perormer api
 *
 *
 *
 *********************************************************************/

import React from "react";

export const selectMonth = (updateMonth1) => {
  return (
    <>
      <label htmlFor="month">Month</label>
      <select
        name="month"
        id="month"
        className="form-control "
        required
        onChange={updateMonth1}
      >
        <option hidden disabled selected value className="py-4">
          Select Month
        </option>
        <option value="1 {new Date().getFullYear()}">
          January {new Date().getFullYear()}
        </option>
        <option value="2 {new Date().getFullYear()}">
          February {new Date().getFullYear()}
        </option>
        <option value="3 {new Date().getFullYear()}">
          March {new Date().getFullYear()}
        </option>
        <option value="4 {new Date().getFullYear()}">
          April {new Date().getFullYear()}
        </option>
        <option value="5 {new Date().getFullYear()}">
          May {new Date().getFullYear()}
        </option>
        <option value="6 {new Date().getFullYear()}">
          June {new Date().getFullYear()}
        </option>
        <option value="7 {new Date().getFullYear()}">
          July {new Date().getFullYear()}
        </option>
        <option value="8 {new Date().getFullYear()}">
          August {new Date().getFullYear()}
        </option>
        <option value="9 {new Date().getFullYear()}">
          September {new Date().getFullYear()}
        </option>
        <option value="10 {new Date().getFullYear()}">
          October {new Date().getFullYear()}
        </option>
        <option value="11 {new Date().getFullYear()}">
          November {new Date().getFullYear()}
        </option>
        <option value="12 {new Date().getFullYear()}">
          December {new Date().getFullYear()}
        </option>
      </select>
    </>
  );
};
