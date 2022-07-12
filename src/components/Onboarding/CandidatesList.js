import React from "react";
import ReactPaginate from "react-paginate";
import { Col, Form, FormControl, Row, Table, Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

const header = {
  headitems: [
    {
      Name: "Candidate Name",
      Clientname: "Client Name",
      Position: "Position",
      ID: "JobID",
      Contact: "Contact",
    },
  ],
};

const candlist = {
  candlist: [
    {
      CandidateName: "Lorem ipsum",
      Clientname: "Tesla",
      Position: "Software Engineer",
      JobID: "605178",
      Contact: "9172318292,Pranit@vertisystem.com",
    },
    {
      CandidateName: "Dolor Sit",
      Clientname: "Salesforce",
      position: "Program Manager-CIO Org",
      JobID: "SFDCJP00008434",
      Contact: "5108261012,aaquib@vertisystem.com",
    },
    {
      CandidateName: "Abani",
      Clientname: "PPG",
      Position: "Production Worker2",
      JobID: "PPGJ00018916",
      Contact: "2146360394,abani.akm@vertisystem.com",
    },
    {
      CandidateName: "Lorem ipsum",
      Clientname: "Tesla",
      Position: "Cafe Attendant",
      JobID: "605178",
      Contact: "9172318292,Aanshik@vertisystem.com",
    },
    {
      CandidateName: "Dolor Sit Amit",
      Clientname: "Salesforce",
      Position: "Program Manager. CIO Org",
      JobID: "SFDCJP00008434",
      Contact: "5108261012,aaquib@vertisystem.com",
    },
    {
      CandidateName: "Abani Mahapatra",
      Clientname: "PPG",
      Position: "Production Worker 2",
      JobID: "PPGJP00018916",
      Contact: "2146360394,abani.akm@vertisystem.com",
    },
    {
      CandidateName: "Dolor Sit Amit",
      Clientname: "TeslSalesforcea",
      Position: "Program Manager. CIO Org",
      JobID: "SFDCJP00008434",
      Contact: "5108261012,aaquib@vertisystem.com",
    },
    {
      CandidateName: "Abani Mahapatra",
      Clientname: "PPG",
      Position: "Production Worker 2",
      JobID: "PPGJP00018916",
      Contact: "2146360394,abani.akm@vertisystem.com",
    },
  ],
};

const candidatelist = () => {
  return (
    <div>
      <div>
        <span className="VMS"> Girish - Software Engineer</span>
        <span className="VMS">Loremipsum@gmail.com</span>
        <span className="VMS">9172318292</span>
      </div>

      <div className="new-sec">
        <Table bordered size="sm">
          <thead className="head-bg">
            <tr className="height-row">
              <th>{headitems.Name}</th>
              <th>{headitems.Clientname}</th>
              <th>J{headitems.Position}</th>
              <th>{headitems.ID}</th>
              <th>{headitems.Name}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="height-row">
              <td> {candlist.CandidateName}</td>
              <td>{candlist.Clientname}</td>
              <td>{candlist.position}</td>
              <td>{candlist.JobID}</td>
              <td>{candlist.Contact}</td>
            </tr>
          </tbody>
        </Table>
        {/* <div className="d-flex justify-content-end">
        <Button
          variant="primary"
          className="btn btn-primary btn-sm px-4 rounded-4 "
        >
          <span className="innerbtn2">Submit </span>
        </Button>
        <Button
          variant="secondary"
          className="btn btn-secondary btn-sm px-4 rounded-4 ml-2"
          onClick={handleShow}
        >
          <span className="innerbtn2">Update DSR</span>
        </Button>
      </div> */}
      </div>
    </div>
  );
};

export default candidatelist;
