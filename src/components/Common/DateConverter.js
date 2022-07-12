import { add } from "date-fns";

export const convertDateStringToLocalDatetime = (dateStr) => {
  if (dateStr) {
    let newDate = new Date(dateStr);
    // timezone offset is in minutes, can be positive or negative
    return add(newDate, { minutes: newDate.getTimezoneOffset() });
  }
  return null;
};
