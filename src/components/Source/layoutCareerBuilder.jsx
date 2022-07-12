import React from "react";
import WrapperDiv from "./common/wrapperDiv";
import SearchCareerBuilder from "./searchCareerBuilder";

const LayoutCareerBuilder = ({
  ddOption,
  handleCheckedEvent,
  reqId,
  commonCount,
  careerFormData,
  reqUniqueId,
  options,
  bulkDownload,
  setCareerFormData,
  career,
  bulkDownloadLoader,
  setCareer,
  rowCareerErrorArray,
}) => {
  const [collapse, setCollapse] = React.useState(true);
  const [totalResultsFound, setTotalResultsFound] = React.useState(null);
  const toggleCollapse = (props) => {
    setCollapse(!props);
  };
  let careerCommonString = null;
  if (!collapse) {
    careerCommonString = "CAREER";
  } else {
    careerCommonString = null;
  }

  return (
    <React.Fragment>
      <div className="accordion" id="accordionExample">
        <div className="inner bg-white my-4 py-4 mx-4 rounded shadow font">
          <WrapperDiv
            image="cb-logo"
            onToggle={toggleCollapse}
            collapse={collapse}
            name="career"
            totalResultsFound={totalResultsFound}
          />
          <SearchCareerBuilder
            collapse={collapse}
            ddOption={ddOption}
            handleCheckedEvent={handleCheckedEvent}
            careerFormData={careerFormData}
            reqId={reqId}
            commonCount={commonCount}
            careerCommonString={careerCommonString}
            reqUniqueId={reqUniqueId}
            options={options}
            bulkDownload={bulkDownload}
            setCareerFormData={setCareerFormData}
            career={career}
            bulkDownloadLoader={bulkDownloadLoader}
            setCareer={setCareer}
            rowCareerErrorArray={rowCareerErrorArray}
            setTotalResultsFound={setTotalResultsFound}
          />
          <div
            id="collapseOne"
            className={collapse ? "collapse" : ""}
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            {/* <div className="px-4 py-3">25 results found</div>
            <VatsSearchDetails />
            <Pagiation /> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LayoutCareerBuilder;
