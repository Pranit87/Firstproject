import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { getAllTax } from "../../../Services/employeeServices";

const Tax = ({ id }) => {
  const [tax, setTax] = useState([]);

  useEffect(() => {
    getAllTax(id, setTax);
  }, [id]);

  return (
    <>
      <Form className="inner bg-white pt-4 pb-2 mx-4 rounded shadow font">
        <Form.Group className="inner pb-2 mx-4 font">
          <Row className="description-font mb-3 pl-lg-5">
            <Col lg className="text-center text-lg-left">
              <div className="description-color">Federal Tax Exempt: </div>
              <div className=" font-weight-bold">
                {tax.federal_tax_exempt
                  ? tax.federal_tax_exempt === 1
                    ? "Yes"
                    : "No"
                  : null}
              </div>
            </Col>

            <Col lg className="text-center text-lg-left">
              <div className="description-color ">State Tax Exempt: </div>
              <div className=" font-weight-bold">
                {tax.state_tax_exempt
                  ? tax.state_tax_exempt === 1
                    ? "Yes"
                    : "No"
                  : null}
              </div>
            </Col>

            <Col lg className="text-center text-lg-left">
              <div className="description-color ">Name: </div>
              <div className=" font-weight-bold">{tax.name}</div>
            </Col>
          </Row>
          <Row className=" description-font mb-3 pl-lg-5">
            <Col lg className="text-center text-lg-left">
              <div className="description-color">Start Date: </div>
              <div className=" font-weight-bold">{tax.start_date}</div>
            </Col>

            <Col lg className="text-center text-lg-left">
              <div className="description-color ">Visa Status: </div>
              <div className=" font-weight-bold">{tax.visa_status}</div>
            </Col>

            <Col lg className="text-center text-lg-left">
              <div className="description-color ">Work Location: </div>
              <div className=" font-weight-bold">{tax.location}</div>
            </Col>
          </Row>
          <Row className=" description-font mb-3 pl-lg-5">
            <Col lg className="text-center text-lg-left">
              <div className="description-color">City: </div>
              <div className=" font-weight-bold">{tax.city}</div>
            </Col>

            <Col lg className="text-center text-lg-left">
              <div className="description-color ">State: </div>
              <div className=" font-weight-bold">{tax.state}</div>
            </Col>

            <Col lg className="text-center text-lg-left">
              <div className="description-color ">Zip Code: </div>
              <div className=" font-weight-bold">{tax.zip}</div>
            </Col>
          </Row>
          <Row className=" description-font mb-3 pl-lg-5">
            <Col lg className="text-center text-lg-left">
              <div className="description-color">Tax Status: </div>
              <div className=" font-weight-bold">{tax.tax_status}</div>
            </Col>

            <Col lg className="text-center text-lg-left">
              <div className="description-color ">Federal No. Allowance: </div>
              <div className=" font-weight-bold">
                {tax.federal_no_of_allowances}
              </div>
            </Col>

            <Col lg className="text-center text-lg-left">
              <div className="description-color ">
                Federal Additional Amount:{" "}
              </div>
              <div className=" font-weight-bold">
                {tax.federal_additional_amount}
              </div>
            </Col>
          </Row>
          <Row className=" description-font mb-3 pl-lg-5">
            <Col lg className="text-center text-lg-left">
              <div className="description-color">State No. Allowance: </div>
              <div className=" font-weight-bold">
                {tax.state_no_of_allowances}
              </div>
            </Col>

            <Col lg className="text-center text-lg-left">
              <div className="description-color ">
                State Additional Amount:{" "}
              </div>
              <div className=" font-weight-bold">
                {tax.state_additional_amount}
              </div>
            </Col>
            <Col lg className="text-center text-lg-left">
              <div className="description-color "></div>
              <div className=" font-weight-bold"></div>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </>
  );
};

export default Tax;
