/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number   Developer         Description
 * ------------------------------------------------------------------
 * 05-Oct-2020    -                     Abhishek Datar    Created
 * 29-Oct-2020    GPM_API_STABLE        Esha Joshi        calculator api integration
 * 01-Nov-2020    master                Abhishek Datar    Fix in API for incentive calculator
 *                                                        File rename from GPM.js to IncentiveCalculator.js
 *                                                        function name change from GPM to IncentiveCalculator
 *
 *
 *
 *********************************************************************/

import React from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { ClientDropdown, Calculate } from "../../../Services/homeServices";
import LoadingModal from "../../Common/LoadingModal";
//import AlertModal from "../../Common/AlertModal";
import { useUsers } from "../../../Services/usersService";

const IncentiveCalculator = (props) => {
  const [payRate, setPayRate] = React.useState("");
  const [billRate, setBillRate] = React.useState("");
  const [clients, setClients] = React.useState("");
  const [empType, setEmpType] = React.useState("");
  const [calcdata, setCalcData] = React.useState({});
  const [clientOptions, setClientOptions] = React.useState([]);
  const [openLoading, setOpenLoading] = React.useState(false);
  const [spinnerLoading, setSpinnerLoading] = React.useState(false);
  const [alertLoading, setAlertLoading] = React.useState(false);
  const { currentUser } = useUsers();
  const { permissions } = currentUser;

  const loaderTrigger = () => {
    setOpenLoading(!openLoading);
    setSpinnerLoading(!spinnerLoading);
  };

  React.useEffect(() => {
    ClientDropdown(setClientOptions);
  }, []);

  const updatePayrate = (e) => {
    e.preventDefault();
    setPayRate(/^-?[0-9]+$/.test(e.target.value) ? e.target.value : "");
  };
  const updateBillrate = (e) => {
    e.preventDefault();
    console.log(e.target.value, e.target);
    setBillRate(/^-?[0-9]+$/.test(e.target.value) ? e.target.value : "");
  };

  const updateClients = (e) => {
    setClients(e.target.value);
  };

  const updateEmpType = (e) => {
    setEmpType(e.target.value);
  };

  const calculateIncentive = (e) => {
    e.preventDefault();
    loaderTrigger();
    Calculate(
      empType,
      clients,
      payRate,
      billRate,
      setCalcData,
      setOpenLoading,
      setSpinnerLoading,
      setAlertLoading
    );
  };

  const resetForm = (e) => {
    setPayRate("");
    setBillRate("");
    setEmpType("");
    setClients("");
    setCalcData({});
  };

  const AlertModal = ({ alertLoading }) => {
    return (
      <Modal show={alertLoading} size="sm">
        <Modal.Body>
          <div align="center" style={{ color: "red" }}>
            Error processing your request.
          </div>
          <div align="center" style={{ paddingTop: "15px" }}>
            <Button onClick={() => setAlertLoading(false)}>Ok</Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <React.Fragment>
      <LoadingModal openLoading={openLoading} spinnerLoading={spinnerLoading} />
      <AlertModal alertLoading={alertLoading} />
      <div className="row p-4">
        <div className="col-lg-6">
          <div className="h5">DETAILS</div>

          <Form>
            <div className="row py-3">
              <div className="col-lg-4">Employee Type</div>
              <div className="col-lg-8">
                <select
                  name="Employee-type"
                  id="employee-type"
                  className="form-control form-control-custom"
                  value={empType}
                  onChange={updateEmpType}
                >
                  <option value="">Select Client Type</option>
                  <option value="W2">W2</option>
                  <option value="C2C">C2C</option>
                  <option value="1099">1099</option>
                </select>
              </div>
            </div>
            <div className="row py-3">
              <div className="col-lg-4">Client</div>
              <div className="col-lg-8">
                <select
                  name="Client-type"
                  id="client-type"
                  className="form-control form-control-custom"
                  value={clients}
                  onChange={updateClients}
                >
                  <option value="">Select Client</option>
                  {clientOptions.map(function (item, index) {
                    return (
                      <option value={item.client_id} key={item.client_id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="row py-3">
              <div className="col-lg-4">Pay Rate</div>
              <div className="col-lg-8">
                <input
                  className="form-control form-control-custom"
                  type="search"
                  value={/^-?[0-9]+$/.test(payRate) ? payRate : ""}
                  onChange={(e) => {
                    setPayRate(
                      /^-?[0-9]+$/.test(e.target.value) ? e.target.value : ""
                    );
                  }}
                />
              </div>
            </div>
            <div className="row py-3">
              <div className="col-lg-4">Bill Rate</div>
              <div className="col-lg-8">
                <input
                  className="form-control form-control-custom"
                  type="search"
                  value={/^-?[0-9]+$/.test(billRate) ? billRate : ""}
                  onChange={(e) => {
                    setBillRate(
                      /^-?[0-9]+$/.test(e.target.value) ? e.target.value : ""
                    );
                  }}
                />
              </div>
            </div>
            <div className="float-right">
              <button
                type="submit"
                className="btn btn-sm text-white px-5 mx-lg-2 b-color-search-description"
                onClick={(e) => calculateIncentive(e)}
              >
                Calculate
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm px-5 my-lg-0 my-2"
                onClick={(e) => resetForm(e)}
              >
                Clear
              </button>
            </div>
          </Form>
        </div>
        <div className="col-lg-6">
          <div className="h5 mt-3 mt-lg-0">RESULT</div>
          <div className="row px-2 text-center">
            <div className="col-lg gpm-back-color text-left mt-3 py-2">
              <span className="">Gross Profit(Actual)</span>
            </div>
            <div className="col-lg gpm-back-color text-left mt-lg-3 mt-md-3 py-2">
              <span className="">${calcdata.grossProfitActual}</span>
            </div>
          </div>
          <div className="row px-2 text-center">
            <div className="col-lg tech-back-color text-left mt-3 py-2">
              <span className="">Net Profit(Final)</span>
            </div>
            <div className="col-lg tech-back-color text-left mt-lg-3 mt-md-3 py-2">
              <span className="">${calcdata.netProfitFinal}</span>
            </div>
          </div>
          <div className="row px-2 text-center">
            <div className="col-lg gpm-back-color text-left mt-3 py-2">
              <span className="">Recruiter's Commission</span>
            </div>
            <div className="col-lg gpm-back-color text-left mt-lg-3 mt-md-3 py-2">
              <span className="">${calcdata.recruiterCommission}</span>
            </div>
          </div>
          {permissions?.VIEW_HOME_CALCULATOR_TL_COMMISSION && (
            <div className="row px-2 text-center">
              <div className="col-lg tech-back-color text-left mt-3 py-2">
                <span className="">TLs Commission</span>
              </div>
              <div className="col-lg tech-back-color text-left mt-lg-3 mt-md-3 py-2">
                <span className="">${calcdata.teamLeadsCommission}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default IncentiveCalculator;
