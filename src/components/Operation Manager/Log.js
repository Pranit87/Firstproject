import React from "react";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";

function Logs({
  data,
  setPageForActivityLog,
  profileActivityLoading,
  setProfileActivityLoading,
  activityLogDataCount,
  error,
}) {
  let pageClickHandler;
  const handlePageClick = (datas) => {
    clearTimeout(pageClickHandler);
    pageClickHandler = setTimeout(() => {
      setPageForActivityLog(parseInt(datas.selected) + 1);
      setProfileActivityLoading(true);
    }, 300);
  };
  return (
    <div className="bg-white py-4 mx-4 font">
      {profileActivityLoading ? (
        <tr className="loadingSearchItem loaders">
          <td colSpan="6" className="text-center">
            <div class="spinner-border text-dark" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </td>
        </tr>
      ) : data && data.data.length > 0 ? (
        data.data.map((row) => (
          <>
            <div className="d-lg-flex justify-content-between job-description-font-custom">
              <div>
                <span className="">
                  {row.action ? (
                    <p dangerouslySetInnerHTML={{ __html: row.action }} />
                  ) : (
                    "N/A"
                  )}{" "}
                </span>
              </div>
              <div className="description-color pr-lg-5">
                {row.created_at
                  ? format(new Date(row.created_at), "dd-MM-yyyy")
                  : "N/A"}
              </div>
            </div>
            <div className="pb-3">
              By: {row.user ? row.user["username"] : "N/A"}
            </div>
            <div className="hr-remark"></div>
          </>
        ))
      ) : (
        <p className="h6">No records available.</p>
      )}
      {error && (
        <p className="text-danger h6 font-weight-normal">{`ERROR: ${error}`}</p>
      )}
      <div className="pt-3 d-flex justify-content-end">
        {data && data.data.length > 0 && (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={activityLogDataCount}
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
  );
}

export default Logs;
