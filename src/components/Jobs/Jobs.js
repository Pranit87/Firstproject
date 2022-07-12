import React from "react";
import { JobsFilter } from "./JobsFilter";
import { JobsList } from "./JobsList";
import { JobsExcel } from "./JobsExcel";
import "./Jobs.styles.css";
import { useUsers } from "../../Services/usersService";
import AccessDenied from "../Common/AccessDenied/AccessDenied";

export default () => {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [filters, setFilters] = React.useState({
    status: [],
    client: [],
    jobId: "",
    jobTitle: "",
    clientId: "",
    jobLocation: "",
    duration: "",
    jobCoverage: "",
  });
  const [downloadDataResponse, setDownloadDataResponse] = React.useState(false);
  const { currentUser } = useUsers();
  const { permissions } = currentUser;

  return (
    (Object.keys(permissions).length && !permissions.VIEW_JOB && (
      <AccessDenied />
    )) || (
      <>
        <JobsFilter
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setPage={setPage}
        />
        <JobsList
          startDate={startDate}
          endDate={endDate}
          page={page}
          setPage={setPage}
          filters={filters}
          setFilters={setFilters}
        />
        <JobsExcel
          filters={filters}
          startDate={startDate}
          endDate={endDate}
          downloadDataResponse={downloadDataResponse}
          setDownloadDataResponse={setDownloadDataResponse}
        />
      </>
    )
  );
};
