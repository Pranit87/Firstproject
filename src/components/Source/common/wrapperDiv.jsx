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
import { Button } from "react-bootstrap";
import "../sourcingUI.css";

const WrapperDiv = ({
  image,
  onToggle,
  collapse,
  name = "default",
  totalResultsFound,
  totalRecordsAailable,
}) => {
  return (
    <React.Fragment>
      <div className="d-flex">
        <div className="w-100 custom-control custom-checkbox">
          <input
            type="checkbox"
            tabIndex={3}
            data-toggle="collapse"
            data-target={`searchfilter${name}`}
            // aria-expanded="false"
            aria-controls="searchfilter"
            className="custom-control-input ml-4"
            id={`searchfilter${name}`}
            checked={!collapse}
            onClick={() => {
              onToggle(collapse);
            }}
          />
          <label
            className="ml-3 custom-control-label"
            for={`searchfilter${name}`}
            style={{ display: "initial" }}
          >
            <img
              src={`/images/${image}.png`}
              className={`img-fluid mb-1 ${
                name === "vats" ? "customMarginRight" : ""
              }`}
              alt="Icon Unavailable"
            />
            {totalRecordsAailable && (
              <span className="align-vertical">
                Total resume available in YATS&nbsp;&nbsp;
                <Button className="oval-pill-button">
                  {totalRecordsAailable}
                </Button>
                &nbsp;&nbsp;
              </span>
            )}
            {totalResultsFound && (
              <span className="align-vertical">
                Total results found&nbsp;&nbsp;
                <Button className="oval-pill-button btn-danger">
                  {totalResultsFound}
                </Button>
              </span>
            )}
          </label>
        </div>
        <div
          className="px-4"
          data-toggle="collapse"
          data-target=".multi-collapse"
          aria-expanded="false"
          aria-controls="collapseOne searchfilter"
        >
          <span className="text-primary">
            <Link
              className="link-color"
              to="#"
              onClick={() => {
                onToggle(collapse);
              }}
            >
              <i
                className={collapse ? "fa fa-chevron-down" : "fa fa-chevron-up"}
              >
                <span className="font">{collapse ? "Expand" : "Collapse"}</span>
              </i>
            </Link>
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WrapperDiv;
