import React from "react";
import ReactPaginate from "react-paginate";
import Select from 'react-select';

const Master = ({ loading, error, myMasterData, totalPage, page, setPage }) => {
  let pageClickHandler;

  const handlePageClick = (data) => {
    clearTimeout(pageClickHandler);
    pageClickHandler = setTimeout(() => {
      setPage(parseInt(data.selected) + 1);
    }, 300);
  };

  const handleButtonColor = (status)=>{
    switch(status){
      case "Submitted" : return  "b-color-search-description";
      case "Interviewed" : return "btn-warning";
      case "Offers": return "btn-success";
      case "Rejected": return "btn-danger";
      case "Backed Out Or Rejected" : return "btn-dark";
      case "Others" : return "btn-secondary";
    }
  };

  return (
    <div className="pb-5 pt-3 px-3">
      <table className="table table-hover">
        <thead className="table-head-bg-color">
          <tr>
            <th scope="col" className="py-2">
              Req. Id
            </th>
            <th scope="col" className="py-2">
              Client Name
            </th>
            <th scope="col" className="py-2">
              Job Title
            </th>
            <th scope="col" className="py-2">
              Recruiter Name
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
              Interview Date
            </th>
            <th scope="col" className="py-2" style={{width:"12%"}}>
                <select name="select" className="form-control">
                  <option selected="true" value="">
                    All Status
                  </option>
                  <option value={1}>Active</option>
                  <option value={2}>Inactive</option>
                  <option value={3}>Closed</option>
                  <option value={4}>Hold</option>
                </select>
            </th>
            <th scope="col" className="py-2">
              Updated On
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
            myMasterData.map((row) => (
              <tr>
                <td className="py-2">{row.id}</td>
                <td className="py-2">{row.client_name}</td>
                <td className="py-2">{row.j_title}</td>
                <td className="py-2">{row.author_name}</td>
                <td className="py-2">{row.candidate}</td>
                <td className="py-2">{row.br}</td>
                <td className="py-2">{row.pr}</td>
                <td className="py-2">{row.created_at}</td>
                <td className="py-2">
                  <button style={{width:"100%"}}
                  className={`btn btn-sm text-white ${handleButtonColor(row.rrm_status)}`}>
                  {row.rrm_status}
                  </button>
                </td>
                <td className="py-2">{row.submission_date}</td>
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
export default Master;
