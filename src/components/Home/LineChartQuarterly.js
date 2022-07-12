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
import { getQuarterlyData } from "../../Services/homeServices";

const LineChartQuarterly = (props) => {
  const [chartData, setChartData] = React.useState({});
  const [chartDatasubmission, setChartDatasubmission] = React.useState({});
  const [chartDatainterviews, setChartDatainterviews] = React.useState({});
  const [chartDataoffers, setChartDataoffers] = React.useState({});

  React.useEffect(() => {
    setChartData({});
    getQuarterlyData(
      props.graphOptions,
      setChartDatasubmission,
      setChartDatainterviews,
      setChartDataoffers
    );
  }, [props.graphOptions]);
  return (
    <div className="chart">
      {props.graphOptions === "submissions" && (
        <Line
          data={chartDatasubmission || {}}
          options={{
            responsive: true,
            legend: {
              position: "bottom",
              labels: { boxWidth: 15, fontFamily: "Calibri", fontSize: 15 },
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
              labels: { boxWidth: 15, fontFamily: "Calibri", fontSize: 15 },
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
              labels: { boxWidth: 15, fontFamily: "Calibri", fontSize: 15 },
            },
          }}
        />
      )}
    </div>
  );
};

export default LineChartQuarterly;
