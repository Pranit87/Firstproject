/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number    Developer       Description
 * -----------------------------------------------------------------
 * 15-Oct-2020    -                      Esha Joshi      Created
 *
 *
 *
 *********************************************************************/
import React from "react";
import { getLogs } from "../../Services/jobsService";
import moment from "moment";
import ReactPaginate from "react-paginate";

function Log(props) {
  const [loading, setLoading] = React.useState(false);
  const [logs, setLogs] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  // Call to get job details API
  React.useEffect(() => {
    getLogs(props.jobId, setLogs, setLoading, page, setTotalPage);
  }, [props.jobId, page]);

  let pageClickHandler;

  const handlePageClick = (data) => {
    clearTimeout(pageClickHandler);
    pageClickHandler = setTimeout(() => {
      setPage(parseInt(data.selected) + 1);
    }, 300);
  };
  return (
    (loading && (
      <tr className="loadingSearchItem loaders">
        <td colSpan="6" className="text-center">
          <div class="spinner-border text-dark" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </td>
      </tr>
    )) || (
      <>
        <div>
          {logs.map((data, index) => (
            <div className="bg-white py-4 mx-4 font" key={index}>
              <div className="d-lg-flex justify-content-between job-description-font-custom">
                <div dangerouslySetInnerHTML={{ __html: data.action }}>
                  {/* <span className="text-primary">"Jayashri Kuntamukkala" </span>
            <span>resume is Submitted</span> */}
                </div>
                <div className="description-color pr-lg-5">
                  {moment(data.created_at).format("MMMM Do YYYY")}
                </div>
              </div>
              <div className="pb-3">
                By: {data.username ? data.username : "N/A"}
              </div>
              <div className="hr-remark"></div>
            </div>
          ))}
        </div>
        {totalPage > 1 && (
          <div className="px-3 py-2 d-flex justify-content-end">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={totalPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              forcePage={page - 1}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"activePagination"}
            />
          </div>
        )}
      </>
    )
  );
}

export default Log;
