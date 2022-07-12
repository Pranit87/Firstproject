/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number   Developer         Description
 * --------------------------------------------------------------------
 * 01-Nov-2020    master                Abhishek Datar    Created. Common function to format
 *                                                        string and return only relevant words for resume highlight
 *                                                        Example: React and CSS OR python > react css python
 *
 *
 *
 *
 *********************************************************************/

// const parseSearchString = (str) => {
//   return str
//     ? str.toLowerCase().replaceAll("and", "").replaceAll("or", "").split(" ")
//     : "";
// };

const parseSearchString = (str) =>
  (str &&
    str
      .toLowerCase()
      .replaceAll("%2f", "/")
      .replaceAll("%23", "#")
      .replace(/[^a-z \/#\+\.]/g, "")
      .replace(/[+]/g,"\\$&")
      .replaceAll(" or", '"')
      .replaceAll(" and", '"')
      .replaceAll(" not", '"')
      .split('"')).filter(element => ![" .",".",". "].includes(element)) ||
  [];

export default parseSearchString;
