/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number   Developer         Description
 * --------------------------------------------------------------------
 * 05-Oct-2020    CANDIDATE_STABLE      Abhishek Datar    Created. Common function to format
 *                                                        string across the application to convert
 *                                                        first letter of each word to uppercase
 *                                                        Example: hello world > Hello World
 *
 *
 *
 *
 *********************************************************************/

const firstLetterUppercase = (str) => {
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
};

export default firstLetterUppercase;
