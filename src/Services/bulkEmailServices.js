import axios from "axios";
import isJSON from "is-json";
import { encrypt, decrypt } from "../components/Common/encDec";

// Service to fetch Default Template
export const getDefaultTemplate = async (
  reqId,
  userId,
  setDefaultTemplate,
  setLoading
) => {
  try {
    setLoading(true);
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/emailTemplates/defaultTemplate/${userId}/${reqId}`
    );
    setDefaultTemplate(response.data.payload);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

// Service to send email
export const sendEmail = async (
  resumeIds,
  reqId,
  mailSub,
  mailBody,
  setSendingEmail,
  setNotify,
  close,
  string,
  setResumeIds
) => {
  try {
    console.log("resumeIds", resumeIds);
    setNotify({
      show: false,
      description: "",
      type: "",
    });
    const resumeIdStr = resumeIds
      .reduce((a, c) => {
        a.push(c);
        return a;
      }, [])
      .join(",");
    const data = {
      from: "test@example.com",
      to: "test@example.com",
      resumeId: resumeIdStr,
      requirementId: reqId,
      mailSubject: mailSub,
      mailBody: mailBody,
    };
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/email/send`,
      method: "POST",
      data: data,
    };
    const response = await axios(request);
    if (response.status === 200 && string) {
      const localString =
        localStorage.getItem(encrypt(string)) &&
        localStorage.getItem(encrypt(string)).split(";");
      var existingLikedProfiles = [];
      const likedProfiles = localString && localString.find((row) => row);
      if (isJSON(likedProfiles)) {
        existingLikedProfiles = [
          ...existingLikedProfiles,
          ...JSON.parse(likedProfiles),
        ];
      }

      if (existingLikedProfiles.length) {
        const remainingProfiles = existingLikedProfiles.filter(
          (item) => !resumeIds.includes(item.resumeId)
        );
        localStorage.setItem(
          encrypt(string),
          JSON.stringify(remainingProfiles)
        );
      }
    }

    setResumeIds && setResumeIds([]);
    setNotify({
      show: true,
      title: "Success",
      description: response.data?.success?.message || "Email has been sent.",
      type: "success",
    });
  } catch (err) {
    console.log(err);
    setNotify({
      show: true,
      title: "Error",
      description:
        err.response?.data?.error?.message ||
        err.response?.data?.success?.message ||
        "Internal Server Error Occurred.",
      type: "danger",
    });
    setResumeIds && setResumeIds([]);
  } finally {
    setSendingEmail(false);
  }
};

// Service to create/update email template
export const createUpdateEmailTemplate = async (
  userId,
  templateName,
  templateData,
  actionType,
  templateId,
  setNotify,
  setSavingTemp
) => {
  try {
    setSavingTemp(true);
    const data = {
      userId,
      templateName,
      templateData,
      actionType,
      templateId,
    };
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/emailTemplates/createAndUpdate`,
      method: "POST",
      data: data,
    };
    const response = await axios(request);
    setNotify({
      show: true,
      title: "Success",
      description: "Template Created Successfully.",
      type: "success",
    });
  } catch (err) {
    setNotify({
      show: true,
      title: "Error",
      description:
        err.response.data.error.message || err.response.data.success.message,
      type: "danger",
    });
  } finally {
    setSavingTemp(false);
  }
};

// Service to fetch Created Templates
export const getCreatedTemplates = async (
  setCreatedTemplates,
  setLoadingTempOptions
) => {
  try {
    setLoadingTempOptions(true);
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/emailTemplates`
    );
    setCreatedTemplates(response.data.payload);
  } catch (err) {
    console.log(err);
  } finally {
    setLoadingTempOptions(false);
  }
};

// Service to fetch Selected Template content
export const getSelectedTemp = async (
  templateId,
  setLoading,
  setSelectedEmailTemp,
  setEmailContent
) => {
  try {
    setLoading(true);
    const response = await axios(
      `${process.env.REACT_APP_API_BASEURL}/emailTemplates/getTemplate/${templateId}`
    );
    setSelectedEmailTemp(
      response.data.payload && response.data.payload.template
    );
    setEmailContent(response.data.payload && response.data.payload.template);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

// Service to delete email templates
export const deleteEmailTemplate = async (
  templateId,
  setNotify,
  setDeleteRespLoading,
  setChecked
) => {
  try {
    setDeleteRespLoading(true);
    const response = await axios({
      url: `${process.env.REACT_APP_API_BASEURL}/deleteEmailTemplate/${templateId}`,
      method: "PUT",
    });
    setNotify({
      show: true,
      title: "Success",
      description: response.data.success.message,
      type: "success",
    });
    setChecked("default");
  } catch (err) {
    console.log(err);
  } finally {
    setDeleteRespLoading(false);
  }
};
