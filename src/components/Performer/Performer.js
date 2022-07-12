import React from "react";
import axios from "axios";
import { RecruiterDropdown } from "../../Services/dropdownServices";
import { Spinner } from "react-bootstrap";
import { useUsers } from "../../Services/usersService";
import AccessDenied from "../Common/AccessDenied/AccessDenied";

const TopPerformer = () => {
  const [recruiter1, setRecruiter1] = React.useState();
  const [month1, setMonth1] = React.useState("");
  const [year1, setYear1] = React.useState("");
  const [comment1, setComment1] = React.useState("");

  const [recruiter2, setRecruiter2] = React.useState();
  const [month2, setMonth2] = React.useState("");
  const [year2, setYear2] = React.useState("");
  const [comment2, setComment2] = React.useState("");

  const [recruiter3, setRecruiter3] = React.useState();
  const [month3, setMonth3] = React.useState("");
  const [year3, setYear3] = React.useState("");
  const [comment3, setComment3] = React.useState("");

  const [recruiter4, setRecruiter4] = React.useState();
  const [month4, setMonth4] = React.useState("");
  const [year4, setYear4] = React.useState("");
  const [comment4, setComment4] = React.useState("");

  const [recruiterOptions, setRecruiterOptions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { currentUser } = useUsers();
  const { permissions } = currentUser;

  React.useEffect(() => {
    RecruiterDropdown(setRecruiterOptions);
  }, []);

  function showAlert() {
    document.getElementById("broadcast-success").classList.remove("d-none");
    console.log(document.getElementById("broadcast-success"));
  }

  const SavePerformer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    var submitData = new FormData();
    submitData.append("recruiterId[1]", recruiter1);
    submitData.append("recruiterId[2]", recruiter2);
    submitData.append("recruiterId[3]", recruiter3);
    submitData.append("recruiterId[4]", recruiter4);
    submitData.append("month[1]", month1);
    submitData.append("month[2]", month2);
    submitData.append("month[3]", month3);
    submitData.append("month[4]", month4);
    submitData.append("year[1]", year1);
    submitData.append("year[2]", year2);
    submitData.append("year[3]", year3);
    submitData.append("year[4]", year4);
    submitData.append("comments[1]", comment1);
    submitData.append("comments[2]", comment2);
    submitData.append("comments[3]", comment3);
    submitData.append("comments[4]", comment4);

    try {
      const request = {
        url: `${process.env.REACT_APP_API_BASEURL}/topPerformer`,
        method: "POST",
        data: submitData,
      };

      const response = await axios(request);
      if (response.status === 200) {
        setIsLoading(false);
        showAlert();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateRecruiter1 = (e) => {
    setRecruiter1(e.target.value);
  };

  const updateMonth1 = (e) => {
    setMonth1(e.target.value.split(" ")[0]);
    setYear1(new Date().getFullYear());
  };

  const updateComment1 = (e) => {
    setComment1(e.target.value);
  };

  const updateRecruiter2 = (e) => {
    setRecruiter2(e.target.value);
  };

  const updateMonth2 = (e) => {
    setMonth2(e.target.value.split(" ")[0]);
    setYear2(new Date().getFullYear());
  };

  const updateComment2 = (e) => {
    setComment2(e.target.value);
  };

  const updateRecruiter3 = (e) => {
    setRecruiter3(e.target.value);
  };

  const updateMonth3 = (e) => {
    setMonth3(e.target.value.split(" ")[0]);
    setYear3(new Date().getFullYear());
  };

  const updateComment3 = (e) => {
    setComment3(e.target.value);
  };

  const updateRecruiter4 = (e) => {
    setRecruiter4(e.target.value);
  };

  const updateMonth4 = (e) => {
    setMonth4(e.target.value.split(" ")[0]);
    setYear4(new Date().getFullYear());
  };

  const updateComment4 = (e) => {
    setComment4(e.target.value);
  };

  const resetForm = (e) => {
    e.preventDefault();
    setRecruiter1("");
    document.getElementById("month1").selectedIndex = "0";
    document.getElementById("month2").selectedIndex = "0";
    document.getElementById("month3").selectedIndex = "0";
    document.getElementById("month4").selectedIndex = "0";
    setMonth1("");
    setYear1("");
    setComment1("");
    setRecruiter2("");
    setMonth2("");
    setYear2("");
    setComment2("");
    setRecruiter3("");
    setMonth3("");
    setYear3("");
    setComment3("");
    setRecruiter4("");
    setMonth4("");
    setYear4("");
    setComment4("");
  };

  return (
    (Object.keys(permissions).length && !permissions.VIEW_PERFORMERS && (
      <AccessDenied />
    )) || (
      <>
        <div className="font">
          <div className="my-4 mx-4 text-white h4">Top performer</div>
          <div className="bg-white my-4 mx-4 py-5 rounded ">
            <form onSubmit={(e) => SavePerformer(e)}>
              <div className="py-2 font-weight-bold px-5">
                Recruiter of the month (Highest revenue generator)
              </div>
              <div className="row px-5">
                <div className="col-lg">
                  <label htmlFor="recruiter">Recruiter</label>
                  <select
                    name="recruiter"
                    id="recruiter"
                    className="form-control "
                    onChange={updateRecruiter1}
                    value={recruiter1}
                    required
                  >
                    <option hidden disabled selected="true" value="">
                      Select Recruiter
                    </option>
                    {recruiterOptions.map(function (item, index) {
                      return (
                        <>
                          <option value={item.id} key={index}>
                            {item.username}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
                <div className="col-lg">
                  <label htmlFor="month">Month</label>
                  <select
                    name="month"
                    id="month1"
                    className="form-control "
                    onChange={updateMonth1}
                    required
                  >
                    <option hidden disabled selected="true" value="">
                      Select Month
                    </option>
                    <option value="12 {new Date().getFullYear() - 1}">
                      December {new Date().getFullYear() - 1}
                    </option>
                    <option value="1 {new Date().getFullYear()}">
                      January {new Date().getFullYear()}
                    </option>
                    <option value="2 {new Date().getFullYear()}">
                      February {new Date().getFullYear()}
                    </option>
                    <option value="3 {new Date().getFullYear()}">
                      March {new Date().getFullYear()}
                    </option>
                    <option value="4 {new Date().getFullYear()}">
                      April {new Date().getFullYear()}
                    </option>
                    <option value="5 {new Date().getFullYear()}">
                      May {new Date().getFullYear()}
                    </option>
                    <option value="6 {new Date().getFullYear()}">
                      June {new Date().getFullYear()}
                    </option>
                    <option value="7 {new Date().getFullYear()}">
                      July {new Date().getFullYear()}
                    </option>
                    <option value="8 {new Date().getFullYear()}">
                      August {new Date().getFullYear()}
                    </option>
                    <option value="9 {new Date().getFullYear()}">
                      September {new Date().getFullYear()}
                    </option>
                    <option value="10 {new Date().getFullYear()}">
                      October {new Date().getFullYear()}
                    </option>
                    <option value="11 {new Date().getFullYear()}">
                      November {new Date().getFullYear()}
                    </option>
                    <option value="12 {new Date().getFullYear()}">
                      December {new Date().getFullYear()}
                    </option>
                  </select>
                </div>
                <div className="col-lg">
                  <label htmlFor="comments">Comments</label>
                  <input
                    type="text"
                    className="form-control "
                    onChange={updateComment1}
                    value={comment1}
                  />
                </div>
              </div>
              <div className="bg-light px-0 my-4 pb-4">
                <div className="py-2 font-weight-bold px-5">
                  Recruiter of the month (Over all Metrics Performer)
                </div>
                <div className="row px-5">
                  <div className="col-lg">
                    <label htmlFor="recruiter">Recruiter</label>
                    <select
                      name="recruiter"
                      id="recruiter"
                      className="form-control "
                      required
                      onChange={updateRecruiter2}
                      value={recruiter2}
                    >
                      <option hidden disabled selected="true" value="">
                        Select Recruiter
                      </option>
                      {recruiterOptions.map(function (item, index) {
                        return (
                          <option value={item.id} key={index}>
                            {item.username}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-lg">
                    <label htmlFor="month">Month</label>
                    <select
                      name="month"
                      id="month2"
                      className="form-control "
                      required
                      onChange={updateMonth2}
                    >
                      <option hidden disabled selected value="">
                        Select Month
                      </option>
                      <option value="12 {new Date().getFullYear() - 1}">
                        December {new Date().getFullYear() - 1}
                      </option>
                      <option value="1 {new Date().getFullYear()}">
                        January {new Date().getFullYear()}
                      </option>
                      <option value="2 {new Date().getFullYear()}">
                        February {new Date().getFullYear()}
                      </option>
                      <option value="3 {new Date().getFullYear()}">
                        March {new Date().getFullYear()}
                      </option>
                      <option value="4 {new Date().getFullYear()}">
                        April {new Date().getFullYear()}
                      </option>
                      <option value="5 {new Date().getFullYear()}">
                        May {new Date().getFullYear()}
                      </option>
                      <option value="6 {new Date().getFullYear()}">
                        June {new Date().getFullYear()}
                      </option>
                      <option value="7 {new Date().getFullYear()}">
                        July {new Date().getFullYear()}
                      </option>
                      <option value="8 {new Date().getFullYear()}">
                        August {new Date().getFullYear()}
                      </option>
                      <option value="9 {new Date().getFullYear()}">
                        September {new Date().getFullYear()}
                      </option>
                      <option value="10 {new Date().getFullYear()}">
                        October {new Date().getFullYear()}
                      </option>
                      <option value="11 {new Date().getFullYear()}">
                        November {new Date().getFullYear()}
                      </option>
                      <option value="12 {new Date().getFullYear()}">
                        December {new Date().getFullYear()}
                      </option>
                    </select>
                  </div>
                  <div className="col-lg">
                    <label htmlFor="comments">Comments</label>
                    <input
                      type="text"
                      className="form-control "
                      onChange={updateComment2}
                      value={comment2}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="py-2 font-weight-bold px-5">
                  Highest submissions
                </div>
                <div className="row px-5">
                  <div className="col-lg">
                    <label htmlFor="recruiter">Recruiter</label>
                    <select
                      name="recruiter"
                      id="recruiter"
                      className="form-control "
                      required
                      onChange={updateRecruiter3}
                      value={recruiter3}
                    >
                      <option hidden disabled selected="true" value="">
                        Select Recruiter
                      </option>
                      {recruiterOptions.map(function (item, index) {
                        return (
                          <option value={item.id} key={index}>
                            {item.username}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-lg">
                    <label htmlFor="month">Month</label>
                    <select
                      name="month"
                      id="month3"
                      className="form-control "
                      required
                      onChange={updateMonth3}
                    >
                      <option hidden disabled selected value="">
                        Select Month
                      </option>
                      <option value="12 {new Date().getFullYear() - 1}">
                        December {new Date().getFullYear() - 1}
                      </option>
                      <option value="1 {new Date().getFullYear()}">
                        January {new Date().getFullYear()}
                      </option>
                      <option value="2 {new Date().getFullYear()}">
                        February {new Date().getFullYear()}
                      </option>
                      <option value="3 {new Date().getFullYear()}">
                        March {new Date().getFullYear()}
                      </option>
                      <option value="4 {new Date().getFullYear()}">
                        April {new Date().getFullYear()}
                      </option>
                      <option value="5 {new Date().getFullYear()}">
                        May {new Date().getFullYear()}
                      </option>
                      <option value="6 {new Date().getFullYear()}">
                        June {new Date().getFullYear()}
                      </option>
                      <option value="7 {new Date().getFullYear()}">
                        July {new Date().getFullYear()}
                      </option>
                      <option value="8 {new Date().getFullYear()}">
                        August {new Date().getFullYear()}
                      </option>
                      <option value="9 {new Date().getFullYear()}">
                        September {new Date().getFullYear()}
                      </option>
                      <option value="10 {new Date().getFullYear()}">
                        October {new Date().getFullYear()}
                      </option>
                      <option value="11 {new Date().getFullYear()}">
                        November {new Date().getFullYear()}
                      </option>
                      <option value="12 {new Date().getFullYear()}">
                        December {new Date().getFullYear()}
                      </option>
                    </select>
                  </div>
                  <div className="col-lg">
                    <label htmlFor="comments">Comments</label>
                    <input
                      type="text"
                      className="form-control "
                      onChange={updateComment3}
                      value={comment3}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-light px-0 my-4 pb-4">
                <div className="py-2 font-weight-bold px-5">
                  Most interviews
                </div>
                <div className="row px-5">
                  <div className="col-lg">
                    <label htmlFor="recruiter">Recruiter</label>
                    <select
                      name="recruiter"
                      id="recruiter"
                      className="form-control "
                      required
                      onChange={updateRecruiter4}
                      value={recruiter4}
                    >
                      <option hidden disabled selected="true" value="">
                        Select Recruiter
                      </option>
                      {recruiterOptions.map(function (item, index) {
                        return (
                          <option value={item.id} key={index}>
                            {item.username}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-lg">
                    <label htmlFor="month">Month</label>
                    <select
                      name="month"
                      id="month4"
                      className="form-control "
                      required
                      onChange={updateMonth4}
                    >
                      <option hidden disabled selected value="">
                        Select Month
                      </option>
                      <option value="12 {new Date().getFullYear() - 1}">
                        December {new Date().getFullYear() - 1}
                      </option>
                      <option value="1 {new Date().getFullYear()}">
                        January {new Date().getFullYear()}
                      </option>
                      <option value="2 {new Date().getFullYear()}">
                        February {new Date().getFullYear()}
                      </option>
                      <option value="3 {new Date().getFullYear()}">
                        March {new Date().getFullYear()}
                      </option>
                      <option value="4 {new Date().getFullYear()}">
                        April {new Date().getFullYear()}
                      </option>
                      <option value="5 {new Date().getFullYear()}">
                        May {new Date().getFullYear()}
                      </option>
                      <option value="6 {new Date().getFullYear()}">
                        June {new Date().getFullYear()}
                      </option>
                      <option value="7 {new Date().getFullYear()}">
                        July {new Date().getFullYear()}
                      </option>
                      <option value="8 {new Date().getFullYear()}">
                        August {new Date().getFullYear()}
                      </option>
                      <option value="9 {new Date().getFullYear()}">
                        September {new Date().getFullYear()}
                      </option>
                      <option value="10 {new Date().getFullYear()}">
                        October {new Date().getFullYear()}
                      </option>
                      <option value="11 {new Date().getFullYear()}">
                        November {new Date().getFullYear()}
                      </option>
                      <option value="12 {new Date().getFullYear()}">
                        December {new Date().getFullYear()}
                      </option>
                    </select>
                  </div>
                  <div className="col-lg">
                    <label htmlFor="comments">Comments</label>
                    <input
                      type="text"
                      id="comments"
                      className="form-control "
                      onChange={updateComment4}
                      value={comment4}
                    />
                  </div>
                </div>
              </div>
              <div className="pagination justify-content-start px-5">
                {isLoading ? (
                  <button
                    className="px-4 py-2 btn btn-primary mt-2 mr-3"
                    type="submit"
                  >
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="ml-1">Broadcasting</span>
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 btn btn-primary mt-2 mr-3"
                    type="submit"
                  >
                    Broadcast
                  </button>
                )}

                <button
                  className="px-4 btn btn-secondary mt-2 mr-3"
                  onClick={(e) => resetForm(e)}
                >
                  Cancel
                </button>
              </div>
              <div
                className="alert alert-success alert-dismissible fade show mt-3 mx-5 d-none"
                role="alert"
                id="broadcast-success"
              >
                Records inserted!
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  );
};

export default TopPerformer;
