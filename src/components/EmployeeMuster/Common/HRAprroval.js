import React from "react";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Col, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import Select from "react-select";
import { Notification } from "../../Common/Notification/Notification";
import { postEmployeeHRApproval } from "../../../Services/employeeServices";

const HRAprroval = ({
  hrApprovalData,
  hrApprovalLoading,
  id,
  setHrApprovalRefreshLoading,
  hrApprovalRefreshLoading,
}) => {
  const HR = [
    { value: "1", label: "Yes" },
    { value: "2", label: "No" },
    { value: "3", label: "NA" },
  ];

  const profile = localStorage.getItem("profile");
  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });
  const [submitting, setSubmitting] = React.useState(false);

  const initialHRApprovalValue = hrApprovalData || {
    drug_test: "",
    criminal: "",
    employment: "",
    education: "",
    mvr: "",
    i9_form: "",
    i9_supporting_docs: "",
    w4: "",
    bank_supporting_docs: "",
    other_docs_n_sign_items: "",
    hr_approved: "",
    approved_by: "",
  };

  return (
    <>
      <Formik
        initialValues={initialHRApprovalValue}
        enableReinitialize={true}
        onSubmit={(values) => {
          const updatedValues = {
            ...values,
            id: id,
            user_id: JSON.parse(profile)["id"],
          };
          postEmployeeHRApproval(
            updatedValues,
            setNotify,
            hrApprovalRefreshLoading,
            setHrApprovalRefreshLoading,
            setSubmitting
          );
        }}
      >
        {(props) => {
          const { values, handleSubmit, handleReset, isValid, dirty } = props;
          return hrApprovalLoading ? (
            <Form
              className="inner bg-white pt-4 pb-2 mx-4 rounded shadow font"
              onSubmit={handleSubmit}
            >
              <div className="text-center">
                <div colspan="11">
                  <div class="spinner-border text-dark" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            </Form>
          ) : (
            <Form
              className="inner bg-white pt-4 pb-2 mx-4 rounded shadow font"
              onSubmit={handleSubmit}
            >
              {notify.show && <Notification {...notify} />}
              <Row className="px-3 py-4">
                <Col lg={3}>
                  <span>Drug Test:</span>
                </Col>
                <Col lg={3}>
                  <Select
                    options={HR}
                    className="form-control col-lg mx-2 px-0 py-0"
                    name="drug_test"
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                    onChange={(e) => {
                      props.setFieldValue("drug_test", e && e.value);
                    }}
                    value={HR.filter(({ value }) => value === values.drug_test)}
                    placeholder={<div>Drug Test</div>}
                  ></Select>
                </Col>
              </Row>
              <Col className=" mx-3 my-4">
                <span className="common-search">Background Check</span>
              </Col>
              <Row className="px-3">
                <Col lg={3}>
                  <span> Criminal:</span>
                </Col>
                <Col lg={3}>
                  <Select
                    options={HR}
                    className="form-control col-lg mx-2 px-0 py-0"
                    name="criminal"
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                    onChange={(e) => {
                      props.setFieldValue("criminal", e && e.value);
                    }}
                    value={HR.filter(({ value }) => value === values.criminal)}
                    placeholder={<div>Criminal</div>}
                  ></Select>
                </Col>
                <Col lg={3}>
                  <span> Employment:</span>
                </Col>
                <Col lg={3}>
                  <Select
                    options={HR}
                    className="form-control col-lg mx-2 px-0 py-0"
                    name="employment"
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                    onChange={(e) => {
                      props.setFieldValue("employment", e && e.value);
                    }}
                    value={HR.filter(
                      ({ value }) => value === values.employment
                    )}
                    placeholder={<div>Employment</div>}
                  ></Select>
                </Col>
              </Row>
              <Row className="row px-3 py-4">
                <Col lg={3}>
                  <span> Education:</span>
                </Col>
                <Col lg={3}>
                  <Select
                    options={HR}
                    className="form-control col-lg mx-2 px-0 py-0"
                    name="education"
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                    onChange={(e) => {
                      props.setFieldValue("education", e && e.value);
                    }}
                    value={HR.filter(({ value }) => value === values.education)}
                    placeholder={<div>Education</div>}
                  ></Select>
                </Col>
                <Col lg={3}>
                  <span> MVR (if applicable):</span>
                </Col>
                <Col lg={3}>
                  <Select
                    options={HR}
                    className="form-control col-lg mx-2 px-0 py-0"
                    name="mvr"
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                    onChange={(e) => {
                      props.setFieldValue("mvr", e && e.value);
                    }}
                    value={HR.filter(({ value }) => value === values.mvr)}
                    placeholder={<div>MVR (if applicable)</div>}
                  ></Select>
                </Col>
              </Row>
              <Col className=" mx-3 my-4">
                <span className="common-search">Documents Check</span>
              </Col>
              <Row className="px-3">
                <Col lg={3}>
                  <span> I9 Form:</span>
                </Col>
                <Col lg={3}>
                  <Select
                    options={HR}
                    className="form-control col-lg mx-2 px-0 py-0"
                    name="i9_form"
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                    onChange={(e) => {
                      props.setFieldValue("i9_form", e && e.value);
                    }}
                    value={HR.filter(({ value }) => value === values.i9_form)}
                    placeholder={<div>I9 Form</div>}
                  ></Select>
                </Col>
                <Col lg={3}>
                  <span> I9 Supporting Docs:</span>
                </Col>
                <Col lg={3}>
                  <Select
                    options={HR}
                    className="form-control col-lg mx-2 px-0 py-0"
                    name="i9_supporting_docs"
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                    onChange={(e) => {
                      props.setFieldValue("i9_supporting_docs", e && e.value);
                    }}
                    value={HR.filter(
                      ({ value }) => value === values.i9_supporting_docs
                    )}
                    placeholder={<div>I9 Supporting Docs</div>}
                  ></Select>
                </Col>
              </Row>
              <Row className="px-3 py-4">
                <Col lg={3}>
                  <span> W4:</span>
                </Col>
                <Col lg={3}>
                  <Select
                    options={HR}
                    className="form-control col-lg mx-2 px-0 py-0"
                    name="w4"
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                    onChange={(e) => {
                      props.setFieldValue("w4", e && e.value);
                    }}
                    value={HR.filter(({ value }) => value === values.w4)}
                    placeholder={<div>W4</div>}
                  ></Select>
                </Col>
                <Col lg={3}>
                  <span> Bank Supporting Docs:</span>
                </Col>
                <Col lg={3}>
                  <Select
                    options={HR}
                    className="form-control col-lg mx-2 px-0 py-0"
                    name="bank_supporting_docs"
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                    onChange={(e) => {
                      props.setFieldValue("bank_supporting_docs", e && e.value);
                    }}
                    value={HR.filter(
                      ({ value }) => value === values.bank_supporting_docs
                    )}
                    placeholder={<div>Bank Supporting Docs</div>}
                  ></Select>
                </Col>
              </Row>
              <Row className="px-3 py-4">
                <Col lg={3}>
                  <span> Other Docs & Sign Items:</span>
                </Col>
                <Col lg={3}>
                  <Select
                    options={HR}
                    className="form-control col-lg mx-2 px-0 py-0"
                    name="other_docs_n_sign_items"
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                    onChange={(e) => {
                      props.setFieldValue(
                        "other_docs_n_sign_items",
                        e && e.value
                      );
                    }}
                    value={HR.filter(
                      ({ value }) => value === values.other_docs_n_sign_items
                    )}
                    placeholder={<div>Other Docs & Sign Items</div>}
                  ></Select>
                </Col>
              </Row>
              <Row className="px-3 py-4">
                <Col lg={3}>
                  <span className="common-search">Last Updated by</span>
                </Col>
                <Col lg={3}>
                  <span className="mx-2">{values.approved_by}</span>
                </Col>
              </Row>
              <Col className=" mx-3 my-4"></Col>
              {/* BUTTONS */}
              <Container>
                <Row class="ml-3 py-4">
                  <Col md={12} className="text-right">
                    <Button
                      className="mx-2 my-2 btn btn-primary"
                      type="submit"
                      disabled={submitting || !dirty || !isValid}
                    >
                      {!submitting ? "Save" : "Saving..."}
                    </Button>
                    <Button
                      className="mx-2 my-2 btn btn-secondary"
                      type="button"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default HRAprroval;
