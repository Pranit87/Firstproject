import React from "react";
import { format } from "date-fns";
import { Container, Row, Col } from "react-bootstrap";
import { getHistoryData } from "../../Services/candidateServices";
import ReactPaginate from "react-paginate";
import "./candidates.css";

function History(props) {
  const { data } = props;
  const { id } = props;
  const { statusData } = props;
  const [historyData, setHistoryData] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState(0);
  const [nextPage, setNextPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getHistoryData(id, nextPage, setHistoryData, setTotalPage, setLoading);
  }, [id, nextPage]);

  let pageClickHandler;

  const handlePageClick = (data) => {
    clearTimeout(pageClickHandler);
    pageClickHandler = setTimeout(() => {
      setNextPage(parseInt(data.selected) + 1);
    }, 300);
  };

  return (
    <div className="table-responsive-lg">
      <div className="px-2">
        <Row className="no-gutters">
          <Col>
            <div className="h5 text-center">Candidate History</div>
            <table id="table-history" className="table table-hover">
              <thead className="table-head-bg-color">
                <tr className="">
                  <th scope="col">Id</th>
                  <th scope="col">Job Title</th>
                  <th scope="col">Client</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              {statusData &&
                statusData.map((row) => (
                  <tbody>
                    <tr className="">
                      <td aria-disabled>{row.id ? row.id : "N/A"}</td>
                      <td>
                        {row.job_title ? <span>{row.job_title}</span> : "N/A"}
                      </td>
                      <td>{row.client ? row.client : "N/A"}</td>
                      <td>{row.status ? row.status : "N/A"}</td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </Col>
          &nbsp;&nbsp;
          <Col>
            <div className="h5 text-center">Candidate Log</div>
            <table id="table-history" className="table table-hover">
              <thead className="table-head-bg-color">
                <tr className="">
                  <th scope="col" style={{ width: "50%" }}>
                    Actions
                  </th>
                  <th scope="col">Date-Time</th>
                  <th scope="col">Recruiter</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3">
                      <div
                        class="spinner-border spinnerCentered"
                        role="status"
                      ></div>
                    </td>
                  </tr>
                ) : (
                  ""
                )}
                {historyData.map((row) => (
                  <tr>
                    <td aria-disabled>
                      {row.action ? (
                        <span
                          dangerouslySetInnerHTML={{ __html: row.action }}
                          className="not-active"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      {row.created_at
                        ? format(new Date(row.created_at), "dd-MM-yyyy")
                        : "N/A"}
                    </td>
                    <td>{row.user ? row.user["username"] : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <span className={"page "}>
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
            </span>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default History;
