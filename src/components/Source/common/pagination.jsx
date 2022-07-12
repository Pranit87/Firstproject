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
import { Link } from "react-router-dom";

const Pagiation = (props) => {
  return (
    <React.Fragment>
      <div className="mr-3">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className="page-item">
              <Link
                id="arrow"
                className="page-link rounded-circle mx-2 mb-4 text-dark font-weight-bold"
                to="#"
                aria-label="Previous"
              >
                <span aria-hidden="true">
                  <i className="fa fa-angle-left fa-lg"></i>
                </span>
              </Link>
            </li>
            <li className="page-item">
              <Link
                id="page-1"
                className="page-link rounded-circle-custom text-light font-weight-bold mx-2"
                to="#"
              >
                1
              </Link>
            </li>
            <li className="page-item">
              <Link
                id="page-2"
                className="page-link rounded-circle-custom mx-2 text-dark font-weight-bold"
                to="#"
              >
                2
              </Link>
            </li>
            <li className="page-item">
              <Link
                id="page-3"
                className="page-link rounded-circle-custom mx-2 text-dark font-weight-bold"
                to="#"
              >
                3
              </Link>
            </li>
            <li className="page-item">
              <Link
                id="arrow"
                className="page-link rounded-circle mx-2 text-dark font-weight-bold"
                to="#"
                aria-label="Next"
              >
                <span aria-hidden="true">
                  <i className="fa fa-angle-right fa-lg"></i>
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Pagiation;
