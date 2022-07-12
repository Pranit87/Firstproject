export const encrypt = (str) => {
  try {
    return window.btoa(unescape(encodeURIComponent(str)));
  } catch (err) {
    console.log(err.message);
    return;
  }
};

export const decrypt = (str) => {
  try {
    return decodeURIComponent(escape(window.atob(str)));
  } catch (err) {
    console.log(err.message);
    return;
  }
};
