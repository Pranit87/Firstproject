import React from "react";
import { Link } from "react-router-dom";
import { getMyJobs } from "../../Services/jobsService";
import ReactPaginate from "react-paginate";

const MyJobs = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [myJobs, setMyJobs] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  React.useEffect(() => {
    getMyJobs(page, setMyJobs, setTotal, setLoading, setError);
  }, [page]);

  let pageClickHandler;
  const handlePageClick = (data) => {
    clearTimeout(pageClickHandler);
    pageClickHandler = setTimeout(() => {
      setPage(parseInt(data.selected) + 1);
    }, 300);
  };

  return (
    <>
      <div className="table-responsive-sm">
        <table id="table" className="table table-hover ">
          <thead className="thead-light">
            <tr>
              <th scope="col">Job ID</th>
              <th scope="col">Client</th>
              <th scope="col">Job Title</th>
              <th scope="col">Location</th>
              <th scope="col">Duration</th>
              <th scope="col">Bill Rate</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="text-center">
                <td colspan="7">
                  <div class="spinner-border text-dark" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : (
              myJobs.map((row) => (
                <tr>
                  <td className="py-2">
                    <Link
                      to={`/job-details/${row.requirement_id}`}
                      target="_blank"
                    >
                      {row.job_id}
                    </Link>
                  </td>
                  <td className="py-2">{row.client}</td>
                  <td className="py-2">{row.job_title}</td>
                  <td className="py-2">{row.location}</td>
                  <td className="py-2">{row.contract_duration}</td>
                  <td className="py-2">{row.bill_rate}</td>
                  <td className="py-2">
                    <Link to={`/source/${row.requirement_id}`} target="_blank">
                      <button
                        type="button"
                        className="btn btn-primary btn-small"
                      >
                        Source
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
            {!loading && !myJobs.length && (
              <tr className="text-center">
                <td colspan="7">No records available.</td>
              </tr>
            )}
            {error && (
              <tr className="text-center">
                <td colspan="7">Error: {error}</td>
              </tr>
            )}
          </tbody>
        </table>
        <div
          className={`pt-2 d-flex justify-content-end mr-4 ${
            loading && "invisible"
          }`}
        >
          {total > 1 && (
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={total}
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
    </>
  );
};

export default MyJobs;
