/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number       Developer       Description
 * --------------------------------------------------------------------
 * 05-Oct-2020    -                                         Created
 * 19-Oct-2020    DONUT_STABLE              Esha Joshi      Added code for donut chart
 * 21-Oct-2020    master                    Esha Joshi      API integration for donut chart
 * 26-Oct-2020    LINECHART_DOUGHNUTCHART_  Vikas Saxena    Doughnut Chart Modification with
 *                STABLE                                    dynamic tab funtionality
 *
 *
 *********************************************************************/

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { getDoughnutData } from "../../Services/homeServices";
import "./home.css";

//donut chart//
const DonutChart = (props) => {
  const { tab } = props;
  const [chartData, setchartData] = React.useState(null);

  React.useEffect(() => {
    getDoughnutData(tab, setchartData);
  }, [tab]);

  return (
    <div className="chart">
      {chartData ? (
        <Doughnut
          data={chartData}
          options={{
            layout: {
              padding: {
                bottom: 10,
                top: 10,
              },
            },
            responsive: true,
            // maintainAspectRatio: false,
            legend: {
              position: "right",
              labels: {
                boxWidth: 15,
                fontFamily: "Calibri",
                fontSize: 20,
              },
            },
            onHover: function (evt, elements) {
              if (elements && elements.length) {
                this.segment = elements[0];
                this.chart.update();
                //  const selectedIndex = this.segment["_index"];
                this.segment._model.outerRadius += 8;
              } else {
                if (this.segment) {
                  this.segment._model.outerRadius -= 8;
                }
                this.segment = null;
              }
            },
          }}
        />
      ) : (
        <Doughnut
          data={{
            labels: ["No Data Available"],
            datasets: [
              {
                data: [""],
                backgroundColor: [
                  "rgb(251, 166, 21)",
                  "rgb(13, 77, 226)",
                  "rgb(51, 190, 242)",
                  "rgb(203, 33, 6)",
                  "rgb(93, 190, 45)",
                ],
                borderColor: "#fff",
                borderWidth: 1,
                hoverBorderColor: "#fff",
                hoverBorderWidth: 1,
              },
            ],
          }}
          options={{
            layout: {
              padding: {
                bottom: 10,
                top: 10,
              },
            },
            responsive: true,
            // maintainAspectRatio: false,
            legend: {
              position: "bottom",
              labels: {
                boxWidth: 15,
                fontFamily: "Calibri",
                fontSize: 20,
              },
            },
            onHover: function (evt, elements) {
              if (elements && elements.length) {
                this.segment = elements[0];
                this.chart.update();
                //  const selectedIndex = this.segment["_index"];
                this.segment._model.outerRadius += 8;
              } else {
                if (this.segment) {
                  this.segment._model.outerRadius -= 8;
                }
                this.segment = null;
              }
            },
          }}
        />
      )}
    </div>
  );
};

export default DonutChart;
