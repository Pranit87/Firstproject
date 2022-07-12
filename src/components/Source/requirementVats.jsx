/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number           Developer      Description
 * ------------------------------------------------------------------------
 * 05-Oct-2020    -                             Abhishek Datar Created
 *
 *
 *
 *
 *********************************************************************/

import React from "react";

export const RequirementVats = (props) => {
  return (
    <React.Fragment>
      <div class="inner bg-white py-4 mx-4 rounded shadow font">
        <div class="row">
          <div class="col-lg-10 col-12">
            <div class="row description-font">
              <div class="col-lg-4 col-12 pl-lg-5 pb-lg-4 text-center text-lg-left">
                <span class="description-color">Client: </span>
                <span class="ml-lg-3">SAP</span>
              </div>
              <div class="col-lg-4 col-12 pl-lg-2 text-center text-lg-left">
                <span class="description-color">Bill Rate: </span>
                <span class="ml-lg-3">$100/hr</span>
              </div>
              <div class="col-lg-4 col-12 pl-lg-2 text-center text-lg-left">
                <span class="description-color">Duration: </span>
                <span class="ml-lg-3">6 Months</span>
              </div>
            </div>
            <div class="row description-font">
              <div class="col-lg-4 col-12 pl-lg-5 pb-lg-2 text-center text-lg-left">
                <span class="description-color">ID: </span>
                <span class="ml-lg-4 pl-lg-3">1234</span>
              </div>
              <div class="col-lg-4 col-12 pl-lg-2 text-center text-lg-left">
                <span class="description-color">Job Title: </span>
                <span class="ml-lg-3">Software Engineer</span>
              </div>
              <div class="col-lg-4 col-12 pl-lg-2 text-center text-lg-left">
                <span class="description-color">Location: </span>
                <span class="ml-lg-3">San Francisco, LA</span>
              </div>
            </div>
          </div>
          <div class="col-lg-2 col-12 text-center text-lg-left pt-2 pt-lg-0">
            <button
              class="btn btn-primary py-4 px-5 description-font b-color-search-description"
              type="submit"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Description
            </button>
            <div
              class="modal"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-body shadow p-5">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis ipsum suspendisse ultrices gravida. Risus
                      commodo viverra maecenas accumsan lacus vel facilisis.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis ipsum suspendisse ultrices gravida.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis ipsum suspendisse ultrices gravida. Risus
                      commodo viverra maecenas accumsan lacus vel facilisis.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                  <div class="arrow-right-sourcing"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RequirementVats;
