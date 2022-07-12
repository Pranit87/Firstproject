/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number    Developer         Description
 * ------------------------------------------------------------------
 * 05-Oct-2020    CANDIDATE_STABLE       Abhishek Datar    Created. Common function to format
 *                                                         iso date across the application in
 *                                                         standard format Day Month Date Year
 *                                                         Example: Wed Feb 16 2020
 *
 *
 *
 *********************************************************************/

const formatDate = (dateReceived) => {
  var date = new Date(dateReceived);
  return date.toDateString();
};

export default formatDate;
