import React from "react";
import {
  getRequirementDetails,
  getJobListById,
} from "../../Services/sourceService";
import VatsUI from "./sourcingUI";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useParams } from "react-router-dom";
import { useUsers } from "../../Services/usersService";
import AccessDenied from "../Common/AccessDenied/AccessDenied";
import "./sourcingUI.css";
import Select from "react-select";

const Source = () => {
  const params = useParams();
  const { jobId } = params;

  let jobIdTimer;
  const [id, setId] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [jobIDChange, setJobIDChange] = React.useState(null);
  const [jobList, setJobList] = React.useState();
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loader, setLoader] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id !== "") {
      getRequirementDetails(id, setData, setLoader, setError);
    }
  };

  React.useEffect(() => {
    jobId && getRequirementDetails(jobId, setData, setLoader, setError);
  }, [jobId]);

  React.useEffect(() => {
    if (jobIDChange) {
      getJobListById(jobIDChange, setJobList, setLoading);
    }
  }, [jobIDChange]);

  const popover = (desData) => {
    return (
      <Popover id="popover-basic">
        <Popover.Content className="pop-desc">{desData}</Popover.Content>
      </Popover>
    );
  };

  const { currentUser } = useUsers();
  const { permissions } = currentUser;
  return (
    (Object.keys(permissions).length && !permissions.VIEW_SOURCING_PAGE && (
      <AccessDenied />
    )) || (
      <>
        <div className="inner font">
          <form
            className="form-inline p-4 d-flex align-items-baseline"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className={"col-lg-3 mb-4 mb-lg-0 index commonPaddingLeft"}>
              <Select
                className="basic-single"
                classNamePrefix="select"
                isSearchable
                escapeClearsValue
                isClearable
                name="search_job"
                placeholder="Search Job"
                onChange={(e) => {
                  e ? setId(e.id) : setId(null);
                }}
                value={id && jobList.filter((row) => row.id === id)}
                onInputChange={(e) => {
                  setLoading(true);
                  const value = e;
                  clearTimeout(jobIdTimer);
                  jobIdTimer = setTimeout(() => {
                    setJobIDChange(value);
                  }, 1200);
                }}
                options={jobList}
                isLoading={loading}
                getOptionLabel={(option) =>
                  `${option.job_id}: ${option.client_name}`
                }
                getOptionValue={(option) =>
                  `${option.job_id}: ${option.client_name}`
                }
              />
            </div>
            <button className="btn btn-primary my-2 px-3" type="submit">
              Go
            </button>
            


          </form>
{/* // */}
{/* <form>
  <div class="mb-4 col-lg-3 ml-2">
    
    <input type="text" class="form-control" placeholder="Enter"/>
    
  </div></form>       */}
          {loader ? (
            <div class="inner bg-white py-4 mx-4 rounded shadow font">
              <tr className="loadingSearchItem alignCenter">
                <td colSpan="6" className="text-center">
                  <div class="spinner-border text-dark" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </td>
              </tr>
            </div>
          ) : data && data.job_id ? (
            <div class="inner bg-white py-4 mx-4 rounded shadow font">
              <div class="row">
                <div class="col-lg-10 col-12">
                  <div class="row description-font">
                    <div class="col-lg-4 col-12 pl-lg-5 pb-lg-4 text-center text-lg-left">
                      <span class="description-color">Client: </span>
                      <span class="ml-lg-3">{data.client.name}</span>
                    </div>
                    <div class="col-lg-4 col-12 pl-lg-2 text-center text-lg-left">
                      <span class="description-color">Bill Rate: </span>
                      <span class="ml-lg-3">${data.bill_rate}/hr</span>
                    </div>
                    <div class="col-lg-4 col-12 pl-lg-2 text-center text-lg-left">
                      <span class="description-color">Duration: </span>
                      <span class="ml-lg-3">
                        {data.contract_duration} Months
                      </span>
                    </div>
                  </div>
                  <div class="row description-font">
                    <div class="col-lg-4 col-12 pl-lg-5 pb-lg-2 text-center text-lg-left">
                      <span class="description-color">ID: </span>
                      <span class="ml-lg-4 pl-lg-3">{data.job_id}</span>
                    </div>
                    <div class="col-lg-4 col-12 pl-lg-2 text-center text-lg-left">
                      <span class="description-color">Job Title: </span>
                      <span class="ml-lg-3">{data.job_title}</span>
                    </div>
                    <div class="col-lg-4 col-12 pl-lg-2 text-center text-lg-left">
                      <span class="description-color">Location: </span>
                      <span class="ml-lg-3">{data.location}</span>
                    </div>
                  </div>
                </div>
                <div class="col-lg-2 col-12 text-center text-lg-left pt-2 pt-lg-0 source-desc-css">
                  <OverlayTrigger
                    trigger="click"
                    placement="left"
                    overlay={popover(data.job_description)}
                    containerPadding={30}
                    rootClose
                  >
                    <button
                      class="btn btn-primary py-4 px-5 description-font b-color-search-description"
                      type="submit"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      Description
                    </button>
                  </OverlayTrigger>
                </div>
              </div>
            </div>
          ) : (
            error && (
              <div class="inner bg-white py-4 mx-4 rounded shadow font">
                <tr className="loadingSearchItem alignCenter">
                  <td colSpan="6" className="text-center">
                    {error}
                  </td>
                </tr>
              </div>
            )
          )}
          <VatsUI reqId={id || jobId} reqUniqueId={data.id} />
        </div>
      </>
    )
  );
};

export default Source;
