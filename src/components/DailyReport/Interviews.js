import React from "react";
import ReactPaginate from "react-paginate";

const Interviews = ({ loading, error, myInterviews, totalPage, page, setPage }) => {
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
              Candidate Name
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
              Interview Type
            </th>
            <th scope="col" className="py-2">
              Interview Date and Time
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="text-center">
              <td colspan="10">
                <div class="spinner-border text-dark" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
          ) : (
            myInterviews.map((row) => (
              <tr>
                <td className="py-2">{row.client_name}</td>
                <td className="py-2">{row.job_id}</td>
                <td className="py-2">{row.recruiter_name}</td>
                <td className="py-2">{row.job_title}</td>
                <td className="py-2">{row.candidate_name}</td>
                <td className="py-2">{row.bill_rate}</td>
                <td className="py-2">{row.pay_rate}</td>
                <td className="py-2">{row.SDM}</td>
                <td className="py-2">{row.Interview_mode}</td>
                <td className="py-2">{row.interview_date}</td>
              </tr>
            ))
          )}
          {error && (
            <tr
              className="py-4 text-center h6 font-weight-bold"
              style={{ color: "red" }}
            >
              <td colspan="10">No records available.</td>
            </tr>
          )}
        </tbody>
      </table>
      {!loading && !error &&<div
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
export default Interviews;
