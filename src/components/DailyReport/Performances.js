import React from "react";
import ReactPaginate from "react-paginate";

const Performances = ({
  loading,
  error,
  myPerformances,
  totalPage,
  page,
  setPage,
  userType,
}) => {
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
              Username
            </th>
            <th scope="col" className="py-2">
              Submissions
            </th>
            <th scope="col" className="py-2">
              Interviews
            </th>
            <th scope="col" className="py-2">
              Int vs Sub
            </th>
            <th scope="col" className="py-2">
              Offers
            </th>
            <th scope="col" className="py-2">
              Int vs Offers
            </th>
            <th scope="col" className="py-2">
              Starts
            </th>
            <th scope="col" className="py-2">
              Average Respond Time
            </th>
            <th scope="col" className="py-2">
              Coverage Ratio
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="text-center">
              <td colspan="9">
                <div class="spinner-border text-dark" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
          ) : (
            myPerformances.map((row) => (
              <tr>
                <td className="py-2">
                  {userType == "recruiter" || userType == "sdm"
                    ? row.username
                    : row.clientName}
                </td>
                <td className="py-2">{row.total_submits}</td>
                <td className="py-2">{row.total_interviews}</td>
                <td className="py-2">{row.interview_vs_submission}</td>
                <td className="py-2">{row.total_offers}</td>
                <td className="py-2">{row.interview_vs_offers}</td>
                <td className="py-2">{row.total_starts}</td>
                <td className="py-2">{row.avg_response_time}</td>
                <td className="py-2">{row.coverage_ratio}</td>
              </tr>
            ))
          )}
          {error && (
            <tr
              className="py-4 text-center h6 font-weight-bold"
              style={{ color: "red" }}
            >
              <td colspan="9">No records available.</td>
            </tr>
          )}
        </tbody>
      </table>
      {!loading && !error && (
        <div className={`pt-2 d-flex justify-content-end mr-4 text-black`}>
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
        </div>
      )}
    </div>
  );
};
export default Performances;
