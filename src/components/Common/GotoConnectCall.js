import { postGotoCallAPI } from "../../Services/jobsService";
function formatPhoneNumber(phoneNumberString) {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "").slice(-10);
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return null;
}

export const clicktocal = (tonum, userKey) => {
  if (userKey && tonum) {
    const newData = {
      user_key: userKey,
      phone_number: formatPhoneNumber(tonum),
      // phone_number: "(510) 787-8073",
    };
    // Call Candidate
    if (newData) postGotoCallAPI(newData);
  }
};
