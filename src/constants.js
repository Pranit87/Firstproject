//ENUM values for Status
export const Status = {
  3: "Closed",
  1: "Active",
  4: "Hold",
  0: "Inactive",
  2: "Deleted",
};
//ENUM values for Job Category
export const JobCategory = {
  1: "IT",
  2: "NON-IT",
  3: "LIGHT INDUSTRIAL",
  4: "BANKING / FINANCE",
  5: "ENERGY / GAS",
  6: "Contingent Labor_All",
  7: "Accounting/Finance",
  8: "Admin/Call Center",
  9: "Digital/Creative",
  10: "HR",
  11: "Legal",
  12: "Marketing/Sales",
  13: "Project Management",
  14: "Medical",
  15: "Pharmaceutialc/Biotech",
  16: "Others",
  17: "Service/Maintenance",
  18: "Scientific",
};
//Carrer Builder Freshness Dropdown Value
export const freshnessDays = [
  { value: "1DAY", label: "Since Yesterday" },
  { value: "7DAYS", label: "Last 7 days" },
  { value: "30DAYS", label: "Last 30 days" },
  { value: "90DAYS", label: "Last 90 days" },
  { value: "180DAYS", label: "Last 180 days" },
  { value: "270DAYS", label: "Last 270 days" },
  { value: "1YEAR", label: "Last 365 days" },
];
export const freshnessTypes = [
  { value: "lastActivity", label: "Last Activity" },
  { value: "lastModified", label: "Resume Modified" },
];

export const interviewTypes = [
  { value: "1", label: "Audio" },
  { value: "2", label: "Video" },
  { value: "3", label: "In-Person" },
];

//Employee Muster Page (Stats.js)
export const Medoptions = [
  { value: "1", label: "Yes" },
  { value: "2", label: "No" },
];

export const HRapprove = [
  { value: "1", label: "HR Approval Pending" },
  { value: "2", label: "Approved" },
];

//AddEmployee (EmployeeForm.js)
export const Gender = [
  { value: "1", label: "Male" },
  { value: "2", label: "Female" },
];

export const OTCalulation = [
  { value: "1", label: "Above 40 Weekly" },
  { value: "2", label: "Above 8 Daily" },
];
export const PayFrequency = [
  { value: "1", label: "Monthly" },
  { value: "2", label: "Semi-Monthly" },
  { value: "3", label: "Bi-Weekly" },
  { value: "4", label: "Weekly" },
];
export const BillFrequency = [
  { value: "1", label: "Monthly" },
  { value: "2", label: "Semi-Monthly" },
  { value: "3", label: "Bi-Weekly" },
  { value: "4", label: "Weekly" },
];
export const EMP = [
  { value: "3", label: "New Hire" },
  { value: "4", label: "Rehire" },
  { value: "5", label: "Active" },
];
export const EMP_Type = [
  { value: "1", label: "W2" },
  { value: "2", label: "C2C" },
  { value: "3", label: "1099" },
  { value: "4", label: "OPT-W2" },
  { value: "5", label: "IND-Abroad" },
];
export const PayRate = [
  { value: "1", label: "Hourly" },
  { value: "2", label: "Daily" },
  { value: "4", label: "Weekly" },
  { value: "5", label: "Monthly" },
  { value: "3", label: "Annually" },
];
export const PaymentTerms = [
  { value: "1", label: "Net 0" },
  { value: "2", label: "Net 30" },
];
export const PTOtype = [
  { value: "1", label: "Fixed" },
  { value: "2", label: "Accrual" },
];

export const Staff_Company = [
  { value: "1", label: "VMS" },
  { value: "2", label: "ATS" },
];

export const Staff_Type = [
  // { value: "1", label: "Contractor" },
  { value: "2", label: "Employee" },
  { value: "3", label: "Part-Time Contractor" },
  { value: "4", label: "Full-Time Contractor" },
];

export const TimesheetStatus = [
  { value: "1", label: "Approved" },
  { value: "2", label: "Rejected" },
  { value: "3", label: "Submitted For Approval" },
];

export const Weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const ActivityPeriod = [
  { value: "0", label: "All Period" },
  { value: "1", label: "Today" },
  { value: "2", label: "Previous Day" },
  { value: "3", label: "This Week" },
  { value: "4", label: "Previous Week" },
];

export const Grievance = [
  { value: "1", label: "Grievance" },
  { value: "2", label: "General" },
  { value: "3", label: "Notes" },
];
