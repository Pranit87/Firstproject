import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { getExtendedDetails } from "../../../Services/employeeServices";

const EmpHiddenRow = ({ id }) => {
  const [extendedDetails, setExtendedDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getExtendedDetails(id, setExtendedDetails, setLoading);
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="text-center">
          <div colspan="11">
            <div class="spinner-border text-dark" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <Form>
          {extendedDetails ? (
            <Form.Group>
              <Row className="description-font pl-lg-5">
                <Col lg className="text-center text-lg-left">
                  <span className="description-color">ADP Number: </span>
                  <span className=" font-weight-bold">
                    {extendedDetails.adp_number}
                  </span>
                </Col>

                <Col lg className="text-center text-lg-left">
                  <span className="description-color ">Visa Status: </span>
                  <span className=" font-weight-bold">
                    {extendedDetails.tax_visa_status}
                  </span>
                </Col>

                <Col lg className="text-center text-lg-left">
                  <span className="description-color ">WC Code: </span>
                  <span className=" font-weight-bold">
                    {extendedDetails.workers_compensation_code}
                  </span>
                </Col>
              </Row>
              <Row className="description-font pl-lg-5">
                <Col lg className="text-center text-lg-left">
                  <span className="description-color">WC Rate: </span>
                  <span className=" font-weight-bold">
                    {extendedDetails.workers_compensation_rate}
                  </span>
                </Col>

                <Col lg className="text-center text-lg-left">
                  <span className="description-color ">Has Medical: </span>
                  <span className=" font-weight-bold">
                    {extendedDetails.has_medical_deduction}
                  </span>
                </Col>

                <Col lg className="text-center text-lg-left">
                  <span className="description-color ">
                    Medical Start Date:{" "}
                  </span>
                  <span className=" font-weight-bold">
                    {extendedDetails.medical_start_date}
                  </span>
                </Col>
              </Row>
              <Row className="description-font pl-lg-5">
                <Col lg className="text-center text-lg-left">
                  <span className="description-color">Medical End Date: </span>
                  <span className=" font-weight-bold">
                    {extendedDetails.medical_end_date}
                  </span>
                </Col>

                <Col lg className="text-center text-lg-left">
                  <span className="description-color ">Work Address: </span>
                  <span className=" font-weight-bold">
                    {extendedDetails.work_location}
                  </span>
                </Col>

                <Col lg className="text-center text-lg-left">
                  <span className="description-color ">
                    Residential Address:{" "}
                  </span>
                  <span className=" font-weight-bold">{`${
                    extendedDetails.resume_location
                      ? extendedDetails.resume_location
                      : ""
                  }${extendedDetails.resume_location ? "," : ""}${
                    extendedDetails.resume_city
                      ? extendedDetails.resume_city
                      : ""
                  }`}</span>
                </Col>
              </Row>
              <Row className="description-font pl-lg-5">
                <Col lg className="text-center text-lg-left">
                  <span className="description-color">Comments: </span>
                  <span className=" font-weight-bold">
                    {extendedDetails.resume_special_comments}
                  </span>
                </Col>

                <Col lg className="text-center text-lg-left">
                  <span className="description-color ">
                    Approval Required:{" "}
                  </span>
                  <span className=" font-weight-bold">
                    {extendedDetails.approval_required
                      ? extendedDetails.approval_required === 2
                        ? "No"
                        : "Yes"
                      : ""}
                  </span>
                </Col>

                <Col lg className="text-center text-lg-left">
                  <span className="description-color ">Approval Email: </span>
                  <span className=" font-weight-bold">
                    {extendedDetails.approval_email}
                  </span>
                </Col>
              </Row>
              <Row className="description-font pl-lg-5">
                <Col lg className="text-center text-lg-left">
                  <span className="description-color">VCare: </span>
                  <span className=" font-weight-bold">No</span>
                </Col>

                <Col lg className="text-center text-lg-left">
                  <span className="description-color ">CGS: </span>
                  <span className=" font-weight-bold">No</span>
                </Col>

                <Col lg className="text-center text-lg-left"></Col>
              </Row>
            </Form.Group>
          ) : (
            <Form.Group>
              <Row className="description-font">
                <Col
                  lg
                  className="text-center py-3 text-lg-center font-weight-bold"
                >
                  {"No Data Available"}
                </Col>
              </Row>
            </Form.Group>
          )}
        </Form>
      )}
    </>
  );
};

export default EmpHiddenRow;
