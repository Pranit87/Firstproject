import { format } from "date-fns";
import React from "react";
import ReactPaginate from "react-paginate";

function AccessLog({
  data,
  setPageForAccesslog,
  profileAccessLoading,
  setProfileAccessLoading,
  accessLogDataCount,
  error,
}) {
  let pageClickHandler;
  const handlePageClick = (datas) => {
    clearTimeout(pageClickHandler);
    pageClickHandler = setTimeout(() => {
      setPageForAccesslog(parseInt(datas.selected) + 1);
      setProfileAccessLoading(true);
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
                  IP Address
                </th>
                <th scope="col" className="py-3">
                  Location
                </th>
                <th scope="col" className="py-3">
                  OS/Browser
                </th>
                <th scope="col" className="py-3">
                  Login Time
                </th>
              </tr>
            </thead>
            <tbody className="">
              {profileAccessLoading ? (
                <tr className="loader">
                  <td colSpan="6" className="text-center">
                    <div class="spinner-border text-dark" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : data && data.length ? (
                data &&
                data.map((row) => (
                  <tr>
                    <td className="py-3">
                      {row.data !== "" ? JSON.parse(row.data)["ip"] : "N/A"}{" "}
                      <br />{" "}
                      <span>
                        {row.data !== ""
                          ? JSON.parse(row.data)["region"]
                          : "N/A"}
                      </span>
                    </td>
                    <td className="py-3">
                      {row.data !== "" ? JSON.parse(row.data)["city"] : "N/A"}{" "}
                      <br />{" "}
                      {row.data !== "" ? JSON.parse(row.data)["postal"] : "N/A"}
                    </td>
                    <td className="py-3">
                      {row.data !== "" ? JSON.parse(row.data)["os"] : "N/A"}{" "}
                      <br />{" "}
                      {row.data !== ""
                        ? JSON.parse(row.data)["browser"]
                        : "N/A"}
                    </td>
                    <td className="py-3">
                      {row.created_at
                        ? format(new Date(row.created_at), "MMMM-dd-yyyy")
                        : "N/A"}{" "}
                      <br />{" "}
                      {row.created_at
                        ? format(new Date(row.created_at), "HH:mm:ss a")
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
              pageCount={accessLogDataCount}
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

export default AccessLog;
