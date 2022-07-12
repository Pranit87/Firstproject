import React from "react";
import Select from "react-select";
import { Button } from "react-bootstrap";
import { Col, Form } from "react-bootstrap";
import {
  postVCareData,
  getVCareData,
} from "../../../Services/employeeServices";
import { Grievance } from "../../../constants";
import { VCareCategory } from "./commonFilters";

const VCare = ({ id }) => {
  const profile = localStorage.getItem("profile");
  const [grievance, setGreivence] = React.useState("1");
  const [comment, setComment] = React.useState("");
  const [VCareData, setVCareData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [refreshVCare, setRefreshVCare] = React.useState(false);
  const [dataSaveLoading, setDataSaveLoading] = React.useState(false);

  const handleSave = () => {
    setDataSaveLoading(false);
    const data = {
      comment: comment,
      id: id ? parseInt(id) : "",
      category_id: grievance ? parseInt(grievance) : "",
      user_id: JSON.parse(profile)["id"],
    };
    postVCareData(data, setRefreshVCare, refreshVCare, setDataSaveLoading);
  };

  React.useEffect(() => {
    getVCareData(id, setVCareData, setLoading);
  }, [id, refreshVCare]);

  return (
    <>
      <Form className="inner bg-white px-4 py-4 mx-4 rounded shadow font">
        {loading ? (
          <div className="text-center">
            <div colSpan="11">
              <div className="spinner-border text-dark" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        ) : VCareData ? (
          VCareData.map((row) => (
            <>
              <div className="py-2">
                <div className="font-weight-bold">{row.comment}</div>
                <div className="d-lg-flex justify-content-between pb-2">
                  <div>
                    <span className="bg-primary text-white rounded small px-2 py-1">
                      <VCareCategory id={row.catogery} />
                    </span>
                    &nbsp; By:{row.username}
                  </div>
                  <div className="text-secondary">{row.date_time}</div>
                </div>
              </div>
            </>
          ))
        ) : (
          <div className="py-4 text-center">No Records</div>
        )}
        <Col className="d-lg-flex justify-content-center my-4 py-3">
          <textarea
            className="col-lg-5 form-control"
            placeholder="Please Enter Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </Col>
        <Col
          className="d-lg-flex my-4 py-3"
          style={{ justifyContent: "space-around" }}
        >
          <Select
            options={Grievance}
            className="form-control col-lg-3 mx-2 px-0 py-0"
            name="Grievance"
            getOptionLabel={({ label }) => label}
            getOptionValue={({ value }) => value}
            onChange={(e) => {
              setGreivence(e && e.value);
            }}
            placeholder="Grievance"
          />
        </Col>
        <Col md={12} className="py-3 text-right">
          <Button
            className="mx-2 my-2 mr-5 btn btn-primary"
            type="button"
            onClick={() => handleSave()}
            disabled={dataSaveLoading}
          >
            {!dataSaveLoading ? "Save" : "Saving..."}
          </Button>
        </Col>
      </Form>
    </>
  );
};

export default VCare;
