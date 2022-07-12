import axios from "axios";

export const postAddClients = async (values, setNotify, setSubmitting) => {
  try {
    setSubmitting(true);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/addClients`,
      method: "POST",
      params: {
        clientName: values.clientName,
        clientType: values.clientType,
        mspId: values.mspId,
        industryBusinessType: values.industryBusinessType,
        city: values.city,
        address: values.address,
        state: values.state[0],
        region: values.region,
        scheduledDate: values.scheduledDate,
        emailAlias: values.emailAlias,
        vmo: values.vmo,
        vms: values.vms,
        msa: values.msa,
      },
    };
    const response = await axios(request);
    if (response.status === 201) {
      console.log("response");
      setNotify({
        show: true,
        description: response.data.success.message,
        type: "success",
      });
      setSubmitting(false);
    }
  } catch (err) {
    setNotify({
      show: true,
      description:
        err.response?.data?.error?.message ||
        err.response?.data?.success?.message ||
        "Failed to add client.",
      type: "danger",
    });
    setSubmitting(false);
  }
};

export const SaveAddRequirement = async (values, setNotify, setSubmitting) => {
  try {
    setSubmitting(true);
    setNotify({
      show: false,
      description: "",
      type: "",
    });
    const teamId = values.team.map((data) => data.id);

    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/saveRequirement`,
      method: "POST",
      params: {
        client_id: values.client,
        type: values.type,
        salary: values.salary,
        bill_rate: values.billrate,
        pay_rate: values.payrate,
        contract_duration: values.contract,
        location: values.location,
        job_title: values.title,
        job_id: values.jobId,
        release_date: values.release,
        received_date: values.received,
        markup: values.markup,
        corp_to_corp: values.c2c,
        no_of_positions: values.position,
        no_slots_filled: values.slot,
        maximum_number_of_submission: values.submission,
        job_category: values.jobcategory,
        job_description: values.description,
        remarks: values.remark,
        is_dhm: values.dhm,
        teamIds: teamId,
      },
    };
    const response = await axios(request);
    if (response.status === 200) {
      setNotify({
        show: true,
        description: "Requirement Added",
        type: "success",
      });
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setSubmitting(false);
    }
  } catch (err) {
    const data = err.response.data;
    setNotify({
      show: true,
      description: `${data.success.message}`,
      type: "danger",
    });
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setSubmitting(false);
  }
};

export const getSavedRequirement = async (
  setUpdateRequirementData,
  jobId,
  setProfileLoading
) => {
  setProfileLoading(true);
  try {
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/requirementDetails/${jobId}`,
    };
    const response = await axios(request);
    if (response.status === 200) {
      setProfileLoading(false);
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setUpdateRequirementData(response.data.payload.requirement);
    }
  } catch (error) {
    console.log(error);
    setProfileLoading(false);
  }
};

export const postUpdateRequirement = async (
  values,
  setNotify,
  setSubmitting
) => {
  try {
    setSubmitting(true);
    const teamId = values.team.map((data) => data.id);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/requirement/updateRequirement`,
      method: "PUT",
      data: {
        client_id: values.client,
        type: values.type,
        salary: parseInt(values.salary),
        bill_rate: parseInt(values.billrate),
        pay_rate: parseInt(values.payrate),
        contract_duration: parseInt(values.contract),
        location: values.location,
        job_title: values.title,
        job_id: values.jobId,
        release_date: values.release,
        received_date: values.received,
        markup: parseInt(values.markup),
        corp_to_corp: values.c2c,
        no_of_positions: values.position,
        no_slots_filled: values.slot,
        maximum_number_of_submission: values.submission,
        job_category: values.jobcategory,
        job_description: values.description,
        remarks: values.remark,
        is_dhm: values.dhm,
        team_id: teamId,
        requirement_id: values.requirementId,
      },
    };

    const response = await axios(request);
    if (response.status === 200) {
      setSubmitting(false);

      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setNotify({
        show: true,
        description: response.data.success.message,
        type: "success",
      });
    }
  } catch (error) {
    setSubmitting(false);
    console.log(error);
  }
};
