import React from "react";
import DonutChart from "./DonutChart";
import LineChart from "./LineChart";
import LineChartMonthly from "./LineChartMonthly";
import LineChartQuarterly from "./LineChartQuarterly";
import "./home.css";
import { useUsers } from "../../Services/usersService";

const Graphs = (props) => {
  const [graphOptions, setGraphOptions] = React.useState("submissions");
  const { currentUser } = useUsers();
  const { permissions } = currentUser;
  const [key, setKey] = React.useState("daily");

  const updateGraph = (e) => {
    setGraphOptions(e.target.value);
  };
  return (
    <React.Fragment>
      <div className="mx-5 my-4 pb-5 pt-1">
        <div className="inner">
          <div className="row">
            <div className="col-lg">
              {permissions && permissions.VIEW_HOME_LINE_CHART && (
                <div className="flex-fill rounded shadow font box-color w-100 line-donut-chart-css">
                  <h2 id="my_performance" className="text-white rounded-top">
                    My Performance
                  </h2>
                  <div className="d-inline-block">
                    <ul
                      className="nav mb-3 mx-4 pt-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li
                        className="nav-item"
                        role="presentation"
                        id="weekly-li"
                      >
                        <a
                          className="nav-link active show text-white rounded-left border-right px-4"
                          id="pills-weekly-tab"
                          data-toggle="pill"
                          href="#pills-weekly"
                          role="tab"
                          aria-controls="line-weekly"
                          aria-selected="true"
                        >
                          Weekly
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        role="presentation"
                        id="biweekly-li"
                      >
                        <a
                          className="nav-link text-white rounded-0 border-right px-4"
                          id="pills-biweekly-tab"
                          data-toggle="pill"
                          href="#pills-biweekly"
                          role="tab"
                          aria-controls="line-biweekly"
                          aria-selected="false"
                        >
                          Monthly
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        role="presentation"
                        id="monthly-li"
                      >
                        <a
                          className="nav-link text-white rounded-right px-4"
                          id="pills-monthly-tab"
                          data-toggle="pill"
                          href="#pills-monthly"
                          role="tab"
                          aria-controls="line-monthly"
                          aria-selected="false"
                        >
                          Quarterly
                        </a>
                      </li>
                      <select
                        name="submissions"
                        id="submissions"
                        className="btn btn-light shadow-sm bg-light ml-2 text-center linechartColorButton"
                        onChange={updateGraph}
                        style={{ padding: "2px" }}
                        value={graphOptions}
                      >
                        <option
                          selected="true"
                          value="submissions"
                          className="text-center"
                        >
                          Submissions
                        </option>
                        <option value="interviews" className="text-center">
                          Interviews
                        </option>
                        <option value="offers" className="text-center">
                          Offers
                        </option>
                      </select>
                    </ul>
                  </div>

                  <div className="tab-content px-4" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-weekly"
                      role="tabpanel"
                      aria-labelledby="line-weekly"
                    >
                      {<LineChart graphOptions={graphOptions} />}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-biweekly"
                      role="tabpanel"
                      aria-labelledby="line-biweekly"
                    >
                      {<LineChartMonthly graphOptions={graphOptions} />}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-monthly"
                      role="tabpanel"
                      aria-labelledby="line-monthly"
                    >
                      {<LineChartQuarterly graphOptions={graphOptions} />}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="col-lg">
              {permissions && permissions.VIEW_HOME_DONUT_CHART && (
                <div className="flex-fill rounded shadow font box-color w-100">
                  <h2 id="my_performance" className="text-white rounded-top">
                    Daily Activity (KPI)
                  </h2>
                  <ul
                    className="nav nav-fill mb-3 mx-4 pt-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li
                      className="nav-item"
                      role="presentation"
                      id="weekly-li"
                      onClick={() => setKey("daily")}
                    >
                      <a
                        className="nav-link active show text-white rounded-left border-right"
                        id="pills-weekly-tab"
                        data-toggle="pill"
                        href="#pie-weekly"
                        role="tab"
                        aria-controls="pie-weekly"
                        aria-selected="true"
                      >
                        Today
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      role="presentation"
                      id="biweekly-li"
                      onClick={() => setKey("weekly")}
                    >
                      <a
                        className="nav-link text-white rounded-0 border-right"
                        id="pills-biweekly-tab"
                        data-toggle="pill"
                        href="#pie-biweekly"
                        role="tab"
                        aria-controls="pie-biweekly"
                        aria-selected="false"
                      >
                        This Week
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      role="presentation"
                      id="monthly-li"
                      onClick={() => setKey("monthly")}
                    >
                      <a
                        className="nav-link text-white rounded-right"
                        id="pills-monthly-tab"
                        data-toggle="pill"
                        href="#pie-monthly"
                        role="tab"
                        aria-controls="pie-monthly"
                        aria-selected="false"
                      >
                        This Month
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active "
                      id="pie-weekly"
                      role="tabpanel"
                      aria-labelledby="pills-weekly-tab"
                    >
                      {key === "daily" ? <DonutChart tab={key} /> : null}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pie-biweekly"
                      role="tabpanel"
                      aria-labelledby="pills-biweekly-tab"
                    >
                      {key === "weekly" ? <DonutChart tab={key} /> : null}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pie-monthly"
                      role="tabpanel"
                      aria-labelledby="pills-monthly-tab"
                    >
                      {key === "monthly" ? <DonutChart tab={key} /> : null}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Graphs;
