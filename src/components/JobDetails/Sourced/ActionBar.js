import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";

const ActionBar = ({ resumeURl }) => (
  <div className="float-right">
    {/* <a href="/">
      <img src="/images/checklist-small.png" alt="" /> &nbsp; &nbsp;
    </a>
    <a href="/">
      <img src="/images/call-small.png" alt="" />
      &nbsp; &nbsp;
    </a>
    <a href="/">
      <img src="/images/email-small.png" alt="" />
      &nbsp; &nbsp;
    </a>
    <a href="/">
      <img src="/images/text-small.png" alt="" />
      &nbsp; &nbsp;
    </a> */}
    <a href={resumeURl} target="_blank">
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="button-tooltip-2">Download Resume</Tooltip>}
      >
        {resumeURl && <Download className="viewResumeIcon" />}
      </OverlayTrigger>
    </a>
  </div>
);

export default ActionBar;
