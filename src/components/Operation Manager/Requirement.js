import React from "react";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";

function Requirement({
  data,
  setPageForRequirement,
  profileRequirementLoading,
  setProfileRequirementLoading,
  requirementDataCount,
  error,
}) {
  let pageClickHandler;
  const handlePageClick = (datas) => {
    clearTimeout(pageClickHandler);
    pageClickHandler = setTimeout(() => {
      setPageForRequirement(parseInt(datas.selected) + 1);
      setProfileRequirementLoading(true);
    }, 300);
  };
  return (
    <>
      <div className="pb-5 pt-3 px-3 font">
        {!error ? (
          <table className="table table-hover h6">
            <thead className="thead-dark">
              <tr>
                <th scope="col" className="py-3">
                  Client
                </th>
                <th scope="col" className="py-3">
                  Job ID
                </th>
                <th scope="col" className="py-3">
                  Job Title
                </th>
                <th scope="col" className="py-3">
                  Received Date
                </th>
              </tr>
            </thead>
            <tbody className="">
              {profileRequirementLoading ? (
                <tr className="loader">
                  <td colSpan="6" className="text-center">
                    <div class="spinner-border text-dark" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : data && data.length && !error ? (
                data &&
                data.map((row) => (
                  <tr>
                    <td className="py-3">{row.client_name}</td>
                    <td className="py-3">{row.job_id}</td>
                    <td className="py-3">{row.job_title}</td>
                    <td className="py-3">
                      {row.received_date
                        ? format(new Date(row.received_date), "MMMM-dd-yyyy")
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="loader">
                  <td colSpan="6" className="text-center">
                    No records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <p className="text-danger h6 font-weight-normal">{`ERROR: ${error}`}</p>
        )}
        <div className="pt-2 d-flex justify-content-end">
          {data && data.length > 0 && (
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={requirementDataCount}
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
}

export default Requirement;
