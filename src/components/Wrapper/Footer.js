import React from "react";

const Footer = () => {
  return (
    <>
      <div id="footer" className="text-white pb-3 font">
        <div className="ml-5 pt-3">
          &#169; {new Date().getFullYear()} Yats.com
        </div>
      </div>
    </>
  );
};

export default Footer;
