import React from "react";

export const DefaultTemplate = (props) => {
  if (Object.keys(props).length) {
    return `<div>Hi [Candidate Name],</div><br/>Rather than interrupting you at 
  work with a phone call,I thought it would be better if I sent you an email. 
  My name is ${props.senderName}. I am a ${props.senderRole[0].rolename} 
  with ${props.senderOrg[0].name}. While working on a direct client requirement, I found your resume a very positive match for the position of ${props.reqName}<br/><br/>Location:${props.reqLocation}<br/>Contract Duration:${props.reqContractDetails}
  <br/><br/>Job Description: <br/> ${props.reqJobDesc}`;
  }
};
