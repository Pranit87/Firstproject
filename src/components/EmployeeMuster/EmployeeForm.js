import React, { useState, useEffect } from "react";
import { getAllClients } from "../../Services/jobsService";
import { Col, Form, FormControl, Row, Table, Modal } from "react-bootstrap";
import "../Source/sourcingUI.css";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { Button } from "react-bootstrap";
import { Formik } from "formik";
import {
  getAllCitizenship,
  getAllHolidays,
  getAllVisaStatus,
  getResumes,
  getJobTitle,
  // getStaffCompany,
  // getStaffType,
  saveEmployee,
  getExistingEmployeeDetails,
} from "../../Services/employeeServices";
import {
  Gender,
  OTCalulation,
  PayFrequency,
  BillFrequency,
  EMP,
  EMP_Type,
  PayRate,
  PaymentTerms,
  PTOtype,
  Staff_Company,
  Staff_Type,
} from "../../constants";
import "./EmployeeForm.styles.css";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import Select from "react-select";

const EmployeeForm = () => {
  const { id } = useParams();
  const [showEmpType, setShowEmpType] = useState(false);
  const [showRehire, setShowRehire] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [visadetails, setVisaDetails] = useState([]);
  const [clients, setClients] = useState([]);
  const [citizenship, setCitizenship] = useState([]);
  const [federalHoliday, setFederalHoliday] = useState([]);
  const [resume, setResumes] = useState([]);
  const [jobTitle, setJobTitle] = useState([]);
  // const [staffCompany, setStaffCompany] = useState([]);
  // const [staffType, setStaffType] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  //Employement Details Section
  const [showEmail, setShowEmail] = useState(false);
  //PTO dropdown
  const [showPTOPerHour, setShowPTOPerHour] = useState(false);
  //Payroll Details Section
  //Multiple Shift Rate
  const [showMultiShift, setShowMultiShift] = useState(false);
  //Overtime Rate
  const [showOverTime, setShowOverTime] = useState(false);
  //Federal Tax Section
  const [showFedTax, setShowFedTax] = useState(false);
  //State Tax Section
  const [showStateTax, setShowStateTax] = useState(false);
  //Benefits Section
  //Sick Hours
  const [showSickhours, setShowSickHours] = useState(false);
  //PTO Hours
  const [showPTOhours, setShowPTOHours] = useState(false);
  //Holiday Hours
  const [showHolidayhours, setShowHolidayHours] = useState(false);
  //Medical Type Section
  const [showMedicalType, setShowMedicalType] = useState(false);
  //Kaiser input
  const [showKaiser, setShowKaiser] = useState(false);
  //UHC input
  const [showUHC, setShowUHC] = useState(false);
  //Co-Power input
  const [showCoPower, setShowCoPower] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [queries, setQueries] = useState(null);
  const [clientId, setClientId] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const FederalHolidayModal = () => {
    return (
      <Modal className="d-lg-flex" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Row>
              <Col>
                <span className="ml-3">Federal Holiday List</span>
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="table-hover d-table border">
            <thead className="job-table-head-bg-color">
              <tr className="text-white" width="990">
                <th>Date</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {federalHoliday.map((list, idx) => (
                <tr key={idx}>
                  <td>{list.label}</td>
                  <td>{list.value}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  useEffect(() => {
    getAllClients(setClients);
    getAllCitizenship(setCitizenship);
    getAllVisaStatus(setVisaDetails);
    getAllHolidays(setFederalHoliday);
  }, []);

  //Resume Search
  useEffect(() => {
    if (queries) getResumes(queries, setResumes, setIsLoading);
  }, [queries]);

  //Job Title dropdown
  useEffect(() => {
    if (clientId) getJobTitle(clientId, setJobTitle);
  }, [clientId]);

  // //Staff Company Dropdown
  // useEffect(() => {
  //   getStaffCompany(setStaffCompany);
  // }, []);

  // //Staff Type Dropdown
  // useEffect(() => {
  //   getStaffType(setStaffType);
  // }, []);

  //Intial Form Input Values
  const [employeeInitialValue, setEmployeeInitialValue] = useState({
    //Personal details
    resume_id: "",
    id: "",
    resume: "",
    email: "",
    gender: "",
    mobile: "",
    alternate_contact_number: "",
    dob: "",
    visa: "",
    citizenship: "",
    ssn: "",
    resume_location: "",
    resume_city: "",
    resume_state: "",
    resume_zipcode: "",
    specialcomm: "",
    //emp details
    client_id: "",
    client: "",
    job_id: "",
    requirement_id: "",
    work_location: "",
    work_city: "",
    work_state: "",
    work_zipcode: "",
    start_date: "",
    expected_end_date: "",
    actual_end_date: "",
    employee_type: "",
    vendor_name: "",
    payment_terms: "",
    employee_status: "",
    rehire_date: "",
    workers_compensation_code: "",
    compensation_rate: "",
    approval_required: "2",
    approval_email: "",
    hr_approved: "1",
    staff_company: "",
    staff_type: "",
    hiring_manager: "",
    hiring_manager_email: "",
    //Payroll details
    pay_rate_type: "",
    salary: "",
    daily_salary: "",
    annual_salary: "",
    hours: "",
    adp_number: "",
    //payrate
    st: "",
    ot: "",
    dt: "",
    st1: "",
    st2: "",
    st3: "",
    multiple_shift_rate_exempt: "2",
    overtime_exempt: "2",
    overtime_calculation: "",
    overtime_pay_percentage: "",
    double_time_pay_percentage: "",
    ot1: "",
    ot2: "",
    ot3: "",
    dt1: "",
    dt2: "",
    dt3: "",
    standard_time_pay_rate: "",
    pay_frequency: "",
    overtime_pay_rate: "",
    double_time_pay_rate: "",
    //billrate
    overtime_bill_rate: "",
    overtime_bill_percentage: "",
    double_time_bill_percentage: "",
    standard_time_bill_rate: "",
    billing_frequency: "",
    msp_fee_percentage: "",
    double_time_bill_rate: "",
    stb: "",
    otb: "",
    dtb: "",
    stb1: "",
    stb2: "",
    stb3: "",
    otb1: "",
    otb2: "",
    otb3: "",
    dtb1: "",
    dtb2: "",
    dtb3: "",
    //Benefits Details
    sick_hours_exempt: "2",
    pto_hours_exempt: "2",
    holiday_hours_exempt: "2",
    total_sick_hours: "",
    pto_type: "",
    total_pto_hours: "",
    pto_per_every_hours: "",
    total_holiday_hours: "",
    has_medical_deduction: "2",
    //Medical Type Details
    medical_start_date: "",
    medical_end_date: "",
    medical_comments: "",
    has_kaiser: "",
    has_uhc: "",
    has_co_power: "",
    kaiser: "",
    uhc: "",
    co_power: "",
    total_medical: "",
    employer_contribution: "",
    employee_contribution: "",
    final_medical_deduction: "",
    per_payroll_deduction: "",
    //Federal Taxes Details
    tax_employee_name: "",
    tax_start_date: "",
    tax_visa_status: "",
    tax_location: "",
    tax_city: "",
    tax_state: "",
    tax_zip: "",
    tax_status: "1",
    federal_no_of_allowances: "",
    federal_additional_amount: "",
    federal_tax_exempt: "2",
    //State Tax Details
    state_no_of_allowances: "",
    state_additional_amount: "",
    state_tax_exempt: "2",
  });

  useEffect(() => {
    if (id !== "add") {
      getExistingEmployeeDetails(
        id,
        setEmployeeInitialValue,
        setLoading,
        setClientId,
        setQueries
      );
    }
  }, [id]);

  const EmployeeFormValidations = Yup.object().shape({
    resume_id: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    mobile: Yup.string().required("Required"),
    client_id: Yup.string().required("Required"),
    job_id: Yup.string().required("Required"),
    start_date: Yup.date().required("Start date is required"),
    expected_end_date: Yup.date().required("Expected end date is required"),
    employee_type: Yup.string().required("Required"),
    employee_status: Yup.string().required("Required"),
    staff_company: Yup.string().required("Required"),
    staff_type: Yup.string().required("Required"),
    hiring_manager: Yup.string().required("Required"),
    hiring_manager_email: Yup.string().required("Required"),
    pay_rate_type: Yup.string().required("Required"),
    salary: Yup.string().required("Required"),
    standard_time_pay_rate: Yup.string().when("multiple_shift_rate_exempt", {
      is: "2",
      then: Yup.string().when("overtime_exempt", {
        is: "2",
        then: Yup.string().required("required"),
      }),
    }),
    pay_frequency: Yup.string().required("Required"),
    standard_time_bill_rate: Yup.string().when("multiple_shift_rate_exempt", {
      is: "2",
      then: Yup.string().when("overtime_exempt", {
        is: "2",
        then: Yup.string().required("required"),
      }),
    }),
    tax_employee_name: Yup.string().required("Required"),
    tax_start_date: Yup.string().required("Required"),
    tax_visa_status: Yup.string().required("Required"),
    tax_location: Yup.string().required("Required"),
    tax_city: Yup.string().required("Required"),
    tax_state: Yup.string().required("Required"),
    tax_zip: Yup.string().required("Required"),
    federal_tax_exempt: Yup.string().required("Required"),
    state_tax_exempt: Yup.string().required("Required"),
    vendor_name: Yup.string().when("employee_type", {
      is: "2",
      then: Yup.string().required("required"),
    }),
    vendor_name: Yup.string().when("employee_type", {
      is: "3",
      then: Yup.string().required("required"),
    }),
    payment_terms: Yup.string().when("employee_type", {
      is: "2",
      then: Yup.string().required("required"),
    }),
    payment_terms: Yup.string().when("employee_type", {
      is: "3",
      then: Yup.string().required("required"),
    }),
    pto_type: Yup.string().when("pto_hours_exempt", {
      is: "1",
      then: Yup.string().required("required"),
    }),
    total_pto_hours: Yup.string().when("pto_hours_exempt", {
      is: "1",
      then: Yup.string().required("required"),
    }),
    // federal_no_of_allowances: Yup.string().when("federal_tax_exempt", {
    //   is: "2",
    //   then: Yup.string().required("required"),
    // }),
    // federal_additional_amount: Yup.string().when("federal_tax_exempt", {
    //   is: "2",
    //   then: Yup.string().required("required"),
    // }),
    // state_no_of_allowances: Yup.string().when("state_tax_exempt", {
    //   is: "2",
    //   then: Yup.string().required("required"),
    // }),
    // state_additional_amount: Yup.string().when("state_tax_exempt", {
    //   is: "2",
    //   then: Yup.string().required("required"),
    // }),
    overtime_pay_percentage1: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().when("overtime_pay_percentage", {
          is: (overtime_pay_percentage) =>
            overtime_pay_percentage === "" ||
            overtime_pay_percentage === undefined ||
            overtime_pay_percentage === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    double_time_pay_percentage1: Yup.string().when(
      "multiple_shift_rate_exempt",
      {
        is: "1",
        then: Yup.string().when("overtime_exempt", {
          is: "1",
          then: Yup.string().when("double_time_pay_percentage", {
            is: (double_time_pay_percentage) =>
              double_time_pay_percentage === "" ||
              double_time_pay_percentage === undefined ||
              double_time_pay_percentage === null,
            then: Yup.string().required("required"),
          }),
        }),
      }
    ),
    st1: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().required("required"),
      }),
    }),
    st2: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().required("required"),
      }),
    }),
    st3: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().required("required"),
      }),
    }),
    OvertimePay1: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().when("ot1", {
          is: (ot1) => ot1 === "" || ot1 === undefined || ot1 === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    OvertimePay2: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().when("ot2", {
          is: (ot2) => ot2 === "" || ot2 === undefined || ot2 === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    OvertimePay3: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().when("ot3", {
          is: (ot3) => ot3 === "" || ot3 === undefined || ot3 === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    DoubletimePay1: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().when("dt1", {
          is: (dt1) => dt1 === "" || dt1 === undefined || dt1 === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    DoubletimePay2: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().when("dt2", {
          is: (dt2) => dt2 === "" || dt2 === undefined || dt2 === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    DoubletimePay3: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().when("dt3", {
          is: (dt3) => dt3 === "" || dt3 === undefined || dt3 === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    overtime_bill_percentage1: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().when("overtime_bill_percentage", {
          is: (overtime_bill_percentage) =>
            overtime_bill_percentage === "" ||
            overtime_bill_percentage === undefined ||
            overtime_bill_percentage === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    double_time_bill_percentage1: Yup.string().when(
      "multiple_shift_rate_exempt",
      {
        is: "1",
        then: Yup.string().when("overtime_exempt", {
          is: "1",
          then: Yup.string().when("double_time_bill_percentage", {
            is: (double_time_bill_percentage) =>
              double_time_bill_percentage === "" ||
              double_time_bill_percentage === undefined ||
              double_time_bill_percentage === null,
            then: Yup.string().required("required"),
          }),
        }),
      }
    ),
    stb1: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().required("required"),
      }),
    }),
    stb2: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().required("required"),
      }),
    }),
    stb3: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().required("required"),
      }),
    }),
    OvertimeBill1: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().when("otb1", {
          is: (otb1) => otb1 === "" || otb1 === undefined || otb1 === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    OvertimeBill2: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().when("otb2", {
          is: (otb2) => otb2 === "" || otb2 === undefined || otb2 === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    OvertimeBill3: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().when("otb3", {
          is: (otb3) => otb3 === "" || otb3 === undefined || otb3 === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    DoubletimeBill1: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().when("dtb1", {
          is: (dtb1) => dtb1 === "" || dtb1 === undefined || dtb1 === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    DoubletimeBill2: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().when("dtb2", {
          is: (dtb2) => dtb2 === "" || dtb2 === undefined || dtb2 === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    DoubletimeBill3: Yup.string().when("overtime_exempt", {
      is: "1",
      then: Yup.string().when("multiple_shift_rate_exempt", {
        is: "1",
        then: Yup.string().when("dtb3", {
          is: (dtb3) => dtb3 === "" || dtb3 === undefined || dtb3 === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    RegulartimePay1: Yup.string().when("multiple_shift_rate_exempt", {
      is: "1",
      then: Yup.string().when("overtime_exempt", {
        is: "2",
        then: Yup.string().when("st1", {
          is: (st1) => st1 === "" || st1 === undefined || st1 === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    RegulartimePay2: Yup.string().when("multiple_shift_rate_exempt", {
      is: "1",
      then: Yup.string().when("overtime_exempt", {
        is: "2",
        then: Yup.string().when("st2", {
          is: (st2) => st2 === "" || st2 === undefined || st2 === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    RegulartimePay3: Yup.string().when("multiple_shift_rate_exempt", {
      is: "1",
      then: Yup.string().when("overtime_exempt", {
        is: "2",
        then: Yup.string().when("st3", {
          is: (st3) => st3 === "" || st3 === undefined || st3 === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    RegulartimeBill1: Yup.string().when("multiple_shift_rate_exempt", {
      is: "1",
      then: Yup.string().when("overtime_exempt", {
        is: "2",
        then: Yup.string().when("stb1", {
          is: (stb1) => stb1 === "" || stb1 === undefined || stb1 === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    RegulartimeBill2: Yup.string().when("multiple_shift_rate_exempt", {
      is: "1",
      then: Yup.string().when("overtime_exempt", {
        is: "2",
        then: Yup.string().when("stb2", {
          is: (stb2) => stb2 === "" || stb2 === undefined || stb2 === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    RegulartimeBill3: Yup.string().when("multiple_shift_rate_exempt", {
      is: "1",
      then: Yup.string().when("overtime_exempt", {
        is: "2",
        then: Yup.string().when("stb3", {
          is: (stb3) => stb3 === "" || stb3 === undefined || stb3 === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    standard_time_pay_rate1: Yup.string().when("multiple_shift_rate_exempt", {
      is: "2",
      then: Yup.string().when("overtime_exempt", {
        is: "1",
        then: Yup.string().when("standard_time_pay_rate", {
          is: (standard_time_pay_rate) =>
            standard_time_pay_rate === "" ||
            standard_time_pay_rate === undefined ||
            standard_time_pay_rate === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    overtime_pay_rate: Yup.string().when("multiple_shift_rate_exempt", {
      is: "2",
      then: Yup.string().when("overtime_exempt", {
        is: "1",
        then: Yup.string().required("required"),
      }),
    }),
    double_time_pay_rate: Yup.string().when("multiple_shift_rate_exempt", {
      is: "2",
      then: Yup.string().when("overtime_exempt", {
        is: "1",
        then: Yup.string().required("required"),
      }),
    }),
    overtime_pay_percentage: Yup.string().when("multiple_shift_rate_exempt", {
      is: "2",
      then: Yup.string().when("overtime_exempt", {
        is: "1",
        then: Yup.string().required("required"),
      }),
    }),
    double_time_pay_percentage: Yup.string().when(
      "multiple_shift_rate_exempt",
      {
        is: "2",
        then: Yup.string().when("overtime_exempt", {
          is: "1",
          then: Yup.string().required("required"),
        }),
      }
    ),
    standard_time_bill_rate1: Yup.string().when("multiple_shift_rate_exempt", {
      is: "2",
      then: Yup.string().when("overtime_exempt", {
        is: "1",
        then: Yup.string().when("standard_time_bill_rate", {
          is: (standard_time_bill_rate) =>
            standard_time_bill_rate === "" ||
            standard_time_bill_rate === undefined ||
            standard_time_bill_rate === null,
          then: Yup.string().required("required"),
        }),
      }),
    }),
    overtime_bill_rate: Yup.string().when("multiple_shift_rate_exempt", {
      is: "2",
      then: Yup.string().when("overtime_exempt", {
        is: "1",
        then: Yup.string().required("required"),
      }),
    }),
    double_time_bill_rate: Yup.string().when("multiple_shift_rate_exempt", {
      is: "2",
      then: Yup.string().when("overtime_exempt", {
        is: "1",
        then: Yup.string().required("required"),
      }),
    }),
    overtime_bill_percentage: Yup.string().when("multiple_shift_rate_exempt", {
      is: "2",
      then: Yup.string().when("overtime_exempt", {
        is: "1",
        then: Yup.string().required("required"),
      }),
    }),
    double_time_bill_percentage: Yup.string().when(
      "multiple_shift_rate_exempt",
      {
        is: "2",
        then: Yup.string().when("overtime_exempt", {
          is: "1",
          then: Yup.string().required("required"),
        }),
      }
    ),
  });

  const handleCustomReset = (props) => {
    props.setFieldValue("stb", "");
    props.setFieldValue("otb", "");
    props.setFieldValue("dtb", "");
    props.setFieldValue("stb1", "");
    props.setFieldValue("stb2", "");
    props.setFieldValue("stb3", "");
    props.setFieldValue("otb1", "");
    props.setFieldValue("otb2", "");
    props.setFieldValue("otb3", "");
    props.setFieldValue("dtb1", "");
    props.setFieldValue("dtb2", "");
    props.setFieldValue("dtb3", "");
    props.setFieldValue("st", "");
    props.setFieldValue("ot", "");
    props.setFieldValue("dt", "");
    props.setFieldValue("st1", "");
    props.setFieldValue("st2", "");
    props.setFieldValue("st3", "");
    props.setFieldValue("ot1", "");
    props.setFieldValue("ot2", "");
    props.setFieldValue("ot3", "");
    props.setFieldValue("dt1", "");
    props.setFieldValue("dt2", "");
    props.setFieldValue("dt3", "");
    props.setFieldValue("dtovertime_bill_percentage1", "");
    props.setFieldValue("double_time_bill_percentage", "");
    props.setFieldValue("overtime_pay_percentage", "");
    props.setFieldValue("double_time_pay_percentage", "");
  };

  return (
    <>
      <FederalHolidayModal />
      <div className="my-4 mx-4 text-white h4">
        <span> &nbsp;Employee Setup Form</span>
      </div>
      <Formik
        initialValues={employeeInitialValue}
        enableReinitialize={true}
        validationSchema={EmployeeFormValidations}
        onSubmit={(values) => {
          let editEmployeeSubmitValues = Object.assign([], values);
          setErrorMessage("");
          saveEmployee(
            editEmployeeSubmitValues,
            setSubmitting,
            setErrorMessage
          );
        }}
      >
        {(props) => {
          const {
            values,
            handleBlur,
            handleSubmit,
            isValid,
            dirty,
            errors,
            touched,
            setFieldTouched,
          } = props;

          return loading ? (
            <Form>
              <Form.Row className="inner bg-white my-4 px-4 py-4 mx-4 rounded shadow font">
                <div className="text-center" style={{ width: "100%" }}>
                  <div colspan="11">
                    <div class="spinner-border text-dark" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
              </Form.Row>
            </Form>
          ) : (
            <Form onSubmit={handleSubmit}>
              {/* FIRST FORM ROW */}
              <Form.Row className={"formRow"}>
                <Form.Group className="inner bg-white my-4 px-4 py-4 mx-4 rounded shadow font">
                  {errorMessage && (
                    <div className="my-4 mx-4 h4" style={{ color: "red" }}>
                      {errorMessage ? errorMessage : ""}
                    </div>
                  )}
                  <span className={"common-search"}>Personal Details</span>

                  <Row className="mt-4">
                    <Col lg>
                      <span className="required">Resume</span>
                    </Col>
                    <Col lg>
                      <span className="required">Enter Email</span>
                    </Col>

                    <Col lg>
                      <span>Gender</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <AsyncTypeahead
                        classNamePrefix="Select"
                        className="form-control col-lg mr-2 px-0 py-0"
                        escapeClearsValue
                        isClearable
                        cacheOptions
                        minLength={3}
                        onBlur={(e) => setFieldTouched("resume_id", true)}
                        id="resume_id"
                        name="resume_id"
                        isLoading={isLoading}
                        labelKey={(option) => `${option.name}`}
                        options={resume}
                        selected={
                          resume &&
                          resume.filter(
                            ({ id }) => id === values.resume_id || ""
                          )
                        }
                        placeholder="Resume"
                        onSearch={(e) => {
                          setIsLoading(true);
                          setQueries(e);
                        }}
                        onChange={(event) => {
                          setIsLoading(false);
                          if (event.length > 0) {
                            const targets = event[0];
                            props.setFieldValue("resume_id", targets.id);
                            props.setFieldValue("email", targets.email);
                            props.setFieldValue("mobile", targets.mobile);
                            props.setFieldValue("visa", targets.visa);
                            props.setFieldValue(
                              "citizenship",
                              targets.citizenship
                            );
                            props.setFieldValue(
                              "resume_location",
                              targets.location
                            );
                            props.setFieldValue(
                              "tax_location",
                              targets.location
                            );
                            props.setFieldValue(
                              "tax_employee_name",
                              targets.name
                            );
                            props.setFieldValue("resume_state", targets.state);
                            props.setFieldValue(
                              "resume_zipcode",
                              targets.zipcode
                            );
                            props.setFieldValue("resume_city", targets.city);
                            props.setFieldValue("tax_city", targets.city);
                          } else {
                            props.setFieldValue("resume_id", "");
                            props.setFieldValue("email", "");
                            props.setFieldValue("mobile", "");
                            props.setFieldValue("visa", "");
                            props.setFieldValue("citizenship", "");
                            props.setFieldValue("resume_location", "");
                            props.setFieldValue("resume_state", "");
                            props.setFieldValue("resume_zipcode", "");
                            props.setFieldValue("resume_city", "");
                            props.setFieldValue("tax_location", "");
                            props.setFieldValue("tax_employee_name", "");
                            props.setFieldValue("tax_city", "");
                          }
                        }}
                      />

                      {touched.resume_id && errors.resume_id && (
                        <div style={{ color: "red" }}>{errors.resume_id}</div>
                      )}
                    </Col>
                    <Col lg={4}>
                      <FormControl
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        id="email"
                        onBlur={handleBlur}
                        value={values.email || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("email", targets);
                        }}
                      />
                      {touched.email && errors.email && (
                        <div style={{ color: "red" }}>{errors.resume_id}</div>
                      )}
                    </Col>

                    <Col lg={4}>
                      <Select
                        classNamePrefix="Select"
                        options={Gender}
                        className="form-control col-lg mr-2 px-0 py-0"
                        getOptionLabel={({ label }) => label}
                        getOptionValue={({ value }) => value}
                        value={
                          Gender &&
                          Gender.filter(
                            ({ value }) => value == values.gender || ""
                          )
                        }
                        onChange={(event) => {
                          props.setFieldValue("gender", event && event.value);
                        }}
                        placeholder="Gender"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg>
                      <span className="required">Mobile Number</span>
                    </Col>
                    <Col lg>
                      <span>Alternate Contact</span>
                    </Col>

                    <Col lg>
                      <span>Date of Birth</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        id="mobile"
                        type="number"
                        placeholder="Mobile Number"
                        value={values.mobile || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("mobile", targets);
                        }}
                      />
                      {touched.mobile && errors.mobile && (
                        <div style={{ color: "red" }}>{errors.mobile}</div>
                      )}
                    </Col>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="number"
                        placeholder="Alternate Contact"
                        value={values.alternate_contact_number || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue(
                            "alternate_contact_number",
                            targets
                          );
                        }}
                      />
                    </Col>

                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="date"
                        placeholder="DOB"
                        value={values.dob || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("dob", targets);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg>
                      <span>Visa</span>
                    </Col>
                    <Col lg>
                      <span>Citizenship</span>
                    </Col>

                    <Col lg>
                      <span>SSN</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <Select
                        classNamePrefix="Select"
                        className="form-control col-lg mr-2 px-0 py-0"
                        id="basic-typeahead"
                        placeholder={<div>VISA</div>}
                        options={visadetails}
                        getOptionLabel={({ label }) => label}
                        getOptionValue={({ value }) => value}
                        value={
                          visadetails &&
                          visadetails.filter(
                            ({ value }) => value === values.visa || ""
                          )
                        }
                        onChange={(event) => {
                          props.setFieldValue("visa", event && event.value);
                        }}
                      />
                    </Col>
                    <Col lg={4}>
                      <Select
                        classNamePrefix="Select"
                        className="form-control col-lg mr-2 px-0 py-0"
                        id="basic-typeahead"
                        placeholder="Citizenship"
                        options={citizenship}
                        getOptionLabel={({ label }) => label}
                        getOptionValue={({ value }) => value}
                        value={
                          citizenship &&
                          citizenship.filter(
                            ({ value }) => value === values.citizenship || ""
                          )
                        }
                        onChange={(event) => {
                          props.setFieldValue(
                            "citizenship",
                            event && event.value
                          );
                        }}
                      />
                    </Col>

                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        placeholder="SSN"
                        value={values.ssn || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("ssn", targets);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg>
                      <span>Location</span>
                    </Col>
                    <Col lg>
                      <span>City</span>
                    </Col>

                    <Col lg>
                      <span>State</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="text"
                        placeholder="Location"
                        value={values.resume_location || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("resume_location", targets);
                        }}
                      />
                    </Col>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="text"
                        placeholder="City"
                        value={values.resume_city || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("resume_city", targets);
                        }}
                      />
                    </Col>

                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="text"
                        placeholder="State"
                        value={values.resume_state || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("resume_state", targets);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg>
                      <span>Zip Code</span>
                    </Col>
                    <Col lg>
                      <span>Special Comments</span>
                    </Col>

                    <Col lg>
                      <span></span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="number"
                        placeholder="Zip Code"
                        value={values.resume_zipcode || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("resume_zipcode", targets);
                        }}
                      />
                    </Col>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        as="textarea"
                        type="text"
                        placeholder="Special Comments"
                        value={values.specialcomm || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("specialcomm", targets);
                        }}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Form.Row>

              {/* SECOND FORM ROW */}
              <Form.Row className={"formRow"}>
                <Form.Group className="inner bg-white my-4 px-4 py-4 mx-4 rounded shadow font">
                  <span className={"common-search"}>Employment Details</span>
                  <Row className="mt-4">
                    <Col lg>
                      <span className="required">Client</span>
                    </Col>
                    <Col lg>
                      <span className="required">Job Title</span>
                    </Col>

                    <Col lg>
                      <span>Work Location</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <Select
                        classNamePrefix="Select"
                        className="form-control col-lg mr-2 px-0 py-0"
                        id="basic-typeahead"
                        options={clients}
                        onBlur={(e) => setFieldTouched("client_id", true)}
                        placeholder="Client"
                        getOptionLabel={({ value }) => value}
                        getOptionValue={({ id }) => id}
                        value={
                          clients &&
                          clients.filter(
                            ({ id }) => id === values.client_id || ""
                          )
                        }
                        onChange={(event) => {
                          props.setFieldValue("client_id", event && event.id);
                          props.setFieldValue("client", event && event.value);
                          setClientId(event && event.id);
                        }}
                      />
                      {touched.client_id && errors.client_id && (
                        <div style={{ color: "red" }}>{errors.client_id}</div>
                      )}
                    </Col>
                    <Col lg={4}>
                      <Select
                        classNamePrefix="Select"
                        className="form-control col-lg mr-2 px-0 py-0"
                        id="basic-typeahead"
                        placeholder="Job Title"
                        options={jobTitle}
                        onBlur={(e) => setFieldTouched("job_id", true)}
                        getOptionLabel={({ job_title }) => job_title}
                        getOptionValue={({ job_id }) => job_id}
                        value={
                          jobTitle &&
                          jobTitle.filter(
                            ({ job_id }) => job_id === values.job_id || ""
                          )
                        }
                        onChange={(event) => {
                          props.setFieldValue("job_id", event && event.job_id);
                          props.setFieldValue(
                            "requirement_id",
                            event && event.id
                          );
                        }}
                      />
                      {touched.job_id && errors.job_id && (
                        <div style={{ color: "red" }}>{errors.job_id}</div>
                      )}
                    </Col>

                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="text"
                        placeholder="Work Location"
                        value={values.work_location || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("work_location", targets);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg>
                      <span>City</span>
                    </Col>
                    <Col lg>
                      <span>State</span>
                    </Col>

                    <Col lg>
                      <span>Zip Code</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="text"
                        placeholder="City"
                        value={values.work_city || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("work_city", targets);
                        }}
                      />
                    </Col>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="text"
                        placeholder="State"
                        value={values.work_state || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("work_state", targets);
                        }}
                      />
                    </Col>

                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="number"
                        placeholder="Zip Code"
                        value={values.work_zipcode || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("work_zipcode", targets);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg>
                      <span className="required">Start Date</span>
                    </Col>
                    <Col lg>
                      <span className="required">Expected End Date</span>
                    </Col>

                    <Col lg>
                      <span>Actual End Date</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="date"
                        placeholder="Start Date"
                        id="start_date"
                        name="start_date"
                        value={values.start_date || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("start_date", targets);
                        }}
                      />
                      {touched.start_date && errors.start_date && (
                        <div style={{ color: "red" }}>{errors.start_date}</div>
                      )}
                    </Col>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="date"
                        placeholder="Expected End Date"
                        id="expected_end_date"
                        name="expected_end_date"
                        value={values.expected_end_date || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("expected_end_date", targets);
                        }}
                      />
                      {touched.expected_end_date &&
                        errors.expected_end_date && (
                          <div style={{ color: "red" }}>
                            {errors.expected_end_date}
                          </div>
                        )}
                    </Col>

                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="date"
                        placeholder="Actual End Date"
                        id="actual_end_date"
                        name="actual_end_date"
                        value={values.actual_end_date || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("actual_end_date", targets);
                        }}
                      />
                      {touched.actual_end_date && errors.actual_end_date && (
                        <div style={{ color: "red" }}>
                          {errors.actual_end_date}
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg>
                      <span className="required">Employment Type</span>
                    </Col>
                    <Col lg>
                      <span className="required">Employment Status</span>
                    </Col>

                    <Col lg>
                      <span>Workers Compensation Code</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <Select
                        classNamePrefix="Select"
                        className="form-control col-lg mr-2 px-0 py-0"
                        id="basic-typeahead"
                        placeholder="Select Employment Type"
                        options={EMP_Type}
                        onBlur={(e) => setFieldTouched("employee_type", true)}
                        value={
                          EMP_Type &&
                          EMP_Type.filter(
                            ({ value }) => value == values.employee_type || ""
                          )
                        }
                        onInput={
                          values.employee_type == "2" ||
                          values.employee_type == "3"
                            ? setShowEmpType(true)
                            : setShowEmpType(false)
                        }
                        onChange={(event) => {
                          if (
                            (event && event.label === "C2C") ||
                            (event && event.label === "1099")
                          ) {
                            setShowEmpType(true);
                          } else {
                            setShowEmpType(false);
                          }
                          props.setFieldValue(
                            "employee_type",
                            event && event.value
                          );
                        }}
                      />
                      {touched.employee_type && errors.employee_type && (
                        <div style={{ color: "red" }}>
                          {errors.employee_type}
                        </div>
                      )}
                    </Col>
                    <Col lg={4}>
                      <Select
                        classNamePrefix="Select"
                        className="form-control col-lg mr-2 px-0 py-0"
                        id="basic-typeahead"
                        placeholder="Select Employement Status"
                        options={EMP}
                        onBlur={(e) => setFieldTouched("employee_status", true)}
                        value={
                          EMP &&
                          EMP.filter(
                            ({ value }) => value == values.employee_status || ""
                          )
                        }
                        onInput={
                          values.employee_status == "4"
                            ? setShowRehire(true)
                            : setShowRehire(false)
                        }
                        onChange={(event) => {
                          if (event && event.label === "Rehire") {
                            setShowRehire(true);
                          } else {
                            setShowRehire(false);
                          }
                          props.setFieldValue(
                            "employee_status",
                            event && event.value
                          );
                        }}
                      />
                      {touched.employee_status && errors.employee_status && (
                        <div style={{ color: "red" }}>
                          {errors.employee_status}
                        </div>
                      )}
                    </Col>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="number"
                        placeholder="Workers Compensation Code"
                        id="workers_compensation_code"
                        name="workers_compensation_code"
                        value={values.workers_compensation_code || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue(
                            "workers_compensation_code",
                            targets
                          );
                        }}
                      />
                    </Col>
                  </Row>
                  {(showEmpType || showRehire) && (
                    <Row>
                      <Col lg={4} className="mt-4">
                        {showEmpType && (
                          <span className="required">Vendor Name</span>
                        )}
                        {showEmpType && (
                          <>
                            <FormControl
                              type="text"
                              id="vendor_name"
                              name="vendor_name"
                              onBlur={handleBlur}
                              placeholder="Vendor Name"
                              value={values.vendor_name || ""}
                              onChange={(event) => {
                                const targets = event.target.value;
                                props.setFieldValue("vendor_name", targets);
                              }}
                            />
                            {touched.vendor_name && errors.vendor_name && (
                              <div style={{ color: "red" }}>
                                {errors.vendor_name}
                              </div>
                            )}
                          </>
                        )}
                        <div style={{ marginTop: "1.25rem" }}>
                          {showEmpType && (
                            <span className="required">
                              Select Payment Terms
                            </span>
                          )}
                          {showEmpType && (
                            <>
                              <Select
                                escapeClearsValue
                                isClearable
                                id="basic-typeahead"
                                placeholder="Payment Terms"
                                options={PaymentTerms}
                                onBlur={(e) =>
                                  setFieldTouched("payment_terms", true)
                                }
                                value={
                                  PaymentTerms &&
                                  PaymentTerms.filter(
                                    ({ value }) =>
                                      value == values.payment_terms || ""
                                  )
                                }
                                onChange={(event) => {
                                  if (event) {
                                    props.setFieldValue(
                                      "payment_terms",
                                      event.value
                                    );
                                  }
                                }}
                              />
                              {touched.payment_terms &&
                                errors.payment_terms && (
                                  <div style={{ color: "red" }}>
                                    {errors.payment_terms}
                                  </div>
                                )}
                            </>
                          )}
                        </div>
                      </Col>
                      <Col lg={4} className="mt-4">
                        {showRehire && (
                          <span className="required">Rehire Date</span>
                        )}
                        {showRehire && (
                          <FormControl
                            type="date"
                            placeholder="Rehire Date"
                            value={values.rehire_date || ""}
                            onChange={(event) => {
                              const targets = event.target.value;
                              props.setFieldValue("rehire_date", targets);
                            }}
                          />
                        )}
                      </Col>
                    </Row>
                  )}

                  <Row className="mt-4">
                    <Col lg>
                      <span>Workers Compensation Rate</span>
                    </Col>
                    <Col lg>
                      <span>Approval Required</span>
                    </Col>
                    <Col lg>
                      {showEmail && <span className="required">Email to</span>}
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="number"
                        placeholder="Workers Compensation Rate"
                        name="compensation_rate"
                        id="compensation_rate"
                        value={values.workers_compensation_rate || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue(
                            "workers_compensation_rate",
                            targets
                          );
                        }}
                      />
                    </Col>
                    <Col lg={4}>
                      <Col className="d-lg-flex">
                        <Form.Check
                          className="px-0"
                          inline
                          label="Yes"
                          checked={
                            values.approval_required != "2" ? true : false
                          }
                          value={values.approval_required || ""}
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = 1;
                              props.setFieldValue("approval_required", targets);
                              setShowEmail(true);
                            }
                          }}
                          name="emailto"
                          type="radio"
                        />
                        <Form.Check
                          className="px-0"
                          inline
                          label="No"
                          name="emailto"
                          checked={
                            values.approval_required == "2" ? true : false
                          }
                          value={values.approval_required || ""}
                          type="radio"
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = 2;
                              props.setFieldValue("approval_required", targets);
                              setShowEmail(false);
                            }
                          }}
                        />
                      </Col>
                    </Col>

                    {showEmail && (
                      <Col lg={4}>
                        <FormControl
                          id="approval"
                          type="email"
                          placeholder="Email to"
                          value={values.approval_email || ""}
                          onChange={(event) => {
                            if (event.target.value) {
                              setShowEmail(true);
                            }
                            const targets = event.target.value;
                            props.setFieldValue("approval_email", targets);
                          }}
                        />
                      </Col>
                    )}
                  </Row>
                  <Row className="mt-4">
                    <Col lg>
                      <span className="required">Timesheet Tool</span>
                    </Col>
                    <Col lg>
                      <span className="required">Staff Type</span>
                    </Col>

                    <Col lg>
                      <span className="required">Manager Name</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <Select
                        classNamePrefix="Select"
                        className="form-control col-lg mr-2 px-0 py-0"
                        id="basic-typeahead"
                        placeholder="Select Timesheet Tool"
                        onBlur={(e) => setFieldTouched("staff_company", true)}
                        options={Staff_Company}
                        value={
                          Staff_Company &&
                          Staff_Company.filter(
                            ({ value }) => value == values.staff_company || ""
                          )
                        }
                        onChange={(event) => {
                          props.setFieldValue(
                            "staff_company",
                            event && event.value
                          );
                        }}
                        getOptionLabel={({ label }) => label}
                        getOptionValue={({ value }) => value}
                      />
                      {touched.staff_company && errors.staff_company && (
                        <div style={{ color: "red" }}>
                          {errors.staff_company}
                        </div>
                      )}
                    </Col>
                    <Col lg={4}>
                      <Select
                        classNamePrefix="Select"
                        className="form-control col-lg mr-2 px-0 py-0"
                        id="staff_type"
                        name="staff_type"
                        placeholder="Select Staff Type"
                        onBlur={(e) => setFieldTouched("staff_type", true)}
                        options={Staff_Type}
                        value={
                          Staff_Type &&
                          Staff_Type.filter(
                            ({ value }) => value == values.staff_type || ""
                          )
                        }
                        onChange={(event) => {
                          props.setFieldValue(
                            "staff_type",
                            event && event.value
                          );
                        }}
                        getOptionLabel={({ label }) => label}
                        getOptionValue={({ value }) => value}
                      />
                      {touched.staff_type && errors.staff_type && (
                        <div style={{ color: "red" }}>{errors.staff_type}</div>
                      )}
                    </Col>

                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        id="hiring_manager"
                        name="hiring_manager"
                        type="text"
                        placeholder="Manager Name"
                        value={values.hiring_manager || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("hiring_manager", targets);
                        }}
                      />
                      {touched.hiring_manager && errors.hiring_manager && (
                        <div style={{ color: "red" }}>
                          {errors.hiring_manager}
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg>
                      <span className="required">Manager's Email</span>
                    </Col>
                    <Col lg>
                      <span></span>
                    </Col>

                    <Col lg>
                      <span></span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        id="hiring_manager_email"
                        name="hiring_manager_email"
                        type="email"
                        placeholder="Managers' Email"
                        value={values.hiring_manager_email || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("hiring_manager_email", targets);
                        }}
                      />
                      {touched.hiring_manager_email &&
                        errors.hiring_manager_email && (
                          <div style={{ color: "red" }}>
                            {errors.hiring_manager_email}
                          </div>
                        )}
                    </Col>
                  </Row>
                </Form.Group>
              </Form.Row>

              {/* THIRD FORM ROW */}
              <Form.Row className={"formRow"}>
                <Form.Group className="inner bg-white my-4 px-4 py-4 mx-4 rounded shadow font">
                  <span className={"common-search"}>Payroll Details</span>
                  <Row className="mt-4">
                    <Col lg>
                      <span className="required">Salary Type</span>
                    </Col>
                    <Col lg>
                      <span className="required">Salary</span>
                    </Col>

                    <Col lg>
                      <span>Hours</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <Select
                        classNamePrefix="Select"
                        className="form-control col-lg mr-2 px-0 py-0"
                        id="basic-typeahead"
                        placeholder="Select Salary Type"
                        options={PayRate}
                        onBlur={(e) => setFieldTouched("pay_rate_type", true)}
                        value={
                          PayRate &&
                          PayRate.filter(
                            ({ value }) => value == values.pay_rate_type || ""
                          )
                        }
                        onChange={(event) => {
                          if (event) {
                            props.setFieldValue("pay_rate_type", event.value);
                          }
                        }}
                      />
                      {touched.pay_rate_type && errors.pay_rate_type && (
                        <div style={{ color: "red" }}>
                          {errors.pay_rate_type}
                        </div>
                      )}
                    </Col>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="number"
                        placeholder="Salary"
                        name="salary"
                        id="salary"
                        value={values.salary || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("salary", targets);
                          if (values.pay_rate_type == "2") {
                            const targets = event.target.value;
                            props.setFieldValue("daily_salary", targets);
                          }
                          if (values.pay_rate_type == "3") {
                            const targets = event.target.value;
                            props.setFieldValue("annual_salary", targets);
                          }
                        }}
                      />
                      {touched.salary && errors.salary && (
                        <div style={{ color: "red" }}>{errors.salary}</div>
                      )}
                    </Col>

                    <Col lg={4}>
                      <FormControl
                        type="number"
                        placeholder="Hours"
                        name="hours"
                        id="hours"
                        value={values.hours || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("hours", targets);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="my-4">
                    <Col lg={4}>
                      <span>Multiple Shift Rate Allowed</span>
                      <Col className="d-lg-flex">
                        <Form.Check
                          className="px-0"
                          inline
                          label="Yes"
                          type="radio"
                          name="MultiShift"
                          checked={
                            values.multiple_shift_rate_exempt == "1"
                              ? true
                              : false
                          }
                          onInput={
                            values.multiple_shift_rate_exempt == "1"
                              ? setShowMultiShift(true)
                              : setShowMultiShift(false)
                          }
                          id="showmultishift"
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "1";
                              props.setFieldValue(
                                "multiple_shift_rate_exempt",
                                targets
                              );
                              handleCustomReset(props);
                              setShowMultiShift(true);
                            }
                          }}
                        />
                        <Form.Check
                          className="px-0"
                          inline
                          label="No"
                          type="radio"
                          name="MultiShift"
                          id="hidemultishift"
                          checked={
                            values.multiple_shift_rate_exempt == "2"
                              ? true
                              : false
                          }
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "2";
                              props.setFieldValue(
                                "multiple_shift_rate_exempt",
                                targets
                              );
                              handleCustomReset(props);
                              setShowMultiShift(false);
                            }
                          }}
                        />
                      </Col>
                    </Col>
                    <Col lg={4}>
                      <span>Overtime Allowed</span>
                      <Col className="d-lg-flex">
                        <Form.Check
                          className="px-0"
                          inline
                          label="Yes"
                          checked={values.overtime_exempt == "1" ? true : false}
                          onInput={
                            values.overtime_exempt == "1"
                              ? setShowOverTime(true)
                              : setShowOverTime(false)
                          }
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "1";
                              props.setFieldValue("overtime_exempt", targets);
                              handleCustomReset(props);
                              setShowOverTime(true);
                            }
                          }}
                          name="otc"
                          type="radio"
                        />
                        <Form.Check
                          className="px-0"
                          inline
                          label="No"
                          name="otc"
                          type="radio"
                          checked={values.overtime_exempt == "2" ? true : false}
                          value={values.overtime_exempt || ""}
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "2";
                              props.setFieldValue("overtime_exempt", targets);
                              handleCustomReset(props);
                              setShowOverTime(false);
                            }
                          }}
                        />
                      </Col>
                    </Col>
                    <Col lg={4}>
                      <span>ADP Number</span>
                      <FormControl
                        onBlur={handleBlur}
                        type="number"
                        placeholder="ADP Number"
                        value={values.adp_number || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("adp_number", targets);
                        }}
                      />
                    </Col>
                  </Row>

                  <span className="common-search my-4">Pay Rate Details</span>
                  {showOverTime && !showMultiShift && (
                    <Row className="my-4">
                      <Col lg={4}>
                        <span>Overtime Calculation</span>
                        <Select
                          escapeClearsValue
                          isClearable
                          className="basic-typeahead"
                          id="ot"
                          placeholder="Select Overtime Calculation"
                          options={OTCalulation}
                          value={values.overtime_calculation || ""}
                          onChange={(event) => {
                            if (event) {
                              props.setFieldValue(
                                "overtime_calculation",
                                event.value
                              );
                            }
                          }}
                        />
                      </Col>
                      <Col lg={4}>
                        <span className="required">Overtime Percentage</span>
                        <FormControl
                          type="number"
                          placeholder="Overtime Percentage"
                          id="overtime_pay_percentage"
                          name="overtime_pay_percentage"
                          onBlur={handleBlur}
                          value={values.overtime_pay_percentage || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "overtime_pay_percentage",
                              targets
                            );
                          }}
                        />
                        {touched.overtime_pay_percentage &&
                          errors.overtime_pay_percentage && (
                            <div style={{ color: "red" }}>
                              {errors.overtime_pay_percentage}
                            </div>
                          )}
                      </Col>

                      <Col lg={4}>
                        <span className="required">Double-Time Percentage</span>
                        <FormControl
                          type="number"
                          placeholder="Double-Time Percentage"
                          id="double_time_pay_percentage"
                          name="double_time_pay_percentage"
                          onBlur={handleBlur}
                          value={values.double_time_pay_percentage || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "double_time_pay_percentage",
                              targets
                            );
                          }}
                        />
                        {touched.double_time_pay_percentage &&
                          errors.double_time_pay_percentage && (
                            <div style={{ color: "red" }}>
                              {errors.double_time_pay_percentage}
                            </div>
                          )}
                      </Col>
                    </Row>
                  )}
                  {showOverTime && showMultiShift && (
                    <Row className="my-4">
                      <Col lg={4}>
                        <span>Overtime Calculation</span>
                        <Select
                          escapeClearsValue
                          isClearable
                          className="basic-typeahead"
                          id="ot"
                          placeholder="Select Overtime Calculation"
                          options={OTCalulation}
                          value={values.overtime_calculation || ""}
                          onChange={(event) => {
                            if (event) {
                              props.setFieldValue(
                                "overtime_calculation",
                                event.value
                              );
                            }
                          }}
                        />
                      </Col>
                      <Col lg={4}>
                        <span className="required">Overtime Percentage</span>
                        <FormControl
                          type="number"
                          placeholder="Overtime Percentage"
                          id="overtime_pay_percentage1"
                          name="overtime_pay_percentage1"
                          onBlur={handleBlur}
                          value={values.overtime_pay_percentage || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "overtime_pay_percentage",
                              targets
                            );
                          }}
                        />
                        {touched.overtime_pay_percentage1 &&
                          errors.overtime_pay_percentage1 && (
                            <div style={{ color: "red" }}>
                              {errors.overtime_pay_percentage1}
                            </div>
                          )}
                      </Col>

                      <Col lg={4}>
                        <span className="required">Double-Time Percentage</span>
                        <FormControl
                          type="number"
                          placeholder="Double-Time Percentage"
                          id="double_time_pay_percentage1"
                          name="double_time_pay_percentage1"
                          onBlur={handleBlur}
                          value={values.double_time_pay_percentage || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "double_time_pay_percentage",
                              targets
                            );
                          }}
                        />
                        {touched.double_time_pay_percentage1 &&
                          errors.double_time_pay_percentage1 && (
                            <div style={{ color: "red" }}>
                              {errors.double_time_pay_percentage1}
                            </div>
                          )}
                      </Col>
                    </Row>
                  )}
                  {!showMultiShift && showOverTime && (
                    <Row className="my-4">
                      <Col lg={4}>
                        <span className="required">Regular Time</span>
                        <FormControl
                          type="number"
                          placeholder="Regular Time"
                          id="standard_time_pay_rate1"
                          name="standard_time_pay_rate1"
                          onBlur={handleBlur}
                          value={values.standard_time_pay_rate || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "standard_time_pay_rate",
                              targets
                            );
                          }}
                        />
                        {touched.standard_time_pay_rate1 &&
                          errors.standard_time_pay_rate1 && (
                            <div style={{ color: "red" }}>
                              {errors.standard_time_pay_rate1}
                            </div>
                          )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Overtime</span>
                        <FormControl
                          type="number"
                          placeholder="Overtime"
                          id="overtime_pay_rate"
                          name="overtime_pay_rate"
                          onBlur={handleBlur}
                          value={values.overtime_pay_rate || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("overtime_pay_rate", targets);
                          }}
                        />
                        {touched.overtime_pay_rate &&
                          errors.overtime_pay_rate && (
                            <div style={{ color: "red" }}>
                              {errors.overtime_pay_rate}
                            </div>
                          )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Double-Time</span>
                        <FormControl
                          type="number"
                          placeholder="Double-Time"
                          id="double_time_pay_rate"
                          name="double_time_pay_rate"
                          onBlur={handleBlur}
                          value={values.double_time_pay_rate || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "double_time_pay_rate",
                              targets
                            );
                          }}
                        />
                        {touched.double_time_pay_rate &&
                          errors.double_time_pay_rate && (
                            <div style={{ color: "red" }}>
                              {errors.double_time_pay_rate}
                            </div>
                          )}
                      </Col>
                    </Row>
                  )}
                  {showMultiShift && !showOverTime && (
                    <Row id="multishift" className="my-4">
                      <Col lg={4}>
                        <span className="required">Regular Time 1</span>
                        <FormControl
                          type="number"
                          placeholder="Regular Time 1"
                          id="RegulartimePay1"
                          name="RegulartimePay1"
                          onBlur={handleBlur}
                          value={values.st1 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("st1", targets);
                          }}
                        />
                        {touched.RegulartimePay1 && errors.RegulartimePay1 && (
                          <div style={{ color: "red" }}>
                            {errors.RegulartimePay1}
                          </div>
                        )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Regular Time 2</span>
                        <FormControl
                          type="number"
                          placeholder="Regular Time 2"
                          id="RegulartimePay2"
                          name="RegulartimePay2"
                          onBlur={handleBlur}
                          value={values.st2 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("st2", targets);
                          }}
                        />
                        {touched.RegulartimePay2 && errors.RegulartimePay2 && (
                          <div style={{ color: "red" }}>
                            {errors.RegulartimePay2}
                          </div>
                        )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Regular Time 3</span>
                        <FormControl
                          type="number"
                          placeholder="Regular Time 3"
                          id="RegulartimePay3"
                          name="RegulartimePay3"
                          onBlur={handleBlur}
                          value={values.st3 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("st3", targets);
                          }}
                        />
                        {touched.RegulartimePay3 && errors.RegulartimePay3 && (
                          <div style={{ color: "red" }}>
                            {errors.RegulartimePay3}
                          </div>
                        )}
                      </Col>
                    </Row>
                  )}
                  {showMultiShift && showOverTime && (
                    <Row className="my-4">
                      <Col lg={4}>
                        <span className="required">Regular Time 1</span>
                        <FormControl
                          type="number"
                          placeholder="Regular Time 1"
                          id="st1"
                          name="st1"
                          onBlur={handleBlur}
                          value={values.st1 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("st1", targets);
                          }}
                        />
                        {touched.st1 && errors.st1 && (
                          <div style={{ color: "red" }}>{errors.st1}</div>
                        )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Regular Time 2</span>
                        <FormControl
                          type="number"
                          placeholder="Regular Time 2"
                          id="st2"
                          name="st2"
                          onBlur={handleBlur}
                          value={values.st2 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("st2", targets);
                          }}
                        />
                        {touched.st2 && errors.st2 && (
                          <div style={{ color: "red" }}>{errors.st2}</div>
                        )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Regular Time 3</span>
                        <FormControl
                          type="number"
                          placeholder="Regular Time 3"
                          id="st3"
                          name="st3"
                          onBlur={handleBlur}
                          value={values.st3 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("st3", targets);
                          }}
                        />
                        {touched.st3 && errors.st3 && (
                          <div style={{ color: "red" }}>{errors.st3}</div>
                        )}
                      </Col>
                    </Row>
                  )}
                  {showOverTime && showMultiShift && (
                    <Row className="my-4">
                      <Col lg={4}>
                        <span className="required">Overtime 1</span>
                        <FormControl
                          type="number"
                          placeholder="Overtime 1"
                          id="OvertimePay1"
                          name="OvertimePay1"
                          onBlur={handleBlur}
                          value={values.ot1 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("ot1", targets);
                          }}
                        />
                        {touched.OvertimePay1 && errors.OvertimePay1 && (
                          <div style={{ color: "red" }}>
                            {errors.OvertimePay1}
                          </div>
                        )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Overtime 2</span>
                        <FormControl
                          type="number"
                          placeholder="Overtime 2"
                          id="OvertimePay2"
                          name="OvertimePay2"
                          onBlur={handleBlur}
                          value={values.ot2 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("ot2", targets);
                          }}
                        />
                        {touched.OvertimePay2 && errors.OvertimePay2 && (
                          <div style={{ color: "red" }}>
                            {errors.OvertimePay2}
                          </div>
                        )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Overtime 3</span>
                        <FormControl
                          type="number"
                          placeholder="Overtime 3"
                          id="OvertimePay3"
                          name="OvertimePay3"
                          onBlur={handleBlur}
                          value={values.ot3 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("ot3", targets);
                          }}
                        />
                        {touched.OvertimePay3 && errors.OvertimePay3 && (
                          <div style={{ color: "red" }}>
                            {errors.OvertimePay3}
                          </div>
                        )}
                      </Col>
                    </Row>
                  )}
                  {showOverTime && showMultiShift && (
                    <Row className="my-4">
                      <Col lg={4}>
                        <span className="required">Double-Time 1</span>
                        <FormControl
                          type="number"
                          placeholder="Double-Time 1"
                          id="DoubletimePay1"
                          name="DoubletimePay1"
                          onBlur={handleBlur}
                          value={values.dt1 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("dt1", targets);
                          }}
                        />
                        {touched.DoubletimePay1 && errors.DoubletimePay1 && (
                          <div style={{ color: "red" }}>
                            {errors.DoubletimePay1}
                          </div>
                        )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Double-Time 2</span>
                        <FormControl
                          type="number"
                          placeholder="Double-Time 2"
                          id="DoubletimePay2"
                          name="DoubletimePay2"
                          onBlur={handleBlur}
                          value={values.dt2 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("dt2", targets);
                          }}
                        />
                        {touched.DoubletimePay2 && errors.DoubletimePay2 && (
                          <div style={{ color: "red" }}>
                            {errors.DoubletimePay2}
                          </div>
                        )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Double-Time 3</span>
                        <FormControl
                          type="number"
                          placeholder="Double-Time 3"
                          id="DoubletimePay3"
                          name="DoubletimePay3"
                          onBlur={handleBlur}
                          value={values.dt3 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("dt3", targets);
                          }}
                        />
                        {touched.DoubletimePay3 && errors.DoubletimePay3 && (
                          <div style={{ color: "red" }}>
                            {errors.DoubletimePay3}
                          </div>
                        )}
                      </Col>
                    </Row>
                  )}

                  <Row className="my-4">
                    {!showMultiShift && !showOverTime && (
                      <Col lg>
                        {" "}
                        <span className="required">Regular Time</span>
                        <FormControl
                          type="number"
                          placeholder="Regular Time"
                          id="standard_time_pay_rate"
                          name="standard_time_pay_rate"
                          onBlur={handleBlur}
                          value={values.standard_time_pay_rate || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "standard_time_pay_rate",
                              targets
                            );
                          }}
                        />
                        {touched.standard_time_pay_rate &&
                          errors.standard_time_pay_rate && (
                            <div style={{ color: "red" }}>
                              {errors.standard_time_pay_rate}
                            </div>
                          )}
                      </Col>
                    )}

                    <Col lg>
                      <span className="required">Pay Frequency</span>
                      <Select
                        classNamePrefix="Select"
                        className="form-control col-lg mr-2 px-0 py-0"
                        id="basic-typeahead"
                        placeholder="Select Pay Frequency"
                        options={PayFrequency}
                        onBlur={(e) => setFieldTouched("pay_frequency", true)}
                        value={
                          PayFrequency &&
                          PayFrequency.filter(
                            ({ value }) => value == values.pay_frequency || ""
                          )
                        }
                        onChange={(event) => {
                          if (event) {
                            props.setFieldValue("pay_frequency", event.value);
                          }
                        }}
                      />
                      {touched.pay_frequency && errors.pay_frequency && (
                        <div style={{ color: "red" }}>
                          {errors.pay_frequency}
                        </div>
                      )}
                    </Col>
                  </Row>

                  <span className="common-search">Bill Rate Details</span>
                  {showOverTime && !showMultiShift && (
                    <Row className="my-4">
                      <Col lg>
                        <span className="required">Overtime Percentage</span>
                        <FormControl
                          type="number"
                          placeholder="Overtime Percentage"
                          id="overtime_bill_percentage"
                          name="overtime_bill_percentage"
                          onBlur={handleBlur}
                          value={values.overtime_bill_percentage || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "overtime_bill_percentage",
                              targets
                            );
                          }}
                        />
                        {touched.overtime_bill_percentage &&
                          errors.overtime_bill_percentage && (
                            <div style={{ color: "red" }}>
                              {errors.overtime_bill_percentage}
                            </div>
                          )}
                      </Col>

                      <Col lg>
                        <span className="required">Double-Time Percentage</span>
                        <FormControl
                          type="number"
                          placeholder="Double-Time Percentage"
                          id="double_time_bill_percentage"
                          name="double_time_bill_percentage"
                          onBlur={handleBlur}
                          value={values.double_time_bill_percentage || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "double_time_bill_percentage",
                              targets
                            );
                          }}
                        />
                        {touched.double_time_bill_percentage &&
                          errors.double_time_bill_percentage && (
                            <div style={{ color: "red" }}>
                              {errors.double_time_bill_percentage}
                            </div>
                          )}
                      </Col>
                    </Row>
                  )}
                  {showOverTime && showMultiShift && (
                    <Row className="my-4">
                      <Col lg>
                        <span className="required">Overtime Percentage</span>
                        <FormControl
                          type="number"
                          placeholder="Overtime Percentage"
                          id="overtime_bill_percentage1"
                          name="overtime_bill_percentage1"
                          onBlur={handleBlur}
                          value={values.overtime_bill_percentage || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "overtime_bill_percentage",
                              targets
                            );
                          }}
                        />
                        {touched.overtime_bill_percentage1 &&
                          errors.overtime_bill_percentage1 && (
                            <div style={{ color: "red" }}>
                              {errors.overtime_bill_percentage1}
                            </div>
                          )}
                      </Col>

                      <Col lg>
                        <span className="required">Double-Time Percentage</span>
                        <FormControl
                          type="number"
                          placeholder="Double-Time Percentage"
                          id="double_time_bill_percentage1"
                          name="double_time_bill_percentage1"
                          onBlur={handleBlur}
                          value={values.double_time_bill_percentage || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "double_time_bill_percentage",
                              targets
                            );
                          }}
                        />
                        {touched.double_time_bill_percentage1 &&
                          errors.double_time_bill_percentage1 && (
                            <div style={{ color: "red" }}>
                              {errors.double_time_bill_percentage1}
                            </div>
                          )}
                      </Col>
                    </Row>
                  )}
                  {!showMultiShift && showOverTime && (
                    <Row className="my-4">
                      <Col lg={4}>
                        <span className="required">Regular Time</span>
                        <FormControl
                          type="number"
                          placeholder="Regular Time"
                          id="standard_time_bill_rate1"
                          name="standard_time_bill_rate1"
                          onBlur={handleBlur}
                          value={values.standard_time_bill_rate || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "standard_time_bill_rate",
                              targets
                            );
                          }}
                        />
                        {touched.standard_time_bill_rate1 &&
                          errors.standard_time_bill_rate1 && (
                            <div style={{ color: "red" }}>
                              {errors.standard_time_bill_rate1}
                            </div>
                          )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Overtime</span>
                        <FormControl
                          type="number"
                          placeholder="Overtime"
                          id="overtime_bill_rate"
                          name="overtime_bill_rate"
                          onBlur={handleBlur}
                          value={values.overtime_bill_rate || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("overtime_bill_rate", targets);
                          }}
                        />
                        {touched.overtime_bill_rate &&
                          errors.overtime_bill_rate && (
                            <div style={{ color: "red" }}>
                              {errors.overtime_bill_rate}
                            </div>
                          )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Double-Time</span>
                        <FormControl
                          type="number"
                          placeholder="Double-Time"
                          id="double_time_bill_rate"
                          name="double_time_bill_rate"
                          onBlur={handleBlur}
                          value={values.double_time_bill_rate || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "double_time_bill_rate",
                              targets
                            );
                          }}
                        />
                        {touched.double_time_bill_rate &&
                          errors.double_time_bill_rate && (
                            <div style={{ color: "red" }}>
                              {errors.double_time_bill_rate}
                            </div>
                          )}
                      </Col>
                    </Row>
                  )}
                  {showMultiShift && !showOverTime && (
                    <Row className="my-4">
                      <Col lg={4}>
                        <span className="required">Regular Time 1</span>
                        <FormControl
                          type="number"
                          placeholder="Regular Time 1"
                          id="RegulartimeBill1"
                          name="RegulartimeBill1"
                          onBlur={handleBlur}
                          value={values.stb1 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("stb1", targets);
                          }}
                        />
                        {touched.RegulartimeBill1 &&
                          errors.RegulartimeBill1 && (
                            <div style={{ color: "red" }}>
                              {errors.RegulartimeBill1}
                            </div>
                          )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Regular Time 2</span>
                        <FormControl
                          type="number"
                          placeholder="Regular Time 2"
                          id="RegulartimeBill2"
                          name="RegulartimeBill2"
                          onBlur={handleBlur}
                          value={values.stb2 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("stb2", targets);
                          }}
                        />
                        {touched.RegulartimeBill2 &&
                          errors.RegulartimeBill2 && (
                            <div style={{ color: "red" }}>
                              {errors.RegulartimeBill2}
                            </div>
                          )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Regular Time 3</span>
                        <FormControl
                          type="number"
                          placeholder="Regular Time 3"
                          id="RegulartimeBill3"
                          name="RegulartimeBill3"
                          onBlur={handleBlur}
                          value={values.stb3 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("stb3", targets);
                          }}
                        />
                        {touched.RegulartimeBill3 &&
                          errors.RegulartimeBill3 && (
                            <div style={{ color: "red" }}>
                              {errors.RegulartimeBill3}
                            </div>
                          )}
                      </Col>
                    </Row>
                  )}
                  {showMultiShift && showOverTime && (
                    <Row className="my-4">
                      <Col lg={4}>
                        <span className="required">Regular Time 1</span>
                        <FormControl
                          type="number"
                          placeholder="Regular Time 1"
                          id="stb1"
                          name="stb1"
                          onBlur={handleBlur}
                          value={values.stb1 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("stb1", targets);
                          }}
                        />
                        {touched.stb1 && errors.stb1 && (
                          <div style={{ color: "red" }}>{errors.stb1}</div>
                        )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Regular Time 2</span>
                        <FormControl
                          type="number"
                          placeholder="Regular Time 2"
                          id="stb2"
                          name="stb2"
                          onBlur={handleBlur}
                          value={values.stb2 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("stb2", targets);
                          }}
                        />
                        {touched.stb2 && errors.stb2 && (
                          <div style={{ color: "red" }}>{errors.stb2}</div>
                        )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Regular Time 3</span>
                        <FormControl
                          type="number"
                          placeholder="Regular Time 3"
                          id="stb3"
                          name="stb3"
                          onBlur={handleBlur}
                          value={values.stb3 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("stb3", targets);
                          }}
                        />
                        {touched.stb3 && errors.stb3 && (
                          <div style={{ color: "red" }}>{errors.stb3}</div>
                        )}
                      </Col>
                    </Row>
                  )}
                  {showOverTime && showMultiShift && (
                    <Row className="my-4">
                      <Col lg={4}>
                        <span className="required">Overtime 1</span>
                        <FormControl
                          type="number"
                          placeholder="Overtime 1"
                          id="OvertimeBill1"
                          name="OvertimeBill1"
                          onBlur={handleBlur}
                          value={values.otb1 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("otb1", targets);
                          }}
                        />
                        {touched.OvertimeBill1 && errors.OvertimeBill1 && (
                          <div style={{ color: "red" }}>
                            {errors.OvertimeBill1}
                          </div>
                        )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Overtime 2</span>
                        <FormControl
                          type="number"
                          placeholder="Overtime 2"
                          id="OvertimeBill2"
                          name="OvertimeBill2"
                          onBlur={handleBlur}
                          value={values.otb2 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("otb2", targets);
                          }}
                        />
                        {touched.OvertimeBill2 && errors.OvertimeBill2 && (
                          <div style={{ color: "red" }}>
                            {errors.OvertimeBill2}
                          </div>
                        )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Overtime 3</span>
                        <FormControl
                          type="number"
                          placeholder="Overtime 3"
                          id="OvertimeBill3"
                          name="OvertimeBill3"
                          onBlur={handleBlur}
                          value={values.otb3 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("otb3", targets);
                          }}
                        />
                        {touched.OvertimeBill3 && errors.OvertimeBill3 && (
                          <div style={{ color: "red" }}>
                            {errors.OvertimeBill3}
                          </div>
                        )}
                      </Col>
                    </Row>
                  )}
                  {showOverTime && showMultiShift && (
                    <Row className="my-4">
                      <Col lg={4}>
                        <span className="required">Double-Time 1</span>
                        <FormControl
                          type="number"
                          placeholder="Double-Time 1"
                          id="DoubletimeBill1"
                          name="DoubletimeBill1"
                          onBlur={handleBlur}
                          value={values.dtb1 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("dtb1", targets);
                          }}
                        />
                        {touched.DoubletimeBill1 && errors.DoubletimeBill1 && (
                          <div style={{ color: "red" }}>
                            {errors.DoubletimeBill1}
                          </div>
                        )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Double-Time 2</span>
                        <FormControl
                          type="number"
                          placeholder="Double-Time 2"
                          id="DoubletimeBill2"
                          name="DoubletimeBill2"
                          onBlur={handleBlur}
                          value={values.dtb2 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("dtb2", targets);
                          }}
                        />
                        {touched.DoubletimeBill2 && errors.DoubletimeBill2 && (
                          <div style={{ color: "red" }}>
                            {errors.DoubletimeBill2}
                          </div>
                        )}
                      </Col>
                      <Col lg={4}>
                        <span className="required">Double-Time 3</span>
                        <FormControl
                          type="number"
                          placeholder="Double-Time 3"
                          id="DoubletimeBill3"
                          name="DoubletimeBill3"
                          onBlur={handleBlur}
                          value={values.dtb3 || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("dtb3", targets);
                          }}
                        />
                        {touched.DoubletimeBill3 && errors.DoubletimeBill3 && (
                          <div style={{ color: "red" }}>
                            {errors.DoubletimeBill3}
                          </div>
                        )}
                      </Col>
                    </Row>
                  )}
                  <Row className="my-4">
                    {!showMultiShift && !showOverTime && (
                      <Col lg={4}>
                        {" "}
                        <span className="required">Regular Time</span>
                        <FormControl
                          type="number"
                          placeholder="Regular Time"
                          id="standard_time_bill_rate"
                          name="standard_time_bill_rate"
                          onBlur={handleBlur}
                          value={values.standard_time_bill_rate || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "standard_time_bill_rate",
                              targets
                            );
                          }}
                        />
                        {touched.standard_time_bill_rate &&
                          errors.standard_time_bill_rate && (
                            <div style={{ color: "red" }}>
                              {errors.standard_time_bill_rate}
                            </div>
                          )}
                      </Col>
                    )}

                    <Col lg={4}>
                      {" "}
                      <span>Billing Frequency</span>
                      <Select
                        classNamePrefix="Select"
                        className="form-control col-lg mr-2 px-0 py-0"
                        id="basic-typeahead"
                        placeholder="Select Billing Frequency"
                        options={BillFrequency}
                        value={
                          BillFrequency &&
                          BillFrequency.filter(
                            ({ value }) =>
                              value == values.billing_frequency || ""
                          )
                        }
                        onChange={(event) => {
                          if (event) {
                            props.setFieldValue(
                              "billing_frequency",
                              event.value
                            );
                          }
                        }}
                      />
                    </Col>

                    <Col lg={4}>
                      <span>MSP Fees Percentage</span>
                      <FormControl
                        onBlur={handleBlur}
                        type="number"
                        placeholder="MSP Fees %"
                        value={values.msp_fee_percentage || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("msp_fee_percentage", targets);
                        }}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Form.Row>

              {/* FOURTH FORM ROW */}
              <Form.Row className={"formRow"}>
                <Form.Group className="inner bg-white my-4 px-4 py-4 mx-4 rounded shadow font">
                  <span className={"common-search"}>Benefits</span>
                  <Row className="my-4">
                    <Col lg={4}>
                      <span>Sick Hours Allowed</span>
                      <Col className="d-lg-flex">
                        <Form.Check
                          className="px-0"
                          inline
                          label="Yes"
                          name="sickhours"
                          id="showsickhours"
                          type="radio"
                          checked={
                            values.sick_hours_exempt == "1" ? true : false
                          }
                          onInput={
                            values.sick_hours_exempt == "1"
                              ? setShowSickHours(true)
                              : setShowSickHours(false)
                          }
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "1";
                              props.setFieldValue("sick_hours_exempt", targets);
                              setShowSickHours(true);
                            }
                          }}
                        />
                        <Form.Check
                          className="px-0"
                          inline
                          label="No"
                          name="sickhours"
                          id="hidesickhours"
                          type="radio"
                          checked={
                            values.sick_hours_exempt == "2" ? true : false
                          }
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "2";
                              props.setFieldValue("sick_hours_exempt", targets);
                              setShowSickHours(false);
                            }
                          }}
                        />
                      </Col>
                    </Col>
                    <Col lg={4}>
                      <span>PTO Hours Allowed</span>
                      <Col className="d-lg-flex">
                        <Form.Check
                          className="px-0"
                          inline
                          label="Yes"
                          id="showPTOhours"
                          name="PTOhours"
                          type="radio"
                          checked={
                            values.pto_hours_exempt == "1" ? true : false
                          }
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "1";
                              props.setFieldValue("pto_hours_exempt", targets);
                              setShowPTOHours(true);
                            }
                          }}
                          onInput={
                            values.pto_hours_exempt == "1"
                              ? setShowPTOHours(true)
                              : setShowPTOHours(false)
                          }
                        />
                        <Form.Check
                          className="px-0"
                          inline
                          label="No"
                          id="hidePTOhours"
                          name="PTOhours"
                          type="radio"
                          checked={
                            values.pto_hours_exempt == "2" ? true : false
                          }
                          value={values.pto_hours_exempt || ""}
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "2";
                              props.setFieldValue("pto_hours_exempt", targets);
                              setShowPTOHours(false);
                            }
                          }}
                        />
                      </Col>
                    </Col>

                    <Col lg={4}>
                      <span>Holiday Hours Allowed</span>
                      <Col className="d-lg-flex">
                        <Form.Check
                          className="px-0"
                          inline
                          label="Yes"
                          name="Holidayhours"
                          type="radio"
                          id="showholidayhours"
                          checked={
                            values.holiday_hours_exempt == "1" ? true : false
                          }
                          onInput={
                            values.holiday_hours_exempt == "1"
                              ? setShowHolidayHours(true)
                              : setShowHolidayHours(false)
                          }
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "1";
                              props.setFieldValue(
                                "holiday_hours_exempt",
                                targets
                              );
                              setShowHolidayHours(true);
                            }
                          }}
                        />
                        <Form.Check
                          className="px-0"
                          inline
                          label="No"
                          name="Holidayhours"
                          type="radio"
                          id="hideholidayhours"
                          checked={
                            values.holiday_hours_exempt == "2" ? true : false
                          }
                          value={values.holiday_hours_exempt || ""}
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "2";
                              props.setFieldValue(
                                "holiday_hours_exempt",
                                targets
                              );
                              setShowHolidayHours(false);
                            }
                          }}
                        />
                      </Col>
                    </Col>
                  </Row>
                  <Row className="my-4">
                    <Col lg={4}>
                      {showSickhours && <span>Total Sick Hours</span>}
                      {showSickhours && (
                        <FormControl
                          id="sickhours"
                          type="number"
                          placeholder="Total Sick Hours"
                          onChange={(event) => {
                            if (event.target.checked) setShowStateTax(false);
                            const targets = event.target.value;
                            props.setFieldValue("total_sick_hours", targets);
                          }}
                          value={values.total_sick_hours || ""}
                        />
                      )}
                    </Col>

                    <Col id="PTOhours" lg={4}>
                      {showPTOhours && (
                        <span className="required">PTO Type</span>
                      )}
                      {showPTOhours && (
                        <>
                          <Select
                            escapeClearsValue
                            isClearable
                            id="basic-typeahead"
                            placeholder="Select PTO Type"
                            options={PTOtype}
                            onBlur={(e) => setFieldTouched("pto_type", true)}
                            value={
                              PTOtype &&
                              PTOtype.filter(
                                ({ value }) => value == values.pto_type || ""
                              )
                            }
                            onChange={(event) => {
                              if (event && event.label === "Accrual") {
                                setShowPTOPerHour(true);
                              } else {
                                setShowPTOPerHour(false);
                              }
                              if (event) {
                                props.setFieldValue("pto_type", event.value);
                              }
                            }}
                          />
                          {touched.pto_type && errors.pto_type && (
                            <div style={{ color: "red" }}>
                              {errors.pto_type}
                            </div>
                          )}
                        </>
                      )}
                      {showPTOhours && (
                        <Col className="mt-2">
                          <span className="required">Total PTO Hours</span>
                        </Col>
                      )}
                      {showPTOhours && (
                        <>
                          <FormControl
                            type="number"
                            placeholder="Total PTO Hours"
                            name="total_pto_hours"
                            id="total_pto_hours"
                            onBlur={handleBlur}
                            value={values.total_pto_hours || ""}
                            onChange={(event) => {
                              if (event.target.value) setShowPTOHours(true);
                              const targets = event.target.value;
                              props.setFieldValue("total_pto_hours", targets);
                            }}
                          />
                          {touched.total_pto_hours &&
                            errors.total_pto_hours && (
                              <div style={{ color: "red" }}>
                                {errors.total_pto_hours}
                              </div>
                            )}
                        </>
                      )}
                      {showPTOhours && showPTOPerHour && (
                        <Col className="mt-2">
                          <span className="required">Total Per Every Hour</span>
                        </Col>
                      )}
                      {showPTOhours && showPTOPerHour && (
                        <FormControl
                          type="number"
                          placeholder="Total Per Every Hour"
                          value={values.pto_per_every_hours || ""}
                          onChange={(event) => {
                            if (event.target.value) setShowPTOHours(true);
                            setShowPTOPerHour(true);
                            const targets = event.target.value;
                            props.setFieldValue("pto_per_every_hours", targets);
                          }}
                        />
                      )}
                    </Col>

                    <Col lg={4} id="holidayhours">
                      {showHolidayhours && <span>Total Holiday Hours</span>}
                      {showHolidayhours && (
                        <FormControl
                          type="number"
                          placeholder="Total Holiday Hours"
                          value={values.total_holiday_hours}
                          onChange={(event) => {
                            if (event.target.checked)
                              setShowHolidayHours(false);
                            const targets = event.target.value;
                            props.setFieldValue("total_holiday_hours", targets);
                          }}
                        />
                      )}
                    </Col>
                  </Row>
                  <span className={"common-search my-4"}>Medical Details</span>
                  <Row className="my-4">
                    <Col lg={4}>
                      <span>Has Medical Deductions</span>
                      <Col className="d-lg-flex">
                        <Form.Check
                          className="px-0"
                          inline
                          label="Yes"
                          name="MedDetails"
                          type="radio"
                          id="showMedDetails"
                          checked={
                            values.has_medical_deduction == "1" ? true : false
                          }
                          onInput={
                            values.has_medical_deduction == "1"
                              ? setShowMedicalType(true)
                              : setShowMedicalType(false)
                          }
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "1";
                              props.setFieldValue(
                                "has_medical_deduction",
                                targets
                              );
                              setShowMedicalType(true);
                            }
                          }}
                        />
                        <Form.Check
                          className="px-0"
                          inline
                          label="No"
                          name="MedDetails"
                          type="radio"
                          id="hideMedDetails"
                          checked={
                            values.has_medical_deduction == "2" ? true : false
                          }
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "2";
                              props.setFieldValue(
                                "has_medical_deduction",
                                targets
                              );
                              setShowMedicalType(false);
                            }
                          }}
                        />
                      </Col>
                    </Col>
                  </Row>

                  <Col className="text-right mr-5 my-3">
                    <Button
                      className="btn-lg px-2 mr-2 mb-3 search-input-icon"
                      onClick={handleShow}
                    >
                      Federal Holiday List
                    </Button>
                  </Col>
                </Form.Group>
              </Form.Row>

              {/* FOURTH-II FORM ROW */}
              <Form.Row className={"formRow"}>
                {showMedicalType && (
                  <Form.Group
                    id="MedDetails"
                    className="inner bg-white my-4 px-4 py-4 mx-4 rounded shadow font"
                    onChange={(event) => {
                      if (event.target.value) setShowMedicalType(true);
                    }}
                  >
                    <span className={"common-search"}>Medical Type</span>
                    <Row>
                      <Col lg>
                        <span>Start Date</span>
                      </Col>
                      <Col lg>
                        <span>End Date</span>
                      </Col>

                      <Col lg>
                        <span>Special Comments</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <FormControl
                          type="date"
                          placeholder="Start Date"
                          value={values.medical_start_date || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("medical_start_date", targets);
                          }}
                        />
                      </Col>
                      <Col lg={4}>
                        <FormControl
                          type="date"
                          placeholder="End Date"
                          value={values.medical_end_date || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("medical_end_date", targets);
                          }}
                        />
                      </Col>
                      <Col lg={4}>
                        <FormControl
                          as="textarea"
                          type="text"
                          placeholder="Special Comments"
                          value={values.medical_comments || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("medical_comments", targets);
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="my-4">
                      <Col lg={4}>
                        <span>Has Kaiser</span>
                        <Col className="d-lg-flex">
                          <Form.Check
                            className="px-0"
                            inline
                            label="Yes"
                            id="showkaiser"
                            type="radio"
                            name="kaiser"
                            value={values.has_kaiser || ""}
                            onChange={(event) => {
                              if (event.target.checked) {
                                const targets = "1";
                                props.setFieldValue("has_kaiser", targets);
                                setShowKaiser(true);
                              }
                            }}
                          />
                          <Form.Check
                            className="px-0"
                            inline
                            label="No"
                            id="hidekaiser"
                            type="radio"
                            name="kaiser"
                            value={values.has_kaiser || ""}
                            onChange={(event) => {
                              if (event.target.checked) {
                                const targets = "2";
                                props.setFieldValue("has_kaiser", targets);
                                setShowKaiser(false);
                              }
                            }}
                          />
                        </Col>
                      </Col>
                      <Col lg={4}>
                        <span>Has UHC</span>
                        <Col className="d-lg-flex">
                          <Form.Check
                            className="px-0"
                            inline
                            label="Yes"
                            id="showuhc"
                            type="radio"
                            name="uhc"
                            value={values.has_uhc || ""}
                            onChange={(event) => {
                              if (event.target.checked) {
                                const targets = "1";
                                props.setFieldValue("has_uhc", targets);
                                setShowUHC(true);
                              }
                            }}
                          />
                          <Form.Check
                            className="px-0"
                            inline
                            label="No"
                            id="hideuhc"
                            type="radio"
                            name="uhc"
                            value={values.has_uhc || ""}
                            onChange={(event) => {
                              if (event.target.checked) {
                                const targets = "2";
                                props.setFieldValue("has_uhc", targets);
                                setShowUHC(false);
                              }
                            }}
                          />
                        </Col>
                      </Col>

                      <Col lg={4}>
                        <span>Has Co-Power</span>
                        <Col className="d-lg-flex">
                          <Form.Check
                            className="px-0"
                            inline
                            label="Yes"
                            id="showcopower"
                            type="radio"
                            name="copower"
                            value={values.has_co_power}
                            onChange={(event) => {
                              if (event.target.checked) {
                                const targets = "1";
                                props.setFieldValue("has_co_power", targets);
                                setShowCoPower(true);
                              }
                            }}
                          />
                          <Form.Check
                            className="px-0"
                            inline
                            label="No"
                            id="hidecopower"
                            type="radio"
                            name="copower"
                            value={values.has_co_power}
                            onChange={(event) => {
                              if (event.target.checked) {
                                const targets = "2";
                                props.setFieldValue("has_co_power", targets);
                                setShowCoPower(false);
                              }
                            }}
                          />
                        </Col>
                      </Col>
                    </Row>
                    <Row className="my-4">
                      <Col lg={4}>
                        {showKaiser && <span>Kaiser</span>}
                        {showKaiser && (
                          <FormControl
                            type="number"
                            placeholder="Kaiser"
                            id="kaiser"
                            value={values.kaiser || ""}
                            onChange={(event) => {
                              if (event.target.value) setShowKaiser(true);
                              const targets = event.target.value;
                              props.setFieldValue("kaiser", targets);
                            }}
                          />
                        )}
                      </Col>

                      <Col lg={4}>
                        {showUHC && <span>UHC</span>}
                        {showUHC && (
                          <FormControl
                            type="number"
                            placeholder="UHC"
                            id="uhc"
                            value={values.uhc || ""}
                            onChange={(event) => {
                              if (event.target.value) setShowUHC(true);
                              const targets = event.target.value;
                              props.setFieldValue("uhc", targets);
                            }}
                          />
                        )}
                      </Col>

                      <Col lg={4}>
                        {showCoPower && <span>Co-Power</span>}
                        {showCoPower && (
                          <FormControl
                            type="number"
                            placeholder="Co-Power"
                            id="copower"
                            value={values.co_power || ""}
                            onChange={(event) => {
                              if (event.target.value) setShowCoPower(true);
                              const targets = event.target.value;
                              props.setFieldValue("co_power", targets);
                            }}
                          />
                        )}
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col lg>
                        <span>Total Medical Monthly</span>
                      </Col>
                      <Col lg>
                        <span>Employer Contribution</span>
                      </Col>

                      <Col lg>
                        <span>Employee Contribution</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <FormControl
                          type="number"
                          placeholder="Total Medical Monthly"
                          value={values.total_medical || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue("total_medical", targets);
                          }}
                        />
                      </Col>
                      <Col lg={4}>
                        <FormControl
                          type="number"
                          placeholder="Employer Contribution"
                          value={values.employer_contribution || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "employer_contribution",
                              targets
                            );
                          }}
                        />
                      </Col>
                      <Col lg={4}>
                        <FormControl
                          type="number"
                          placeholder="Employee Contribution"
                          value={values.employee_contribution || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "employee_contribution",
                              targets
                            );
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="my-4">
                      <Col lg>
                        <span>Final Medical Deduction</span>
                        <FormControl
                          type="number"
                          placeholder="Final Medical Deduction"
                          value={values.final_medical_deduction || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "final_medical_deduction",
                              targets
                            );
                          }}
                        />
                      </Col>
                      <Col lg>
                        <span>Per Pay Cycle Deduction</span>
                        <FormControl
                          type="number"
                          placeholder="Per Pay Cycle Deduction"
                          value={values.per_payroll_deduction || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "per_payroll_deduction",
                              targets
                            );
                          }}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                )}
              </Form.Row>

              {/* FIFTH FORM ROW */}
              <Form.Row className={"formRow"}>
                <Form.Group className="inner bg-white my-4 px-4 py-4 mx-4 rounded shadow font">
                  <span className={"common-search"}>Federal Taxes</span>
                  <Row>
                    <Col lg>
                      <span className="required">Employee Name</span>
                    </Col>
                    <Col lg>
                      <span className="required">Start Date</span>
                    </Col>

                    <Col lg>
                      <span className="required">Visa Status</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="text"
                        placeholder="Employee Name"
                        id="tax_employee_name"
                        name="tax_employee_name"
                        value={values.tax_employee_name || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("tax_employee_name", targets);
                        }}
                      />
                      {touched.tax_employee_name &&
                        errors.tax_employee_name && (
                          <div style={{ color: "red" }}>
                            {errors.tax_employee_name}
                          </div>
                        )}
                    </Col>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="date"
                        placeholder="Start Date"
                        id="tax_start_date"
                        name="tax_start_date"
                        value={values.tax_start_date || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("tax_start_date", targets);
                        }}
                      />
                      {touched.tax_start_date && errors.tax_start_date && (
                        <div style={{ color: "red" }}>
                          {errors.tax_start_date}
                        </div>
                      )}
                    </Col>

                    <Col lg={4}>
                      <Select
                        classNamePrefix="Select"
                        className="form-control col-lg mr-2 px-0 py-0"
                        id="basic-typeahead"
                        placeholder="Select Visa Status"
                        options={visadetails}
                        onBlur={(e) => setFieldTouched("tax_visa_status", true)}
                        getOptionLabel={({ label }) => label}
                        getOptionValue={({ value }) => value}
                        value={
                          visadetails &&
                          visadetails.filter(
                            ({ value }) =>
                              value === values.tax_visa_status || ""
                          )
                        }
                        onChange={(event) => {
                          props.setFieldValue(
                            "tax_visa_status",
                            event && event.value
                          );
                        }}
                      />
                      {touched.tax_visa_status && errors.tax_visa_status && (
                        <div style={{ color: "red" }}>
                          {errors.tax_visa_status}
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg>
                      <span className="required">Work Location</span>
                    </Col>
                    <Col lg>
                      <span className="required">City</span>
                    </Col>

                    <Col lg>
                      <span className="required">State</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="text"
                        placeholder="Work Location"
                        id="tax_location"
                        name="tax_location"
                        value={values.tax_location || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("tax_location", targets);
                        }}
                      />
                      {touched.tax_location && errors.tax_location && (
                        <div style={{ color: "red" }}>
                          {errors.tax_location}
                        </div>
                      )}
                    </Col>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="text"
                        placeholder="City"
                        id="tax_city"
                        name="tax_city"
                        value={values.tax_city || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("tax_city", targets);
                        }}
                      />
                      {touched.tax_city && errors.tax_city && (
                        <div style={{ color: "red" }}>{errors.tax_city}</div>
                      )}
                    </Col>

                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="text"
                        placeholder="State"
                        id="tax_state"
                        name="tax_state"
                        value={values.tax_state || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("tax_state", targets);
                        }}
                      />
                      {touched.tax_state && errors.tax_state && (
                        <div style={{ color: "red" }}>{errors.tax_state}</div>
                      )}
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg>
                      <span className="required">Zip Code</span>
                    </Col>
                    <Col lg>
                      <span></span>
                    </Col>

                    <Col lg>
                      <span></span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <FormControl
                        onBlur={handleBlur}
                        type="number"
                        placeholder="Zip Code"
                        id="tax_zip"
                        name="tax_zip"
                        value={values.tax_zip || ""}
                        onChange={(event) => {
                          const targets = event.target.value;
                          props.setFieldValue("tax_zip", targets);
                        }}
                      />
                      {touched.tax_zip && errors.tax_zip && (
                        <div style={{ color: "red" }}>{errors.tax_zip}</div>
                      )}
                    </Col>
                  </Row>
                  <Row className="my-4">
                    <Col lg={4}>
                      <span>Tax Exempt</span>
                      <Col className="d-lg-flex">
                        <Form.Check
                          className="px-0"
                          inline
                          label="Yes"
                          name="FedTax"
                          type="radio"
                          id="showfedtax"
                          checked={
                            values.federal_tax_exempt == "1" ? true : false
                          }
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "1";
                              props.setFieldValue(
                                "federal_tax_exempt",
                                targets
                              );
                              setShowFedTax(false);
                            }
                          }}
                        />
                        <Form.Check
                          className="px-0"
                          inline
                          label="No"
                          name="FedTax"
                          type="radio"
                          id="hidefedtax"
                          checked={
                            values.federal_tax_exempt == "2" ? true : false
                          }
                          value={values.federal_tax_exempt || ""}
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "2";
                              props.setFieldValue(
                                "federal_tax_exempt",
                                targets
                              );
                              setShowFedTax(true);
                            }
                          }}
                        />
                      </Col>
                    </Col>
                    <Col lg={5}>
                      <span className="required">Tax Status</span>
                      <Col className="d-lg-flex">
                        <Form.Check
                          className="px-0"
                          inline
                          label="Single"
                          name="tax_status"
                          type="radio"
                          checked={values.tax_status == "1" ? true : false}
                          value={values.tax_status || ""}
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "1";
                              props.setFieldValue("tax_status", targets);
                            }
                          }}
                        />
                        <Form.Check
                          className="px-0"
                          inline
                          label="Married"
                          name="tax_status"
                          type="radio"
                          value={values.tax_status || ""}
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "2";
                              props.setFieldValue("tax_status", targets);
                            }
                          }}
                        />
                        <Form.Check
                          className="px-0"
                          inline
                          label="Married, but Withold at Higher Single Rate"
                          name="tax_status"
                          type="radio"
                          value={values.tax_status || ""}
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "3";
                              props.setFieldValue("tax_status", targets);
                            }
                          }}
                        />
                      </Col>
                      {touched.tax_status && errors.tax_status && (
                        <div style={{ color: "red" }}>{errors.tax_status}</div>
                      )}
                    </Col>
                  </Row>
                  {(showFedTax || values.federal_tax_exempt == "2") && (
                    <Row
                      id="fedtax"
                      className="my-4"
                      onChange={(event) => {
                        if (event.target.value) setShowFedTax(true);
                      }}
                    >
                      <Col lg>
                        <span>No. of Allowances</span>
                        <FormControl
                          type="number"
                          placeholder="No. of Allowances"
                          id="federal_no_of_allowances"
                          name="federal_no_of_allowances"
                          value={values.federal_no_of_allowances || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "federal_no_of_allowances",
                              targets
                            );
                          }}
                        />
                        {/* {touched.federal_no_of_allowances &&
                          errors.federal_no_of_allowances && (
                            <div style={{ color: "red" }}>
                              {errors.federal_no_of_allowances}
                            </div>
                          )} */}
                      </Col>

                      <Col lg>
                        <span>Additional Amount</span>
                        <FormControl
                          type="number"
                          placeholder="Additional Amount"
                          id="federal_additional_amount"
                          name="federal_additional_amount"
                          onBlur={handleBlur}
                          value={values.federal_additional_amount || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "federal_additional_amount",
                              targets
                            );
                          }}
                        />
                        {/* {touched.federal_additional_amount &&
                          errors.federal_additional_amount && (
                            <div style={{ color: "red" }}>
                              {errors.federal_additional_amount}
                            </div>
                          )} */}
                      </Col>
                    </Row>
                  )}
                </Form.Group>
              </Form.Row>

              {/* SIXTH FORM ROW */}
              <Form.Row className={"formRow"}>
                <Form.Group className="inner bg-white my-4 px-4 py-4 mx-4 rounded shadow font">
                  <span className={"common-search"}>State Taxes</span>
                  <Row className="my-4">
                    <Col lg={4}>
                      <span>Tax Exempt</span>
                      <Col className="d-lg-flex">
                        <Form.Check
                          className="px-0"
                          inline
                          label="Yes"
                          name="StateTax"
                          type="radio"
                          id="hidestatetax"
                          checked={
                            values.state_tax_exempt == "1" ? true : false
                          }
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "1";
                              props.setFieldValue("state_tax_exempt", targets);
                              setShowStateTax(false);
                            }
                          }}
                        />
                        <Form.Check
                          className="px-0"
                          inline
                          label="No"
                          name="StateTax"
                          type="radio"
                          id="showstatetax"
                          checked={
                            values.state_tax_exempt == "2" ? true : false
                          }
                          value={values.state_tax_exempt || ""}
                          onChange={(event) => {
                            if (event.target.checked) {
                              const targets = "2";
                              props.setFieldValue("state_tax_exempt", targets);
                              setShowStateTax(true);
                            }
                          }}
                        />
                      </Col>
                    </Col>
                  </Row>
                  {(showStateTax || values.state_tax_exempt == "2") && (
                    <Row
                      id="statetax"
                      className="my-4"
                      onChange={(event) => {
                        if (event.target.value) setShowStateTax(true);
                      }}
                    >
                      <Col lg>
                        <span>No. of Allowances</span>
                        <FormControl
                          type="number"
                          placeholder="No. of Allowances"
                          id="state_no_of_allowances"
                          name="state_no_of_allowances"
                          onBlur={handleBlur}
                          value={values.state_no_of_allowances || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "state_no_of_allowances",
                              targets
                            );
                          }}
                        />
                        {/* {touched.state_no_of_allowances &&
                          errors.state_no_of_allowances && (
                            <div style={{ color: "red" }}>
                              {errors.state_no_of_allowances}
                            </div>
                          )} */}
                      </Col>

                      <Col lg>
                        <span>Additional Amount</span>
                        <FormControl
                          type="number"
                          placeholder="Additional Amount"
                          id="state_additional_amount"
                          name="state_additional_amount"
                          onBlur={handleBlur}
                          value={values.state_additional_amount || ""}
                          onChange={(event) => {
                            const targets = event.target.value;
                            props.setFieldValue(
                              "state_additional_amount",
                              targets
                            );
                          }}
                        />
                        {/* {touched.state_additional_amount &&
                          errors.state_additional_amount && (
                            <div style={{ color: "red" }}>
                              {errors.state_additional_amount}
                            </div>
                          )} */}
                      </Col>
                    </Row>
                  )}
                </Form.Group>
              </Form.Row>

              {/* END BUTTONS */}
              <Form.Group className="text-right mr-3">
                <Button
                  className="btn btn-primary btn-lg px-3 mr-2 mb-3 search-input-icon"
                  variant="primary"
                  type="submit"
                  disabled={submitting || !dirty || !isValid}
                >
                  {!submitting ? "Save" : "Saving..."}
                </Button>
                <Button
                  className="btn btn-secondary btn-lg px-3 mr-2 mb-3 search-input-icon"
                  variant="secondary"
                  type="button"
                  onClick={() => window.history.go(-1)}
                >
                  Cancel
                </Button>
              </Form.Group>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default EmployeeForm;
