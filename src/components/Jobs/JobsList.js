import React from "react";
import { getJobsByPage, getAllClients } from "../../Services/jobsService";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { format } from "date-fns";

export const JobsList = ({
  startDate,
  endDate,
  page,
  setPage,
  filters,
  setFilters,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [jobs, setJobs] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState(0);

  React.useEffect(() => {
    getJobsByPage(
      page,
      setJobs,
      setTotalPage,
      setPage,
      setLoading,
      startDate,
      endDate,
      filters
    );
  }, [page, setPage, startDate, endDate, filters]);

  let pageClickHandler;

  const handlePageClick = (data) => {
    clearTimeout(pageClickHandler);
    pageClickHandler = setTimeout(() => {
      setPage(parseInt(data.selected) + 1);
    }, 300);
  };

  return (
    <div
      className="p-4"
      style={{
        minHeight: "600px",
      }}
    >
      <div className="font bg-white">
        <table className="jobListTable table table-hover d-table">
          <thead className="job-table-head-bg-color">
            <tr className="text-white" width="990">
              <th scope="col" width="110">
                Status
              </th>
              <th scope="col" width="110">
                Date
              </th>
              <th scope="col" width="110">
                ID
              </th>
              <th scope="col" width="110">
                Title
              </th>
              <th scope="col" width="110">
                Client
              </th>
              <th scope="col" width="110">
                Location
              </th>
              <th scope="col" width="110">
                Duration
              </th>
              <th scope="col" width="110">
                Submissions
              </th>
              <th scope="col" width="110">
                Positions
              </th>
              <th scope="col" width="110">
                Coverage
              </th>
            </tr>
          </thead>
          <tbody>
            <Filters
              filters={filters}
              setFilters={setFilters}
              setPage={setPage}
              loading={loading}
            />
            {loading ? (
              <tr className="text-center">
                <td colspan="10">
                  <div class="spinner-border text-dark" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : (
              jobs.map((row, index) => (
                <tr key={index}>
                  <td>{getStatus(row.status)}</td>
                  <td>
                    {row.date1 && format(new Date(row.date1), "MM-dd-yyyy")}
                  </td>
                  <td>
                    <Link
                      to={`/job-details/${row.requirement_id}`}
                      target="_blank"
                    >
                      {row.job_id}
                    </Link>
                  </td>
                  <td>{row.job_title}</td>
                  <td>{row.name}</td>
                  <td>{row.location}</td>
                  <td>{row.contract_duration}</td>
                  <td>{row.no_of_submissions}</td>
                  <td>{row.no_of_positions}</td>
                  <td>{getCoverage(row.no_of_submissions)}</td>
                </tr>
              ))
            )}
            {!loading && !jobs.length && (
              <tr>
                <td colSpan="10" className="text-center">
                  No records available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div
          className={`pt-2 d-flex justify-content-end mr-4 ${
            loading && "invisible"
          }`}
        >
          {totalPage > 1 && (
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={totalPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"activePagination"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const getStatus = (status) => {
  switch (status) {
    case 0:
      return "Inactive";
    case 1:
      return "Active";
    case 2:
      return "Inactive";
    case 3:
      return "Closed";
    case 4:
      return "Hold";
    default:
      return "";
  }
};

const getCoverage = (coverage) => {
  switch (coverage) {
    case 0:
      return "Uncovered";
    case 1:
      return "Partially Covered";
    case 2:
      return "Partially Covered";
    case 3:
      return "Covered";
    default:
      return "Covered";
  }
};

const Filters = ({ filters, setFilters, setPage, loading }) => {
  const [clients, setClients] = React.useState([]);

  React.useEffect(() => {
    getAllClients(setClients);
  }, []);

  let jobIdTimer, jobTitleTimer, jobLocationTimer, jobDurationTimer;

  return (
    <tr className="text-white job-table-head-bg-color-1 py-0">
      <th scope="col">
        <select
          name="select"
          className="form-control"
          disabled={loading}
          onChange={(event) => {
            setFilters({
              ...filters,
              status: event.target.value,
            });
            setPage(1);
          }}
        >
          <option value={""}>Select</option>
          <option value={1}>Active</option>
          <option value={2}>Inactive</option>
          <option value={3}>Closed</option>
          <option value={4}>Hold</option>
        </select>
      </th>
      <th scope="col"></th>
      <th scope="col">
        <input
          type="search"
          placeholder="Search"
          className="form-control"
          disabled={loading}
          onChange={(event) => {
            const value = event.target.value;
            clearTimeout(jobIdTimer);
            jobIdTimer = setTimeout(() => {
              setFilters({
                ...filters,
                jobId: value,
              });
              setPage(1);
            }, 1200);
          }}
        />
      </th>
      <th scope="col">
        <input
          type="search"
          placeholder="Search"
          className="form-control"
          disabled={loading}
          onChange={(event) => {
            const value = event.target.value;
            clearTimeout(jobTitleTimer);
            jobTitleTimer = setTimeout(() => {
              setFilters({
                ...filters,
                jobTitle: value,
              });
              setPage(1);
            }, 1200);
          }}
        />
      </th>
      <th scope="col">
        <select
          name="select"
          className="form-control"
          disabled={loading}
          onChange={(event) => {
            setFilters({
              ...filters,
              clientId: event.target.value,
            });
            setPage(1);
          }}
        >
          <option value={0}>Select</option>
          {clients.map((item) => (
            <option value={item.id}>{item.value}</option>
          ))}
        </select>
      </th>
      <th scope="col">
        <input
          type="search"
          placeholder="Search"
          className="form-control"
          disabled={loading}
          onChange={(event) => {
            const value = event.target.value;
            clearTimeout(jobLocationTimer);
            jobLocationTimer = setTimeout(() => {
              setFilters({
                ...filters,
                jobLocation: value,
              });
              setPage(1);
            }, 1200);
          }}
        />
      </th>
      <th scope="col">
        <input
          type="search"
          placeholder="Search"
          className="form-control"
          disabled={loading}
          onChange={(event) => {
            const value = event.target.value;
            clearTimeout(jobDurationTimer);
            jobDurationTimer = setTimeout(() => {
              setFilters({
                ...filters,
                duration: value,
              });
              setPage(1);
            }, 1200);
          }}
        />
      </th>
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col">
        <select
          name="select"
          className="form-control"
          disabled={loading}
          onChange={(event) => {
            setFilters({
              ...filters,
              jobCoverage: event.target.value,
            });
            setPage(1);
          }}
        >
          <option value="">Select</option>
          <option value="3">Covered</option>
          <option value="1">Partially Covered</option>
          <option value="0">Uncovered</option>
        </select>
      </th>
    </tr>
  );
};
