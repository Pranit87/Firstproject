import { postCallAPI } from "../../Services/jobsService";

const ClickToCallLog = (
  fromnum,
  tonum,
  resume_id,
  requirement_id,
  resume_requirement_map_id
) => {
  var todayDate = new Date();
  let callLogData = {
    fromnum: fromnum,
    tonum: tonum,
    resume_id: resume_id || "",
    requirement_id: requirement_id || "",
    resume_requirement_map_id: resume_requirement_map_id || "",
    timeOfCall: todayDate,
  };
  let callTimer;
  clearTimeout(callTimer);
  callTimer = setTimeout(() => {
    postCallAPI(callLogData);
  }, 5000);
};
export default ClickToCallLog;
