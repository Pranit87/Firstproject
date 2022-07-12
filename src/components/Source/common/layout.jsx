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
import WrapperDiv from "./wrapperDiv";
import VatsSearchDetails from "./VatsSearchDetails";
import Pagiation from "./pagination";

const Layout = ({ image, component, onToggle, collapse }) => {
  return (
    <React.Fragment>
      <div className="accordion" id="accordionExample">
        <div className="inner bg-white my-4 py-4 mx-4 rounded shadow font">
          <WrapperDiv image={image} onToggle={onToggle} collapse={collapse} />
          {component}
          <div
            id="collapseOne"
            className={collapse ? "collapse" : ""}
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div className="px-4 py-3">25 results found</div>
            <VatsSearchDetails />{" "}
            {/*This is a dummy component needs to be renamed when integrating*/}
            <Pagiation />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
