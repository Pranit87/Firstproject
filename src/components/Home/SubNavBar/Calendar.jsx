import React from "react";
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

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
//import timeGridPlugin from "@fullcalendar/timegrid";

//import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

export const Calendar = () => {
  const events = [{ title: "today's event", date: new Date() }];

  return (
    <div className="App">
      <FullCalendar
        defaultView="dayGridMonth"
        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        plugins={[dayGridPlugin]}
        events={events}
        contentHeight="auto"
        contentWidth="auto"
      />
    </div>
  );
};
