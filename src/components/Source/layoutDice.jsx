import React from "react";
import WrapperDiv from "./common/wrapperDiv";
// import Pagination from "./common/pagination";

import SearchDice from "./searchDice";

const LayoutDice = ({
  ddOption,
  handleCheckedEvent,
  diceFormData,
  reqId,
  commonCount,
  options,
  reqUniqueId,
  bulkDownload,
  setDiceFormData,
  dice,
  bulkDownloadLoader,
  setDice,
  rowDiceErrorArray,
}) => {
  const [collapse, setCollapse] = React.useState(true);
  const [totalResultsFound, setTotalResultsFound] = React.useState(null);
  const toggleCollapse = (props) => {
    setCollapse(!props);
  };
  let diceCommonString = null;
  if (!collapse) {
    diceCommonString = "DICE";
  } else {
    diceCommonString = null;
  }
  return (
    <React.Fragment>
      <div className="accordion" id="accordionExample">
        <div className="inner bg-white my-4 py-4 mx-4 rounded shadow font">
          <WrapperDiv
            image="dice-logo"
            onToggle={toggleCollapse}
            collapse={collapse}
            name="dice"
            totalResultsFound={totalResultsFound}
          />
          <SearchDice
            collapse={collapse}
            ddOption={ddOption}
            handleCheckedEvent={handleCheckedEvent}
            diceFormData={diceFormData}
            reqId={reqId}
            commonCount={commonCount}
            diceCommonString={diceCommonString}
            options={options}
            reqUniqueId={reqUniqueId}
            bulkDownload={bulkDownload}
            setDiceFormData={setDiceFormData}
            dice={dice}
            bulkDownloadLoader={bulkDownloadLoader}
            setDice={setDice}
            rowDiceErrorArray={rowDiceErrorArray}
            setTotalResultsFound={setTotalResultsFound}
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

export default LayoutDice;
