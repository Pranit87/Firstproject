import React from "react";
import { Link } from "react-router-dom";

const VatsSearchDetails = (props) => {
  return (
    <React.Fragment>
      <div className="inner mx-4 pb-4 mb-3 font search-result-background">
        <div className="text-primary description-font py-4 px-2 text-center text-lg-left checkbox">
          <input type="checkbox" checked className="ml-4" />
          <span className="font-weight-bold">
            &nbsp;Adnana Jamil - Solution Architect - Lead developer
          </span>
        </div>
        <div className="d-lg-flex vats-font-size">
          <div className="pl-lg-4 ml-lg-1 flex-fill text-center text-lg-left">
            US-MA-Shrewsbury-34.8 miles <br />
            Development Lead, EY
          </div>
          <div className="flex-fill text-center text-lg-left">
            <div className="row">
              <div className="col-lg">
                <span className="description-color">Resume updated: </span>
                <span className="ml-lg-2">5/27/2020</span>
              </div>
              <div className="col-lg">
                <span className="description-color pl-lg-5">
                  Desired status:{" "}
                </span>
                <span className="ml-lg-3">Full Time</span>
              </div>
              <div className="col-lg">
                <span className="description-color pl-lg-5">Relocation: </span>
                <span className="ml-lg-4">Will Relocate</span>
              </div>
            </div>
            <div className="row">
              <div className="col-lg">
                <span className="description-color">Highest Education: </span>
                <span className="ml-lg-1">Masters</span>
              </div>
              <div className="col-lg">
                <span className="description-color pl-lg-5">
                  Desired Job Type:{" "}
                </span>
                <span className="ml-lg-1">Employee</span>
              </div>
              <div className="col-lg">
                <span className="description-color pl-lg-5">
                  Authorization:{" "}
                </span>
                <span className="ml-lg-2">US</span>
              </div>
            </div>
            <div className="row">
              <div className="col-lg ml-lg-n5">
                <span className="description-color ml-lg-5">
                  Target Job Title:{" "}
                </span>
                <span className="ml-lg-3">Senior Solution Engineer</span>
              </div>
              <div className="col-lg ml-lg-n2">
                <span className="description-color ml-lg-n5">
                  Desired Salary:{" "}
                </span>
                <span className="ml-lg-1">-</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink pl-lg-5 text-center text-lg-left">
            <Link to="#">
              <img
                src="./images/view.png"
                className="img-fluid px-1"
                alt="Icon Unavailable"
              />
            </Link>
            <Link to="#">
              <img
                src="./images/call-only.png"
                className="img-fluid px-1"
                alt="Icon Unavailable"
              />
            </Link>
            <Link to="#">
              <img
                src="./images/message.png"
                className="img-fluid px-1"
                alt="Icon Unavailable"
              />
            </Link>
            <Link to="#">
              <img
                src="./images/email.png"
                className="img-fluid px-1"
                alt="Icon Unavailable"
              />
            </Link>
            <Link to="#">
              <img
                src="./images/download.png"
                className="img-fluid px-1"
                alt="Icon Unavailable"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="inner mx-4 pb-1 mb-3 font">
        <div className="pt-1 px-2 text-center text-lg-left checkbox-search-result">
          <hr className="hr" />

          <div>
            <input type="checkbox" className="ml-1" />

            <span className="font-weight-bold text-primary h6 ml-1">
              &nbsp;Suman Gogada
            </span>
            <span className="ml-1 mt-lg-n1 vats-font-size">
              <span className="font-weight-bold text-highlight-color">
                &nbsp;Software
              </span>
              <span> Engineer @Fidelti Inverments</span>
            </span>
          </div>
        </div>
        <div className="d-lg-flex vats-font-size">
          <div className="pl-lg-5 ml-lg-n2 flex-fill text-lg-left">
            <div className="d-lg-flex justify-content-start">
              <div className="sg-back sg-back-color p-3 h3 text-white font-weight-bold text-center">
                SG
              </div>
              <div className="flex-fill">
                <div className="row ml-1 text-secondary">
                  <div className="col-lg">
                    <img
                      src="./images/tickmark.png"
                      className="img-fluid"
                      alt="Icon Unavailable"
                    />
                    Preferred:
                    <span className="text-highlight-color">Java</span>
                    Developer
                  </div>
                </div>
                <div className="row ml-1 text-secondary">
                  <div className="col-lg">
                    <img
                      src="./images/location.png"
                      className="img-fluid"
                      alt="Icon Unavailable"
                    />
                    Shrewsbury, MA, USA
                  </div>
                  <div className="col-lg">
                    <img
                      src="./images/bag.png"
                      className="img-fluid"
                      alt="Icon Unavailable"
                    />
                    5 years exp
                  </div>
                  <div className="col-lg">
                    <img
                      src="./images/globe.png"
                      className="img-fluid"
                      alt="Icon Unavailable"
                    />
                    Have H1
                  </div>
                </div>
                <div className="row ml-1 text-secondary">
                  <div className="col-lg">
                    <img
                      src="./images/relocate.png"
                      className="img-fluid"
                      alt="Icon Unavailable"
                    />
                    Willing to relocate
                  </div>
                  <div className="col-lg">
                    <img
                      src="./images/salary.png"
                      className="img-fluid"
                      alt="Icon Unavailable"
                    />
                    No desired salary disclosed
                  </div>
                  <div className="col-lg">
                    <img
                      src="./images/calemdar2.png"
                      className="img-fluid"
                      alt="Icon Unavailable"
                    />
                    2 months ago
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-shrink pl-lg-4 pt-3 text-center text-lg-left">
            <Link href="#">
              <img
                src="./images/view.png"
                className="img-fluid px-2"
                alt="Icon Unavailable"
              />
            </Link>
            <Link href="#">
              <img
                src="./images/call-only.png"
                className="img-fluid px-2"
                alt="Icon Unavailable"
              />
            </Link>
            <Link href="#">
              <img
                src="./images/message.png"
                className="img-fluid px-2"
                alt="Icon Unavailable"
              />
            </Link>
            <Link href="#">
              <img
                src="./images/email.png"
                className="img-fluid px-2"
                alt="Icon Unavailable"
              />
            </Link>
          </div>
        </div>
        <div className="pl-lg-5 pl-4 dice-font-size">
          <div className="row px-2 text-center">
            <div className="col-lg tech-back-color mr-4">
              <span className="text-highlight-color">Software</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span className="text-highlight-color">Java</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span>Agile</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span>Git</span>
            </div>
            <div className="col-lg tech-back-color mr-4">
              <span className="text-highlight-color">Software</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span className="text-highlight-color">Java</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span>Agile</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span>Git</span>
            </div>
          </div>
          <div className="row px-2 pt-lg-1 text-center">
            <div className="col-lg tech-back-color mr-4">
              <span className="text-highlight-color">Software</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span className="text-highlight-color">Java</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span>Agile</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span>Git</span>
            </div>
            <div className="col-lg tech-back-color mr-4">
              <span className="text-highlight-color">Software</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span className="text-highlight-color">Java</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span>Agile</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span>Git</span>
            </div>
          </div>
          <div className="row px-2 pt-lg-1 text-center">
            <div className="col-lg tech-back-color mr-4">
              <span className="text-highlight-color">Software</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span className="text-highlight-color">Java</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span>Agile</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span>Git</span>
            </div>
            <div className="col-lg tech-back-color mr-4">
              <span className="text-highlight-color">Software</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span className="text-highlight-color">Java</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span>Agile</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span>Git</span>
            </div>
          </div>
          <div className="row px-2 pt-lg-1 text-center">
            <div className="col-lg tech-back-color mr-4">
              <span className="text-highlight-color">Software</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span className="text-highlight-color">Java</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span>Agile</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span>Git</span>
            </div>
            <div className="col-lg tech-back-color mr-4">
              <span className="text-highlight-color">Software</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span className="text-highlight-color">Java</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span>Agile</span>
            </div>
            <div className="col-lg tech-back-color mr-4 mt-lg-0 mt-1">
              <span>Git</span>
            </div>
          </div>
          <div className="pagination justify-content-end font pr-3 pt-1">
            <Link href="#">
              View more <i className="fa fa-chevron-down"></i>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VatsSearchDetails;
