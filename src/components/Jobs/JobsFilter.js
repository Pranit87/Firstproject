import React from "react";
import "./Jobs.styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";

const CustomDatePicker = ({ value, setValue }) => {
  const RANGE = (x, y) =>
    Array.from(
      (function* () {
        while (x <= y) yield x++;
      })()
    );
  const years = RANGE(1990, getYear(new Date()) + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <DatePicker
      todayButton="Today"
      placeholderText={"MM/DD/YYYY"}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
          <select
            style={{ maxHeight: "25px", maxWidth: "100px" }}
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            style={{ maxHeight: "25px", maxWidth: "100px" }}
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      )}
      selected={value}
      onChange={(date) => setValue(date)}
    />
  );
};

export const JobsFilter = ({
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  setPage,
}) => {
  return (
    <div className="inner font mx-4 text-white mt-3">
      <div className="d-lg-flex justify-content-start">
        <span>Period</span>
      </div>
      <div className="d-lg-flex justify-content-start">
        <span>
          <CustomDatePicker value={startDate} setValue={setStartDate} />
        </span>
        <span className="mx-3 mt-2">to</span>
        <span>
          <CustomDatePicker value={endDate} setValue={setEndDate} />
        </span>

        <div className="ml-4 flex-fill align-bottom d-flex align-items-end">
          <a
            href="/"
            class="text-white clearFilter"
            onClick={(event) => {
              event.preventDefault();
              setStartDate("");
              setEndDate("");
              setPage(1);
            }}
          >
            Clear Filter
          </a>
        </div>
      </div>
    </div>
  );
};
