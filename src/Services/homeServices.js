/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number           Description
 * -------------------------------------------------------
 * 26-Oct-2020    LINECHART_DOUGHNUTCHART_      Doughnut Chart API Integration
 *                STABLE
 * 01-Nov-2020    master                        Moved the service calls for incentive calculator here
 *                                              from presentation layer
 * 9 nov-2020     master                        performer api
 *
 *********************************************************************/
import axios from "axios";
import { format } from "date-fns";

// export const Calculator = async (calculate) => {
//   // const token = localStorage.getItem("token");

//   try {
//     const request = {
//       url: `${process.env.REACT_APP_API_BASEURL}/revenueCalculator/W2/18/50/85`,
//     };
//     const response = await axios(request);
//     if (response.status === 200) {
//       calculate(response.data.payload);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getDoughnutData = async (tab, setchartData) => {
  try {
    let now = new Date();
    let fromdate = null;
    let toDate = null;
    if (tab === "daily") {
      var nowStart = format(
        new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        "yyyy-MM-dd'T'HH:mm:ss'Z'"
      );
      var nowEnd = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
      console.log("ISO string", nowStart, nowEnd);
      fromdate = nowStart;
      toDate = nowEnd;
    }
    if (tab === "weekly") {
      var day = now.getDay();

      var diff = now.getDate() - day + (day === 0 ? -6 : 1); // 0 for sunday

      var week_start_tstmp = now.setDate(diff);

      var week_start = new Date(week_start_tstmp);

      var week_start_date = format(
        new Date(
          week_start.getFullYear(),
          week_start.getMonth(),
          week_start.getDate()
        ),
        "yyyy-MM-dd'T'HH:mm:ss'Z'"
      );
      fromdate = week_start_date;
      toDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
    }
    if (tab === "monthly") {
      var first_day = format(
        new Date(now.getFullYear(), now.getMonth(), 1),
        "yyyy-MM-dd'T'HH:mm:ss'Z'"
      );
      fromdate = first_day;
      toDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
    }
    if (fromdate && toDate) {
      const request = {
        url: `${process.env.REACT_APP_API_BASEURL}/donut/${fromdate}/${toDate} `,
      };

      const response = await axios(request);

      if (
        response.status === 200 &&
        Object.keys(response.data.payload).length > 0
      ) {
        let category = [];
        let activity_count = [];
        for (const dataObj of response.data.payload) {
          category.push(dataObj.category);
          activity_count.push(dataObj.activity_count);
        }
        setchartData({
          labels: category,
          datasets: [
            {
              data: activity_count,
              backgroundColor: [
                "rgb(251, 166, 21)",
                "rgb(13, 77, 226)",
                "rgb(51, 190, 242)",
                "rgb(203, 33, 6)",
                "rgb(93, 190, 45)",
                "rgb(255, 245, 61)",
              ],
              borderColor: "#fff",
              borderWidth: 1,
              hoverBorderColor: "#fff",
              hoverBorderWidth: 1,
            },
          ],
        });
      } else {
        setchartData(null);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

/* Service call for Clients dropdown in Incentive Calculator  */
export const ClientDropdown = async (setClientOptions) => {
  try {
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/incentiveClientsDropdown`,
    };
    const response = await axios(request);
    if (response.status === 200) {
      setClientOptions(response.data.payload);
    }
  } catch (error) {
    console.log(error);
  }
};

/* Service call for calculating incentive */

export const Calculate = async (
  empType,
  clients,
  payRate,
  billRate,
  setCalcData,
  setOpenLoading,
  setSpinnerLoading,
  setAlertLoading
) => {
  try {
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/revenueCalculator/${empType}/${clients}/${payRate}/${billRate}`,
    };
    const response = await axios(request);
    if (response.status === 200) {
      setCalcData(response.data.payload);
    }
  } catch (error) {
    console.log(error);
    setAlertLoading(true);
  } finally {
    setOpenLoading(false);
    setSpinnerLoading(false);
  }
};

export const postUploadResume = async (
  formdata,
  jobId,
  setUploadResumedata,
  setUploading,
  setLoading,
  setErrorMessage,
  setError
) => {
  try {
    setLoading(true);
    setUploading(true);
    setError(false);
    const formData = new FormData();
    for (let i = 0; i < formdata.length; i++) {
      formData.append("resumeFile[]", formdata[i]);
    }
    formData.append("job_id", jobId);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/resume/store`,
      method: "POST",
      data: formData,
    };
    const response = await axios(request);
    if (response.status === 200) {
      setLoading(false);
      console.log(response);
      if (response.data.success.message) {
        setUploadResumedata(response.data.success.message);
        setUploading(false);
      } else {
        setErrorMessage("Resume uploading failed");
        setUploading(false);
      }
    }
  } catch (error) {
    setLoading(false);
    setUploading(false);
    setError(true);
    setErrorMessage("Resume uploading failed");
  }
};

// display performers on dashboard

export const DisplayPerformer = async (setTopPerformer, setLoading) => {
  setLoading(true);
  try {
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/dashboard/performerOfTheMonth`,
      method: "POST",
    };
    const response = await axios(request);
    if (response.status === 200) {
      setLoading(false);
      setTopPerformer(response.data.payload);
    }
  } catch (error) {
    console.log(error);
  }
};

// line chart monthly data

export const getMonthlyData = async (
  graphOptions,
  setChartDatasubmission,
  setChartDatainterviews,
  setChartDataoffers,
  setIsLoading
) => {
  try {
    const recruiterData = localStorage.getItem("profile");
    const id = JSON.parse(recruiterData)["id"];
    const role = JSON.parse(recruiterData)["user_type"];
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/linechart/search/${id}/${role}/1`,
    };

    const response = await axios(request);
    if (response.status === 200) {
      setIsLoading(false);
      let monthNumber = [];
      let submitted = [];
      let submissionsmonthly = [];
      let interviewsmonthly = [];
      let offersmonthly = [];
      let totalInterviewRequested = [];
      let offerRequested = [];
      response.data.payload.achivedTargetsOfUser.map((data) => {
        monthNumber.push(data.monthNumber);
        submitted.push(data.submitted);
        totalInterviewRequested.push(data.totalInterviewRequested);
        offerRequested.push(data.offerRequested);
      });
      response.data.payload.targetsOfUserForAchive.map((data) => {
        for (var i = 0; i <= monthNumber.length; i++) {
          submissionsmonthly.push(data.submissionsmonthly);
          interviewsmonthly.push(data.interviewsmonthly);
          offersmonthly.push(data.offersmonthly);
        }
      });

      if (graphOptions === "submissions") {
        setChartDatasubmission({
          labels: monthNumber,
          datasets: [
            {
              label: "Submissions",
              data: submitted,
              backgroundColor: "#5dbe2d",
              borderColor: "#5dbe2d",
              fill: false,
              lineTension: 0,
              radius: 5,
              borderWidth: 1,
            },
            {
              label: "Company Expectations",
              data: submissionsmonthly,
              backgroundColor: "#fca40b",
              borderColor: "#fca40b",
              fill: false,
              lineTension: 0,
              radius: 5,
              borderWidth: 2,
            },
          ],
        });
      } else if (graphOptions === "interviews") {
        setChartDatainterviews({
          labels: monthNumber,
          datasets: [
            {
              label: "Interviews",
              data: totalInterviewRequested,
              backgroundColor: "#5dbe2d",
              borderColor: "#5dbe2d",
              fill: false,
              lineTension: 0,
              radius: 5,
              borderWidth: 1,
            },
            {
              label: "Company Expectations",
              data: interviewsmonthly,
              backgroundColor: "#fca40b",
              borderColor: "#fca40b",
              fill: false,
              lineTension: 0,
              radius: 5,
              borderWidth: 2,
            },
          ],
        });
      } else if (graphOptions === "offers") {
        setChartDataoffers({
          labels: monthNumber,
          datasets: [
            {
              label: "Offers",
              data: offerRequested,
              backgroundColor: "#5dbe2d",
              borderColor: "#5dbe2d",
              fill: false,
              lineTension: 0,
              radius: 5,
              borderWidth: 1,
            },
            {
              label: "Company Expectations",
              data: offersmonthly,
              backgroundColor: "#fca40b",
              borderColor: "#fca40b",
              fill: false,
              lineTension: 0,
              radius: 5,
              borderWidth: 2,
            },
          ],
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// line chart quarterly data

export const getQuarterlyData = async (
  graphOptions,
  setChartDatasubmission,
  setChartDatainterviews,
  setChartDataoffers
) => {
  try {
    const recruiterData = localStorage.getItem("profile");
    const id = JSON.parse(recruiterData)["id"];
    const role = JSON.parse(recruiterData)["user_type"];
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/linechart/search/${id}/${role}/2`,
    };

    const response = await axios(request);
    if (response.status === 200) {
      let quarterNumber = [];
      let submitted = [];
      let totalInterviewRequested = [];
      let offerRequested = [];
      let submissionsquarterly = [];
      let interviewsquarterly = [];
      let offersquarterly = [];

      response.data.payload.achivedTargetsOfUser.map((data) => {
        quarterNumber.push(data.quarterNumber);
        submitted.push(data.submitted);
        totalInterviewRequested.push(data.totalInterviewRequested);
        offerRequested.push(data.offerRequested);
      });
      response.data.payload.targetsOfUserForAchive.map((data) => {
        for (var i = 0; i <= quarterNumber.length; i++) {
          submissionsquarterly.push(data.submissionsquarterly);
          interviewsquarterly.push(data.interviewsquarterly);
          offersquarterly.push(data.offersquarterly);
        }
      });

      if (graphOptions === "submissions") {
        setChartDatasubmission({
          labels: quarterNumber,
          datasets: [
            {
              label: "Submissions",
              data: submitted,
              backgroundColor: "#5dbe2d",
              borderColor: "#5dbe2d",
              fill: false,
              lineTension: 0,
              radius: 5,
              borderWidth: 1,
            },
            {
              label: "Company Expectations",
              data: submissionsquarterly,
              backgroundColor: "#fca40b",
              borderColor: "#fca40b",
              fill: false,
              lineTension: 0,
              radius: 5,
              borderWidth: 2,
            },
          ],
        });
      } else if (graphOptions === "interviews") {
        setChartDatainterviews({
          labels: quarterNumber,
          datasets: [
            {
              label: "Interviews",
              data: totalInterviewRequested,
              backgroundColor: "#5dbe2d",
              borderColor: "#5dbe2d",
              fill: false,
              lineTension: 0,
              radius: 5,
              borderWidth: 1,
            },
            {
              label: "Company Expectations",
              data: interviewsquarterly,
              backgroundColor: "#fca40b",
              borderColor: "#fca40b",
              fill: false,
              lineTension: 0,
              radius: 5,
              borderWidth: 2,
            },
          ],
        });
      } else if (graphOptions === "offers") {
        setChartDataoffers({
          labels: quarterNumber,
          datasets: [
            {
              label: "Offers",
              data: offerRequested,
              backgroundColor: "#5dbe2d",
              borderColor: "#5dbe2d",
              fill: false,
              lineTension: 0,
              radius: 5,
              borderWidth: 1,
            },
            {
              label: "Company Expectations",
              data: offersquarterly,
              backgroundColor: "#fca40b",
              borderColor: "#fca40b",
              fill: false,
              lineTension: 0,
              radius: 5,
              borderWidth: 2,
            },
          ],
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// line chart weekly data

export const getWeeklyData = async (
  graphOptions,
  setChartDatasubmission,
  setChartDatainterviews,
  setChartDataoffers
) => {
  try {
    const recruiterData = localStorage.getItem("profile");
    const id = JSON.parse(recruiterData)["id"];
    const role = JSON.parse(recruiterData)["user_type"];
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/linechart/search/${id}/${role}/0`,
    };

    const response = await axios(request);
    if (response.status === 200) {
      let weekNumber = [];
      let submitted = [];
      let totalInterviewRequested = [];
      let offerRequested = [];
      let submissionsweekly = [];
      let interviewsweekly = [];
      let offersweekly = [];
      response.data.payload.achivedTargetsOfUser.map((data) => {
        weekNumber.push(data.weekNumber);
        submitted.push(data.submitted);
        totalInterviewRequested.push(data.totalInterviewRequested);
        offerRequested.push(data.offerRequested);
      });
      response.data.payload.targetsOfUserForAchive.map((data) => {
        for (var i = 0; i <= weekNumber.length; i++) {
          submissionsweekly.push(data.submissionsweekly);
          interviewsweekly.push(data.interviewsweekly);
          offersweekly.push(data.offersweekly);
        }
      });

      if (graphOptions === "submissions") {
        setChartDatasubmission({
          labels: weekNumber,
          datasets: [
            {
              label: "Submissions",
              data: submitted,
              backgroundColor: "#5dbe2d",
              borderColor: "#5dbe2d",
              fill: false,
              lineTension: 0,
              radius: 5,
              borderWidth: 1,
            },
            {
              label: "Company Expectations",
              data: submissionsweekly,
              backgroundColor: "#fca40b",
              borderColor: "#fca40b",
              fill: false,
              lineTension: 0,
              radius: 5,
              borderWidth: 2,
            },
          ],
        });
      } else if (graphOptions === "interviews") {
        setChartDatainterviews({
          labels: weekNumber,
          datasets: [
            {
              label: "Interviews",
              data: totalInterviewRequested,
              backgroundColor: "#5dbe2d",
              borderColor: "#5dbe2d",
              fill: false,
              lineTension: 0,
              radius: 5,
              borderWidth: 1,
            },
            {
              label: "Company Expectations",
              data: interviewsweekly,
              backgroundColor: "#fca40b",
              borderColor: "#fca40b",
              fill: false,
              lineTension: 0,
              radius: 5,
              borderWidth: 2,
            },
          ],
        });
      } else if (graphOptions === "offers") {
        setChartDataoffers({
          labels: weekNumber,
          datasets: [
            {
              label: "Offers",
              data: offerRequested,
              backgroundColor: "#5dbe2d",
              borderColor: "#5dbe2d",
              fill: false,
              lineTension: 0,
              radius: 5,
              borderWidth: 1,
            },
            {
              label: "Company Expectations",
              data: offersweekly,
              backgroundColor: "#fca40b",
              borderColor: "#fca40b",
              fill: false,
              lineTension: 0,
              radius: 5,
              borderWidth: 2,
            },
          ],
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
