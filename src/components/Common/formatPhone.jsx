/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number   Developer           Description
 * -------------------------------------------------------------------
 * 05-Oct-2020    CANDIDATE_STABLE      Abhishek Datar      Created. Common function to format
 *                                                           phone numbers across the application in
 *                                                           standard format (XXX) XXX-XXXX
 *
 *
 *
 *********************************************************************/

const formatPhone = (phoneNumber) => {
  var cleaned = ("" + phoneNumber).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return null;
};

export default formatPhone;
