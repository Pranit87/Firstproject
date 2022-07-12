import React from "react";
import ReactPaginate from "react-paginate";

const Starts = ({ loading, error, myStarts, totalPage, page, setPage }) => {
  let pageClickHandler;

  const handlePageClick = (data) => {
    clearTimeout(pageClickHandler);
    pageClickHandler = setTimeout(() => {
      setPage(parseInt(data.selected) + 1);
    }, 300);
  };

  return (
    <div className="pb-5 pt-3 px-3">
      <table className="table table-hover">
        <thead className="table-head-bg-color">
          <tr>
            <th scope="col" className="py-2">
              Client Name
            </th>
            <th scope="col" className="py-2">
              Job ID
            </th>
            <th scope="col" className="py-2">
              Recruiter Name
            </th>
            <th scope="col" className="py-2">
              Job Title
            </th>
            <th scope="col" className="py-2">
              Bill Rate
            </th>
            <th scope="col" className="py-2">
              Pay Rate
            </th>
            <th scope="col" className="py-2">
              SDM
            </th>
            <th scope="col" className="py-2">
              Accepted/Decline
            </th>
            <th scope="col" className="py-2">
              Offer Duration
            </th>
            <th scope="col" className="py-2">
              Updated On
            </th>
            <th scope="col" className="py-2">
              Start Date
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="text-center">
              <td colspan="11">
                <div class="spinner-border text-dark" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
          ) : (
            myStarts.map((row) => (
              <tr>
                <td className="py-2">{row.client_name}</td>
                <td className="py-2">{row.job_id}</td>
                <td className="py-2">{row.recruiter_name}</td>
                <td className="py-2">{row.job_title}</td>
                <td className="py-2">{row.bill_rate}</td>
                <td className="py-2">{row.pay_rate}</td>
                <td className="py-2">{row.team_lead}</td>
                <td className="py-2">{row.accepted_declined}</td>
                <td className="py-2">{row.offer_duration}</td>
                <td className="py-2">{row.UpdatedOn}</td>
                <td className="py-2">{row.started_on}</td>
              </tr>
            ))
          )}
          {error && (
            <tr
              className="py-4 text-center h6 font-weight-bold"
              style={{ color: "red" }}
            >
              <td colspan="11">No records available.</td>
            </tr>
          )}
        </tbody>
      </table>
      {!loading && !error && <div
          className={`pt-2 d-flex justify-content-end mr-4 text-black`}
        >
          {totalPage > 0 && (
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={totalPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              forcePage={page - 1}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"activePagination"}
            />
          )}
        </div>}
    </div>
  );
};
export default Starts;
