import axios from "axios";

export const postLoginAuth = async (
  loginEmail,
  loginPassword,
  setAuthData,
  setNotificationMessage,
  setShowSpinner,
  setShowLoginText,
  setShowMessage,
  rememberMe
) => {
  try {
    setShowSpinner("");
    setShowLoginText("d-none");
    setNotificationMessage("");
    setShowMessage("");
    var FormData = require("form-data");
    var data = new FormData();
    data.append("email", loginEmail);
    data.append("password", loginPassword);

    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/login`,
      method: "POST",
      data: data,
    };

    const response = await axios(request);

    if (response.status === 200) {
      setAuthData(response.data.payload);
      localStorage.setItem("token", response.data.payload._token);
      localStorage.setItem("profile", JSON.stringify(response.data.payload));
      if (Boolean(rememberMe)) {
        localStorage.setItem("yatsEmail", loginEmail);
        localStorage.setItem("yatsPassword", loginPassword);
        localStorage.setItem("yatsRememberMe", rememberMe);
      } else {
        localStorage.removeItem("yatsEmail");
        localStorage.removeItem("yatsPassword");
        localStorage.removeItem("yatsRememberMe");
      }
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.payload._token}`;
    }
  } catch (error) {
    if (error?.response?.data?.status === 419) {
      setNotificationMessage(error.response.data.payload.password);
      setShowMessage("d-block");
    } else {
      setNotificationMessage("Network error occurred.");
      setShowMessage("d-block");
    }
  } finally {
    setShowSpinner("d-none");
    setShowLoginText("");
  }
};

export const postForgotPassword = async (
  email,
  setForgotDiv,
  setCodeDiv,
  setSubmitting,
  setNotify
) => {
  try {
    setSubmitting(true);
    var FormData = require("form-data");
    var data = new FormData();
    data.append("email", email);

    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/password/forget`,
      method: "POST",
      data: data,
    };
    const response = await axios(request);
    if (response.status === 200) {
      console.log("response", response);
      setForgotDiv(false);
      setCodeDiv(false);
      setNotify({
        show: false,
        description: "",
        type: "",
      });
    }
  } catch (error) {
    setSubmitting(false);
    setNotify({
      show: true,
      title: "Error",
      description: "Invalid User",
      type: "danger",
    });
  }
};

export const getVerifyCode = async (
  email,
  code,
  setCodeDiv,
  setSubmitting,
  setNotify,
  setForgotPasswordDiv
) => {
  try {
    setSubmitting(false);
    const request = {
      url: `${process.env.REACT_APP_API_BASEURL}/password/reset/${code}/${email}`,
    };
    const response = await axios(request);
    if (response.status === 200) {
      console.log("response", response);
      setCodeDiv(true);
      setForgotPasswordDiv(false);
      setNotify({
        show: false,
        description: "",
        type: "",
      });
    }
  } catch (error) {
    setNotify({
      show: true,
      title: "Error",
      description: "Invalid Code",
      type: "danger",
    });
    setSubmitting(true);
  }
};

export const postChangePassword = async (
  formdata,
  setSubmitting,
  setNotify,
  setSuccessSubmit,
  setForgotPasswordDiv
) => {
  try {
    setSubmitting(true);
    const request = {
      method: "put",
      url: `${process.env.REACT_APP_API_BASEURL}/password/reset`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formdata,
    };
    const response = await axios(request);
    if (response.status === 200) {
      console.log("response", response);
      setSuccessSubmit(true);
      setForgotPasswordDiv(true);
    }
  } catch (error) {
    setNotify({
      show: true,
      title: "Error",
      description: "Invalid Code",
      type: "danger",
    });

    setSubmitting(false);
  }
};

export const postResetPassword = async (
  formdata,
  setSubmitting,
  setNotify,
  setSuccessSubmit
) => {
  try {
    setSubmitting(true);
    const request = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASEURL}/resetpassword/reset`,
      data: formdata,
    };
    const response = await axios(request);
    if (response.status === 200) {
      console.log("response", response);
      setSuccessSubmit(true);
      setNotify({
        show: true,
        title: "Success",
        description: "Password has been reset successfully.",
        type: "success",
      });
    }
  } catch (error) {
    setNotify({
      show: true,
      title: "Error",
      description: "Invalid Code",
      type: "danger",
    });
    setSubmitting(false);
  }
};
