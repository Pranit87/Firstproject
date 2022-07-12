/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number   Developer         Description
 * --------------------------------------------------------------------
 * 19-Oct-2020    CANDIDATE_STABLE      Esha Joshi        Created
 *
 *
 *
 *
 *********************************************************************/

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SelectDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      filterDate={(date) => date.getDay() != 6 && date.getDay() != 0}
      className="form-control"
      required
      placeholderText="&#xf133;"
      showTimeInput
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

export default SelectDate;
