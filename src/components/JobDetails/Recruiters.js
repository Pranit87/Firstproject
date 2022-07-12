/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number    Developer       Description
 * -----------------------------------------------------------------
 * 10-Oct-2020    -                      Abhishek Datar  Created
 *
 *
 *
 *********************************************************************/
import React from "react";

function Recruiters() {
  return (
    <>
      <div className="bg-white py-4 mx-4 font ">
        <table className="table job-description-font-custom">
          <thead>
            <tr>
              <th scope="col" className="py-2 border-top-0">
                Name
              </th>
              <th scope="col" className="py-2 border-top-0">
                Contact
              </th>
            </tr>
            <tr>
              <td scope="row" className="table-head-bg-color text-right p-0">
                Team: Ashish
              </td>
              <td scope="row" className="table-head-bg-color"></td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Abhijeet Singh</td>
              <td className="contact-text-custom">
                5108872299 <br />
                abhijeet@vertisystem.com
              </td>
            </tr>
            <tr>
              <td>Ashish</td>
              <td className="contact-text-custom">
                5108872239 <br />
                ashish@vertisystem.com
              </td>
            </tr>
            <tr>
              <td>Monitha Sudhakaran</td>
              <td className="contact-text-custom">
                5108872239 <br />
                monitha@vertisystem.com
              </td>
            </tr>
          </tbody>
        </table>
        <div className="hr-recruiter"></div>
        <div className="pt-4 h6 font-weight-bold">Assign Team Member:</div>
        <div>
          <div className="row">
            <div className="col-lg-4 pb-2 pb-lg-0">
              <select
                name="select-team"
                id="select-team"
                className="form-control"
              >
                <option value="">Select Team</option>
                <option value="option2">option2</option>
                <option value="option3">option3</option>
              </select>
            </div>
            <div className="col-lg-4">
              <input
                className="form-control"
                type="search"
                placeholder="Recruiters"
                aria-label="Search"
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-sm text-white px-5 mt-5 b-color-search-description"
        >
          Save
        </button>
      </div>
    </>
  );
}

export default Recruiters;
