/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number   Developer         Description
 * ------------------------------------------------------------------
 * 05-Oct-2020    -                     Abhishek Datar    Created
 *
 *
 *
 *
 *********************************************************************/

import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { getMonthlyData } from "../../Services/homeServices";
import { Spinner } from "react-bootstrap";

const LineChartMonthly = (props) => {
  const [chartData, setChartData] = React.useState({});
  const [chartDatasubmission, setChartDatasubmission] = React.useState({});
  const [chartDatainterviews, setChartDatainterviews] = React.useState({});
  const [chartDataoffers, setChartDataoffers] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setChartData({});
    getMonthlyData(
      props.graphOptions,
      setChartDatasubmission,
      setChartDatainterviews,
      setChartDataoffers,
      setIsLoading
    );
  }, [props.graphOptions]);
  return (
    <React.Fragment>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <div className="chart">
          {props.graphOptions === "submissions" && (
            <Line
              data={chartDatasubmission || {}}
              options={{
                responsive: true,
                legend: {
                  position: "bottom",
                  labels: {
                    boxWidth: 15,
                    fontFamily: "Calibri",
                    fontSize: 15,
                  },
                },
              }}
            />
          )}
          {props.graphOptions === "interviews" && (
            <Line
              data={chartDatainterviews || {}}
              options={{
                responsive: true,
                legend: {
                  position: "bottom",
                  labels: {
                    boxWidth: 15,
                    fontFamily: "Calibri",
                    fontSize: 15,
                  },
                },
              }}
            />
          )}
          {props.graphOptions === "offers" && (
            <Line
              data={chartDataoffers || {}}
              options={{
                responsive: true,
                legend: {
                  position: "bottom",
                  labels: {
                    boxWidth: 15,
                    fontFamily: "Calibri",
                    fontSize: 15,
                  },
                },
              }}
            />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default LineChartMonthly;
