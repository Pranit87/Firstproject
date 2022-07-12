import { EMP, Gender, EMP_Type, PayRate, Grievance } from "../../../constants";

export const EmployeeStatus = ({ id }) => {
  let empStatus = [];
  empStatus = EMP.filter((row) => row.value == id);
  return empStatus.length > 0 ? empStatus[0].label : null;
};

export const EmployeeType = ({ id }) => {
  let empType = [];
  empType = EMP_Type.filter((row) => row.value == id);
  return empType.length > 0 ? empType[0].label : null;
};

export const PayFrequency = ({ id }) => {
  let payFreq = [];
  payFreq = PayRate.filter((row) => row.value == id);
  return payFreq.length > 0 ? payFreq[0].label : null;
};

export const GenderValue = ({ id }) => {
  let gender = [];
  gender = Gender.filter((row) => row.value == id);
  return gender.length > 0 ? gender[0].label : null;
};

export const VCareCategory = ({ id }) => {
  let category = [];
  category = Grievance.filter((row) => row.value == id);
  return category.length > 0 ? category[0].label : null;
};
