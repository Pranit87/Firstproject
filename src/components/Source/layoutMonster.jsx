import React from "react";
import WrapperDiv from "./common/wrapperDiv";
import SearchMonster from "./searchMonster";

const LayoutMonster = ({
  ddOption,
  handleCheckedEvent,
  monsterFormData,
  reqId,
  commonCount,
  options,
  reqUniqueId,
  bulkDownload,
  setMonsterFormData,
  monster,
  bulkDownloadLoader,
  setMonster,
  rowMonsterErrorArray,
}) => {
  const [collapse, setCollapse] = React.useState(true);
  const [totalResultsFound, setTotalResultsFound] = React.useState(null);
  const toggleCollapse = (props) => {
    setCollapse(!props);
  };
  let monsterCommonString = null;
  if (!collapse) {
    monsterCommonString = "MONSTER";
  } else {
    monsterCommonString = null;
  }

  return (
    <React.Fragment>
      <div className="accordion" id="accordionExample">
        <div className="inner bg-white my-4 py-4 mx-4 rounded shadow font">
          <WrapperDiv
            image="monster-logo"
            onToggle={toggleCollapse}
            collapse={collapse}
            name="monster"
            totalResultsFound={totalResultsFound}
          />
          <SearchMonster
            collapse={collapse}
            ddOption={ddOption}
            handleCheckedEvent={handleCheckedEvent}
            monsterFormData={monsterFormData}
            reqId={reqId}
            commonCount={commonCount}
            monsterCommonString={monsterCommonString}
            options={options}
            reqUniqueId={reqUniqueId}
            bulkDownload={bulkDownload}
            setMonsterFormData={setMonsterFormData}
            monster={monster}
            bulkDownloadLoader={bulkDownloadLoader}
            setMonster={setMonster}
            rowMonsterErrorArray={rowMonsterErrorArray}
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

export default LayoutMonster;
