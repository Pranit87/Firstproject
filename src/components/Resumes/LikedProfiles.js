import React from "react";
import { Modal, Button } from "react-bootstrap";
import { encrypt, decrypt } from "../Common/encDec";
import { getCandidateStatus } from "../../Services/jobsService";
import Loader from "react-loader-spinner";

const LikedProfiles = (props) => {
  const [filteredResumeIdData, setFilteredResumeIdData] = React.useState([]);
  const [resumeIdList, setResumeIdList] = React.useState([]);
  const [candidatesForEmail, setCandidatesForEmail] = React.useState([]);
  const [candidates, setCandidates] = React.useState([]);
  const [resumeIds, setResumeIds] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });

  const localString =
    localStorage.getItem(encrypt(props.string)) &&
    localStorage.getItem(encrypt(props.string)).split(";");

  const data = localString && localString.map((row) => row);

  const parseData = data && JSON.parse(data);
  // 1. Getting Email List.
    if (props.show && parseData && parseData.length > resumeIdList.length) {
      parseData.map((response) => {
        setResumeIdList((prevArray) => {
          return [...prevArray, response.resumeId];
        });
      });
    }
  // 2. Calling API to check status.
  React.useEffect(() => {
    if (props.show && parseData && resumeIdList.length) {
      getCandidateStatus(
        resumeIdList,
        props.reqUniqueId,
        setCandidates,
        setLoading,
        setNotify,
        setResumeIds
      );
    }
  }, [resumeIdList, props.reqUniqueId, props.likedRefresh]);

  // 3.Updating parseData with isStatus
  React.useEffect(() => {
  if (candidates.length && loading) {
    const filteredResumeId = candidates.map((response) => {
      if (response.isStatus) {
        return response.resume_id;
      } else {
        return 0;
      }
    });
    setFilteredResumeIdData(filteredResumeId);
  }},[candidates]);

  const databaseArray =
    (parseData && parseData.filter((item) => item.sourceType === "database")) ||
    [];

  const monsterArray =
    (parseData && parseData.filter((item) => item.sourceType === "monster")) ||
    [];

  const diceArray =
    (parseData && parseData.filter((item) => item.sourceType === "dice")) || [];

  const careerBuilderArray =
    (parseData && parseData.filter((item) => item.sourceType === "career")) ||
    [];

  // Click Handler for Database
  const [
    checkedDatabaseCandidates,
    setCheckedDatabaseCandidates,
  ] = React.useState([]);
  const [
    checkedDatabaseEmailsData,
    setCheckedDatabaseEmailsData,
  ] = React.useState([]);

  const handleDatabaseCheckbox = (event, data) => {
    let eventValue = parseInt(event.target.value);
    setCheckedDatabaseCandidates(
      checkedDatabaseCandidates.includes(eventValue)
        ? checkedDatabaseCandidates.filter((c) => c !== eventValue)
        : [...checkedDatabaseCandidates, eventValue]
    );
    setCheckedDatabaseEmailsData(
      checkedDatabaseCandidates.includes(eventValue)
        ? checkedDatabaseEmailsData.filter((c) => c !== eventValue)
        : [...checkedDatabaseEmailsData, eventValue]
    );
  };
  // Click Handler for Monster
  const [
    checkedMonsterCandidates,
    setCheckedMonsterCandidates,
  ] = React.useState([]);
  const [
    checkedMonsterEmailsData,
    setCheckedMonsterEmailsData,
  ] = React.useState([]);

  const handleMonsterCheckbox = (event, data) => {
    let eventValue = parseInt(event.target.value);
    setCheckedMonsterCandidates(
      checkedMonsterCandidates.includes(eventValue)
        ? checkedMonsterCandidates.filter((c) => c !== eventValue)
        : [...checkedMonsterCandidates, eventValue]
    );
    setCheckedMonsterEmailsData(
      checkedMonsterCandidates.includes(eventValue)
        ? checkedMonsterEmailsData.filter((c) => c !== eventValue)
        : [...checkedMonsterEmailsData, eventValue]
    );
  };

  // Click Handler for Dice
  const [checkedDiceCandidates, setCheckedDiceCandidates] = React.useState([]);
  const [checkedDiceEmailsData, setCheckedDiceEmailsData] = React.useState([]);

  const handleDiceCheckbox = (event, data) => {
    let eventValue = parseInt(event.target.value);
    setCheckedDiceCandidates(
      checkedDiceCandidates.includes(eventValue)
        ? checkedDiceCandidates.filter((c) => c !== eventValue)
        : [...checkedDiceCandidates, eventValue]
    );
    setCheckedDiceEmailsData(
      checkedDiceCandidates.includes(eventValue)
        ? checkedDiceEmailsData.filter((c) => c !== eventValue)
        : [...checkedDiceEmailsData, eventValue]
    );
  };

  // Click Handler for Career Builder
  const [checkedCareerCandidates, setCheckedCareerCandidates] = React.useState(
    []
  );
  const [checkedCareerEmailsData, setCheckedCareerEmailsData] = React.useState(
    []
  );

  const handleCareerCheckbox = (event, data) => {
    let eventValue = parseInt(event.target.value);
    setCheckedCareerCandidates(
      checkedCareerCandidates.includes(eventValue)
        ? checkedCareerCandidates.filter((c) => c !== eventValue)
        : [...checkedCareerCandidates, eventValue]
    );
    setCheckedCareerEmailsData(
      checkedCareerCandidates.includes(eventValue)
        ? checkedCareerEmailsData.filter((c) => c !== eventValue)
        : [...checkedCareerEmailsData, eventValue]
    );
  };

  //Checked all the data
  React.useEffect(() => {
    if (databaseArray.length) {
      const databaseData = databaseArray.map((data, index) => data.resumeId);
      setCheckedDatabaseCandidates(databaseData);
      setCheckedDatabaseEmailsData(databaseData);
    }
  }, [databaseArray.length]);
  React.useEffect(() => {
    if (monsterArray.length) {
      const monsterData = monsterArray.map((data, index) => data.resumeId);
      setCheckedMonsterCandidates(monsterData);
      setCheckedMonsterEmailsData(monsterData);
    }
  }, [monsterArray.length]);
  React.useEffect(() => {
    if (diceArray.length) {
      const diceData = diceArray.map((data, index) => data.resumeId);
      setCheckedDiceCandidates(diceData);
      setCheckedDiceEmailsData(diceData);
    }
  }, [diceArray.length]);
  React.useEffect(() => {
    if (careerBuilderArray.length) {
      const careerBuilderData = careerBuilderArray.map(
        (data, index) => data.resumeId
      );
      setCheckedCareerCandidates(careerBuilderData);
      setCheckedCareerEmailsData(careerBuilderData);
    }
  }, [careerBuilderArray.length]);

  const handleCancel = (e) => {
    props.closeLikedProfiles();
  };

  const handleApprovedList = (e) => {
    props.showBulkEmail(true);

    props.setResumeIds(
      [
        ...checkedDatabaseEmailsData,
        ...checkedMonsterEmailsData,
        ...checkedDiceEmailsData,
        ...checkedCareerEmailsData,
      ]
        ? [
            ...checkedDatabaseEmailsData,
            ...checkedMonsterEmailsData,
            ...checkedDiceEmailsData,
            ...checkedCareerEmailsData,
          ].filter((elem) => filteredResumeIdData.find((id) => elem === id))
        : []
    );
    // props.setResumeIds(
    //   [
    //     ...checkedDatabaseEmailsData,
    //     ...checkedMonsterEmailsData,
    //     ...checkedDiceEmailsData,
    //     ...checkedCareerEmailsData,
    //   ]
    //     ? [
    //         ...checkedDatabaseEmailsData,
    //         ...checkedMonsterEmailsData,
    //         ...checkedDiceEmailsData,
    //         ...checkedCareerEmailsData,
    //       ].filter((id) => id === filteredResumeIdData)
    //     : []
    // );
  };

  const modalBody = (
    <React.Fragment>
      {(databaseArray.length && (
        <>
          <div className="job-table-head-bg-color text-white px-4 py-1">
            Database Candidates
          </div>
          <table className="table">
            <thead className="table-head-bg-color">
              <tr>
                <th scope="col" className="py-2">
                  {/* <input type="checkbox" /> */}
                </th>
                <th scope="col" className="py-2">
                  Full Name
                </th>
                <th scope="col" className="py-2">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {databaseArray.map((data, index) => {
                return (
                  <tr key={data.name}>
                    <td>
                      <input
                        disabled={!filteredResumeIdData.includes(data.resumeId)}
                        type="checkbox"
                        onChange={(e) =>
                          handleDatabaseCheckbox(e, data.resumeId)
                        }
                        value={data.resumeId}
                        checked={checkedDatabaseCandidates.includes(
                          data.resumeId
                        )}
                      />
                    </td>
                    <td
                      style={{
                        textDecoration: filteredResumeIdData.includes(
                          data.resumeId
                        )
                          ? "none"
                          : "line-through",
                      }}
                    >
                      {data.name}
                    </td>
                    <td
                      style={{
                        textDecoration: filteredResumeIdData.includes(
                          data.resumeId
                        )
                          ? "none"
                          : "line-through",
                      }}
                    >
                      {data.email}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )) ||
        ""}

      {(monsterArray.length && (
        <>
          <div className="job-table-head-bg-color text-white px-4 py-1">
            Monster Candidates
          </div>
          <table className="table">
            <thead className="table-head-bg-color">
              <tr>
                <th scope="col" className="py-2">
                  {/* <input type="checkbox" /> */}
                </th>
                <th scope="col" className="py-2">
                  Full Name
                </th>
                <th scope="col" className="py-2">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {monsterArray.map((data, index) => {
                return (
                  <tr key={data.name}>
                    <td>
                      <input
                        disabled={!filteredResumeIdData.includes(data.resumeId)}
                        type="checkbox"
                        onChange={(e) =>
                          handleMonsterCheckbox(e, data.resumeId)
                        }
                        value={data.resumeId}
                        checked={checkedMonsterCandidates.includes(
                          data.resumeId
                        )}
                      />
                    </td>
                    <td
                      style={{
                        textDecoration: filteredResumeIdData.includes(
                          data.resumeId
                        )
                          ? "none"
                          : "line-through",
                      }}
                    >
                      {data.name}
                    </td>
                    <td
                      style={{
                        textDecoration: filteredResumeIdData.includes(
                          data.resumeId
                        )
                          ? "none"
                          : "line-through",
                      }}
                    >
                      {data.email}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )) ||
        ""}

      {(diceArray.length && (
        <>
          <div className="job-table-head-bg-color text-white px-4 py-1">
            Dice Candidates
          </div>
          <table className="table">
            <thead className="table-head-bg-color">
              <tr>
                <th scope="col" className="py-2">
                  {/* <input type="checkbox" /> */}
                </th>
                <th scope="col" className="py-2">
                  Full Name
                </th>
                <th scope="col" className="py-2">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {diceArray.map((data, index) => {
                return (
                  <tr key={data.name}>
                    <td>
                      <input
                        disabled={!filteredResumeIdData.includes(data.resumeId)}
                        type="checkbox"
                        onChange={(e) => handleDiceCheckbox(e, data.resumeId)}
                        value={data.resumeId}
                        checked={checkedDiceCandidates.includes(data.resumeId)}
                      />
                    </td>
                    <td
                      style={{
                        textDecoration: filteredResumeIdData.includes(
                          data.resumeId
                        )
                          ? "none"
                          : "line-through",
                      }}
                    >
                      {data.name}
                    </td>
                    <td
                      style={{
                        textDecoration: filteredResumeIdData.includes(
                          data.resumeId
                        )
                          ? "none"
                          : "line-through",
                      }}
                    >
                      {data.email}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )) ||
        ""}

      {(careerBuilderArray.length && (
        <>
          <div className="job-table-head-bg-color text-white px-4 py-1">
            Career Builder Candidates
          </div>
          <table className="table">
            <thead className="table-head-bg-color">
              <tr>
                <th scope="col" className="py-2">
                  {/* <input type="checkbox" /> */}
                </th>
                <th scope="col" className="py-2">
                  Full Name
                </th>
                <th scope="col" className="py-2">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {careerBuilderArray.map((data, index) => {
                return (
                  <tr key={data.name}>
                    <td>
                      <input
                        disabled={!filteredResumeIdData.includes(data.resumeId)}
                        type="checkbox"
                        onChange={(e) => handleCareerCheckbox(e, data.resumeId)}
                        value={data.resumeId}
                        checked={checkedCareerCandidates.includes(
                          data.resumeId
                        )}
                      />
                    </td>
                    <td
                      style={{
                        textDecoration: filteredResumeIdData.includes(
                          data.resumeId
                        )
                          ? "none"
                          : "line-through",
                      }}
                    >
                      {data.name}
                    </td>
                    <td
                      style={{
                        textDecoration: filteredResumeIdData.includes(
                          data.resumeId
                        )
                          ? "none"
                          : "line-through",
                      }}
                    >
                      {data.email}
                    </td>
                  </tr>
                );
              })}
              {!careerBuilderArray.length && (
                <tr>
                  <td colSpan="3">No data found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )) ||
        ""}
      {!databaseArray.length &&
        !monsterArray.length &&
        !diceArray.length &&
        !careerBuilderArray.length && <div>Please like any candidates.</div>}
    </React.Fragment>
  );
  return (
    <Modal
      show={props.show}
      onHide={props.closeLikedProfiles}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header className="message-popup-custom text-white">
        <Modal.Title>Liked Candidates</Modal.Title>
      </Modal.Header>
      <Modal.Body className="my-3">
        {loading ? (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            style={{ paddingLeft: "35%" }}
          />
        ) : (
          modalBody
        )}
      </Modal.Body>
      <Modal.Footer className="pagination justify-content-start">
        <Button
          variant="primary"
          className="px-4"
          onClick={(e) => {
            handleApprovedList(e);
          }}
          disabled={
            !checkedDatabaseCandidates.length &&
            !checkedMonsterCandidates.length &&
            !checkedDiceCandidates.length &&
            !checkedCareerCandidates.length
          }
        >
          Approve Candidates
        </Button>
        <Button
          variant="secondary"
          className="px-4"
          onClick={(e) => handleCancel(e)}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LikedProfiles;
