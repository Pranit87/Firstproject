import React from "react";
import WrapperDiv from "./common/wrapperDiv";

import SearchVats from "./searchVats";

const LayoutVats = ({
  ddOption,
  handleCheckedEvent,
  vatsFormData,
  reqId,
  commonCount,
  reqUniqueId,
  bulkDownload,
  setVatsFormData,
  vats,
  bulkDownloadLoader,
  options,
  setVats,
}) => {
  const [collapse, setCollapse] = React.useState(true);
  const [totalResultsFound, setTotalResultsFound] = React.useState(null);
  const [totalRecordsAailable, setTotalRecordsAailable] = React.useState(null);
  const toggleCollapse = (props) => {
    setCollapse(!props);
  };
  let vatsCommonString = null;
  if (!collapse) {
    vatsCommonString = "VATS";
  } else {
    vatsCommonString = null;
  }

  return (
    <React.Fragment>
      <div className="accordion" id="accordionExample">
        <div className="inner bg-white my-4 py-4 mx-4 rounded shadow font">
          <WrapperDiv
            image="yats-lobo-blue"
            onToggle={toggleCollapse}
            collapse={collapse}
            name="vats"
            totalResultsFound={totalResultsFound}
            totalRecordsAailable={totalRecordsAailable}
          />
          <SearchVats
            collapse={collapse}
            ddOption={ddOption}
            handleCheckedEvent={handleCheckedEvent}
            vatsFormData={vatsFormData}
            reqId={reqId}
            commonCount={commonCount}
            vatsCommonString={vatsCommonString}
            reqUniqueId={reqUniqueId}
            bulkDownload={bulkDownload}
            setVatsFormData={setVatsFormData}
            vats={vats}
            bulkDownloadLoader={bulkDownloadLoader}
            options={options}
            setVats={setVats}
            setTotalResultsFound={setTotalResultsFound}
            setTotalRecordsAailable={setTotalRecordsAailable}
          />
          <div
            id="collapseOne"
            className={collapse ? "collapse" : ""}
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            {/* <div className="px-4 py-3">25 results found</div> */}
            {/* <Pagination /> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LayoutVats;
